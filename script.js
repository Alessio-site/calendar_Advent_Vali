// ==============================
// CONFIGURARE GENERALĂ
// ==============================
const testingMode = false; 

const calendarContainer = document.getElementById("calendar");
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modal-title");
const modalBody = document.getElementById("modal-body");
const closeBtn = document.querySelector(".close-btn");

// ==============================
// DATELE PENTRU BRAD (CONTUR 32x32)
// ==============================
const gridColumns = 32; 

// Matricea bradului (Litere MARI pentru consistență)
const treeMatrix = [
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
];

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
            
            <button id="startBtn" class="christmas-btn" onclick="startSurprise()">🎄 Apasă Aici 🎄</button>

            <div id="animation-container">
                <div id="time-text-modal"></div>
                <div id="pixel-grid-container"></div>
            </div>
        ` 
    },
    { day: 2, content: "Ziua 2 urmează curând..." },
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
// LOGICA PENTRU SURPRIZA ANIMATĂ (FĂRĂ SUNET)
// ==============================

function startSurprise() {
    document.getElementById('startBtn').style.display = 'none';
    const animContainer = document.getElementById('animation-container');
    animContainer.style.display = 'block';

    const timeText = document.getElementById('time-text-modal');
    const gridContainer = document.getElementById('pixel-grid-container');
    
    timeText.innerHTML = "";
    gridContainer.innerHTML = "";
    gridContainer.style.gridTemplateColumns = `repeat(${gridColumns}, 10px)`;

    // 1. Pornim textul IT'S TIME
    typeWriter("IT'S TIMEEE...❄️", "time-text-modal", 100, () => {
        // 2. Când textul e gata, pornim ninsoarea și bradul
        startSnowfall(animContainer); 
        drawPixelGrid(treeMatrix, gridContainer, 3);
    });
}

// Funcția de ninsoare
function startSnowfall(container) {
    const numberOfFlakes = 30; // Număr de fulgi
    for (let i = 0; i < numberOfFlakes; i++) {
        const flake = document.createElement('div');
        flake.classList.add('snowflake');
        flake.innerHTML = '❄'; 
        
        // Randomizare poziție
        flake.style.left = Math.random() * 100 + '%';
        flake.style.animationDuration = (Math.random() * 3 + 2) + 's'; 
        flake.style.fontSize = (Math.random() * 10 + 10) + 'px';
        
        container.appendChild(flake);
        
        // Curățare memorie
        setTimeout(() => {
            flake.remove();
        }, 5000);
    }
}

function typeWriter(text, elementId, speed, callback) {
    let i = 0;
    const element = document.getElementById(elementId);
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
    // Transformăm totul în majuscule pentru siguranță
    const flatPixels = matrix.map(row => row.toUpperCase()).join("").split("");
    let i = 0;

    // HARTA CULORI
    const colorMap = {
        'X': 'p-X',       // Transparent
        'K': 'p-black',   // Negru
        'G': 'p-green',   // Verde
        'Y': 'p-yellow',  // Galben (Lumină)
        'R': 'p-red',     // Roșu (Lumină)
        'B': 'p-blue',    // Albastru (Lumină)
        'T': 'p-brown'    // Maro
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