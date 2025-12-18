// ==============================
// CONFIGURARE GENERALĂ
// ==============================
const testingMode = false; // Pune true dacă vrei să testezi tu, false ca să meargă normal

const calendarContainer = document.getElementById("calendar");
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modal-title");
const modalBody = document.getElementById("modal-body");
const closeBtn = document.querySelector(".close-btn");

// ==============================
// COLECȚIA DE PIXEL ART (DATABASE)
// ==============================
const gridColumns = 32; 

const pixelArtCollection = {
    // 1. BRADUL (Ziua 1)
    tree: [
        "XXXXXXXXXXXXXXXKXXXXXXXXXXXXXXXX",
        "XXXXXXXXXXXXXXKYKXXXXXXXXXXXXXXX",
        "XXXXXXXXXXXXXKYYYKXXXXXXXXXXXXXX",
        "XXXXXXXXXXXXXXKYKXXXXXXXXXXXXXXX",
        "XXXXXXXXXXXXXKYKYKXXXXXXXXXXXXXX",
        "XXXXXXXXXXXXKGGGGGKXXXXXXXXXXXXX",
        "XXXXXXXXXXXKGGGGGRRKXXXXXXXXXXXX",
        "XXXXXXXXXXKYGGGGGRRGKXXXXXXXXXXX",
        "XXXXXXXXKKGGYGGGGGGGYKKXXXXXXXXX",
        "XXXXXXKKGGGGGYYGGGYYGGGKKXXXXXXX",
        "XXXXXXXXKKKGGGGYYYGGKKKXXXXXXXXX",
        "XXXXXXXXXXKKGGGGGGGKKXXXXXXXXXXX",
        "xxxxxxxxxkGGKKKKKKKGGkxxxxxxxxxx",
        "XXXXXXXXKYGGGGGGGGGGGGKXXXXXXXXX",
        "XXXXXXXKGRRGGGGGGGGGGGYKXXXXXXXX",
        "XXXXXKKGGRRYGGGGGGGGYYGGKKXXXXXX",
        "XXXKKGGGGGGGYYGGBBYYGGGGGGKKXXXX",
        "XXXXXKKKKGGGGGYYBBGGGGKKKKXXXXXX",
        "XXXXXXXXXKKGGGGGGGGGKKXXXXXXXXXX",
        "XXXXXXXXKGGKKKKKKKKKGGKXXXXXXXXX",
        "XXXXXXXKYGGGGGGGGGGGGGGKXXXXXXXX",
        "XXXXXKKGGYGGGGGGGGGGGGGGKKXXXXXX",
        "XXXXKGGGGGYYGGGGGGGGGGYYGGKXXXXX",
        "XXKKGGGGGBBGYYYGGGGYYRRGGGGKKXXX",
        "XXXXKKGGGYYGGGGYYYYGGRRGGKKXXXXX",
        "XXXXXKKGGGGGGGGGGGGGGGGGKKXXXXXX",
        "XXXXXXXKKKKGGGGGGGGGKKKKXXXXXXXX",
        "XXXXXXXXXXXKKKKKKKKKXXXXXXXXXXXX",
        "XXXXXXXXXXXXXKTTTKXXXXXXXXXXXXXX",
        "XXXXXXXXXXXXKTTTTTKXXXXXXXXxxxxx",
        "XXXXXXXXXXXKKKKKKKKKXXXXXXXXXXXX"
    ]
};

