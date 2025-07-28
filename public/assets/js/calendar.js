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
}

function changeMonth(offset) {
  currentDate.setMonth(currentDate.getMonth() + offset);
  renderCalendar(currentDate);
}

renderCalendar(currentDate);
