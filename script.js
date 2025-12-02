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

            <button id="startBtn" class="christmas-btn" onclick="startSurprise(null, '', 'assets/broasca_craciun.png')">🐸 Vezi Surpriza 🎅</button>

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
            // === LOGICA PENTRU POZĂ (ZIUA 2) ===
            const img = document.createElement('img');
            img.src = imagePath;
            
            // MODIFICARE: Imaginea ocupă tot spațiul
            img.style.width = '100%'; 
            img.style.height = 'auto'; 
            img.style.borderRadius = '10px';
            img.style.display = 'block'; // Elimină spațiul mic de sub imagini
            img.style.animation = 'fadeIn 1s';
            
            // Eliminăm padding-ul containerului ca poza să atingă marginile
            gridContainer.style.padding = '0';
            gridContainer.style.backgroundColor = 'transparent'; 
            gridContainer.style.border = 'none'; // Opțional: scoate bordura albă dacă există
            
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

    // Dacă avem text, îl scriem. Dacă NU (cazul Ziua 2), afișăm direct poza.
    if (textToShow && textToShow.length > 0) {
        typeWriter(textToShow, "time-text-modal", 100, showContent);
    } else {
        // Ascundem div-ul de text ca să nu ocupe spațiu degeaba
        timeText.style.display = 'none';
        showContent();
    }
}

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
    // Ne asigurăm că elementul e vizibil
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