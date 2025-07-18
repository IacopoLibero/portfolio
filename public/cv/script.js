// Traduzioni per il CV
const translations = {
    it: {
        download: "Scarica CV",
        contacts: "CONTATTI",
        license: "Categoria B",
        skills: "CAPACITÀ E COMPETENZE",
        skill1: "Autonomia operativa",
        skill2: "Attitudine al lavoro per obiettivi",
        skill3: "Predisposizione al lavoro di squadra",
        skill4: "Capacità di gestione del tempo",
        skill5: "Capacità di adattamento e flessibilità",
        skill6: "Capacità relazionali",
        skill7: "Capacità di pensiero critico",
        skill8: "Problem solving",
        languages: "LINGUE",
        lang_italian: "Italiano",
        lang_english: "Inglese",
        lang_spanish: "Spagnolo",
        lang_native: "Madrelingua",
        lang_intermediate: "Intermedio avanzato",
        lang_basic: "Base",
        hobbies: "HOBBY E INTERESSI",
        hobby1: "Musica",
        hobby2: "Cinema",
        hobby3: "Fotografia",
        hobby4: "Pesca",
        hobby5: "Videogame",
        professional_profile: "PROFILO PROFESSIONALE",
        profile_desc1: "Perito informatico con buona conoscenza della programmazione con linguaggi JS, HTML5, PHP, CSS, Java, SQL e framework come Bootstrap.",
        profile_desc2: "Particolare interesse al full-stack web development, con forte motivazione a crescere professionalmente nel ruolo.",
        profile_desc3: "Attualmente sto completando una specializzazione IFTS come \"Responsabile della sicurezza di reti informatiche e della protezione dei dati\", acquisendo competenze avanzate in cybersecurity, ethical hacking, analisi forense, crittografia, sicurezza delle reti, gestione degli incidenti informatici e compliance normativa sulla protezione dei dati personali.",
        technical_skills: "COMPETENZE TECNICHE",
        tech1: "Java (Base - scolastico)",
        tech2: "Sviluppo web (HTML, CSS, JS, PHP, SQL) (Intermedio)",
        tech3: "Progettazione database (Intermedio)",
        tech4: "Sviluppo applicazioni client-server (Intermedio)",
        tech5: "Sviluppo API (Base)",
        tech6: "Framework Bootstrap (Intermedio)",
        tech7: "Conoscenza di C++ (Base - scolastico)",
        tech8: "Progettazione infrastrutture di rete (Intermedio)",
        tech9: "Conoscenza dei sistemi operativi linux e windows (Intermedio)",
        tech10: "IT skills (Avanzato)",
        tech11: "Progettazione ACL (Base)",
        tech12: "Conoscenza di Git e Github (Intermedio)",
        tech13: "Sicurezza informatica (Intermedio)",
        tech14: "Crittografia e scambio dati sicuro (Base)",
        tech15: "Ethical hacking (Base)",
        tech16: "Blockchain (Conoscenza teorica)",
        tech17: "AWS Cloud (Conoscenza base)",
        tech18: "Analisi forense informatica (Conoscenza teorica)",
        tech19: "Analisi e valutazione rischi informatici (Intermedio)",
        tech20: "Gestione incidenti di sicurezza (Base)",
        education: "ISTRUZIONE E FORMAZIONE",
        edu_title1: "Responsabile della sicurezza di reti informatiche e della protezione dei dati",
        edu_desc1: "IFTS: Prato, 09/2024 - in corso",
        edu_ifts: "IFTS Cyber Security Specialist 3",
        edu_cert: "Certificato di Specializzazione Tecnica Superiore e Qualifica Professionale della Regione Toscana (IV° livello europeo)",
        edu_title2: "Diploma: Perito Informatico",
        edu_desc2: "ITIS Antonio Meucci - Firenze, 09/2021 - 07/2024",
        work_experience: "ESPERIENZA LAVORATIVA",
        job_title1: "Sviluppatore Web Freelance",
        job_desc1: "Attività autonoma - Firenze, 09/2024 - in corso",
        privacy_statement: "Autorizzo il trattamento dei dati personali contenuti nel mio CV ex art. 13 del decreto legislativo 196/2003 e art. 13 del regolamento UE 2016/679 sulla protezione dei singoli cittadini in merito al trattamento dei dati personali"
    },
    en: {
        download: "Download CV",
        contacts: "CONTACTS",
        license: "Category B",
        skills: "SKILLS & COMPETENCIES",
        skill1: "Operational autonomy",
        skill2: "Goal-oriented work attitude",
        skill3: "Team work predisposition",
        skill4: "Time management skills",
        skill5: "Adaptability and flexibility",
        skill6: "Interpersonal skills",
        skill7: "Critical thinking skills",
        skill8: "Problem solving",
        languages: "LANGUAGES",
        lang_italian: "Italian",
        lang_english: "English",
        lang_spanish: "Spanish",
        lang_native: "Native",
        lang_intermediate: "Upper intermediate",
        lang_basic: "Basic",
        hobbies: "HOBBIES & INTERESTS",
        hobby1: "Music",
        hobby2: "Cinema",
        hobby3: "Photography",
        hobby4: "Fishing",
        hobby5: "Video games",
        professional_profile: "PROFESSIONAL PROFILE",
        profile_desc1: "IT specialist with good knowledge of programming languages JS, HTML5, PHP, CSS, Java, SQL and frameworks like Bootstrap.",
        profile_desc2: "Particular interest in full-stack web development, with strong motivation to grow professionally in this role.",
        profile_desc3: "Currently completing an IFTS specialization as \"Network Security and Data Protection Manager\", acquiring advanced skills in cybersecurity, ethical hacking, forensic analysis, cryptography, network security, IT incident management and data protection compliance.",
        technical_skills: "TECHNICAL SKILLS",
        tech1: "Java (Basic - academic)",
        tech2: "Web development (HTML, CSS, JS, PHP, SQL) (Intermediate)",
        tech3: "Database design (Intermediate)",
        tech4: "Client-server application development (Intermediate)",
        tech5: "API development (Basic)",
        tech6: "Bootstrap framework (Intermediate)",
        tech7: "C++ knowledge (Basic - academic)",
        tech8: "Network infrastructure design (Intermediate)",
        tech9: "Linux and Windows operating systems knowledge (Intermediate)",
        tech10: "IT skills (Advanced)",
        tech11: "ACL design (Basic)",
        tech12: "Git and Github knowledge (Intermediate)",
        tech13: "IT security (Intermediate)",
        tech14: "Cryptography and secure data exchange (Basic)",
        tech15: "Ethical hacking (Basic)",
        tech16: "Blockchain (Theoretical knowledge)",
        tech17: "AWS Cloud (Basic knowledge)",
        tech18: "IT forensic analysis (Theoretical knowledge)",
        tech19: "IT risk analysis and assessment (Intermediate)",
        tech20: "Security incident management (Basic)",
        education: "EDUCATION & TRAINING",
        edu_title1: "Network Security and Data Protection Manager",
        edu_desc1: "IFTS: Prato, 09/2024 - ongoing",
        edu_ifts: "IFTS Cyber Security Specialist 3",
        edu_cert: "Higher Technical Specialization Certificate and Professional Qualification of Tuscany Region (IV European level)",
        edu_title2: "Diploma: IT Specialist",
        edu_desc2: "ITIS Antonio Meucci - Florence, 09/2021 - 07/2024",
        work_experience: "WORK EXPERIENCE",
        job_title1: "Freelance Web Developer",
        job_desc1: "Self-employed - Florence, 09/2024 - ongoing",
        privacy_statement: "I authorize the processing of personal data contained in my CV pursuant to art. 13 of legislative decree 196/2003 and art. 13 of EU regulation 2016/679 on the protection of individuals with regard to the processing of personal data"
    }
};

