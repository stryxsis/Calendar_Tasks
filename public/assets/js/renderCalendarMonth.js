(function () {
  const H = window.Calendar && window.Calendar.helpers;
  if (!H) {
    console.error("Calendar.helpers non trovato: includi helpers.js prima di questo file");
    return;
  }
  /** Crea una header cell (nome giorno) */
  function createDayHeader(label) {
    const el = document.createElement("div");
    el.setAttribute("role", "columnheader");
    el.className = "text-center h-fit min-[426px]:p-3";
    el.textContent = label;
    return el;
  }

  /** Crea una cella giorno */
  function createDayCell(cellDate, today) {
    const cell = document.createElement("div");
    cell.setAttribute("role", "gridcell");
    cell.className = ["grid place-items-center text-center p-2 rounded-xl shadow-number aspect-square", "hover:shadow-md transition-transform hover:-translate-y-[1px] hover:scale-105 cursor-pointer"].join(" ");

    // Attributo comodo per click/hover/logica eventi
    cell.dataset.date = H.toISODate(cellDate);
    cell.setAttribute("aria-selected", "false");

    if (H.isSameDay(cellDate, today)) {
      cell.classList.remove("hover:shadow-md");
      cell.classList.add("text-white", "bg-gradient-to-br", "from-blue-500", "to-blue-600", "shadow-today", "hover:shadow-today");
      cell.setAttribute("aria-current", "date");
    }

    const dateEl = document.createElement("div");
    dateEl.textContent = cellDate.getDate();
    cell.appendChild(dateEl);

    return cell;
  }

  /** Versione migliorata: non richiede più calendarEl/monthYearEl come argomenti */
  window.renderCalendarMonth = function renderCalendarMonth(date = new Date()) {
    // Recupero elementi: usa globali se esistono, altrimenti cerca per id comuni
    const root = typeof calendarEl !== "undefined" ? calendarEl : document.getElementById("calendar");
    const header = typeof monthYearEl !== "undefined" ? monthYearEl : document.getElementById("monthYear");

    if (!root) {
      console.error("renderCalendarMonth: elemento calendario non trovato");
      return;
    }

    // Setup container
    root.className = ["grid grid-cols-7 text-sm font-semibold text-slate-600 dark:text-slate-400", "bg-white dark:bg-[#121212] p-2 gap-2 border-b border-slate-200 dark:border-slate-700"].join(" ");
    root.setAttribute("role", "grid");
    root.setAttribute("aria-label", new Intl.DateTimeFormat("it-IT", { month: "long", year: "numeric" }).format(date));

    // Pulizia
    root.innerHTML = "";

    // Calcoli base
    const year = date.getFullYear();
    const month = date.getMonth();
    const today = new Date();
    const totalDays = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonthIndex = (new Date(year, month, 1).getDay() + 6) % 7; // Lunedì=0

    const frag = document.createDocumentFragment();

    // Intestazioni giorni (Lun→Dom localizzati)
    const weekDays = H.getWeekDayShortLabels();
    weekDays.forEach((label) => frag.appendChild(createDayHeader(label)));

    // Celle vuote prima del 1° giorno del mese (invisibili ma preservano il layout)
    for (let i = 0; i < firstDayOfMonthIndex; i++) {
      const spacer = document.createElement("div");
      spacer.className = "invisible"; // occupa spazio, non appare
      spacer.setAttribute("aria-hidden", "true");
      frag.appendChild(spacer);
    }

    // Celle dei giorni
    for (let day = 1; day <= totalDays; day++) {
      const cellDate = new Date(year, month, day);
      frag.appendChild(createDayCell(cellDate, today));
    }

    // Riempie la coda per ottenere sempre 6 settimane (42 celle) → layout stabile
    const usedCells = firstDayOfMonthIndex + totalDays;
    const trailing = (7 - (usedCells % 7)) % 7;
    for (let i = 0; i < trailing; i++) {
      const spacer = document.createElement("div");
      spacer.className = "invisible";
      spacer.setAttribute("aria-hidden", "true");
      frag.appendChild(spacer);
    }

    root.appendChild(frag);
  };
})();