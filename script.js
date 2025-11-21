// Aici configurezi mesajele pentru fiecare zi!
const adventData = [
    { day: 1, content: "Bine ai venit! 🎅 <br> Mesajul tău de început." },
    { day: 2, content: "O poză cu noi doi! <br> <img src='https://via.placeholder.com/300' alt='Noi'>" },
    { day: 3, content: "Link către melodia noastră: <br> <a href='LINK_YOUTUBE' target='_blank'>Click aici</a>" },
    // ... continuă până la 24 ...
    { day: 24, content: "Crăciun Fericit! 🎄 Cadoul tău fizic este ascuns sub pat!" }
];

// Dacă vrei să testezi, pune true. Dacă e gata de trimis, pune false.
const testingMode = true; 

const calendarContainer = document.getElementById("calendar");
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modal-title");
const modalBody = document.getElementById("modal-body");
const closeBtn = document.querySelector(".close-btn");

// Generăm zilele
for (let i = 1; i <= 24; i++) {
    const dayDiv = document.createElement("div");
    dayDiv.classList.add("day-card");
    dayDiv.innerText = i;

    // Logica de verificare a datei
    const today = new Date();
    // Atenție: Luna Decembrie este 11 în JavaScript (0-11)
    const currentDay = today.getDate();
    const currentMonth = today.getMonth(); // Decembrie e 11

    // Dacă nu e decembrie sau ziua e mai mare decât azi, e blocat
    // (Doar dacă nu e testingMode)
    if (!testingMode && (currentMonth !== 11 || i > currentDay)) {
        dayDiv.classList.add("locked");
        dayDiv.onclick = () => alert("Nu trișa! Încă nu e ziua potrivită 😜");
    } else {
        // Dacă e ziua potrivită
        dayDiv.onclick = () => openModal(i);
    }

    calendarContainer.appendChild(dayDiv);
}

function openModal(day) {
    // Găsim conținutul pentru ziua respectivă
    // Nota: array-ul începe de la 0, deci scădem 1 sau căutăm după proprietate
    const data = adventData.find(d => d.day === day);
    const content = data ? data.content : "Surpriză în lucru!";

    modalTitle.innerText = "Surpriza din Ziua " + day;
    modalBody.innerHTML = content;
    modal.style.display = "block";
}

closeBtn.onclick = () => modal.style.display = "none";
window.onclick = (event) => {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}