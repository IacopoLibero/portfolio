// Traduzioni per il CV
const translations = {
    it: {
        download: "Scarica CV",
        contacts: "CONTATTI",
        license: "Categoria B",

        // soft skills
        skills: "CAPACITÀ E COMPETENZE",
        skill1: "Autonomia operativa",
        skill2: "Attitudine al lavoro per obiettivi",
        skill3: "Predisposizione al lavoro di squadra",
        skill4: "Capacità di gestione del tempo",
        skill5: "Capacità di adattamento e flessibilità",
        skill6: "Capacità relazionali",
        skill7: "Capacità di pensiero critico",
        skill8: "Problem solving",

        // lingue
        languages: "LINGUE",
        lang_italian: "Italiano",
        lang_english: "Inglese",
        lang_spanish: "Spagnolo",
        lang_native: "Madrelingua",
        lang_intermediate: "Intermedio avanzato",
        lang_basic: "Base",

        // hobbies
        hobbies: "HOBBY E INTERESSI",
        hobby1: "Musica",
        hobby2: "Cinema",
        hobby3: "Fotografia",
        hobby4: "Pesca",
        hobby5: "Videogame",

        // profilo professionale
        professional_profile: "PROFILO PROFESSIONALE",
        profile_desc1: "Responsabile della sicurezza di reti informatiche e della protezione dei dati, con una solida formazione tecnica da Perito Informatico e competenze trasversali in sviluppo software, cybersecurity e gestione di sistemi informatici.",
        profile_desc2: "Ho maturato esperienza pratica con diversi linguaggi di programmazione e con strumenti di automazione e monitoraggio dei sistemi.",
        profile_desc3: "Ho completato con successo la specializzazione IFTS “Responsabile della sicurezza di reti informatiche e della protezione dei dati”, durante la quale ho approfondito tematiche di ethical hacking, crittografia, analisi e gestione degli incidenti informatici, e implementazione di politiche di sicurezza aziendale.",

        // competenze tecniche
        technical_skills: "COMPETENZE TECNICHE",
        tech1: "Java, C++ (Base - scolastico)",
        tech2: "Sviluppo web full stack (HTML, CSS, JS, PHP, SQL, Next.js, Node.js, Bootstrap) (Intermedio - Esperienza pratica)",
        tech3: "Progettazione database (Intermedio - Esperienza pratica)",
        tech4: "Sviluppo applicazioni software client-server (Avanzato - esperienza pratica)",
        tech5: "Sviluppo API e utilizzo API esterne (Intermedio - esperienza pratica)",
        tech6: "Sviluppo con utilizzo di AI (Avanzato - esperienza pratica)",
        tech7: "Prompt engineering e utilizzo di modelli di linguaggio (Avanzato - esperienza pratica)",
        tech8: "Progettazione infrastrutture di rete (Intermedio)",
        tech9: "Utilizzo sistemi operativi linux e windows (Avanzato - esperienza pratica)",
        tech10: "IT skills (Avanzato)",
        tech11: "Utilizzo di Git e delle best practise di versionamento (Intermedio - esperienza pratica)",
        tech12: "Sicurezza informatica (Intermedio)",
        tech13: "Crittografia e scambio dati sicuro (Base)",
        tech14: "Ethical hacking (Base - intermedio)",
        tech15: "Blockchain (Conoscenza teorica)",
        tech16: "AWS Cloud (Base)",
        tech17: "Analisi e valutazione rischi informatici (Intermedio)",
        tech18: "Gestione incidenti di sicurezza (Base)",
        tech19: "Automatizzazione con ansible e terraform (Base)",
        tech20: "Conoscenza concetti fondamentali di Kubernetes (Conoscienza teorica)",

        // formazione
        education: "ISTRUZIONE E FORMAZIONE",
        edu_title1: "Responsabile della sicurezza di reti informatiche e della protezione dei dati",
        edu_desc1: "IFTS: Prato, 09/2024 - 10/2025",
        edu_ifts: "IFTS Cyber Security Specialist 3",
        edu_cert: "Certificato di Specializzazione Tecnica Superiore e Qualifica Professionale della Regione Toscana (IV° livello europeo)",
        edu_cert_score: "Valutazione: 93/100",
        edu_title2: "Diploma: Perito Informatico",
        edu_desc2: "ITIS Antonio Meucci - Firenze, 09/2021 - 07/2024",

        // lavoro
        work_experience: "ESPERIENZA LAVORATIVA",
        job_title2: "Tirocinio a Neboola Srl.",
        job_time2: "Firenze, 05/2025 - 07/2025",
        job_desc2: "Ho svolto un tirocinio presso Neboola S.R.L., dove ho applicato le mie competenze in infrastrutture cloud e cybersecurity a progetti reali.Ho acquisito esperienza pratica con Infrastructure as Code utilizzando Terraform, gestione automatizzata della configurazione con Ansible e fondamenti di orchestrazione dei container con Kubernetes.",
        job_title1: "Sviluppatore Web full stack",
        job_time1: "Firenze, 09/2024 - in corso",
        job_desc1: "Sviluppo di applicazioni web full stack con tecnologie moderne come Next.js, React, Node.js. Ho lavorato su progetti autonomi, gestendo l'intero ciclo di sviluppo, dalla progettazione alla distribuzione, con particolare attenzione alla sicurezza e all'efficienza del codice.",
        privacy_statement: "Autorizzo il trattamento dei dati personali contenuti nel mio CV ex art. 13 del decreto legislativo 196/2003 e art. 13 del regolamento UE 2016/679 sulla protezione dei singoli cittadini in merito al trattamento dei dati personali"
    },
    en: {
        download: "Download CV",
        contacts: "CONTACTS",
        license: "Category B",

        //soft skill
        skills: "SKILLS & COMPETENCIES",
        skill1: "Operational autonomy",
        skill2: "Goal-oriented work attitude",
        skill3: "Team work predisposition",
        skill4: "Time management skills",
        skill5: "Adaptability and flexibility",
        skill6: "Interpersonal skills",
        skill7: "Critical thinking skills",
        skill8: "Problem solving",

        //lingue
        languages: "LANGUAGES",
        lang_italian: "Italian",
        lang_english: "English",
        lang_spanish: "Spanish",
        lang_native: "Native",
        lang_intermediate: "Upper intermediate",
        lang_basic: "Basic",

        //hobbies
        hobbies: "HOBBIES & INTERESTS",
        hobby1: "Music",
        hobby2: "Cinema",
        hobby3: "Photography",
        hobby4: "Fishing",
        hobby5: "Video games",
        professional_profile: "PROFESSIONAL PROFILE",
        profile_desc1: "Responsible for computer network security and data protection, with solid technical training as an IT expert and cross-disciplinary skills in software development, cybersecurity, and IT systems management.",
        profile_desc2: "I have gained practical experience with various programming languages and with system automation and monitoring tools.",
        profile_desc3: "I successfully completed the IFTS specialization course “Responsible for computer network security and data protection,” during which I studied ethical hacking, cryptography, analysis and management of IT incidents, and implementation of corporate security policies.",

        // skill tecniche
        technical_skills: "TECHNICAL SKILLS",
        tech1: "Java, C++ (Basic - academic)",
        tech2: "Full stack web development (HTML, CSS, JS, PHP, SQL, Next.js, Node.js, Bootstrap) (Intermediate - practical experience)",
        tech3: "Database design (Intermediate - Practical experience)",
        tech4: "Client-server software application development (Advanced - Practical experience)",
        tech5: "API development and use of external APIs (Intermediate - Practical experience)",
        tech6: "Development using AI (Advanced - Practical experience)",
        tech7: "Prompt engineering and use of language models (Advanced - practical experience)",
        tech8: "Network infrastructure design (Intermediate)",
        tech9: "Use of Linux and Windows operating systems (Advanced - practical experience)",
        tech10: "IT skills (Advanced)",
        tech11: "Use of Git and versioning best practices (Intermediate - practical experience)",
        tech12: "Cybersecurity (Intermediate)",
        tech13: "Encryption and secure data exchange (Basic)",
        tech14: "Ethical hacking (Basic - Intermediate)",
        tech15: "Blockchain (Theoretical knowledge)",
        tech16: "AWS Cloud (Basic)",
        tech17: "IT risk analysis and assessment (Intermediate)",
        tech18: "Security incident management (Basic)",
        tech19: "Automation with Ansible and Terraform (Basic)",
        tech20: "Knowledge of fundamental Kubernetes concepts (Theoretical knowledge)",

        // formazione
        education: "EDUCATION",
        edu_title1: "Network Security and Data Protection Manager",
        edu_desc1: "IFTS: Prato, 09/2024 - 10/2025",
        edu_ifts: "IFTS Cyber Security Specialist 3",
        edu_cert: "Higher Technical Specialization Certificate and Professional Qualification of Tuscany Region (IV European level)",
        edu_cert_score: "Score: 93/100",
        edu_title2: "Diploma: IT Specialist",
        edu_desc2: "ITIS Antonio Meucci - Florence, 09/2021 - 07/2024",

        // lavoro
        work_experience: "WORK EXPERIENCE",
        job_title2: "Internship at Neboola S.R.L.",
        job_time2: "Florence, 05/2025 - 07/2025",
        job_desc2: "I've done an internship at Neboola S.R.L., where I am applying my skills in cloud infrastructure and cybersecurity to real-world projects. Gained hands-on experience with infrastructure as code using Terraform, automated configuration management with Ansible, and container orchestration fundamentals with Kubernetes.",
        job_title1: "Full stack Web Developer",
        job_time1: "Florence, 09/2024 - ongoing",
        job_desc1: "Development of full stack web applications with modern technologies such as Next.js, React, Node.js. I have worked on independent projects, managing the entire development cycle, from design to deployment, with particular attention to code security and efficiency.",
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

    title.textContent = 'CV - Iacopo Libero Bernabei';
    // Aggiorna il titolo della pagina
    if (language === 'en') {
        htmlLang.setAttribute('lang', 'en');
    } else {
        htmlLang.setAttribute('lang', 'it');
    }

    currentLanguage = language;
}

function downloadCV(){
    const lang = currentLanguage === 'en' ? 'EN' : 'IT';
    const filename = `CV_Iacopo_Libero_Bernabei_${lang}.pdf`;
    
    // Mostra notifica di download
    showDownloadNotification(lang);
    
    // Crea un elemento link temporaneo per forzare il download
    const link = document.createElement('a');
    link.href = filename;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function showDownloadNotification(lang) {
    // Messaggio basato sulla lingua
    const message = lang === 'EN' ? 'CV download started!' : 'Download CV iniziato!';
    
    // Crea la notifica
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, rgba(157, 140, 85, 0.9), rgba(157, 140, 85, 1));
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        font-family: 'Open Sans', sans-serif;
        font-weight: 500;
        font-size: 14px;
        backdrop-filter: blur(10px);
        transform: translateX(400px);
        transition: all 1.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        display: flex;
        align-items: center;
        gap: 10px;
    `;
    
    // Aggiungi icona di download
    notification.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7,10 12,15 17,10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
        </svg>
        ${message}
    `;
    
    document.body.appendChild(notification);
    
    // Animazione di entrata
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Rimozione automatica dopo 3 secondi
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        notification.style.opacity = '0';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 400);
    }, 3000);
}

