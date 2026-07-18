import { Sermon, ChurchEvent, Leader, TimelineEvent } from './types';

export const DICTIONARY = {
  pt: {
    navHome: 'Início',
    navAbout: 'Sobre',
    navServices: 'Cultos',
    navSermons: 'Sermões',
    navEvents: 'Eventos',
    navContact: 'Contato',
    
    // Home View
    heroSub: 'Desde 1912 adorando a Deus, edificando os crentes e proclamando o evangelho ao mundo',
    heroBtnVisit: 'Venha nos Visitar',
    heroBtnSermons: 'Nossos Sermões',
    
    pastorTitle: 'Uma Mensagem do Nosso Pastor',
    pastorGreeting: 'Seja muito bem-vindo à nossa comunidade de fé!',
    pastorText1: 'É uma imensa alegria receber você, ainda que virtualmente, em nossa amada igreja. Há mais de um século, a Igreja Cristã Evangélica Nova Vida tem sido um farol de esperança, amor e fidelidade bíblica no coração da nossa metrópole.',
    pastorText2: 'Nossa missão é simples e eterna: proclamar a verdade de Cristo, acolher a todos com graça e amor fraternal, e servir à nossa cidade com compaixão. Quer você esteja buscando respostas, um lugar para congregar ou uma família espiritual, as portas de nosso templo e nossos corações estão sempre abertas.',
    pastorSignature: 'Rev. Marcos S. Oliveira',
    pastorRole: 'Pastor Titular',
    
    servicesTitle: 'Horários de Culto',
    servicesSub: 'Participe de nossas celebrações e estudos semanais',
    sundayEbdTitle: 'Domingo, 9h30',
    sundayEbdDesc: 'Escola Bíblica Dominical (EBD) para todas as idades, com classes de teologia, família e vida cristã.',
    sundayWorshipTitle: 'Domingo, 18h00',
    sundayWorshipDesc: 'Culto de Adoração Principal. Momento solene de louvor, oração e pregação bíblica expositiva.',
    wednesdayTitle: 'Terça-feira, 20h00',
    wednesdayDesc: 'Reunião de Oração e Estudo Bíblico. Um momento acolhedor no meio da semana para fortalecer a fé.',
    planVisitBtn: 'Planeje sua Visita',

    latestSermonTitle: 'Último Sermão em Destaque',
    latestSermonSub: 'Série: Salmos para a Alma — Um Refúgio no Caos',
    latestSermonName: 'A Rocha Inabalável: Fé em Tempos de Incerteza',
    latestSermonBtn: 'ASSISTIR AGORA',
    latestSermonVerse: '"O Senhor é a minha rocha, a minha fortaleza e o meu libertador; o meu Deus é o meu rochedo, em quem me refugio." — Salmo 18:2',
    
    homeEventsTitle: 'Próximos Eventos',
    homeEventsSub: 'Participe das nossas atividades e integre-se na nossa comunidade',
    seeMore: 'Saiba Mais',
    
    heritageTitle: 'Fidelidade Histórica desde 1912',
    heritageSub: 'Nossa Herança',
    heritageText1: 'Fundada no início do século XX, nossa igreja carrega a marca de pioneiros que sonharam com uma comunidade centrada na Palavra de Deus e relevante para a cidade de São Paulo.',
    heritageText2: 'Com uma teologia reformada clássica, zelamos pela pregação expositiva, pela liturgia reverente e alegre, e pelo acolhimento de todas as gerações. Nosso belo templo histórico é um testemunho vivo da fidelidade de Deus ao longo de mais de 112 anos.',
    stat1Number: '112+',
    stat1Label: 'Anos de História',
    stat2Number: '1912',
    stat2Label: 'Ano de Fundação',
    stat3Number: '50+',
    stat3Label: 'Ministérios e Ações Sociais',
    
    // About View
    aboutHeroTitle: 'Nossa História, Sua Família',
    aboutHeroSub: 'Conheça nossos valores históricos e nossa liderança pastoral',
    mission: 'Missão',
    missionText: 'Glorificar a Deus por meio do culto reverente, da pregação fiel das Escrituras, do discipulado e do serviço compassivo à sociedade.',
    vision: 'Visão',
    visionText: 'Ser uma comunidade de fé vibrante, teologicamente enraizada e acolhedora, que transforma vidas e inspira esperança em São Paulo.',
    values: 'Valores',
    valuesText: 'Fidelidade às Escrituras, Reverência Litúrgica, Graça e Acolhimento, Missão Integral, Amor Fraternal Intergeracional.',
    
    historyTitle: 'Nossa Caminhada',
    leadershipTitle: 'Nossa Liderança',
    leadershipSub: 'Pastores e presbíteros dedicados ao cuidado espiritual da congregação',
    ctaAboutTitle: 'Quer conhecer mais sobre nossa fé?',
    ctaAboutSub: 'Será um privilégio caminhar ao seu lado. Venha nos conhecer de perto neste domingo ou entre em contato direto com um de nossos pastores.',
    ctaAboutBtnVisit: 'Visite-nos no Domingo',
    ctaAboutBtnContact: 'Fale Conosco',
    
    // Services View
    servicesHeroTitle: 'Nossos Cultos',
    servicesHeroSub: 'Liturgia reverente, pregação bíblica séria e comunidade acolhedora',
    worshipTimesHeader: 'Horários das Celebrações',
    expectHeader: 'O que esperar ao nos visitar',
    expectText: 'Se você nos visitará pela primeira vez, prepare-se para encontrar um ambiente que busca unir a solenidade do culto reformado com o calor do amor fraternal cristão.',
    expectItem1Title: 'Música e Louvor',
    expectItem1Desc: 'Nossa liturgia equilibra belos hinos tradicionais ao som do órgão e piano com cânticos contemporâneos maduros e teológicos.',
    expectItem2Title: 'Pregação Expositiva',
    expectItem2Desc: 'Nossas mensagens duram cerca de 35 a 45 minutos, focando em explicar um texto bíblico detalhadamente e aplicá-lo ao cotidiano prático.',
    expectItem3Title: 'Comunidade e Café',
    expectItem3Desc: 'Após o culto de domingo, temos um café comunitário no nosso pátio. É a oportunidade perfeita para conversarmos e nos conhecermos.',
    expectItem4Title: 'Ministério Infantil Dedicado',
    expectItem4Desc: 'Oferecemos salas seguras e com voluntários preparados para cuidar e ensinar as crianças sobre o amor de Jesus durante o culto principal.',
    visitUsBoxTitle: 'Venha nos Fazer uma Visita',
    visitUsBoxText: 'Ficamos localizados em uma área de fácil acesso em São Paulo, com estacionamento conveniado e recepção calorosa para você e sua família.',
    visitUsBoxAddress: 'Rua Luis Antônio dos Santos, 54 - Santa Teresinha, São Paulo - SP',
    
    // Sermons View
    sermonsHeroTitle: 'Nossos Sermões',
    sermonsHeroSub: 'Aprofunde-se na Palavra de Deus com nossa biblioteca de mensagens gravadas',
    searchPlaceholder: 'Buscar sermão pelo título...',
    allSeries: 'Todas as Séries',
    allPreachers: 'Todos os Pregadores',
    allThemes: 'Todos os Temas',
    filterSeries: 'Série',
    filterPreacher: 'Pregador',
    filterTheme: 'Tema',
    durationLabel: 'Duração',
    preachedOn: 'Pregado em',
    noSermonsFound: 'Nenhum sermão encontrado com os filtros selecionados.',
    resetFilters: 'Limpar Filtros',
    sermonNewsletterTitle: 'Receba novas mensagens no seu e-mail',
    sermonNewsletterSub: 'Inscreva-se para receber avisos de novos sermões, estudos e devocionais semanais.',
    subscribeBtn: 'Inscrever-se',
    emailPlaceholder: 'Seu e-mail principal',
    newsletterSuccess: 'Inscrição realizada com sucesso! Que Deus abençoe.',
    
    // Events View
    eventsHeroTitle: 'Agenda de Eventos',
    eventsHeroSub: 'Participe ativamente de nossos retiros, conferências e reuniões comunitárias',
    tabAll: 'Próximos Eventos',
    tabConferences: 'Conferências',
    tabMinistries: 'Ministérios',
    locationLabel: 'Local',
    timeLabel: 'Horário',
    registerBtn: 'Inscreva-se',
    detailsBtn: 'Ver Detalhes',
    featuredEventHeader: 'Destaque do Mês',
    featuredEventBtn: 'Garantir minha vaga',
    keepInformedHeader: 'Mantenha-se Informado',
    keepInformedSub: 'Cadastre seu e-mail para receber boletins informativos e atualizações da nossa programação semanal.',
    registerModalTitle: 'Inscrição Confirmada!',
    registerModalText: 'Sua inscrição para o evento foi registrada com sucesso. Enviamos os detalhes e o código de acesso para o seu e-mail.',
    closeBtn: 'Fechar',
    
    // Contact View
    contactHeroTitle: 'Fale Conosco',
    contactHeroSub: 'Tem alguma dúvida, pedido de oração ou quer conversar? Nossa equipe está pronta para lhe atender',
    contactFormTitle: 'Envie uma mensagem',
    formName: 'Nome Completo',
    formEmail: 'Endereço de E-mail',
    formSubject: 'Assunto',
    formSubjectOption1: 'Informações Gerais',
    formSubjectOption2: 'Pedido de Oração',
    formSubjectOption3: 'Aconselhamento Pastoral',
    formSubjectOption4: 'Dúvidas sobre Ministérios',
    formMessage: 'Mensagem',
    formSendBtn: 'ENVIAR MENSAGEM',
    formSendingBtn: 'ENVIANDO...',
    formSuccessTitle: 'Mensagem Enviada!',
    formSuccessDesc: 'Agradecemos o seu contato. Nossa equipe ou pastores retornarão a sua mensagem muito em breve.',
    contactInfoTitle: 'Informações de Contato',
    contactAddress: 'Rua Luis Antônio dos Santos, 54 — Santa Teresinha, São Paulo - SP, CEP 02460-000',
    contactPhone: '(11) 3284-0000',
    contactEmail: 'contato@igrejacristanovavida.org.br',
    socialFollow: 'Siga-nos nas Redes Sociais',
    visitUsHeader: 'Visite-nos neste Domingo',
    visitUsSundayDetail: 'Estaremos muito felizes em receber você. Nosso culto principal é aos domingos às 10h30. Temos estacionamento gratuito para visitantes.',
    mapTitle: 'Como nos encontrar'
  },
  en: {
    navHome: 'Home',
    navAbout: 'About',
    navServices: 'Services',
    navSermons: 'Sermons',
    navEvents: 'Events',
    navContact: 'Contact',
    
    // Home View
    heroSub: 'Since 1912 worshipping God, edifying believers, and proclaiming the gospel to the world',
    heroBtnVisit: 'Come Visit Us',
    heroBtnSermons: 'Our Sermons',
    
    pastorTitle: "A Message from Our Pastor",
    pastorGreeting: 'Welcome to our community of faith!',
    pastorText1: 'It is a huge joy to welcome you, even virtually, to our beloved church. For over a century, the New Life Evangelical Christian Church has been a beacon of hope, love, and biblical faithfulness in the heart of our metropolis.',
    pastorText2: 'Our mission is simple and eternal: to proclaim the truth of Christ, to welcome all with grace and brotherly love, and to serve our city with compassion. Whether you are seeking answers, a place to worship, or a spiritual family, the doors of our temple and our hearts are always open.',
    pastorSignature: 'Rev. Marcos S. Oliveira',
    pastorRole: 'Senior Pastor',
    
    servicesTitle: 'Service Times',
    servicesSub: 'Join us for our weekly celebrations and studies',
    sundayEbdTitle: 'Sunday, 9:00 AM',
    sundayEbdDesc: 'Sunday School (EBD) for all ages, with classes in theology, family, and Christian living.',
    sundayWorshipTitle: 'Sunday, 10:30 AM',
    sundayWorshipDesc: 'Principal Worship Service. A solemn time of praise, prayer, and expository biblical preaching.',
    wednesdayTitle: 'Wednesday, 7:30 PM',
    wednesdayDesc: 'Prayer Meeting and Bible Study. A warm, mid-week gathering to strengthen our faith.',
    planVisitBtn: 'Plan Your Visit',

    latestSermonTitle: 'Latest Featured Sermon',
    latestSermonSub: 'Series: Psalms for the Soul — A Refuge in Chaos',
    latestSermonName: 'The Unshakable Rock: Faith in Times of Uncertainty',
    latestSermonBtn: 'WATCH NOW',
    latestSermonVerse: '"The Lord is my rock, my fortress and my deliverer; my God is my stronghold, in whom I take refuge." — Psalm 18:2',
    
    homeEventsTitle: 'Upcoming Events',
    homeEventsSub: 'Take part in our activities and integrate into our community',
    seeMore: 'Learn More',
    
    heritageTitle: 'Historical Faithfulness since 1912',
    heritageSub: 'Our Heritage',
    heritageText1: 'Founded at the beginning of the 20th century, our church bears the mark of pioneers who dreamed of a community centered on the Word of God and relevant to the city of São Paulo.',
    heritageText2: 'With a classic reformed theology, we value expository preaching, reverent and joyful liturgy, and welcoming all generations. Our beautiful historical temple is a living testimony of God’s faithfulness over 112 years.',
    stat1Number: '112+',
    stat1Label: 'Years of History',
    stat2Number: '1912',
    stat2Label: 'Year of Foundation',
    stat3Number: '50+',
    stat3Label: 'Ministries & Social Action',
    
    // About View
    aboutHeroTitle: 'Our History, Your Family',
    aboutHeroSub: 'Discover our historical values and our pastoral leadership',
    mission: 'Mission',
    missionText: 'To glorify God through reverent worship, faithful preaching of the Scriptures, discipleship, and compassionate service to society.',
    vision: 'Vision',
    visionText: 'To be a vibrant, theologically rooted, and welcoming community of faith that transforms lives and inspires hope in São Paulo.',
    values: 'Values',
    valuesText: 'Faithfulness to Scriptures, Liturgical Reverence, Grace and Welcome, Integral Mission, Intergenerational Brotherly Love.',
    
    historyTitle: 'Our Journey',
    leadershipTitle: 'Our Leadership',
    leadershipSub: 'Pastors and elders dedicated to the spiritual care of the congregation',
    ctaAboutTitle: 'Want to know more about our faith?',
    ctaAboutSub: 'It will be a privilege to walk by your side. Come meet us in person this Sunday or contact one of our pastors directly.',
    ctaAboutBtnVisit: 'Visit Us this Sunday',
    ctaAboutBtnContact: 'Contact Us',
    
    // Services View
    servicesHeroTitle: 'Our Services',
    servicesHeroSub: 'Reverent liturgy, serious biblical preaching, and welcoming community',
    worshipTimesHeader: 'Worship Celebration Times',
    expectHeader: 'What to expect when visiting us',
    expectText: 'If you are visiting us for the first time, prepare to find an environment that seeks to combine the solemnity of reformed worship with the warmth of Christian brotherly love.',
    expectItem1Title: 'Music and Praise',
    expectItem1Desc: 'Our liturgy balances beautiful traditional hymns set to organ and piano with mature, theological contemporary songs.',
    expectItem2Title: 'Expository Preaching',
    expectItem2Desc: 'Our messages last about 35 to 45 minutes, focusing on explaining a biblical text in detail and applying it to daily practical life.',
    expectItem3Title: 'Community & Coffee',
    expectItem3Desc: 'After the Sunday service, we host a community coffee hour on our patio. It’s the perfect opportunity to chat and get to know each other.',
    expectItem4Title: 'Dedicated Children’s Ministry',
    expectItem4Desc: 'We offer safe classrooms with trained volunteers to care for and teach children about Jesus’ love during the main worship service.',
    visitUsBoxTitle: 'Come Visit Us',
    visitUsBoxText: 'We are located in an easily accessible area of São Paulo, with partnered parking and a warm welcome for you and your family.',
    visitUsBoxAddress: 'Luis Antônio dos Santos Street, 54 - Santa Teresinha, São Paulo - SP',
    
    // Sermons View
    sermonsHeroTitle: 'Our Sermons',
    sermonsHeroSub: 'Delve deeper into God’s Word with our library of recorded messages',
    searchPlaceholder: 'Search sermon by title...',
    allSeries: 'All Series',
    allPreachers: 'All Preachers',
    allThemes: 'All Themes',
    filterSeries: 'Series',
    filterPreacher: 'Preacher',
    filterTheme: 'Theme',
    durationLabel: 'Duration',
    preachedOn: 'Preached on',
    noSermonsFound: 'No sermons found with the selected filters.',
    resetFilters: 'Clear Filters',
    sermonNewsletterTitle: 'Receive new messages in your inbox',
    sermonNewsletterSub: 'Subscribe to receive notifications of new sermons, weekly studies, and devotionals.',
    subscribeBtn: 'Subscribe',
    emailPlaceholder: 'Your primary email',
    newsletterSuccess: 'Subscription successful! May God bless you.',
    
    // Events View
    eventsHeroTitle: 'Events Calendar',
    eventsHeroSub: 'Get actively involved in our retreats, conferences, and community gatherings',
    tabAll: 'Upcoming Events',
    tabConferences: 'Conferences',
    tabMinistries: 'Ministries',
    locationLabel: 'Location',
    timeLabel: 'Time',
    registerBtn: 'Register',
    detailsBtn: 'See Details',
    featuredEventHeader: 'Feature of the Month',
    featuredEventBtn: 'Secure my spot',
    keepInformedHeader: 'Stay Informed',
    keepInformedSub: 'Enter your email to receive weekly bulletins and schedule updates.',
    registerModalTitle: 'Registration Confirmed!',
    registerModalText: 'Your registration for the event has been successfully recorded. We have sent details and the access code to your email.',
    closeBtn: 'Close',
    
    // Contact View
    contactHeroTitle: 'Contact Us',
    contactHeroSub: 'Have any questions, prayer requests, or want to talk? Our team is ready to assist you',
    contactFormTitle: 'Send a message',
    formName: 'Full Name',
    formEmail: 'Email Address',
    formSubject: 'Subject',
    formSubjectOption1: 'General Information',
    formSubjectOption2: 'Prayer Request',
    formSubjectOption3: 'Pastoral Counseling',
    formSubjectOption4: 'Ministry Questions',
    formMessage: 'Message',
    formSendBtn: 'SEND MESSAGE',
    formSendingBtn: 'SENDING...',
    formSuccessTitle: 'Message Sent!',
    formSuccessDesc: 'Thank you for contacting us. Our team or pastors will reply to your message very soon.',
    contactInfoTitle: 'Contact Information',
    contactAddress: 'Luis Antônio dos Santos Street, 54 — Santa Teresinha, São Paulo - SP, CEP 02460-000',
    contactPhone: '+55 (11) 3284-0000',
    contactEmail: 'contact@igrejacristanovavida.org.br',
    socialFollow: 'Follow us on Social Media',
    visitUsHeader: 'Visit us this Sunday',
    visitUsSundayDetail: 'We will be very happy to welcome you. Our main service is on Sundays at 10:30 AM. We have free parking for visitors.',
    mapTitle: 'How to find us'
  }
};

