export const translations = {
  en: {
    nav: { aboutMe: 'ABOUT ME', skills: 'SKILLS', experience: 'EXPERIENCE', proyects: 'PROYECTS', hireMe: 'HIRE ME' },
    hero: { uphead: "Hi there, I'm", sub1: "I'm a Full-Stack", sub2: 'Developer', scrollDown: 'scroll down' },
    aboutMe: {
      heading: 'ABOUT ME',
      description: 'Results-oriented Software Developer with experience in C# .NET, Vue.js, SQL Server, and Docker. My focus is on transforming business requirements into high-quality technical solutions, from initial architecture to final deployment. Systems Engineering graduate from Universidad Abierta Interamericana (UAI).',
      resumeBtn: 'RESUME',
    },
    skills: { heading: 'SKILLS' },
    experience: {
      heading: 'EXPERIENCE',
      jobs: [
        { title: 'Software Architect and Developer', description: 'Led the full-stack development of a new internal management system (Vue.js, C# .NET, SQL Server) deployed in Docker containers and integrated with OAuth 2.0. Designed and implemented a Data Lake to centralize and analyze data from multiple systems and external APIs.' },
        { title: 'Reports Developer', description: "Programmed and optimized reports in the Colegium system (4D language), migrated reports from legacy systems, and trained a new team member, increasing the area's productivity." },
        { title: 'Technical Support', description: 'Provided technical support to teachers and back-office staff, resolving hardware and software incidents to ensure operational continuity.' },
      ],
    },
    proyects: {
      heading: 'PROYECTS',
      items: [
        { name: 'OUTFIT MAKER', description: 'Final thesis project for my Systems Engineering degree (UAI): a full business plan and software design for an AI-powered app that helps users decide what to wear from their own closet, factoring in weather, occasion and personal style, with a social feed to share outfits. Designed as a Flutter mobile app with a Vue.js admin panel and a microservices backend, using computer vision to recognize garments and a weather API for context-aware suggestions. Covers market research, a B2C (free) + B2B (brand data & marketing) business model, financial projections, and full software design: use cases, domain diagrams and screen flows.' },
      ],
    },
    contact: { heading: 'CONTACT', name: 'Name', email: 'Email', message: 'Message', send: 'Send message' },
    footer: 'Page designed by Federico Brenner',
    panel: {
      notConfigured: { heading: 'Supabase is not configured', description: 'VUE_APP_SUPABASE_URL and/or VUE_APP_SUPABASE_ANON_KEY are missing from your .env.local file. Fill them in and restart the dev server.' },
      loading: 'Loading...',
      login: { heading: 'Private panel', signIn: 'Sign in with Google' },
      unauthorized: { heading: 'Unauthorized', description: 'This account does not have access to this panel.', signOut: 'Sign out' },
      title: 'Panel',
      tabs: { graficos: 'Charts', personas: 'People' },
      refresh: { idle: 'Refresh list', loading: 'Refreshing...' },
      userMenu: { goHome: 'Back to home', theme: 'Theme', language: 'Language', signOut: 'Sign out' },
    },
  },
  de: {
    nav: { aboutMe: 'ÜBER MICH', skills: 'FÄHIGKEITEN', experience: 'ERFAHRUNG', proyects: 'PROJEKTE', hireMe: 'KONTAKT' },
    hero: { uphead: 'Hallo, ich bin', sub1: 'Ich bin ein Full-Stack', sub2: 'Entwickler', scrollDown: 'nach unten scrollen' },
    aboutMe: {
      heading: 'ÜBER MICH',
      description: 'Ergebnisorientierter Softwareentwickler mit Erfahrung in C# .NET, Vue.js, SQL Server und Docker. Mein Fokus liegt darauf, Geschäftsanforderungen in hochwertige technische Lösungen umzusetzen, von der Architektur bis zur finalen Bereitstellung. Absolvent der Systemtechnik an der Universidad Abierta Interamericana (UAI).',
      resumeBtn: 'LEBENSLAUF',
    },
    skills: { heading: 'FÄHIGKEITEN' },
    experience: {
      heading: 'ERFAHRUNG',
      jobs: [
        { title: 'Softwarearchitekt und Entwickler', description: 'Leitete die Full-Stack-Entwicklung eines neuen internen Verwaltungssystems (Vue.js, C# .NET, SQL Server), das in Docker-Containern bereitgestellt und mit OAuth 2.0 integriert wurde. Entwarf und implementierte ein Data Lake zur Zentralisierung und Analyse von Daten aus mehreren Systemen und externen APIs.' },
        { title: 'Berichtsentwickler', description: 'Programmierte und optimierte Berichte im Colegium-System (4D-Sprache), migrierte Berichte aus Altsystemen und schulte ein neues Teammitglied, wodurch die Produktivität des Bereichs gesteigert wurde.' },
        { title: 'Technischer Support', description: 'Bot technischen Support für Lehrkräfte und Verwaltungspersonal und behob Hardware- und Softwareprobleme, um den reibungslosen Betrieb sicherzustellen.' },
      ],
    },
    proyects: {
      heading: 'PROJEKTE',
      items: [
        { name: 'OUTFIT MAKER', description: 'Abschlussprojekt für meinen Studiengang Systemtechnik (UAI): ein vollständiger Geschäftsplan und Softwareentwurf für eine KI-gestützte App, die Nutzern hilft, aus ihrem eigenen Kleiderschrank die passende Kleidung auszuwählen, unter Berücksichtigung von Wetter, Anlass und persönlichem Stil, mit einem sozialen Feed zum Teilen von Outfits. Entworfen als Flutter-Mobile-App mit einem Vue.js-Admin-Panel und einem Microservices-Backend, mit Computer Vision zur Erkennung von Kleidungsstücken und einer Wetter-API für kontextbezogene Vorschläge. Umfasst Marktforschung, ein B2C (kostenlos) + B2B (Markendaten & Marketing) Geschäftsmodell, Finanzprognosen und vollständigen Softwareentwurf: Use Cases, Domänendiagramme und Bildschirmabläufe.' },
      ],
    },
    contact: { heading: 'KONTAKT', name: 'Name', email: 'E-Mail', message: 'Nachricht', send: 'Nachricht senden' },
    footer: 'Seite gestaltet von Federico Brenner',
    panel: {
      notConfigured: { heading: 'Supabase ist nicht konfiguriert', description: 'VUE_APP_SUPABASE_URL und/oder VUE_APP_SUPABASE_ANON_KEY fehlen in deiner .env.local-Datei. Trage sie ein und starte den Dev-Server neu.' },
      loading: 'Lädt...',
      login: { heading: 'Privates Panel', signIn: 'Mit Google anmelden' },
      unauthorized: { heading: 'Nicht autorisiert', description: 'Dieses Konto hat keinen Zugriff auf dieses Panel.', signOut: 'Abmelden' },
      title: 'Panel',
      tabs: { graficos: 'Diagramme', personas: 'Personen' },
      refresh: { idle: 'Liste aktualisieren', loading: 'Aktualisiere...' },
      userMenu: { goHome: 'Zurück zur Startseite', theme: 'Thema', language: 'Sprache', signOut: 'Abmelden' },
    },
  },
  es: {
    nav: { aboutMe: 'SOBRE MÍ', skills: 'HABILIDADES', experience: 'EXPERIENCIA', proyects: 'PROYECTOS', hireMe: 'CONTRATAME' },
    hero: { uphead: 'Hola, soy', sub1: 'Soy Full-Stack', sub2: 'Developer', scrollDown: 'desplazate hacia abajo' },
    aboutMe: {
      heading: 'SOBRE MÍ',
      description: 'Desarrollador de Software orientado a resultados con experiencia en C# .NET, Vue.js, SQL Server y Docker. Mi enfoque es transformar los requerimientos del negocio en soluciones técnicas de alta calidad, desde la arquitectura inicial hasta el despliegue final. Ingeniero en Sistemas egresado de la Universidad Abierta Interamericana (UAI).',
      resumeBtn: 'CV',
    },
    skills: { heading: 'HABILIDADES' },
    experience: {
      heading: 'EXPERIENCIA',
      jobs: [
        { title: 'Arquitecto y Desarrollador de Software', description: 'Lideré el desarrollo full-stack de un nuevo sistema de gestión interno (Vue.js, C# .NET, SQL Server) desplegado en contenedores Docker e integrado con OAuth 2.0. Diseñé e implementé un Data Lake para centralizar y analizar datos de múltiples sistemas y APIs externas.' },
        { title: 'Desarrollador de Reportes', description: 'Programé y optimicé reportes en el sistema Colegium (lenguaje 4D), migré reportes de sistemas legados y capacité a un nuevo integrante del equipo, aumentando la productividad del área.' },
        { title: 'Soporte Técnico', description: 'Brindé soporte técnico a docentes y personal administrativo, resolviendo incidentes de hardware y software para asegurar la continuidad operativa.' },
      ],
    },
    proyects: {
      heading: 'PROYECTOS',
      items: [
        { name: 'OUTFIT MAKER', description: 'Proyecto final de tesis para mi carrera de Ingeniería en Sistemas (UAI): un plan de negocio y diseño de software completo para una app con IA que ayuda a los usuarios a decidir qué ponerse desde su propio placard, considerando el clima, la ocasión y el estilo personal, con un feed social para compartir outfits. Diseñada como app móvil en Flutter con un panel de administración en Vue.js y un backend de microservicios, usando visión por computadora para reconocer prendas y una API de clima para sugerencias según el contexto. Incluye investigación de mercado, un modelo de negocio B2C (gratuito) + B2B (datos de marca y marketing), proyecciones financieras y diseño de software completo: casos de uso, diagramas de dominio y flujos de pantalla.' },
      ],
    },
    contact: { heading: 'CONTACTO', name: 'Nombre', email: 'Email', message: 'Mensaje', send: 'Enviar mensaje' },
    footer: 'Página diseñada por Federico Brenner',
    panel: {
      notConfigured: { heading: 'Supabase no está configurado', description: 'Faltan VUE_APP_SUPABASE_URL y/o VUE_APP_SUPABASE_ANON_KEY en tu archivo .env.local. Completalas y reiniciá el servidor de desarrollo.' },
      loading: 'Cargando...',
      login: { heading: 'Panel privado', signIn: 'Iniciar sesión con Google' },
      unauthorized: { heading: 'No autorizado', description: 'Esta cuenta no tiene acceso a este panel.', signOut: 'Cerrar sesión' },
      title: 'Panel',
      tabs: { graficos: 'Gráficos', personas: 'Personas' },
      refresh: { idle: 'Actualizar lista', loading: 'Actualizando...' },
      userMenu: { goHome: 'Volver al inicio', theme: 'Tema', language: 'Idioma', signOut: 'Cerrar sesión' },
    },
  },
}