/*
// Funzione per scaricare il CV
function downloadCV() {
    const lang = currentLanguage === 'en' ? 'EN' : 'IT';
    const filename = `CV_Iacopo_Libero_Bernabei_${lang}`;

    // Nascondi il selettore di lingua prima della generazione PDF
    const languageSelector = document.querySelector('.language-selector');
    const originalDisplay = languageSelector.style.display;
    languageSelector.style.display = 'none';

    // Ottieni il contenitore del CV
    const element = document.querySelector('.container');
    const foto = document.getElementById('foto');

    // Rimuovi il margine top e bottom e riduci il font del 10%
    const originalFontSize = element.style.fontSize;
    const originalMargin = element.style.marginTop;
    element.style.marginTop = '0';
    element.style.marginBottom = '0';

    // Applica una trasformazione per ridurre l'altezza all'80% e il testo
    const originalTransform = element.style.transform;
    const originalFotox = foto.style.transform;
    const originalFotoTransform = foto.style.transform;
    element.style.transform = 'scaleY(0.8)';
    element.style.transformOrigin = 'top center';
    foto.style.transform = 'scaleX(0.8)';
    foto.style.transformOrigin = 'center';

    // Configurazioni per html2pdf
    const opt = {
        filename: filename + '.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
            scale: 4,
            useCORS: true,
            letterRendering: true
        },
        jsPDF: {
            unit: 'in',
            format: 'a3',
            orientation: 'portrait',
            compress: true,
            margin: [0.0, 0.0, 0.0, 0.0]
        }
    };

    // Controlla se html2pdf è disponibile
    if (typeof html2pdf !== 'undefined') {
        // Genera e scarica il PDF
        html2pdf().set(opt).from(element).save().then(() => {
            // Ripristina la trasformazione e il selettore di lingua
            element.style.transform = originalTransform;
            element.style.marginTop = originalMargin;
            element.style.marginBottom = originalMargin;
            foto.style.transform = originalFotox;
            setTimeout(() => {
                languageSelector.style.display = originalDisplay || 'flex';
            }, 500);
        });
    } else {
        // Fallback: usa il metodo di stampa standard
        setTimeout(() => {
            window.print();
            // Ripristina la trasformazione
            element.style.transform = originalTransform;
            element.style.marginTop = originalMargin;
            element.style.marginBottom = originalMargin;
            foto.style.transform = originalFotox;
            setTimeout(() => {
                languageSelector.style.display = originalDisplay || 'flex';
            }, 1000);
        }, 100);
    }
}
*/

// Event listener per il cambio lingua
document.addEventListener('DOMContentLoaded', function () {
    const languageSelector = document.getElementById('languageSelector');

    languageSelector.addEventListener('change', function () {
        const selectedLanguage = this.value;
        translateContent(selectedLanguage);
    });

    // Imposta la lingua iniziale
    translateContent('it');
});