export const SERMONS: Sermon[] = [
  {
    id: 'sermon-1',
    title: {
      pt: 'A Rocha Inabalável: Fé em Tempos de Incerteza',
      en: 'The Unshakable Rock: Faith in Times of Uncertainty'
    },
    series: {
      pt: 'Salmos para a Alma',
      en: 'Psalms for the Soul'
    },
    preacher: {
      pt: 'Rev. Marcos S. Oliveira',
      en: 'Rev. Marcos S. Oliveira'
    },
    date: '2026-06-21',
    theme: {
      pt: 'Fé e Confiança',
      en: 'Faith and Trust'
    },
    duration: '42:15',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder stream
    image: 'https://images.unsplash.com/photo-1504052434569-70ad58565b90?auto=format&fit=crop&w=600&q=80',
    verse: 'Salmo 18:1-3'
  },
  {
    id: 'sermon-2',
    title: {
      pt: 'O Silêncio de Deus e o Clamor do Justo',
      en: 'The Silence of God and the Cry of the Righteous'
    },
    series: {
      pt: 'Salmos para a Alma',
      en: 'Psalms for the Soul'
    },
    preacher: {
      pt: 'Rev. Marcos S. Oliveira',
      en: 'Rev. Marcos S. Oliveira'
    },
    date: '2026-06-14',
    theme: {
      pt: 'Oração',
      en: 'Prayer'
    },
    duration: '46:30',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80',
    verse: 'Salmo 13:1-6'
  },
  {
    id: 'sermon-3',
    title: {
      pt: 'A Glória nos Céus e a Lei no Coração',
      en: 'Glory in the Heavens and Law in the Heart'
    },
    series: {
      pt: 'Salmos para a Alma',
      en: 'Psalms for the Soul'
    },
    preacher: {
      pt: 'Pr. André Silva',
      en: 'Pr. André Silva'
    },
    date: '2026-06-07',
    theme: {
      pt: 'Soberania de Deus',
      en: 'Sovereignty of God'
    },
    duration: '38:50',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    image: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=600&q=80',
    verse: 'Salmo 19:1-14'
  },
  {
    id: 'sermon-4',
    title: {
      pt: 'O Bom Pastor e o Vale de Sombras',
      en: 'The Good Shepherd and the Valley of Shadows'
    },
    series: {
      pt: 'Salmos para a Alma',
      en: 'Psalms for the Soul'
    },
    preacher: {
      pt: 'Rev. Marcos S. Oliveira',
      en: 'Rev. Marcos S. Oliveira'
    },
    date: '2026-05-31',
    theme: {
      pt: 'Consolo',
      en: 'Comfort'
    },
    duration: '45:10',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    image: 'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?auto=format&fit=crop&w=600&q=80',
    verse: 'Salmo 23:1-6'
  },
  {
    id: 'sermon-5',
    title: {
      pt: 'Aliança e Graça: A Herança que nos Guia',
      en: 'Covenant and Grace: The Heritage that Guides Us'
    },
    series: {
      pt: 'Firme Fundamento',
      en: 'Firm Foundation'
    },
    preacher: {
      pt: 'Pr. André Silva',
      en: 'Pr. André Silva'
    },
    date: '2026-05-24',
    theme: {
      pt: 'Teologia Reformada',
      en: 'Reformed Theology'
    },
    duration: '41:20',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80',
    verse: 'Romanos 5:1-5'
  },
  {
    id: 'sermon-6',
    title: {
      pt: 'O Sacerdócio de Cristo e Nosso Culto',
      en: 'The Priesthood of Christ and Our Worship'
    },
    series: {
      pt: 'Firme Fundamento',
      en: 'Firm Foundation'
    },
    preacher: {
      pt: 'Rev. Marcos S. Oliveira',
      en: 'Rev. Marcos S. Oliveira'
    },
    date: '2026-05-17',
    theme: {
      pt: 'Adoração',
      en: 'Worship'
    },
    duration: '49:15',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    image: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=600&q=80',
    verse: 'Hebreus 10:19-25'
  }
];