// ==============================
// CONȚINUTUL ZILELOR
// ==============================
const adventData = [
    { 
        day: 1, 
        content: `
            <p style="font-size: 1.1em; line-height: 1.6;">
                Bună, Vali! =) Se pare că mi-ai luat-o înainte, dar asta nu înseamnă că nu o să o fac și eu. 
                Menționez că e prima dată când fac asta, deci sper să nu fie un mare eșec. =)
            </p>
            <p style="font-size: 1.1em; line-height: 1.6;">
                Mă bucur că am ajuns în cea mai faină perioadă a anului fără să mă omori, 
                așa că apasă butonul de mai jos și vezi prima surpriză.
            </p>
            <p style="font-size: 1em; color: #f1c40f;">
                A, da! Să nu uiți să te uiți la filme de Crăciun! Pwp <3
            </p>
            
            <button id="startBtn" class="christmas-btn" onclick="startSurprise('tree', 'IT\\'S TIMEEE...')">🎄 Apasă Aici 🎄</button>

            <div id="animation-container">
                <div id="time-text-modal"></div>
                <div id="pixel-grid-container"></div>
            </div>
        ` 
    },
    { 
        day: 2, 
        content: `
            <p style="font-size: 1.1em; line-height: 1.6;">
                Bună, Vali! <3 Sper că ți-a plăcut bradul de ieri. 
                Azi o să fie ceva mult mai clasic, mai simplu și, mai ales, mai simbolic.
            </p>
            <p style="font-size: 1.1em; line-height: 1.6;">
                Scopul acestui calendar este să transmit câte un mesaj zilnic, iar mesajul de azi este:
                <strong>Știu că urmează o perioadă aglomerată (proiecte AI, Python, Licență etc.), dar vreau să știi că, oricând ai nevoie și pentru orice, eu sunt aici. =)</strong>
            </p>
            <p style="font-size: 0.9em; color: #aaa; margin-top: 15px;">
                (Puțin cam prea șiropos pentru tine, așa că: te urăsc! Echilibrez oleacă balanța =) )
            </p>

            <button id="startBtn" class="christmas-btn" onclick="startSurprise(null, '', 'assets/broasca_craciun.png')">🐸 Vezi Surpriza 🎅</button>

            <div id="animation-container">
                <div id="time-text-modal"></div>
                <div id="pixel-grid-container"></div>
            </div>
        ` 
    },
    { 
        day: 3, 
        content: `
            <p style="font-size: 1.1em; line-height: 1.6;">
                Bună, Vali! <3<br>
                În primul rând, <strong>Crăciun Fericit!</strong> 🎄<br>
                Iar în al doilea rând, știu că te stresezi foarte mult pentru facultate, dar în această zi de 3 Decembrie îți sugerez să te bucuri cât mai mult și să faci ce îți place: filme, jocuri (orice!) și, mai ales, somn. Gata cu nopțile nedormite!
            </p>
            <p style="font-size: 1.1em; line-height: 1.6;">
                Nu uita să te bucuri alături de filmele de Crăciun mult iubite. =)
            </p>
            <p style="font-size: 0.9em; color: #aaa; margin-top: 15px;">
                Momentan, sincer, nu mai știu ce să zic decât... distracție plăcutăăă!!
            </p>

            <button id="startBtn" class="christmas-btn" onclick="startSurprise(null, '', 'assets/laptop_ceai.png')">☕ Vezi Surpriza 🎮</button>

            <div id="animation-container">
                <div id="time-text-modal"></div>
                <div id="pixel-grid-container"></div>
            </div>
        ` 
    },
    { 
        day: 4, 
        content: `
            <p style="font-size: 1.1em; line-height: 1.6;">
                Hellooo, girl! <3
            </p>
            <p style="font-size: 1.1em; line-height: 1.6;">
                Astăzi vreau să îți zic că sunt mândru de tine și te felicit că te-ai chinuit și, într-un final, ai reușit să faci la SI (știi tu bine ce). Te invidiez pentru asta, eu cel mai probabil aș fi renunțat, deci bravooo! 👏
            </p>
            <p style="font-size: 1.1em; line-height: 1.6;">
                Eu zic că acum meriți să te bucuri, să te joci, să vezi un film, absolut orice îți place.
            </p>
            <p style="font-size: 1.1em; line-height: 1.6;">
                A, și btw, mersi mult pentru ajutor la orice și oricând, inclusiv acum la AI.
            </p>
            <p style="font-size: 0.9em; color: #f1c40f; margin-top: 15px;">
                P.S. Foarte cool stickerul, e pe laptop pe vecie! =)
            </p>

            <button id="startBtn" class="christmas-btn" onclick="startSurprise(null, '', 'assets/vali_bate_anca.png')">Surprise</button>

            <div id="animation-container">
                <div id="time-text-modal"></div>
                <div id="pixel-grid-container"></div>
            </div>
        ` 
    },
    { 
        day: 5, 
        content: `
            <p style="font-size: 1.1em; line-height: 1.6;">
                Bună, Vali <3
            </p>
            <p style="font-size: 1.1em; line-height: 1.6;">
                Din păcate uitasem să fac pentru azi, așa că o să las doar un desen drăguț. Hai că mai e puțin până la vacanță! =)
            </p>
            <p style="font-size: 1.2em; color: #f1c40f; margin-top: 15px;">
                <strong>#rezistăm</strong>
            </p>

            <button id="startBtn" class="christmas-btn" onclick="startSurprise(null, '', 'assets/vali_si_zapada.png')">❄️ Vezi Desenul ❄️</button>

            <div id="animation-container">
                <div id="time-text-modal"></div>
                <div id="pixel-grid-container"></div>
            </div>
        ` 
    },
    { 
        day: 6, 
        content: `
            <p style="font-size: 1.1em; line-height: 1.6;">
                Bună, Vali! <3
            </p>
            <p style="font-size: 1.1em; line-height: 1.6;">
                Azi nimic special, doar weekend plăcut și zi fericită de Moș Nicolaeee!!! 🎅
            </p>

            <button id="startBtn" class="christmas-btn" onclick="startSurprise(null, '', 'assets/mos_nicolae.png')">🎅 Vezi Surpriza 🎅</button>

            <div id="animation-container">
                <div id="time-text-modal"></div>
                <div id="pixel-grid-container"></div>
            </div>
        ` 
    },
    { 
        day: 7, 
        content: `
            <p style="font-size: 1.1em; line-height: 1.6;">
                Bună, Vali <3
            </p>
            <p style="font-size: 1.1em; line-height: 1.6;">
                Îți urez mult succes la prezentare! Eu zic că îi rupi în două și o să rămână cu gura căscată (la fel ca noi când vedem poza de mai jos).
            </p>
            <p style="font-size: 1.3em; color: #f1c40f; margin-top: 15px;">
                <strong>SUCCES MULT!!! 🍀</strong>
            </p>
            <p style="font-size: 0.9em; color: #aaa; margin-top: 10px;">
                (Să mă anunți cum a fost!)
            </p>

            <button id="startBtn" class="christmas-btn" onclick="startSurprise(null, '', 'assets/poza_frumoasa.jpg')">🌟 Vezi Poza 🌟</button>

            <div id="animation-container">
                <div id="time-text-modal"></div>
                <div id="pixel-grid-container"></div>
            </div>
        ` 
    },
    { 
        day: 8, 
        content: `
            <p style="font-size: 1.1em; line-height: 1.6;">
                Bună, Vali <3
            </p>
            <p style="font-size: 1.1em; line-height: 1.6;">
                În primul rând, sper că ți-ai revenit și în al doilea rând: <strong>FELICITĂRI!!!!</strong> pentru prezentarea la Pedagogie! 🎉
            </p>
            <p style="font-size: 1.1em; line-height: 1.6;">
                Acum odihnă și fără griji (asta dacă nu ajung eu pentru vr... =) ). Mă bucur mult că ai terminat oarecum și ce ținea de Pedagogie.
            </p>
            <p style="font-size: 1.1em; line-height: 1.6; color: #f1c40f;">
                <strong>Încă 16 zile! ❤️</strong>
            </p>

            <button id="startBtn" class="christmas-btn" onclick="startSurprise(null, '', 'assets/poza_mare.jpg')">🎉 Vezi Surpriza 🎉</button>

            <div id="animation-container">
                <div id="time-text-modal"></div>
                <div id="pixel-grid-container"></div>
            </div>
        ` 
    },
    { 
        day: 9, 
        content: `
            <p style="font-size: 1.1em; line-height: 1.6;">
                Bună, Vali <3
            </p>
            <p style="font-size: 1.1em; line-height: 1.6;">
                Singurul lucru care pot spune că e pozitiv e că pe săptămâna asta am scăpat de IRM și suntem și mai aproape de CRĂCIUN! ❄️❄️❄️
            </p>
            <p style="font-size: 1.1em; line-height: 1.6;">
                Cu ocazia asta, îți urez odihnă plăcută și sper că te distrezi! =)
            </p>
            <p style="font-size: 0.9em; color: #aaa; margin-top: 10px;">
                Nu știu ce să mai zic, dar atașez o poză drăguță! =)
            </p>

            <button id="startBtn" class="christmas-btn" onclick="startSurprise(null, '', 'assets/brad_alessio.jpg')">🎄 Vezi Poza 🎄</button>

            <div id="animation-container">
                <div id="time-text-modal"></div>
                <div id="pixel-grid-container"></div>
            </div>
        ` 
    },
    { 
        day: 10, 
        content: `
            <p style="font-size: 1.1em; line-height: 1.6;">
                Bună, Vali <3
            </p>
            <p style="font-size: 1.1em; line-height: 1.6;">
                Sper că a fost o zi bună pentru tine! Aici prefer să nu las idei proaste, dar zic doar că probabil mă apuc de proiectul la Python.
            </p>
            <p style="font-size: 1.1em; line-height: 1.6;">
                Sper că ziua ta a fost (sau poate încă este) una foarte bună!
            </p>
            <p style="font-size: 1.2em; color: #f1c40f; margin-top: 15px;">
                <strong>Încă 15 zile! ❤️</strong>
            </p>

            <button id="startBtn" class="christmas-btn" onclick="startSurprise(null, '', 'assets/poza_ferrari.jpg')">🏎️ Vezi Poza 🏎️</button>

            <div id="animation-container">
                <div id="time-text-modal"></div>
                <div id="pixel-grid-container"></div>
            </div>
        ` 
    },
    { 
        day: 11, 
        content: `
            <p style="font-size: 1.1em; line-height: 1.6;">
                Hello, Girllll <3
            </p>
            <p style="font-size: 1.1em; line-height: 1.6;">
                Pe azi chiar nu am nimic de zis decât <strong>SUCCES la AI</strong> și Doamne ajută să fie bine! 🙏
            </p>
            <p style="font-size: 1.2em; color: #f1c40f; margin-top: 15px;">
                <strong>P.S. -14 ❤️</strong>
            </p>

            <button id="startBtn" class="christmas-btn" onclick="startSurprise(null, '', 'assets/poza_day11.jpg')">🎄 Vezi Poza 🎄</button>

            <div id="animation-container">
                <div id="time-text-modal"></div>
                <div id="pixel-grid-container"></div>
            </div>
        ` 
    },
    { 
        day: 12, 
        content: `
            <p style="font-size: 1.1em; line-height: 1.6;">
                Bună, Vali <3
            </p>
            <p style="font-size: 1.1em; line-height: 1.6;">
                Sper că ai avut o zi extraordinară și încă oleacă și o să vezi cadou =))
            </p>
            <p style="font-size: 1.1em; line-height: 1.6;">
                Până atunci îți las video asta cool!
            </p>
            <p style="font-size: 1.1em; line-height: 1.6; color: #f1c40f;">
                <strong>P.S. Încă 13 zile ❤️</strong>
            </p>

            <button id="startBtn" class="christmas-btn" onclick="startSurprise(null, '', 'https://quickshare.samsungcloud.com/dXHeBwYgFHZd')">🔗 Deschide Linkul 🔗</button>

            <div id="animation-container">
                <div id="time-text-modal"></div>
                <div id="pixel-grid-container"></div>
            </div>
        ` 
    },
    { 
        day: 13, 
        content: `
            <p style="font-size: 1.1em; line-height: 1.6;">
                Bună, girl <3
            </p>
            <p style="font-size: 1.1em; line-height: 1.6;">
                Sper că ai reușit azi să te odihnești și să te distrezi — chiar sunt curios ce jocuri o să primim moka =)
            </p>
            <p style="font-size: 1.1em; line-height: 1.6;">
                Acum îți las o mică surpriză. P.S. Mersi, e <strong>SUPER FAIN</strong> (o să te prinzi după ce vezi poza)
            </p>

            <button id="startBtn" class="christmas-btn" onclick="startSurprise(null, '', 'assets/cadou_vali_mos_nicolae.jpg')">🎁 Vezi Cadoul 🎁</button>

            <div id="animation-container">
                <div id="time-text-modal"></div>
                <div id="pixel-grid-container"></div>
            </div>
        ` 
    },
    { 
        day: 14, 
        content: `
            <p style="font-size: 1.1em; line-height: 1.6;">
                Bună, Valii <3
            </p>
            <p style="font-size: 1.1em; line-height: 1.6;">
                Mâine e ziua cea mare =) Sper că te-ai bucurat de weekendul ăsta, acum îți atașez ceva frumos. Have funnn!!!
            </p>

            <button id="startBtn" class="christmas-btn" onclick="startSurprise(null, '', 'assets/poza1_day14.jpg||assets/poza2_day14.jpg')">🎉 Deschide Pozele 🎉</button>

            <div id="animation-container">
                <div id="time-text-modal"></div>
                <div id="pixel-grid-container"></div>
            </div>
        ` 
    },
    { 
        day: 15, 
        content: `
            <p style="font-size: 1.1em; line-height: 1.6;">
                Helloo <3
            </p>
            <p style="font-size: 1.1em; line-height: 1.6;">
                Azi o să vezi cadou (dacă nu cumva l-ai văzut deja), sper să-ți placă și sper că nu am dat-o în gard cu cadoul <3
            </p>
            <p style="font-size: 1.1em; line-height: 1.6;">
                P.S. Atașez o poză cute pe care am făcut-o vineri
            </p>

            <button id="startBtn" class="christmas-btn" onclick="startSurprise(null, '', 'assets/poza_cute.jpg')">📷 Vezi Poza 📷</button>

            <div id="animation-container">
                <div id="time-text-modal"></div>
                <div id="pixel-grid-container"></div>
            </div>
        ` 
    },
    { 
        day: 16, 
        content: `
            <p style="font-size: 1.1em; line-height: 1.6;">
                Bună, Valiii <3
            </p>
            <p style="font-size: 1.1em; line-height: 1.6;">
                Suntem pe 17 și uitasem să fac, sorryy! Atașez o poză drăguță, chiar dacă ai și tu ceva asemănător =)
            </p>

            <button id="startBtn" class="christmas-btn" onclick="startSurprise(null, '', 'assets/brad_MallMoldova.jpg')">🎄 Vezi Poza 🎄</button>

            <div id="animation-container">
                <div id="time-text-modal"></div>
                <div id="pixel-grid-container"></div>
            </div>
        ` 
    },
    { 
        day: 17, 
        content: `
            <p style="font-size: 1.1em; line-height: 1.6;">
                Helloooo, ce faci? <3
            </p>
            <p style="font-size: 1.1em; line-height: 1.6;">
                Sper că te distrezi în timp ce te joci RDR2 și e totul fain! Azi am făcut și pentru ziua de ieri deoarece uitasem (sorry).
            </p>
            <p style="font-size: 1.2em; color: #f1c40f; margin-top: 15px;">
                <strong>HAVE FUNNN ❤️</strong>
            </p>
            <p style="font-size: 0.9em; color: #aaa; margin-top: 10px;">
                P.S. Atașez și eu o poză cute!
            </p>

            <button id="startBtn" class="christmas-btn" onclick="startSurprise(null, '', 'assets/bradMare_Alessio.jpg')">🎄 Vezi Poza 🎄</button>

            <div id="animation-container">
                <div id="time-text-modal"></div>
                <div id="pixel-grid-container"></div>
            </div>
        ` 
    },
    { 
        day: 18, 
        content: `
            <p style="font-size: 1.1em; line-height: 1.6;">
                Bună, Valii <3
            </p>
            <p style="font-size: 1.1em; line-height: 1.6;">
                Nimic de zis pe azi decât că nu reușesc nimic pe IRM, dar aia e... Important e că mai sunt <strong>7 zile până la CRĂCIUNNNN!</strong> 🎄
            </p>
            <p style="font-size: 1.2em; color: #f1c40f; margin-top: 15px;">
                <strong>Have fun ❤️</strong>
            </p>
            <p style="font-size: 0.9em; color: #aaa; margin-top: 10px;">
                P.S. Sper că te distrezi pe RDR2! =)
            </p>

            <button id="startBtn" class="christmas-btn" onclick="startSurprise(null, '', 'assets/brad_camin.jpg')">🎄 Vezi Poza 🎄</button>

            <div id="animation-container">
                <div id="time-text-modal"></div>
                <div id="pixel-grid-container"></div>
            </div>
        ` 
    },
    // ... restul zilelor ...
];


