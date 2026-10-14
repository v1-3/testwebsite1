// Country and territory clue data. Load before scripts/games/geography.js.
window.AtlasCountryData = (() => {
    const countries = [
    {
        "name": "Brasil",
        "aliases": [
            "Brazil",
            "República Federativa do Brasil",
            "Brazilian Republic"
        ],
        "hints": [
            [
                "Geografia",
                "É o maior país da América do Sul e faz fronteira com quase todos os países do continente, exceto Chile e Equador."
            ],
            [
                "História",
                "Declarou sua independência de Portugal em 1822 e aboliu a escravidão em 1888."
            ],
            [
                "Economia",
                "Está entre os grandes produtores mundiais de alimentos, minério de ferro, petróleo e biocombustíveis."
            ],
            [
                "Cultura",
                "A língua oficial é o português; samba, bossa nova, capoeira e futebol têm projeção internacional."
            ],
            [
                "Atualidades",
                "Recebeu a conferência climática da ONU COP30 em 2025, na região amazônica."
            ],
            [
                "Capital",
                "Brasília."
            ],
            [
                "Idiomas",
                "O português é a língua oficial."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se real brasileiro."
            ],
            [
                "Fronteiras",
                "Faz fronteira terrestre com países vizinhos de diferentes sub-regiões, incluindo Argentina, Bolívia, Colômbia, Guiana Francesa, Guiana e outros."
            ],
            [
                "Área",
                "O território tem aproximadamente 8.500.000 km² de área."
            ]
        ]
    },
    {
        "name": "Japão",
        "aliases": [
            "Japan",
            "Nippon",
            "Nihon"
        ],
        "hints": [
            [
                "Geografia",
                "É um arquipélago do leste da Ásia, no oceano Pacífico, formado por milhares de ilhas."
            ],
            [
                "História",
                "A Restauração Meiji, iniciada em 1868, acelerou a modernização do país."
            ],
            [
                "Economia",
                "É conhecido pelas indústrias automotiva, eletrônica, robótica e de alta precisão."
            ],
            [
                "Cultura",
                "Anime, mangá, cerimônia do chá e culinária como sushi são conhecidos mundialmente."
            ],
            [
                "Atualidades",
                "Foi anfitrião da Exposição Mundial de 2025, realizada em Osaka."
            ],
            [
                "Capital",
                "Tóquio."
            ],
            [
                "Idiomas",
                "O japonês é a língua predominante."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se iene japonês."
            ],
            [
                "Fronteiras",
                "Não tem fronteiras terrestres internacionais; seu território é insular ou separado por água de outros países."
            ],
            [
                "Área",
                "O território tem aproximadamente 380.000 km² de área."
            ]
        ]
    },
    {
        "name": "África do Sul",
        "aliases": [
            "South Africa",
            "Republica da Africa do Sul",
            "RSA"
        ],
        "hints": [
            [
                "Geografia",
                "Ocupa o extremo sul do continente africano e tem litoral nos oceanos Atlântico e Índico."
            ],
            [
                "História",
                "O regime de apartheid terminou no início da década de 1990; as primeiras eleições democráticas multirraciais ocorreram em 1994."
            ],
            [
                "Economia",
                "Possui importantes reservas de platina, ouro, cromo e outros recursos minerais."
            ],
            [
                "Cultura",
                "Tem 12 línguas oficiais, incluindo zulu, xhosa, africâner e inglês."
            ],
            [
                "Atualidades",
                "Presidiu o G20 e sediou sua cúpula de líderes em 2025."
            ],
            [
                "Capital",
                "Pretória é a capital executiva; Cidade do Cabo e Bloemfontein também sediam poderes nacionais."
            ],
            [
                "Idiomas",
                "O país reconhece 12 línguas oficiais, incluindo zulu, xhosa, africâner, inglês e a língua de sinais sul-africana."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se rand sul-africano."
            ],
            [
                "Fronteiras",
                "Faz fronteira terrestre com Botsuana, Essuatíni, Lesoto, Moçambique, Namíbia e Zimbábue."
            ],
            [
                "Área",
                "O território tem aproximadamente 1.200.000 km² de área."
            ]
        ]
    },
    {
        "name": "França",
        "aliases": [
            "France",
            "République française",
            "Republica Francesa"
        ],
        "hints": [
            [
                "Geografia",
                "Fica na Europa Ocidental e tem costas no Atlântico e no Mediterrâneo, além de territórios ultramarinos."
            ],
            [
                "História",
                "A Revolução Francesa começou em 1789 e transformou a política europeia."
            ],
            [
                "Economia",
                "Aeronáutica, agricultura, turismo, artigos de luxo e energia são setores importantes."
            ],
            [
                "Cultura",
                "A língua francesa, a gastronomia, a moda e o cinema têm forte influência internacional."
            ],
            [
                "Esportes",
                "Sediou os Jogos Olímpicos de Verão de 2024."
            ],
            [
                "Capital",
                "Paris."
            ],
            [
                "Idiomas",
                "O francês é a língua oficial."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se euro."
            ],
            [
                "Fronteiras",
                "Na Europa, faz fronteira terrestre com Andorra, Bélgica, Alemanha, Itália, Luxemburgo, Mônaco, Espanha e Suíça."
            ],
            [
                "Área",
                "O território tem aproximadamente 640.000 km² de área."
            ]
        ]
    },
    {
        "name": "Itália",
        "aliases": [
            "Italy",
            "Italia",
            "Repubblica Italiana"
        ],
        "hints": [
            [
                "Geografia",
                "É uma península do sul da Europa, com formato frequentemente comparado ao de uma bota, além de grandes ilhas."
            ],
            [
                "História",
                "A região foi o centro do Império Romano e, séculos depois, um dos principais focos do Renascimento."
            ],
            [
                "Economia",
                "Máquinas, veículos, moda, alimentos e turismo são setores relevantes."
            ],
            [
                "Cultura",
                "A culinária, a ópera, o design e o patrimônio artístico são marcas internacionais."
            ],
            [
                "Atualidades",
                "Em 2026, coorganizou os Jogos Olímpicos de Inverno com foco nos Alpes."
            ],
            [
                "Capital",
                "Roma."
            ],
            [
                "Idiomas",
                "O italiano é a língua oficial."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se euro."
            ],
            [
                "Fronteiras",
                "Faz fronteira terrestre com países vizinhos de diferentes sub-regiões, incluindo Áustria, França, San Marino, Eslovênia, Suíça e outros."
            ],
            [
                "Área",
                "O território tem aproximadamente 300.000 km² de área."
            ]
        ]
    },
    {
        "name": "Azerbaijão",
        "aliases": [
            "Azerbaijan",
            "Azerbaidjão",
            "Azerbaijan Republic"
        ],
        "hints": [
            [
                "Geografia",
                "Fica no sul do Cáucaso, entre Europa Oriental e Ásia Ocidental, às margens do mar Cáspio."
            ],
            [
                "História",
                "Recuperou sua independência em 1991, após a dissolução da União Soviética."
            ],
            [
                "Economia",
                "Petróleo e gás natural têm grande importância para suas exportações."
            ],
            [
                "Cultura",
                "A língua azeri pertence ao ramo túrquico; a música tradicional mugham é patrimônio cultural reconhecido."
            ],
            [
                "Atualidades",
                "Sediou a conferência climática da ONU COP29 em 2024."
            ],
            [
                "Capital",
                "Baku."
            ],
            [
                "Idiomas",
                "O azerbaijano é a língua oficial."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se manat azerbaijano."
            ],
            [
                "Fronteiras",
                "Faz fronteira terrestre com Armênia, Geórgia, Irã, Rússia e Turquia."
            ],
            [
                "Área",
                "O território tem aproximadamente 87.000 km² de área."
            ]
        ]
    },
    {
        "name": "Emirados Árabes Unidos",
        "aliases": [
            "EAU",
            "UAE",
            "United Arab Emirates",
            "Emirados",
            "Emirados Arabes"
        ],
        "hints": [
            [
                "Geografia",
                "É uma federação de sete emirados situada na Península Arábica, junto ao golfo Pérsico."
            ],
            [
                "História",
                "A federação foi formada em 1971, quando vários emirados se uniram após o período de protetorado britânico."
            ],
            [
                "Economia",
                "Embora petróleo e gás sejam importantes, comércio, aviação, finanças e turismo também cresceram bastante."
            ],
            [
                "Cultura",
                "O árabe é a língua oficial, e a cultura local combina tradições beduínas e influências comerciais internacionais."
            ],
            [
                "Eventos internacionais",
                "Recebeu a Expo 2020, realizada entre 2021 e 2022 devido à pandemia."
            ],
            [
                "Capital",
                "Abu Dhabi."
            ],
            [
                "Idiomas",
                "O árabe é a língua oficial."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se dirham dos Emirados Árabes Unidos."
            ],
            [
                "Fronteiras",
                "Faz fronteira terrestre com Omã e Arábia Saudita."
            ],
            [
                "Área",
                "O território tem aproximadamente 84.000 km² de área."
            ]
        ]
    },
    {
        "name": "Egito",
        "aliases": [
            "Egypt",
            "Misr",
            "Republica Arabe do Egito"
        ],
        "hints": [
            [
                "Geografia",
                "O rio Nilo atravessa seu território e deságua no mar Mediterrâneo; o mar Vermelho fica a leste."
            ],
            [
                "História",
                "Abriga uma das civilizações antigas mais conhecidas, associada a faraós, templos e pirâmides."
            ],
            [
                "Economia",
                "O canal de Suez é uma rota estratégica para o comércio marítimo entre a Europa e a Ásia."
            ],
            [
                "Cultura",
                "O árabe é a língua oficial, e o país tem influência importante na música e no cinema do mundo árabe."
            ],
            [
                "Política internacional",
                "Passou a integrar o grupo BRICS em 2024."
            ],
            [
                "Capital",
                "Cairo."
            ],
            [
                "Idiomas",
                "O árabe é a língua oficial."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se libra egípcia."
            ],
            [
                "Fronteiras",
                "Faz fronteira terrestre com Israel, Líbia e Sudão."
            ],
            [
                "Área",
                "O território tem aproximadamente 1.000.000 km² de área."
            ]
        ]
    },
    {
        "name": "Turquia",
        "aliases": [
            "Turkey",
            "Türkiye",
            "Turkiye",
            "Republica da Turquia"
        ],
        "hints": [
            [
                "Geografia",
                "Seu território se estende entre o sudeste da Europa e a Ásia Ocidental, próximo ao mar Negro e ao Mediterrâneo."
            ],
            [
                "História",
                "Foi o núcleo do Império Otomano; a república moderna foi fundada em 1923."
            ],
            [
                "Economia",
                "Manufatura, têxteis, turismo, agricultura e construção têm papéis importantes."
            ],
            [
                "Cultura",
                "A língua oficial é o turco, e a culinária inclui pratos como meze, kebab e baklava."
            ],
            [
                "Geopolítica",
                "Controla estreitos que ligam o mar Negro ao Mediterrâneo, com relevância para o comércio e a segurança regional."
            ],
            [
                "Capital",
                "Ancara."
            ],
            [
                "Idiomas",
                "O turco é a língua oficial."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se lira turca."
            ],
            [
                "Fronteiras",
                "Faz fronteira terrestre com países vizinhos de diferentes sub-regiões, incluindo Armênia, Azerbaijão, Bulgária, Geórgia, Grécia e outros."
            ],
            [
                "Área",
                "O território tem aproximadamente 780.000 km² de área."
            ]
        ]
    },
    {
        "name": "Singapura",
        "aliases": [
            "Singapore",
            "Cingapura",
            "Republica de Singapura"
        ],
        "hints": [
            [
                "Geografia",
                "É um pequeno país insular do Sudeste Asiático, próximo ao extremo sul da Península Malaia."
            ],
            [
                "História",
                "Tornou-se um Estado independente em 1965."
            ],
            [
                "Economia",
                "Seu porto, os serviços financeiros, a logística e a tecnologia têm importância global."
            ],
            [
                "Idiomas",
                "Tem quatro línguas oficiais: inglês, malaio, mandarim e tâmil."
            ],
            [
                "Política",
                "É uma cidade-Estado soberana, ou seja, o país e sua principal área urbana coincidem em grande medida."
            ],
            [
                "Capital",
                "Singapura."
            ],
            [
                "Idiomas",
                "Inglês, malaio, mandarim e tâmil são as quatro línguas oficiais."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se dólar de Singapura."
            ],
            [
                "Fronteiras",
                "Tem ligação terrestre com a Malásia por meio de calçadas e pontes, incluindo a Causeway de Johor."
            ],
            [
                "Área",
                "O território tem aproximadamente 700 km² de área."
            ]
        ]
    },
    {
        "name": "Quênia",
        "aliases": [
            "Kenya",
            "Republica do Quenia"
        ],
        "hints": [
            [
                "Geografia",
                "Fica na África Oriental, tem litoral no oceano Índico e é atravessado pela linha do Equador."
            ],
            [
                "História",
                "Obteve a independência do Reino Unido em 1963."
            ],
            [
                "Economia",
                "Chá, café, horticultura, turismo e serviços digitais contribuem para sua economia."
            ],
            [
                "Cultura",
                "Suaíli e inglês são línguas oficiais; atletas do país são famosos em corridas de longa distância."
            ],
            [
                "Natureza",
                "Abriga savanas e reservas conhecidas pela migração de grandes mamíferos."
            ],
            [
                "Capital",
                "Nairóbi."
            ],
            [
                "Idiomas",
                "Suaíli e inglês são as línguas oficiais."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se xelim queniano."
            ],
            [
                "Fronteiras",
                "Faz fronteira terrestre com Etiópia, Somália, Sudão do Sul, Tanzânia e Uganda."
            ],
            [
                "Área",
                "O território tem aproximadamente 580.000 km² de área."
            ]
        ]
    },
    {
        "name": "Peru",
        "aliases": [
            "Perú",
            "Republica do Peru"
        ],
        "hints": [
            [
                "Geografia",
                "Estende-se da costa do Pacífico aos Andes e à floresta amazônica."
            ],
            [
                "História",
                "Foi o centro do Império Inca, cuja herança permanece visível em sítios arqueológicos."
            ],
            [
                "Economia",
                "Mineração, pesca, agricultura e exportações de cobre são importantes."
            ],
            [
                "Cultura",
                "Espanhol, quéchua e aimará estão entre as línguas usadas no país."
            ],
            [
                "Agricultura",
                "A região andina é um importante centro histórico de domesticação e diversidade de batatas."
            ],
            [
                "Capital",
                "Lima."
            ],
            [
                "Idiomas",
                "O espanhol é oficial; quéchua, aimará e outras línguas indígenas também têm status oficial nas áreas em que predominam."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se sol peruano."
            ],
            [
                "Fronteiras",
                "Faz fronteira terrestre com Bolívia, Brasil, Chile, Colômbia e Equador."
            ],
            [
                "Área",
                "O território tem aproximadamente 1.300.000 km² de área."
            ]
        ]
    },
    {
        "name": "Islândia",
        "aliases": [
            "Iceland",
            "Islandia",
            "Ísland"
        ],
        "hints": [
            [
                "Geografia",
                "É uma ilha do Atlântico Norte marcada por vulcões, geleiras e atividade geotérmica."
            ],
            [
                "História",
                "Foi colonizada principalmente por navegadores nórdicos durante a Era Viking."
            ],
            [
                "Economia",
                "Pesca, turismo e energia renovável têm grande relevância."
            ],
            [
                "Energia",
                "A energia geotérmica e hidrelétrica abastece grande parte de seu sistema elétrico."
            ],
            [
                "Cultura",
                "As sagas medievais e a língua islandesa preservam tradições literárias nórdicas."
            ],
            [
                "Capital",
                "Reykjavík."
            ],
            [
                "Idiomas",
                "O islandês é a língua oficial."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se coroa islandesa."
            ],
            [
                "Fronteiras",
                "Não tem fronteiras terrestres internacionais; seu território é insular ou separado por água de outros países."
            ],
            [
                "Área",
                "O território tem aproximadamente 100.000 km² de área."
            ]
        ]
    },
    {
        "name": "México",
        "aliases": [
            "Mexico",
            "Estados Unidos Mexicanos",
            "United Mexican States"
        ],
        "hints": [
            [
                "Geografia",
                "Fica na América do Norte, entre os Estados Unidos, a América Central, o Pacífico e o golfo do México."
            ],
            [
                "História",
                "Seu território abrigou civilizações como maias e mexicas; conquistou a independência da Espanha em 1821."
            ],
            [
                "Economia",
                "Manufatura, automóveis, agricultura, petróleo e turismo são setores importantes."
            ],
            [
                "Cultura",
                "O espanhol é predominante, e a culinária tradicional inclui pratos à base de milho e pimentas."
            ],
            [
                "Esportes",
                "Sediou as Copas do Mundo masculinas de 1970 e 1986 antes de coorganizar a edição de 2026."
            ],
            [
                "Capital",
                "Cidade do México."
            ],
            [
                "Idiomas",
                "O espanhol é predominante; a legislação reconhece também dezenas de línguas indígenas nacionais."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se peso mexicano."
            ],
            [
                "Fronteiras",
                "Faz fronteira terrestre com Belize, Guatemala e Estados Unidos."
            ],
            [
                "Área",
                "O território tem aproximadamente 2.000.000 km² de área."
            ],
            [
                "Atualidades",
                "Foi um dos três países anfitriões da Copa do Mundo masculina da FIFA de 2026, disputada entre junho e julho."
            ]
        ]
    },
    {
        "name": "Estados Unidos",
        "aliases": [
            "EUA",
            "USA",
            "United States",
            "United States of America",
            "Estados Unidos da America",
            "America",
            "US"
        ],
        "hints": [
            [
                "Geografia",
                "Seu território principal se estende entre os oceanos Atlântico e Pacífico e inclui grandes planícies, desertos e montanhas."
            ],
            [
                "História",
                "A Declaração de Independência foi adotada em 1776."
            ],
            [
                "Economia",
                "Tem uma das maiores economias do mundo, com setores de tecnologia, finanças, indústria, agricultura e entretenimento."
            ],
            [
                "Política",
                "É uma república federal formada por 50 estados."
            ],
            [
                "Esportes",
                "Basquete, beisebol e futebol americano estão entre os esportes de grande popularidade."
            ],
            [
                "Capital",
                "Washington, D.C."
            ],
            [
                "Idiomas",
                "O inglês é a língua predominante; espanhol é a segunda língua mais falada."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se o dólar americano."
            ],
            [
                "Fronteiras",
                "Faz fronteira terrestre com Canadá e México."
            ],
            [
                "Área",
                "O território tem aproximadamente 9.600.000 km² de área."
            ],
            [
                "Atualidades",
                "Foi um dos três países anfitriões da Copa do Mundo masculina da FIFA de 2026, disputada entre junho e julho."
            ]
        ]
    },
    {
        "name": "Argentina",
        "aliases": [
            "Argentina Republic",
            "Republica Argentina"
        ],
        "hints": [
            [
                "Geografia",
                "Ocupa grande parte do sul da América do Sul, incluindo as Pampas, os Andes e regiões patagônicas."
            ],
            [
                "História",
                "Declarou sua independência da Espanha em 1816."
            ],
            [
                "Economia",
                "Agricultura, criação de gado, energia, mineração e lítio são setores relevantes."
            ],
            [
                "Cultura",
                "Tango, mate e futebol são símbolos culturais conhecidos internacionalmente."
            ],
            [
                "Natureza",
                "A geleira Perito Moreno e as paisagens da Patagônia são atrações naturais conhecidas."
            ],
            [
                "Capital",
                "Buenos Aires."
            ],
            [
                "Idiomas",
                "O espanhol é predominante; línguas indígenas também são faladas em várias regiões."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se peso argentino."
            ],
            [
                "Fronteiras",
                "Faz fronteira terrestre com Bolívia, Brasil, Chile, Paraguai e Uruguai."
            ],
            [
                "Área",
                "O território tem aproximadamente 2.800.000 km² de área."
            ]
        ]
    },
    {
        "name": "Suíça",
        "aliases": [
            "Switzerland",
            "Schweiz",
            "Suisse",
            "Svizzera",
            "Confederacao Suica"
        ],
        "hints": [
            [
                "Geografia",
                "É um país sem litoral na Europa Central, com grande parte do território coberta pelos Alpes."
            ],
            [
                "História",
                "Sua confederação tem raízes medievais e o país é conhecido por uma longa tradição de neutralidade."
            ],
            [
                "Economia",
                "Finanças, farmacêutica, instrumentos de precisão e relógios são setores reconhecidos."
            ],
            [
                "Idiomas",
                "Tem quatro línguas nacionais: alemão, francês, italiano e romanche."
            ],
            [
                "Diplomacia",
                "Abriga muitas organizações internacionais e negociações multilaterais."
            ],
            [
                "Capital",
                "Berna."
            ],
            [
                "Idiomas",
                "A Suíça tem quatro línguas nacionais: alemão, francês, italiano e romanche."
            ],
            [
                "Moeda",
                "Entre as moedas utilizadas estão Euro WIR e franco suíço."
            ],
            [
                "Fronteiras",
                "Faz fronteira terrestre com Áustria, França, Itália, Liechtenstein e Alemanha."
            ],
            [
                "Área",
                "O território tem aproximadamente 41.000 km² de área."
            ]
        ]
    },
    {
        "name": "Austrália",
        "aliases": [
            "Australia",
            "Commonwealth of Australia"
        ],
        "hints": [
            [
                "Geografia",
                "É um país-continente entre os oceanos Índico e Pacífico, com vastas áreas áridas no interior."
            ],
            [
                "História",
                "Suas colônias britânicas federaram-se em 1901 para formar a Commonwealth moderna."
            ],
            [
                "Economia",
                "Minérios, energia, agricultura, educação e serviços têm peso expressivo."
            ],
            [
                "Natureza",
                "A Grande Barreira de Corais acompanha parte de sua costa nordeste."
            ],
            [
                "Esportes",
                "Sediou os Jogos Olímpicos de Verão de 2000."
            ],
            [
                "Capital",
                "Camberra."
            ],
            [
                "Idiomas",
                "O inglês é a língua predominante; dezenas de línguas indígenas também são faladas."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se dólar australiano."
            ],
            [
                "Fronteiras",
                "Não tem fronteiras terrestres internacionais; seu território é insular ou separado por água de outros países."
            ],
            [
                "Área",
                "O território tem aproximadamente 7.700.000 km² de área."
            ]
        ]
    },
    {
        "name": "Grécia",
        "aliases": [
            "Greece",
            "Hellas",
            "Hellenic Republic"
        ],
        "hints": [
            [
                "Geografia",
                "Fica no sudeste da Europa e inclui milhares de ilhas nos mares Egeu e Jônico."
            ],
            [
                "História",
                "A Grécia antiga influenciou a filosofia, o teatro, a matemática e as ideias de democracia."
            ],
            [
                "Economia",
                "Turismo, transporte marítimo, agricultura e serviços são setores relevantes."
            ],
            [
                "Cultura",
                "A mitologia, o alfabeto grego e a culinária mediterrânea têm ampla influência."
            ],
            [
                "Esportes",
                "A tradição dos Jogos Olímpicos da Antiguidade surgiu nesse território; os primeiros Jogos modernos ocorreram ali em 1896."
            ],
            [
                "Capital",
                "Atenas."
            ],
            [
                "Idiomas",
                "O grego é a língua oficial."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se euro."
            ],
            [
                "Fronteiras",
                "Faz fronteira terrestre com Albânia, Bulgária, Turquia e Macedônia do Norte."
            ],
            [
                "Área",
                "O território tem aproximadamente 130.000 km² de área."
            ]
        ]
    },
    {
        "name": "Canadá",
        "aliases": [
            "Canada",
            "Dominion of Canada"
        ],
        "hints": [
            [
                "Geografia",
                "É o segundo maior país do mundo em área e tem litoral nos oceanos Atlântico, Pacífico e Ártico."
            ],
            [
                "História",
                "A Confederação que formou o país moderno ocorreu em 1867."
            ],
            [
                "Economia",
                "Energia, mineração, madeira, agricultura, manufatura e serviços são importantes."
            ],
            [
                "Idiomas",
                "Inglês e francês são as línguas oficiais no âmbito federal."
            ],
            [
                "Esportes",
                "O hóquei no gelo é um dos esportes mais associados à identidade nacional."
            ],
            [
                "Capital",
                "Ottawa."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se dólar canadense."
            ],
            [
                "Fronteiras",
                "Faz fronteira terrestre com Estados Unidos."
            ],
            [
                "Área",
                "O território tem aproximadamente 10.000.000 km² de área."
            ],
            [
                "Atualidades",
                "Foi um dos três países anfitriões da Copa do Mundo masculina da FIFA de 2026, disputada entre junho e julho."
            ]
        ]
    },
    {
        "name": "Etiópia",
        "aliases": [
            "Ethiopia",
            "Abissinia",
            "Abyssinia"
        ],
        "hints": [
            [
                "Geografia",
                "Fica no Chifre da África e tem extensas terras altas; não possui litoral atualmente."
            ],
            [
                "História",
                "O antigo reino de Axum foi um importante Estado comercial da região."
            ],
            [
                "Economia",
                "A agricultura é importante, e o café tem grande valor econômico e cultural."
            ],
            [
                "Cultura",
                "O amárico é uma língua federal de trabalho, e o país tem calendários e tradições religiosas próprios."
            ],
            [
                "Diplomacia",
                "A sede da União Africana fica em seu território."
            ],
            [
                "Capital",
                "Adis Abeba."
            ],
            [
                "Idiomas",
                "O país reúne dezenas de línguas; amárico é uma das principais línguas de trabalho federais."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se birr etíope."
            ],
            [
                "Fronteiras",
                "Faz fronteira terrestre com Djibuti, Eritreia, Quênia, Somália, Sudão, Sudão do Sul e a região da Somalilândia."
            ],
            [
                "Área",
                "O território tem aproximadamente 1.100.000 km² de área."
            ]
        ]
    },
    {
        "name": "Ucrânia",
        "aliases": [
            "Ukraine",
            "Ukrayina"
        ],
        "hints": [
            [
                "Geografia",
                "Fica na Europa Oriental e tem litoral no mar Negro e no mar de Azov."
            ],
            [
                "História",
                "Tornou-se independente em 1991, após a dissolução da União Soviética."
            ],
            [
                "Economia",
                "Grãos, óleo de girassol, metalurgia, indústria e tecnologia da informação são setores relevantes."
            ],
            [
                "Agricultura",
                "Seus solos férteis fizeram do país um importante produtor e exportador de cereais."
            ],
            [
                "Atualidades",
                "Desde 2022, enfrenta uma guerra em grande escala após a invasão russa."
            ],
            [
                "Capital",
                "Kyiv."
            ],
            [
                "Idiomas",
                "O ucraniano é a língua oficial."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se hryvnia ucraniana."
            ],
            [
                "Fronteiras",
                "Faz fronteira terrestre com países vizinhos de diferentes sub-regiões, incluindo Bielorrússia, Hungria, Moldávia, Polônia, Romênia e outros."
            ],
            [
                "Área",
                "O território tem aproximadamente 600.000 km² de área."
            ]
        ]
    },
    {
        "name": "Suécia",
        "aliases": [
            "Sweden",
            "Sverige",
            "Kingdom of Sweden"
        ],
        "hints": [
            [
                "Geografia",
                "Fica na Escandinávia, no norte da Europa, e tem uma longa costa no mar Báltico."
            ],
            [
                "História",
                "Foi uma potência regional europeia durante parte do século XVII."
            ],
            [
                "Economia",
                "Engenharia, telecomunicações, veículos, mineração e indústrias criativas são relevantes."
            ],
            [
                "Cultura",
                "Design funcional, música pop e tradições nórdicas fazem parte de sua projeção internacional."
            ],
            [
                "Ciência",
                "O inventor Alfred Nobel nasceu nesse país e deu nome aos prêmios Nobel."
            ],
            [
                "Capital",
                "Estocolmo."
            ],
            [
                "Idiomas",
                "O sueco é a língua oficial."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se coroa sueca."
            ],
            [
                "Fronteiras",
                "Faz fronteira terrestre com Finlândia e Noruega."
            ],
            [
                "Área",
                "O território tem aproximadamente 450.000 km² de área."
            ]
        ]
    },
    {
        "name": "Catar",
        "aliases": [
            "Qatar",
            "State of Qatar"
        ],
        "hints": [
            [
                "Geografia",
                "É uma pequena península no golfo Pérsico, ligada por terra à Arábia Saudita."
            ],
            [
                "História",
                "Tornou-se independente em 1971."
            ],
            [
                "Economia",
                "Exportações de gás natural liquefeito são a base de sua riqueza energética."
            ],
            [
                "Cultura",
                "O árabe é a língua oficial, e a tradição da pesca de pérolas antecede a expansão energética."
            ],
            [
                "Esportes",
                "Sediou a Copa do Mundo masculina de futebol de 2022."
            ],
            [
                "Capital",
                "Doha."
            ],
            [
                "Idiomas",
                "O árabe é a língua oficial."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se rial catariano."
            ],
            [
                "Fronteiras",
                "Faz fronteira terrestre com Arábia Saudita."
            ],
            [
                "Área",
                "O território tem aproximadamente 12.000 km² de área."
            ]
        ]
    },
    {
        "name": "Alemanha",
        "aliases": [
            "Germany",
            "Deutschland",
            "Republica Federal da Alemanha",
            "Federal Republic of Germany"
        ],
        "hints": [
            [
                "Geografia",
                "Fica na Europa Central e faz fronteira com nove países."
            ],
            [
                "História",
                "A reunificação de 1990 encerrou a divisão do país durante a Guerra Fria."
            ],
            [
                "Economia",
                "É conhecida por sua indústria automotiva, engenharia, produtos químicos e máquinas."
            ],
            [
                "Cultura",
                "A língua alemã, a música clássica e tradições regionais têm influência internacional."
            ],
            [
                "Política internacional",
                "É um dos membros fundadores da União Europeia em sua trajetória de integração."
            ],
            [
                "Capital",
                "Berlim."
            ],
            [
                "Idiomas",
                "O alemão é a língua oficial."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se euro."
            ],
            [
                "Fronteiras",
                "Faz fronteira terrestre com países vizinhos de diferentes sub-regiões, incluindo Áustria, Bélgica, Tchéquia, Dinamarca, França e outros."
            ],
            [
                "Área",
                "O território tem aproximadamente 360.000 km² de área."
            ]
        ]
    },
    {
        "name": "Polônia",
        "aliases": [
            "Poland",
            "Polska",
            "Republica da Polonia"
        ],
        "hints": [
            [
                "Geografia",
                "Fica na Europa Central, com litoral no mar Báltico."
            ],
            [
                "História",
                "Recuperou a independência em 1918, depois de mais de um século de partições."
            ],
            [
                "Economia",
                "Manufatura, tecnologia da informação, agricultura e serviços têm importância crescente."
            ],
            [
                "Cultura",
                "A língua polonesa é eslava; o compositor Frédéric Chopin nasceu nesse território."
            ],
            [
                "Política internacional",
                "É membro da União Europeia e da OTAN."
            ],
            [
                "Capital",
                "Varsóvia."
            ],
            [
                "Idiomas",
                "O polonês é a língua oficial."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se złoty polonês."
            ],
            [
                "Fronteiras",
                "Faz fronteira terrestre com países vizinhos de diferentes sub-regiões, incluindo Bielorrússia, Tchéquia, Alemanha, Lituânia, Rússia e outros."
            ],
            [
                "Área",
                "O território tem aproximadamente 310.000 km² de área."
            ]
        ]
    },
    {
        "name": "Cuba",
        "aliases": [
            "Republic of Cuba",
            "Republica de Cuba"
        ],
        "hints": [
            [
                "Geografia",
                "É a maior ilha do Caribe e fica ao sul dos Estados Unidos, perto do golfo do México."
            ],
            [
                "História",
                "A revolução de 1959 transformou profundamente seu sistema político."
            ],
            [
                "Economia",
                "Turismo, níquel, agricultura e serviços públicos são setores importantes."
            ],
            [
                "Cultura",
                "A língua oficial é o espanhol; son, salsa e outros estilos musicais têm raízes fortes no país."
            ],
            [
                "Política",
                "Mantém um sistema político de partido único."
            ],
            [
                "Capital",
                "Havana."
            ],
            [
                "Idiomas",
                "O espanhol é a língua oficial."
            ],
            [
                "Moeda",
                "Entre as moedas utilizadas estão Peso cubano conversível e peso cubano."
            ],
            [
                "Fronteiras",
                "Não tem fronteiras terrestres internacionais; seu território é insular ou separado por água de outros países."
            ],
            [
                "Área",
                "O território tem aproximadamente 110.000 km² de área."
            ]
        ]
    },
    {
        "name": "Marrocos",
        "aliases": [
            "Morocco",
            "Marruecos",
            "Al Maghrib",
            "Kingdom of Morocco"
        ],
        "hints": [
            [
                "Geografia",
                "Fica no noroeste da África, com litoral no Atlântico e no Mediterrâneo."
            ],
            [
                "História",
                "Foi governado por diversas dinastias e conquistou a independência da França e da Espanha em 1956."
            ],
            [
                "Economia",
                "Fosfatos, agricultura, manufatura e turismo têm grande relevância."
            ],
            [
                "Cultura",
                "Árabe e amazigue são línguas oficiais; a culinária inclui cuscuz e tajine."
            ],
            [
                "Esportes",
                "Foi anfitrião da Copa Africana de Nações de 2025, disputada entre o fim de 2025 e o início de 2026."
            ],
            [
                "Capital",
                "Rabat."
            ],
            [
                "Idiomas",
                "Árabe e amazigue (tamazight) são línguas oficiais."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se dirham marroquino."
            ],
            [
                "Fronteiras",
                "Faz fronteira terrestre com Argélia, Saara Ocidental e Espanha."
            ],
            [
                "Área",
                "O território tem aproximadamente 450.000 km² de área."
            ]
        ]
    },
    {
        "name": "Índia",
        "aliases": [
            "India",
            "Bharat",
            "Republica da India"
        ],
        "hints": [
            [
                "Geografia",
                "Ocupa grande parte do sul da Ásia e tem litoral no oceano Índico."
            ],
            [
                "História",
                "Conquistou a independência do Reino Unido em 1947."
            ],
            [
                "Economia",
                "Tecnologia da informação, farmacêutica, manufatura, agricultura e serviços são setores importantes."
            ],
            [
                "Cultura",
                "Abriga muitas línguas e religiões; cinema, culinária e festivais têm grande diversidade regional."
            ],
            [
                "Ciência",
                "A missão Chandrayaan-3 realizou um pouso lunar bem-sucedido em 2023."
            ],
            [
                "Capital",
                "Nova Délhi."
            ],
            [
                "Idiomas",
                "O hindi e o inglês são usados pelo governo da União; o país reconhece 22 línguas programadas na Constituição."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se rúpia indiana."
            ],
            [
                "Fronteiras",
                "Faz fronteira terrestre com Bangladesh, Butão, China, Mianmar, Nepal e Paquistão, entre outros países."
            ],
            [
                "Área",
                "O território tem aproximadamente 3.300.000 km² de área."
            ]
        ]
    },
    {
        "name": "China",
        "aliases": [
            "People's Republic of China",
            "Republica Popular da China",
            "PRC",
            "Zhōngguó",
            "Zhongguo"
        ],
        "hints": [
            [
                "Geografia",
                "Fica no leste da Ásia e tem fronteiras terrestres com muitos países, além de uma extensa costa no Pacífico."
            ],
            [
                "História",
                "A República Popular foi fundada em 1949, após décadas de conflito e mudanças políticas."
            ],
            [
                "Economia",
                "É um centro mundial de manufatura, comércio, eletrônicos, baterias e energia solar."
            ],
            [
                "Cultura",
                "O mandarim padrão é a língua oficial nacional; a escrita chinesa tem uma longa história."
            ],
            [
                "Esportes",
                "Sediou os Jogos Olímpicos de Verão de 2008 e os de Inverno de 2022."
            ],
            [
                "Capital",
                "Pequim."
            ],
            [
                "Idiomas",
                "O chinês padrão (mandarim) é a língua oficial nacional."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se yuan chinês."
            ],
            [
                "Fronteiras",
                "Faz fronteira terrestre com muitos países, incluindo Afeganistão, Butão, Índia, Mongólia, Nepal, Paquistão, Rússia e Vietnã."
            ],
            [
                "Área",
                "O território tem aproximadamente 9.600.000 km² de área."
            ]
        ]
    },
    {
        "name": "Coreia do Sul",
        "aliases": [
            "South Korea",
            "Republic of Korea",
            "Coreia Meridional",
            "ROK",
            "Hanguk"
        ],
        "hints": [
            [
                "Geografia",
                "Ocupa a parte sul da península coreana, no leste da Ásia."
            ],
            [
                "História",
                "A república foi estabelecida em 1948, após a divisão da península no período pós-guerra."
            ],
            [
                "Economia",
                "Semicondutores, automóveis, construção naval e eletrônicos são setores fundamentais."
            ],
            [
                "Cultura",
                "K-pop, cinema e séries televisivas ajudaram a ampliar sua influência cultural global."
            ],
            [
                "Esportes",
                "Sediou os Jogos Olímpicos de Inverno de 2018."
            ],
            [
                "Capital",
                "Seul."
            ],
            [
                "Idiomas",
                "O coreano é a língua oficial."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se won sul-coreano."
            ],
            [
                "Fronteiras",
                "Faz fronteira terrestre com Coreia do Norte."
            ],
            [
                "Área",
                "O território tem aproximadamente 100.000 km² de área."
            ]
        ]
    },
    {
        "name": "Nova Zelândia",
        "aliases": [
            "New Zealand",
            "Aotearoa",
            "NZ"
        ],
        "hints": [
            [
                "Geografia",
                "É um país insular do sudoeste do Pacífico, formado principalmente por duas grandes ilhas."
            ],
            [
                "História",
                "O Tratado de Waitangi, assinado em 1840, é um documento central nas relações entre a Coroa e os Māori."
            ],
            [
                "Economia",
                "Laticínios, agricultura, turismo e serviços são importantes para as exportações."
            ],
            [
                "Cultura",
                "A cultura Māori tem papel central na identidade nacional; inglês, Māori e língua de sinais são oficiais."
            ],
            [
                "Direitos",
                "Foi o primeiro país autônomo a conceder às mulheres o direito de voto em eleições nacionais, em 1893."
            ],
            [
                "Capital",
                "Wellington."
            ],
            [
                "Idiomas",
                "Māori e língua de sinais neozelandesa têm status oficial; o inglês é amplamente usado."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se dólar neozelandês."
            ],
            [
                "Fronteiras",
                "Não tem fronteiras terrestres internacionais; seu território é insular ou separado por água de outros países."
            ],
            [
                "Área",
                "O território tem aproximadamente 270.000 km² de área."
            ]
        ]
    },
    {
        "name": "Indonésia",
        "aliases": [
            "Indonesia",
            "Republik Indonesia"
        ],
        "hints": [
            [
                "Geografia",
                "É um arquipélago do Sudeste Asiático atravessado pelo Equador, entre os oceanos Índico e Pacífico."
            ],
            [
                "História",
                "Proclamou a independência em 1945; o reconhecimento neerlandês veio em 1949."
            ],
            [
                "Economia",
                "Níquel, óleo de palma, manufatura, mineração e serviços são setores importantes."
            ],
            [
                "Cultura",
                "O indonésio é a língua nacional, e centenas de línguas locais continuam em uso."
            ],
            [
                "Natureza",
                "Abriga florestas tropicais e habitats de espécies como orangotangos e dragões-de-komodo."
            ],
            [
                "Capital",
                "Jacarta."
            ],
            [
                "Idiomas",
                "O indonésio é a língua oficial."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se rupia indonésia."
            ],
            [
                "Fronteiras",
                "Faz fronteira terrestre com Timor-Leste, Malásia e Papua-Nova Guiné."
            ],
            [
                "Área",
                "O território tem aproximadamente 1.900.000 km² de área."
            ]
        ]
    },
    {
        "name": "Nigéria",
        "aliases": [
            "Nigeria",
            "Federal Republic of Nigeria"
        ],
        "hints": [
            [
                "Geografia",
                "Fica na África Ocidental, junto ao golfo da Guiné, e é atravessada pelo rio Níger."
            ],
            [
                "História",
                "Tornou-se independente do Reino Unido em 1960."
            ],
            [
                "Economia",
                "Petróleo, gás, agricultura, serviços e uma grande indústria cinematográfica contribuem para a economia."
            ],
            [
                "Cultura",
                "Inglês é a língua oficial, junto a línguas amplamente faladas como haúça, iorubá e igbo."
            ],
            [
                "Cinema",
                "Sua indústria cinematográfica é conhecida internacionalmente como Nollywood."
            ],
            [
                "Capital",
                "Abuja."
            ],
            [
                "Idiomas",
                "O inglês é a língua oficial; haúça, iorubá e igbo estão entre as línguas mais faladas."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se naira nigeriana."
            ],
            [
                "Fronteiras",
                "Faz fronteira terrestre com Benim, Camarões, Chade e Níger."
            ],
            [
                "Área",
                "O território tem aproximadamente 920.000 km² de área."
            ]
        ]
    },
    {
        "name": "Chile",
        "aliases": [
            "Republica do Chile",
            "Chile Republic"
        ],
        "hints": [
            [
                "Geografia",
                "É uma faixa longa e estreita na costa oeste da América do Sul, entre os Andes e o Pacífico."
            ],
            [
                "História",
                "Declarou independência da Espanha em 1818."
            ],
            [
                "Economia",
                "É um dos maiores produtores mundiais de cobre e também exporta lítio, frutas e vinho."
            ],
            [
                "Natureza",
                "O deserto do Atacama, no norte, é um dos lugares mais secos do planeta."
            ],
            [
                "Ciência",
                "A combinação de altitude e céu seco favorece grandes observatórios astronômicos."
            ],
            [
                "Capital",
                "Santiago."
            ],
            [
                "Idiomas",
                "O espanhol é a língua predominante."
            ],
            [
                "Moeda",
                "Entre as moedas utilizadas estão Unidades de Fomento chilenas e peso chileno."
            ],
            [
                "Fronteiras",
                "Faz fronteira terrestre com Argentina, Bolívia e Peru."
            ],
            [
                "Área",
                "O território tem aproximadamente 760.000 km² de área."
            ]
        ]
    },
    {
        "name": "Noruega",
        "aliases": [
            "Norway",
            "Norge",
            "Kingdom of Norway"
        ],
        "hints": [
            [
                "Geografia",
                "Fica na Escandinávia e tem uma costa recortada por fiordes no Atlântico Norte."
            ],
            [
                "História",
                "Sua história está associada à navegação e às sociedades vikings."
            ],
            [
                "Economia",
                "Petróleo, gás, energia hidrelétrica, pesca e transporte marítimo são importantes."
            ],
            [
                "Energia",
                "A eletricidade produzida no país vem predominantemente de fontes renováveis, sobretudo hidrelétrica."
            ],
            [
                "Finanças públicas",
                "Seu fundo soberano investe receitas do setor petrolífero em ativos pelo mundo."
            ],
            [
                "Capital",
                "Oslo."
            ],
            [
                "Idiomas",
                "O norueguês tem duas formas escritas oficiais, bokmål e nynorsk; línguas sámi também têm proteção regional."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se coroa norueguesa."
            ],
            [
                "Fronteiras",
                "Faz fronteira terrestre com Finlândia, Suécia e Rússia."
            ],
            [
                "Área",
                "O território tem aproximadamente 320.000 km² de área."
            ]
        ]
    },
    {
        "name": "Arábia Saudita",
        "aliases": [
            "Saudi Arabia",
            "KSA",
            "Kingdom of Saudi Arabia"
        ],
        "hints": [
            [
                "Geografia",
                "Ocupa a maior parte da Península Arábica e tem litoral no mar Vermelho e no golfo Pérsico."
            ],
            [
                "História",
                "O reino moderno foi fundado em 1932."
            ],
            [
                "Economia",
                "É um dos principais produtores de petróleo do mundo e busca diversificar a economia."
            ],
            [
                "Cultura",
                "O árabe é a língua oficial e a sociedade tem forte ligação histórica com a tradição islâmica."
            ],
            [
                "Religião",
                "As cidades sagradas de Meca e Medina ficam em seu território."
            ],
            [
                "Capital",
                "Riade."
            ],
            [
                "Idiomas",
                "O árabe é a língua oficial."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se rial saudita."
            ],
            [
                "Fronteiras",
                "Faz fronteira terrestre com países vizinhos de diferentes sub-regiões, incluindo Iraque, Jordânia, Kuwait, Omã, Catar e outros."
            ],
            [
                "Área",
                "O território tem aproximadamente 2.100.000 km² de área."
            ]
        ]
    },
    {
        "name": "Espanha",
        "aliases": [
            "Spain",
            "España",
            "Reino de España",
            "Reino da Espanha"
        ],
        "hints": [
            [
                "Geografia",
                "Ocupa a maior parte da Península Ibérica, no sudoeste da Europa, e inclui arquipélagos no Atlântico e no Mediterrâneo."
            ],
            [
                "História",
                "Entre os séculos XV e XVII, construiu um vasto império ultramarino."
            ],
            [
                "Economia",
                "Turismo, automóveis, agricultura, energias renováveis e serviços são importantes."
            ],
            [
                "Idiomas",
                "Além do espanhol, línguas como catalão, galego e basco são usadas em diferentes regiões."
            ],
            [
                "Esportes",
                "Está entre os anfitriões previstos para a Copa do Mundo masculina de futebol de 2030."
            ],
            [
                "Capital",
                "Madri."
            ],
            [
                "Idiomas",
                "O espanhol é oficial em todo o país; catalão/valenciano, galego e basco também são cooficiais em certas regiões."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se euro."
            ],
            [
                "Fronteiras",
                "Na Europa, faz fronteira terrestre com Andorra, França, Gibraltar, Portugal e, por meio dos enclaves norte-africanos, Marrocos."
            ],
            [
                "Área",
                "O território tem aproximadamente 510.000 km² de área."
            ]
        ]
    },
    {
        "name": "Portugal",
        "aliases": [
            "Portugal Republic",
            "Republica Portuguesa",
            "Portuguese Republic"
        ],
        "hints": [
            [
                "Geografia",
                "Fica no extremo oeste da Europa continental e inclui os arquipélagos dos Açores e da Madeira."
            ],
            [
                "História",
                "Foi um dos primeiros reinos europeus a estabelecer uma grande rede marítima de exploração e comércio nos séculos XV e XVI."
            ],
            [
                "Economia",
                "Turismo, serviços, vinho, cortiça, agricultura e manufatura são relevantes."
            ],
            [
                "Língua",
                "O português tornou-se língua oficial em vários países de diferentes continentes."
            ],
            [
                "Esportes",
                "Está entre os anfitriões previstos para a Copa do Mundo masculina de futebol de 2030."
            ],
            [
                "Capital",
                "Lisboa."
            ],
            [
                "Idiomas",
                "O português é a língua oficial."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se euro."
            ],
            [
                "Fronteiras",
                "Faz fronteira terrestre com Espanha."
            ],
            [
                "Área",
                "O território tem aproximadamente 92.000 km² de área."
            ]
        ]
    },
    {
        "name": "Tailândia",
        "aliases": [
            "Thailand",
            "Prathet Thai",
            "Kingdom of Thailand"
        ],
        "hints": [
            [
                "Geografia",
                "Fica no Sudeste Asiático e tem costas no mar de Andamão e no golfo da Tailândia."
            ],
            [
                "História",
                "Manteve sua soberania durante a era colonial europeia, embora tenha passado por grandes mudanças políticas."
            ],
            [
                "Economia",
                "Turismo, automóveis, eletrônicos, agricultura e alimentos são setores importantes."
            ],
            [
                "Cultura",
                "O tailandês é a língua oficial, e o budismo tem papel importante na vida cultural."
            ],
            [
                "Diplomacia",
                "Sediou a cúpula da Cooperação Econômica Ásia-Pacífico (APEC) em 2022."
            ],
            [
                "Capital",
                "Bangkok."
            ],
            [
                "Idiomas",
                "O tailandês é a língua oficial."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se baht tailandês."
            ],
            [
                "Fronteiras",
                "Faz fronteira terrestre com Camboja, Laos, Malásia e Mianmar."
            ],
            [
                "Área",
                "O território tem aproximadamente 510.000 km² de área."
            ]
        ]
    },
    {
        "name": "Vietnã",
        "aliases": [
            "Vietnam",
            "Việt Nam",
            "Viet Nam",
            "Socialist Republic of Vietnam"
        ],
        "hints": [
            [
                "Geografia",
                "Fica no Sudeste Asiático, com uma longa costa voltada para o mar do Sul da China."
            ],
            [
                "História",
                "A reunificação do país ocorreu em 1976, após décadas de guerra."
            ],
            [
                "Economia",
                "Eletrônicos, têxteis, manufatura, agricultura e café são importantes para as exportações."
            ],
            [
                "Cultura",
                "O vietnamita é a língua oficial; a culinária inclui pratos conhecidos como phở e bánh mì."
            ],
            [
                "Agricultura",
                "É um dos principais exportadores mundiais de café, especialmente da variedade robusta."
            ],
            [
                "Capital",
                "Hanói."
            ],
            [
                "Idiomas",
                "O vietnamita é a língua oficial."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se dong vietnamita."
            ],
            [
                "Fronteiras",
                "Faz fronteira terrestre com Camboja, China e Laos."
            ],
            [
                "Área",
                "O território tem aproximadamente 330.000 km² de área."
            ]
        ]
    },
    {
        "name": "Colômbia",
        "aliases": [
            "Colombia",
            "Republica da Colombia"
        ],
        "hints": [
            [
                "Geografia",
                "Fica no noroeste da América do Sul e possui litoral tanto no Caribe quanto no Pacífico."
            ],
            [
                "História",
                "A independência do domínio espanhol foi conquistada no início do século XIX."
            ],
            [
                "Economia",
                "Café, petróleo, carvão, flores e serviços contribuem para a economia."
            ],
            [
                "Cultura",
                "O espanhol é oficial; cumbia, vallenato e outros estilos musicais têm raízes no país."
            ],
            [
                "Natureza",
                "É um dos países com maior biodiversidade do planeta, com ecossistemas andinos, amazônicos e tropicais."
            ],
            [
                "Capital",
                "Bogotá."
            ],
            [
                "Idiomas",
                "O espanhol é a língua oficial; línguas indígenas são oficiais em seus territórios."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se peso colombiano."
            ],
            [
                "Fronteiras",
                "Faz fronteira terrestre com Brasil, Equador, Panamá, Peru e Venezuela."
            ],
            [
                "Área",
                "O território tem aproximadamente 1.100.000 km² de área."
            ]
        ]
    },
    {
        "name": "Cazaquistão",
        "aliases": [
            "Kazakhstan",
            "Qazaqstan",
            "Republica do Cazaquistao"
        ],
        "hints": [
            [
                "Geografia",
                "Fica na Ásia Central e é o maior país do mundo sem acesso direto ao oceano."
            ],
            [
                "História",
                "Tornou-se independente em 1991, após a dissolução da União Soviética."
            ],
            [
                "Economia",
                "Petróleo, urânio, gás e outros recursos minerais são importantes para suas exportações."
            ],
            [
                "Idiomas",
                "Cazaque é a língua oficial, e o russo também é amplamente utilizado."
            ],
            [
                "Exploração espacial",
                "O cosmódromo de Baikonur, ligado ao início da era espacial tripulada, fica em seu território."
            ],
            [
                "Capital",
                "Astana."
            ],
            [
                "Idiomas",
                "O cazaque é a língua estatal e o russo tem uso oficial em instituições públicas."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se tenge cazaque."
            ],
            [
                "Fronteiras",
                "Faz fronteira terrestre com China, Quirguistão, Rússia, Turcomenistão e Uzbequistão."
            ],
            [
                "Área",
                "O território tem aproximadamente 2.700.000 km² de área."
            ]
        ]
    },
    {
        "name": "Finlândia",
        "aliases": [
            "Finland",
            "Suomi",
            "Republica da Finlandia"
        ],
        "hints": [
            [
                "Geografia",
                "Fica no norte da Europa, entre a Suécia, a Noruega e a Rússia, e possui milhares de lagos."
            ],
            [
                "História",
                "Declarou independência da Rússia em 1917."
            ],
            [
                "Economia",
                "Tecnologia, florestas, máquinas, telecomunicações e serviços são setores importantes."
            ],
            [
                "Idiomas",
                "Finlandês e sueco são línguas oficiais."
            ],
            [
                "Natureza",
                "Florestas extensas e o fenômeno da aurora boreal marcam parte de sua paisagem setentrional."
            ],
            [
                "Capital",
                "Helsinque."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se euro."
            ],
            [
                "Fronteiras",
                "Faz fronteira terrestre com Noruega, Suécia e Rússia."
            ],
            [
                "Área",
                "O território tem aproximadamente 340.000 km² de área."
            ],
            [
                "Cultura",
                "A sauna é uma tradição importante da vida cotidiana e da cultura finlandesa."
            ]
        ]
    },
    {
        "name": "Nepal",
        "aliases": [
            "Federal Democratic Republic of Nepal",
            "Nepal Republic"
        ],
        "hints": [
            [
                "Geografia",
                "É um país sem litoral no Himalaia, entre a Índia e a China."
            ],
            [
                "Natureza",
                "O monte Everest fica na fronteira entre este país e a China."
            ],
            [
                "História",
                "Tornou-se uma república em 2008, após o fim da monarquia."
            ],
            [
                "Economia",
                "Turismo de montanha, agricultura, remessas e serviços são fontes importantes de renda."
            ],
            [
                "Cultura",
                "O nepalês é a língua oficial, e o país reúne tradições hindus e budistas."
            ],
            [
                "Capital",
                "Catmandu."
            ],
            [
                "Idiomas",
                "O nepali é a língua oficial; o país reconhece muitas outras línguas maternas."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se rupia nepalesa."
            ],
            [
                "Fronteiras",
                "Faz fronteira terrestre com China e Índia."
            ],
            [
                "Área",
                "O território tem aproximadamente 150.000 km² de área."
            ]
        ]
    },
    {
        "name": "Uruguai",
        "aliases": [
            "Uruguay",
            "Republica Oriental del Uruguay",
            "República Oriental do Uruguai"
        ],
        "hints": [
            [
                "Geografia",
                "Fica no sudeste da América do Sul, entre Brasil e Argentina, com costa no Atlântico."
            ],
            [
                "História",
                "Tornou-se um Estado independente em 1828."
            ],
            [
                "Economia",
                "Carne bovina, soja, celulose, serviços e energia renovável são setores relevantes."
            ],
            [
                "Cultura",
                "O espanhol é predominante, e o mate faz parte dos hábitos cotidianos."
            ],
            [
                "Esportes",
                "Recebeu e venceu a primeira Copa do Mundo masculina de futebol, em 1930."
            ],
            [
                "Capital",
                "Montevidéu."
            ],
            [
                "Idiomas",
                "O espanhol é predominante; o português também é falado em áreas de fronteira."
            ],
            [
                "Moeda",
                "Entre as moedas utilizadas estão Peso uruguaio en unidades indexadas e peso uruguaio."
            ],
            [
                "Fronteiras",
                "Faz fronteira terrestre com Argentina e Brasil."
            ],
            [
                "Área",
                "O território tem aproximadamente 180.000 km² de área."
            ]
        ]
    },
    {
        "name": "Paquistão",
        "aliases": [
            "Pakistan",
            "Islamic Republic of Pakistan"
        ],
        "hints": [
            [
                "Geografia",
                "Fica no sul da Ásia, com litoral no mar Arábico e fronteiras com Índia, Irã, Afeganistão e China."
            ],
            [
                "História",
                "Foi criado em 1947, durante a divisão da Índia britânica."
            ],
            [
                "Economia",
                "Têxteis, agricultura, serviços e remessas do exterior são importantes."
            ],
            [
                "Idiomas",
                "Urdu é a língua nacional e o inglês é usado em contextos oficiais."
            ],
            [
                "Natureza",
                "O K2, a segunda montanha mais alta do mundo, fica na fronteira com a China."
            ],
            [
                "Capital",
                "Islamabad."
            ],
            [
                "Idiomas",
                "Urdu é a língua nacional, e inglês é usado em contextos oficiais."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se rupia paquistanesa."
            ],
            [
                "Fronteiras",
                "Faz fronteira terrestre com Afeganistão, China, Índia e Irã."
            ],
            [
                "Área",
                "O território tem aproximadamente 880.000 km² de área."
            ]
        ]
    },
    {
        "name": "Filipinas",
        "aliases": [
            "Philippines",
            "Republic of the Philippines",
            "Pilipinas"
        ],
        "hints": [
            [
                "Geografia",
                "É um arquipélago do oeste do Pacífico, no Sudeste Asiático."
            ],
            [
                "História",
                "A independência foi reconhecida pelos Estados Unidos em 1946, após o período colonial."
            ],
            [
                "Economia",
                "Serviços, eletrônicos, agricultura e trabalho no exterior contribuem para a economia."
            ],
            [
                "Idiomas",
                "Filipino e inglês são línguas oficiais."
            ],
            [
                "Sociedade",
                "É um dos países com maior população cristã, especialmente católica, da Ásia."
            ],
            [
                "Capital",
                "Manila."
            ],
            [
                "Idiomas",
                "Filipino e inglês são as línguas oficiais."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se peso filipino."
            ],
            [
                "Fronteiras",
                "Não tem fronteiras terrestres internacionais; seu território é insular ou separado por água de outros países."
            ],
            [
                "Área",
                "O território tem aproximadamente 340.000 km² de área."
            ]
        ]
    },
    {
        "name": "Irlanda",
        "aliases": [
            "Ireland",
            "Éire",
            "Eire",
            "Republic of Ireland",
            "Republica da Irlanda"
        ],
        "hints": [
            [
                "Geografia",
                "Ocupa grande parte de uma ilha no Atlântico Norte, a oeste da Grã-Bretanha."
            ],
            [
                "História",
                "Após um processo de independência no início do século XX, tornou-se um Estado soberano."
            ],
            [
                "Economia",
                "Tecnologia, serviços financeiros, farmacêutica e dispositivos médicos são setores importantes."
            ],
            [
                "Idiomas",
                "Irlandês e inglês são línguas oficiais."
            ],
            [
                "Cultura",
                "A música tradicional, a literatura e a celebração de São Patrício são associadas ao país."
            ],
            [
                "Capital",
                "Dublin."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se euro."
            ],
            [
                "Fronteiras",
                "Faz fronteira terrestre com o Reino Unido, por meio da Irlanda do Norte."
            ],
            [
                "Área",
                "O território tem aproximadamente 70.000 km² de área."
            ],
            [
                "Clima",
                "O clima é temperado oceânico: a influência do Atlântico costuma trazer tempo variável e chuvas frequentes."
            ]
        ]
    },
    {
        "name": "Áustria",
        "aliases": [
            "Austria",
            "Österreich",
            "Osterreich",
            "Republica da Austria"
        ],
        "hints": [
            [
                "Geografia",
                "É um país sem litoral da Europa Central, com grande parte do território nos Alpes."
            ],
            [
                "História",
                "Viena foi centro do poder dos Habsburgo, cuja dinastia governou vastos territórios europeus."
            ],
            [
                "Economia",
                "Indústria especializada, máquinas, turismo, serviços e manufatura são importantes."
            ],
            [
                "Cultura",
                "A música clássica está associada a compositores como Mozart, Haydn e Schubert."
            ],
            [
                "Política",
                "É uma república federal e membro da União Europeia desde 1995."
            ],
            [
                "Capital",
                "Viena."
            ],
            [
                "Idiomas",
                "O alemão é a língua oficial."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se euro."
            ],
            [
                "Fronteiras",
                "Faz fronteira terrestre com países vizinhos de diferentes sub-regiões, incluindo Tchéquia, Alemanha, Hungria, Itália, Liechtenstein e outros."
            ],
            [
                "Área",
                "O território tem aproximadamente 84.000 km² de área."
            ]
        ]
    },
    {
        "name": "Bélgica",
        "aliases": [
            "Belgium",
            "België",
            "Belgie",
            "Belgique",
            "Belgica"
        ],
        "hints": [
            [
                "Geografia",
                "Fica na Europa Ocidental e tem uma pequena costa no mar do Norte."
            ],
            [
                "História",
                "Tornou-se independente em 1830."
            ],
            [
                "Economia",
                "Logística, produtos químicos, farmacêutica, manufatura e comércio são relevantes."
            ],
            [
                "Idiomas",
                "Tem três línguas oficiais: neerlandês, francês e alemão."
            ],
            [
                "Diplomacia",
                "Abriga instituições centrais da União Europeia e da OTAN."
            ],
            [
                "Capital",
                "Bruxelas."
            ],
            [
                "Idiomas",
                "Neerlandês, francês e alemão são línguas oficiais."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se euro."
            ],
            [
                "Fronteiras",
                "Faz fronteira terrestre com França, Alemanha, Luxemburgo e Países Baixos."
            ],
            [
                "Área",
                "O território tem aproximadamente 31.000 km² de área."
            ]
        ]
    },
    {
        "name": "Países Baixos",
        "aliases": [
            "Netherlands",
            "Holanda",
            "The Netherlands",
            "Nederland",
            "Holland"
        ],
        "hints": [
            [
                "Geografia",
                "Fica no noroeste da Europa, e parte de seu território é baixa ou protegida por diques."
            ],
            [
                "História",
                "O comércio marítimo contribuiu para sua prosperidade durante o chamado Século de Ouro neerlandês."
            ],
            [
                "Economia",
                "Agricultura intensiva, logística, comércio, química e semicondutores são setores importantes."
            ],
            [
                "Cultura",
                "A língua oficial é o neerlandês; pintura, ciclismo e design têm grande presença cultural."
            ],
            [
                "Engenharia",
                "Séculos de obras hidráulicas ajudam a proteger áreas abaixo do nível do mar."
            ],
            [
                "Capital",
                "Amsterdã é a capital; Haia abriga a sede do governo."
            ],
            [
                "Idiomas",
                "O neerlandês é a língua oficial nacional; frísio também é oficial na província da Frísia."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se euro."
            ],
            [
                "Fronteiras",
                "Faz fronteira terrestre com Bélgica e Alemanha."
            ],
            [
                "Área",
                "O território tem aproximadamente 42.000 km² de área."
            ]
        ]
    },
    {
        "name": "Rússia",
        "aliases": [
            "Russia",
            "Russian Federation",
            "Federacao Russa",
            "Rossiya"
        ],
        "hints": [
            [
                "Geografia",
                "É o maior país do mundo em área e se estende pela Europa Oriental e pelo norte da Ásia."
            ],
            [
                "História",
                "A União Soviética foi dissolvida em 1991, e a Federação Russa tornou-se seu principal Estado sucessor."
            ],
            [
                "Economia",
                "Petróleo, gás natural, minerais, agricultura e indústria têm grande importância."
            ],
            [
                "Cultura",
                "A língua russa, o balé, a literatura e a música clássica têm projeção internacional."
            ],
            [
                "Natureza",
                "O lago Baikal, um dos lagos mais profundos do mundo, fica na Sibéria."
            ],
            [
                "Capital",
                "Moscou."
            ],
            [
                "Idiomas",
                "O russo é a língua estatal; várias repúblicas têm também línguas regionais oficiais."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se rublo russo."
            ],
            [
                "Fronteiras",
                "Faz fronteira terrestre com países vizinhos de diferentes sub-regiões, incluindo Azerbaijão, Bielorrússia, China, Estônia, Finlândia e outros."
            ],
            [
                "Área",
                "O território tem aproximadamente 17.100.000 km² de área."
            ]
        ]
    },
    {
        "name": "Mongólia",
        "aliases": [
            "Mongolia",
            "Mongol Uls"
        ],
        "hints": [
            [
                "Geografia",
                "É um país sem litoral entre Rússia e China, com estepes e o deserto de Gobi."
            ],
            [
                "História",
                "Gêngis Khan fundou um império que se expandiu pela Ásia no século XIII."
            ],
            [
                "Economia",
                "Mineração, carvão, cobre e caxemira são importantes."
            ],
            [
                "Cultura",
                "A língua mongol e as tradições de criação de cavalos e vida nômade têm destaque."
            ],
            [
                "População",
                "Tem uma das menores densidades populacionais do mundo."
            ],
            [
                "Capital",
                "Ulaanbaatar."
            ],
            [
                "Idiomas",
                "O mongol é a língua oficial predominante."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se tögrög mongol."
            ],
            [
                "Fronteiras",
                "Faz fronteira terrestre com China e Rússia."
            ],
            [
                "Área",
                "O território tem aproximadamente 1.600.000 km² de área."
            ]
        ]
    },
    {
        "name": "Sri Lanka",
        "aliases": [
            "Ceylon",
            "Ceilao",
            "Sri Lanka Democratic Socialist Republic"
        ],
        "hints": [
            [
                "Geografia",
                "É uma ilha no oceano Índico, logo ao sul do subcontinente indiano."
            ],
            [
                "História",
                "Tornou-se independente do Reino Unido em 1948, quando ainda era conhecido como Ceilão."
            ],
            [
                "Economia",
                "Chá, têxteis, turismo e serviços são fontes importantes de renda."
            ],
            [
                "Idiomas",
                "Cingalês e tâmil são línguas oficiais."
            ],
            [
                "Agricultura",
                "É conhecido internacionalmente pela produção de chá, antes comercializado sob o nome de chá do Ceilão."
            ],
            [
                "Capital",
                "Sri Jayawardenepura Kotte é a capital legislativa; Colombo é o principal centro comercial."
            ],
            [
                "Idiomas",
                "Cingalês e tâmil são línguas oficiais; o inglês funciona como língua de ligação."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se rupia do Sri Lanka."
            ],
            [
                "Fronteiras",
                "É uma ilha do oceano Índico, separada da Índia pelo estreito de Palk; não compartilha uma fronteira terrestre internacional."
            ],
            [
                "Área",
                "O território tem aproximadamente 66.000 km² de área."
            ]
        ]
    },
    {
        "name": "Gana",
        "aliases": [
            "Ghana",
            "Republic of Ghana",
            "Republica de Gana"
        ],
        "hints": [
            [
                "Geografia",
                "Fica na África Ocidental, junto ao golfo da Guiné."
            ],
            [
                "História",
                "Tornou-se independente do Reino Unido em 1957, sendo um dos primeiros países da África subsaariana a fazê-lo no período pós-colonial."
            ],
            [
                "Economia",
                "Ouro, cacau, petróleo e serviços são importantes para suas exportações."
            ],
            [
                "Idiomas",
                "O inglês é oficial, ao lado de línguas como akan, ewe e dagbani."
            ],
            [
                "História econômica",
                "Antes da independência, era conhecido internacionalmente pelo nome de Costa do Ouro."
            ],
            [
                "Capital",
                "Acra."
            ],
            [
                "Idiomas",
                "O inglês é oficial; akan, ewe, dagbani e outras línguas são amplamente utilizadas."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se cedi ganês."
            ],
            [
                "Fronteiras",
                "Faz fronteira terrestre com Burkina Faso, Costa do Marfim e Togo."
            ],
            [
                "Área",
                "O território tem aproximadamente 240.000 km² de área."
            ]
        ]
    },
    {
        "name": "Dinamarca",
        "aliases": [
            "Denmark",
            "Danmark",
            "Kingdom of Denmark"
        ],
        "hints": [
            [
                "Geografia",
                "Fica no norte da Europa e inclui a península da Jutlândia e diversas ilhas."
            ],
            [
                "História",
                "Possui uma monarquia com raízes históricas profundas e uma tradição ligada aos povos vikings."
            ],
            [
                "Economia",
                "Farmacêutica, transporte marítimo, agricultura e energia eólica são setores importantes."
            ],
            [
                "Cultura",
                "O dinamarquês é a língua oficial; o conceito de design funcional é associado ao país."
            ],
            [
                "Reino",
                "A Groenlândia e as ilhas Faroé são territórios autônomos dentro do Reino da Dinamarca."
            ],
            [
                "Capital",
                "Copenhague."
            ],
            [
                "Idiomas",
                "O dinamarquês é a língua oficial; feroês e groenlandês têm status nas regiões autônomas do reino."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se coroa dinamarquesa."
            ],
            [
                "Fronteiras",
                "Faz fronteira terrestre com Alemanha."
            ],
            [
                "Área",
                "O território tem aproximadamente 43.000 km² de área."
            ]
        ]
    },
    {
        "name": "Albânia",
        "aliases": [
            "Albania",
            "Republic of Albania",
            "Shqipëria"
        ],
        "hints": [
            [
                "Localização",
                "Fica na Europa Meridional."
            ],
            [
                "História",
                "Em 1912, declarou a independência do Império Otomano."
            ],
            [
                "Economia",
                "Turismo, agricultura, energia e atividades têxteis são setores relevantes."
            ],
            [
                "Cultura",
                "A música polifônica tradicional albanesa faz parte do patrimônio cultural reconhecido internacionalmente."
            ],
            [
                "Natureza e patrimônio",
                "Os Alpes Albaneses e o sítio arqueológico de Butrinto destacam-se entre os atrativos do país."
            ],
            [
                "Capital",
                "Tirana."
            ],
            [
                "Idiomas",
                "O albanês é a língua oficial."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se lek albanês."
            ],
            [
                "Fronteiras",
                "Faz fronteira terrestre com Grécia, Kosovo, Macedônia do Norte e Montenegro."
            ],
            [
                "Área",
                "O território tem aproximadamente 29.000 km² de área."
            ]
        ]
    },
    {
        "name": "Andorra",
        "aliases": [
            "Principality of Andorra"
        ],
        "hints": [
            [
                "Localização",
                "Fica na Europa Meridional, nos Pireneus, entre França e Espanha."
            ],
            [
                "História",
                "É um coprincipado: o chefe de Estado francês e o bispo de Urgell exercem conjuntamente o papel de copríncipes."
            ],
            [
                "Economia",
                "Turismo de montanha, comércio e serviços financeiros têm grande peso na economia."
            ],
            [
                "Cultura",
                "O catalão é a língua oficial, e festas tradicionais misturam influências pirenaicas e ibéricas."
            ],
            [
                "Natureza e patrimônio",
                "O vale Madriu-Perafita-Claror, na região dos Pireneus, é Patrimônio Mundial da UNESCO."
            ],
            [
                "Capital",
                "Andorra-a-Velha."
            ],
            [
                "Idiomas",
                "O catalão é a língua oficial."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se o euro."
            ],
            [
                "Fronteiras",
                "Faz fronteira terrestre com França e Espanha."
            ],
            [
                "Área",
                "O território tem aproximadamente 470 km² de área."
            ]
        ]
    },
    {
        "name": "Bielorrússia",
        "aliases": [
            "Belarus",
            "Belorussia"
        ],
        "hints": [
            [
                "Localização",
                "Fica na Europa Oriental."
            ],
            [
                "História",
                "Minsk e outras cidades sofreram destruição extensa durante a Segunda Guerra Mundial."
            ],
            [
                "Economia",
                "Fertilizantes potássicos, máquinas, alimentos e produtos químicos são setores importantes."
            ],
            [
                "Cultura",
                "As tradições bielorrussas incluem bordados, canções folclóricas e pratos à base de batata."
            ],
            [
                "Natureza e patrimônio",
                "A Floresta de Białowieża, compartilhada com a Polônia, protege uma das últimas grandes áreas de floresta primária europeia."
            ],
            [
                "Capital",
                "Minsk."
            ],
            [
                "Idiomas",
                "Bielorrusso e russo são línguas oficiais."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se Rublo bielorrusso (2000–2016)."
            ],
            [
                "Fronteiras",
                "Faz fronteira terrestre com Letônia, Lituânia, Polônia, Rússia e Ucrânia."
            ],
            [
                "Área",
                "O território tem aproximadamente 210.000 km² de área."
            ]
        ]
    },
    {
        "name": "Bósnia e Herzegovina",
        "aliases": [
            "Bosnia and Herzegovina",
            "Bosnia-Herzegovina"
        ],
        "hints": [
            [
                "Localização",
                "Fica na Europa Meridional."
            ],
            [
                "História",
                "O Acordo de Dayton, firmado em 1995, encerrou a guerra do país na década de 1990."
            ],
            [
                "Economia",
                "Metalurgia, energia, madeira, turismo e serviços contribuem para a economia."
            ],
            [
                "Cultura",
                "Café, música sevdalinka e influências culturais otomanas, eslavas e mediterrâneas marcam o cotidiano."
            ],
            [
                "Natureza e patrimônio",
                "A ponte histórica Stari Most, em Mostar, é um dos monumentos mais conhecidos do país."
            ],
            [
                "Capital",
                "Sarajevo."
            ],
            [
                "Idiomas",
                "Bósnio, croata e sérvio são usados oficialmente."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se marco conversível da Bósnia e Herzegovina."
            ],
            [
                "Fronteiras",
                "Faz fronteira terrestre com Croácia, Montenegro e Sérvia."
            ],
            [
                "Área",
                "O território tem aproximadamente 51.000 km² de área."
            ]
        ]
    },
    {
        "name": "Bulgária",
        "aliases": [
            "Bulgaria",
            "Republic of Bulgaria"
        ],
        "hints": [
            [
                "Localização",
                "Fica na Europa Oriental."
            ],
            [
                "História",
                "O Primeiro Império Búlgaro teve papel importante na difusão medieval do alfabeto cirílico entre povos eslavos."
            ],
            [
                "Economia",
                "Agricultura, máquinas, eletrônicos, vinho e serviços de tecnologia são setores relevantes."
            ],
            [
                "Cultura",
                "O iogurte búlgaro, as danças em roda e os kukeri — personagens mascarados de festivais — são tradições reconhecidas."
            ],
            [
                "Natureza e patrimônio",
                "O Mosteiro de Rila é um dos grandes marcos históricos e religiosos do país."
            ],
            [
                "Capital",
                "Sófia."
            ],
            [
                "Idiomas",
                "O búlgaro é a língua oficial."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se lev búlgaro."
            ],
            [
                "Fronteiras",
                "Faz fronteira terrestre com Grécia, Macedônia do Norte, Romênia, Sérvia e Turquia."
            ],
            [
                "Área",
                "O território tem aproximadamente 110.000 km² de área."
            ]
        ]
    },
    {
        "name": "Croácia",
        "aliases": [
            "Croatia",
            "Republic of Croatia"
        ],
        "hints": [
            [
                "Localização",
                "Fica na Europa Meridional."
            ],
            [
                "História",
                "Declarou independência da Iugoslávia em 1991."
            ],
            [
                "Economia",
                "Turismo costeiro, construção naval, alimentos e serviços são importantes para a economia."
            ],
            [
                "Cultura",
                "A costa dálmata é conhecida por sua gastronomia, música klapa e cidades históricas."
            ],
            [
                "Natureza e patrimônio",
                "O Parque Nacional dos Lagos de Plitvice reúne lagos em terraços e cachoeiras."
            ],
            [
                "Capital",
                "Zagreb."
            ],
            [
                "Idiomas",
                "O croata é a língua oficial."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se kuna croata."
            ],
            [
                "Fronteiras",
                "Faz fronteira terrestre com Bósnia e Herzegovina, Eslovênia, Hungria, Montenegro e Sérvia."
            ],
            [
                "Área",
                "O território tem aproximadamente 57.000 km² de área."
            ]
        ]
    },
    {
        "name": "Chipre",
        "aliases": [
            "Cyprus",
            "Republic of Cyprus"
        ],
        "hints": [
            [
                "Localização",
                "Fica na Europa Meridional."
            ],
            [
                "História",
                "Tornou-se independente do Reino Unido em 1960; a ilha permanece politicamente dividida desde 1974."
            ],
            [
                "Economia",
                "Turismo, transporte marítimo, serviços empresariais e finanças são setores importantes."
            ],
            [
                "Cultura",
                "Sua cultura combina influências gregas, turcas e do Mediterrâneo oriental; o queijo halloumi é associado à ilha."
            ],
            [
                "Natureza e patrimônio",
                "Pafos preserva sítios arqueológicos ligados às culturas helenística e romana."
            ],
            [
                "Capital",
                "Nicósia."
            ],
            [
                "Idiomas",
                "Grego e turco são as línguas oficiais da República de Chipre."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se euro."
            ],
            [
                "Fronteiras",
                "É uma ilha no Mediterrâneo oriental; não tem fronteira terrestre com outro país soberano, embora existam zonas de soberania britânica na ilha."
            ],
            [
                "Área",
                "O território tem aproximadamente 9.300 km² de área."
            ]
        ]
    },
    {
        "name": "Tchéquia",
        "aliases": [
            "Czechia",
            "Czech Republic"
        ],
        "hints": [
            [
                "Localização",
                "Fica na Europa Oriental."
            ],
            [
                "História",
                "A Revolução de Veludo de 1989 abriu caminho para o fim do regime comunista; a Tchéquia separou-se da Eslováquia em 1993."
            ],
            [
                "Economia",
                "Automóveis, máquinas, engenharia e cervejarias são setores tradicionais da indústria."
            ],
            [
                "Cultura",
                "A tradição cervejeira e o teatro de marionetes têm lugar importante na cultura local."
            ],
            [
                "Natureza e patrimônio",
                "O centro histórico de Praga conserva pontes, castelos e construções medievais."
            ],
            [
                "Capital",
                "Praga."
            ],
            [
                "Idiomas",
                "O tcheco é a língua oficial."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se coroa tcheca."
            ],
            [
                "Fronteiras",
                "Faz fronteira terrestre com Áustria, Alemanha, Polônia e Eslováquia."
            ],
            [
                "Área",
                "O território tem aproximadamente 79.000 km² de área."
            ]
        ]
    },
    {
        "name": "Estônia",
        "aliases": [
            "Estonia",
            "Republic of Estonia"
        ],
        "hints": [
            [
                "Localização",
                "Fica na Europa Setentrional."
            ],
            [
                "História",
                "Recuperou sua independência da União Soviética em 1991 e ficou conhecida por desenvolver serviços públicos digitais."
            ],
            [
                "Economia",
                "Tecnologia, telecomunicações, madeira e serviços digitais têm destaque."
            ],
            [
                "Cultura",
                "O Festival da Canção reúne grandes corais e é símbolo da identidade cultural estoniana."
            ],
            [
                "Natureza e patrimônio",
                "O Parque Nacional de Lahemaa protege florestas, pântanos e trechos do litoral báltico."
            ],
            [
                "Capital",
                "Tallinn."
            ],
            [
                "Idiomas",
                "O estoniano é a língua oficial."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se euro."
            ],
            [
                "Fronteiras",
                "Faz fronteira terrestre com Letônia e Rússia."
            ],
            [
                "Área",
                "O território tem aproximadamente 45.000 km² de área."
            ]
        ]
    },
    {
        "name": "Geórgia",
        "aliases": [
            "Georgia",
            "Republic of Georgia"
        ],
        "hints": [
            [
                "Localização",
                "Fica na Ásia Ocidental."
            ],
            [
                "História",
                "O território possui uma longa história de reinos do Cáucaso e recuperou a independência em 1991."
            ],
            [
                "Economia",
                "Vinho, turismo, agricultura, serviços e transporte regional são setores relevantes."
            ],
            [
                "Cultura",
                "A culinária inclui khachapuri e khinkali; o canto polifônico georgiano é tradição cultural reconhecida."
            ],
            [
                "Natureza e patrimônio",
                "As montanhas do Cáucaso e as aldeias de Svaneti são marcos naturais e arquitetônicos."
            ],
            [
                "Capital",
                "Tbilisi."
            ],
            [
                "Idiomas",
                "O georgiano é a língua oficial."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se lari georgiano."
            ],
            [
                "Fronteiras",
                "Faz fronteira terrestre com Armênia, Azerbaijão, Rússia e Turquia."
            ],
            [
                "Área",
                "O território tem aproximadamente 70.000 km² de área."
            ]
        ]
    },
    {
        "name": "Hungria",
        "aliases": [
            "Hungary",
            "Republic of Hungary"
        ],
        "hints": [
            [
                "Localização",
                "Fica na Europa Oriental."
            ],
            [
                "História",
                "A revolta de 1956 tornou-se um marco da resistência húngara ao domínio soviético."
            ],
            [
                "Economia",
                "Indústria automobilística, farmacêutica, alimentos e eletrônicos são importantes para a economia."
            ],
            [
                "Cultura",
                "O goulash e a páprica estão entre os símbolos culinários mais conhecidos."
            ],
            [
                "Natureza e patrimônio",
                "O lago Balaton e a região vinícola de Tokaj são referências naturais e culturais."
            ],
            [
                "Capital",
                "Budapeste."
            ],
            [
                "Idiomas",
                "O húngaro é a língua oficial."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se forint húngaro."
            ],
            [
                "Fronteiras",
                "Faz fronteira terrestre com países vizinhos de diferentes sub-regiões, incluindo Áustria, Croácia, Romênia, Sérvia, Eslováquia e outros."
            ],
            [
                "Área",
                "O território tem aproximadamente 93.000 km² de área."
            ]
        ]
    },
    {
        "name": "Kosovo",
        "aliases": [
            "Republic of Kosovo"
        ],
        "hints": [
            [
                "Localização",
                "Fica na Europa Meridional."
            ],
            [
                "História",
                "Declarou independência em 2008; seu reconhecimento internacional não é universal."
            ],
            [
                "Economia",
                "Serviços, mineração, energia e remessas da diáspora contribuem para a economia."
            ],
            [
                "Cultura",
                "A cultura inclui tradições albanesas e sérvias, além de uma cena musical contemporânea ativa."
            ],
            [
                "Natureza e patrimônio",
                "As montanhas de Rugova e seus cânions estão entre os destaques naturais."
            ],
            [
                "Capital",
                "Pristina."
            ],
            [
                "Idiomas",
                "Albanês e sérvio são línguas oficiais."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se euro."
            ],
            [
                "Fronteiras",
                "Faz fronteira terrestre com Albânia, Macedônia do Norte, Montenegro e Sérvia."
            ],
            [
                "Área",
                "O território tem aproximadamente 11.000 km² de área."
            ]
        ]
    },
    {
        "name": "Letônia",
        "aliases": [
            "Latvia",
            "Republic of Latvia"
        ],
        "hints": [
            [
                "Localização",
                "Fica na Europa Setentrional."
            ],
            [
                "História",
                "Recuperou a independência em 1991, após o período soviético."
            ],
            [
                "Economia",
                "Madeira, logística, alimentos, serviços e tecnologia são setores relevantes."
            ],
            [
                "Cultura",
                "O Festival da Canção e da Dança da Letônia é uma das maiores celebrações corais da região báltica."
            ],
            [
                "Natureza e patrimônio",
                "O Parque Nacional de Gauja reúne florestas, rios, penhascos de arenito e castelos medievais."
            ],
            [
                "Capital",
                "Riga."
            ],
            [
                "Idiomas",
                "O letão é a língua oficial."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se euro."
            ],
            [
                "Fronteiras",
                "Faz fronteira terrestre com Bielorrússia, Estônia, Lituânia e Rússia."
            ],
            [
                "Área",
                "O território tem aproximadamente 65.000 km² de área."
            ]
        ]
    },
    {
        "name": "Liechtenstein",
        "aliases": [
            "Principality of Liechtenstein"
        ],
        "hints": [
            [
                "Localização",
                "Fica na Europa Ocidental."
            ],
            [
                "História",
                "É um principado alpino que manteve sua soberania apesar de estar entre dois países maiores."
            ],
            [
                "Economia",
                "Indústrias de precisão, instrumentos odontológicos, finanças e manufatura especializada têm peso expressivo."
            ],
            [
                "Cultura",
                "O alemão é a língua oficial, e festas de montanha preservam tradições alpinas."
            ],
            [
                "Natureza e patrimônio",
                "O Castelo de Vaduz, residência principesca, domina a paisagem acima da capital."
            ],
            [
                "Capital",
                "Vaduz."
            ],
            [
                "Idiomas",
                "O alemão é a língua oficial."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se franco suíço."
            ],
            [
                "Fronteiras",
                "Faz fronteira terrestre com Áustria e Suíça."
            ],
            [
                "Área",
                "O território tem aproximadamente 200 km² de área."
            ]
        ]
    },
    {
        "name": "Lituânia",
        "aliases": [
            "Lithuania",
            "Republic of Lithuania"
        ],
        "hints": [
            [
                "Localização",
                "Fica na Europa Setentrional."
            ],
            [
                "História",
                "Foi um dos últimos países europeus a adotar oficialmente o cristianismo, no fim do século XIV."
            ],
            [
                "Economia",
                "Tecnologia, móveis, biotecnologia, lasers e serviços financeiros digitais são setores relevantes."
            ],
            [
                "Cultura",
                "O basquete é extremamente popular, e festas de canções e artesanato mantêm tradições locais."
            ],
            [
                "Natureza e patrimônio",
                "O Istmo da Curlândia, com dunas e florestas junto ao Báltico, é Patrimônio Mundial."
            ],
            [
                "Capital",
                "Vilnius."
            ],
            [
                "Idiomas",
                "O lituano é a língua oficial."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se euro."
            ],
            [
                "Fronteiras",
                "Faz fronteira terrestre com Bielorrússia, Letônia, Polônia e Rússia."
            ],
            [
                "Área",
                "O território tem aproximadamente 65.000 km² de área."
            ]
        ]
    },
    {
        "name": "Luxemburgo",
        "aliases": [
            "Luxembourg",
            "Grand Duchy of Luxembourg"
        ],
        "hints": [
            [
                "Localização",
                "Fica na Europa Ocidental."
            ],
            [
                "História",
                "Foi um dos seis países fundadores da Comunidade Econômica Europeia em 1957."
            ],
            [
                "Economia",
                "Serviços financeiros, instituições europeias, tecnologia e logística são importantes para a economia."
            ],
            [
                "Cultura",
                "Luxemburguês, francês e alemão têm usos oficiais distintos, refletindo uma sociedade multilíngue."
            ],
            [
                "Natureza e patrimônio",
                "O centro histórico e as fortificações da cidade de Luxemburgo são Patrimônio Mundial."
            ],
            [
                "Capital",
                "Cidade de Luxemburgo."
            ],
            [
                "Idiomas",
                "Luxemburguês, francês e alemão têm papéis oficiais e administrativos."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se euro."
            ],
            [
                "Fronteiras",
                "Faz fronteira terrestre com Bélgica, França e Alemanha."
            ],
            [
                "Área",
                "O território tem aproximadamente 2.600 km² de área."
            ]
        ]
    },
    {
        "name": "Malta",
        "aliases": [
            "Republic of Malta"
        ],
        "hints": [
            [
                "Localização",
                "Fica na Europa Meridional."
            ],
            [
                "História",
                "A Ordem de São João defendeu a ilha durante o Grande Cerco de 1565."
            ],
            [
                "Economia",
                "Turismo, serviços financeiros, transporte marítimo e tecnologia são setores importantes."
            ],
            [
                "Cultura",
                "O maltês é uma língua semítica escrita com alfabeto latino, ao lado do inglês como língua oficial."
            ],
            [
                "Natureza e patrimônio",
                "Templos megalíticos malteses estão entre algumas das estruturas independentes mais antigas ainda preservadas."
            ],
            [
                "Capital",
                "Valeta."
            ],
            [
                "Idiomas",
                "Maltês e inglês são línguas oficiais."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se euro."
            ],
            [
                "Fronteiras",
                "Não tem fronteiras terrestres internacionais; seu território é insular ou separado por água de outros países."
            ],
            [
                "Área",
                "O território tem aproximadamente 300 km² de área."
            ]
        ]
    },
    {
        "name": "Moldávia",
        "aliases": [
            "Moldova",
            "Republic of Moldova"
        ],
        "hints": [
            [
                "Localização",
                "Fica na Europa Oriental."
            ],
            [
                "História",
                "Tornou-se independente da União Soviética em 1991."
            ],
            [
                "Economia",
                "Vinhos, frutas, agricultura, serviços e remessas têm importância econômica."
            ],
            [
                "Cultura",
                "A festa Mărțișor celebra a chegada da primavera com pequenos amuletos vermelhos e brancos."
            ],
            [
                "Natureza e patrimônio",
                "Adegas subterrâneas como Cricova e Mileștii Mici são famosas por suas extensas galerias."
            ],
            [
                "Capital",
                "Chișinău."
            ],
            [
                "Idiomas",
                "O romeno é a língua oficial."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se leu moldavo."
            ],
            [
                "Fronteiras",
                "Faz fronteira terrestre com Romênia e Ucrânia."
            ],
            [
                "Área",
                "O território tem aproximadamente 34.000 km² de área."
            ]
        ]
    },
    {
        "name": "Mônaco",
        "aliases": [
            "Monaco",
            "Principality of Monaco"
        ],
        "hints": [
            [
                "Localização",
                "Fica na Europa Ocidental."
            ],
            [
                "História",
                "A família Grimaldi está ligada à história do principado desde o fim do século XIII."
            ],
            [
                "Economia",
                "Turismo, serviços financeiros, eventos e imóveis de alto valor movimentam a economia."
            ],
            [
                "Cultura",
                "O Grande Prêmio de Mônaco é uma das provas mais famosas do automobilismo internacional."
            ],
            [
                "Natureza e patrimônio",
                "O principado ocupa uma área muito pequena na costa mediterrânea, junto à França."
            ],
            [
                "Capital",
                "Mônaco."
            ],
            [
                "Idiomas",
                "O francês é a língua oficial."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se euro."
            ],
            [
                "Fronteiras",
                "Faz fronteira terrestre com França."
            ],
            [
                "Área",
                "O território tem aproximadamente 0 km² de área."
            ]
        ]
    },
    {
        "name": "Montenegro",
        "aliases": [],
        "hints": [
            [
                "Localização",
                "Fica na Europa Meridional, na costa do mar Adriático e na região dos Bálcãs."
            ],
            [
                "História",
                "Recuperou sua independência em 2006 após uma união estatal com a Sérvia."
            ],
            [
                "Economia",
                "Turismo, energia, agricultura e serviços são setores importantes."
            ],
            [
                "Cultura",
                "A cozinha combina influências balcânicas e adriáticas, com presunto defumado tradicional da região de Njeguši."
            ],
            [
                "Natureza e patrimônio",
                "A baía de Kotor é conhecida por suas montanhas íngremes e cidades históricas costeiras."
            ],
            [
                "Capital",
                "Podgorica."
            ],
            [
                "Idiomas",
                "O montenegrino é a língua oficial; sérvio, bósnio, albanês e croata também são utilizados."
            ],
            [
                "Moeda",
                "Utiliza o euro como moeda, embora não seja membro da zona do euro."
            ],
            [
                "Fronteiras",
                "Faz fronteira terrestre com Albânia, Bósnia e Herzegovina, Croácia, Kosovo e Sérvia."
            ],
            [
                "Área",
                "O território tem aproximadamente 13.800 km² de área."
            ]
        ]
    },
    {
        "name": "Macedônia do Norte",
        "aliases": [
            "North Macedonia",
            "Republic of North Macedonia"
        ],
        "hints": [
            [
                "Localização",
                "Fica na Europa Meridional."
            ],
            [
                "História",
                "Tornou-se independente da Iugoslávia em 1991."
            ],
            [
                "Economia",
                "Metalurgia, agricultura, vinho e serviços têm importância econômica."
            ],
            [
                "Cultura",
                "O prato tavče gravče, preparado com feijão, é uma especialidade tradicional."
            ],
            [
                "Natureza e patrimônio",
                "O lago Ohrid e seu conjunto de igrejas e patrimônio natural estão entre os mais importantes da região."
            ],
            [
                "Capital",
                "Escópia."
            ],
            [
                "Idiomas",
                "Macedônio e albanês têm uso oficial nacional conforme a legislação."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se denar macedônio."
            ],
            [
                "Fronteiras",
                "Faz fronteira terrestre com Albânia, Bulgária, Grécia, Kosovo e Sérvia."
            ],
            [
                "Área",
                "O território tem aproximadamente 26.000 km² de área."
            ]
        ]
    },
    {
        "name": "Romênia",
        "aliases": [
            "Romania",
            "Roumania"
        ],
        "hints": [
            [
                "Localização",
                "Fica na Europa Oriental."
            ],
            [
                "História",
                "A revolução de 1989 encerrou o regime comunista; a língua romena conserva fortes raízes latinas."
            ],
            [
                "Economia",
                "Automóveis, tecnologia da informação, agricultura e energia são setores relevantes."
            ],
            [
                "Cultura",
                "A literatura folclórica e as danças tradicionais variam entre regiões como Transilvânia e Moldávia."
            ],
            [
                "Natureza e patrimônio",
                "O delta do Danúbio abriga extensas áreas úmidas e grande diversidade de aves."
            ],
            [
                "Capital",
                "Bucareste."
            ],
            [
                "Idiomas",
                "O romeno é a língua oficial."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se leu romeno."
            ],
            [
                "Fronteiras",
                "Faz fronteira terrestre com Bulgária, Hungria, Moldávia, Sérvia e Ucrânia."
            ],
            [
                "Área",
                "O território tem aproximadamente 240.000 km² de área."
            ]
        ]
    },
    {
        "name": "San Marino",
        "aliases": [
            "Republic of San Marino"
        ],
        "hints": [
            [
                "Localização",
                "Fica na Europa Meridional."
            ],
            [
                "História",
                "A tradição local situa sua fundação no ano 301, e o país é frequentemente descrito como uma das repúblicas mais antigas do mundo."
            ],
            [
                "Economia",
                "Turismo, pequenas manufaturas e serviços são bases importantes da economia."
            ],
            [
                "Cultura",
                "A festa nacional e as tradições cívicas celebram a longa continuidade de suas instituições republicanas."
            ],
            [
                "Natureza e patrimônio",
                "As Três Torres no Monte Titano formam o conjunto monumental mais conhecido do país."
            ],
            [
                "Capital",
                "San Marino."
            ],
            [
                "Idiomas",
                "O italiano é a língua oficial."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se euro."
            ],
            [
                "Fronteiras",
                "Faz fronteira terrestre com Itália."
            ],
            [
                "Área",
                "O território tem aproximadamente 100 km² de área."
            ]
        ]
    },
    {
        "name": "Sérvia",
        "aliases": [
            "Serbia",
            "Republic of Serbia"
        ],
        "hints": [
            [
                "Localização",
                "Fica na Europa Oriental."
            ],
            [
                "História",
                "Mosteiros medievais sérvios preservam a herança do antigo Estado sérvio e da arte bizantina."
            ],
            [
                "Economia",
                "Agricultura, indústria automotiva, máquinas, energia e tecnologia são setores relevantes."
            ],
            [
                "Cultura",
                "A celebração familiar chamada slava e a música de metais têm presença marcante na cultura sérvia."
            ],
            [
                "Natureza e patrimônio",
                "A garganta do Đerdap, no Danúbio, forma uma das paisagens fluviais mais impressionantes da região."
            ],
            [
                "Capital",
                "Belgrado."
            ],
            [
                "Idiomas",
                "O sérvio é a língua oficial."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se dinar sérvio."
            ],
            [
                "Fronteiras",
                "Faz fronteira terrestre com Bósnia e Herzegovina, Bulgária, Croácia, Hungria, Kosovo, Macedônia do Norte, Montenegro, Romênia e Eslovênia."
            ],
            [
                "Área",
                "O território tem aproximadamente 49.000 km² de área."
            ]
        ]
    },
    {
        "name": "Eslováquia",
        "aliases": [
            "Slovakia",
            "Slovak Republic"
        ],
        "hints": [
            [
                "Localização",
                "Fica na Europa Oriental."
            ],
            [
                "História",
                "Tornou-se independente em 1993, após a dissolução pacífica da Tchecoslováquia."
            ],
            [
                "Economia",
                "Automóveis, eletrônicos, máquinas e equipamentos são importantes para a indústria."
            ],
            [
                "Cultura",
                "A arquitetura popular de madeira e as tradições folclóricas variam entre vales e montanhas."
            ],
            [
                "Natureza e patrimônio",
                "Os Altos Tatras e o Castelo de Spiš são grandes referências naturais e históricas."
            ],
            [
                "Capital",
                "Bratislava."
            ],
            [
                "Idiomas",
                "O eslovaco é a língua oficial."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se euro."
            ],
            [
                "Fronteiras",
                "Faz fronteira terrestre com Áustria, Hungria, Polônia, Tchéquia e Ucrânia."
            ],
            [
                "Área",
                "O território tem aproximadamente 49.000 km² de área."
            ]
        ]
    },
    {
        "name": "Eslovênia",
        "aliases": [
            "Slovenia",
            "Republic of Slovenia"
        ],
        "hints": [
            [
                "Localização",
                "Fica na Europa Meridional."
            ],
            [
                "História",
                "Declarou independência da Iugoslávia em 1991 e aderiu à União Europeia em 2004."
            ],
            [
                "Economia",
                "Produtos farmacêuticos, autopeças, manufatura e turismo são setores relevantes."
            ],
            [
                "Cultura",
                "A apicultura tem grande importância cultural; a região também é conhecida por seus vinhos e culinária alpino-adriática."
            ],
            [
                "Natureza e patrimônio",
                "O lago Bled e as cavernas cársticas de Postojna são atrações naturais famosas."
            ],
            [
                "Capital",
                "Liubliana."
            ],
            [
                "Idiomas",
                "O esloveno é a língua oficial."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se euro."
            ],
            [
                "Fronteiras",
                "Faz fronteira terrestre com Áustria, Croácia, Hungria e Itália."
            ],
            [
                "Área",
                "O território tem aproximadamente 20.000 km² de área."
            ]
        ]
    },
    {
        "name": "Reino Unido",
        "aliases": [
            "United Kingdom",
            "UK",
            "Britain",
            "Great Britain"
        ],
        "hints": [
            [
                "Localização",
                "Fica na Europa Setentrional."
            ],
            [
                "História",
                "A Revolução Industrial começou no território britânico antes de se espalhar para outras regiões."
            ],
            [
                "Economia",
                "Finanças, serviços profissionais, indústria criativa, pesquisa e tecnologia têm grande peso."
            ],
            [
                "Cultura",
                "O inglês se tornou uma língua internacional; tradições musicais e esportivas britânicas têm alcance global."
            ],
            [
                "Natureza e patrimônio",
                "O território inclui quatro nações constituintes e paisagens como as Terras Altas da Escócia."
            ],
            [
                "Capital",
                "Londres."
            ],
            [
                "Idiomas",
                "O inglês é predominante; galês, gaélico escocês e irlandês têm reconhecimento regional."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se libra esterlina."
            ],
            [
                "Fronteiras",
                "Faz fronteira terrestre com Irlanda."
            ],
            [
                "Área",
                "O território tem aproximadamente 240.000 km² de área."
            ]
        ]
    },
    {
        "name": "Armênia",
        "aliases": [
            "Armenia",
            "Republic of Armenia"
        ],
        "hints": [
            [
                "Localização",
                "Fica na Ásia Ocidental."
            ],
            [
                "História",
                "É tradicionalmente reconhecida como o primeiro Estado a adotar o cristianismo como religião oficial, no início do século IV."
            ],
            [
                "Economia",
                "Tecnologia da informação, mineração, alimentos e produção de bebidas são setores relevantes."
            ],
            [
                "Cultura",
                "O duduk, instrumento de sopro de madeira, é um símbolo musical armênio; lavash é um pão tradicional."
            ],
            [
                "Natureza e patrimônio",
                "Mosteiros como Geghard e paisagens do Cáucaso formam parte importante do patrimônio do país."
            ],
            [
                "Capital",
                "Erevã."
            ],
            [
                "Idiomas",
                "O armênio é a língua oficial."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se dram armênio."
            ],
            [
                "Fronteiras",
                "Faz fronteira terrestre com Azerbaijão, Geórgia, Irã e Turquia."
            ],
            [
                "Área",
                "O território tem aproximadamente 30.000 km² de área."
            ]
        ]
    },
    {
        "name": "Bolívia",
        "aliases": [
            "Bolivia",
            "Plurinational State of Bolivia"
        ],
        "hints": [
            [
                "Localização",
                "Fica na América do Sul."
            ],
            [
                "História",
                "O território fez parte do Império Inca e tornou-se independente da Espanha em 1825."
            ],
            [
                "Economia",
                "Gás natural, mineração, agricultura e lítio estão entre os setores econômicos relevantes."
            ],
            [
                "Cultura",
                "Quéchua e aimará mantêm forte presença cultural, e o tereré é popular em várias áreas."
            ],
            [
                "Natureza e patrimônio",
                "O Salar de Uyuni é uma das maiores planícies de sal do mundo."
            ],
            [
                "Capital",
                "Sucre é a capital constitucional; La Paz abriga a sede do governo."
            ],
            [
                "Idiomas",
                "O espanhol e 36 línguas indígenas, incluindo aimará e quéchua, têm status oficial."
            ],
            [
                "Moeda",
                "Entre as moedas utilizadas estão boliviano e Mvdol boliviano."
            ],
            [
                "Fronteiras",
                "Faz fronteira terrestre com Argentina, Brasil, Chile, Paraguai e Peru."
            ],
            [
                "Área",
                "O território tem aproximadamente 1.100.000 km² de área."
            ]
        ]
    },
    {
        "name": "Equador",
        "aliases": [
            "Ecuador",
            "Republic of Ecuador"
        ],
        "hints": [
            [
                "Localização",
                "Fica na América do Sul."
            ],
            [
                "História",
                "O nome do país faz referência à linha do Equador, que atravessa seu território."
            ],
            [
                "Economia",
                "Petróleo, bananas, camarão, flores e cacau são exportações importantes."
            ],
            [
                "Cultura",
                "O chapéu conhecido internacionalmente como panamá tem origem tradicional equatoriana."
            ],
            [
                "Natureza e patrimônio",
                "As ilhas Galápagos ajudaram a inspirar estudos científicos sobre evolução e biodiversidade."
            ],
            [
                "Capital",
                "Quito."
            ],
            [
                "Idiomas",
                "O espanhol é oficial; kichwa e shuar são reconhecidos para relações interculturais."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se dólar americano."
            ],
            [
                "Fronteiras",
                "Faz fronteira terrestre com Colômbia e Peru."
            ],
            [
                "Área",
                "O território tem aproximadamente 280.000 km² de área."
            ]
        ]
    },
    {
        "name": "Guiana",
        "aliases": [
            "Guyana",
            "Co-operative Republic of Guyana"
        ],
        "hints": [
            [
                "Localização",
                "Fica na América do Sul."
            ],
            [
                "História",
                "É o único país soberano da América do Sul cuja língua oficial é o inglês."
            ],
            [
                "Economia",
                "Petróleo offshore, ouro, bauxita, arroz e açúcar são setores importantes."
            ],
            [
                "Cultura",
                "A cultura mistura influências caribenhas, sul-asiáticas, africanas e indígenas."
            ],
            [
                "Natureza e patrimônio",
                "As Cataratas Kaieteur ficam em uma região de floresta tropical e estão entre as quedas d'água de grande volume do mundo."
            ],
            [
                "Capital",
                "Georgetown."
            ],
            [
                "Idiomas",
                "O inglês é a língua oficial."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se dólar guianense."
            ],
            [
                "Fronteiras",
                "Faz fronteira terrestre com Brasil, Suriname e Venezuela."
            ],
            [
                "Área",
                "O território tem aproximadamente 210.000 km² de área."
            ]
        ]
    },
    {
        "name": "Paraguai",
        "aliases": [
            "Paraguay",
            "Republic of Paraguay"
        ],
        "hints": [
            [
                "Localização",
                "Fica na América do Sul."
            ],
            [
                "História",
                "A história do país inclui as missões jesuíticas guaranis e a independência de 1811."
            ],
            [
                "Economia",
                "Hidreletricidade, soja, carne bovina e agricultura têm grande importância econômica."
            ],
            [
                "Cultura",
                "Guarani e espanhol são línguas oficiais; o tereré é uma bebida tradicional muito difundida."
            ],
            [
                "Natureza e patrimônio",
                "A usina hidrelétrica de Itaipu, compartilhada com o Brasil, é uma das maiores do mundo em geração acumulada."
            ],
            [
                "Capital",
                "Assunção."
            ],
            [
                "Idiomas",
                "Espanhol e guarani são línguas oficiais."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se guarani paraguaio."
            ],
            [
                "Fronteiras",
                "Faz fronteira terrestre com Argentina, Bolívia e Brasil."
            ],
            [
                "Área",
                "O território tem aproximadamente 410.000 km² de área."
            ]
        ]
    },
    {
        "name": "Suriname",
        "aliases": [
            "Republic of Suriname"
        ],
        "hints": [
            [
                "Localização",
                "Fica na América do Sul."
            ],
            [
                "História",
                "Tornou-se independente dos Países Baixos em 1975."
            ],
            [
                "Economia",
                "Ouro, petróleo, bauxita, madeira e agricultura têm relevância econômica."
            ],
            [
                "Cultura",
                "O neerlandês é a língua oficial; a população reúne heranças indígenas, africanas, sul-asiáticas, javanesas e europeias."
            ],
            [
                "Natureza e patrimônio",
                "A Reserva Natural do Suriname Central protege uma extensa área de floresta tropical."
            ],
            [
                "Capital",
                "Paramaribo."
            ],
            [
                "Idiomas",
                "O neerlandês é a língua oficial; Sranan Tongo é amplamente usado no cotidiano."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se dólar surinamês."
            ],
            [
                "Fronteiras",
                "Faz fronteira terrestre com Brasil, Guiana e Guiana Francesa, território ultramarino da França."
            ],
            [
                "Área",
                "O território tem aproximadamente 160.000 km² de área."
            ]
        ]
    },
    {
        "name": "Venezuela",
        "aliases": [
            "Bolivarian Republic of Venezuela"
        ],
        "hints": [
            [
                "Localização",
                "Fica na América do Sul."
            ],
            [
                "História",
                "O território foi um dos centros dos movimentos de independência liderados por Simón Bolívar."
            ],
            [
                "Economia",
                "O petróleo é historicamente central para a economia, junto de mineração e agricultura."
            ],
            [
                "Cultura",
                "A arepa e a música llanera são referências culinárias e musicais importantes."
            ],
            [
                "Natureza e patrimônio",
                "O Salto Ángel, em Canaima, é amplamente conhecido como a cachoeira mais alta do mundo."
            ],
            [
                "Capital",
                "Caracas."
            ],
            [
                "Idiomas",
                "O espanhol é a língua oficial; línguas indígenas têm reconhecimento para seus povos."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se Bolívar venezuelano (2008–2018)."
            ],
            [
                "Fronteiras",
                "Faz fronteira terrestre com Brasil, Colômbia e Guiana."
            ],
            [
                "Área",
                "O território tem aproximadamente 920.000 km² de área."
            ]
        ]
    },
    {
        "name": "Antígua e Barbuda",
        "aliases": [
            "Antigua and Barbuda"
        ],
        "hints": [
            [
                "Localização",
                "Fica no Caribe."
            ],
            [
                "História",
                "Tornou-se independente do Reino Unido em 1981."
            ],
            [
                "Economia",
                "Turismo, serviços e atividades ligadas a portos e eventos náuticos têm grande peso."
            ],
            [
                "Cultura",
                "A música calypso e o carnaval fazem parte das celebrações populares."
            ],
            [
                "Natureza e patrimônio",
                "Nelson's Dockyard preserva instalações históricas da antiga presença naval britânica."
            ],
            [
                "Capital",
                "Saint John’s."
            ],
            [
                "Idiomas",
                "O inglês é a língua oficial."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se dólar do Caribe Oriental."
            ],
            [
                "Fronteiras",
                "Não tem fronteiras terrestres internacionais; seu território é insular ou separado por água de outros países."
            ],
            [
                "Área",
                "O território tem aproximadamente 400 km² de área."
            ]
        ]
    },
    {
        "name": "Bahamas",
        "aliases": [
            "Commonwealth of The Bahamas"
        ],
        "hints": [
            [
                "Localização",
                "Fica no Caribe."
            ],
            [
                "História",
                "Conquistou a independência do Reino Unido em 1973."
            ],
            [
                "Economia",
                "Turismo e serviços financeiros internacionais são os pilares da economia."
            ],
            [
                "Cultura",
                "O Junkanoo, com fantasias e percussão, é uma das festas culturais mais conhecidas."
            ],
            [
                "Natureza e patrimônio",
                "O arquipélago é famoso por águas rasas e azuis, recifes e buracos azuis submarinos."
            ],
            [
                "Capital",
                "Nassau."
            ],
            [
                "Idiomas",
                "O inglês é a língua oficial."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se dólar bahamense."
            ],
            [
                "Fronteiras",
                "Não tem fronteiras terrestres internacionais; seu território é insular ou separado por água de outros países."
            ],
            [
                "Área",
                "O território tem aproximadamente 14.000 km² de área."
            ]
        ]
    },
    {
        "name": "Barbados",
        "aliases": [],
        "hints": [
            [
                "Localização",
                "Fica no Caribe."
            ],
            [
                "História",
                "Tornou-se independente do Reino Unido em 1966 e tornou-se república em 2021."
            ],
            [
                "Economia",
                "Turismo, serviços, rum e atividades empresariais têm importância econômica."
            ],
            [
                "Cultura",
                "O Crop Over é um festival tradicional associado ao fim da colheita de cana-de-açúcar."
            ],
            [
                "Natureza e patrimônio",
                "Bridgetown e sua guarnição histórica são reconhecidas como Patrimônio Mundial."
            ],
            [
                "Capital",
                "Bridgetown."
            ],
            [
                "Idiomas",
                "O inglês é a língua oficial; o crioulo bajan é amplamente falado."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se dólar barbadiano."
            ],
            [
                "Fronteiras",
                "Não tem fronteiras terrestres internacionais; seu território é insular ou separado por água de outros países."
            ],
            [
                "Área",
                "O território tem aproximadamente 400 km² de área."
            ]
        ]
    },
    {
        "name": "Dominica",
        "aliases": [
            "Commonwealth of Dominica"
        ],
        "hints": [
            [
                "Localização",
                "Fica no Caribe."
            ],
            [
                "História",
                "Alcançou a independência do Reino Unido em 1978."
            ],
            [
                "Economia",
                "Turismo de natureza, agricultura e exportação de produtos agrícolas são setores importantes."
            ],
            [
                "Cultura",
                "A cultura crioula aparece na gastronomia, na língua crioula local e em festivais musicais."
            ],
            [
                "Natureza e patrimônio",
                "O Boiling Lake fica em uma área vulcânica do Parque Nacional Morne Trois Pitons."
            ],
            [
                "Capital",
                "Roseau."
            ],
            [
                "Idiomas",
                "O inglês é oficial e o crioulo de base francesa é bastante utilizado."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se dólar do Caribe Oriental."
            ],
            [
                "Fronteiras",
                "Não tem fronteiras terrestres internacionais; seu território é insular ou separado por água de outros países."
            ],
            [
                "Área",
                "O território tem aproximadamente 800 km² de área."
            ]
        ]
    },
    {
        "name": "República Dominicana",
        "aliases": [
            "Dominican Republic"
        ],
        "hints": [
            [
                "Localização",
                "Fica no Caribe."
            ],
            [
                "História",
                "A independência foi proclamada em 1844, após um período de ocupação haitiana."
            ],
            [
                "Economia",
                "Turismo, dispositivos médicos, zonas de exportação, mineração e agricultura são importantes."
            ],
            [
                "Cultura",
                "Merengue e bachata são estilos musicais originários do país e difundidos mundialmente."
            ],
            [
                "Natureza e patrimônio",
                "O Pico Duarte é a montanha mais alta da região do Caribe."
            ],
            [
                "Capital",
                "Santo Domingo."
            ],
            [
                "Idiomas",
                "O espanhol é a língua oficial."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se peso dominicano."
            ],
            [
                "Fronteiras",
                "Faz fronteira terrestre com Haiti."
            ],
            [
                "Área",
                "O território tem aproximadamente 49.000 km² de área."
            ]
        ]
    },
    {
        "name": "Granada",
        "aliases": [
            "Grenada",
            "State of Grenada"
        ],
        "hints": [
            [
                "Localização",
                "Fica no Caribe."
            ],
            [
                "História",
                "Tornou-se independente do Reino Unido em 1974."
            ],
            [
                "Economia",
                "Noz-moscada, cacau, agricultura e turismo têm papel importante na economia."
            ],
            [
                "Cultura",
                "O carnaval Spicemas inclui música soca, fantasias e desfiles."
            ],
            [
                "Natureza e patrimônio",
                "O lago Grand Etang ocupa uma cratera vulcânica no interior montanhoso da ilha principal."
            ],
            [
                "Capital",
                "Saint George’s."
            ],
            [
                "Idiomas",
                "O inglês é a língua oficial."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se dólar do Caribe Oriental."
            ],
            [
                "Fronteiras",
                "Não tem fronteiras terrestres internacionais; seu território é insular ou separado por água de outros países."
            ],
            [
                "Área",
                "O território tem aproximadamente 300 km² de área."
            ]
        ]
    },
    {
        "name": "Haiti",
        "aliases": [
            "Republic of Haiti"
        ],
        "hints": [
            [
                "Localização",
                "Fica no Caribe."
            ],
            [
                "História",
                "Em 1804, tornou-se independente após uma revolução que fez dele uma das primeiras repúblicas negras independentes do mundo."
            ],
            [
                "Economia",
                "Têxteis, agricultura, comércio e remessas da diáspora são setores relevantes."
            ],
            [
                "Cultura",
                "Crioulo haitiano e francês são línguas oficiais; compas e rara são tradições musicais conhecidas."
            ],
            [
                "Natureza e patrimônio",
                "A Citadelle Laferrière é uma grande fortificação histórica construída após a independência."
            ],
            [
                "Capital",
                "Porto Príncipe."
            ],
            [
                "Idiomas",
                "Crioulo haitiano e francês são línguas oficiais."
            ],
            [
                "Moeda",
                "Entre as moedas utilizadas estão gourde haitiano e dólar americano."
            ],
            [
                "Fronteiras",
                "Faz fronteira terrestre com República Dominicana."
            ],
            [
                "Área",
                "O território tem aproximadamente 28.000 km² de área."
            ]
        ]
    },
    {
        "name": "Jamaica",
        "aliases": [],
        "hints": [
            [
                "Localização",
                "Fica no Caribe."
            ],
            [
                "História",
                "Tornou-se independente do Reino Unido em 1962."
            ],
            [
                "Economia",
                "Turismo, bauxita, alumina, agricultura e serviços contribuem para a economia."
            ],
            [
                "Cultura",
                "O reggae jamaicano foi reconhecido pela UNESCO como patrimônio cultural imaterial em 2018."
            ],
            [
                "Natureza e patrimônio",
                "As Montanhas Azuis são conhecidas por suas florestas e pela produção de café."
            ],
            [
                "Capital",
                "Kingston."
            ],
            [
                "Idiomas",
                "O inglês é a língua oficial; o patois jamaicano é amplamente falado."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se dólar jamaicano."
            ],
            [
                "Fronteiras",
                "Não tem fronteiras terrestres internacionais; seu território é insular ou separado por água de outros países."
            ],
            [
                "Área",
                "O território tem aproximadamente 11.000 km² de área."
            ]
        ]
    },
    {
        "name": "São Cristóvão e Névis",
        "aliases": [
            "Saint Kitts and Nevis",
            "Federation of Saint Christopher and Nevis"
        ],
        "hints": [
            [
                "Localização",
                "Fica no Caribe."
            ],
            [
                "História",
                "Tornou-se independente do Reino Unido em 1983."
            ],
            [
                "Economia",
                "Turismo, serviços e atividades financeiras são importantes para a economia."
            ],
            [
                "Cultura",
                "Carnavais, música caribenha e tradições ligadas ao mar fazem parte das celebrações locais."
            ],
            [
                "Natureza e patrimônio",
                "A fortaleza de Brimstone Hill é Patrimônio Mundial e testemunha a história colonial da região."
            ],
            [
                "Capital",
                "Basseterre."
            ],
            [
                "Idiomas",
                "O inglês é a língua oficial."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se dólar do Caribe Oriental."
            ],
            [
                "Fronteiras",
                "Não tem fronteiras terrestres internacionais; seu território é insular ou separado por água de outros países."
            ],
            [
                "Área",
                "O território tem aproximadamente 300 km² de área."
            ]
        ]
    },
    {
        "name": "Santa Lúcia",
        "aliases": [
            "Saint Lucia"
        ],
        "hints": [
            [
                "Localização",
                "Fica no Caribe."
            ],
            [
                "História",
                "Tornou-se independente do Reino Unido em 1979."
            ],
            [
                "Economia",
                "Turismo, serviços e produção agrícola, incluindo bananas, têm importância econômica."
            ],
            [
                "Cultura",
                "A cultura crioula inclui música, cozinha local e a celebração Jounen Kwéyòl."
            ],
            [
                "Natureza e patrimônio",
                "Os Pitons, dois picos vulcânicos próximos à costa, são o cartão-postal mais famoso da ilha."
            ],
            [
                "Capital",
                "Castries."
            ],
            [
                "Idiomas",
                "O inglês é oficial; o crioulo de base francesa também é muito utilizado."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se dólar do Caribe Oriental."
            ],
            [
                "Fronteiras",
                "Não tem fronteiras terrestres internacionais; seu território é insular ou separado por água de outros países."
            ],
            [
                "Área",
                "O território tem aproximadamente 600 km² de área."
            ]
        ]
    },
    {
        "name": "São Vicente e Granadinas",
        "aliases": [
            "Saint Vincent and the Grenadines"
        ],
        "hints": [
            [
                "Localização",
                "Fica no Caribe."
            ],
            [
                "História",
                "Tornou-se independente do Reino Unido em 1979."
            ],
            [
                "Economia",
                "Agricultura, turismo náutico e serviços são setores importantes."
            ],
            [
                "Cultura",
                "O festival Vincy Mas celebra a música, os desfiles e o carnaval local."
            ],
            [
                "Natureza e patrimônio",
                "O vulcão La Soufrière e as ilhas Granadinas formam paisagens marcantes."
            ],
            [
                "Capital",
                "Kingstown."
            ],
            [
                "Idiomas",
                "O inglês é a língua oficial."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se dólar do Caribe Oriental."
            ],
            [
                "Fronteiras",
                "Não tem fronteiras terrestres internacionais; seu território é insular ou separado por água de outros países."
            ],
            [
                "Área",
                "O território tem aproximadamente 400 km² de área."
            ]
        ]
    },
    {
        "name": "Trinidad e Tobago",
        "aliases": [
            "Trinidad and Tobago",
            "Republic of Trinidad and Tobago"
        ],
        "hints": [
            [
                "Localização",
                "Fica no Caribe."
            ],
            [
                "História",
                "Tornou-se independente do Reino Unido em 1962."
            ],
            [
                "Economia",
                "Gás natural, petróleo, petroquímica e fertilizantes são pilares da economia."
            ],
            [
                "Cultura",
                "O steelpan foi desenvolvido no país; calypso e soca também têm origem local."
            ],
            [
                "Natureza e patrimônio",
                "O Pitch Lake, em Trinidad, é um dos maiores depósitos naturais de asfalto do mundo."
            ],
            [
                "Capital",
                "Port of Spain."
            ],
            [
                "Idiomas",
                "O inglês é a língua oficial."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se dólar de Trinidad e Tobago."
            ],
            [
                "Fronteiras",
                "Não tem fronteiras terrestres internacionais; seu território é insular ou separado por água de outros países."
            ],
            [
                "Área",
                "O território tem aproximadamente 5.100 km² de área."
            ]
        ]
    },
    {
        "name": "Argélia",
        "aliases": [
            "Algeria",
            "People's Democratic Republic of Algeria"
        ],
        "hints": [
            [
                "Localização",
                "Fica no Norte da África."
            ],
            [
                "História",
                "Conquistou independência da França em 1962 após uma longa guerra de libertação."
            ],
            [
                "Economia",
                "Petróleo e gás natural são centrais para as exportações, junto de mineração e agricultura."
            ],
            [
                "Cultura",
                "Árabe e tamazight são línguas oficiais, e a música raï tem raízes importantes no país."
            ],
            [
                "Natureza e patrimônio",
                "A arte rupestre de Tassili n'Ajjer documenta paisagens e comunidades antigas do Saara."
            ],
            [
                "Capital",
                "Argel."
            ],
            [
                "Idiomas",
                "Árabe e tamazight são línguas oficiais."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se dinar argelino."
            ],
            [
                "Fronteiras",
                "Faz fronteira terrestre com países vizinhos de diferentes sub-regiões, incluindo Tunísia, Líbia, Níger, Saara Ocidental, Mauritânia e outros."
            ],
            [
                "Área",
                "O território tem aproximadamente 2.400.000 km² de área."
            ]
        ]
    },
    {
        "name": "Líbia",
        "aliases": [
            "Libya",
            "State of Libya"
        ],
        "hints": [
            [
                "Localização",
                "Fica no Norte da África."
            ],
            [
                "História",
                "Tornou-se independente em 1951, após período de administração internacional no pós-guerra."
            ],
            [
                "Economia",
                "O petróleo e o gás dominam as exportações."
            ],
            [
                "Cultura",
                "A cultura reúne tradições árabes, amazigh e mediterrâneas, com forte herança saariana."
            ],
            [
                "Natureza e patrimônio",
                "Leptis Magna preserva ruínas romanas extensas perto da costa mediterrânea."
            ],
            [
                "Capital",
                "Trípoli."
            ],
            [
                "Idiomas",
                "O árabe é a língua oficial."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se dinar líbio."
            ],
            [
                "Fronteiras",
                "Faz fronteira terrestre com países vizinhos de diferentes sub-regiões, incluindo Argélia, Chade, Egito, Níger, Sudão e outros."
            ],
            [
                "Área",
                "O território tem aproximadamente 1.800.000 km² de área."
            ]
        ]
    },
    {
        "name": "Tunísia",
        "aliases": [
            "Tunisia",
            "Republic of Tunisia"
        ],
        "hints": [
            [
                "Localização",
                "Fica no Norte da África."
            ],
            [
                "História",
                "A Revolução de 2011 foi um marco dos protestos que ficaram conhecidos como Primavera Árabe."
            ],
            [
                "Economia",
                "Azeite, têxteis, componentes industriais, turismo e serviços são setores relevantes."
            ],
            [
                "Cultura",
                "Cuscuz, cerâmica e tradições musicais locais mostram influências amazigh, árabes e mediterrâneas."
            ],
            [
                "Natureza e patrimônio",
                "Cartago e o anfiteatro romano de El Jem são importantes sítios arqueológicos."
            ],
            [
                "Capital",
                "Tunes."
            ],
            [
                "Idiomas",
                "O árabe é a língua oficial."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se dinar tunisiano."
            ],
            [
                "Fronteiras",
                "Faz fronteira terrestre com Argélia e Líbia."
            ],
            [
                "Área",
                "O território tem aproximadamente 160.000 km² de área."
            ]
        ]
    },
    {
        "name": "Sudão",
        "aliases": [
            "Sudan",
            "Republic of the Sudan"
        ],
        "hints": [
            [
                "Localização",
                "Fica no Norte da África."
            ],
            [
                "História",
                "Tornou-se independente do Reino Unido e do Egito em 1956."
            ],
            [
                "Economia",
                "Agricultura, pecuária, ouro e comércio são componentes importantes da economia."
            ],
            [
                "Cultura",
                "O país reúne tradições árabes, núbias e de vários povos do Sahel e do vale do Nilo."
            ],
            [
                "Natureza e patrimônio",
                "As pirâmides de Meroé lembram os antigos reinos de Cuxe e Núbia."
            ],
            [
                "Capital",
                "Cartum."
            ],
            [
                "Idiomas",
                "O árabe e o inglês são usados oficialmente; diversas línguas regionais também são faladas."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se libra sudanesa."
            ],
            [
                "Fronteiras",
                "Faz fronteira terrestre com países vizinhos de diferentes sub-regiões, incluindo República Centro-Africana, Chade, Egito, Eritreia, Etiópia e outros."
            ],
            [
                "Área",
                "O território tem aproximadamente 1.900.000 km² de área."
            ]
        ]
    },
    {
        "name": "Irã",
        "aliases": [
            "Iran",
            "Islamic Republic of Iran",
            "Persia"
        ],
        "hints": [
            [
                "Localização",
                "Fica na Ásia Ocidental, entre o mar Cáspio e o golfo Pérsico, com grande parte do território formada por planaltos e montanhas."
            ],
            [
                "História",
                "O antigo Império Persa deixou marcas históricas, incluindo as ruínas cerimoniais de Persépolis."
            ],
            [
                "Economia",
                "Petróleo, gás natural, petroquímica, pistache, açafrão e tapetes são importantes para a economia."
            ],
            [
                "Cultura",
                "O Nowruz marca o Ano-Novo persa, e a poesia clássica de Hafez e Rumi é muito influente."
            ],
            [
                "Natureza e patrimônio",
                "As cadeias dos montes Zagros e Elburz cercam partes do planalto iraniano."
            ],
            [
                "Capital",
                "Teerã."
            ],
            [
                "Idiomas",
                "O persa (farsi) é a língua oficial."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se rial iraniano."
            ],
            [
                "Fronteiras",
                "Faz fronteira terrestre com países vizinhos de diferentes sub-regiões, incluindo Afeganistão, Armênia, Azerbaijão, Iraque, Paquistão e outros."
            ],
            [
                "Área",
                "O território tem aproximadamente 1.600.000 km² de área."
            ]
        ]
    },
    {
        "name": "Iraque",
        "aliases": [
            "Iraq",
            "Republic of Iraq"
        ],
        "hints": [
            [
                "Localização",
                "Fica na Ásia Ocidental."
            ],
            [
                "História",
                "A região entre os rios Tigre e Eufrates foi um dos centros das primeiras cidades e sistemas de escrita da Mesopotâmia."
            ],
            [
                "Economia",
                "O petróleo domina as exportações e a receita pública."
            ],
            [
                "Cultura",
                "Árabe e curdo são línguas oficiais; a culinária inclui pratos como masgouf e dolma."
            ],
            [
                "Natureza e patrimônio",
                "As ruínas da antiga Babilônia estão entre os sítios arqueológicos mais conhecidos do país."
            ],
            [
                "Capital",
                "Bagdá."
            ],
            [
                "Idiomas",
                "Árabe e curdo são línguas oficiais."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se dinar iraquiano."
            ],
            [
                "Fronteiras",
                "Faz fronteira terrestre com países vizinhos de diferentes sub-regiões, incluindo Irã, Jordânia, Kuwait, Arábia Saudita, Síria e outros."
            ],
            [
                "Área",
                "O território tem aproximadamente 440.000 km² de área."
            ]
        ]
    },
    {
        "name": "Israel",
        "aliases": [
            "State of Israel"
        ],
        "hints": [
            [
                "Localização",
                "Fica na Ásia Ocidental."
            ],
            [
                "História",
                "Foi estabelecido em 1948, em um período central da história contemporânea do Oriente Médio."
            ],
            [
                "Economia",
                "Tecnologia, pesquisa, dispositivos médicos, agricultura especializada e serviços são setores relevantes."
            ],
            [
                "Cultura",
                "Hebraico e árabe têm status oficial ou especial; a gastronomia combina tradições mediterrâneas e do Oriente Médio."
            ],
            [
                "Natureza e patrimônio",
                "O mar Morto, compartilhado com territórios vizinhos, é conhecido pela elevada salinidade e por estar em uma depressão profunda."
            ],
            [
                "Capital",
                "Jerusalém."
            ],
            [
                "Idiomas",
                "O hebraico é a língua oficial; o árabe tem status especial."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se novo shekel israelense."
            ],
            [
                "Fronteiras",
                "Faz fronteira terrestre com Egito, Jordânia, Líbano e Síria."
            ],
            [
                "Área",
                "O território tem aproximadamente 21.000 km² de área."
            ]
        ]
    },
    {
        "name": "Jordânia",
        "aliases": [
            "Jordan",
            "Hashemite Kingdom of Jordan"
        ],
        "hints": [
            [
                "Localização",
                "Fica na Ásia Ocidental."
            ],
            [
                "História",
                "A cidade de Petra foi um importante centro comercial do reino nabateu."
            ],
            [
                "Economia",
                "Fosfatos, potássio, turismo, serviços e tecnologia têm peso na economia."
            ],
            [
                "Cultura",
                "A hospitalidade beduína e pratos como mansaf são referências culturais importantes."
            ],
            [
                "Natureza e patrimônio",
                "Wadi Rum combina desertos, arcos rochosos e vestígios arqueológicos."
            ],
            [
                "Capital",
                "Amã."
            ],
            [
                "Idiomas",
                "O árabe é a língua oficial."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se dinar jordaniano."
            ],
            [
                "Fronteiras",
                "Faz fronteira terrestre com Iraque, Israel, Arábia Saudita e Síria."
            ],
            [
                "Área",
                "O território tem aproximadamente 89.000 km² de área."
            ]
        ]
    },
    {
        "name": "Kuwait",
        "aliases": [
            "State of Kuwait"
        ],
        "hints": [
            [
                "Localização",
                "Fica na Ásia Ocidental."
            ],
            [
                "História",
                "Tornou-se independente do Reino Unido em 1961."
            ],
            [
                "Economia",
                "A produção e o refino de petróleo são o núcleo da economia."
            ],
            [
                "Cultura",
                "A tradição marítima ligada à pesca de pérolas e à construção de dhows permanece parte da memória cultural."
            ],
            [
                "Natureza e patrimônio",
                "As Torres do Kuwait são um símbolo arquitetônico da capital."
            ],
            [
                "Capital",
                "Cidade do Kuwait."
            ],
            [
                "Idiomas",
                "O árabe é a língua oficial."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se dinar kuwaitiano."
            ],
            [
                "Fronteiras",
                "Faz fronteira terrestre com Irã e Arábia Saudita."
            ],
            [
                "Área",
                "O território tem aproximadamente 18.000 km² de área."
            ]
        ]
    },
    {
        "name": "Líbano",
        "aliases": [
            "Lebanon",
            "Lebanese Republic"
        ],
        "hints": [
            [
                "Localização",
                "Fica na Ásia Ocidental."
            ],
            [
                "História",
                "Declarou independência da França em 1943."
            ],
            [
                "Economia",
                "Serviços, comércio, agricultura, vinhos e a diáspora têm papel na economia."
            ],
            [
                "Cultura",
                "A culinária libanesa, com pratos como tabule e homus, é conhecida internacionalmente."
            ],
            [
                "Natureza e patrimônio",
                "Baalbek preserva templos romanos monumentais e os cedros são símbolos nacionais."
            ],
            [
                "Capital",
                "Beirute."
            ],
            [
                "Idiomas",
                "O árabe é a língua oficial; o francês também é usado em muitos contextos."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se libra libanesa."
            ],
            [
                "Fronteiras",
                "Faz fronteira terrestre com Israel e Síria."
            ],
            [
                "Área",
                "O território tem aproximadamente 10.000 km² de área."
            ]
        ]
    },
    {
        "name": "Omã",
        "aliases": [
            "Oman",
            "Sultanate of Oman"
        ],
        "hints": [
            [
                "Localização",
                "Fica na Ásia Ocidental."
            ],
            [
                "História",
                "Seu passado inclui redes marítimas que ligavam a Península Arábica, a África Oriental e o sul da Ásia."
            ],
            [
                "Economia",
                "Petróleo, gás, logística, pesca e turismo são setores relevantes."
            ],
            [
                "Cultura",
                "A tradição do incenso e a halwa omanense aparecem em mercados e cerimônias locais."
            ],
            [
                "Natureza e patrimônio",
                "Os fortes de Nizwa e Bahla ilustram a arquitetura histórica do interior do país."
            ],
            [
                "Capital",
                "Mascate."
            ],
            [
                "Idiomas",
                "O árabe é a língua oficial."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se rial omanense."
            ],
            [
                "Fronteiras",
                "Faz fronteira terrestre com Arábia Saudita, Emirados Árabes Unidos e Iêmen."
            ],
            [
                "Área",
                "O território tem aproximadamente 310.000 km² de área."
            ]
        ]
    },
    {
        "name": "Síria",
        "aliases": [
            "Syria",
            "Syrian Arab Republic"
        ],
        "hints": [
            [
                "Localização",
                "Fica na Ásia Ocidental."
            ],
            [
                "História",
                "Cidades como Damasco e Alepo estiveram em rotas comerciais importantes por muitos séculos."
            ],
            [
                "Economia",
                "Agricultura, têxteis, alimentos e energia tinham papel importante na economia antes do conflito iniciado em 2011."
            ],
            [
                "Cultura",
                "A língua árabe convive com tradições culturais e religiosas diversas; doces e artesanato são marcas locais."
            ],
            [
                "Natureza e patrimônio",
                "Palmira preserva vestígios de uma cidade antiga que foi importante nas rotas entre Mediterrâneo e Ásia."
            ],
            [
                "Capital",
                "Damasco."
            ],
            [
                "Idiomas",
                "O árabe é a língua oficial."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se libra síria."
            ],
            [
                "Fronteiras",
                "Faz fronteira terrestre com Iraque, Israel, Jordânia, Líbano e Turquia."
            ],
            [
                "Área",
                "O território tem aproximadamente 190.000 km² de área."
            ]
        ]
    },
    {
        "name": "Iêmen",
        "aliases": [
            "Yemen",
            "Republic of Yemen"
        ],
        "hints": [
            [
                "Localização",
                "Fica na Ásia Ocidental."
            ],
            [
                "História",
                "O antigo Reino de Sabá esteve ligado às rotas do incenso e a importantes redes comerciais."
            ],
            [
                "Economia",
                "Café, mel, pesca e agricultura tiveram papel histórico, embora a economia moderna tenha enfrentado fortes limitações."
            ],
            [
                "Cultura",
                "A arquitetura de casas-torre e o uso tradicional da adaga jambiya são referências culturais."
            ],
            [
                "Natureza e patrimônio",
                "Socotra abriga espécies endêmicas e paisagens singulares no oceano Índico."
            ],
            [
                "Capital",
                "Saná."
            ],
            [
                "Idiomas",
                "O árabe é a língua oficial."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se rial iemenita."
            ],
            [
                "Fronteiras",
                "Faz fronteira terrestre com Omã e Arábia Saudita."
            ],
            [
                "Área",
                "O território tem aproximadamente 530.000 km² de área."
            ]
        ]
    },
    {
        "name": "Bahrein",
        "aliases": [
            "Bahrain",
            "Kingdom of Bahrain"
        ],
        "hints": [
            [
                "Localização",
                "Fica na Ásia Ocidental."
            ],
            [
                "História",
                "A região é associada à antiga civilização de Dilmun, ativa nas redes comerciais do Golfo."
            ],
            [
                "Economia",
                "Petróleo, refino, serviços financeiros e alumínio são setores relevantes."
            ],
            [
                "Cultura",
                "A pesca de pérolas foi fundamental para a economia e a identidade histórica antes da era do petróleo."
            ],
            [
                "Natureza e patrimônio",
                "O sítio arqueológico de Qal'at al-Bahrain reúne vestígios associados a Dilmun."
            ],
            [
                "Capital",
                "Manama."
            ],
            [
                "Idiomas",
                "O árabe é a língua oficial."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se dinar bareinita."
            ],
            [
                "Fronteiras",
                "Não tem fronteiras terrestres internacionais; seu território é insular ou separado por água de outros países."
            ],
            [
                "Área",
                "O território tem aproximadamente 800 km² de área."
            ]
        ]
    },
    {
        "name": "Palestina",
        "aliases": [
            "State of Palestine",
            "Palestinian Territories",
            "Palestine"
        ],
        "hints": [
            [
                "Localização",
                "Fica na Ásia Ocidental."
            ],
            [
                "História",
                "Cidades como Jericó e Belém têm grande importância na história e nas tradições religiosas do Levante."
            ],
            [
                "Economia",
                "Agricultura, azeite, pedra, serviços e remessas da diáspora contribuem para a economia."
            ],
            [
                "Cultura",
                "O bordado tatreez e pratos como musakhan são expressões importantes do patrimônio cultural palestino."
            ],
            [
                "Natureza e patrimônio",
                "Jericó e a região histórica de Belém contêm sítios arqueológicos e religiosos de relevância internacional."
            ],
            [
                "Moeda",
                "O novo shekel israelense é amplamente utilizado, junto de outras moedas em diferentes contextos."
            ],
            [
                "Fronteiras",
                "Faz fronteira com Israel e tem limites com o Egito e a Jordânia nas áreas reconhecidas em mapas geográficos."
            ],
            [
                "Área",
                "Seu território é composto pela Cisjordânia e pela Faixa de Gaza."
            ],
            [
                "Capital e sede administrativa",
                "Jerusalém Oriental é reivindicada como capital; Ramallah abriga importantes instituições administrativas."
            ],
            [
                "Idiomas",
                "O árabe é a língua oficial."
            ]
        ]
    },
    {
        "name": "Afeganistão",
        "aliases": [
            "Afghanistan",
            "Islamic Republic of Afghanistan"
        ],
        "hints": [
            [
                "Localização",
                "Fica na junção da Ásia Central e Meridional, em um território montanhoso sem acesso ao mar."
            ],
            [
                "História",
                "O território integrou antigas rotas da Rota da Seda entre Ásia Central, Irã e o subcontinente indiano."
            ],
            [
                "Economia",
                "Carpetes, frutas secas, açafrão, agricultura e mineração são setores tradicionais."
            ],
            [
                "Cultura",
                "Dari e pashto são línguas oficiais; a poesia e a música regional têm longa tradição."
            ],
            [
                "Natureza e patrimônio",
                "A cordilheira Hindu Kush atravessa o país e influencia seu clima e suas rotas de transporte."
            ],
            [
                "Capital",
                "Cabul."
            ],
            [
                "Idiomas",
                "Dari e pashto são línguas oficiais; uzbeque, turcomeno e outras línguas são usadas regionalmente."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se afegane."
            ],
            [
                "Fronteiras",
                "Faz fronteira terrestre com países vizinhos de diferentes sub-regiões, incluindo Irã, Paquistão, Turcomenistão, Uzbequistão, Tajiquistão e outros."
            ],
            [
                "Área",
                "O território tem aproximadamente 650.000 km² de área."
            ]
        ]
    },
    {
        "name": "Bangladesh",
        "aliases": [
            "People's Republic of Bangladesh"
        ],
        "hints": [
            [
                "Localização",
                "Fica no Sul da Ásia."
            ],
            [
                "História",
                "Tornou-se independente do Paquistão em 1971, após a Guerra de Libertação."
            ],
            [
                "Economia",
                "A indústria de vestuário, a agricultura, os serviços e as remessas são importantes."
            ],
            [
                "Cultura",
                "O Movimento da Língua Bengali inspirou a escolha do 21 de fevereiro como Dia Internacional da Língua Materna."
            ],
            [
                "Natureza e patrimônio",
                "Os manguezais de Sundarbans, compartilhados com a Índia, são habitat do tigre-de-bengala."
            ],
            [
                "Capital",
                "Daca."
            ],
            [
                "Idiomas",
                "O bengali (bangla) é a língua oficial."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se taka de Bangladesh."
            ],
            [
                "Fronteiras",
                "Faz fronteira terrestre com Índia e Mianmar."
            ],
            [
                "Área",
                "O território tem aproximadamente 150.000 km² de área."
            ]
        ]
    },
    {
        "name": "Butão",
        "aliases": [
            "Bhutan",
            "Kingdom of Bhutan"
        ],
        "hints": [
            [
                "Localização",
                "Fica no Sul da Ásia."
            ],
            [
                "História",
                "Seu conceito de Felicidade Interna Bruta tornou-se uma referência debatida internacionalmente para medir bem-estar além do PIB."
            ],
            [
                "Economia",
                "Hidreletricidade, turismo controlado e agricultura são setores importantes."
            ],
            [
                "Cultura",
                "A arquitetura dzong e as festas budistas com máscaras são características culturais marcantes."
            ],
            [
                "Natureza e patrimônio",
                "O mosteiro Taktsang, conhecido como Ninho do Tigre, está construído em um penhasco dos Himalaias."
            ],
            [
                "Capital",
                "Thimphu."
            ],
            [
                "Idiomas",
                "O dzonga (dzongkha) é a língua oficial."
            ],
            [
                "Moeda",
                "Entre as moedas utilizadas estão Ngultrum butanês e rúpia indiana."
            ],
            [
                "Fronteiras",
                "Faz fronteira terrestre com China e Índia."
            ],
            [
                "Área",
                "O território tem aproximadamente 38.000 km² de área."
            ]
        ]
    },
    {
        "name": "Maldivas",
        "aliases": [
            "Maldives",
            "Republic of Maldives"
        ],
        "hints": [
            [
                "Localização",
                "Fica no Sul da Ásia."
            ],
            [
                "História",
                "O arquipélago desenvolveu comunidades marítimas ligadas às rotas comerciais do oceano Índico."
            ],
            [
                "Economia",
                "Turismo e pesca são os principais setores econômicos."
            ],
            [
                "Cultura",
                "Dhivehi é a língua oficial, e a cultura inclui música e dança tradicionais chamadas bodu beru."
            ],
            [
                "Natureza e patrimônio",
                "O país é formado por atóis de coral baixos, vulneráveis à elevação do nível do mar."
            ],
            [
                "Capital",
                "Malé."
            ],
            [
                "Idiomas",
                "O divehi é a língua oficial."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se rufiyaa maldiva."
            ],
            [
                "Fronteiras",
                "Não tem fronteiras terrestres internacionais; seu território é insular ou separado por água de outros países."
            ],
            [
                "Área",
                "O território tem aproximadamente 300 km² de área."
            ]
        ]
    },
    {
        "name": "Brunei",
        "aliases": [
            "Brunei Darussalam"
        ],
        "hints": [
            [
                "Localização",
                "Fica no Sudeste Asiático."
            ],
            [
                "História",
                "O protetorado britânico terminou em 1984, quando o país alcançou independência plena."
            ],
            [
                "Economia",
                "Petróleo e gás natural formam a base da economia."
            ],
            [
                "Cultura",
                "A monarquia segue o conceito oficial de Monarquia Malaia Islâmica; malaio é a língua oficial."
            ],
            [
                "Natureza e patrimônio",
                "A mesquita Omar Ali Saifuddien é um dos marcos arquitetônicos da capital."
            ],
            [
                "Capital",
                "Bandar Seri Begawan."
            ],
            [
                "Idiomas",
                "O malaio é a língua oficial."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se dólar de Brunei."
            ],
            [
                "Fronteiras",
                "Faz fronteira terrestre com Malásia."
            ],
            [
                "Área",
                "O território tem aproximadamente 5.800 km² de área."
            ]
        ]
    },
    {
        "name": "Camboja",
        "aliases": [
            "Cambodia",
            "Kingdom of Cambodia"
        ],
        "hints": [
            [
                "Localização",
                "Fica no Sudeste Asiático."
            ],
            [
                "História",
                "O Império Khmer construiu Angkor, um dos grandes centros urbanos e religiosos do Sudeste Asiático medieval."
            ],
            [
                "Economia",
                "Vestuário, turismo, arroz e construção têm importância econômica."
            ],
            [
                "Cultura",
                "A dança clássica apsara e as celebrações do Ano-Novo Khmer fazem parte do patrimônio cultural."
            ],
            [
                "Natureza e patrimônio",
                "Angkor Wat é um vasto complexo de templos e símbolo nacional."
            ],
            [
                "Capital",
                "Phnom Penh."
            ],
            [
                "Idiomas",
                "O khmer é a língua oficial."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se riel cambojano."
            ],
            [
                "Fronteiras",
                "Faz fronteira terrestre com Laos, Tailândia e Vietnã."
            ],
            [
                "Área",
                "O território tem aproximadamente 180.000 km² de área."
            ]
        ]
    },
    {
        "name": "Coreia do Norte",
        "aliases": [
            "North Korea",
            "Democratic People's Republic of Korea",
            "DPRK",
            "Korea DPR",
            "Democratic People’s Republic of Korea"
        ],
        "hints": [
            [
                "Localização",
                "Fica na Ásia Oriental."
            ],
            [
                "História",
                "Foi estabelecida como Estado em 1948, após a divisão da península coreana no contexto do pós-guerra."
            ],
            [
                "Economia",
                "A economia é fortemente dirigida pelo Estado, com indústria pesada, mineração e agricultura."
            ],
            [
                "Cultura",
                "A cultura compartilha raízes históricas coreanas, incluindo pratos como kimchi e tradições musicais próprias."
            ],
            [
                "Natureza e patrimônio",
                "A Zona Desmilitarizada separa o país da Coreia do Sul ao longo da península."
            ],
            [
                "Capital",
                "Pyongyang."
            ],
            [
                "Idiomas",
                "O coreano é a língua predominante."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se won norte-coreano."
            ],
            [
                "Fronteiras",
                "Faz fronteira terrestre com China, Coreia do Sul e Rússia."
            ],
            [
                "Área",
                "O território tem aproximadamente 120.000 km² de área."
            ]
        ]
    },
    {
        "name": "Laos",
        "aliases": [
            "Lao People's Democratic Republic"
        ],
        "hints": [
            [
                "Localização",
                "Fica no Sudeste Asiático."
            ],
            [
                "História",
                "O reino de Lan Xang foi um importante Estado histórico do Sudeste Asiático continental."
            ],
            [
                "Economia",
                "Hidreletricidade, mineração, agricultura e turismo são setores relevantes."
            ],
            [
                "Cultura",
                "O arroz glutinoso tem papel central na alimentação, e festas budistas marcam o calendário cultural."
            ],
            [
                "Natureza e patrimônio",
                "A Planície dos Jarros contém milhares de grandes recipientes de pedra de origem antiga."
            ],
            [
                "Capital",
                "Vientiane."
            ],
            [
                "Idiomas",
                "O lao é a língua oficial."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se kip laociano."
            ],
            [
                "Fronteiras",
                "Faz fronteira terrestre com Camboja, China, Mianmar, Tailândia e Vietnã."
            ],
            [
                "Área",
                "O território tem aproximadamente 240.000 km² de área."
            ]
        ]
    },
    {
        "name": "Malásia",
        "aliases": [
            "Malaysia"
        ],
        "hints": [
            [
                "Localização",
                "Fica no Sudeste Asiático."
            ],
            [
                "História",
                "A federação malaia tornou-se independente em 1957, e a Malásia moderna foi formada em 1963."
            ],
            [
                "Economia",
                "Eletrônicos, óleo de palma, petróleo, gás e serviços são setores importantes."
            ],
            [
                "Cultura",
                "A sociedade combina tradições malaias, chinesas, indianas e indígenas; nasi lemak é um prato emblemático."
            ],
            [
                "Natureza e patrimônio",
                "As Torres Petronas e o monte Kinabalu representam contrastes entre urbanização e natureza."
            ],
            [
                "Capital",
                "Kuala Lumpur."
            ],
            [
                "Idiomas",
                "O malaio é a língua oficial; inglês e mandarim também são amplamente utilizados."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se ringgit malaio."
            ],
            [
                "Fronteiras",
                "Faz fronteira terrestre com Brunei, Indonésia e Tailândia."
            ],
            [
                "Área",
                "O território tem aproximadamente 330.000 km² de área."
            ]
        ]
    },
    {
        "name": "Mianmar",
        "aliases": [
            "Myanmar",
            "Republic of the Union of Myanmar",
            "Burma"
        ],
        "hints": [
            [
                "Localização",
                "Fica no Sudeste Asiático, entre o subcontinente indiano e a península da Indochina."
            ],
            [
                "História",
                "Bagan foi centro de um reino medieval que deixou milhares de templos e pagodes."
            ],
            [
                "Economia",
                "Gás natural, agricultura, jade, gemas e têxteis são recursos e setores importantes."
            ],
            [
                "Cultura",
                "Thingyan, o festival de água do Ano-Novo, é uma celebração cultural marcante."
            ],
            [
                "Natureza e patrimônio",
                "O pagode Shwedagon, em Yangon, é um dos locais religiosos mais conhecidos do país."
            ],
            [
                "Capital",
                "Naypyidaw."
            ],
            [
                "Idiomas",
                "O birmanês é a língua oficial, ao lado de muitas línguas étnicas."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se o kyat de Mianmar."
            ],
            [
                "Fronteiras",
                "Faz fronteira terrestre com Bangladesh, China, Índia, Laos e Tailândia."
            ],
            [
                "Área",
                "O território tem aproximadamente 676.000 km² de área."
            ]
        ]
    },
    {
        "name": "Taiwan",
        "aliases": [
            "Republic of China"
        ],
        "hints": [
            [
                "Localização",
                "Fica na Ásia Oriental."
            ],
            [
                "História",
                "A ilha tornou-se um polo central da cadeia global de semicondutores e componentes eletrônicos."
            ],
            [
                "Economia",
                "Semicondutores, eletrônica, máquinas e exportações industriais são fundamentais para a economia."
            ],
            [
                "Cultura",
                "Mercados noturnos, chá e pratos como beef noodle soup são referências culinárias; mandarim é amplamente usado."
            ],
            [
                "Natureza e patrimônio",
                "Taipei 101 foi por um período o edifício mais alto do mundo e continua sendo um marco urbano."
            ],
            [
                "Capital",
                "Taipei."
            ],
            [
                "Idiomas",
                "O mandarim é amplamente usado; outras línguas nacionais incluem taiwanês hóclo, hakka e línguas indígenas."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se novo dólar taiwanês."
            ],
            [
                "Fronteiras",
                "Não tem fronteiras terrestres internacionais; seu território é insular ou separado por água de outros países."
            ],
            [
                "Área",
                "O território tem aproximadamente 36.000 km² de área."
            ]
        ]
    },
    {
        "name": "Quirguistão",
        "aliases": [
            "Kyrgyzstan",
            "Kyrgyz Republic"
        ],
        "hints": [
            [
                "Localização",
                "Fica na Ásia Central."
            ],
            [
                "História",
                "As rotas comerciais da Rota da Seda atravessavam o território montanhoso da Ásia Central."
            ],
            [
                "Economia",
                "Ouro, agricultura, pecuária e remessas são setores relevantes."
            ],
            [
                "Cultura",
                "A tradição nômade aparece em yurts, jogos equestres e no épico oral Manas."
            ],
            [
                "Natureza e patrimônio",
                "O lago Issyk-Kul é um grande lago de montanha cercado pelas cordilheiras Tian Shan."
            ],
            [
                "Capital",
                "Bisqueque."
            ],
            [
                "Idiomas",
                "Quirguiz é a língua estatal e russo também tem status oficial."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se som quirguiz."
            ],
            [
                "Fronteiras",
                "Faz fronteira terrestre com China, Cazaquistão, Tajiquistão e Uzbequistão."
            ],
            [
                "Área",
                "O território tem aproximadamente 200.000 km² de área."
            ]
        ]
    },
    {
        "name": "Tajiquistão",
        "aliases": [
            "Tajikistan",
            "Republic of Tajikistan"
        ],
        "hints": [
            [
                "Localização",
                "Fica na Ásia Central."
            ],
            [
                "História",
                "O território integra rotas históricas da Ásia Central e tornou-se independente em 1991."
            ],
            [
                "Economia",
                "Hidreletricidade, alumínio, algodão e remessas têm papel econômico."
            ],
            [
                "Cultura",
                "O tajique é uma língua persa; o Nowruz e o artesanato bordado são tradições importantes."
            ],
            [
                "Natureza e patrimônio",
                "As montanhas Pamir ocupam grande parte do leste e estão entre as regiões de alta montanha do mundo."
            ],
            [
                "Capital",
                "Duchambé."
            ],
            [
                "Idiomas",
                "O tajique é a língua estatal; o russo é usado como língua de comunicação interétnica."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se somoni tajique."
            ],
            [
                "Fronteiras",
                "Faz fronteira terrestre com Afeganistão, China, Quirguistão e Uzbequistão."
            ],
            [
                "Área",
                "O território tem aproximadamente 140.000 km² de área."
            ]
        ]
    },
    {
        "name": "Turcomenistão",
        "aliases": [
            "Turkmenistan"
        ],
        "hints": [
            [
                "Localização",
                "Fica na Ásia Central."
            ],
            [
                "História",
                "Tornou-se independente da União Soviética em 1991."
            ],
            [
                "Economia",
                "As grandes reservas de gás natural são centrais para suas exportações."
            ],
            [
                "Cultura",
                "Tapetes turcomenos e cavalos Akhal-Teke são símbolos tradicionais do país."
            ],
            [
                "Natureza e patrimônio",
                "O deserto de Karakum cobre boa parte do território e molda sua paisagem."
            ],
            [
                "Capital",
                "Asgabate."
            ],
            [
                "Idiomas",
                "O turcomeno é a língua oficial."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se manat turcomeno."
            ],
            [
                "Fronteiras",
                "Faz fronteira terrestre com Afeganistão, Irã, Cazaquistão e Uzbequistão."
            ],
            [
                "Área",
                "O território tem aproximadamente 490.000 km² de área."
            ]
        ]
    },
    {
        "name": "Uzbequistão",
        "aliases": [
            "Uzbekistan",
            "Republic of Uzbekistan"
        ],
        "hints": [
            [
                "Localização",
                "Fica na Ásia Central."
            ],
            [
                "História",
                "Samarkand, Bukhara e Khiva foram centros importantes da Rota da Seda."
            ],
            [
                "Economia",
                "Ouro, gás, algodão, têxteis e serviços têm peso na economia."
            ],
            [
                "Cultura",
                "O plov é um prato tradicional de arroz; artesanato cerâmico e tecidos ikat são reconhecidos."
            ],
            [
                "Natureza e patrimônio",
                "A praça Registan, em Samarcanda, reúne madraças históricas de grande valor arquitetônico."
            ],
            [
                "Capital",
                "Tashkent."
            ],
            [
                "Idiomas",
                "O uzbeque é a língua oficial."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se som uzbeque."
            ],
            [
                "Fronteiras",
                "Faz fronteira terrestre com Afeganistão, Cazaquistão, Quirguistão, Tajiquistão e Turcomenistão."
            ],
            [
                "Área",
                "O território tem aproximadamente 450.000 km² de área."
            ]
        ]
    },
    {
        "name": "Timor-Leste",
        "aliases": [
            "East Timor",
            "Democratic Republic of Timor-Leste"
        ],
        "hints": [
            [
                "Localização",
                "Fica no Sudeste Asiático, na metade oriental da ilha de Timor."
            ],
            [
                "História",
                "Restaurou sua independência em 2002, após um período de administração internacional."
            ],
            [
                "Economia",
                "Petróleo e gás tiveram papel fiscal importante; café e agricultura também são relevantes."
            ],
            [
                "Cultura",
                "Tétum e português são línguas oficiais; o tais é um tecido tradicional."
            ],
            [
                "Natureza e patrimônio",
                "A ilha de Ataúro e seus recifes são conhecidos pela biodiversidade marinha."
            ],
            [
                "Capital",
                "Díli."
            ],
            [
                "Idiomas",
                "Tétum e português são línguas oficiais."
            ],
            [
                "Moeda",
                "O dólar americano é utilizado como moeda oficial."
            ],
            [
                "Fronteiras",
                "Compartilha fronteira terrestre com a Indonésia; o restante do território é cercado pelo mar."
            ],
            [
                "Área",
                "O território tem aproximadamente 15.000 km² de área."
            ]
        ]
    },
    {
        "name": "Angola",
        "aliases": [
            "Republic of Angola"
        ],
        "hints": [
            [
                "Localização",
                "Fica na África Central."
            ],
            [
                "História",
                "A independência de Portugal foi proclamada em 1975, após uma guerra de libertação."
            ],
            [
                "Economia",
                "Petróleo, diamantes, agricultura e pesca são setores relevantes."
            ],
            [
                "Cultura",
                "Semba e kizomba são estilos musicais associados ao país e à região lusófona africana."
            ],
            [
                "Natureza e patrimônio",
                "As quedas de Kalandula estão entre as maiores cachoeiras de África em largura e volume sazonal."
            ],
            [
                "Capital",
                "Luanda."
            ],
            [
                "Idiomas",
                "O português é a língua oficial, junto de muitas línguas nacionais."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se kwanza angolano."
            ],
            [
                "Fronteiras",
                "Faz fronteira terrestre com República do Congo, República Democrática do Congo, Zâmbia e Namíbia."
            ],
            [
                "Área",
                "O território tem aproximadamente 1.200.000 km² de área."
            ]
        ]
    },
    {
        "name": "Botsuana",
        "aliases": [
            "Botswana",
            "Republic of Botswana"
        ],
        "hints": [
            [
                "Localização",
                "Fica na África Austral."
            ],
            [
                "História",
                "Tornou-se independente do Reino Unido em 1966 e desenvolveu instituições democráticas estáveis após a independência."
            ],
            [
                "Economia",
                "Diamantes, turismo de natureza e pecuária são importantes para a economia."
            ],
            [
                "Cultura",
                "A língua setswana e a criação de gado têm lugar importante na cultura nacional."
            ],
            [
                "Natureza e patrimônio",
                "O delta do Okavango forma um extenso sistema de áreas úmidas no interior do continente."
            ],
            [
                "Capital",
                "Gaborone."
            ],
            [
                "Idiomas",
                "O inglês é a língua oficial e setswana é a língua nacional mais difundida."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se pula botsuanesa."
            ],
            [
                "Fronteiras",
                "Faz fronteira terrestre com Namíbia, África do Sul, Zâmbia e Zimbábue."
            ],
            [
                "Área",
                "O território tem aproximadamente 580.000 km² de área."
            ]
        ]
    },
    {
        "name": "Burkina Faso",
        "aliases": [],
        "hints": [
            [
                "Localização",
                "Fica na África Ocidental."
            ],
            [
                "História",
                "Tornou-se independente da França em 1960."
            ],
            [
                "Economia",
                "Ouro e algodão são setores importantes da economia."
            ],
            [
                "Cultura",
                "O festival de cinema FESPACO, em Ouagadougou, é um dos eventos cinematográficos mais conhecidos de África."
            ],
            [
                "Natureza e patrimônio",
                "As formações rochosas de Sindou são uma paisagem natural marcante do oeste do país."
            ],
            [
                "Capital",
                "Ouagadougou."
            ],
            [
                "Idiomas",
                "O país reconhece várias línguas nacionais; mooré, diúla e fula estão entre as mais faladas."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se franco CFA da África Ocidental."
            ],
            [
                "Fronteiras",
                "Faz fronteira terrestre com países vizinhos de diferentes sub-regiões, incluindo Benim, Costa do Marfim, Gana, Mali, Níger e outros."
            ],
            [
                "Área",
                "O território tem aproximadamente 270.000 km² de área."
            ]
        ]
    },
    {
        "name": "Camarões",
        "aliases": [
            "Cameroon",
            "Republic of Cameroon"
        ],
        "hints": [
            [
                "Localização",
                "Fica na África Central."
            ],
            [
                "História",
                "O país reúne regiões de herança colonial francesa e britânica, refletidas em suas línguas oficiais."
            ],
            [
                "Economia",
                "Petróleo, cacau, café, madeira, agricultura e serviços têm importância econômica."
            ],
            [
                "Cultura",
                "Mais de 200 línguas locais são faladas; música makossa e pratos como ndolé são conhecidos."
            ],
            [
                "Natureza e patrimônio",
                "O monte Camarões é um vulcão ativo próximo à costa do golfo da Guiné."
            ],
            [
                "Capital",
                "Yaoundé."
            ],
            [
                "Idiomas",
                "Francês e inglês são línguas oficiais."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se franco CFA da África Central."
            ],
            [
                "Fronteiras",
                "Faz fronteira terrestre com países vizinhos de diferentes sub-regiões, incluindo República Centro-Africana, Chade, República do Congo, Guiné Equatorial, Gabão e outros."
            ],
            [
                "Área",
                "O território tem aproximadamente 480.000 km² de área."
            ]
        ]
    },
    {
        "name": "Costa do Marfim",
        "aliases": [
            "Ivory Coast",
            "Côte d'Ivoire",
            "Republic of Côte d'Ivoire",
            "Côte d’Ivoire"
        ],
        "hints": [
            [
                "Localização",
                "Fica na África Ocidental."
            ],
            [
                "História",
                "Tornou-se independente da França em 1960."
            ],
            [
                "Economia",
                "É o maior produtor mundial de cacau em muitos anos, e café, castanha de caju e petróleo também são relevantes."
            ],
            [
                "Cultura",
                "A cena musical inclui zouglou e coupé-décalé, enquanto as cozinhas regionais variam bastante."
            ],
            [
                "Natureza e patrimônio",
                "A Basílica de Nossa Senhora da Paz, em Yamoussoukro, está entre as maiores igrejas do mundo."
            ],
            [
                "Capital",
                "Yamoussoukro."
            ],
            [
                "Idiomas",
                "O francês é a língua oficial; dezenas de línguas locais são faladas."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se franco CFA da África Ocidental."
            ],
            [
                "Fronteiras",
                "Faz fronteira terrestre com Burkina Faso, Gana, Guiné, Libéria e Mali."
            ],
            [
                "Área",
                "O território tem aproximadamente 320.000 km² de área."
            ]
        ]
    },
    {
        "name": "República Democrática do Congo",
        "aliases": [
            "Democratic Republic of the Congo",
            "DR Congo",
            "Congo-Kinshasa"
        ],
        "hints": [
            [
                "Localização",
                "Fica na África Central."
            ],
            [
                "História",
                "O território inclui a bacia do antigo Reino do Congo e tornou-se independente da Bélgica em 1960."
            ],
            [
                "Economia",
                "Cobre, cobalto, ouro, diamantes e outros minerais têm importância global, especialmente para baterias e eletrônica."
            ],
            [
                "Cultura",
                "A rumba congolesa influenciou a música de várias partes da África e foi reconhecida pela UNESCO."
            ],
            [
                "Natureza e patrimônio",
                "O Parque Nacional de Virunga protege vulcões, florestas e habitats de gorilas-das-montanhas."
            ],
            [
                "Capital",
                "Kinshasa."
            ],
            [
                "Idiomas",
                "O francês é oficial; lingala, suaíli, kikongo e tshiluba são línguas nacionais."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se franco congolês."
            ],
            [
                "Fronteiras",
                "Faz fronteira terrestre com países vizinhos de diferentes sub-regiões, incluindo Angola, Burundi, República Centro-Africana, República do Congo, Ruanda e outros."
            ],
            [
                "Área",
                "O território tem aproximadamente 2.300.000 km² de área."
            ]
        ]
    },
    {
        "name": "Madagascar",
        "aliases": [
            "Republic of Madagascar"
        ],
        "hints": [
            [
                "Localização",
                "Fica na África Oriental."
            ],
            [
                "História",
                "A ilha ficou isolada de outros grandes territórios por milhões de anos, permitindo a evolução de espécies endêmicas."
            ],
            [
                "Economia",
                "Baunilha, cravo, níquel, pesca e turismo são setores importantes."
            ],
            [
                "Cultura",
                "A cultura malgaxe combina influências africanas e austronésias, com música e cerimônias próprias."
            ],
            [
                "Natureza e patrimônio",
                "Lêmures e os baobás da ilha são símbolos de uma biodiversidade única."
            ],
            [
                "Capital",
                "Antananarivo."
            ],
            [
                "Idiomas",
                "Malgaxe e francês são línguas oficiais."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se ariary malgaxe."
            ],
            [
                "Fronteiras",
                "Não tem fronteiras terrestres internacionais; seu território é insular ou separado por água de outros países."
            ],
            [
                "Área",
                "O território tem aproximadamente 590.000 km² de área."
            ]
        ]
    },
    {
        "name": "Mali",
        "aliases": [
            "Republic of Mali"
        ],
        "hints": [
            [
                "Localização",
                "Fica na África Ocidental."
            ],
            [
                "História",
                "O Império do Mali, associado a Mansa Musa, tornou Timbuktu um centro histórico de comércio e estudos."
            ],
            [
                "Economia",
                "Ouro, algodão, pecuária e agricultura são relevantes para a economia."
            ],
            [
                "Cultura",
                "A tradição dos griots — músicos e guardiões de narrativas orais — continua importante."
            ],
            [
                "Natureza e patrimônio",
                "Timbuktu e a cidade histórica de Djenné conservam construções de terra e herança da região do Sahel."
            ],
            [
                "Capital",
                "Bamako."
            ],
            [
                "Idiomas",
                "Várias línguas nacionais, incluindo bambara, fulfulde e soninquê, têm status oficial; francês é língua de trabalho."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se franco CFA da África Ocidental."
            ],
            [
                "Fronteiras",
                "Faz fronteira terrestre com países vizinhos de diferentes sub-regiões, incluindo Argélia, Burkina Faso, Guiné, Costa do Marfim, Mauritânia e outros."
            ],
            [
                "Área",
                "O território tem aproximadamente 1.200.000 km² de área."
            ]
        ]
    },
    {
        "name": "Moçambique",
        "aliases": [
            "Mozambique",
            "Republic of Mozambique"
        ],
        "hints": [
            [
                "Localização",
                "Fica na África Oriental."
            ],
            [
                "História",
                "Tornou-se independente de Portugal em 1975."
            ],
            [
                "Economia",
                "Alumínio, carvão, agricultura, gás natural e pesca são setores relevantes."
            ],
            [
                "Cultura",
                "O português é oficial; a marrabenta e a capulana têm destaque na cultura local."
            ],
            [
                "Natureza e patrimônio",
                "O Parque Nacional da Gorongosa e o arquipélago das Quirimbas reúnem paisagens e biodiversidade diversas."
            ],
            [
                "Capital",
                "Maputo."
            ],
            [
                "Idiomas",
                "O português é a língua oficial, além de numerosas línguas nacionais."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se metical moçambicano."
            ],
            [
                "Fronteiras",
                "Faz fronteira terrestre com África do Sul, Essuatíni, Malawi, Tanzânia, Zâmbia e Zimbábue."
            ],
            [
                "Área",
                "O território tem aproximadamente 800.000 km² de área."
            ]
        ]
    },
    {
        "name": "Namíbia",
        "aliases": [
            "Namibia",
            "Republic of Namibia"
        ],
        "hints": [
            [
                "Localização",
                "Fica na África Austral."
            ],
            [
                "História",
                "Tornou-se independente da África do Sul em 1990."
            ],
            [
                "Economia",
                "Urânio, diamantes, pesca, mineração e turismo de natureza são importantes."
            ],
            [
                "Cultura",
                "As comunidades himba e san mantêm tradições culturais distintas e adaptadas a ambientes áridos."
            ],
            [
                "Natureza e patrimônio",
                "O deserto do Namibe, com dunas em Sossusvlei, é uma das paisagens mais emblemáticas do país."
            ],
            [
                "Capital",
                "Windhoek."
            ],
            [
                "Idiomas",
                "O inglês é a língua oficial; oshiwambo, nama/damara e africâner também são usados amplamente."
            ],
            [
                "Moeda",
                "Entre as moedas utilizadas estão dólar namibiano e rand sul-africano."
            ],
            [
                "Fronteiras",
                "Faz fronteira terrestre com Angola, Botsuana, África do Sul e Zâmbia."
            ],
            [
                "Área",
                "O território tem aproximadamente 830.000 km² de área."
            ]
        ]
    },
    {
        "name": "Níger",
        "aliases": [
            "Niger",
            "Republic of the Niger"
        ],
        "hints": [
            [
                "Localização",
                "Fica na África Ocidental."
            ],
            [
                "História",
                "Grande parte do território integra o Sahel e o Saara, com longas rotas históricas de comércio transaariano."
            ],
            [
                "Economia",
                "Urânio, pecuária, agricultura e comércio são setores relevantes."
            ],
            [
                "Cultura",
                "Hauçá e zarma estão entre as línguas amplamente faladas, ao lado do francês oficial."
            ],
            [
                "Natureza e patrimônio",
                "As montanhas Aïr e o deserto de Ténéré formam paisagens extensas e pouco povoadas."
            ],
            [
                "Capital",
                "Niamey."
            ],
            [
                "Idiomas",
                "Hauçá é amplamente falado, junto de zarma e outras línguas nacionais."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se franco CFA da África Ocidental."
            ],
            [
                "Fronteiras",
                "Faz fronteira terrestre com países vizinhos de diferentes sub-regiões, incluindo Argélia, Benim, Burkina Faso, Chade, Líbia e outros."
            ],
            [
                "Área",
                "O território tem aproximadamente 1.300.000 km² de área."
            ]
        ]
    },
    {
        "name": "Ruanda",
        "aliases": [
            "Rwanda",
            "Republic of Rwanda"
        ],
        "hints": [
            [
                "Localização",
                "Fica na África Oriental."
            ],
            [
                "História",
                "O genocídio de 1994 é um marco doloroso da história recente; o país mantém políticas de memória e reconstrução."
            ],
            [
                "Economia",
                "Café, chá, serviços e turismo de natureza são setores importantes."
            ],
            [
                "Cultura",
                "Kinyarwanda, inglês, francês e suaíli têm status oficial; tecidos e danças tradicionais fazem parte da vida cultural."
            ],
            [
                "Natureza e patrimônio",
                "O Parque Nacional dos Vulcões protege habitats de gorilas-das-montanhas."
            ],
            [
                "Capital",
                "Kigali."
            ],
            [
                "Idiomas",
                "Kinyarwanda, inglês, francês e suaíli são línguas oficiais."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se franco ruandês."
            ],
            [
                "Fronteiras",
                "Faz fronteira terrestre com Burundi, República Democrática do Congo, Tanzânia e Uganda."
            ],
            [
                "Área",
                "O território tem aproximadamente 26.000 km² de área."
            ]
        ]
    },
    {
        "name": "Senegal",
        "aliases": [
            "Republic of Senegal"
        ],
        "hints": [
            [
                "Localização",
                "Fica na África Ocidental."
            ],
            [
                "História",
                "Tornou-se independente da França em 1960."
            ],
            [
                "Economia",
                "Pesca, amendoim, fosfatos, turismo e serviços são relevantes para a economia."
            ],
            [
                "Cultura",
                "A língua wolof é amplamente usada, e o mbalax é um gênero musical popular."
            ],
            [
                "Natureza e patrimônio",
                "A ilha de Gorée preserva locais importantes para a memória do comércio atlântico de escravizados."
            ],
            [
                "Capital",
                "Dakar."
            ],
            [
                "Idiomas",
                "O francês é a língua oficial; wolof é amplamente utilizado."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se franco CFA da África Ocidental."
            ],
            [
                "Fronteiras",
                "Faz fronteira terrestre com Gâmbia, Guiné, Guiné-Bissau, Mali e Mauritânia."
            ],
            [
                "Área",
                "O território tem aproximadamente 200.000 km² de área."
            ]
        ]
    },
    {
        "name": "Tanzânia",
        "aliases": [
            "Tanzania",
            "United Republic of Tanzania"
        ],
        "hints": [
            [
                "Localização",
                "Fica na África Oriental."
            ],
            [
                "História",
                "A união de Tanganica e Zanzibar em 1964 formou o país atual."
            ],
            [
                "Economia",
                "Agricultura, ouro, turismo e mineração são setores relevantes."
            ],
            [
                "Cultura",
                "O suaíli é uma língua de união nacional e a cultura costeira suaíli tem longa tradição comercial."
            ],
            [
                "Natureza e patrimônio",
                "O monte Kilimanjaro é o pico mais alto de África, e o Serengeti é famoso por sua vida selvagem."
            ],
            [
                "Capital",
                "Dodoma."
            ],
            [
                "Idiomas",
                "Suaíli é a língua nacional; inglês é usado em vários contextos oficiais e educacionais."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se xelim tanzaniano."
            ],
            [
                "Fronteiras",
                "Faz fronteira terrestre com países vizinhos de diferentes sub-regiões, incluindo Burundi, República Democrática do Congo, Quênia, Malawi, Moçambique e outros."
            ],
            [
                "Área",
                "O território tem aproximadamente 950.000 km² de área."
            ]
        ]
    },
    {
        "name": "Uganda",
        "aliases": [
            "Republic of Uganda"
        ],
        "hints": [
            [
                "Localização",
                "Fica na África Oriental."
            ],
            [
                "História",
                "O território possui antigos reinos, incluindo Buganda, antes da independência em 1962."
            ],
            [
                "Economia",
                "Café, chá, pesca, agricultura e turismo têm importância econômica."
            ],
            [
                "Cultura",
                "Luganda e inglês são amplamente usados; música e danças variam entre os diferentes povos."
            ],
            [
                "Natureza e patrimônio",
                "O país abriga parte do lago Vitória e fontes do Nilo, além de habitats de gorilas e chimpanzés."
            ],
            [
                "Capital",
                "Kampala."
            ],
            [
                "Idiomas",
                "Inglês e suaíli são línguas oficiais; luganda é amplamente utilizada."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se xelim ugandês."
            ],
            [
                "Fronteiras",
                "Faz fronteira terrestre com República Democrática do Congo, Quênia, Ruanda, Sudão do Sul e Tanzânia."
            ],
            [
                "Área",
                "O território tem aproximadamente 240.000 km² de área."
            ]
        ]
    },
    {
        "name": "Zâmbia",
        "aliases": [
            "Zambia",
            "Republic of Zambia"
        ],
        "hints": [
            [
                "Localização",
                "Fica na África Oriental."
            ],
            [
                "História",
                "Tornou-se independente do Reino Unido em 1964."
            ],
            [
                "Economia",
                "O cobre é um dos principais produtos de exportação, junto de agricultura e energia."
            ],
            [
                "Cultura",
                "Bemba e nyanja estão entre as línguas locais mais usadas; a música kalindula é conhecida."
            ],
            [
                "Natureza e patrimônio",
                "As Cataratas Vitória ficam no rio Zambeze, na fronteira com o Zimbábue."
            ],
            [
                "Capital",
                "Lusaka."
            ],
            [
                "Idiomas",
                "O inglês é a língua oficial; bemba e nyanja estão entre as línguas mais faladas."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se Cuacha zambiano (1968–2012)."
            ],
            [
                "Fronteiras",
                "Faz fronteira terrestre com países vizinhos de diferentes sub-regiões, incluindo Angola, Botsuana, República Democrática do Congo, Malawi, Moçambique e outros."
            ],
            [
                "Área",
                "O território tem aproximadamente 750.000 km² de área."
            ]
        ]
    },
    {
        "name": "Zimbábue",
        "aliases": [
            "Zimbabwe",
            "Republic of Zimbabwe"
        ],
        "hints": [
            [
                "Localização",
                "Fica na África Oriental."
            ],
            [
                "História",
                "O nome atual faz referência às ruínas de Grande Zimbábue, centro de um Estado medieval."
            ],
            [
                "Economia",
                "Ouro, platina, tabaco, agricultura e mineração são setores importantes."
            ],
            [
                "Cultura",
                "A escultura shona em pedra é uma forma artística de projeção internacional."
            ],
            [
                "Natureza e patrimônio",
                "As Cataratas Vitória, compartilhadas com a Zâmbia, estão entre as grandes atrações naturais da região."
            ],
            [
                "Capital",
                "Harare."
            ],
            [
                "Idiomas",
                "O país reconhece 16 línguas oficiais, incluindo inglês, xona e ndebele."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se dólar americano."
            ],
            [
                "Fronteiras",
                "Faz fronteira terrestre com Botsuana, Moçambique, África do Sul e Zâmbia."
            ],
            [
                "Área",
                "O território tem aproximadamente 390.000 km² de área."
            ]
        ]
    },
    {
        "name": "Fiji",
        "aliases": [
            "Republic of Fiji"
        ],
        "hints": [
            [
                "Localização",
                "Fica na região da Melanésia."
            ],
            [
                "História",
                "Tornou-se independente do Reino Unido em 1970."
            ],
            [
                "Economia",
                "Turismo, açúcar, água engarrafada, pesca e serviços são setores importantes."
            ],
            [
                "Cultura",
                "A cultura iTaukei e as comunidades indo-fijianas contribuem para uma sociedade multicultural."
            ],
            [
                "Natureza e patrimônio",
                "Recifes de coral e ilhas como as Mamanucas são conhecidos pelo mergulho e pelas praias."
            ],
            [
                "Capital",
                "Suva."
            ],
            [
                "Idiomas",
                "Inglês, fijiano e hindi fijiano são línguas oficiais."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se dólar fijiano."
            ],
            [
                "Fronteiras",
                "Não tem fronteiras terrestres internacionais; seu território é insular ou separado por água de outros países."
            ],
            [
                "Área",
                "O território tem aproximadamente 18.000 km² de área."
            ]
        ]
    },
    {
        "name": "Papua-Nova Guiné",
        "aliases": [
            "Papua New Guinea",
            "PNG"
        ],
        "hints": [
            [
                "Localização",
                "Fica na região da Melanésia."
            ],
            [
                "História",
                "A independência da Austrália foi alcançada em 1975."
            ],
            [
                "Economia",
                "Gás natural liquefeito, ouro, cobre, café e cacau são importantes para as exportações."
            ],
            [
                "Cultura",
                "Mais de 800 línguas são faladas, uma das maiores diversidades linguísticas do mundo."
            ],
            [
                "Natureza e patrimônio",
                "Montanhas altas, florestas tropicais e grande biodiversidade cobrem a ilha da Nova Guiné."
            ],
            [
                "Capital",
                "Port Moresby."
            ],
            [
                "Idiomas",
                "Inglês, tok pisin e hiri motu são oficiais; mais de 800 línguas são faladas."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se kina da Papua-Nova Guiné."
            ],
            [
                "Fronteiras",
                "Faz fronteira terrestre com Indonésia."
            ],
            [
                "Área",
                "O território tem aproximadamente 460.000 km² de área."
            ]
        ]
    },
    {
        "name": "Ilhas Salomão",
        "aliases": [
            "Solomon Islands"
        ],
        "hints": [
            [
                "Localização",
                "Fica na região da Melanésia."
            ],
            [
                "História",
                "Tornaram-se independentes do Reino Unido em 1978."
            ],
            [
                "Economia",
                "Pesca, madeira, cacau e copra são setores importantes."
            ],
            [
                "Cultura",
                "Línguas melanésias convivem com o pijin das Ilhas Salomão e o inglês oficial."
            ],
            [
                "Natureza e patrimônio",
                "Guadalcanal é conhecida por importantes batalhas da Segunda Guerra Mundial no Pacífico."
            ],
            [
                "Capital",
                "Honiara."
            ],
            [
                "Idiomas",
                "O inglês é oficial e o pijin das Ilhas Salomão é amplamente utilizado."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se dólar das Ilhas Salomão."
            ],
            [
                "Fronteiras",
                "Não tem fronteiras terrestres internacionais; seu território é insular ou separado por água de outros países."
            ],
            [
                "Área",
                "O território tem aproximadamente 29.000 km² de área."
            ]
        ]
    },
    {
        "name": "Vanuatu",
        "aliases": [
            "Republic of Vanuatu"
        ],
        "hints": [
            [
                "Localização",
                "Fica na região da Melanésia."
            ],
            [
                "História",
                "Tornou-se independente em 1980, após administração conjunta britânica e francesa."
            ],
            [
                "Economia",
                "Agricultura, turismo, pesca e serviços têm importância econômica."
            ],
            [
                "Cultura",
                "Bislama, inglês e francês são línguas oficiais; cerimônias tradicionais continuam fortes em várias ilhas."
            ],
            [
                "Natureza e patrimônio",
                "O vulcão Yasur, na ilha de Tanna, é conhecido por sua atividade vulcânica visível."
            ],
            [
                "Capital",
                "Port Vila."
            ],
            [
                "Idiomas",
                "Bislama, inglês e francês são línguas oficiais."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se vatu de Vanuatu."
            ],
            [
                "Fronteiras",
                "Não tem fronteiras terrestres internacionais; seu território é insular ou separado por água de outros países."
            ],
            [
                "Área",
                "O território tem aproximadamente 12.000 km² de área."
            ]
        ]
    },
    {
        "name": "Samoa",
        "aliases": [
            "Independent State of Samoa"
        ],
        "hints": [
            [
                "Localização",
                "Fica na região da Polinésia."
            ],
            [
                "História",
                "Tornou-se independente da Nova Zelândia em 1962."
            ],
            [
                "Economia",
                "Agricultura, remessas e turismo são componentes importantes da economia."
            ],
            [
                "Cultura",
                "O fa'a Samoa, conjunto de normas comunitárias e familiares, permanece central na identidade local."
            ],
            [
                "Natureza e patrimônio",
                "A fossa oceânica To Sua forma uma piscina natural cercada por vegetação tropical."
            ],
            [
                "Capital",
                "Apia."
            ],
            [
                "Idiomas",
                "Samoano e inglês são línguas oficiais."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se tala samoana."
            ],
            [
                "Fronteiras",
                "Não tem fronteiras terrestres internacionais; seu território é insular ou separado por água de outros países."
            ],
            [
                "Área",
                "O território tem aproximadamente 2.800 km² de área."
            ]
        ]
    },
    {
        "name": "Tonga",
        "aliases": [
            "Kingdom of Tonga"
        ],
        "hints": [
            [
                "Localização",
                "Fica na região da Polinésia."
            ],
            [
                "História",
                "É uma monarquia polinésia que manteve instituições próprias durante a era colonial e tornou-se totalmente independente em 1970."
            ],
            [
                "Economia",
                "Agricultura, pesca, turismo e remessas sustentam a economia."
            ],
            [
                "Cultura",
                "A língua tonganesa, as danças e os tecidos tapa têm grande valor cultural."
            ],
            [
                "Natureza e patrimônio",
                "Os respiradouros costeiros de Mapu'a 'a Vaea lançam água do mar em jatos impressionantes."
            ],
            [
                "Capital",
                "Nukuʻalofa."
            ],
            [
                "Idiomas",
                "Tonganês e inglês são línguas oficiais."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se paʻanga tonganesa."
            ],
            [
                "Fronteiras",
                "Não tem fronteiras terrestres internacionais; seu território é insular ou separado por água de outros países."
            ],
            [
                "Área",
                "O território tem aproximadamente 700 km² de área."
            ]
        ]
    },
    {
        "name": "Kiribati",
        "aliases": [
            "Republic of Kiribati"
        ],
        "hints": [
            [
                "Localização",
                "Fica na região da Micronésia."
            ],
            [
                "História",
                "O país é formado por atóis dispersos que atravessam o equador e se estendem por grande parte do Pacífico central."
            ],
            [
                "Economia",
                "Licenças de pesca, copra, serviços e apoio internacional são fontes importantes de receita."
            ],
            [
                "Cultura",
                "A língua gilbertina e a dança tradicional te mwaie fazem parte do patrimônio cultural."
            ],
            [
                "Natureza e patrimônio",
                "A Área Protegida das Ilhas Phoenix abrange um vasto ecossistema marinho."
            ],
            [
                "Capital",
                "South Tarawa."
            ],
            [
                "Idiomas",
                "Gilbertês (i-Kiribati) e inglês são línguas oficiais."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se dólar australiano."
            ],
            [
                "Fronteiras",
                "Não tem fronteiras terrestres internacionais; seu território é insular ou separado por água de outros países."
            ],
            [
                "Área",
                "O território tem aproximadamente 800 km² de área."
            ]
        ]
    },
    {
        "name": "Micronésia",
        "aliases": [
            "Micronesia",
            "Federated States of Micronesia"
        ],
        "hints": [
            [
                "Localização",
                "Fica na região da Micronésia."
            ],
            [
                "História",
                "Os Estados Federados da Micronésia tornaram-se independentes em associação livre com os Estados Unidos em 1986."
            ],
            [
                "Economia",
                "Pesca, agricultura, serviços públicos e apoio financeiro em associação são importantes para a economia."
            ],
            [
                "Cultura",
                "O país reúne muitas línguas e tradições insulares distintas em quatro estados."
            ],
            [
                "Natureza e patrimônio",
                "Nan Madol, em Pohnpei, é um sítio arqueológico construído sobre ilhotas artificiais."
            ],
            [
                "Capital",
                "Palikir."
            ],
            [
                "Idiomas",
                "O inglês é oficial, ao lado de línguas locais como chuukês, pohnpeiano, kosraeano e yapês."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se dólar americano."
            ],
            [
                "Fronteiras",
                "Não tem fronteiras terrestres internacionais; seu território é insular ou separado por água de outros países."
            ],
            [
                "Área",
                "O território tem aproximadamente 700 km² de área."
            ]
        ]
    },
    {
        "name": "Ilhas Marshall",
        "aliases": [
            "Marshall Islands",
            "Republic of the Marshall Islands"
        ],
        "hints": [
            [
                "Localização",
                "Fica na região da Micronésia."
            ],
            [
                "História",
                "Os atóis foram administrados pelos Estados Unidos após a Segunda Guerra Mundial e o país tornou-se independente em associação livre em 1986."
            ],
            [
                "Economia",
                "Pesca, serviços, copra e apoio financeiro internacional são importantes para a economia."
            ],
            [
                "Cultura",
                "A navegação tradicional utilizava mapas de varetas para representar ondas e correntes oceânicas."
            ],
            [
                "Natureza e patrimônio",
                "O território é formado por atóis de coral muito baixos, incluindo os de Majuro e Kwajalein."
            ],
            [
                "Capital",
                "Majuro."
            ],
            [
                "Idiomas",
                "Marshalês e inglês são línguas oficiais."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se dólar americano."
            ],
            [
                "Fronteiras",
                "Não tem fronteiras terrestres internacionais; seu território é insular ou separado por água de outros países."
            ],
            [
                "Área",
                "O território tem aproximadamente 200 km² de área."
            ]
        ]
    },
    {
        "name": "Nauru",
        "aliases": [
            "Republic of Nauru"
        ],
        "hints": [
            [
                "Localização",
                "Fica na região da Micronésia."
            ],
            [
                "História",
                "Após ter sido administrada por diferentes potências, tornou-se independente em 1968."
            ],
            [
                "Economia",
                "A mineração de fosfato foi historicamente central para a economia e a paisagem da ilha."
            ],
            [
                "Cultura",
                "O nauruano e o inglês são usados oficialmente, e a vida cultural mantém tradições micronésias."
            ],
            [
                "Natureza e patrimônio",
                "É um dos menores países insulares do mundo, situado pouco ao sul da linha do Equador."
            ],
            [
                "Capital",
                "Yaren é o distrito administrativo, sem capital oficial designada."
            ],
            [
                "Idiomas",
                "Nauruano e inglês são usados oficialmente."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se dólar australiano."
            ],
            [
                "Fronteiras",
                "Não tem fronteiras terrestres internacionais; seu território é insular ou separado por água de outros países."
            ],
            [
                "Área",
                "O território tem aproximadamente 0 km² de área."
            ]
        ]
    },
    {
        "name": "Palau",
        "aliases": [
            "Republic of Palau"
        ],
        "hints": [
            [
                "Localização",
                "Fica na região da Micronésia."
            ],
            [
                "História",
                "Tornou-se independente em associação livre com os Estados Unidos em 1994."
            ],
            [
                "Economia",
                "Turismo, mergulho, pesca e serviços são setores importantes."
            ],
            [
                "Cultura",
                "A língua palauana e as casas tradicionais bai são expressões da identidade local."
            ],
            [
                "Natureza e patrimônio",
                "As Rock Islands Southern Lagoon são famosas por suas formações calcárias e lagoas marinhas."
            ],
            [
                "Capital",
                "Ngerulmud."
            ],
            [
                "Idiomas",
                "Palauano e inglês são línguas oficiais."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se dólar americano."
            ],
            [
                "Fronteiras",
                "Não tem fronteiras terrestres internacionais; seu território é insular ou separado por água de outros países."
            ],
            [
                "Área",
                "O território tem aproximadamente 500 km² de área."
            ]
        ]
    },
    {
        "name": "Tuvalu",
        "aliases": [],
        "hints": [
            [
                "Localização",
                "Fica na região da Polinésia."
            ],
            [
                "História",
                "Tornou-se independente do Reino Unido em 1978."
            ],
            [
                "Economia",
                "Licenças de pesca, remessas, serviços e receitas de domínios de internet contribuem para a economia."
            ],
            [
                "Cultura",
                "O tuvaluano e o inglês são oficiais; o fatele é uma forma tradicional de música e dança coletiva."
            ],
            [
                "Natureza e patrimônio",
                "O território é composto por atóis baixos, tornando-o particularmente exposto à elevação do nível do mar."
            ],
            [
                "Capital",
                "Funafuti."
            ],
            [
                "Idiomas",
                "Tuvaluano e inglês são línguas oficiais."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se dólar australiano."
            ],
            [
                "Fronteiras",
                "Não tem fronteiras terrestres internacionais; seu território é insular ou separado por água de outros países."
            ],
            [
                "Área",
                "O território tem aproximadamente 0 km² de área."
            ]
        ]
    },
    {
        "name": "Maurício",
        "aliases": [
            "Mauritius",
            "Republic of Mauritius"
        ],
        "hints": [
            [
                "Localização",
                "Fica na África Oriental."
            ],
            [
                "História",
                "Tornou-se independente do Reino Unido em 1968."
            ],
            [
                "Economia",
                "Turismo, têxteis, serviços financeiros, açúcar e tecnologia são setores importantes."
            ],
            [
                "Cultura",
                "A sociedade combina heranças africanas, indianas, chinesas e europeias; o sega é um gênero musical local."
            ],
            [
                "Natureza e patrimônio",
                "A paisagem de Chamarel é conhecida por suas terras coloridas e formações vulcânicas."
            ],
            [
                "Capital",
                "Port Louis."
            ],
            [
                "Idiomas",
                "Inglês é usado oficialmente no Parlamento; francês e crioulo mauriciano são muito comuns."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se rupia mauriciana."
            ],
            [
                "Fronteiras",
                "Não tem fronteiras terrestres internacionais; seu território é insular ou separado por água de outros países."
            ],
            [
                "Área",
                "O território tem aproximadamente 2.000 km² de área."
            ]
        ]
    },
    {
        "name": "Seicheles",
        "aliases": [
            "Seychelles",
            "Republic of Seychelles"
        ],
        "hints": [
            [
                "Localização",
                "Fica na África Oriental."
            ],
            [
                "História",
                "Tornou-se independente do Reino Unido em 1976."
            ],
            [
                "Economia",
                "Turismo, pesca e serviços associados ao oceano são fundamentais para a economia."
            ],
            [
                "Cultura",
                "Crioulo seichelense, inglês e francês são línguas oficiais, refletindo a história das ilhas."
            ],
            [
                "Natureza e patrimônio",
                "O atol de Aldabra abriga tartarugas-gigantes e um ecossistema insular singular."
            ],
            [
                "Capital",
                "Victoria."
            ],
            [
                "Idiomas",
                "Crioulo seichelense, inglês e francês são línguas oficiais."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se rupia seichelense."
            ],
            [
                "Fronteiras",
                "Não tem fronteiras terrestres internacionais; seu território é insular ou separado por água de outros países."
            ],
            [
                "Área",
                "O território tem aproximadamente 500 km² de área."
            ]
        ]
    },
    {
        "name": "Malawi",
        "aliases": [
            "Republic of Malawi"
        ],
        "hints": [
            [
                "Localização",
                "Fica na África Oriental."
            ],
            [
                "História",
                "Tornou-se independente do Reino Unido em 1964."
            ],
            [
                "Economia",
                "Agricultura, chá, tabaco e serviços são importantes para a economia."
            ],
            [
                "Cultura",
                "A música e a dança gule wamkulu fazem parte do patrimônio cultural chewa."
            ],
            [
                "Natureza e patrimônio",
                "O lago Malawi, com grande diversidade de peixes ciclídeos, é um destaque natural."
            ],
            [
                "Capital",
                "Lilongwe."
            ],
            [
                "Idiomas",
                "Inglês é oficial e chichewa é uma das línguas nacionais mais usadas."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se kwacha malauiana."
            ],
            [
                "Fronteiras",
                "Faz fronteira terrestre com Moçambique, Tanzânia e Zâmbia."
            ],
            [
                "Área",
                "O território tem aproximadamente 120.000 km² de área."
            ]
        ]
    },
    {
        "name": "Vaticano",
        "aliases": [
            "Vatican City",
            "Vatican",
            "Holy See",
            "Holy See (Vatican City State)",
            "State of the Vatican City",
            "Cidade do Vaticano"
        ],
        "hints": [
            [
                "Localização",
                "É um Estado soberano completamente cercado pela cidade de Roma, na Europa Meridional."
            ],
            [
                "História",
                "O Estado da Cidade do Vaticano foi estabelecido pelos Tratados de Latrão de 1929."
            ],
            [
                "Política",
                "O papa é o chefe de Estado e também lidera a Igreja Católica."
            ],
            [
                "Economia",
                "Receitas de museus, turismo, publicações, selos e doações financiam muitas atividades."
            ],
            [
                "Patrimônio",
                "A Basílica de São Pedro, a Praça de São Pedro e os Museus Vaticanos estão entre seus marcos mais conhecidos."
            ],
            [
                "Capital",
                "A capital é a Cidade do Vaticano."
            ],
            [
                "Idiomas",
                "Italiano é amplamente usado; o latim também tem papel oficial na Santa Sé."
            ],
            [
                "Moeda",
                "A moeda em uso chama-se o euro."
            ],
            [
                "Fronteiras",
                "Faz fronteira terrestre apenas com a Itália."
            ],
            [
                "Área",
                "Seu território tem aproximadamente 0,49 km², sendo o menor Estado soberano do mundo em área."
            ]
        ]
    },
    {
        "name": "Benim",
        "aliases": [
            "Benin",
            "República do Benim",
            "Republic of Benin"
        ],
        "hints": [
            [
                "Geografia",
                "Fica na África Ocidental, com uma curta costa no golfo da Guiné e território que se estende ao norte pelo Sahel."
            ],
            [
                "História",
                "O antigo Reino do Daomé deixou palácios reais em Abomey, hoje reconhecidos como patrimônio mundial."
            ],
            [
                "Economia",
                "O algodão é uma exportação importante; castanha-de-caju, agricultura e o porto de Cotonou também têm grande peso."
            ],
            [
                "Cultura",
                "As tradições vodu têm raízes profundas no país e influenciaram práticas religiosas e culturais da diáspora atlântica."
            ],
            [
                "Natureza e patrimônio",
                "O Parque Nacional da Pendjari protege savanas e animais como elefantes, leões e antílopes."
            ],
            [
                "Idiomas",
                "O francês é a língua oficial; fon, iorubá, bariba e outras línguas locais são amplamente usadas."
            ],
            [
                "Capital",
                "Porto-Novo é a capital oficial; Cotonou concentra muitas funções econômicas e governamentais."
            ],
            [
                "Moeda",
                "A moeda é o franco CFA da África Ocidental, compartilhado por vários membros da União Econômica e Monetária da África Ocidental."
            ],
            [
                "Fronteiras",
                "Faz fronteira com Togo, Burkina Faso, Níger e Nigéria, além de ter litoral no golfo da Guiné."
            ],
            [
                "Área",
                "Seu território tem aproximadamente 113 mil km²."
            ]
        ]
    },
    {
        "name": "Burundi",
        "aliases": [
            "Burundi",
            "República do Burundi",
            "Republic of Burundi"
        ],
        "hints": [
            [
                "Geografia",
                "É um país de alta densidade populacional na região dos Grandes Lagos da África, com acesso ao lago Tanganica."
            ],
            [
                "História",
                "Tornou-se independente da Bélgica em 1962, após um período de administração colonial."
            ],
            [
                "Economia",
                "Café e chá são importantes exportações, enquanto muitas famílias dependem da agricultura de pequena escala."
            ],
            [
                "Cultura",
                "Os tambores reais do Burundi são uma tradição musical e cerimonial reconhecida pela UNESCO."
            ],
            [
                "Natureza e patrimônio",
                "O lago Tanganica fica a oeste; florestas montanhosas como a de Kibira protegem ecossistemas importantes."
            ],
            [
                "Idiomas",
                "Kirundi, francês e inglês são línguas oficiais; o kirundi é amplamente falado em todo o país."
            ],
            [
                "Capital",
                "Gitega é a capital política desde 2019; Bujumbura continua sendo o principal centro econômico."
            ],
            [
                "Moeda",
                "A moeda nacional é o franco burundês."
            ],
            [
                "Fronteiras",
                "Faz fronteira com Ruanda ao norte, Tanzânia a leste e sul, e República Democrática do Congo a oeste."
            ],
            [
                "Área",
                "Tem aproximadamente 27.800 km² de área."
            ]
        ]
    },
    {
        "name": "Cabo Verde",
        "aliases": [
            "Cape Verde",
            "República de Cabo Verde",
            "Republic of Cabo Verde",
            "Republic of Cape Verde"
        ],
        "hints": [
            [
                "Geografia",
                "É um arquipélago vulcânico do Atlântico, ao largo da costa ocidental da África, formado por dez ilhas principais."
            ],
            [
                "História",
                "Tornou-se independente de Portugal em 1975."
            ],
            [
                "Economia",
                "Turismo, serviços, pesca e remessas da diáspora são importantes para a economia insular."
            ],
            [
                "Cultura",
                "A morna, gênero musical associado à cantora Cesária Évora, foi inscrita pela UNESCO como patrimônio cultural imaterial."
            ],
            [
                "Natureza e patrimônio",
                "A ilha do Fogo abriga um vulcão ativo e paisagens de lava, enquanto outras ilhas são conhecidas por praias e montanhas."
            ],
            [
                "Idiomas",
                "O português é oficial, mas o crioulo cabo-verdiano é a língua mais usada no cotidiano."
            ],
            [
                "Capital",
                "Praia fica na ilha de Santiago."
            ],
            [
                "Moeda",
                "A moeda nacional é o escudo cabo-verdiano."
            ],
            [
                "Fronteiras",
                "Como país insular, não possui fronteiras terrestres; suas ilhas ficam no oceano Atlântico."
            ],
            [
                "Área",
                "A área terrestre total é de cerca de 4 mil km²."
            ]
        ]
    },
    {
        "name": "República Centro-Africana",
        "aliases": [
            "Central African Republic",
            "CAR",
            "Centrafrique",
            "República Centro Africana"
        ],
        "hints": [
            [
                "Geografia",
                "É um país sem litoral no centro do continente africano, com savanas no norte e florestas tropicais no sul."
            ],
            [
                "História",
                "Alcançou a independência da França em 1960."
            ],
            [
                "Economia",
                "Diamantes, ouro, madeira e agricultura têm importância econômica, embora a infraestrutura seja limitada."
            ],
            [
                "Cultura",
                "O sango é uma língua franca que facilita a comunicação entre comunidades de diferentes línguas maternas."
            ],
            [
                "Natureza e patrimônio",
                "A região de Dzanga-Sangha é conhecida por florestas tropicais, elefantes-da-floresta e outros animais selvagens."
            ],
            [
                "Idiomas",
                "Francês e sango são as línguas oficiais."
            ],
            [
                "Capital",
                "Bangui fica às margens do rio Ubangi, que integra o sistema do rio Congo."
            ],
            [
                "Moeda",
                "Utiliza o franco CFA da África Central, emitido para vários países da região."
            ],
            [
                "Fronteiras",
                "Faz fronteira com Chade, Sudão, Sudão do Sul, República Democrática do Congo, República do Congo e Camarões."
            ],
            [
                "Área",
                "Seu território tem aproximadamente 623 mil km²."
            ]
        ]
    },
    {
        "name": "Chade",
        "aliases": [
            "Chad",
            "República do Chade",
            "Republic of Chad"
        ],
        "hints": [
            [
                "Geografia",
                "Seu território atravessa ambientes do Saara, do Sahel e de savanas mais úmidas ao sul."
            ],
            [
                "História",
                "Tornou-se independente da França em 1960."
            ],
            [
                "Economia",
                "Petróleo, criação de animais e cultivo de algodão são importantes para sua economia."
            ],
            [
                "Cultura",
                "Árabe e francês são idiomas oficiais; o país reúne comunidades sahelianas, saarianas e centro-africanas com tradições diversas."
            ],
            [
                "Natureza e patrimônio",
                "Os Lagos de Ounianga, no Saara, formam um conjunto de lagos de origem natural reconhecido como patrimônio mundial."
            ],
            [
                "Idiomas",
                "Árabe e francês são as línguas oficiais, além de muitas línguas nacionais."
            ],
            [
                "Capital",
                "N'Djamena fica perto da confluência dos rios Chari e Logone."
            ],
            [
                "Moeda",
                "A moeda é o franco CFA da África Central."
            ],
            [
                "Fronteiras",
                "Faz fronteira com Líbia, Sudão, República Centro-Africana, Camarões, Nigéria e Níger."
            ],
            [
                "Área",
                "Com cerca de 1,28 milhão de km², está entre os maiores países africanos em área."
            ]
        ]
    },
    {
        "name": "República do Congo",
        "aliases": [
            "Republic of the Congo",
            "Congo",
            "Congo-Brazzaville",
            "Congo Brazzaville"
        ],
        "hints": [
            [
                "Geografia",
                "Fica na África Central e alcança o oceano Atlântico; extensas áreas do interior são cobertas por florestas tropicais."
            ],
            [
                "História",
                "Tornou-se independente da França em 1960."
            ],
            [
                "Economia",
                "Petróleo é uma das principais fontes de exportação, junto de atividades florestais e outros recursos naturais."
            ],
            [
                "Cultura",
                "A cena musical de Brazzaville e Kinshasa contribuiu para a projeção internacional da rumba congolesa."
            ],
            [
                "Natureza e patrimônio",
                "As florestas do norte fazem parte de uma das grandes regiões de conservação de biodiversidade da bacia do Congo."
            ],
            [
                "Idiomas",
                "O francês é oficial; lingala e kituba são línguas amplamente utilizadas."
            ],
            [
                "Capital",
                "Brazzaville fica junto ao rio Congo, em frente a Kinshasa, capital da vizinha República Democrática do Congo."
            ],
            [
                "Moeda",
                "Usa o franco CFA da África Central."
            ],
            [
                "Fronteiras",
                "Faz fronteira com Gabão, Camarões, República Centro-Africana, República Democrática do Congo e o enclave angolano de Cabinda."
            ],
            [
                "Área",
                "Seu território tem cerca de 342 mil km²."
            ]
        ]
    },
    {
        "name": "Comores",
        "aliases": [
            "Comoros",
            "União das Comores",
            "Union of the Comoros"
        ],
        "hints": [
            [
                "Geografia",
                "É um arquipélago vulcânico no oceano Índico, entre Madagascar e a costa de Moçambique."
            ],
            [
                "História",
                "Tornou-se independente da França em 1975; Mayotte permaneceu sob administração francesa e é reivindicada pelas Comores."
            ],
            [
                "Economia",
                "Baunilha, cravo, ylang-ylang, pesca e remessas da diáspora são importantes para a economia."
            ],
            [
                "Cultura",
                "A tradição do grande casamento, conhecido como anda, tem grande importância social em partes do arquipélago."
            ],
            [
                "Natureza e patrimônio",
                "O monte Karthala, na ilha de Grande Comore, é um grande vulcão ativo."
            ],
            [
                "Idiomas",
                "Comoriano, árabe e francês são línguas oficiais."
            ],
            [
                "Capital",
                "Moroni fica na ilha de Grande Comore."
            ],
            [
                "Moeda",
                "A moeda nacional é o franco comoriano."
            ],
            [
                "Fronteiras",
                "Não possui fronteiras terrestres; é cercado pelas águas do canal de Moçambique e do oceano Índico."
            ],
            [
                "Área",
                "As ilhas somam aproximadamente 1.900 km² de área terrestre."
            ]
        ]
    },
    {
        "name": "Djibuti",
        "aliases": [
            "Djibouti",
            "República do Djibuti",
            "Republic of Djibouti"
        ],
        "hints": [
            [
                "Geografia",
                "Fica no Chifre da África, junto ao estreito de Bab-el-Mandeb, passagem entre o mar Vermelho e o golfo de Áden."
            ],
            [
                "História",
                "Tornou-se independente da França em 1977."
            ],
            [
                "Economia",
                "Portos e ferrovias ligam o comércio marítimo ao interior da África Oriental, especialmente à Etiópia."
            ],
            [
                "Cultura",
                "As comunidades afar e somali têm forte presença cultural, ao lado de influências árabes e francesas."
            ],
            [
                "Natureza e patrimônio",
                "O lago Assal é um lago salino situado abaixo do nível do mar, em uma paisagem vulcânica."
            ],
            [
                "Idiomas",
                "Francês e árabe são oficiais; somali e afar também são amplamente falados."
            ],
            [
                "Capital",
                "A cidade de Djibuti é o principal centro urbano e portuário."
            ],
            [
                "Moeda",
                "A moeda nacional é o franco do Djibuti."
            ],
            [
                "Fronteiras",
                "Faz fronteira com Eritreia, Etiópia e Somália, além de ter litoral no mar Vermelho e no golfo de Áden."
            ],
            [
                "Área",
                "É um país pequeno, com aproximadamente 23 mil km²."
            ]
        ]
    },
    {
        "name": "Guiné Equatorial",
        "aliases": [
            "Equatorial Guinea",
            "República da Guiné Equatorial",
            "Republic of Equatorial Guinea"
        ],
        "hints": [
            [
                "Geografia",
                "É formado por uma região continental, chamada Río Muni, e ilhas no golfo da Guiné, incluindo Bioko."
            ],
            [
                "História",
                "Tornou-se independente da Espanha em 1968."
            ],
            [
                "Economia",
                "Petróleo e gás natural transformaram suas exportações e receitas públicas desde o fim do século XX."
            ],
            [
                "Cultura",
                "As línguas e tradições fang e bubi coexistem com uma forte herança hispânica."
            ],
            [
                "Natureza e patrimônio",
                "O Parque Nacional de Monte Alén protege florestas tropicais e espécies da África equatorial."
            ],
            [
                "Idiomas",
                "Espanhol, francês e português têm status oficial; fang e bubi também são importantes línguas locais."
            ],
            [
                "Capital",
                "Em janeiro de 2026, Ciudad de la Paz foi proclamada capital por decreto, substituindo formalmente Malabo; a transferência administrativa segue em consolidação."
            ],
            [
                "Moeda",
                "Utiliza o franco CFA da África Central."
            ],
            [
                "Fronteiras",
                "A região continental faz fronteira com Camarões e Gabão; o país também possui litoral atlântico e ilhas."
            ],
            [
                "Área",
                "O território totaliza cerca de 28 mil km²."
            ]
        ]
    },
    {
        "name": "Eritreia",
        "aliases": [
            "Eritrea",
            "Estado da Eritreia",
            "State of Eritrea"
        ],
        "hints": [
            [
                "Geografia",
                "Fica no nordeste da África, com uma longa costa no mar Vermelho e ilhas ao largo."
            ],
            [
                "História",
                "Tornou-se independente da Etiópia em 1993, após uma longa luta pela independência."
            ],
            [
                "Economia",
                "A mineração, incluindo ouro, cobre e zinco, é importante, assim como a agricultura e a criação de animais."
            ],
            [
                "Cultura",
                "A cerimônia do café e tradições culinárias da região montanhosa refletem influências locais e do mar Vermelho."
            ],
            [
                "Natureza e patrimônio",
                "O arquipélago de Dahlak inclui ilhas e recifes no mar Vermelho, enquanto o interior sobe até terras altas."
            ],
            [
                "Idiomas",
                "Tigrínia, árabe e inglês são usados em diferentes contextos, ao lado de outras línguas nacionais."
            ],
            [
                "Capital",
                "Asmara é conhecida por seu conjunto de arquitetura modernista italiana, reconhecido pela UNESCO."
            ],
            [
                "Moeda",
                "A moeda nacional é a nakfa eritreia."
            ],
            [
                "Fronteiras",
                "Faz fronteira com Sudão, Etiópia e Djibuti."
            ],
            [
                "Área",
                "Seu território tem cerca de 118 mil km², incluindo ilhas do mar Vermelho."
            ]
        ]
    },
    {
        "name": "Eswatini",
        "aliases": [
            "Swaziland",
            "Reino de Eswatini",
            "Kingdom of Eswatini"
        ],
        "hints": [
            [
                "Geografia",
                "É um pequeno país sem litoral da África Austral, entre a África do Sul e Moçambique."
            ],
            [
                "História",
                "Adotou oficialmente o nome Eswatini em 2018; tornou-se independente do Reino Unido em 1968."
            ],
            [
                "Economia",
                "Açúcar, silvicultura, manufatura e comércio regional são setores relevantes."
            ],
            [
                "Cultura",
                "A dança do Umhlanga, ou Dança dos Juncos, é uma cerimônia cultural anual de grande destaque."
            ],
            [
                "Natureza e patrimônio",
                "A paisagem varia de planícies quentes a montanhas; reservas como Hlane protegem fauna nativa."
            ],
            [
                "Idiomas",
                "Siswati e inglês são línguas oficiais."
            ],
            [
                "Capital",
                "Mbabane é a capital administrativa; Lobamba concentra funções reais e legislativas."
            ],
            [
                "Moeda",
                "A moeda nacional é o lilangeni; o rand sul-africano também circula e tem paridade com ele."
            ],
            [
                "Fronteiras",
                "Faz fronteira com a África do Sul e Moçambique e não possui litoral."
            ],
            [
                "Área",
                "Tem aproximadamente 17.400 km²."
            ]
        ]
    },
    {
        "name": "Gabão",
        "aliases": [
            "Gabon",
            "República Gabonesa",
            "Gabonese Republic"
        ],
        "hints": [
            [
                "Geografia",
                "Fica na costa atlântica da África Central e é atravessado pela linha do Equador."
            ],
            [
                "História",
                "Tornou-se independente da França em 1960."
            ],
            [
                "Economia",
                "Petróleo, manganês, madeira e serviços têm grande importância econômica."
            ],
            [
                "Cultura",
                "A vida cultural reúne tradições de povos como fang, punu e myene, além de influências urbanas francófonas."
            ],
            [
                "Natureza e patrimônio",
                "Extensas florestas tropicais cobrem boa parte do país; parques como Loango e Ivindo protegem grande biodiversidade."
            ],
            [
                "Idiomas",
                "O francês é a língua oficial e de uso amplo, ao lado de várias línguas locais."
            ],
            [
                "Capital",
                "Libreville fica na costa atlântica, junto ao estuário do rio Komo."
            ],
            [
                "Moeda",
                "A moeda é o franco CFA da África Central."
            ],
            [
                "Fronteiras",
                "Faz fronteira com Guiné Equatorial, Camarões e República do Congo, além de ter costa atlântica."
            ],
            [
                "Área",
                "Seu território tem aproximadamente 268 mil km²."
            ]
        ]
    },
    {
        "name": "Gâmbia",
        "aliases": [
            "Gambia",
            "The Gambia",
            "República da Gâmbia",
            "Republic of the Gambia"
        ],
        "hints": [
            [
                "Geografia",
                "É um dos menores países da África continental e se estende ao longo do rio Gâmbia, quase totalmente rodeado pelo Senegal."
            ],
            [
                "História",
                "Tornou-se independente do Reino Unido em 1965."
            ],
            [
                "Economia",
                "Turismo, agricultura, pesca e amendoim contribuem para sua economia."
            ],
            [
                "Cultura",
                "A tradição dos griots e instrumentos como a kora fazem parte da herança musical da região."
            ],
            [
                "Natureza e patrimônio",
                "O rio Gâmbia sustenta manguezais, aves e áreas protegidas; a ilha de Kunta Kinteh está ligada à história do comércio atlântico de escravizados."
            ],
            [
                "Idiomas",
                "O inglês é oficial; mandinga, wolof, fula e outras línguas são amplamente faladas."
            ],
            [
                "Capital",
                "Banjul fica numa ilha na foz do rio Gâmbia."
            ],
            [
                "Moeda",
                "A moeda nacional é o dalasi."
            ],
            [
                "Fronteiras",
                "A fronteira terrestre é quase toda com o Senegal; a costa fica no oceano Atlântico."
            ],
            [
                "Área",
                "Seu território tem aproximadamente 11.300 km²."
            ]
        ]
    },
    {
        "name": "Guiné",
        "aliases": [
            "Guinea",
            "República da Guiné",
            "Republic of Guinea",
            "Guinea-Conakry"
        ],
        "hints": [
            [
                "Geografia",
                "Fica na África Ocidental, com litoral atlântico e terras altas de onde nascem rios importantes da região."
            ],
            [
                "História",
                "Tornou-se independente da França em 1958, após rejeitar a proposta de integração política francesa daquele ano."
            ],
            [
                "Economia",
                "Possui grandes reservas de bauxita e também produz ouro, diamantes e produtos agrícolas."
            ],
            [
                "Cultura",
                "Povos como fula, mandinga e susu contribuem para uma rica diversidade linguística e musical."
            ],
            [
                "Natureza e patrimônio",
                "O maciço de Fouta Djallon é uma importante região montanhosa e fonte de vários rios da África Ocidental."
            ],
            [
                "Idiomas",
                "O francês é oficial; pular, maninka e susu estão entre as línguas mais faladas."
            ],
            [
                "Capital",
                "Conacri é uma cidade portuária situada junto ao oceano Atlântico."
            ],
            [
                "Moeda",
                "A moeda nacional é o franco guineense."
            ],
            [
                "Fronteiras",
                "Faz fronteira com Guiné-Bissau, Senegal, Mali, Costa do Marfim, Libéria e Serra Leoa."
            ],
            [
                "Área",
                "Tem cerca de 246 mil km² de área."
            ]
        ]
    },
    {
        "name": "Guiné-Bissau",
        "aliases": [
            "Guinea-Bissau",
            "Guinea Bissau",
            "República da Guiné-Bissau",
            "Republic of Guinea-Bissau"
        ],
        "hints": [
            [
                "Geografia",
                "É um país costeiro da África Ocidental que inclui o arquipélago dos Bijagós."
            ],
            [
                "História",
                "A independência de Portugal foi proclamada em 1973 e reconhecida em 1974, após uma guerra de libertação."
            ],
            [
                "Economia",
                "A castanha-de-caju é uma das principais exportações; arroz, pesca e agricultura também sustentam muitas famílias."
            ],
            [
                "Cultura",
                "O crioulo da Guiné-Bissau, frequentemente chamado kriol, funciona como língua franca entre muitos grupos."
            ],
            [
                "Natureza e patrimônio",
                "O arquipélago dos Bijagós reúne manguezais, áreas úmidas e habitats de tartarugas marinhas."
            ],
            [
                "Idiomas",
                "O português é oficial; o crioulo e várias línguas africanas são amplamente usados."
            ],
            [
                "Capital",
                "Bissau é o principal centro político e portuário do país."
            ],
            [
                "Moeda",
                "Utiliza o franco CFA da África Ocidental."
            ],
            [
                "Fronteiras",
                "Faz fronteira terrestre com Senegal e Guiné e tem litoral no Atlântico."
            ],
            [
                "Área",
                "Seu território tem aproximadamente 36 mil km²."
            ]
        ]
    },
    {
        "name": "Lesoto",
        "aliases": [
            "Lesotho",
            "Reino do Lesoto",
            "Kingdom of Lesotho"
        ],
        "hints": [
            [
                "Geografia",
                "É um país montanhoso e sem litoral completamente cercado pela África do Sul."
            ],
            [
                "História",
                "A antiga Basutolândia tornou-se independente do Reino Unido em 1966."
            ],
            [
                "Economia",
                "Exporta água para a África do Sul pelo Projeto Hídrico das Terras Altas e também produz têxteis e diamantes."
            ],
            [
                "Cultura",
                "Cobertores tradicionais e chapéus mokorotlo são símbolos conhecidos da cultura basotho."
            ],
            [
                "Natureza e patrimônio",
                "As montanhas Maloti fazem parte de uma paisagem de altitude onde pode nevar no inverno austral."
            ],
            [
                "Idiomas",
                "Sesotho e inglês são línguas oficiais."
            ],
            [
                "Capital",
                "Maseru fica perto da fronteira com a África do Sul."
            ],
            [
                "Moeda",
                "A moeda é o loti, plural maloti; o rand sul-africano também é amplamente aceito."
            ],
            [
                "Fronteiras",
                "Toda a sua fronteira terrestre é compartilhada com a África do Sul."
            ],
            [
                "Área",
                "Seu território tem aproximadamente 30.400 km²."
            ]
        ]
    },
    {
        "name": "Libéria",
        "aliases": [
            "Liberia",
            "República da Libéria",
            "Republic of Liberia"
        ],
        "hints": [
            [
                "Geografia",
                "Fica na costa atlântica da África Ocidental, com florestas tropicais e planícies costeiras."
            ],
            [
                "História",
                "Foi fundada no século XIX para receber pessoas negras libertas dos Estados Unidos e declarou independência em 1847."
            ],
            [
                "Economia",
                "Borracha, minério de ferro, ouro e agricultura estão entre os setores econômicos importantes."
            ],
            [
                "Cultura",
                "A capital recebeu seu nome em homenagem ao presidente norte-americano James Monroe."
            ],
            [
                "Natureza e patrimônio",
                "O Parque Nacional de Sapo protege uma das maiores áreas remanescentes de floresta tropical da Alta Guiné."
            ],
            [
                "Idiomas",
                "O inglês é oficial; dezenas de línguas locais são usadas pelas diferentes comunidades."
            ],
            [
                "Capital",
                "Monróvia é a principal cidade e um importante porto do Atlântico."
            ],
            [
                "Moeda",
                "A moeda nacional é o dólar liberiano; o dólar dos Estados Unidos também é usado em transações."
            ],
            [
                "Fronteiras",
                "Faz fronteira com Serra Leoa, Guiné e Costa do Marfim, além do litoral atlântico."
            ],
            [
                "Área",
                "Tem cerca de 111 mil km²."
            ]
        ]
    },
    {
        "name": "Mauritânia",
        "aliases": [
            "Mauritania",
            "República Islâmica da Mauritânia",
            "Islamic Republic of Mauritania"
        ],
        "hints": [
            [
                "Geografia",
                "Grande parte do território fica no Saara; ao oeste, possui litoral no oceano Atlântico."
            ],
            [
                "História",
                "Tornou-se independente da França em 1960."
            ],
            [
                "Economia",
                "Minério de ferro, pesca, ouro e criação de animais estão entre as atividades econômicas importantes."
            ],
            [
                "Cultura",
                "Tradições de sociedades nômades e antigas rotas caravaneiras marcam a história cultural do país."
            ],
            [
                "Natureza e patrimônio",
                "O Parque Nacional do Banco de Arguim protege extensas áreas costeiras importantes para aves migratórias."
            ],
            [
                "Idiomas",
                "O árabe é oficial; pulaar, soninquê e wolof são línguas nacionais, e o francês também é usado em alguns contextos."
            ],
            [
                "Capital",
                "Nouakchott fica perto da costa atlântica e se expandiu rapidamente no século XX."
            ],
            [
                "Moeda",
                "A moeda nacional é a ouguiya mauritana, código MRU."
            ],
            [
                "Fronteiras",
                "Faz fronteira com Argélia, Mali, Senegal e o território do Saara Ocidental, além do Atlântico."
            ],
            [
                "Área",
                "Com cerca de 1,03 milhão de km², é um dos maiores países do continente africano."
            ]
        ]
    },
    {
        "name": "São Tomé e Príncipe",
        "aliases": [
            "Sao Tome and Principe",
            "São Tomé & Príncipe",
            "Sao Tome & Principe",
            "Democratic Republic of Sao Tome and Principe"
        ],
        "hints": [
            [
                "Geografia",
                "É um arquipélago vulcânico no golfo da Guiné, próximo à linha do Equador."
            ],
            [
                "História",
                "Tornou-se independente de Portugal em 1975."
            ],
            [
                "Economia",
                "O cacau foi historicamente muito importante; agricultura, pesca e turismo também contribuem para a economia."
            ],
            [
                "Cultura",
                "A herança lusófona convive com tradições crioulas, incluindo ritmos como ússua e socopé."
            ],
            [
                "Natureza e patrimônio",
                "O Parque Natural Obô protege floresta tropical; o Pico Cão Grande é uma formação vulcânica muito característica."
            ],
            [
                "Idiomas",
                "O português é oficial; forro, angolar e principense são línguas crioulas presentes no arquipélago."
            ],
            [
                "Capital",
                "A cidade de São Tomé fica na maior ilha do país."
            ],
            [
                "Moeda",
                "A moeda nacional é a dobra."
            ],
            [
                "Fronteiras",
                "Por ser insular, não tem fronteiras terrestres; suas ilhas ficam no Atlântico equatorial."
            ],
            [
                "Área",
                "As ilhas somam aproximadamente 1.000 km² de área terrestre."
            ]
        ]
    },
    {
        "name": "Serra Leoa",
        "aliases": [
            "Sierra Leone",
            "República da Serra Leoa",
            "Republic of Sierra Leone"
        ],
        "hints": [
            [
                "Geografia",
                "Fica na costa atlântica da África Ocidental, com praias, manguezais e áreas de floresta tropical."
            ],
            [
                "História",
                "Tornou-se independente do Reino Unido em 1961; Freetown havia sido fundada em 1787 como assentamento para pessoas negras libertas."
            ],
            [
                "Economia",
                "Diamantes, rutilo, bauxita, agricultura e pesca são importantes para a economia."
            ],
            [
                "Cultura",
                "O krio é uma língua franca que reflete a história multicultural de Freetown e de outras comunidades costeiras."
            ],
            [
                "Natureza e patrimônio",
                "Áreas protegidas como Tiwai Island e o Parque Nacional Outamba-Kilimi ajudam a conservar primatas e outros animais."
            ],
            [
                "Idiomas",
                "O inglês é oficial; krio, temne e mende são amplamente utilizados."
            ],
            [
                "Capital",
                "Freetown é um porto atlântico e o principal centro urbano do país."
            ],
            [
                "Moeda",
                "A moeda nacional é o leone de Serra Leoa."
            ],
            [
                "Fronteiras",
                "Faz fronteira com Guiné ao norte e leste, Libéria ao sudeste e o oceano Atlântico a oeste."
            ],
            [
                "Área",
                "Seu território tem cerca de 71.700 km²."
            ]
        ]
    },
    {
        "name": "Somália",
        "aliases": [
            "Somalia",
            "República Federal da Somália",
            "Federal Republic of Somalia"
        ],
        "hints": [
            [
                "Geografia",
                "Ocupa o Chifre da África e tem extensas costas no golfo de Áden e no oceano Índico."
            ],
            [
                "História",
                "A república atual surgiu em 1960, quando os territórios que haviam sido administrados por britânicos e italianos se uniram após a independência."
            ],
            [
                "Economia",
                "Pecuária, remessas da diáspora, telecomunicações e pesca são importantes para muitos setores da economia."
            ],
            [
                "Cultura",
                "A poesia oral e as tradições pastorais têm papel importante na cultura somali."
            ],
            [
                "Natureza e patrimônio",
                "O longo litoral reúne recifes e ecossistemas marinhos, enquanto o interior inclui planaltos áridos e áreas semiáridas."
            ],
            [
                "Idiomas",
                "Somali e árabe são línguas oficiais."
            ],
            [
                "Capital",
                "Mogadíscio é uma cidade costeira histórica no oceano Índico."
            ],
            [
                "Moeda",
                "A moeda nacional é o xelim somali."
            ],
            [
                "Fronteiras",
                "Faz fronteira com Djibuti, Etiópia e Quênia."
            ],
            [
                "Área",
                "Tem aproximadamente 638 mil km² de área."
            ]
        ]
    },
    {
        "name": "Sudão do Sul",
        "aliases": [
            "South Sudan",
            "República do Sudão do Sul",
            "Republic of South Sudan"
        ],
        "hints": [
            [
                "Geografia",
                "É um país sem litoral no leste da África Central, atravessado pelo Nilo Branco."
            ],
            [
                "História",
                "Tornou-se independente do Sudão em 2011, após um referendo de independência."
            ],
            [
                "Economia",
                "O petróleo é a principal fonte de exportação, e seu transporte depende de infraestrutura que atravessa o Sudão."
            ],
            [
                "Cultura",
                "Dinka, Nuer, Bari, Zande e muitos outros povos compõem uma sociedade cultural e linguisticamente diversa."
            ],
            [
                "Natureza e patrimônio",
                "O Sudd, uma vasta zona úmida alimentada pelo Nilo Branco, é habitat de grandes populações de aves e mamíferos."
            ],
            [
                "Idiomas",
                "O inglês é a língua oficial; Dinka, Nuer, Bari, Zande e outras línguas nacionais são faladas."
            ],
            [
                "Capital",
                "Juba fica às margens do Nilo Branco."
            ],
            [
                "Moeda",
                "A moeda nacional é a libra sul-sudanesa."
            ],
            [
                "Fronteiras",
                "Faz fronteira com Sudão, Etiópia, Quênia, Uganda, República Democrática do Congo e República Centro-Africana."
            ],
            [
                "Área",
                "Seu território tem aproximadamente 620 mil km²."
            ]
        ]
    },
    {
        "name": "Togo",
        "aliases": [
            "Togolese Republic",
            "República Togolesa",
            "Togo"
        ],
        "hints": [
            [
                "Geografia",
                "É um país estreito da África Ocidental, com costa no golfo da Guiné e território que se estende para o interior."
            ],
            [
                "História",
                "Tornou-se independente da França em 1960."
            ],
            [
                "Economia",
                "O porto de Lomé é um ponto de transbordo regional; fosfatos, algodão, café e cacau também são importantes."
            ],
            [
                "Cultura",
                "Tradições de povos como ewe e kabiyè aparecem na música, na dança, no artesanato e nas festas locais."
            ],
            [
                "Natureza e patrimônio",
                "Koutammakou, região de casas-torre tradicionais dos Batammariba, é reconhecida como patrimônio mundial."
            ],
            [
                "Idiomas",
                "O francês é oficial; ewe e kabiyè estão entre as línguas nacionais mais faladas."
            ],
            [
                "Capital",
                "Lomé é uma cidade portuária junto ao golfo da Guiné."
            ],
            [
                "Moeda",
                "Utiliza o franco CFA da África Ocidental."
            ],
            [
                "Fronteiras",
                "Faz fronteira com Gana, Burkina Faso e Benim, além de ter litoral no Atlântico."
            ],
            [
                "Área",
                "Seu território tem aproximadamente 56.800 km²."
            ]
        ]
    },
{
    "name": "Belize",
    "aliases": [
        "Belize",
        "Belice",
        "British Honduras",
        "Honduras Britânicas"
    ],
    "hints": [
        [
            "Geografia",
            "É um país da América Central, com litoral no mar do Caribe, entre o México e a Guatemala."
        ],
        [
            "História",
            "Foi conhecido como Honduras Britânicas durante o período colonial e tornou-se independente em 1981."
        ],
        [
            "Economia",
            "Turismo, agricultura, pesca e serviços financeiros estão entre as atividades econômicas importantes."
        ],
        [
            "Cultura",
            "Sua população mistura influências crioulas, mestiças, maias, garífunas e menonitas."
        ],
        [
            "Natureza e patrimônio",
            "A Barreira de Corais de Belize e o Great Blue Hole estão entre os seus destaques naturais mais famosos."
        ],
        [
            "Capital",
            "Belmopan."
        ],
        [
            "Idiomas",
            "O inglês é a língua oficial, embora espanhol, kriol e línguas maias também sejam amplamente usados."
        ],
        [
            "Moeda",
            "A moeda nacional é o dólar de Belize."
        ],
        [
            "Fronteiras",
            "Faz fronteira terrestre com México e Guatemala, além de ter costa caribenha."
        ],
        [
            "Área",
            "Seu território tem aproximadamente 23 mil km²."
        ]
    ]
},
{
    "name": "Guatemala",
    "aliases": [
        "Guatemala",
        "Republic of Guatemala",
        "República da Guatemala"
    ],
    "hints": [
        [
            "Geografia",
            "É um país da América Central com costas tanto no Pacífico quanto no mar do Caribe."
        ],
        [
            "História",
            "Foi um importante centro da civilização maia e tornou-se independente da Espanha em 1821."
        ],
        [
            "Economia",
            "Agricultura, manufatura, comércio e remessas têm grande peso em sua economia; café e açúcar estão entre os produtos importantes."
        ],
        [
            "Cultura",
            "A herança maia está presente em seus idiomas, tecidos, festas e sítios arqueológicos."
        ],
        [
            "Natureza e patrimônio",
            "Tikal é um de seus sítios arqueológicos mais conhecidos e fica em região de floresta tropical."
        ],
        [
            "Capital",
            "Cidade da Guatemala."
        ],
        [
            "Idiomas",
            "O espanhol é o idioma oficial, e diversas línguas maias também são faladas."
        ],
        [
            "Moeda",
            "A moeda nacional é o quetzal."
        ],
        [
            "Fronteiras",
            "Faz fronteira com México, Belize, Honduras e El Salvador."
        ],
        [
            "Área",
            "Seu território tem aproximadamente 109 mil km²."
        ]
    ]
},
{
    "name": "Honduras",
    "aliases": [
        "Honduras",
        "Republic of Honduras",
        "República de Honduras"
    ],
    "hints": [
        [
            "Geografia",
            "É um país da América Central com litoral no mar do Caribe e uma pequena saída para o Pacífico pelo golfo de Fonseca."
        ],
        [
            "História",
            "O território abrigou centros maias como Copán e tornou-se independente da Espanha em 1821."
        ],
        [
            "Economia",
            "Café, banana, têxteis e remessas são importantes para a economia."
        ],
        [
            "Cultura",
            "A região de Copán é famosa por ruínas maias e inscrições em pedra."
        ],
        [
            "Natureza e patrimônio",
            "As ilhas da Baía e áreas da Mosquitia estão entre os seus ambientes naturais mais conhecidos."
        ],
        [
            "Capital",
            "Tegucigalpa."
        ],
        [
            "Idiomas",
            "O espanhol é a língua oficial, embora também existam línguas indígenas e o garífuna."
        ],
        [
            "Moeda",
            "A moeda nacional é a lempira."
        ],
        [
            "Fronteiras",
            "Faz fronteira com Guatemala, El Salvador e Nicarágua."
        ],
        [
            "Área",
            "Seu território tem aproximadamente 112 mil km²."
        ]
    ]
},
{
    "name": "El Salvador",
    "aliases": [
        "El Salvador",
        "Salvador",
        "Republic of El Salvador",
        "República de El Salvador"
    ],
    "hints": [
        [
            "Geografia",
            "É um país da América Central banhado pelo oceano Pacífico e sem litoral no Caribe."
        ],
        [
            "História",
            "Passou por uma guerra civil no fim do século XX, encerrada por acordos de paz em 1992."
        ],
        [
            "Economia",
            "Serviços, manufatura e remessas têm grande importância econômica."
        ],
        [
            "Cultura",
            "Pupusas são um prato muito associado à culinária nacional."
        ],
        [
            "Natureza e patrimônio",
            "É conhecido por sua cadeia de vulcões e por isso às vezes recebe o apelido de terra dos vulcões."
        ],
        [
            "Capital",
            "San Salvador."
        ],
        [
            "Idiomas",
            "O espanhol é a língua oficial."
        ],
        [
            "Moeda",
            "O dólar dos Estados Unidos é usado como moeda oficial."
        ],
        [
            "Fronteiras",
            "Faz fronteira com Guatemala e Honduras."
        ],
        [
            "Área",
            "Seu território tem aproximadamente 21 mil km², sendo o menor da América Central continental."
        ]
    ]
},
{
    "name": "Nicarágua",
    "aliases": [
        "Nicarágua",
        "Nicaragua",
        "Republic of Nicaragua",
        "República da Nicarágua"
    ],
    "hints": [
        [
            "Geografia",
            "É o maior país da América Central em área e possui litorais no Pacífico e no mar do Caribe."
        ],
        [
            "História",
            "A Revolução Sandinista de 1979 derrubou a ditadura da família Somoza."
        ],
        [
            "Economia",
            "Agricultura, pecuária, mineração, zonas francas e remessas contribuem para a economia."
        ],
        [
            "Cultura",
            "A poesia de Rubén Darío é um de seus marcos culturais mais conhecidos."
        ],
        [
            "Natureza e patrimônio",
            "Abriga os grandes lagos Nicarágua e Manágua, além de numerosos vulcões."
        ],
        [
            "Capital",
            "Manágua."
        ],
        [
            "Idiomas",
            "O espanhol é a língua oficial; em partes do Caribe também há uso de outras línguas, como inglês crioulo e línguas indígenas."
        ],
        [
            "Moeda",
            "A moeda nacional é o córdoba."
        ],
        [
            "Fronteiras",
            "Faz fronteira com Honduras ao norte e Costa Rica ao sul."
        ],
        [
            "Área",
            "Seu território tem aproximadamente 130 mil km²."
        ]
    ]
},
{
    "name": "Costa Rica",
    "aliases": [
        "Costa Rica",
        "Republic of Costa Rica",
        "República da Costa Rica"
    ],
    "hints": [
        [
            "Geografia",
            "É um país da América Central com costas tanto no Caribe quanto no Pacífico, entre Nicarágua e Panamá."
        ],
        [
            "História",
            "Aboliu o exército em 1948 e desde então investe fortemente em instituições civis."
        ],
        [
            "Economia",
            "Ecoturismo, tecnologia, agricultura e dispositivos médicos estão entre os setores importantes."
        ],
        [
            "Cultura",
            "A expressão 'pura vida' é fortemente associada ao modo de vida local."
        ],
        [
            "Natureza e patrimônio",
            "É reconhecido pela grande biodiversidade e por sua rede de parques nacionais e áreas protegidas."
        ],
        [
            "Capital",
            "San José."
        ],
        [
            "Idiomas",
            "O espanhol é a língua oficial."
        ],
        [
            "Moeda",
            "A moeda nacional é o colón costarriquenho."
        ],
        [
            "Fronteiras",
            "Faz fronteira com Nicarágua e Panamá."
        ],
        [
            "Área",
            "Seu território tem aproximadamente 51 mil km²."
        ]
    ]
},
{
    "name": "Panamá",
    "aliases": [
        "Panamá",
        "Panama",
        "Republic of Panama",
        "República do Panamá"
    ],
    "hints": [
        [
            "Geografia",
            "É um país da América Central situado no istmo que liga a América do Norte à América do Sul, com costas no Caribe e no Pacífico."
        ],
        [
            "História",
            "Separou-se da Colômbia em 1903, no contexto da construção de uma importante via interoceânica."
        ],
        [
            "Economia",
            "Serviços logísticos, comércio, finanças e transporte marítimo são muito importantes para a economia."
        ],
        [
            "Cultura",
            "Sua posição de passagem internacional favoreceu uma cultura marcada por influências caribenhas, hispânicas e globais."
        ],
        [
            "Natureza e patrimônio",
            "É conhecido pela grande obra de engenharia que conecta o Atlântico ao Pacífico através do seu território."
        ],
        [
            "Capital",
            "Cidade do Panamá."
        ],
        [
            "Idiomas",
            "O espanhol é a língua oficial."
        ],
        [
            "Moeda",
            "Utiliza o balboa e o dólar dos Estados Unidos."
        ],
        [
            "Fronteiras",
            "Faz fronteira com Costa Rica e Colômbia."
        ],
        [
            "Área",
            "Seu território tem aproximadamente 75 mil km²."
        ]
    ]
}
];

    const specialLocations = [
    {
        "name": "Groenlândia",
        "aliases": [
            "Greenland",
            "Kalaallit Nunaat"
        ],
        "kind": "território/região de status especial",
        "hints": [
            [
                "Localização",
                "No Atlântico Norte, entre o Canadá e a Europa, grande parte da ilha fica dentro do Círculo Polar Ártico."
            ],
            [
                "Status político",
                "É um território autônomo dentro do Reino da Dinamarca; defesa e política externa continuam ligadas ao reino."
            ],
            [
                "História",
                "A administração colonial dinamarquesa foi substituída por autonomia interna em 1979; o autogoverno foi ampliado em 2009."
            ],
            [
                "Economia",
                "A pesca, especialmente de camarão e peixe, tem papel central; minerais também despertam interesse."
            ],
            [
                "Cultura",
                "A cultura kalaallisut combina tradições inuítes com influências nórdicas e árticas."
            ],
            [
                "Natureza e patrimônio",
                "A camada de gelo cobre a maior parte da ilha e os fiordes abrigam paisagens glaciais espetaculares."
            ],
            [
                "Sede administrativa",
                "Nuuk é a capital e principal centro urbano."
            ],
            [
                "Idiomas",
                "O groenlandês é a língua principal; o dinamarquês também é utilizado."
            ],
            [
                "Moeda",
                "A coroa dinamarquesa é a moeda em circulação."
            ],
            [
                "Pista marcante",
                "Ilha imensa, com cerca de 2,17 milhões de km², a maior do mundo que não é considerada um continente."
            ],
            [
                "Área aproximada",
                "A costa oeste reúne a maior parte dos assentamentos permanentes."
            ]
        ]
    },
    {
        "name": "Porto Rico",
        "aliases": [
            "Puerto Rico",
            "Commonwealth of Puerto Rico"
        ],
        "kind": "território/região de status especial",
        "hints": [
            [
                "Localização",
                "É um arquipélago do Caribe, a leste da República Dominicana e a oeste das Ilhas Virgens."
            ],
            [
                "Status político",
                "É um território não incorporado dos Estados Unidos com governo local e status político debatido."
            ],
            [
                "História",
                "Passou da administração espanhola para a dos Estados Unidos em 1898, após a Guerra Hispano-Americana."
            ],
            [
                "Economia",
                "A indústria farmacêutica, os serviços, a manufatura e o turismo são setores importantes."
            ],
            [
                "Cultura",
                "A cultura porto-riquenha combina raízes taínas, africanas e espanholas; salsa e reggaeton têm projeção internacional."
            ],
            [
                "Natureza e patrimônio",
                "A floresta tropical El Yunque e baías bioluminescentes são destaques naturais."
            ],
            [
                "Sede administrativa",
                "San Juan é a capital e possui um centro histórico fortificado."
            ],
            [
                "Idiomas",
                "Espanhol e inglês são idiomas oficiais; o espanhol predomina no cotidiano."
            ],
            [
                "Moeda",
                "O dólar dos Estados Unidos é a moeda."
            ],
            [
                "Pista marcante",
                "A ilha principal integra o arco das Grandes Antilhas."
            ],
            [
                "Área aproximada",
                "Tem cerca de 9 mil km² de área terrestre."
            ]
        ]
    },
    {
        "name": "Hong Kong",
        "aliases": [
            "Hong Kong SAR",
            "Região Administrativa Especial de Hong Kong"
        ],
        "kind": "território/região de status especial",
        "hints": [
            [
                "Localização",
                "Fica na costa meridional da China, junto ao estuário do rio das Pérolas e ao mar do Sul da China."
            ],
            [
                "Status político",
                "É uma Região Administrativa Especial da China, com sistemas jurídico e econômico próprios em várias áreas."
            ],
            [
                "História",
                "A soberania foi transferida do Reino Unido para a China em 1º de julho de 1997."
            ],
            [
                "Economia",
                "Finanças, comércio, logística e serviços profissionais ligam o território aos mercados globais."
            ],
            [
                "Cultura",
                "A cultura local combina tradições cantonesas com influências britânicas e internacionais."
            ],
            [
                "Natureza e patrimônio",
                "A paisagem reúne um porto natural, montanhas costeiras, ilhas e áreas de conservação."
            ],
            [
                "Sede administrativa",
                "A região não possui capital separada; Victoria é o nome histórico do núcleo urbano central."
            ],
            [
                "Idiomas",
                "Chinês e inglês são idiomas oficiais; cantonês é amplamente falado."
            ],
            [
                "Moeda",
                "O dólar de Hong Kong é a moeda local."
            ],
            [
                "Pista marcante",
                "O princípio de 'um país, dois sistemas' marcou o arranjo político após 1997."
            ],
            [
                "Área aproximada",
                "Tem pouco mais de 1.100 km² de área terrestre."
            ]
        ]
    },
    {
        "name": "Macau",
        "aliases": [
            "Macao",
            "Região Administrativa Especial de Macau"
        ],
        "kind": "território/região de status especial",
        "hints": [
            [
                "Localização",
                "Fica no delta do rio das Pérolas, na costa meridional da China, ao lado de Zhuhai e perto de Hong Kong."
            ],
            [
                "Status político",
                "É uma Região Administrativa Especial da China com autonomia em vários assuntos internos."
            ],
            [
                "História",
                "Portugal transferiu a administração para a China em 20 de dezembro de 1999."
            ],
            [
                "Economia",
                "Turismo, hotelaria, convenções e jogos de fortuna e azar dominam a economia local."
            ],
            [
                "Cultura",
                "A herança chinesa e portuguesa aparece na arquitetura, gastronomia e no patrimônio histórico."
            ],
            [
                "Natureza e patrimônio",
                "O Centro Histórico de Macau preserva praças, igrejas e edifícios associados ao encontro sino-português."
            ],
            [
                "Sede administrativa",
                "A Península de Macau é o núcleo histórico e administrativo."
            ],
            [
                "Idiomas",
                "Chinês e português são idiomas oficiais; cantonês é muito utilizado."
            ],
            [
                "Moeda",
                "A pataca macaense é a moeda local."
            ],
            [
                "Pista marcante",
                "O território é composto pela península e por ilhas ligadas por aterros, incluindo Cotai."
            ],
            [
                "Área aproximada",
                "Sua área terrestre é de cerca de 33 km²."
            ]
        ]
    },
    {
        "name": "Ilhas Faroé",
        "aliases": [
            "Faroe Islands",
            "Faroes",
            "Føroyar"
        ],
        "kind": "território/região de status especial",
        "hints": [
            [
                "Localização",
                "É um arquipélago do Atlântico Norte, entre a Islândia, a Noruega e as ilhas britânicas."
            ],
            [
                "Status político",
                "É um território autônomo dentro do Reino da Dinamarca, com amplos poderes internos."
            ],
            [
                "História",
                "O autogoverno moderno foi estabelecido em 1948."
            ],
            [
                "Economia",
                "Pesca, aquicultura e serviços marítimos são pilares econômicos."
            ],
            [
                "Cultura",
                "A língua faroesa e a música tradicional preservam uma identidade nórdica insular."
            ],
            [
                "Natureza e patrimônio",
                "Falésias, colônias de aves marinhas e colinas verdes dominam a paisagem."
            ],
            [
                "Sede administrativa",
                "Tórshavn é a capital."
            ],
            [
                "Idiomas",
                "Faroês e dinamarquês são utilizados oficialmente."
            ],
            [
                "Moeda",
                "A coroa dinamarquesa é a moeda, com notas faroesas próprias."
            ],
            [
                "Pista marcante",
                "O arquipélago reúne 18 ilhas principais, das quais a maioria é habitada."
            ],
            [
                "Área aproximada",
                "A área terrestre é de aproximadamente 1.400 km²."
            ]
        ]
    },
    {
        "name": "Saara Ocidental",
        "aliases": [
            "Western Sahara",
            "Sahara Ocidental",
            "República Árabe Saaraui Democrática",
            "RASD"
        ],
        "kind": "território/região de status especial",
        "hints": [
            [
                "Localização",
                "É um território desértico do noroeste africano com costa no Atlântico, ao sul de Marrocos."
            ],
            [
                "Status político",
                "Seu status é disputado: Marrocos controla a maior parte do território, enquanto a Frente Polisário reivindica a independência."
            ],
            [
                "História",
                "A Espanha encerrou sua administração colonial em 1975; o conflito sobre o status do território continua."
            ],
            [
                "Economia",
                "Pesca atlântica e fosfatos estão entre os recursos econômicos relevantes."
            ],
            [
                "Cultura",
                "A cultura saaraui tem tradições nômades do Saara e forte influência da língua hassânia."
            ],
            [
                "Natureza e patrimônio",
                "O deserto do Saara e a costa atlântica definem grande parte da paisagem."
            ],
            [
                "Sede administrativa",
                "El Aaiún (Laayoune) é a maior cidade e o principal centro urbano da área administrada por Marrocos."
            ],
            [
                "Idiomas",
                "Árabe, incluindo a variedade hassânia, é central na vida local; o espanhol também tem presença histórica."
            ],
            [
                "Moeda",
                "O dirham marroquino circula nas áreas administradas por Marrocos; a situação varia em zonas sob outros controles."
            ],
            [
                "Pista marcante",
                "A questão do território é tratada internacionalmente como um processo de descolonização não resolvido."
            ],
            [
                "Área aproximada",
                "A área reivindicada é de aproximadamente 266 mil km²."
            ]
        ]
    },
    {
        "name": "Somalilândia",
        "aliases": [
            "Somaliland",
            "República da Somalilândia"
        ],
        "kind": "território/região de status especial",
        "hints": [
            [
                "Localização",
                "Fica no Chifre da África, ao longo do golfo de Áden, entre Djibuti, Etiópia e Somália."
            ],
            [
                "Status político",
                "Administra-se de facto como uma entidade independente desde 1991, mas a maioria dos países a considera parte da Somália."
            ],
            [
                "História",
                "Declarou a restauração de sua independência em 1991, após o colapso do governo central somali."
            ],
            [
                "Economia",
                "Pecuária, comércio e o porto de Berbera são importantes para a economia."
            ],
            [
                "Cultura",
                "A língua somali, a poesia oral e as tradições pastorais têm grande importância cultural."
            ],
            [
                "Natureza e patrimônio",
                "A costa do golfo de Áden contrasta com planaltos áridos e áreas semidesérticas."
            ],
            [
                "Sede administrativa",
                "Hargeisa é a capital e principal centro populacional."
            ],
            [
                "Idiomas",
                "Somali e árabe são idiomas oficiais; o inglês também é usado em alguns contextos."
            ],
            [
                "Moeda",
                "O xelim da Somalilândia é utilizado localmente."
            ],
            [
                "Pista marcante",
                "As pinturas rupestres de Laas Geel são um patrimônio arqueológico importante."
            ],
            [
                "Área aproximada",
                "Sua área reivindicada é de cerca de 176 mil km²."
            ]
        ]
    },
    {
        "name": "Chipre do Norte",
        "aliases": [
            "Northern Cyprus",
            "República Turca de Chipre do Norte",
            "TRNC"
        ],
        "kind": "território/região de status especial",
        "hints": [
            [
                "Localização",
                "Ocupa a parte norte da ilha de Chipre, no Mediterrâneo oriental."
            ],
            [
                "Status político",
                "Autoproclamou-se república em 1983 e é reconhecido como Estado apenas pela Turquia; internacionalmente é tratado como parte da República de Chipre."
            ],
            [
                "História",
                "A divisão da ilha se consolidou após os acontecimentos de 1974."
            ],
            [
                "Economia",
                "Turismo, universidades, comércio e serviços são setores relevantes."
            ],
            [
                "Cultura",
                "A cultura local tem fortes ligações turco-cipriotas e mediterrâneas."
            ],
            [
                "Natureza e patrimônio",
                "As montanhas de Kyrenia e praias da costa norte marcam a paisagem."
            ],
            [
                "Sede administrativa",
                "A parte norte de Nicósia funciona como centro administrativo; Lefkoşa é o nome turco da cidade."
            ],
            [
                "Idiomas",
                "O turco é a língua oficial e mais amplamente utilizada."
            ],
            [
                "Moeda",
                "A lira turca é a moeda corrente."
            ],
            [
                "Pista marcante",
                "Nicósia é uma das últimas capitais europeias ainda divididas por uma zona-tampão."
            ],
            [
                "Área aproximada",
                "Administra aproximadamente um terço da ilha de Chipre."
            ]
        ]
    },
    {
        "name": "Curaçao",
        "aliases": [
            "Curacao",
            "Country of Curaçao"
        ],
        "kind": "território/região de status especial",
        "hints": [
            [
                "Localização",
                "É uma ilha do sul do Caribe, ao largo da costa da Venezuela, integrante das ilhas ABC."
            ],
            [
                "Status político",
                "É um país constituinte do Reino dos Países Baixos, com governo próprio para assuntos internos."
            ],
            [
                "História",
                "Obteve status de país autônomo dentro do Reino dos Países Baixos em 2010."
            ],
            [
                "Economia",
                "Turismo, serviços financeiros, comércio e atividades portuárias sustentam a economia."
            ],
            [
                "Cultura",
                "Papiamentu, música local e uma herança africana, neerlandesa e latino-caribenha são marcas culturais."
            ],
            [
                "Natureza e patrimônio",
                "A ilha é relativamente árida e tem recifes de coral, enseadas e praias."
            ],
            [
                "Sede administrativa",
                "Willemstad é a capital e seu centro histórico colorido é patrimônio mundial."
            ],
            [
                "Idiomas",
                "Papiamentu, neerlandês e inglês são amplamente usados; o espanhol também é comum."
            ],
            [
                "Moeda",
                "O florim caribenho é moeda legal desde 31 de março de 2025."
            ],
            [
                "Pista marcante",
                "A ilha fica a curta distância marítima da Venezuela, mas integra o Reino dos Países Baixos."
            ],
            [
                "Área aproximada",
                "A área terrestre é de aproximadamente 444 km²."
            ]
        ]
    },
    {
        "name": "Aruba",
        "aliases": [
            "Country of Aruba"
        ],
        "kind": "território/região de status especial",
        "hints": [
            [
                "Localização",
                "É uma ilha do sul do Caribe, ao norte da Venezuela e a oeste de Curaçao."
            ],
            [
                "Status político",
                "É um país constituinte autônomo dentro do Reino dos Países Baixos."
            ],
            [
                "História",
                "Obteve status separado de autonomia interna em 1986."
            ],
            [
                "Economia",
                "Turismo, serviços e refino de petróleo historicamente tiveram importância econômica."
            ],
            [
                "Cultura",
                "Papiamento e neerlandês refletem uma identidade caribenha com influências europeias e latino-americanas."
            ],
            [
                "Natureza e patrimônio",
                "Paisagens secas, cactos, formações rochosas e praias de areia clara são características locais."
            ],
            [
                "Sede administrativa",
                "Oranjestad é a capital."
            ],
            [
                "Idiomas",
                "Papiamento e neerlandês são idiomas oficiais; inglês e espanhol também são comuns."
            ],
            [
                "Moeda",
                "O florim arubano é a moeda."
            ],
            [
                "Pista marcante",
                "Aruba, Bonaire e Curaçao são frequentemente agrupadas como ilhas ABC."
            ],
            [
                "Área aproximada",
                "A área terrestre é de aproximadamente 180 km²."
            ]
        ]
    },
    {
        "name": "Guiana Francesa",
        "aliases": [
            "French Guiana",
            "Guyane française"
        ],
        "kind": "território/região de status especial",
        "hints": [
            [
                "Localização",
                "Fica no nordeste da América do Sul, entre Suriname e Brasil, com litoral atlântico."
            ],
            [
                "Status político",
                "É um departamento e uma região ultramarina da França, portanto parte da União Europeia."
            ],
            [
                "História",
                "A escravidão foi abolida na colônia francesa em 1848; a ligação administrativa com a França permanece."
            ],
            [
                "Economia",
                "Setor público, serviços, pesca e atividades ligadas ao centro espacial de Kourou têm destaque."
            ],
            [
                "Cultura",
                "A sociedade reúne comunidades crioulas, ameríndias, marrons, europeias e de outras origens."
            ],
            [
                "Natureza e patrimônio",
                "A floresta amazônica cobre grande parte do território."
            ],
            [
                "Sede administrativa",
                "Caiena é a capital e principal centro urbano."
            ],
            [
                "Idiomas",
                "O francês é oficial; línguas crioulas e indígenas também são faladas."
            ],
            [
                "Moeda",
                "O euro é a moeda."
            ],
            [
                "Pista marcante",
                "O Centro Espacial da Guiana, em Kourou, é uma base importante para lançamentos europeus."
            ],
            [
                "Área aproximada",
                "A área é de cerca de 83.500 km²."
            ]
        ]
    },
    {
        "name": "Nova Caledônia",
        "aliases": [
            "New Caledonia",
            "Nouvelle-Calédonie"
        ],
        "kind": "território/região de status especial",
        "hints": [
            [
                "Localização",
                "É um arquipélago do sudoeste do Pacífico, a leste da Austrália e a oeste de Fiji."
            ],
            [
                "Status político",
                "É uma coletividade francesa de status especial, com debate político sobre independência."
            ],
            [
                "História",
                "Os acordos de Matignon (1988) e Nouméa (1998) estruturaram um processo de autonomia; referendos de independência ocorreram entre 2018 e 2021."
            ],
            [
                "Economia",
                "A extração e o processamento de níquel têm importância econômica, junto com serviços e turismo."
            ],
            [
                "Cultura",
                "A cultura kanak indígena convive com comunidades de origem europeia e de outras ilhas do Pacífico."
            ],
            [
                "Natureza e patrimônio",
                "A lagoa e os recifes que circundam o arquipélago são reconhecidos como patrimônio mundial."
            ],
            [
                "Sede administrativa",
                "Nouméa é a capital."
            ],
            [
                "Idiomas",
                "O francês é oficial e dezenas de línguas kanak são faladas."
            ],
            [
                "Moeda",
                "O franco CFP é a moeda."
            ],
            [
                "Pista marcante",
                "O território é conhecido por grandes reservas de níquel."
            ],
            [
                "Área aproximada",
                "A área terrestre é de aproximadamente 18.600 km²."
            ]
        ]
    },
    {
        "name": "Ilhas Cook",
        "aliases": [
            "Cook Islands",
            "Kuki Airani"
        ],
        "kind": "território/região de status especial",
        "hints": [
            [
                "Localização",
                "É um arquipélago da Polinésia, entre Samoa Americana e a Polinésia Francesa, no Pacífico Sul."
            ],
            [
                "Status político",
                "É um Estado autogovernado em livre associação com a Nova Zelândia."
            ],
            [
                "História",
                "O autogoverno em livre associação começou em 4 de agosto de 1965."
            ],
            [
                "Economia",
                "Turismo, pérolas negras, agricultura e remessas têm importância econômica."
            ],
            [
                "Cultura",
                "A língua maori das Ilhas Cook, a dança e a navegação polinésia são elementos culturais centrais."
            ],
            [
                "Natureza e patrimônio",
                "Recifes, lagoas e ilhas vulcânicas e baixas formam paisagens variadas."
            ],
            [
                "Sede administrativa",
                "Avarua, na ilha de Rarotonga, é a capital."
            ],
            [
                "Idiomas",
                "Inglês e maori das Ilhas Cook são utilizados oficialmente."
            ],
            [
                "Moeda",
                "O dólar neozelandês circula junto com moedas locais."
            ],
            [
                "Pista marcante",
                "O arquipélago é formado por 15 ilhas espalhadas por uma vasta zona marítima."
            ],
            [
                "Área aproximada",
                "A área terrestre total é de aproximadamente 240 km²."
            ]
        ]
    },
    {
        "name": "Niue",
        "aliases": [
            "Niuē"
        ],
        "kind": "território/região de status especial",
        "hints": [
            [
                "Localização",
                "É uma ilha elevada de coral na Polinésia, a leste de Tonga e a nordeste da Nova Zelândia."
            ],
            [
                "Status político",
                "É um Estado autogovernado em livre associação com a Nova Zelândia."
            ],
            [
                "História",
                "Escolheu o autogoverno em livre associação em 1974."
            ],
            [
                "Economia",
                "A agricultura de pequena escala, os serviços públicos e o turismo sustentam a economia."
            ],
            [
                "Cultura",
                "A língua niueana e as tradições polinésias permanecem importantes para a identidade local."
            ],
            [
                "Natureza e patrimônio",
                "É um dos maiores atóis elevados de coral do mundo, com cavernas e falésias costeiras."
            ],
            [
                "Sede administrativa",
                "Alofi é o centro administrativo."
            ],
            [
                "Idiomas",
                "Niueano e inglês são utilizados oficialmente."
            ],
            [
                "Moeda",
                "O dólar neozelandês é a moeda."
            ],
            [
                "Pista marcante",
                "A Nova Zelândia presta assistência acordada em questões de defesa e relações externas."
            ],
            [
                "Área aproximada",
                "A ilha tem aproximadamente 260 km²."
            ]
        ]
    },
    {
        "name": "Guam",
        "aliases": [
            "Guåhan"
        ],
        "kind": "território/região de status especial",
        "hints": [
            [
                "Localização",
                "É uma ilha das Marianas, no Pacífico ocidental, ao norte da Papua-Nova Guiné e a leste das Filipinas."
            ],
            [
                "Status político",
                "É um território não incorporado dos Estados Unidos."
            ],
            [
                "História",
                "Passou da administração espanhola para a norte-americana em 1898; esteve sob ocupação japonesa durante a Segunda Guerra Mundial."
            ],
            [
                "Economia",
                "Instalações militares, turismo e serviços são importantes para a economia."
            ],
            [
                "Cultura",
                "A cultura chamorro é indígena da ilha e tem tradições próprias de língua, culinária e navegação."
            ],
            [
                "Natureza e patrimônio",
                "Recifes de coral, praias e falésias de calcário formam a paisagem costeira."
            ],
            [
                "Sede administrativa",
                "Hagåtña é a capital administrativa."
            ],
            [
                "Idiomas",
                "Inglês e chamorro são idiomas oficiais."
            ],
            [
                "Moeda",
                "O dólar dos Estados Unidos é a moeda."
            ],
            [
                "Pista marcante",
                "A posição estratégica no Pacífico ocidental tornou Guam importante para operações militares e rotas marítimas."
            ],
            [
                "Área aproximada",
                "A ilha tem cerca de 540 km²."
            ]
        ]
    },
    {
        "name": "Gibraltar",
        "aliases": [
            "Rock of Gibraltar"
        ],
        "kind": "território/região de status especial",
        "hints": [
            [
                "Localização",
                "É um pequeno território na extremidade sul da Península Ibérica, junto ao estreito que liga o Atlântico ao Mediterrâneo."
            ],
            [
                "Status político",
                "É um Território Ultramarino Britânico; a soberania é reivindicada pela Espanha."
            ],
            [
                "História",
                "A Espanha cedeu Gibraltar à Grã-Bretanha no Tratado de Utrecht de 1713."
            ],
            [
                "Economia",
                "Serviços financeiros, turismo, transporte marítimo e atividades portuárias são importantes."
            ],
            [
                "Cultura",
                "A vida local combina influências britânicas, espanholas e mediterrâneas; o uso de Llanito é característico."
            ],
            [
                "Natureza e patrimônio",
                "O Rochedo de Gibraltar abriga macacos-da-berbéria e cavernas calcárias."
            ],
            [
                "Sede administrativa",
                "A cidade de Gibraltar é o principal centro urbano e administrativo."
            ],
            [
                "Idiomas",
                "O inglês é oficial; espanhol e Llanito são amplamente usados."
            ],
            [
                "Moeda",
                "A libra de Gibraltar é emitida localmente e tem paridade com a libra esterlina."
            ],
            [
                "Pista marcante",
                "O estreito próximo é uma das passagens marítimas estratégicas mais importantes do mundo."
            ],
            [
                "Área aproximada",
                "O território tem cerca de 6,8 km²."
            ]
        ]
    },
    {
        "name": "Bermudas",
        "aliases": [
            "Bermuda",
            "Bermuda Islands"
        ],
        "kind": "território/região de status especial",
        "hints": [
            [
                "Localização",
                "É um arquipélago do Atlântico Norte, a leste da costa dos Estados Unidos e distante do Caribe."
            ],
            [
                "Status político",
                "É um Território Ultramarino Britânico com governo interno próprio."
            ],
            [
                "História",
                "O povoamento inglês permanente começou em 1612."
            ],
            [
                "Economia",
                "Seguros, resseguros, serviços financeiros e turismo são setores centrais."
            ],
            [
                "Cultura",
                "A cultura mistura heranças britânicas, africanas e atlânticas; o cricket é popular."
            ],
            [
                "Natureza e patrimônio",
                "Recifes de coral, praias e naufrágios subaquáticos caracterizam as águas ao redor."
            ],
            [
                "Sede administrativa",
                "Hamilton é a capital."
            ],
            [
                "Idiomas",
                "O inglês é a língua predominante."
            ],
            [
                "Moeda",
                "O dólar bermudense é atrelado ao dólar dos Estados Unidos."
            ],
            [
                "Pista marcante",
                "Apesar do nome, Bermudas não são parte geográfica do Caribe."
            ],
            [
                "Área aproximada",
                "A área terrestre total é de cerca de 54 km²."
            ]
        ]
    },
    {
        "name": "Reunião",
        "aliases": [
            "Réunion",
            "La Réunion"
        ],
        "kind": "território/região de status especial",
        "hints": [
            [
                "Localização",
                "É uma ilha vulcânica do oceano Índico, a leste de Madagascar e a sudoeste de Maurício."
            ],
            [
                "Status político",
                "É um departamento e uma região ultramarina da França."
            ],
            [
                "História",
                "Tornou-se departamento ultramarino francês em 1946."
            ],
            [
                "Economia",
                "Serviços, agricultura, açúcar e turismo são setores importantes."
            ],
            [
                "Cultura",
                "A cultura reúne influências africanas, malgaxes, indianas, chinesas e europeias; o crioulo reunionês é muito falado."
            ],
            [
                "Natureza e patrimônio",
                "Piton de la Fournaise é um dos vulcões mais ativos do mundo; os circos montanhosos têm grande valor natural."
            ],
            [
                "Sede administrativa",
                "Saint-Denis é a capital."
            ],
            [
                "Idiomas",
                "O francês é oficial e o crioulo reunionês é comum no cotidiano."
            ],
            [
                "Moeda",
                "O euro é a moeda."
            ],
            [
                "Pista marcante",
                "Piton des Neiges é a montanha mais alta da ilha."
            ],
            [
                "Área aproximada",
                "A área é de aproximadamente 2.500 km²."
            ]
        ]
    },
    {
        "name": "Ilhas Malvinas",
        "aliases": [
            "Falkland Islands",
            "Falklands",
            "Malvinas"
        ],
        "kind": "território/região de status especial",
        "hints": [
            [
                "Localização",
                "É um arquipélago do Atlântico Sul, a leste da extremidade sul da América do Sul."
            ],
            [
                "Status político",
                "É um Território Ultramarino Britânico; a Argentina reivindica a soberania."
            ],
            [
                "História",
                "Uma guerra entre Argentina e Reino Unido ocorreu em 1982 após a ocupação argentina das ilhas."
            ],
            [
                "Economia",
                "Pesca, criação de ovelhas e turismo são os setores econômicos tradicionais."
            ],
            [
                "Cultura",
                "A vida comunitária é pequena e marcada por tradições britânicas e atividades ligadas ao mar."
            ],
            [
                "Natureza e patrimônio",
                "Colônias de pinguins, albatrozes e leões-marinhos são atrações naturais."
            ],
            [
                "Sede administrativa",
                "Stanley é a capital e principal assentamento."
            ],
            [
                "Idiomas",
                "O inglês é a língua oficial e predominante."
            ],
            [
                "Moeda",
                "A libra das Malvinas circula com valor equivalente à libra esterlina."
            ],
            [
                "Pista marcante",
                "A soberania do arquipélago permanece uma disputa diplomática entre Reino Unido e Argentina."
            ],
            [
                "Área aproximada",
                "A área terrestre é de cerca de 12.200 km²."
            ]
        ]
    },
    {
        "name": "Svalbard",
        "aliases": [
            "Spitsbergen"
        ],
        "kind": "território/região de status especial",
        "hints": [
            [
                "Localização",
                "É um arquipélago do Ártico, ao norte da Noruega continental e bem acima do Círculo Polar Ártico."
            ],
            [
                "Status político",
                "Está sob soberania norueguesa, com regras específicas estabelecidas pelo Tratado de Svalbard de 1920."
            ],
            [
                "História",
                "O tratado internacional que reconheceu a soberania norueguesa entrou em vigor em 1925."
            ],
            [
                "Economia",
                "A mineração de carvão teve importância histórica; hoje pesquisa, turismo e serviços polares têm destaque."
            ],
            [
                "Cultura",
                "A presença humana é pequena e internacional, influenciada por pesquisa polar e atividades árticas."
            ],
            [
                "Natureza e patrimônio",
                "Geleiras, tundra e ursos-polares caracterizam a paisagem."
            ],
            [
                "Sede administrativa",
                "Longyearbyen é o principal assentamento."
            ],
            [
                "Idiomas",
                "O norueguês é usado oficialmente; a comunidade de pesquisa é internacional."
            ],
            [
                "Moeda",
                "A coroa norueguesa é a moeda."
            ],
            [
                "Pista marcante",
                "O Tratado de Svalbard dá a cidadãos de países signatários certos direitos econômicos sob suas regras."
            ],
            [
                "Área aproximada",
                "A área terrestre do arquipélago é de cerca de 61 mil km²."
            ]
        ]
    },
    {
        "name": "Martinica",
        "aliases": [
            "Martinique"
        ],
        "kind": "território/região de status especial",
        "hints": [
            [
                "Localização",
                "É uma ilha das Pequenas Antilhas, no Caribe oriental, ao norte de Santa Lúcia."
            ],
            [
                "Status político",
                "É um departamento e uma região ultramarina da França."
            ],
            [
                "História",
                "A escravidão foi abolida em 1848; a ilha tornou-se departamento francês em 1946."
            ],
            [
                "Economia",
                "Serviços, turismo, agricultura de banana e produção de rum têm importância econômica."
            ],
            [
                "Cultura",
                "A cultura crioula martinicana combina influências africanas, francesas e caribenhas."
            ],
            [
                "Natureza e patrimônio",
                "O vulcão Montagne Pelée entrou em erupção em 1902 e destruiu Saint-Pierre."
            ],
            [
                "Sede administrativa",
                "Fort-de-France é a capital."
            ],
            [
                "Idiomas",
                "O francês é oficial e o crioulo martinicano é amplamente falado."
            ],
            [
                "Moeda",
                "O euro é a moeda."
            ],
            [
                "Pista marcante",
                "A ilha faz parte da União Europeia por seu status administrativo francês."
            ],
            [
                "Área aproximada",
                "A área terrestre é de cerca de 1.128 km²."
            ]
        ]
    },
    {
        "name": "Guadalupe",
        "aliases": [
            "Guadeloupe"
        ],
        "kind": "território/região de status especial",
        "hints": [
            [
                "Localização",
                "É um arquipélago das Pequenas Antilhas, no Caribe oriental, entre Dominica e Montserrat."
            ],
            [
                "Status político",
                "É um departamento e uma região ultramarina da França."
            ],
            [
                "História",
                "A ilha foi colonizada pela França no século XVII e tornou-se departamento francês em 1946."
            ],
            [
                "Economia",
                "Turismo, serviços, cana-de-açúcar, rum e agricultura são setores importantes."
            ],
            [
                "Cultura",
                "O crioulo guadalupense, a música gwoka e tradições afro-caribenhas formam uma identidade cultural marcante."
            ],
            [
                "Natureza e patrimônio",
                "O vulcão La Soufrière, florestas tropicais e recifes são destaques naturais."
            ],
            [
                "Sede administrativa",
                "Basse-Terre é a capital administrativa; Pointe-à-Pitre é o principal centro comercial."
            ],
            [
                "Idiomas",
                "O francês é oficial e o crioulo guadalupense é muito falado."
            ],
            [
                "Moeda",
                "O euro é a moeda."
            ],
            [
                "Pista marcante",
                "O formato das duas principais ilhas lembra uma borboleta."
            ],
            [
                "Área aproximada",
                "A área terrestre combinada é de cerca de 1.630 km²."
            ]
        ]
    },
    {
        "name": "Polinésia Francesa",
        "aliases": [
            "French Polynesia",
            "Polynésie française"
        ],
        "kind": "território/região de status especial",
        "hints": [
            [
                "Localização",
                "É um vasto conjunto de ilhas do Pacífico Sul, incluindo o Taiti e Bora Bora."
            ],
            [
                "Status político",
                "É uma coletividade ultramarina autônoma da França."
            ],
            [
                "História",
                "A França passou a realizar testes nucleares em Mururoa e Fangataufa na década de 1960; os testes terminaram em 1996."
            ],
            [
                "Economia",
                "Turismo, pérolas negras, pesca e serviços sustentam a economia."
            ],
            [
                "Cultura",
                "As culturas taitiana e de outras ilhas polinésias mantêm tradições de dança, tatuagem e navegação."
            ],
            [
                "Natureza e patrimônio",
                "Lagoas azul-turquesa, atóis e ilhas vulcânicas compõem paisagens diversas."
            ],
            [
                "Sede administrativa",
                "Papeete, no Taiti, é a capital."
            ],
            [
                "Idiomas",
                "O francês e o taitiano estão entre as línguas mais usadas; outras línguas polinésias também são faladas."
            ],
            [
                "Moeda",
                "O franco CFP é a moeda."
            ],
            [
                "Pista marcante",
                "O território abrange cerca de 118 ilhas e atóis distribuídos por uma grande área oceânica."
            ],
            [
                "Área aproximada",
                "A área terrestre total é de pouco mais de 4.000 km²."
            ]
        ]
    },
    {
        "name": "Transnístria",
        "aliases": [
            "Transnistria",
            "Pridnestrovie",
            "República Moldava Pridnestroviana"
        ],
        "kind": "território/região de status especial",
        "hints": [
            [
                "Localização",
                "É uma faixa de território no leste da Moldávia, principalmente entre o rio Dniester e a fronteira com a Ucrânia."
            ],
            [
                "Status político",
                "É uma entidade de facto autogovernada, mas internacionalmente reconhecida como parte da Moldávia."
            ],
            [
                "História",
                "Declarou-se separada da Moldávia em 1990; o conflito armado de 1992 terminou com um cessar-fogo."
            ],
            [
                "Economia",
                "Indústria pesada, energia, manufatura e comércio regional são setores importantes."
            ],
            [
                "Cultura",
                "A população inclui comunidades de língua russa, moldava/romena e ucraniana."
            ],
            [
                "Natureza e patrimônio",
                "O rio Dniester atravessa a região e dá origem ao nome pelo qual é conhecida internacionalmente."
            ],
            [
                "Sede administrativa",
                "Tiraspol é o principal centro administrativo."
            ],
            [
                "Idiomas",
                "Russo, moldavo/romeno e ucraniano têm status oficial local."
            ],
            [
                "Moeda",
                "O rublo transnistriano é a moeda local."
            ],
            [
                "Pista marcante",
                "O status político não é reconhecido como independência por membros da ONU."
            ],
            [
                "Área aproximada",
                "A área é de aproximadamente 4.100 km²."
            ]
        ]
    },
    {
        "name": "Sint Maarten",
        "aliases": [
            "Sint Maarten",
            "Saint Martin Dutch part"
        ],
        "kind": "território/região de status especial",
        "hints": [
            [
                "Localização",
                "Ocupa a parte sul da ilha de São Martinho, no nordeste do Caribe; a parte norte é Saint-Martin, francesa."
            ],
            [
                "Status político",
                "É um país constituinte autônomo dentro do Reino dos Países Baixos."
            ],
            [
                "História",
                "Obteve status de país constituinte em 10 de outubro de 2010."
            ],
            [
                "Economia",
                "Turismo, cruzeiros, serviços e comércio são os principais setores."
            ],
            [
                "Cultura",
                "A sociedade combina influências neerlandesas, francesas, caribenhas e de comunidades migrantes."
            ],
            [
                "Natureza e patrimônio",
                "Praias, lagoas e recifes são atrações naturais; o aeroporto Princess Juliana é conhecido pela aproximação sobre a praia de Maho."
            ],
            [
                "Sede administrativa",
                "Philipsburg é a capital."
            ],
            [
                "Idiomas",
                "O neerlandês e o inglês são oficiais; o inglês é amplamente usado."
            ],
            [
                "Moeda",
                "O florim caribenho é moeda legal desde 2025."
            ],
            [
                "Pista marcante",
                "A ilha é dividida por uma fronteira internacional aberta entre Sint Maarten e Saint-Martin."
            ],
            [
                "Área aproximada",
                "A parte neerlandesa possui cerca de 34 km²."
            ]
        ]
    },
    {
        "name": "Jersey",
        "aliases": [
            "Bailiwick of Jersey"
        ],
        "kind": "território/região de status especial",
        "hints": [
            [
                "Localização",
                "É uma ilha no Canal da Mancha, perto da costa da Normandia, entre França e Inglaterra."
            ],
            [
                "Status político",
                "É uma dependência da Coroa Britânica, não parte do Reino Unido nem uma colônia britânica."
            ],
            [
                "História",
                "A ocupação alemã durante a Segunda Guerra Mundial durou de 1940 a 1945."
            ],
            [
                "Economia",
                "Finanças, serviços e turismo são importantes para a economia."
            ],
            [
                "Cultura",
                "A herança normanda aparece no nome de lugares e no jèrriais, língua tradicional relacionada ao normando."
            ],
            [
                "Natureza e patrimônio",
                "Falésias, praias e castelos costeiros caracterizam a ilha."
            ],
            [
                "Sede administrativa",
                "Saint Helier é a capital."
            ],
            [
                "Idiomas",
                "O inglês é predominante; o francês e o jèrriais também têm presença histórica e oficial em determinados contextos."
            ],
            [
                "Moeda",
                "A libra de Jersey circula em paridade com a libra esterlina."
            ],
            [
                "Pista marcante",
                "A ilha possui instituições próprias, incluindo parlamento e sistema jurídico."
            ],
            [
                "Área aproximada",
                "Tem cerca de 118 km²."
            ]
        ]
    },
    {
        "name": "Ilha de Man",
        "aliases": [
            "Isle of Man",
            "Mann"
        ],
        "kind": "território/região de status especial",
        "hints": [
            [
                "Localização",
                "Fica no mar da Irlanda, entre a Grã-Bretanha e a Irlanda."
            ],
            [
                "Status político",
                "É uma dependência autônoma da Coroa Britânica, não parte do Reino Unido."
            ],
            [
                "História",
                "A ilha possui instituições legislativas próprias há séculos; Tynwald é uma das assembleias parlamentares mais antigas em funcionamento."
            ],
            [
                "Economia",
                "Serviços financeiros, comércio eletrônico, turismo e manufatura especializada são setores relevantes."
            ],
            [
                "Cultura",
                "A língua manesa é uma língua celta que passou por revitalização, ao lado do inglês."
            ],
            [
                "Natureza e patrimônio",
                "Paisagens costeiras, colinas e o litoral rochoso marcam a ilha."
            ],
            [
                "Sede administrativa",
                "Douglas é a capital."
            ],
            [
                "Idiomas",
                "O inglês é predominante; o manês é língua histórica e revitalizada."
            ],
            [
                "Moeda",
                "A libra manesa é emitida localmente e circula em paridade com a libra esterlina."
            ],
            [
                "Pista marcante",
                "A corrida de motociclismo Tourist Trophy é um evento internacionalmente conhecido."
            ],
            [
                "Área aproximada",
                "A ilha tem cerca de 572 km²."
            ]
        ]
    },
    {
        "name": "Guernsey",
        "aliases": [
            "Bailiwick of Guernsey"
        ],
        "kind": "território/região de status especial",
        "hints": [
            [
                "Localização",
                "É uma ilha no Canal da Mancha, próxima à Normandia e a oeste de Jersey."
            ],
            [
                "Status político",
                "É uma dependência autônoma da Coroa Britânica, separada do Reino Unido."
            ],
            [
                "História",
                "Foi ocupada pela Alemanha durante a Segunda Guerra Mundial, entre 1940 e 1945."
            ],
            [
                "Economia",
                "Serviços financeiros, turismo e atividades marítimas são importantes."
            ],
            [
                "Cultura",
                "A língua guernesiais, relacionada ao normando, faz parte da herança cultural local."
            ],
            [
                "Natureza e patrimônio",
                "A costa apresenta baías, falésias e pequenas ilhas próximas."
            ],
            [
                "Sede administrativa",
                "Saint Peter Port é a capital."
            ],
            [
                "Idiomas",
                "O inglês é predominante; o francês e o guernesiais têm importância histórica."
            ],
            [
                "Moeda",
                "A libra esterlina circula junto com notas e moedas locais em paridade."
            ],
            [
                "Pista marcante",
                "O território inclui ilhas menores como Alderney, Sark e Herm em diferentes arranjos administrativos."
            ],
            [
                "Área aproximada",
                "A ilha principal tem cerca de 63 km²; a dependência como um todo é maior."
            ]
        ]
    },
    {
        "name": "Ilhas Åland",
        "aliases": [
            "Åland",
            "Aland Islands",
            "Ahvenanmaa"
        ],
        "kind": "território/região de status especial",
        "hints": [
            [
                "Localização",
                "É um arquipélago no mar Báltico, entre a Suécia e a Finlândia."
            ],
            [
                "Status político",
                "É uma região autônoma e desmilitarizada da Finlândia, com garantias internacionais para o idioma sueco."
            ],
            [
                "História",
                "A soberania finlandesa e o regime de autonomia foram confirmados internacionalmente em 1921."
            ],
            [
                "Economia",
                "Transporte marítimo, navegação, turismo e serviços têm papel econômico relevante."
            ],
            [
                "Cultura",
                "A língua e a cultura suecas predominam, embora a região pertença à Finlândia."
            ],
            [
                "Natureza e patrimônio",
                "Milhares de ilhas rochosas e canais marítimos formam uma paisagem báltica característica."
            ],
            [
                "Sede administrativa",
                "Mariehamn é a capital."
            ],
            [
                "Idiomas",
                "O sueco é o único idioma oficial regional."
            ],
            [
                "Moeda",
                "O euro é a moeda."
            ],
            [
                "Pista marcante",
                "A autonomia inclui parlamento e competências regionais próprias."
            ],
            [
                "Área aproximada",
                "O arquipélago possui aproximadamente 1.580 km² de terra."
            ]
        ]
    },
    {
        "name": "Ilhas Cayman",
        "aliases": [
            "Cayman Islands",
            "Cayman"
        ],
        "kind": "território/região de status especial",
        "hints": [
            [
                "Localização",
                "É um arquipélago do Caribe ocidental, ao sul de Cuba e a noroeste da Jamaica."
            ],
            [
                "Status político",
                "É um Território Ultramarino Britânico com governo interno próprio."
            ],
            [
                "História",
                "Foi administrado como dependência da Jamaica e tornou-se território separado quando a Jamaica se tornou independente em 1962."
            ],
            [
                "Economia",
                "Serviços financeiros internacionais e turismo são os principais setores econômicos."
            ],
            [
                "Cultura",
                "A cultura local combina tradições caribenhas e britânicas; pesca e navegação têm raízes históricas."
            ],
            [
                "Natureza e patrimônio",
                "Recifes, paredões de coral e vida marinha são atrações de mergulho."
            ],
            [
                "Sede administrativa",
                "George Town, na ilha de Grand Cayman, é a capital."
            ],
            [
                "Idiomas",
                "O inglês é o idioma oficial e predominante."
            ],
            [
                "Moeda",
                "O dólar das Ilhas Cayman é a moeda."
            ],
            [
                "Pista marcante",
                "Grand Cayman, Cayman Brac e Little Cayman formam o grupo principal de ilhas."
            ],
            [
                "Área aproximada",
                "A área terrestre total é de cerca de 264 km²."
            ]
        ]
    },
    {
        "name": "Bonaire",
        "aliases": [
            "Special Municipality of Bonaire"
        ],
        "kind": "território/região de status especial",
        "hints": [
            [
                "Localização",
                "É uma ilha do sul do Caribe, perto da costa venezuelana, ao norte da América do Sul."
            ],
            [
                "Status político",
                "É um município especial dos Países Baixos desde 2010."
            ],
            [
                "História",
                "Foi integrado à estrutura constitucional dos Países Baixos caribenhos após a dissolução das Antilhas Neerlandesas em 2010."
            ],
            [
                "Economia",
                "Turismo, mergulho, serviços e produção de sal têm destaque."
            ],
            [
                "Cultura",
                "Papiamentu, neerlandês e tradições caribenhas convivem na vida cotidiana."
            ],
            [
                "Natureza e patrimônio",
                "O parque marinho de Bonaire e seus recifes são conhecidos pela conservação e pelo mergulho."
            ],
            [
                "Sede administrativa",
                "Kralendijk é a capital e principal centro urbano."
            ],
            [
                "Idiomas",
                "Papiamentu e neerlandês são amplamente usados; inglês e espanhol também são comuns."
            ],
            [
                "Moeda",
                "O dólar dos Estados Unidos é a moeda."
            ],
            [
                "Pista marcante",
                "Bonaire, Aruba e Curaçao são conhecidas coletivamente como ilhas ABC, embora tenham status políticos diferentes."
            ],
            [
                "Área aproximada",
                "A área terrestre é de aproximadamente 294 km²."
            ]
        ]
    },
    {
        "name": "Açores",
        "aliases": [
            "Azores",
            "Região Autónoma dos Açores"
        ],
        "kind": "território/região de status especial",
        "hints": [
            [
                "Localização",
                "É um arquipélago português no Atlântico Norte, a oeste de Portugal continental."
            ],
            [
                "Status político",
                "É uma região autónoma de Portugal, com governo regional próprio."
            ],
            [
                "História",
                "Os povoamentos portugueses começaram no século XV."
            ],
            [
                "Economia",
                "Agricultura, laticínios, pesca, turismo e energia geotérmica têm importância econômica."
            ],
            [
                "Cultura",
                "A cultura açoriana está ligada às tradições marítimas, festas religiosas e emigração."
            ],
            [
                "Natureza e patrimônio",
                "Lagos vulcânicos, fontes termais e paisagens verdes resultam da origem vulcânica das ilhas."
            ],
            [
                "Sede administrativa",
                "Ponta Delgada, na ilha de São Miguel, é o principal centro administrativo e urbano."
            ],
            [
                "Idiomas",
                "O português é o idioma oficial."
            ],
            [
                "Moeda",
                "O euro é a moeda."
            ],
            [
                "Pista marcante",
                "O arquipélago tem nove ilhas principais, agrupadas em três conjuntos."
            ],
            [
                "Área aproximada",
                "A área terrestre combinada é de aproximadamente 2.300 km²."
            ]
        ]
    },
    {
        "name": "Madeira",
        "aliases": [
            "Madeira Islands",
            "Região Autónoma da Madeira"
        ],
        "kind": "território/região de status especial",
        "hints": [
            [
                "Localização",
                "É um arquipélago português no Atlântico, a sudoeste de Portugal continental e a oeste da costa africana."
            ],
            [
                "Status político",
                "É uma região autónoma de Portugal."
            ],
            [
                "História",
                "A colonização portuguesa começou no século XV e a ilha tornou-se importante nas rotas atlânticas."
            ],
            [
                "Economia",
                "Turismo, vinho da Madeira, serviços e agricultura são setores importantes."
            ],
            [
                "Cultura",
                "As tradições incluem o vinho fortificado, bordados, festas locais e a poncha."
            ],
            [
                "Natureza e patrimônio",
                "A floresta Laurissilva é patrimônio mundial e a ilha é marcada por montanhas íngremes."
            ],
            [
                "Sede administrativa",
                "Funchal é a capital."
            ],
            [
                "Idiomas",
                "O português é o idioma oficial."
            ],
            [
                "Moeda",
                "O euro é a moeda."
            ],
            [
                "Pista marcante",
                "O arquipélago inclui a ilha da Madeira, Porto Santo e grupos de ilhas desabitadas."
            ],
            [
                "Área aproximada",
                "A área terrestre total é de cerca de 800 km²."
            ]
        ]
    },
    {
        "name": "Ceuta",
        "aliases": [
            "Ciudad Autónoma de Ceuta"
        ],
        "kind": "território/região de status especial",
        "hints": [
            [
                "Localização",
                "É uma cidade autônoma espanhola na costa norte da África, junto ao estreito de Gibraltar."
            ],
            [
                "Status político",
                "É parte da Espanha, embora esteja geograficamente na África, e possui estatuto de cidade autônoma."
            ],
            [
                "História",
                "Sua história passou por administrações portuguesas e espanholas; Portugal transferiu o controle para a Espanha em 1668."
            ],
            [
                "Economia",
                "Comércio, serviços públicos, porto e turismo são relevantes para a economia local."
            ],
            [
                "Cultura",
                "A população reflete influências espanholas, árabes, amazigh e judaicas."
            ],
            [
                "Natureza e patrimônio",
                "O Monte Hacho, as muralhas reais e a posição costeira marcam a paisagem."
            ],
            [
                "Sede administrativa",
                "A própria cidade de Ceuta é o centro administrativo."
            ],
            [
                "Idiomas",
                "O espanhol é oficial; darija marroquina e tarifit também são falados."
            ],
            [
                "Moeda",
                "O euro é a moeda."
            ],
            [
                "Pista marcante",
                "Compartilha fronteira terrestre com Marrocos e é cercada pelo mar Mediterrâneo e pelo estreito de Gibraltar."
            ],
            [
                "Área aproximada",
                "A área terrestre é de cerca de 19 km²."
            ]
        ]
    },
    {
        "name": "Melilha",
        "aliases": [
            "Melilla"
        ],
        "kind": "território/região de status especial",
        "hints": [
            [
                "Localização",
                "É uma cidade autônoma espanhola na costa mediterrânea do norte da África, junto a Marrocos."
            ],
            [
                "Status político",
                "É parte da Espanha com estatuto de cidade autônoma, embora esteja no continente africano."
            ],
            [
                "História",
                "Está sob administração espanhola há séculos e tornou-se cidade autônoma em 1995."
            ],
            [
                "Economia",
                "Comércio, serviços, porto e administração pública têm importância local."
            ],
            [
                "Cultura",
                "A sociedade combina influências espanholas, amazigh, árabes e judaicas."
            ],
            [
                "Natureza e patrimônio",
                "As fortificações históricas e a arquitetura modernista distinguem o centro urbano."
            ],
            [
                "Sede administrativa",
                "A própria cidade de Melilha é o centro administrativo."
            ],
            [
                "Idiomas",
                "O espanhol é oficial; variedades amazigh e árabe também são faladas."
            ],
            [
                "Moeda",
                "O euro é a moeda."
            ],
            [
                "Pista marcante",
                "Faz fronteira terrestre com Marrocos e está na costa do Mediterrâneo."
            ],
            [
                "Área aproximada",
                "A área terrestre é de cerca de 12 km²."
            ]
        ]
    },
    {
        "name": "Caxemira",
        "aliases": [
            "Kashmir"
        ],
        "kind": "território/região de status especial",
        "hints": [
            [
                "Localização",
                "É uma região montanhosa do sul da Ásia, no entorno ocidental do Himalaia, entre Índia, Paquistão e China."
            ],
            [
                "Status político",
                "É uma região disputada e dividida por linhas de controle; não é um Estado soberano reconhecido internacionalmente."
            ],
            [
                "História",
                "A partição da Índia britânica em 1947 desencadeou uma disputa duradoura sobre a região."
            ],
            [
                "Economia",
                "Agricultura, artesanato, turismo e serviços são importantes em diferentes áreas."
            ],
            [
                "Cultura",
                "A região tem heranças culturais muçulmanas, hindus e budistas, além de tradições linguísticas diversas."
            ],
            [
                "Natureza e patrimônio",
                "O vale da Caxemira, os lagos e as montanhas do Himalaia compõem paisagens conhecidas."
            ],
            [
                "Sede administrativa",
                "Não há uma única capital regional aceita por todas as administrações; Srinagar e Muzaffarabad são centros importantes em partes distintas."
            ],
            [
                "Idiomas",
                "Caxemiri, urdu, hindi, dogri e outras línguas são utilizadas conforme a área administrada."
            ],
            [
                "Moeda",
                "Não há moeda própria regional: usam-se a rúpia indiana ou a rúpia paquistanesa conforme a administração."
            ],
            [
                "Pista marcante",
                "A Linha de Controle separa áreas administradas pela Índia e pelo Paquistão."
            ],
            [
                "Área aproximada",
                "Os limites e o status da região seguem contestados."
            ]
        ]
    }
];
    countries.push(...specialLocations);

    return countries;
})();