// Lingua corrente
let currentLanguage = 'it';

// Funzione per tradurre il contenuto
function translateContent(language) {
    const elements = document.querySelectorAll('[data-key]');
    const title = document.querySelector('title');
    const htmlLang = document.querySelector('html');
    
    elements.forEach(element => {
        const key = element.getAttribute('data-key');
        if (translations[language] && translations[language][key]) {
            element.textContent = translations[language][key];
        }
    });
    
    // Aggiorna il titolo della pagina
    if (language === 'en') {
        title.textContent = 'CV - Iacopo Libero Bernabei';
        htmlLang.setAttribute('lang', 'en');
    } else {
        title.textContent = 'CV - Iacopo Libero Bernabei';
        htmlLang.setAttribute('lang', 'it');
    }
    
    currentLanguage = language;
}

// Funzione per scaricare il CV
function downloadCV() {
    const filename = currentLanguage === 'en' ? 'CV_Iacopo_Bernabei_EN.pdf' : 'CV_Iacopo_Bernabei_IT.pdf';
    
    // Nascondi il selettore di lingua prima della stampa
    const languageSelector = document.querySelector('.language-selector');
    languageSelector.style.display = 'none';
    
    // Stampa la pagina
    window.print();
    
    // Ripristina il selettore di lingua dopo la stampa
    setTimeout(() => {
        languageSelector.style.display = 'flex';
    }, 1000);
}

// Event listener per il cambio lingua
document.addEventListener('DOMContentLoaded', function() {
    const languageSelector = document.getElementById('languageSelector');
    
    languageSelector.addEventListener('change', function() {
        const selectedLanguage = this.value;
        translateContent(selectedLanguage);
    });
    
    // Imposta la lingua iniziale
    translateContent('it');
});

// Gestione della stampa per browser che supportano beforeprint
window.addEventListener('beforeprint', function() {
    const languageSelector = document.querySelector('.language-selector');
    languageSelector.style.display = 'none';
});

window.addEventListener('afterprint', function() {
    const languageSelector = document.querySelector('.language-selector');
    languageSelector.style.display = 'flex';
});