// ==============================
// LOGICA STANDARD A CALENDARULUI
// ==============================
for (let i = 1; i <= 24; i++) {
    const dayDiv = document.createElement("div");
    dayDiv.classList.add("day-card");
    dayDiv.innerText = i;

    const today = new Date();
    const currentDay = today.getDate();
    const currentMonth = today.getMonth(); 

    if (!testingMode && (currentMonth !== 11 || i > currentDay)) {
        dayDiv.classList.add("locked");
        dayDiv.onclick = () => alert("Nu trișa! Încă nu e ziua potrivită 😜");
    } else {
        dayDiv.onclick = () => openModal(i);
    }
    calendarContainer.appendChild(dayDiv);
}

function openModal(day) {
    const data = adventData.find(d => d.day === day);
    const content = data ? data.content : "Surpriză în lucru!";
    modalTitle.innerText = "Ziua " + day;
    modalBody.innerHTML = content; 
    modal.style.display = "block";
}

closeBtn.onclick = () => {
    modal.style.display = "none";
};
window.onclick = (event) => {
    if (event.target == modal) { 
        modal.style.display = "none";
    }
}

// ==============================
// LOGICA PENTRU SURPRIZA ANIMATĂ
// ==============================

function startSurprise(artName, textToShow, imagePath = null) {
    document.getElementById('startBtn').style.display = 'none';
    const animContainer = document.getElementById('animation-container');
    animContainer.style.display = 'block';

    const timeText = document.getElementById('time-text-modal');
    const gridContainer = document.getElementById('pixel-grid-container');
    
    // Curățăm conținutul vechi
    timeText.innerHTML = "";
    gridContainer.innerHTML = "";
    
    // Resetăm stilurile
    gridContainer.style.display = '';
    gridContainer.style.gridTemplateColumns = '';
    gridContainer.style.padding = '5px'; // Reset padding default

    // Funcția care decide ce afișăm (Link extern, Poză, Video sau Pixel Art)
    const showContent = () => {
        if (imagePath) {
            // Verificăm dacă e link extern, video sau imagine
            const isExternalLink = imagePath.startsWith('http://') || imagePath.startsWith('https://');
            const isVideo = imagePath.endsWith('.mp4') || imagePath.endsWith('.webm') || imagePath.endsWith('.ogg');
            const isMultiImage = imagePath.includes('||');
            
            if (isExternalLink) {
                // === LOGICA PENTRU LINK EXTERN ===
                // Creăm un wrapper pentru a forța lățimea și alinierea
                const wrap = document.createElement('div');
                wrap.style.display = 'flex';
                wrap.style.justifyContent = 'center';
                wrap.style.width = '100%';
                wrap.style.boxSizing = 'border-box';
                wrap.style.padding = '10px 0';

                const btn = document.createElement('button');
                btn.className = 'christmas-btn';
                btn.textContent = '🔗 Deschide linkul (QuickShare)';
                btn.onclick = function() { window.open(imagePath, '_blank', 'noopener'); };
                btn.style.display = 'inline-block';
                btn.style.maxWidth = '420px';
                btn.style.width = '100%';

                // Backup: text link copyable
                const backup = document.createElement('div');
                backup.style.marginTop = '10px';
                backup.style.textAlign = 'center';
                backup.style.color = '#f1c40f';
                backup.style.fontSize = '0.95em';

                const urlSpan = document.createElement('span');
                urlSpan.textContent = imagePath;
                urlSpan.style.wordBreak = 'break-all';
                urlSpan.style.display = 'block';
                urlSpan.style.marginBottom = '6px';
                urlSpan.style.color = '#fff';

                const copyBtn = document.createElement('button');
                copyBtn.textContent = 'Copiază link';
                copyBtn.className = 'christmas-btn';
                copyBtn.style.display = 'inline-block';
                copyBtn.style.maxWidth = '200px';
                copyBtn.onclick = function() {
                    navigator.clipboard && navigator.clipboard.writeText(imagePath).then(() => {
                        copyBtn.textContent = 'Copiat!';
                        setTimeout(() => copyBtn.textContent = 'Copiază link', 1500);
                    });
                };

                backup.appendChild(urlSpan);
                backup.appendChild(copyBtn);

                gridContainer.style.display = 'block';
                gridContainer.style.padding = '10px';
                gridContainer.style.backgroundColor = 'transparent';
                gridContainer.style.border = 'none';
                gridContainer.style.width = '100%';

                wrap.appendChild(btn);
                gridContainer.appendChild(wrap);
                gridContainer.appendChild(backup);
                startSnowfall(animContainer);
            } else if (isMultiImage) {
                // === LOGICA PENTRU MAI MULTE POZE ===
                const paths = imagePath.split('||').map(s => s.trim()).filter(Boolean);
                const gallery = document.createElement('div');
                gallery.style.display = 'flex';
                gallery.style.flexWrap = 'wrap';
                gallery.style.justifyContent = 'center';
                gallery.style.gap = '10px';

                paths.forEach(p => {
                    const img = document.createElement('img');
                    img.src = p;
                    img.style.maxWidth = '45%';
                    img.style.width = '100%';
                    img.style.height = 'auto';
                    img.style.objectFit = 'contain';
                    img.style.borderRadius = '8px';
                    img.style.cursor = 'zoom-in';
                    img.onclick = () => openFullscreen(p);
                    gallery.appendChild(img);
                });

                gridContainer.style.display = 'block';
                gridContainer.style.padding = '10px';
                gridContainer.style.backgroundColor = 'transparent';
                gridContainer.style.border = 'none';
                gridContainer.appendChild(gallery);
                startSnowfall(animContainer);
            } else if (isVideo) {
                // === LOGICA PENTRU VIDEO ===
                const video = document.createElement('video');
                video.src = imagePath;
                video.controls = true;
                video.autoplay = true;
                
                video.style.width = '100%'; 
                video.style.height = 'auto'; 
                video.style.maxHeight = '60vh'; 
                video.style.objectFit = 'contain'; 
                video.style.borderRadius = '10px';
                video.style.display = 'block'; 
                video.style.margin = '0 auto'; 
                video.style.animation = 'fadeIn 1s';
                
                gridContainer.style.display = 'block';
                gridContainer.style.padding = '0';
                gridContainer.style.backgroundColor = 'transparent'; 
                gridContainer.style.border = 'none'; 
                
                gridContainer.appendChild(video);
                startSnowfall(animContainer);
            } else {
                // === LOGICA PENTRU POZĂ (ZIUA 2, 3, 4 etc.) ===
                const img = document.createElement('img');
                img.src = imagePath;
                
                img.style.width = '100%'; 
                img.style.height = 'auto'; 
                img.style.maxHeight = '60vh'; 
                img.style.objectFit = 'contain'; 
                
                img.style.borderRadius = '10px';
                img.style.display = 'block'; 
                img.style.margin = '0 auto'; 
                img.style.animation = 'fadeIn 1s';
                
                img.style.cursor = 'zoom-in'; 
                img.onclick = function() {
                    openFullscreen(imagePath);
                };
                
                gridContainer.style.display = 'block';
                gridContainer.style.padding = '0';
                gridContainer.style.backgroundColor = 'transparent'; 
                gridContainer.style.border = 'none'; 
                
                gridContainer.appendChild(img);
                startSnowfall(animContainer);
            }
        } else {
            // === LOGICA PENTRU PIXEL ART (ZIUA 1) ===
            gridContainer.style.display = 'grid';
            gridContainer.style.gridTemplateColumns = `repeat(${gridColumns}, 10px)`;
            
            if(artName === 'tree') {
                 startSnowfall(animContainer); 
            }
            
            const matrixToDraw = pixelArtCollection[artName];
            drawPixelGrid(matrixToDraw, gridContainer, 3); 
        }
    };

    if (textToShow && textToShow.length > 0) {
        typeWriter(textToShow, "time-text-modal", 100, showContent);
    } else {
        timeText.style.display = 'none';
        showContent();
    }
}

