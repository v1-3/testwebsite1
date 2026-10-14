
/* Quebra-cabeça: imagens online do Wikimedia Commons, sem chave de API. */
(() => {
 'use strict';
 const $ = id => document.getElementById(id);
 const section = $('jigsaw-section');
 if (!section) return;
 const places = {
   france:'France',usa:'United States',germany:'Germany',spain:'Spain',uk:'United Kingdom',
   russia:'Russia',brazil:'Brazil',italy:'Italy',japan:'Japan',canada:'Canada',
   china:'China',india:'India',egypt:'Egypt',mexico:'Mexico',australia:'Australia'
 };
 const searchButton = $('jig-search');
 const results = $('jig-results');
 const statusEl = $('jig-status');
 const board = $('jig-board');
 const tray = $('jig-tray');
 const game = $('jig-game');
 const difficulty = $('jig-difficulty');
 const previewBtn = $('jig-preview');
 const resetBtn = $('jig-reset');
 const returnBtn = $('jig-return');
 const winBox = $('jig-win');
 const categoryInput = $('jig-category-query');
 const categorySearchButton = $('jig-category-search');
 const categoryResults = $('jig-category-results');
 const categoryStatus = $('jig-category-status');
 const categoryMore = $('jig-category-more');
 const categorySelected = $('jig-category-selected');
 const categoryCount = $('jig-category-count');
 const categoryClear = $('jig-category-clear');
 const advFields = ['jig-subject','jig-author','jig-title','jig-location','jig-year-from','jig-year-to'];
 const moreImagesButton=$('jig-images-more');
 let currentSearchSpecs=null, nextOffset=0, searchSeq=0;
 $('jig-advanced-clear').addEventListener('click',()=>{
   for(const id of advFields)$(id).value='';
   $('jig-period').value='';
   for(const id of ['jig-types','jig-places'])$(id).querySelectorAll('[aria-pressed]').forEach(b=>b.setAttribute('aria-pressed','false'));
   selectedCategories.clear();refreshSelected();
   setStatus('Filtros limpos. Digite um termo ou escolha uma sugestão.');
 });
 const commonsEndpoint = 'https://commons.wikimedia.org/w/api.php';
 let requestId = 0, images = [], selectedImage = null;
 let cols = 4, rows = 4, slots = [], selected = null, trayOrder = [];
 let edgeHorizontal = [], edgeVertical = [], uid = 0;
 let dragId = null, pieceCreatedAt = 0;
 let categories = [], selectedCategories = new Map(), categorySearchId = 0, categoryOffset = 0;
 let categoryTerm = '', categoryMoreAvailable = false, debounceTimer = null;
 const cacheKey='jigsaw-commons-selected-categories-v1';

 const setStatus = (message, error=false) => {
   statusEl.textContent = message;
   statusEl.style.color = error ? '#fda4af' : '#fecdd3';
 };
 function selections(id) {
   return [...$(id).querySelectorAll('button[aria-pressed="true"]')].map(b => b.dataset.value);
 }
 for (const id of ['jig-places','jig-types']) {
   $(id).addEventListener('click', e => {
     const btn = e.target.closest('button[data-value]');
     if (!btn || !$(id).contains(btn)) return;
     const wasSelected=btn.getAttribute('aria-pressed')==='true';
     if(id==='jig-types') {
       $(id).querySelectorAll('button[data-value]').forEach(other=>other.setAttribute('aria-pressed','false'));
       if(!wasSelected)btn.setAttribute('aria-pressed','true');
     } else btn.setAttribute('aria-pressed',wasSelected?'false':'true');
   });
 }
 function shuffle(array) {
   const out = array.slice();
   for (let i=out.length-1;i>0;i--) {
     const j=Math.floor(Math.random()*(i+1));[out[i],out[j]]=[out[j],out[i]];
   }
   return out;
 }
 function cleanCategory(title) {
   return String(title||'').replace(/^Category:/i,'').replace(/_/g,' ').trim();
 }
 function saveCategories() {
   try {localStorage.setItem(cacheKey,JSON.stringify([...selectedCategories.values()]));} catch(_err) {}
 }
 function refreshSelected() {
   categorySelected.replaceChildren();
   categoryCount.textContent=`(${selectedCategories.size})`;
   categoryClear.disabled=selectedCategories.size===0;
   if(!selectedCategories.size) {
     const span=document.createElement('span');span.className='text-xs text-roseGold/55';
     span.textContent='Nenhum tema selecionado.';categorySelected.append(span);
   }
   for(const value of selectedCategories.values()) {
     const chip=document.createElement('span');chip.className='jig-category-chip';
     const label=document.createElement('span');label.textContent=cleanCategory(value);
     const button=document.createElement('button');button.type='button';button.textContent='×';
     button.setAttribute('aria-label',`Remover tema ${cleanCategory(value)}`);
     button.addEventListener('click',()=>chooseCategory(value));
     chip.append(label,button);categorySelected.append(chip);
   }
   for(const btn of categoryResults.querySelectorAll('button[data-category]')) {
     btn.setAttribute('aria-selected',String(selectedCategories.has(btn.dataset.category)));
     const mark=btn.querySelector('small');if(mark)mark.textContent=selectedCategories.has(btn.dataset.category)?'Selecionado ✓':'Selecionar tema +';
   }
   saveCategories();
 }
 function chooseCategory(title) {
   title=String(title||'').trim();
   if(!title.startsWith('Category:'))return;
   if(selectedCategories.has(title))selectedCategories.delete(title);
   else selectedCategories.set(title,title);
   refreshSelected();
 }
 categoryClear.addEventListener('click',()=>{selectedCategories.clear();refreshSelected();});
 try {
   const previous=JSON.parse(localStorage.getItem(cacheKey)||'[]');
   if(Array.isArray(previous))for(const title of previous.slice(0,40))
     if(typeof title==='string'&&/^Category:[^<>]{2,180}$/.test(title))selectedCategories.set(title,title);
 }catch(_err){}
 refreshSelected();

 // Wikimedia Commons is too large to ship as an offline file. The live category
 // namespace is a searchable, server-maintained database. Search all category titles,
 // then cache chosen topics locally. Prefix matches come first; full-text finds more.
 function commonsUrl(params) {
   return commonsEndpoint+'?'+new URLSearchParams({action:'query',format:'json',formatversion:'2',origin:'*',...params});
 }
 async function commonsJSON(params, signal) {
   const response=await fetch(commonsUrl(params),{signal,credentials:'omit'});
   if(!response.ok)throw new Error(`Commons HTTP ${response.status}`);
   const data=await response.json();
   if(data.error)throw new Error(data.error.info||'Erro na pesquisa');
   return data;
 }
 function renderCategories(append=false) {
   if(!append)categoryResults.replaceChildren();
   for(const cat of categories) {
     if(categoryResults.querySelector(`[data-pageid="${cat.pageid}"]`))continue;
     const button=document.createElement('button');
     button.type='button';button.className='jig-category-result';
     button.dataset.category=cat.title;button.dataset.pageid=String(cat.pageid);
     button.setAttribute('role','option');button.setAttribute('aria-selected',String(selectedCategories.has(cat.title)));
     const title=document.createElement('span');title.textContent=cleanCategory(cat.title);
     const meta=document.createElement('small');meta.textContent=selectedCategories.has(cat.title)?'Selecionado ✓':'Selecionar tema +';
     button.append(title,meta);button.addEventListener('click',()=>chooseCategory(cat.title));
     categoryResults.append(button);
   }
 }
 async function findCategories(loadMore=false) {
   const term=categoryInput.value.trim();
   if(term.length<2) {
     categorySearchId++;categoryTerm='';categoryOffset=0;categories=[];
     categoryResults.replaceChildren();categoryMore.classList.add('hidden');
     categoryStatus.textContent='Digite pelo menos 2 caracteres para pesquisar.';return;
   }
   const isContinuation=loadMore && term===categoryTerm;
   const ticket=++categorySearchId;
   if(!isContinuation){categoryOffset=0;categoryTerm=term;categories=[];categoryResults.replaceChildren();}
   categoryStatus.textContent='Pesquisando categorias no Wikimedia Commons…';
   categorySearchButton.disabled=true;categoryMore.disabled=true;
   try {
     const base={list:'search',srnamespace:'14',srsearch:term,srlimit:'30',sroffset:String(categoryOffset)};
     const jobs=[commonsJSON(base)];
     if(!isContinuation)jobs.push(commonsJSON({list:'prefixsearch',psnamespace:'14',pssearch:term,pslimit:'15'}));
     const data=await Promise.all(jobs);
     if(ticket!==categorySearchId)return;
     const prefix=data[1]?.query?.prefixsearch||[];
     const full=data[0]?.query?.search||[];
     const existing=new Set([...categoryResults.querySelectorAll('[data-category]')].map(el=>el.dataset.category));
     const merged=[];
     for(const match of [...prefix,...full]) {
       if(!match.title?.startsWith('Category:')||existing.has(match.title))continue;
       existing.add(match.title);
       merged.push({title:match.title,pageid:match.pageid});
     }
     categories=merged;renderCategories(isContinuation);
     categoryOffset+=full.length;
     const hits=data[0]?.query?.searchinfo?.totalhits||0;
     categoryMoreAvailable=full.length>=30 && categoryOffset<hits;
     categoryMore.classList.toggle('hidden',!categoryMoreAvailable);
     const found=categoryResults.querySelectorAll('button').length;
     categoryStatus.textContent=found?`${found} categorias exibidas${categoryMoreAvailable?' · mais resultados disponíveis':''}. Clique em uma ou mais para selecionar.`:'Nenhuma categoria encontrada. Tente outro termo, de preferência em inglês.';
   }catch(err){
     if(ticket!==categorySearchId)return;
     categoryStatus.textContent='Não foi possível pesquisar as categorias. Verifique a conexão com o Commons.';
   }finally {
     if(ticket===categorySearchId){categorySearchButton.disabled=false;categoryMore.disabled=false;}
   }
 }
 categoryInput.addEventListener('input',()=>{
   clearTimeout(debounceTimer);
   // Cancel older searches immediately so stale results are not shown.
   categorySearchId++;
   debounceTimer=setTimeout(()=>findCategories(false),380);
 });
 categoryInput.addEventListener('keydown',event=>{
   if(event.key==='Enter'){event.preventDefault();clearTimeout(debounceTimer);findCategories(false);}
 });
 categorySearchButton.addEventListener('click',()=>{clearTimeout(debounceTimer);findCategories(false);});
 categoryMore.addEventListener('click',()=>findCategories(true));

 const wikidataEndpoint='https://www.wikidata.org/w/api.php';
 const safetyExclusion='-intitle:nude -intitle:naked -intitle:erotic -intitle:pornographic';
 const unsafeWords=/\b(nude|naked|pornograph|erotic|fetish|sexually explicit|topless|genitals)\b/i;
 const removeMarkup = value => {
   const el=document.createElement('div');el.innerHTML=String(value||'');
   return (el.textContent||'').replace(/\s+/g,' ').trim().slice(0,1600);
 };
 const normalized = value=>String(value||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
 const metadataText = (metadata,key)=>removeMarkup(metadata?.[key]?.value||'');
 function extractYear(s) {
   const text=removeMarkup(s);
   // DateTimeOriginal may be free text (e.g. "circa 1889", "1890-01-01").
   const match=text.match(/(?:^|\D)(1[0-9]{3}|20[0-9]{2}|2100)(?!\d)/);
   return match?Number(match[1]):null;
 }
 function imageData(data, origin='texto') {
   return (data.query?.pages||[]).map(page=>{
     const info=page.imageinfo?.[0];
     if(!info||!/^image\/(jpeg|png|webp)$/.test(info.mime||'')||!(/\.(jpe?g|png|webp)$/i.test(page.title||'')))return null;
     if((info.width||0)<450||(info.height||0)<350)return null;
     const ratio=info.width/info.height;
     if(ratio<.58||ratio>2.25)return null;
     const url=info.thumburl||info.url;
     if(!/^https:\/\/(upload\.wikimedia\.org|commons\.wikimedia\.org)\//.test(url||''))return null;
     const metadata=info.extmetadata||{};
     const categories=(page.categories||[]).map(item=>String(item.title||'').replace(/^Category:/i,''));
     const name=page.title.replace(/^File:/,'').replace(/\.[^.]+$/,'').replace(/_/g,' ');
     const author=metadataText(metadata,'Artist') || metadataText(metadata,'AttributionRequired');
     const date=metadataText(metadata,'DateTimeOriginal');
     const description=metadataText(metadata,'ImageDescription');
     const title=metadataText(metadata,'ObjectName');
     const year=extractYear(date);
     // File titles and descriptions are not a perfect content-safety filter; suppress clear adult tags.
     if(unsafeWords.test([name,description].join(' ').slice(0,1500)))return null;
     return {name,url,ratio,source:'https://commons.wikimedia.org/wiki/'+encodeURIComponent(page.title.replace(/ /g,'_')),
       key:page.title,author,date,year,description,title,categories,origins:new Set([origin]),match:[]};
   }).filter(Boolean);
 }
 const imageProps={prop:'imageinfo|categories',iiprop:'url|size|mime|extmetadata',iiurlwidth:'850',cllimit:'40',clshow:'!hidden'};
 function searchParams(q,offset=0) {
   return {generator:'search',gsrnamespace:'6',gsrsearch:q.trim(),gsrlimit:'40',
     gsroffset:String(offset),...imageProps};
 }
 function categoryDataParams(category) {
   return {generator:'categorymembers',gcmtitle:category,gcmtype:'file',gcmlimit:'45',...imageProps};
 }
 async function categoryImages(category,signal,depth=0,visited=new Set()) {
   if(visited.has(category))return [];
   visited.add(category);
   if(depth===0) {
     try {
       const data=await commonsJSON(searchParams(`deepcat:"${cleanCategory(category).replace(/"/g,'')}" ${safetyExclusion}`),signal);
       const matches=imageData(data,'categoria');
       if(matches.length>=5)return matches;
     } catch(_err){}
   }
   const response=await commonsJSON(categoryDataParams(category),signal);
   const direct=imageData(response,'categoria');
   if(direct.length>=10||depth>=1)return direct;
   const subResponse=await commonsJSON({list:'categorymembers',cmtitle:category,cmtype:'subcat',cmlimit:'45'},signal);
   const children=shuffle((subResponse.query?.categorymembers||[]).map(p=>p.title).filter(t=>t?.startsWith('Category:'))).slice(0,4);
   const descendants=await Promise.allSettled(children.map(c=>categoryImages(c,signal,depth+1,visited)));
   return direct.concat(descendants.flatMap(r=>r.status==='fulfilled'?r.value:[]));
 }
 async function resolveWikidata(name,signal) {
   if(!name||name.length<2)return null;
   if(/^Q[1-9]\d+$/i.test(name))return name.toUpperCase();
   // Structured-entity matching is optional; a blocked Wikidata request must
   // never prevent the ordinary Wikimedia Commons full-text search.
   const lookupController=new AbortController();
   const deadline=setTimeout(()=>lookupController.abort(),3200);
   signal?.addEventListener('abort',()=>lookupController.abort(),{once:true});
   try {for(const language of ['pt','en']) {
     if(lookupController.signal.aborted)break;
     try {
       const url=wikidataEndpoint+'?'+new URLSearchParams({action:'wbsearchentities',format:'json',origin:'*',
         language,uselang:language,type:'item',limit:'8',search:name});
       const res=await fetch(url,{signal:lookupController.signal,credentials:'omit'});
       if(!res.ok)continue;
       const json=await res.json();
       const exact=(json.search||[]).find(item=>[item.label,...(item.aliases||[])].some(v=>normalized(v)===normalized(name)));
       if(exact?.id)return exact.id;
     }catch(_err){if(lookupController.signal.aborted)break;}
   }}finally{clearTimeout(deadline);}
   return null;
 }
 function specsFromForm() {
   const vals={subject:$('jig-subject').value.trim(),author:$('jig-author').value.trim(),
     title:$('jig-title').value.trim(),location:$('jig-location').value.trim(),
     from:$('jig-year-from').value.trim(),to:$('jig-year-to').value.trim(),
     period:$('jig-period').value,types:selections('jig-types'),places:selections('jig-places'),
     categories:[...selectedCategories.keys()]};
   const periods={before1800:[1000,1799], '1800s':[1800,1899], '1900s':[1900,1999], '2000s':[2000,2100]};
   let [from,to]=periods[vals.period]||[null,null];
   if(vals.from)from=Number(vals.from);
   if(vals.to)to=Number(vals.to);
   vals.minYear=from;vals.maxYear=to;
   vals.locationTerms=[vals.location,...vals.places.map(k=>places[k])].filter(Boolean);
   return vals;
 }
 function queryVariants(filters,ids) {
   const variants=[];
   const paintingOnly=filters.types.includes('art');
   const photoOnly=filters.types.includes('photograph');
   const add=(str,tag,paintMode='')=>{
     str=str.trim();
     if(!str)return;
     // When the painting filter is selected, every text/structured query requires
     // painting context (not drawings, sketches, illustrations, or general photographs).
     if(paintingOnly) {
       const required=paintMode==='medium'?'':'deepcat:"Paintings"';
       str=[str,required].filter(Boolean).join(' ');
     } else if(photoOnly) {
       str+=' -deepcat:"Paintings"';
     }
     const q=`${str} ${safetyExclusion}`.trim();
     if(!variants.some(x=>x.q===q))variants.push({q,tag});
   };
   const base=[filters.subject,filters.author,filters.title,filters.location].filter(Boolean);
   const main=base.join(' ');
   if(main) {
     add(main,'filtros combinados');
     if(filters.subject&&filters.author)add(`${filters.subject} ${filters.author}`,'assunto + autor');
     if(filters.title)add(`intitle:"${filters.title.replace(/"/g,'')}"`,'título');
     if(filters.subject)add(filters.subject,'assunto');
     if(filters.author)add(filters.author,'autor');
   }
   if(ids.subject)add(`haswbstatement:P180=${ids.subject}`,'representação estruturada');
   if(ids.author)add(`haswbstatement:P170=${ids.author}`,'criador estruturado');
   if(ids.subject&&ids.author)add(`haswbstatement:P180=${ids.subject} haswbstatement:P170=${ids.author}`,'assunto + criador estruturados');
   if(ids.location){
     add(`haswbstatement:P180=${ids.location}`,'lugar retratado estruturado');
     add(`haswbstatement:P1071=${ids.location}`,'lugar de criação estruturado');
   }
   for(const category of filters.categories.slice(0,3)) {
     const c=`deepcat:"${cleanCategory(category).replace(/"/g,'')}"`;
     add(main?`${c} ${filters.subject||filters.author||filters.title||filters.location}`:c,'categoria');
   }
   if(paintingOnly) {
     // Broad medium searches recover works that do not have detailed structured data.
     const topic=filters.subject||filters.title||filters.author||filters.locationTerms[0]||'';
     for(const medium of ['"oil painting"','"watercolor painting"','"acrylic painting"','"gouache painting"','"tempera painting"','fresco']) {
       add([topic,medium].filter(Boolean).join(' '),'pintura por técnica','medium');
     }
     if(!variants.length)add('deepcat:"Paintings"','pinturas');
   } else if(photoOnly) {
     add([filters.subject||filters.title||filters.author||filters.locationTerms[0],'photograph'].filter(Boolean).join(' '),'fotografia');
   } else if(!variants.length) {
     const term=filters.locationTerms[0]||(filters.minYear!=null?String(filters.minYear):'');
     if(term)add(term,'busca geral');
   }
   // The advanced query builder caps requests to avoid excessive Commons traffic.
   return variants.slice(0,paintingOnly?16:11);
 }
 function scoreImage(pic,filters) {
   const full=normalized([pic.name,pic.title,pic.description,pic.author].join(' '));
   const name=normalized([pic.name,pic.title].join(' '));
   const author=normalized(pic.author);
   const matches=[];
   let score=0;
   const check=(query,src,weight,label)=>{
     const norm=normalized(query);
     if(norm && src.includes(norm)){score+=weight;matches.push(label);return true;}
     return false;
   };
   if(filters.subject){
     if(!check(filters.subject,name,28,'Assunto no título'))
       check(filters.subject,full,14,'Assunto na descrição');
     if(pic.origins.has('representação estruturada')){score+=32;matches.push('Assunto marcado no Commons');}
   }
   if(filters.title)check(filters.title,name,30,'Título');
   if(filters.author){
     if(!check(filters.author,author,36,'Autor nos metadados'))
       check(filters.author,full,12,'Nome do autor citado');
     if(pic.origins.has('criador estruturado')){score+=36;matches.push('Criador marcado no Commons');}
   }
   if(filters.locationTerms.length){
     for(const term of filters.locationTerms){if(check(term,full,10,'Lugar associado'))break;}
     if(pic.origins.has('lugar retratado estruturado')){score+=28;matches.push('Lugar representado no Commons');}
     if(pic.origins.has('lugar de criação estruturado')){score+=20;matches.push('Local de criação no Commons');}
   }
   if(pic.origins.has('categoria')){score+=7;matches.push('Categoria do Commons');}
   if(filters.minYear!=null||filters.maxYear!=null){
     if(pic.year!=null && pic.year >= (filters.minYear??1000) && pic.year <= (filters.maxYear??2100)){
       score+=24;matches.push('Data de criação');
     }else if(pic.year==null)score-=8;
   }
   if(pic.origins.has('assunto + criador estruturados'))score+=45;
   score+=pic.origins.size*2;
   return {...pic,score,match:matches};
 }
 const paintingSignal=/\b(paintings?|painted|oil on canvas|oil on panel|oil paint|watercolou?r|aquarel[ae]|aquarela|aquarelle|acrylic|acrilic[ao]|tempera|gouache|fresco(?:es)?|afresco|pinturas?|pintad[ao]s?|pintura a oleo|peinture|gemalde|malerei|schilderij|malerier|oleo sobre tela)\b/i;
 const drawingSignal=/\b(drawings?|sketch(?:es)?|pencil|charcoal|illustrations?|engravings?|etchings?|lithographs?|woodcuts?|line art|desenhos?|esbocos?|gravuras?|lithografias?)\b/i;
 const photoSignal=/\b(photographs?|photos?|fotografias?|selfies?|press photos?|street photography)\b/i;
 function qualifiesAsPainting(pic) {
   const primary=[pic.name,pic.title,pic.description].join(' ');
   const categoryText=(pic.categories||[]).join(' ');
   const paintingCategories=/\b(paintings?|oil paint(?:ings?)?|watercolou?r(?: paintings?)?|acrylic paintings?|gouache paintings?|tempera paintings?|frescoes?|pinturas?|peinture[s]?|gemalde|malerei|schilderijen)\b/i;
   const confirmed=paintingCategories.test(categoryText)||paintingSignal.test(primary);
   if(!confirmed)return false;
   // A standalone drawing, print or photograph should not pass just because its
   // description mentions an artist's paintings or its parent category is 'Art'.
   const photoAsSubject=/\b(photographs? of (?:the )?paintings?|photos? of (?:the )?paintings?|art exhibition|painting exhibitions?|painting workshop|artist with (?:a )?painting)\b/i;
   if(photoAsSubject.test(primary) && !paintingCategories.test(categoryText))return false;
   if(drawingSignal.test(primary) && !paintingCategories.test(categoryText) &&
      !/\b(oil painting|acrylic painting|watercolor painting|gouache painting|tempera painting|fresco)\b/i.test(primary))return false;
   if(photoSignal.test(primary) && !paintingCategories.test(categoryText) &&
      !/\b(oil painting|acrylic painting|watercolor painting|gouache painting|tempera painting|fresco)\b/i.test(primary))return false;
   // Exclude categories classifying the file itself as a drawing or photograph,
   // unless the file also has a painting-specific category.
   if(!paintingCategories.test(categoryText) && (drawingSignal.test(categoryText)||photoSignal.test(categoryText)))return false;
   return true;
 }
 function imageIsEligible(pic,filters) {
   if(filters.types.includes('art')&&!qualifiesAsPainting(pic))return false;
   if(pic.year!=null&&(filters.minYear!=null||filters.maxYear!=null)) {
     if(pic.year<(filters.minYear??1000)||pic.year>(filters.maxYear??2100))return false;
   }
   if(filters.author && pic.author && !normalized(pic.author).includes(normalized(filters.author)) &&
     !normalized([pic.name,pic.title,pic.description].join(' ')).includes(normalized(filters.author)))return false;
   return true;
 }
 function mergePhotos(records) {
   const merged=new Map();
   for(const pic of records) {
     const old=merged.get(pic.key);
     if(!old)merged.set(pic.key,pic);
     else {
       for(const key of pic.origins)old.origins.add(key);
       for(const key of ['author','date','description','title'])if(!old[key]&&pic[key])old[key]=pic[key];
       old.categories=[...new Set([...(old.categories||[]),...(pic.categories||[])])];
     }
   }
   return [...merged.values()];
 }
 function showResults() {
   results.replaceChildren();
   results.classList.toggle('hidden',images.length===0);
   $('jig-gallery-empty').classList.toggle('hidden',images.length>0);
   if(!images.length){
     $('jig-gallery-empty').querySelector('strong').textContent='Nenhuma imagem encontrada';
     $('jig-gallery-empty').querySelector('span').textContent='Tente uma busca mais ampla, remova um filtro ou use termos em inglês.';
   }
   images.forEach((pic,i)=>{
     const card=document.createElement('div');card.className='jig-result';
     const button=document.createElement('button');button.type='button';
     button.className='w-full text-left';button.setAttribute('aria-label','Montar quebra-cabeça com '+pic.name);
     const img=document.createElement('img');img.src=pic.url;img.alt=pic.name;img.loading='lazy';img.referrerPolicy='no-referrer';
     img.onerror=()=>{card.style.display='none';};
     const label=document.createElement('span');label.className='jig-result-title';label.textContent=pic.name;
     const info=document.createElement('span');info.className='jig-result-meta';
     const author=pic.author?`Autor: ${pic.author.slice(0,95)}`:'Autor não informado';
     const date=pic.year?` · ${pic.year}`:'';
     info.textContent=author+date;
     button.append(img,label,info);
     if(pic.match.length) {
       const why=document.createElement('span');why.className='jig-result-why';
       why.textContent=pic.match.slice(0,3).join(' · ');button.append(why);
     }
     button.addEventListener('click',()=>chooseImage(i));
     const link=document.createElement('a');link.className='jig-result-source';
     link.href=pic.source;link.target='_blank';link.rel='noopener noreferrer';link.textContent='Ver arquivo e licença ↗';
     card.append(button,link);results.append(card);
   });
 }
 async function imageSearch(addMore=false) {
   const filters=addMore?currentSearchSpecs:specsFromForm();
   if(!filters)return;
   const useAdvanced=Boolean(filters.subject||filters.author||filters.title||filters.location||filters.locationTerms.length||
     filters.minYear!=null||filters.maxYear!=null||filters.types.length);
   if(!useAdvanced&&!filters.categories.length){
     setStatus('Informe um assunto, artista, título ou lugar, ou selecione alguma categoria.',true);
     $('jig-subject').focus();return;
   }
   if(filters.minYear!=null&&filters.maxYear!=null&&filters.minYear>filters.maxYear){
     setStatus('O primeiro ano precisa ser menor ou igual ao último.',true);return;
   }
   if([filters.minYear,filters.maxYear].some(y=>y!=null&&(!Number.isInteger(y)||y<1000||y>2100))){
     setStatus('Informe anos entre 1000 e 2100.',true);return;
   }
   const ticket=++requestId;
   searchButton.disabled=true;moreImagesButton.disabled=true;
   setStatus('Pesquisando assuntos, criadores e metadados no Wikimedia Commons…');
   $('jig-gallery-empty').classList.add('hidden');
   const controller=new AbortController();const stopper=setTimeout(()=>controller.abort(),26000);
   try {
     if(!addMore){currentSearchSpecs=filters;nextOffset=0;images=[];}
     const ids=await Promise.all([
       resolveWikidata(filters.subject,controller.signal),resolveWikidata(filters.author,controller.signal),
       resolveWikidata(filters.location,controller.signal)
     ]).then(([subject,author,location])=>({subject,author,location}));
     const variants=queryVariants(filters,ids);
     const batch=addMore?variants.slice(0,Math.min(3,variants.length)):variants;
     const jobs=batch.map(v=>()=>commonsJSON(searchParams(v.q,addMore?nextOffset:0),controller.signal)
       .then(r=>imageData(r,v.tag)));
     // Allow browsing a category even if Commons full-text search misses its files.
     if(!addMore)for(const cat of filters.categories.slice(0,2))jobs.push(()=>categoryImages(cat,controller.signal));
     const settled=[];
     // A small concurrency cap is friendlier to Commons and avoids bursts of API calls.
     for(let start=0;start<jobs.length;start+=4){
       settled.push(...await Promise.allSettled(jobs.slice(start,start+4).map(fn=>fn())));
       if(ticket!==requestId||controller.signal.aborted)break;
     }
     if(ticket!==requestId)return;
     if(!settled.some(x=>x.status==='fulfilled'))throw new Error('A API de imagens não respondeu.');
     const candidates=mergePhotos([...images,...settled.flatMap(x=>x.status==='fulfilled'?x.value:[])]);
     images=candidates.filter(pic=>imageIsEligible(pic,filters)).map(pic=>scoreImage(pic,filters))
       .sort((a,b)=>b.score-a.score).slice(0,60);
     showResults();
     nextOffset+=40;
     moreImagesButton.classList.toggle('hidden',!variants.length||nextOffset>=200);
     const unknownDates=images.filter(pic=>(filters.minYear!=null||filters.maxYear!=null)&&pic.year==null).length;
     if(images.length) setStatus(`${images.length} imagens encontradas. Prioridade para correspondências de assunto, autor, título e data. ${unknownDates?`${unknownDates} sem data de criação verificável. `:''}Confira o arquivo original para confirmar os metadados.`);
     else setStatus('Nenhuma imagem encontrada com esses filtros. Tente retirar um filtro ou buscar termos em inglês.',true);
   }catch(err){
     if(ticket===requestId){setStatus(`Falha na consulta de imagens: ${String(err.message||err)}. Verifique a conexão com o Commons.`,true);if(!images.length)$('jig-gallery-empty').classList.remove('hidden');}
   }finally{clearTimeout(stopper);if(ticket===requestId){searchButton.disabled=false;moreImagesButton.disabled=false;}}
 }
 function search(){return imageSearch(false);}
 const searchForm=$('jig-search-form');
 searchForm.addEventListener('submit',event=>{event.preventDefault();search();});
 const examples={
   monet:{subject:'gardens',author:'Claude Monet',type:'art'},
   landscape:{subject:'landscape',type:'photograph'},
   paris:{subject:'Paris',title:'',type:'photograph',period:'1900s'}
 };
 section.querySelectorAll('[data-preset]').forEach(button=>button.addEventListener('click',()=>{
   const config=examples[button.dataset.preset];if(!config)return;
   for(const id of advFields)$(id).value='';
   $('jig-period').value=config.period||'';
   $('jig-subject').value=config.subject||'';
   $('jig-author').value=config.author||'';
   $('jig-title').value=config.title||'';
   $('jig-types').querySelectorAll('[data-value]').forEach(el=>el.setAttribute('aria-pressed',String(config.type===el.dataset.value)));
   search();
 }));

 moreImagesButton.addEventListener('click',()=>imageSearch(true));

 function chooseImage(index) {
   const pic=images[index];if(!pic)return;
   setStatus('Carregando imagem selecionada…');
   const probe=new Image();
   probe.onload=()=>{
     selectedImage=pic;
     game.classList.remove('hidden');
     $('jig-image-name').textContent=pic.name;
     $('jig-credit-link').href=pic.source;
     newPuzzle();
     setStatus('Imagem pronta. Monte o quebra-cabeça arrastando peças ou tocando em uma peça e um quadrado.');
     game.scrollIntoView({behavior:'smooth',block:'nearest'});
   };
   probe.onerror=()=>setStatus('Essa imagem não carregou. Escolha outra miniatura ou busque novamente.',true);
   probe.src=pic.url;
 }

 // Interlocking tabs: each shared edge has one outward knob and one inward hole.
 function edgePath(x1,y1,x2,y2,nx,ny,sign,tab) {
   const dx=x2-x1,dy=y2-y1;
   const p=(fraction,normal=0)=>`${(x1+dx*fraction+nx*normal).toFixed(3)},${(y1+dy*fraction+ny*normal).toFixed(3)}`;
   if(!sign)return `L ${p(1)}`;
   const t=sign*tab;
   return `L ${p(.33)} C ${p(.39,0)} ${p(.39,t*.08)} ${p(.36,t*.16)} C ${p(.28,t*.54)} ${p(.41,t*.96)} ${p(.5,t*.96)} C ${p(.59,t*.96)} ${p(.72,t*.54)} ${p(.64,t*.16)} C ${p(.61,t*.08)} ${p(.61,0)} ${p(.67)} L ${p(1)}`;
 }
 function tileGeometry(id) {
   const r=Math.floor(id/cols), c=id%cols;
   const w=100,h=100*cols/rows/selectedImage.ratio;
   const tab=Math.min(w*.21,h*.26);
   const top = r>0 ? -edgeVertical[(r-1)*cols+c]:0;
   const right = c<cols-1 ? edgeHorizontal[r*(cols-1)+c]:0;
   const bottom = r<rows-1 ? edgeVertical[r*cols+c]:0;
   const left = c>0 ? -edgeHorizontal[r*(cols-1)+c-1]:0;
   const path=`M 0,0 ${edgePath(0,0,w,0,0,-1,top,tab)} ${edgePath(w,0,w,h,1,0,right,tab)} ${edgePath(w,h,0,h,0,1,bottom,tab)} ${edgePath(0,h,0,0,-1,0,left,tab)} Z`;
   return {r,c,w,h,tab,path};
 }
 function pieceElement(id) {
   const {r,c,w,h,tab,path}=tileGeometry(id);
   const piece=document.createElement('button');
   piece.type='button';piece.className='jig-piece';piece.draggable=true;
   piece.dataset.jigPiece=String(id);
   piece.setAttribute('aria-label',`Peça ${id+1}`);
   piece.setAttribute('aria-pressed',String(id===selected));
   piece.style.setProperty('--jig-left', `${-100*tab/w}%`);
   piece.style.setProperty('--jig-top', `${-100*tab/h}%`);
   piece.style.setProperty('--jig-width',`${100*(w+2*tab)/w}%`);
   piece.style.setProperty('--jig-height',`${100*(h+2*tab)/h}%`);
   const ns='http://www.w3.org/2000/svg';
   const makeSvg=(tag)=>document.createElementNS(ns,tag);
   const svg=makeSvg('svg');svg.setAttribute('viewBox',`${-tab} ${-tab} ${w+2*tab} ${h+2*tab}`);
   svg.setAttribute('preserveAspectRatio','none');svg.setAttribute('aria-hidden','true');
   const defs=makeSvg('defs'); const clip=makeSvg('clipPath'); const clipId=`jig-clip-${++uid}`;
   clip.setAttribute('id',clipId);const outline=makeSvg('path');outline.setAttribute('d',path);
   clip.append(outline);defs.append(clip);svg.append(defs);
   const image=makeSvg('image');image.setAttribute('href',selectedImage.url);
   image.setAttribute('x',String(-c*w));image.setAttribute('y',String(-r*h));
   image.setAttribute('width',String(cols*w));image.setAttribute('height',String(rows*h));
   image.setAttribute('preserveAspectRatio','none');
   image.setAttribute('clip-path',`url(#${clipId})`);svg.append(image);
   const border=makeSvg('path');border.setAttribute('d',path);border.setAttribute('fill','none');
   border.setAttribute('stroke','#fff5ed');border.setAttribute('stroke-opacity','.85');
   border.setAttribute('stroke-width',String(Math.min(1.25,Math.max(.55,w/120))));svg.append(border);
   piece.append(svg);
   return piece;
 }
 function render() {
   if(!selectedImage)return;
   cols=rows=Number(difficulty.value);
   const count=cols*rows;
   board.style.aspectRatio=String(selectedImage.ratio);
   board.style.gridTemplateColumns=`repeat(${cols},minmax(0,1fr))`;
   board.style.gridTemplateRows=`repeat(${rows},minmax(0,1fr))`;
   board.style.setProperty('--jig-reference',`url("${selectedImage.url.replace(/"/g,'%22')}")`);
   tray.style.setProperty('--jig-cell-ratio',String(selectedImage.ratio));
   tray.style.gridTemplateColumns=`repeat(${Math.max(3,Math.min(5,cols))},minmax(0,1fr))`;
   const boardCells=document.createDocumentFragment();
   for(let i=0;i<count;i++) {
     const cell=document.createElement('div');cell.className='jig-board-cell';cell.dataset.slot=String(i);
     cell.setAttribute('role','gridcell');cell.tabIndex=0;cell.setAttribute('aria-label',`Posição ${i+1}. Pressione Enter para colocar a peça selecionada.`);
     if(slots[i]!==null)cell.append(pieceElement(slots[i]));
     boardCells.append(cell);
   }
   board.replaceChildren(boardCells);
   const trayCells=document.createDocumentFragment();
   for (const id of trayOrder) {
     if(slots.includes(id))continue;
     const holder=document.createElement('div');holder.className='jig-tray-cell';holder.dataset.trayId=String(id);
     holder.append(pieceElement(id));trayCells.append(holder);
   }
   tray.replaceChildren(trayCells);
   const placed=slots.filter(x=>x!==null).length;
   $('jig-progress').textContent=`${placed} de ${count} peças no tabuleiro`;
   returnBtn.disabled=selected===null || !slots.includes(selected);
   const solved=slots.every((id,i)=>id===i);
   winBox.classList.toggle('hidden',!solved);
   if(solved)setStatus('Quebra-cabeça concluído! Escolha outra imagem ou jogue novamente.');
 }
 function newPuzzle() {
   if(!selectedImage)return;
   cols=rows=Number(difficulty.value);
   const count=cols*rows;
   slots=Array(count).fill(null);
   trayOrder=shuffle(Array.from({length:count},(_,i)=>i));
   edgeHorizontal=Array.from({length:rows*(cols-1)},()=>Math.random()<.5?-1:1);
   edgeVertical=Array.from({length:(rows-1)*cols},()=>Math.random()<.5?-1:1);
   selected=null;
   previewBtn.setAttribute('aria-pressed','false');
   board.classList.remove('reference-on');
   render();
 }
 function selectPiece(id) {
   selected= selected===id ? null : id;
   render();
 }
 function placePiece(id,to) {
   if(id===null||id<0||to<0||to>=slots.length)return;
   const oldPosition=slots.indexOf(id);
   if(oldPosition===to){selected=null;render();return;}
   const replaced=slots[to];
   if(oldPosition!==-1)slots[oldPosition]=replaced;
   slots[to]=id;
   selected=null;
   render();
 }
 function toTray(id) {
   const index=slots.indexOf(id);
   if(index!==-1)slots[index]=null;
   selected=null;render();
 }
 function rootClick(event) {
   // Ignore native synthetic clicks immediately after a mouse drag.
   if(Date.now()-pieceCreatedAt < 130)return;
   const piece=event.target.closest('[data-jig-piece]');
   if(piece){
     const clicked=Number(piece.dataset.jigPiece);
     const occupied=slots.indexOf(clicked);
     if(selected!==null && selected!==clicked && occupied>=0){placePiece(selected,occupied);return;}
     selectPiece(clicked);return;
   }
   const destination=event.target.closest('[data-slot]');
   if(destination && selected!==null){placePiece(selected,Number(destination.dataset.slot));return;}
   if(tray.contains(event.target) && selected!==null && slots.includes(selected))toTray(selected);
 }
 board.addEventListener('click',rootClick);
 board.addEventListener('keydown', event => {
   if(selected===null || (event.key!=='Enter' && event.key!==' '))return;
   if(!event.target.matches('[data-slot]'))return;
   event.preventDefault();placePiece(selected,Number(event.target.dataset.slot));
 });
 tray.addEventListener('click',rootClick);
 const dragStart=event=>{
   const piece=event.target.closest('[data-jig-piece]');
   if(!piece)return;
   dragId=Number(piece.dataset.jigPiece);
   event.dataTransfer.effectAllowed='move';event.dataTransfer.setData('text/plain',String(dragId));
   piece.classList.add('dragging');
 };
 [board,tray].forEach(el=>{
   el.addEventListener('dragstart',dragStart);
   el.addEventListener('dragend',()=>{dragId=null;pieceCreatedAt=Date.now();render();});
   el.addEventListener('dragover',ev=>{if(dragId!==null){ev.preventDefault();ev.dataTransfer.dropEffect='move';}});
 });
 board.addEventListener('drop',event=>{
   event.preventDefault();
   const cell=event.target.closest('[data-slot]');
   const id=dragId!==null ? dragId : Number(event.dataTransfer.getData('text/plain'));
   if(cell && Number.isInteger(id) && id>=0 && id<slots.length)placePiece(id,Number(cell.dataset.slot));
   dragId=null;pieceCreatedAt=Date.now();
 });
 tray.addEventListener('drop',event=>{
   event.preventDefault();
   const id=dragId!==null ? dragId : Number(event.dataTransfer.getData('text/plain'));
   if(Number.isInteger(id) && id>=0 && id<slots.length)toTray(id);
   dragId=null;pieceCreatedAt=Date.now();
 });
 returnBtn.addEventListener('click',()=>{if(selected!==null)toTray(selected);});
 previewBtn.addEventListener('click',()=>{
   const visible=previewBtn.getAttribute('aria-pressed')==='true';
   previewBtn.setAttribute('aria-pressed',String(!visible));
   previewBtn.textContent=visible?'Ver referência':'Ocultar referência';
   board.classList.toggle('reference-on',!visible);
 });
 resetBtn.addEventListener('click',newPuzzle);
 difficulty.addEventListener('change',()=>{if(selectedImage)newPuzzle();});
})();

    