
          (()=>{
            'use strict';
            const section=document.getElementById('nasa-eyes-section');
            if(!section)return;
            const byId=id=>document.getElementById(id);
            const frame=byId('ney-iframe'),poster=byId('ney-poster'),status=byId('ney-status');
            const modes={
              solar:{
                url:'https://eyes.nasa.gov/apps/solar-system/#/',
                name:'Sistema Solar em 3D',
                desc:'Planetas, luas, asteroides, sondas e trajetórias de missões com controle de tempo.',
                title:'O Sistema Solar com dados da NASA',
                intro:'No aplicativo original, navegue por planetas, luas e missões da NASA. É possível avançar e retroceder no tempo.',
                features:[['Planetas e luas','Exploração do Sistema Solar em 3D'],['Missões espaciais','Sondas e trajetórias de exploração'],['Viagem no tempo','Avanço e retrocesso da simulação'],['Corpos menores','Asteroides, cometas e outros destinos']],
                iframeTitle:'NASA Eyes on the Solar System — experiência oficial'
              },
              earth:{
                url:'https://eyes.nasa.gov/apps/earth/#/',
                name:'Terra em 3D e sinais vitais',
                desc:'Satélites em órbita, mapas científicos e observações ambientais da Terra.',
                title:'Conheça a Terra pelos satélites',
                intro:'O aplicativo oficial exibe observações de missões da NASA, camadas de dados sobre atmosfera, oceanos e terra firme e satélites em órbita.',
                features:[['Satélites da NASA','Missões de observação da Terra'],['Temperatura e oceanos','Temperatura do ar, temperatura e nível do mar'],['Atmosfera','CO₂, ozônio e vapor d’água'],['Água e vegetação','Precipitação, umidade do solo e clorofila']],
                iframeTitle:'NASA Eyes on the Earth — experiência oficial'
              }
            };
            let mode='solar',started=false;

            const commonTerms=[
              ['Explore','Explorar','Navegar entre objetos e informações disponíveis.'],
              ['Search','Pesquisar','Encontrar um objeto, missão ou tema.'],
              ['Zoom in / Zoom out','Aproximar / Afastar','Alterar a distância da câmera virtual.'],
              ['Rotate','Girar','Mudar o ângulo de observação do globo ou da cena.'],
              ['View','Visualização','Selecionar o tipo de vista disponível.'],
              ['Select','Selecionar','Escolher um objeto ou conjunto de dados.'],
              ['Layers','Camadas','Ativar ou desativar diferentes informações visuais.'],
              ['Legend','Legenda','Explicação das cores e símbolos exibidos.'],
              ['Time','Tempo','Instante representado na visualização.'],
              ['Play / Pause','Reproduzir / Pausar','Avançar ou interromper a animação.'],
              ['Date','Data','Dia usado na observação ou na simulação.'],
              ['Reset','Redefinir','Restaurar a visualização padrão.']
            ];
            const glossaries={
              solar:{
                title:'Glossário · Eyes on the Solar System',
                intro:'Termos de astronomia e navegação associados à exploração do Sistema Solar. A organização exata da interface oficial pode variar.',
                tip:'Órbita → orbit · Sonda espacial → spacecraft · Linha do tempo → timeline',
                entries:[
                  ['Solar System','Sistema Solar','O Sol e os corpos que orbitam ao seu redor.'],
                  ['Sun','Sol','A estrela central do Sistema Solar.'],
                  ['Planet','Planeta','Corpo celeste que orbita uma estrela.'],
                  ['Moon / Natural satellite','Lua / Satélite natural','Corpo que orbita um planeta ou outro corpo maior.'],
                  ['Orbit','Órbita','Trajetória percorrida por um corpo em torno de outro.'],
                  ['Orbital period','Período orbital','Tempo necessário para completar uma órbita.'],
                  ['Trajectory','Trajetória','Caminho de um corpo ou espaçonave no espaço.'],
                  ['Spacecraft','Sonda / Nave espacial','Veículo criado para explorar o espaço.'],
                  ['Mission','Missão','Projeto de pesquisa e exploração espacial.'],
                  ['Flyby','Sobrevoo','Passagem de uma sonda próxima a um corpo celeste.'],
                  ['Asteroid','Asteroide','Corpo menor composto principalmente de rocha e metal.'],
                  ['Comet','Cometa','Corpo de gelo e poeira que pode desenvolver cauda perto do Sol.'],
                  ['Dwarf planet','Planeta anão','Objeto como Plutão, distinto dos oito planetas principais.'],
                  ['Asteroid belt','Cinturão de asteroides','Região com muitos corpos menores entre Marte e Júpiter.'],
                  ['Distance / AU','Distância / UA','UA significa unidade astronômica: distância média Terra–Sol.'],
                  ['Simulation speed','Velocidade da simulação','Ritmo de avanço do tempo virtual.'],
                  ['Timeline','Linha do tempo','Controle de data e evolução da simulação.'],
                  ['Focus','Focar','Centralizar a câmera em um objeto.'],
                  ['Scale','Escala','Relação entre distâncias ou tamanhos mostrados e valores reais.'],
                  ['Surface','Superfície','Parte externa visível de um planeta ou lua.']
                ]
              },
              earth:{
                title:'Glossário · Eyes on the Earth',
                intro:'Vocabulário relacionado a satélites e indicadores ambientais da Terra. A disponibilidade de cada camada depende dos dados mostrados pela NASA.',
                tip:'Satélite → satellite · Temperatura da superfície → surface temperature · Precipitação → precipitation',
                entries:[
                  ['Earth','Terra','O nosso planeta e suas observações ambientais.'],
                  ['Satellite','Satélite','Equipamento espacial usado para medir e observar a Terra.'],
                  ['Earth observation','Observação da Terra','Medições por satélites e sensores científicos.'],
                  ['Atmosphere','Atmosfera','Camada de gases que envolve o planeta.'],
                  ['Surface temperature','Temperatura da superfície','Temperatura medida ou estimada da superfície terrestre.'],
                  ['Air temperature','Temperatura do ar','Temperatura atmosférica em determinado local ou nível.'],
                  ['Sea surface temperature','Temperatura da superfície do mar','Temperatura da camada superior dos oceanos.'],
                  ['Sea level','Nível do mar','Altura média da superfície oceânica.'],
                  ['Carbon dioxide (CO₂)','Dióxido de carbono (CO₂)','Gás de efeito estufa acompanhado por observações científicas.'],
                  ['Ozone','Ozônio','Gás presente em várias camadas da atmosfera.'],
                  ['Water vapor','Vapor de água','Água em estado gasoso presente no ar.'],
                  ['Cloud cover','Cobertura de nuvens','Proporção da área coberta por nuvens.'],
                  ['Precipitation','Precipitação','Chuva, neve e outras formas de água que caem da atmosfera.'],
                  ['Soil moisture','Umidade do solo','Quantidade de água presente no solo.'],
                  ['Vegetation','Vegetação','Cobertura de plantas observável na superfície.'],
                  ['Chlorophyll','Clorofila','Pigmento útil no acompanhamento da vegetação e do fitoplâncton.'],
                  ['Wildfires','Incêndios florestais','Áreas ou focos de fogo observados por sensores.'],
                  ['Aerosols','Aerossóis','Partículas suspensas na atmosfera.'],
                  ['Satellite orbit','Órbita do satélite','Percurso de um satélite ao redor da Terra.'],
                  ['Data layer','Camada de dados','Informação científica representada sobre o globo.'],
                  ['Color scale','Escala de cores','Relação entre cor e valor de um indicador.'],
                  ['Measurement','Medição','Valor observado ou estimado pelos instrumentos.']
                ]
              }
            };
            function renderGlossary(){
              const data=glossaries[mode];
              byId('ney-glossary-title').textContent=data.title;
              byId('ney-glossary-intro').textContent=data.intro;
              byId('ney-translation-tip').textContent=data.tip+' · Tradução de referência; não modifica o conteúdo incorporado.';
              const normalized=t=>String(t).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
              const query=normalized(byId('ney-glossary-search').value.trim());
              const results=[...commonTerms,...data.entries].filter(entry=>!query||normalized(entry.join(' ')).includes(query));
              const root=byId('ney-glossary-results');root.replaceChildren();
              results.forEach(([english,portuguese,description])=>{
                const item=document.createElement('div');item.className='ney-glossary-item';
                const heading=document.createElement('div');heading.className='ney-glossary-term';
                const orig=document.createElement('b');orig.textContent=english;
                const translation=document.createElement('span');translation.textContent='→ '+portuguese;
                const expl=document.createElement('p');expl.textContent=description;
                heading.append(orig,translation);item.append(heading,expl);root.append(item);
              });
              if(!results.length){const empty=document.createElement('p');empty.className='ney-glossary-empty';empty.textContent='Nenhum termo encontrado. Experimente outra palavra.';root.append(empty);}
              byId('ney-glossary-count').textContent=results.length+' '+(results.length===1?'termo encontrado':'termos encontrados');
            }
            byId('ney-glossary-search').addEventListener('input',renderGlossary);
            byId('ney-guide-jump').addEventListener('click',()=>{byId('ney-glossary-search').focus({preventScroll:true});});

            function renderInfo(){
              const data=modes[mode];
              byId('ney-viewname').textContent=data.name;
              byId('ney-viewdesc').textContent=data.desc;
              byId('ney-aside-title').textContent=data.title;
              byId('ney-aside-intro').textContent=data.intro;
              byId('ney-official').href=data.url;
              frame.title=data.iframeTitle;
              renderGlossary();
              byId('ney-panel').setAttribute('aria-labelledby','ney-tab-'+mode);
              const features=byId('ney-features');features.replaceChildren();
              data.features.forEach(([name,description],index)=>{
                const row=document.createElement('div');row.className='ney-feature';
                const number=document.createElement('span');number.className='ney-feature-mark';number.textContent=String(index+1).padStart(2,'0');
                const wrap=document.createElement('div');const title=document.createElement('strong');title.textContent=name;const small=document.createElement('small');small.textContent=description;wrap.append(title,small);row.append(number,wrap);features.append(row);
              });
              section.querySelectorAll('[data-ney-mode]').forEach(button=>{
                const active=button.dataset.neyMode===mode;
                button.classList.toggle('ney-tab-active',active);
                button.setAttribute('aria-selected',String(active));
                button.tabIndex=active?0:-1;
              });
            }
            function launch(){
              const url=modes[mode].url;
              poster.hidden=true;
              frame.hidden=false;
              started=true;
              frame.removeAttribute('src');
              frame.src=url;
              status.textContent='Carregando o aplicativo da NASA. Se o quadro ficar vazio ou não permitir incorporação, abra o site oficial no botão acima.';
            }
            function choose(key){
              if(!modes[key] || key===mode)return;
              mode=key;
              byId('ney-glossary-search').value='';
              renderInfo();
              if(started)launch();
              else status.textContent='Clique em “Iniciar visualização”. Também é possível abrir a experiência diretamente no site da NASA.';
            }
            section.querySelectorAll('[data-ney-mode]').forEach(button=>button.addEventListener('click',()=>choose(button.dataset.neyMode)));
            byId('ney-start').addEventListener('click',launch);
            byId('ney-reload').addEventListener('click',launch);
            byId('ney-fullscreen').addEventListener('click',()=>{
              if(!started){launch();}
              const target=byId('ney-framebox');
              if(target.requestFullscreen)target.requestFullscreen().catch(()=>{status.textContent='Tela cheia indisponível neste navegador. Use o botão “Abrir no site oficial da NASA”.';});
              else status.textContent='Tela cheia indisponível neste navegador. Use o botão “Abrir no site oficial da NASA”.';
            });
            frame.addEventListener('load',()=>{if(started)status.textContent='Página da NASA solicitada. Se a visualização não aparecer, o navegador pode estar bloqueando a incorporação. Use “Abrir no site oficial da NASA”.';});
            renderInfo();
          })();
          