// ==============================
// LOGICA FULL SCREEN
// ==============================
function openFullscreen(imageSrc) {
    let overlay = document.getElementById('fullscreen-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'fullscreen-overlay';
        overlay.innerHTML = `
            <span class="fs-close-btn">&times;</span>
            <img id="fullscreen-img" src="">
        `;
        document.body.appendChild(overlay);

        overlay.onclick = function(e) {
            if (e.target !== document.getElementById('fullscreen-img')) {
                closeFullscreen();
            }
        };
        document.querySelector('.fs-close-btn').onclick = closeFullscreen;
    }

    const fsImg = document.getElementById('fullscreen-img');
    fsImg.src = imageSrc;
    overlay.style.display = 'flex';
}

function closeFullscreen() {
    const overlay = document.getElementById('fullscreen-overlay');
    if (overlay) {
        overlay.style.display = 'none';
    }
}

document.addEventListener('keydown', function(event) {
    if (event.key === "Escape") {
        closeFullscreen();
    }
});

// ==============================
// FUNCȚII AUXILIARE
// ==============================

function startSnowfall(container) {
    const numberOfFlakes = 30; 
    for (let i = 0; i < numberOfFlakes; i++) {
        const flake = document.createElement('div');
        flake.classList.add('snowflake');
        flake.innerHTML = '❄'; 
        flake.style.left = Math.random() * 100 + '%';
        flake.style.animationDuration = (Math.random() * 3 + 2) + 's'; 
        flake.style.fontSize = (Math.random() * 10 + 10) + 'px';
        container.appendChild(flake);
        setTimeout(() => { flake.remove(); }, 5000);
    }
}

function typeWriter(text, elementId, speed, callback) {
    let i = 0;
    const element = document.getElementById(elementId);
    element.style.display = 'block';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else if (callback) { callback(); }
    }
    type();
}

function drawPixelGrid(matrix, container, speed) {
    const flatPixels = matrix.map(row => row.toUpperCase()).join("").split("");
    let i = 0;

    const colorMap = {
        'X': 'p-X',       // Transparent
        'K': 'p-black',   // Negru
        'G': 'p-green',   // Verde
        'Y': 'p-yellow',  // Galben
        'R': 'p-red',     // Roșu
        'B': 'p-blue',    // Albastru
        'T': 'p-brown',   // Maro
        'W': 'p-white'    // Alb
    };

    function drawNextPixel() {
        if (i < flatPixels.length) {
            const pixelCode = flatPixels[i];
            const pixelDiv = document.createElement('div');
            pixelDiv.classList.add('pixel');
            
            if (colorMap[pixelCode]) {
                pixelDiv.classList.add(colorMap[pixelCode]);
            }
            
            container.appendChild(pixelDiv);
            i++;
            setTimeout(drawNextPixel, speed);
        }
    }
    drawNextPixel();
}