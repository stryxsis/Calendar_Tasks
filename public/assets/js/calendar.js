const calendarEl = document.getElementById("calendar");
const monthYearEl = document.getElementById("monthYear");
const buttonPrev = document.getElementById("buttonPrev");
const buttonNext = document.getElementById("buttonNext");

let currentDate = new Date();

buttonPrev.addEventListener("click", () => changeMonth(-1));
buttonNext.addEventListener("click", () => changeMonth(1));

function renderCalendar(date = new Date()) {
  calendarEl.innerHTML = "";

  const year = date.getFullYear();
  const month = date.getMonth();
  const today = new Date();

  const totalDays = new Date(year, month + 1, 0).getDate();
  const fistDayOfMonth = new Date(year, month, 1).getDay();

  // Visualizza il mese e l'hanno
  monthYearEl.textContent = date.toLocaleDateString("it-IT", {
    month: "long",
    year: "numeric",
  });

  const weekDays = ["Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato", "Domenica"];
  weekDays.forEach((day) => {
    const dayEl = document.createElement("div");
    dayEl.className = "text-center p-3 h-fit";
    dayEl.textContent = day.slice(0, 3);
    calendarEl.appendChild(dayEl);
  });

  // Crea i div vuoti dove non ci sono giorni
  for (let i = 0; i < fistDayOfMonth; i++) {
    calendarEl.appendChild(document.createElement("div"));
  }

  // Creaiamo il giorno con tutto
  for (let day = 1; day <= totalDays; day++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

    const cell = document.createElement("div");
    cell.className = "grid place-items-center text-center p-2 rounded-xl shadow-number aspect-square";

    if (day === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
      // cell.className = "bg-gradient-to-br from-blue-500 to-blue-600 text-center";
      cell.className = "grid place-items-center text-center p-2 rounded-xl shadow-number text-white bg-gradient-to-br from-blue-500 to-blue-600 shadow-today text-center aspect-square";
    }

    const dateEl = document.createElement("div");
    dateEl.textContent = day;
    cell.appendChild(dateEl);

    calendarEl.appendChild(cell);
  }
}

function changeMonth(offset) {
  currentDate.setMonth(currentDate.getMonth() + offset);
  renderCalendar(currentDate);
}

renderCalendar(currentDate);
