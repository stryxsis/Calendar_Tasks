(function () {
  // Helpers
  const H = window.Calendar && window.Calendar.helpers;

  window.renderCalendarWeek = function renderCalendarWeek(date = new Date()) {
    if (!H) {
      console.error("renderCalendarWeek: Calendar.helpers non trovato. Includi calendar-helpers.js prima di questo file");
      return;
    }

    // Recupera il contenitore del global o per id FIXME:ricordati che quando sistemo switch_format di sistemare la parte del globale
    const root = typeof calendarEl !== "undefined" ? calendarEl : document.getElementById("calendar");
    if (!root) {
      console.error("renderCalendarWeek: elemento calendario non trovaro");
      return;
    }

    // Setup contenitore
    root.className = "grid grid-cols-7 text-sm font-semibold text-slate-600 dark:text-slate-400 bg-white p-2 gap-1 dark:bg-[#121212] border-b border-slate-200 dark:border-slate-700";
    root.innerHTML = "";

    const today = new Date();
    const start = H.startOfISOWeek(date);

    const frag = document.createDocumentFragment();

    for (let i = 0; i < 7; i++) {
      const cellDate = new Date(start);
      cellDate.setDate(start.getDate() + i);

      // Elementi
      const dayEl = document.createElement("div");
      const spanElDay = document.createElement("span");
      const spanElDayNum = document.createElement("span");
      const divEventsEl = document.createElement("div");

      dayEl.setAttribute("role", "gridcell");
      dayEl.className = "text-center h-fit flex flex-col border min-[426px]:border-2 border-slate-200 dark:border-slate-700 rounded-xl pt-2";

      // Evidenzia oggi
      if (H.isSameDay(cellDate, today)) {
        dayEl.classList.add("bg-gradient-to-br", "from-blue-500", "to-blue-600", "shadow-today", "text-white");
      }

      // Label giorno localizzata (es. "Lun", "Mar"), senza punto finale
      const dayLabel = new Intl.DateTimeFormat("it-IT", { weekday: "short" }).format(cellDate).replace(/\.$/, "");
      spanElDay.className = "max-[425px]:text-xs mb-2";
      spanElDay.textContent = dayLabel;

      // Numero del giorno
      spanElDayNum.className = "text-lg dark:text-white mb-3";
      spanElDayNum.textContent = cellDate.getDate();

      // Attributo utile per click/gestione eventi
      dayEl.dataset.date = H.toISODate(cellDate);

      // Montaggio
      dayEl.appendChild(spanElDay);
      dayEl.appendChild(spanElDayNum);
      dayEl.appendChild(divEventsEl);
      frag.appendChild(dayEl);
    }

    root.appendChild(frag);
  };
})();