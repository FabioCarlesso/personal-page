/* ============================================================
   (fc) site behaviours
   - mobile nav toggle
   - hero terminal typing animation
   - /work filter bar
   - contact + subscribe form handling (client-side only)
   - pt/en i18n
   - press kit: copy-bio buttons
   All guarded by element presence so one file serves every page.
   ============================================================ */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* —— i18n translations ————————————————————————— */
  var TRANSLATIONS = {
    en: {
      "topbar.status": "available · q3 '26",
      "nav.home": "home",
      "nav.work": "work",
      "nav.about": "about",
      "nav.contact": "contact",
      "footer.brand.h3": "Backend engineering, in writing.",
      "footer.brand.p": "Java &amp; Spring Boot since 2010. Foz do Iguaçu, Brazil. Available for select consulting and full-time roles.",
      "footer.site": "Site",
      "footer.nav.home": "Home",
      "footer.nav.work": "Work",
      "footer.nav.about": "About",
      "footer.elsewhere": "Elsewhere",
      "footer.contact.label": "Contact",
      "footer.copyright": "© 2026 Fabio Nami Carlesso · all rights reserved",
      "home.kicker": "Backend Software Engineer · Foz do Iguaçu, BR",
      "home.hero.h1": 'Building APIs<br>that <span class="blue">hold up</span><br>in production.',
      "home.hero.lede": "Java &amp; Spring Boot since 2010. AWS-certified. Banking-sector pragmatic.<br>I design readable APIs, break problems into testable pieces, and keep the cluster green.",
      "home.hero.cta.primary": "View case studies",
      "home.hero.stat.years": "years in prod",
      "home.hero.stat.stack": "core stack",
      "home.hero.stat.cert": "certified",
      "home.work.kicker": "selected work · open source",
      "home.work.h2": "Things that ship.",
      "home.work.sub": "9 public projects · github.com/FabioCarlesso",
      "home.work.all": "all work",
      "home.about.kicker": "about",
      "home.about.h2": 'Senior backend engineer.<br><span class="muted">Production scars. Working code.</span>',
      "home.about.lede": "Developer working in the banking sector, with 15+ years of experience building and monitoring software using Java, Spring Boot, Python and agile practices.",
      "home.about.sub": 'Off-keyboard I play and watch soccer, watch movies and series, read books, listen to music, and occasionally philosophize about the meaning of life, the universe, and everything <span class="amber">(42)</span> over a cold beer.',
      "home.about.link": "full story →",
      "home.cta.h2": 'Got an API that<br><span class="blue">won\'t hold up?</span>',
      "home.cta.lede": "Open for select consulting from Q3 2026. Backend systems, code review, mentoring teams shipping Java in regulated environments.",
      "prod.kicker": "in production · public urls",
      "prod.h2": "Running in production.",
      "prod.sub": "// Products in the air · source on github",
      "prod.open": "open app",
      "prod.fos.desc": "Review-and-retention tool for what you learn on the mats: a 46-node curriculum tree with progressive unlocking, server-graded quizzes, drill logging, streaks and spaced repetition.",
      "prod.pilates.desc": "Management platform for a pilates studio, in daily use: patients, professionals, scheduling and billing. A Spring Boot API behind an Angular admin interface.",
      "prod.cartola.desc": "Builds your Cartola FC line-up for the round by crossing Brasileirão odds with player metrics: weighted ranking, budget optimisation in cartoletas, formation comparison and a history of past line-ups. Public landing, app behind a login.",
      "proj.cartolaoddsapi": "REST API behind Cartola Odds: scores players from odds and form, optimises the line-up against a cartoletas budget and keeps a history of past rounds. JWT-closed.",
      "proj.carlessopilatesapi": "REST API for managing patients and professionals of a pilates studio. Domain-driven, fully tested.",
      "proj.goodfunds": "Personal-finance MVP. End-to-end study project — auth, transactions, budgets, monthly close.",
      "proj.carlessopilatesfe": "Web interface for pilates studio administration. Patient flows, scheduling, billing.",
      "proj.cartolaoddsfe": "Angular frontend for Cartola Odds. Prerendered public landing, then the authenticated app: line-up of the round, ranking, favourites and settings.",
      "proj.designpatterns": "Hands-on walkthrough of the GoF design patterns in idiomatic Java. Strategy, observer, builder, decorator.",
      "proj.algoritmos": "Algorithm and data-structure practice. Sorts, trees, graph traversals — kept sharp on weekends.",
      "proj.fightossstreak": "Review-and-retention tool for jiu-jitsu. Curriculum tree, server-graded quizzes, streaks and spaced repetition.",
      "proj.goalfather": "Elifoot-style football manager. Kotlin backend with a pure domain and a deterministic match engine.",
      "proj.status.production": "● in production",
      "proj.status.source": "● source",
      "proj.status.study": "● study",
      "proj.status.archived": "● archived",
      "about.h1": '15 years.<br>Mostly Java.<br><span class="blue">Still curious.</span>',
      "about.p1": "I'm Fabio. I write backend systems — mostly in Java, mostly for banks, mostly in production. The kind of code that runs all night, gets paged at 3am, and has to be debuggable by the person on call who isn't me.",
      "about.p2": "I started in 2010 with Java 6 and IBM WebSphere — yes, really. Twelve years later I was deploying Spring Boot 3 services to AWS containers. The stack changed; the underlying craft didn't. Read the stack trace. Trust the compiler. Write tests you'd want to read at 2am.",
      "about.p3": 'When I\'m not on the keyboard I\'m at the field — playing or watching soccer — or running, or reading something dense, or arguing with friends over a cold beer about whether <span class="amber">42</span> is actually a satisfying answer. (It is. The question is the problem.)',
      "about.timeline.kicker": "timeline",
      "about.timeline.h2": "A career, in milestones.",
      "tl.2010": "First Java line in production. The journey begins.",
      "tl.2013": "B.S. in Computer Science. Bachelor's degree.",
      "tl.2016": "Postgraduate — Specialist in Java Technology.",
      "tl.2018": "Joined the banking sector. Production scale, regulated environments.",
      "tl.2019": "EXIN Agile Scrum Foundation certification.",
      "tl.2022": "Postgraduate — Specialist in Data Science &amp; Big Data.",
      "tl.2023": "AWS Certified Cloud Practitioner.",
      "tl.2024": "Side-projects shipped: Cartola Odds, Carlesso Pilates platform.",
      "tl.2026": "Open to select consulting · still running the algorithm.",
      "about.certs.kicker": "education · certifications",
      "about.certs.h2": "Paper trail.",
      "about.certs.sub": "// 5 credentials",
      "cert.aws.title": "AWS Certified Cloud Practitioner",
      "cert.aws.desc": "Amazon Web Services",
      "cert.data.title": "Data Science &amp; Big Data Specialist",
      "cert.data.desc": "Postgraduate",
      "cert.scrum.title": "EXIN Agile Scrum Foundation",
      "cert.scrum.desc": "EXIN International",
      "cert.java.title": "Java Technology Specialist",
      "cert.java.desc": "Postgraduate",
      "cert.bs.title": "B.S. Computer Science",
      "cert.bs.desc": "Bachelor's degree",
      "cert.easter.title": "The Ultimate Answer",
      "cert.easter.desc": "self-awarded · perpetual",
      "work.h1": 'Public code. <span class="muted">Mostly Java.</span>',
      "work.intro": "28 public repositories on GitHub. The ones below are the projects I keep returning to — APIs for problems I actually care about. Open source, MIT, fork at your peril.",
      "work.filter.all": "all",
      "work.filter.backend": "backend",
      "work.filter.frontend": "frontend",
      "work.filter.production": "production",
      "work.filter.archived": "archived",
      "work.github": "view all on github →",
      "work.empty": "// 0 results — try a different filter",
      "work.cs.kicker": "case study · fightossstreak",
      "work.cs.h2": "Turning what happens on the mats into something you actually retain.",
      "work.cs.stat.nodes": "curriculum nodes",
      "work.cs.stat.questions": "quiz questions",
      "work.cs.stat.modules": "modules, in a tree",
      "work.cs.stat.lines": "lines of java + ts",
      "work.cs.problem.h3": "The problem",
      "work.cs.problem.p": "What you learn on the mats evaporates between sessions. The detail you drilled on Tuesday is gone by Saturday, and there is no structured way to review it — only notes nobody reads twice.",
      "work.cs.approach.h3": "The approach",
      "work.cs.approach.p": "The curriculum is versioned as data, not code: 46 nodes across 9 modules in JSON, unlocked progressively. Quizzes are graded on the server — the answer never reaches the browser — and each drill feeds a streak and a spaced-repetition schedule. Spring Boot with Flyway and OAuth2, React behind nginx, the whole thing in Docker Compose so dev and production share one topology.",
      "work.cs.learned.h3": "What I learned",
      "work.cs.learned.p": "The bottleneck was never the code — it was curating content. Writing 91 questions that actually test a concept took longer than the API around them. And a cold-starting backend taught me to build a landing page that renders in full without a single API call.",
      "work.cs.open": "open app",
      "work.cs.source": "view source",
      "contact.h1": 'Let\'s talk<br><span class="blue">backend.</span>',
      "contact.lede": 'Open for select consulting from <span class="blue">Q3 2026</span>. Backend systems, API design, code review, mentoring teams shipping Java in regulated environments.',
      "contact.response.label": "// AVERAGE RESPONSE",
      "contact.response.time": "&lt; 24h on weekdays",
      "footer.nav.press": "Press kit",
      "press.h1": 'Press kit.<br><span class="blue">Copy, paste, ship.</span>',
      "press.lede": "Bios, headshot, talk topics and logos — for recruiters, event organisers and podcast hosts. Use anything on this page as is; no need to ask first.",
      "press.dl.zip": "download kit (.zip)",
      "press.spec.kicker": "at a glance",
      "press.spec.h2": "The spec sheet.",
      "press.spec.sub": "// for recruiters &amp; hiring teams",
      "press.spec.role": "Senior backend software engineer",
      "press.spec.experience": "15+ years · Java in production since 2010",
      "press.spec.sector": "Banking · regulated environments",
      "press.spec.education": "B.S. Computer Science · postgraduate in Java Technology and in Data Science &amp; Big Data",
      "press.spec.languages": "pt-BR (native) · en (fluent)",
      "press.spec.open": "Full-time roles · select consulting",
      "press.bio.h2": "Introduce me in three lengths.",
      "press.bio.sub": "// follows the EN/PT toggle",
      "press.copy": "copy",
      "press.bio.one.label": "one-liner",
      "press.bio.one": "Fabio Carlesso is a senior backend engineer who has been shipping Java to production since 2010, mostly for the banking sector.",
      "press.bio.short.label": "short · ~60 words",
      "press.bio.short": "Fabio Carlesso is a senior backend engineer based in Foz do Iguaçu, Brazil. Since 2010, Fabio has built and run Java systems in production — most of them in banking, where code has to be correct, auditable and debuggable at 3am. Day to day that means Spring Boot, AWS, Postgres and Docker. AWS Certified Cloud Practitioner.",
      "press.bio.long.label": "long · ~150 words",
      "press.bio.long.p1": "Fabio Carlesso is a senior backend software engineer with more than fifteen years of Java in production. The career started in 2010 on Java 6 and IBM WebSphere and runs through to Spring Boot 3 services in AWS containers. Since 2018 it has been in the banking sector, where systems run all night, sit under regulation and have to be debuggable by whoever is on call.",
      "press.bio.long.p2": "Fabio holds a B.S. in Computer Science, postgraduate specialisations in Java Technology and in Data Science &amp; Big Data, and the AWS Certified Cloud Practitioner and EXIN Agile Scrum Foundation certifications. Outside the day job, Fabio designs, builds and runs independent products — FightOssStreak, Cartola Odds and the Carlesso Pilates platform — all live in production, all with public source code.",
      "press.bio.long.p3": "Based in Foz do Iguaçu, Brazil (GMT-3). Works in Portuguese and English.",
      "press.photo.kicker": "headshot",
      "press.photo.dl": "↓ download",
      "press.photo.note": "Crop freely. Please don't filter, recolour or distort.",
      "press.talks.kicker": "speaking · podcasts",
      "press.talks.h2": "What I talk about.",
      "press.talks.t1.h": "Java in regulated environments",
      "press.talks.t1.p": "Fifteen years of shipping to production in banking: auditability, change control, and moving fast without breaking compliance.",
      "press.talks.t2.h": "From WebSphere to Spring Boot 3",
      "press.talks.t2.p": "What changed between Java 6 on an app server and containers on AWS — and the craft that didn't.",
      "press.talks.t3.h": "Code the on-call engineer can debug",
      "press.talks.t3.p": "Readable stack traces, honest logs and tests you'd want to read at 2am.",
      "press.talks.t4.h": "Side projects, in production",
      "press.talks.t4.p": "Building, hosting and keeping small products alive as a team of one — FightOssStreak, Cartola Odds and Carlesso Pilates.",
      "press.talks.formats.label": "formats",
      "press.talks.formats": "talks · panels · podcasts · workshops",
      "press.talks.langs.label": "languages",
      "press.talks.where.label": "where",
      "press.talks.where": "remote, or in person from Foz do Iguaçu (GMT-3)",
      "press.logos.kicker": "brand assets",
      "press.logos.h2": "Logos.",
      "press.logos.sub": "// outlined svg, no fonts needed · png in the zip",
      "press.logo.fc": "primary · dark surfaces",
      "press.logo.light": "primary · light surfaces",
      "press.logo.accent": "on the accent colour",
      "press.logo.stacked": "lockup · square spaces",
      "press.logo.wordmark": "wordmark · banners, slides",
      "press.logo.white": "one colour · dark",
      "press.logo.ink": "one colour · light",
      "press.logo.42": "easter egg · never primary",
      "press.usage.do": "do",
      "press.usage.do1": "Keep the parens of (fc) in signal blue on every colour variant.",
      "press.usage.do2": "Use the dark mark on dark surfaces and the light mark on paper.",
      "press.usage.do3": "Leave clear space around the mark of at least one paren's width.",
      "press.usage.dont": "don't",
      "press.usage.dont1": "Recolour, stretch, rotate or add effects to the mark.",
      "press.usage.dont2": "Retype (fc) in another typeface — use the files.",
      "press.usage.dont3": "Use [42] as the main logo. It's the easter egg.",
      "press.colors.kicker": "colour · type",
      "press.colors.h2": "Palette &amp; typography.",
      "press.color.ink": "background",
      "press.color.ink2": "cards, panels",
      "press.color.blue": "accent · the parens",
      "press.color.amber": "42 · highlights",
      "press.color.rust": "rare warm accent",
      "press.color.paper": "light surfaces",
      "press.color.bone": "text on dark",
      "press.type.mono": "display · headings · code",
      "press.type.sans": "body text",
      "press.type.serif": "accents in prose",
      "press.contact.kicker": "booking · interviews",
      "press.contact.h2": "Get in touch.",
      "press.contact.sub": "// email is fastest · &lt; 24h on weekdays"
    },
    pt: {
      "topbar.status": "disponível · q3 '26",
      "nav.home": "início",
      "nav.work": "trabalho",
      "nav.about": "sobre",
      "nav.contact": "contato",
      "footer.brand.h3": "Engenharia backend, por escrito.",
      "footer.brand.p": "Java &amp; Spring Boot desde 2010. Foz do Iguaçu, Brasil. Disponível para consultoria selecionada e posições full-time.",
      "footer.site": "Site",
      "footer.nav.home": "Início",
      "footer.nav.work": "Trabalho",
      "footer.nav.about": "Sobre",
      "footer.elsewhere": "Outras redes",
      "footer.contact.label": "Contato",
      "footer.copyright": "© 2026 Fabio Nami Carlesso · todos os direitos reservados",
      "home.kicker": "Engenheiro de Software Backend · Foz do Iguaçu, BR",
      "home.hero.h1": 'Construindo APIs<br>que <span class="blue">aguentam</span><br>em produção.',
      "home.hero.lede": "Java &amp; Spring Boot desde 2010. Certificado AWS. Pragmático do setor bancário.<br>Projeto APIs legíveis, divido problemas em partes testáveis e mantenho o cluster verde.",
      "home.hero.cta.primary": "Ver estudos de caso",
      "home.hero.stat.years": "anos em prod",
      "home.hero.stat.stack": "stack principal",
      "home.hero.stat.cert": "certificado",
      "home.work.kicker": "trabalho selecionado · código aberto",
      "home.work.h2": "Coisas que entram em produção.",
      "home.work.sub": "9 projetos públicos · github.com/FabioCarlesso",
      "home.work.all": "todo o trabalho",
      "home.about.kicker": "sobre",
      "home.about.h2": 'Engenheiro backend sênior.<br><span class="muted">Cicatrizes de produção. Código que funciona.</span>',
      "home.about.lede": "Desenvolvedor no setor bancário, com 15+ anos de experiência construindo e monitorando software com Java, Spring Boot, Python e práticas ágeis.",
      "home.about.sub": 'Fora do teclado jogo e assisto futebol, filmes e séries, leio livros, ouço música e eventualmente filosofo sobre o significado da vida, o universo e tudo mais <span class="amber">(42)</span> com uma cerveja gelada.',
      "home.about.link": "história completa →",
      "home.cta.h2": 'Tem uma API que<br><span class="blue">não aguenta?</span>',
      "home.cta.lede": "Disponível para consultoria selecionada a partir do Q3 2026. Sistemas backend, revisão de código, mentoria para times entregando Java em ambientes regulados.",
      "prod.kicker": "em produção · urls públicas",
      "prod.h2": "Rodando em produção.",
      "prod.sub": "// Produtos no ar · código no github",
      "prod.open": "abrir app",
      "prod.fos.desc": "Ferramenta de revisão e retenção do que se aprende no tatame: currículo em árvore de 46 nós com desbloqueio progressivo, quiz corrigido no servidor, registro de drill, streak e repetição espaçada.",
      "prod.pilates.desc": "Plataforma de gestão de um estúdio de pilates, em uso diário: pacientes, profissionais, agenda e faturamento. Uma API Spring Boot atrás de uma interface administrativa Angular.",
      "prod.cartola.desc": "Monta o time da rodada no Cartola FC cruzando odds do Brasileirão com métricas dos atletas: ranking por score ponderado, otimização por orçamento de cartoletas, comparação de formações e histórico de escalações. Landing pública, app atrás de login.",
      "proj.cartolaoddsapi": "API REST por trás do Cartola Odds: pontua atletas por odds e desempenho, otimiza a escalação dentro do orçamento de cartoletas e guarda o histórico das rodadas. Fechada com JWT.",
      "proj.carlessopilatesapi": "API REST para gerenciar pacientes e profissionais de um estúdio de pilates. Domain-driven, totalmente testada.",
      "proj.goodfunds": "MVP de finanças pessoais. Projeto de estudo end-to-end — autenticação, transações, orçamentos, fechamento mensal.",
      "proj.carlessopilatesfe": "Interface web para administração do estúdio de pilates. Fluxos de pacientes, agendamento, faturamento.",
      "proj.cartolaoddsfe": "Frontend Angular do Cartola Odds. Landing pública pré-renderizada e, atrás do login, o app: time da rodada, ranking, favoritos e configurações.",
      "proj.designpatterns": "Guia prático dos padrões de design GoF em Java idiomático. Strategy, observer, builder, decorator.",
      "proj.algoritmos": "Prática de algoritmos e estruturas de dados. Ordenações, árvores, percursos em grafos — mantido afiado nos fins de semana.",
      "proj.fightossstreak": "Ferramenta de revisão e retenção para jiu-jitsu. Currículo em árvore, quiz corrigido no servidor, streak e repetição espaçada.",
      "proj.goalfather": "Manager de futebol estilo Elifoot. Backend em Kotlin com domínio puro e engine de partida determinística.",
      "proj.status.production": "● em produção",
      "proj.status.source": "● código",
      "proj.status.study": "● estudo",
      "proj.status.archived": "● arquivado",
      "about.h1": '15 anos.<br>Principalmente Java.<br><span class="blue">Ainda curioso.</span>',
      "about.p1": "Sou Fabio. Escrevo sistemas backend — principalmente em Java, principalmente para bancos, principalmente em produção. O tipo de código que roda a noite toda, gera alerta às 3h e precisa ser depurável pela pessoa de plantão que não sou eu.",
      "about.p2": "Comecei em 2010 com Java 6 e IBM WebSphere — sim, de verdade. Doze anos depois estava implantando serviços Spring Boot 3 em containers AWS. A stack mudou; o artesanato subjacente não. Leia o stack trace. Confie no compilador. Escreva testes que você gostaria de ler às 2h da manhã.",
      "about.p3": 'Quando não estou no teclado estou no campo — jogando ou assistindo futebol — ou correndo, ou lendo algo denso, ou discutindo com amigos sobre uma cerveja gelada se <span class="amber">42</span> é realmente uma resposta satisfatória. (É. A questão é o problema.)',
      "about.timeline.kicker": "linha do tempo",
      "about.timeline.h2": "Uma carreira, em marcos.",
      "tl.2010": "Primeira linha Java em produção. A jornada começa.",
      "tl.2013": "Bacharelado em Ciência da Computação.",
      "tl.2016": "Pós-graduação — Especialista em Tecnologia Java.",
      "tl.2018": "Entrei no setor bancário. Escala de produção, ambientes regulados.",
      "tl.2019": "Certificação EXIN Agile Scrum Foundation.",
      "tl.2022": "Pós-graduação — Especialista em Data Science &amp; Big Data.",
      "tl.2023": "AWS Certified Cloud Practitioner.",
      "tl.2024": "Projetos paralelos entregues: Cartola Odds, plataforma Carlesso Pilates.",
      "tl.2026": "Disponível para consultoria selecionada · ainda executando o algoritmo.",
      "about.certs.kicker": "educação · certificações",
      "about.certs.h2": "Rastro documental.",
      "about.certs.sub": "// 5 credenciais",
      "cert.aws.title": "AWS Certified Cloud Practitioner",
      "cert.aws.desc": "Amazon Web Services",
      "cert.data.title": "Especialista em Data Science &amp; Big Data",
      "cert.data.desc": "Pós-graduação",
      "cert.scrum.title": "EXIN Agile Scrum Foundation",
      "cert.scrum.desc": "EXIN International",
      "cert.java.title": "Especialista em Tecnologia Java",
      "cert.java.desc": "Pós-graduação",
      "cert.bs.title": "Bacharelado em Ciência da Computação",
      "cert.bs.desc": "Bacharelado",
      "cert.easter.title": "A Resposta Definitiva",
      "cert.easter.desc": "autoconcedido · perpétuo",
      "work.h1": 'Código público. <span class="muted">Principalmente Java.</span>',
      "work.intro": "28 repositórios públicos no GitHub. Os abaixo são os projetos aos quais sempre volto — APIs para problemas que realmente me importam. Código aberto, MIT, fork por sua conta e risco.",
      "work.filter.all": "todos",
      "work.filter.backend": "backend",
      "work.filter.frontend": "frontend",
      "work.filter.production": "produção",
      "work.filter.archived": "arquivados",
      "work.github": "ver tudo no github →",
      "work.empty": "// 0 resultados — tente outro filtro",
      "work.cs.kicker": "estudo de caso · fightossstreak",
      "work.cs.h2": "Transformando o que acontece no tatame em algo que você realmente retém.",
      "work.cs.stat.nodes": "nós de currículo",
      "work.cs.stat.questions": "perguntas de quiz",
      "work.cs.stat.modules": "módulos, em árvore",
      "work.cs.stat.lines": "linhas de java + ts",
      "work.cs.problem.h3": "O problema",
      "work.cs.problem.p": "O que se aprende no tatame evapora entre um treino e outro. O detalhe drilado na terça sumiu no sábado, e não existe forma estruturada de revisar — só anotações que ninguém lê duas vezes.",
      "work.cs.approach.h3": "A abordagem",
      "work.cs.approach.p": "O currículo é versionado como dado, não como código: 46 nós em 9 módulos em JSON, com desbloqueio progressivo. O quiz é corrigido no servidor — a resposta nunca chega ao navegador — e cada drill alimenta um streak e uma agenda de repetição espaçada. Spring Boot com Flyway e OAuth2, React atrás do nginx, tudo em Docker Compose para que dev e produção compartilhem a mesma topologia.",
      "work.cs.learned.h3": "O que aprendi",
      "work.cs.learned.p": "O gargalo nunca foi o código — foi curar conteúdo. Escrever 91 perguntas que de fato testam um conceito levou mais tempo que a API ao redor delas. E o cold start do backend me ensinou a fazer uma landing que renderiza inteira sem uma única chamada de API.",
      "work.cs.open": "abrir app",
      "work.cs.source": "ver código",
      "contact.h1": 'Vamos falar<br><span class="blue">backend.</span>',
      "contact.lede": 'Disponível para consultoria selecionada a partir do <span class="blue">Q3 2026</span>. Sistemas backend, design de APIs, revisão de código, mentoria para times entregando Java em ambientes regulados.',
      "contact.response.label": "// TEMPO DE RESPOSTA",
      "contact.response.time": "&lt; 24h em dias úteis",
      "footer.nav.press": "Mídia kit",
      "press.h1": 'Mídia kit.<br><span class="blue">Copie, cole, publique.</span>',
      "press.lede": "Bios, foto, temas de palestra e logos — para recrutadores, organizadores de eventos e podcasts. Use o que estiver nesta página como está; não precisa pedir.",
      "press.dl.zip": "baixar kit (.zip)",
      "press.spec.kicker": "resumo",
      "press.spec.h2": "A ficha técnica.",
      "press.spec.sub": "// para recrutadores &amp; times de contratação",
      "press.spec.role": "Engenheiro de software backend sênior",
      "press.spec.experience": "15+ anos · Java em produção desde 2010",
      "press.spec.sector": "Setor bancário · ambientes regulados",
      "press.spec.education": "Bacharel em Ciência da Computação · pós-graduação em Tecnologia Java e em Data Science &amp; Big Data",
      "press.spec.languages": "pt-BR (nativo) · en (fluente)",
      "press.spec.open": "Posições full-time · consultoria selecionada",
      "press.bio.h2": "Me apresente em três tamanhos.",
      "press.bio.sub": "// acompanha o botão EN/PT",
      "press.copy": "copiar",
      "press.bio.one.label": "uma linha",
      "press.bio.one": "Fabio Carlesso é engenheiro backend sênior e coloca Java em produção desde 2010, principalmente no setor bancário.",
      "press.bio.short.label": "curta · ~60 palavras",
      "press.bio.short": "Fabio Carlesso é engenheiro backend sênior, baseado em Foz do Iguaçu. Desde 2010 constrói e mantém sistemas Java em produção — a maioria no setor bancário, onde o código precisa ser correto, auditável e depurável às 3h da manhã. No dia a dia, isso significa Spring Boot, AWS, Postgres e Docker. Certificado AWS Cloud Practitioner.",
      "press.bio.long.label": "longa · ~150 palavras",
      "press.bio.long.p1": "Fabio Carlesso é engenheiro de software backend sênior, com mais de quinze anos de Java em produção. A carreira começou em 2010, com Java 6 e IBM WebSphere, e chegou a serviços Spring Boot 3 em containers na AWS. Desde 2018 atua no setor bancário, onde os sistemas rodam a noite toda, estão sob regulação e precisam ser depuráveis por quem estiver de plantão.",
      "press.bio.long.p2": "É bacharel em Ciência da Computação, especialista em Tecnologia Java e em Data Science &amp; Big Data, com as certificações AWS Certified Cloud Practitioner e EXIN Agile Scrum Foundation. Fora do trabalho, projeta, constrói e mantém produtos independentes — FightOssStreak, Cartola Odds e a plataforma Carlesso Pilates — todos em produção, todos com código público.",
      "press.bio.long.p3": "Baseado em Foz do Iguaçu (GMT-3). Trabalha em português e inglês.",
      "press.photo.kicker": "foto",
      "press.photo.dl": "↓ baixar",
      "press.photo.note": "Pode recortar à vontade. Só não aplique filtros, não altere as cores nem distorça.",
      "press.talks.kicker": "palestras · podcasts",
      "press.talks.h2": "Sobre o que eu falo.",
      "press.talks.t1.h": "Java em ambientes regulados",
      "press.talks.t1.p": "Quinze anos colocando código em produção no setor bancário: auditabilidade, controle de mudanças e velocidade sem quebrar compliance.",
      "press.talks.t2.h": "Do WebSphere ao Spring Boot 3",
      "press.talks.t2.p": "O que mudou entre Java 6 num servidor de aplicação e containers na AWS — e o ofício que não mudou.",
      "press.talks.t3.h": "Código que o plantonista consegue depurar",
      "press.talks.t3.p": "Stack traces legíveis, logs honestos e testes que você gostaria de ler às 2h da manhã.",
      "press.talks.t4.h": "Projetos paralelos, em produção",
      "press.talks.t4.p": "Construir, hospedar e manter produtos pequenos vivos como um time de uma pessoa só — FightOssStreak, Cartola Odds e Carlesso Pilates.",
      "press.talks.formats.label": "formatos",
      "press.talks.formats": "palestras · painéis · podcasts · workshops",
      "press.talks.langs.label": "idiomas",
      "press.talks.where.label": "onde",
      "press.talks.where": "remoto, ou presencial a partir de Foz do Iguaçu (GMT-3)",
      "press.logos.kicker": "ativos da marca",
      "press.logos.h2": "Logos.",
      "press.logos.sub": "// svg em curvas, sem depender de fonte · png no zip",
      "press.logo.fc": "principal · fundos escuros",
      "press.logo.light": "principal · fundos claros",
      "press.logo.accent": "sobre a cor de destaque",
      "press.logo.stacked": "assinatura · espaços quadrados",
      "press.logo.wordmark": "wordmark · banners, slides",
      "press.logo.white": "uma cor · escuro",
      "press.logo.ink": "uma cor · claro",
      "press.logo.42": "easter egg · nunca principal",
      "press.usage.do": "faça",
      "press.usage.do1": "Mantenha os parênteses de (fc) em azul em todas as variações coloridas.",
      "press.usage.do2": "Use a marca escura em fundos escuros e a clara em fundos claros.",
      "press.usage.do3": "Deixe ao redor da marca um respiro de pelo menos a largura de um parêntese.",
      "press.usage.dont": "não faça",
      "press.usage.dont1": "Mudar as cores, esticar, girar ou aplicar efeitos na marca.",
      "press.usage.dont2": "Redigitar (fc) em outra fonte — use os arquivos.",
      "press.usage.dont3": "Usar o [42] como logo principal. Ele é o easter egg.",
      "press.colors.kicker": "cor · tipografia",
      "press.colors.h2": "Paleta &amp; tipografia.",
      "press.color.ink": "fundo",
      "press.color.ink2": "cards, painéis",
      "press.color.blue": "destaque · os parênteses",
      "press.color.amber": "42 · realces",
      "press.color.rust": "destaque quente, raro",
      "press.color.paper": "fundos claros",
      "press.color.bone": "texto no escuro",
      "press.type.mono": "títulos · display · código",
      "press.type.sans": "texto corrido",
      "press.type.serif": "ênfases no texto",
      "press.contact.kicker": "agenda · entrevistas",
      "press.contact.h2": "Fale comigo.",
      "press.contact.sub": "// e-mail é o mais rápido · &lt; 24h em dias úteis"
    }
  };

  function applyLang(lang) {
    var t = TRANSLATIONS[lang] || TRANSLATIONS.en;
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (t[key] !== undefined) el.innerHTML = t[key];
    });
    var toggle = document.getElementById("lang-toggle");
    if (toggle) toggle.textContent = lang === "en" ? "PT" : "EN";
    try { localStorage.setItem("fc-lang", lang); } catch (e) {}
  }

  function initI18n() {
    // ?lang=pt|en wins over the saved choice — shareable links, and how
    // scripts/build-press-kit.sh prints the PT press-kit PDF.
    var saved, param = (location.search.match(/[?&]lang=(pt|en)\b/) || [])[1];
    try { saved = localStorage.getItem("fc-lang"); } catch (e) {}
    var lang = param || ((saved === "pt" || saved === "en") ? saved : "en");
    applyLang(lang);
    var toggle = document.getElementById("lang-toggle");
    if (!toggle) return;
    toggle.addEventListener("click", function () {
      var current = document.documentElement.lang || "en";
      applyLang(current === "en" ? "pt" : "en");
    });
  }

  /* —— Mobile nav toggle ————————————————————————————————————————— */
  function initNav() {
    var toggle = document.querySelector(".nav-toggle");
    var nav = document.getElementById("primary-nav");
    if (!toggle || !nav) return;
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
  }

  /* —— Hero terminal typing animation ———————————————— */
  var TERMINAL_LINES = [
    { cmd: "whoami",           out: ["fabio.nami.carlesso"] },
    { cmd: "cat role.txt",     out: ["backend software engineer"] },
    { cmd: "cat stack.txt",    out: ["java · spring-boot · aws", "postgres · docker · python"] },
    { cmd: "cat location.txt", out: ["foz do iguaçu, brazil · GMT-3"] },
    { cmd: "uptime",           out: ["15y 4mo · still going"] },
    { cmd: "echo $ANSWER",     out: ["42"], amber: true }
  ];

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }

  function initTerminal() {
    var body = document.querySelector("[data-terminal-body]");
    if (!body) return;

    if (reduceMotion) {
      TERMINAL_LINES.forEach(function (l) { renderCompleted(body, l); });
      body.appendChild(promptCursorLine());
      return;
    }

    var step = 0;
    function nextLine() {
      if (step >= TERMINAL_LINES.length) {
        body.appendChild(promptCursorLine());
        return;
      }
      var line = TERMINAL_LINES[step];
      var lineEl = el("div", "term-line");
      lineEl.appendChild(el("span", "prompt", "$"));
      var cmdEl = el("span", "cmd", "");
      lineEl.appendChild(cmdEl);
      var cursor = el("span", "cursor");
      lineEl.appendChild(cursor);
      body.appendChild(lineEl);

      var i = 0;
      var typer = setInterval(function () {
        i++;
        cmdEl.textContent = line.cmd.slice(0, i);
        if (i >= line.cmd.length) {
          clearInterval(typer);
          setTimeout(function () {
            lineEl.removeChild(cursor);
            line.out.forEach(function (o) {
              body.appendChild(el("div", "term-out" + (line.amber ? " amber" : ""), o));
            });
            step++;
            nextLine();
          }, 900);
        }
      }, 45);
    }
    nextLine();
  }

  function renderCompleted(body, line) {
    var lineEl = el("div", "term-line");
    lineEl.appendChild(el("span", "prompt", "$"));
    lineEl.appendChild(el("span", "cmd", line.cmd));
    body.appendChild(lineEl);
    line.out.forEach(function (o) {
      body.appendChild(el("div", "term-out" + (line.amber ? " amber" : ""), o));
    });
  }

  function promptCursorLine() {
    var lineEl = el("div", "term-line");
    lineEl.appendChild(el("span", "prompt", "$"));
    lineEl.appendChild(el("span", "cursor"));
    return lineEl;
  }

  /* —— /work filter bar ——————————————————————————————— */
  function initFilters() {
    var bar = document.querySelector(".work-filters");
    var grid = document.querySelector(".work-grid");
    if (!bar || !grid) return;
    var empty = document.querySelector(".work-grid ~ .empty, .empty");
    var cards = Array.prototype.slice.call(grid.querySelectorAll(".proj"));

    bar.addEventListener("click", function (e) {
      var btn = e.target.closest(".filter");
      if (!btn) return;
      var filter = btn.getAttribute("data-filter");
      bar.querySelectorAll(".filter").forEach(function (b) {
        b.classList.toggle("active", b === btn);
      });
      var shown = 0;
      cards.forEach(function (card) {
        var match = filter === "all" ||
          card.getAttribute("data-stack") === filter ||
          card.getAttribute("data-status") === filter;
        card.classList.toggle("is-hidden", !match);
        if (match) shown++;
      });
      if (empty) empty.classList.toggle("show", shown === 0);
    });
  }

  /* —— Contact form (client-side stub) ———————————————— */
  function initContactForm() {
    var form = document.getElementById("contact-form");
    var success = document.getElementById("contact-success");
    if (!form || !success) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      // TODO(deploy): wire submissions to a real endpoint.
      // No backend exists yet — POST the FormData below to e.g. a
      // Formspree form ("https://formspree.io/f/<id>") or a serverless
      // function, then show the success state on a 2xx response.
      var name = (form.querySelector("[name=name]") || {}).value || "friend";
      var echo = success.querySelector("[data-echo-name]");
      if (echo) echo.textContent = name;
      form.hidden = true;
      success.hidden = false;
      success.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "nearest" });
    });
  }

  /* —— Subscribe form (writing) ——————————————————————— */
  function initSubscribe() {
    var form = document.getElementById("subscribe-form");
    if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      // TODO(deploy): wire to a newsletter provider (Buttondown, etc).
      var input = form.querySelector("input");
      form.innerHTML =
        '<span class="mono blue">// subscribed — confirm via the email I just sent.</span>';
      if (input && input.value) { /* value captured before reset */ }
    });
  }

  /* —— Press kit: copy a bio to the clipboard ———————————— */
  function initCopy() {
    document.querySelectorAll("[data-copy]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var src = document.getElementById(btn.getAttribute("data-copy"));
        if (!src || !navigator.clipboard) return;
        var text = Array.prototype.map.call(src.querySelectorAll("p"), function (p) {
          return p.textContent.replace(/\s+/g, " ").trim();
        }).join("\n\n");
        navigator.clipboard.writeText(text).then(function () {
          btn.classList.add("is-copied");
          setTimeout(function () { btn.classList.remove("is-copied"); }, 1600);
        });
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initI18n();
    initNav();
    initTerminal();
    initFilters();
    initContactForm();
    initSubscribe();
    initCopy();
  });
})();
