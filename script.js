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
    // 1. BRADUL (Ziua 1) - Rămâne Pixel Art
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

            <button id="startBtn" class="christmas-btn" onclick="startSurprise(null, '', 'assets/frog_photo_2.png')">🐸 Vezi Surpriza 🎅</button>

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

    // Funcția care decide ce afișăm (Poză sau Pixel Art)
    const showContent = () => {
        if (imagePath) {
            // === LOGICA PENTRU POZĂ (ZIUA 2, 3 etc.) ===
            const img = document.createElement('img');
            img.src = imagePath;
            
            // MODIFICARE: Setări pentru FIT (încadrare perfectă)
            img.style.width = '100%'; 
            img.style.height = 'auto'; 
            img.style.maxHeight = '60vh'; 
            img.style.objectFit = 'contain'; 
            
            img.style.borderRadius = '10px';
            img.style.display = 'block'; 
            img.style.margin = '0 auto'; 
            img.style.animation = 'fadeIn 1s';
            
            // --- NOU: ADĂUGĂM CLICK PENTRU FULL SCREEN ---
            img.style.cursor = 'zoom-in'; // Arată că se poate da click
            img.onclick = function() {
                openFullscreen(imagePath);
            };
            
            // Container styles
            gridContainer.style.display = 'block';
            gridContainer.style.padding = '0';
            gridContainer.style.backgroundColor = 'transparent'; 
            gridContainer.style.border = 'none'; 
            
            gridContainer.appendChild(img);
            
            // Adăugăm ninsoare
            startSnowfall(animContainer);

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
// LOGICA FULL SCREEN (NOU)
// ==============================
function openFullscreen(imageSrc) {
    // Verificăm dacă overlay-ul există deja, dacă nu îl creăm
    let overlay = document.getElementById('fullscreen-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'fullscreen-overlay';
        overlay.innerHTML = `
            <span class="fs-close-btn">&times;</span>
            <img id="fullscreen-img" src="">
        `;
        document.body.appendChild(overlay);

        // Click pe fundal sau pe X închide
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

// Ascultăm tasta ESCAPE pentru a ieși din full screen
document.addEventListener('keydown', function(event) {
    if (event.key === "Escape") {
        closeFullscreen();
    }
});

// ==============================
// FUNCȚII AUXILIARE EXISTENTE
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