export const EVENTS: ChurchEvent[] = [
  {
    id: 'event-1',
    day: '15',
    month: { pt: 'OUT', en: 'OCT' },
    year: '2026',
    title: {
      pt: 'Retiro de Jovens 2026: Conectados na Videira',
      en: 'Youth Retreat 2026: Connected to the Vine'
    },
    description: {
      pt: 'Três dias de comunhão, louvor, estudo bíblico e atividades ao ar livre no Recanto da Esperança.',
      en: 'Three days of fellowship, worship, Bible study, and outdoor activities at Recanto da Esperança.'
    },
    time: '18:00',
    location: {
      pt: 'Recanto da Esperança, Nazaré Paulista - SP',
      en: 'Recanto da Esperança, Nazaré Paulista - SP'
    },
    category: 'proximos',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'event-2',
    day: '22',
    month: { pt: 'OUT', en: 'OCT' },
    year: '2026',
    title: {
      pt: 'Concerto de Inverno & Coral Clássico',
      en: 'Winter Concert & Classical Choir'
    },
    description: {
      pt: 'Apresentação especial do nosso Grande Coral interpretando clássicos sacros de Bach, Handel e hinos tradicionais.',
      en: 'Special performance by our Grand Choir performing sacred classics by Bach, Handel, and traditional hymns.'
    },
    time: '19:30',
    location: {
      pt: 'Templo Principal, São Paulo - SP',
      en: 'Main Sanctuary, São Paulo - SP'
    },
    category: 'proximos',
    image: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'event-3',
    day: '05',
    month: { pt: 'NOV', en: 'NOV' },
    year: '2026',
    title: {
      pt: 'Noite da Comunhão: Jantar de Ação de Graças',
      en: 'Communion Night: Thanksgiving Dinner'
    },
    description: {
      pt: 'Jantar comunitário especial no salão social para celebrar a providência de Deus e fortalecer os laços fraternos.',
      en: 'Special community dinner in the social hall to celebrate God’s providence and strengthen brotherly bonds.'
    },
    time: '20:00',
    location: {
      pt: 'Salão Social da Igreja, São Paulo - SP',
      en: 'Church Social Hall, São Paulo - SP'
    },
    category: 'ministerios',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'event-4',
    day: '12',
    month: { pt: 'NOV', en: 'NOV' },
    year: '2026',
    title: {
      pt: 'Jornada Teológica: Sola Scriptura hoje',
      en: 'Theological Journey: Sola Scriptura today'
    },
    description: {
      pt: 'Um dia intenso de palestras e mesas redondas sobre a autoridade e suficiência das Escrituras no século XXI.',
      en: 'An intensive day of lectures and roundtables on the authority and sufficiency of Scripture in the 21st century.'
    },
    time: '09:00 - 17:00',
    location: {
      pt: 'Auditório Anexo, São Paulo - SP',
      en: 'Annex Auditorium, São Paulo - SP'
    },
    category: 'conferencias',
    image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'event-5',
    day: '19',
    month: { pt: 'NOV', en: 'NOV' },
    year: '2026',
    title: {
      pt: 'Seminário de Casais: Edificando sobre a Rocha',
      en: 'Couples Seminar: Building on the Rock'
    },
    description: {
      pt: 'Série de estudos com focado na comunicação e fortalecimento espiritual da família cristã.',
      en: 'Series of studies focusing on communication and spiritual strengthening of the Christian family.'
    },
    time: '14:00 - 18:30',
    location: {
      pt: 'Salão Social da Igreja, São Paulo - SP',
      en: 'Church Social Hall, São Paulo - SP'
    },
    category: 'ministerios',
    image: 'https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=600&q=80'
  }
];

export const TIMELINE: TimelineEvent[] = [
  {
    year: '1912',
    title: {
      pt: 'Fundação da Igreja',
      en: 'Church Foundation'
    },
    description: {
      pt: 'Um pequeno grupo de fiéis se reúne no centro de São Paulo para fundar a Igreja Cristã Evangélica Nova Vida, com o propósito de proclamar o evangelho na cidade.',
      en: 'A small group of believers gathers in downtown São Paulo to found the New Life Evangelical Christian Church, with the purpose of proclaiming the gospel in the city.'
    },
    image: 'https://images.unsplash.com/photo-1447069387593-a5de0862481e?auto=format&fit=crop&w=600&q=80'
  },
  {
    year: '1950',
    title: {
      pt: 'Construção do Templo Atual',
      en: 'Construction of Current Sanctuary'
    },
    description: {
      pt: 'Graças ao crescimento da comunidade e à generosidade dos membros, é inaugurado o imponente templo na região central, destacando-se pela arquitetura clássica e vitrais históricos.',
      en: 'Thanks to the growth of the community and the generosity of the members, the imposing temple in the central region is inaugurated, highlighted by its classical architecture and historical stained glass.'
    },
    image: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=600&q=80'
  },
  {
    year: '1985',
    title: {
      pt: 'Expansão de Ações Sociais e Missões',
      en: 'Expansion of Social Action and Missions'
    },
    description: {
      pt: 'A igreja inicia projetos sociais de apoio a famílias em vulnerabilidade e envia seus primeiros missionários de longo prazo para regiões do interior e outros países.',
      en: 'The church begins social projects supporting vulnerable families and sends its first long-term missionaries to rural regions and other countries.'
    },
    image: 'https://images.unsplash.com/photo-1515162305285-0293e4767cc2?auto=format&fit=crop&w=600&q=80'
  },
  {
    year: 'Hoje',
    title: {
      pt: 'Fidelidade nas Próximas Gerações',
      en: 'Faithfulness in Next Generations'
    },
    description: {
      pt: 'Com mais de um século de história, a igreja permanece fiel às Escrituras Sagradas, integrando novas tecnologias para transmissão das mensagens sem perder a solidez da fé cristã reformada.',
      en: 'With over a century of history, the church remains faithful to the Holy Scriptures, integrating new technologies to stream messages without losing the solidity of the reformed Christian faith.'
    },
    image: 'https://images.unsplash.com/photo-1438032005730-c779502df39b?auto=format&fit=crop&w=600&q=80'
  }
];

export const LEADERS: Leader[] = [
  {
    id: 'leader-1',
    name: 'Rev. Marcos S. Oliveira',
    role: {
      pt: 'Pastor Titular',
      en: 'Senior Pastor'
    },
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&h=400&q=80',
    bio: {
      pt: 'Bacharel em Teologia pela Faculdade Teológica Reformada e Mestre em Divindade. Atua no pastorado há mais de 20 anos, focado em teologia bíblica e aconselhamento familiar.',
      en: 'Bachelor of Theology from the Reformed Theological Seminary and Master of Divinity. Serving in pastoral ministry for over 20 years, focusing on biblical theology and family counseling.'
    }
  },
  {
    id: 'leader-2',
    name: 'Pr. André Silva',
    role: {
      pt: 'Pastor Auxiliar (Jovens e Família)',
      en: 'Assistant Pastor (Youth & Family)'
    },
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&h=400&q=80',
    bio: {
      pt: 'Graduado em Teologia com ênfase em ministério de juventude. Lidera as ações de comunhão de jovens, adolescentes e o ministério de integração comunitária.',
      en: 'Graduated in Theology with emphasis on youth ministry. Leads youth fellowship, adolescents, and the community integration ministry.'
    }
  },
  {
    id: 'leader-3',
    name: 'Ricardo Mendes',
    role: {
      pt: 'Presbítero Regente',
      en: 'Ruling Elder'
    },
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&h=400&q=80',
    bio: {
      pt: 'Administrador de empresas, serve no Conselho da Igreja há 15 anos, sendo responsável pela gestão administrativa, financeira e apoio aos ministérios sociais.',
      en: 'Business administrator, serving on the Church Session for 15 years, responsible for administrative and financial management and supporting social ministries.'
    }
  },
  {
    id: 'leader-4',
    name: 'Dra. Helena Costa',
    role: {
      pt: 'Conselho Educacional e EBD',
      en: 'Educational Board & EBD Director'
    },
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&h=400&q=80',
    bio: {
      pt: 'Doutora em Pedagogia pela USP, supervisiona o currículo pedagógico da Escola Bíblica Dominical e coordena o treinamento contínuo de nossos professores e educadores.',
      en: 'Doctor in Pedagogy from USP, supervises the pedagogical curriculum of the Sunday School and coordinates the continuous training of our teachers and educators.'
    }
  }
];
