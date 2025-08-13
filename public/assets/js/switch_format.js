(function () {
  // ===== Prova a usare helpers centralizzati se disponibili
  const H = window.Calendar && window.Calendar.helpers;
  if (!H) {
    console.error("Calendar.helpers non trovato: includi helpers.js prima di questo file");
    return;
  }

  // ===== DOM lookups resilienti
  const monthYearEl = (typeof window.monthYearEl !== "undefined" && window.monthYearEl) || document.getElementById("monthYear");
  const calendarEl = (typeof window.calendarEl !== "undefined" && window.calendarEl) || document.getElementById("calendar");
  const buttonPrev = document.getElementById("buttonPrev");
  const buttonNext = document.getElementById("buttonNext");
  const buttonsRoot = document.getElementById("buttonsForView");

  if (!calendarEl || !buttonPrev || !buttonNext || !buttonsRoot) {
    console.error("switch_format: elementi base non trovati (calendar/buttonPrev/buttonNext/buttonsForView)");
    return;
  }

  // Cache dei bottoni di vista
  const viewButtons = Array.from(buttonsRoot.querySelectorAll("button"));

  // ===== Stato applicazione (esposto per debug)
  const state = {
    currentView: "viewMonth", // viewDay | viewWeek | viewMonth
    currentDate: new Date(),
  };

  // Espone stato per debug da console
  window.AppCalendar = window.AppCalendar || {};
  window.AppCalendar.state = state;

  // ===== Formatter titolo header
  function formatMonthTitle(date) {
    return new Intl.DateTimeFormat("it-IT", { month: "long", year: "numeric" }).format(date);
  }
  function formatDayTitle(date) {
    // es: "Mar 13 agosto 2025"
    const weekday = new Intl.DateTimeFormat("it-IT", { weekday: "short" }).format(date).replace(/\.$/, "");
    const day = date.getDate();
    const monthYear = new Intl.DateTimeFormat("it-IT", { month: "long", year: "numeric" }).format(date);
    return `${weekday} ${day} ${monthYear}`;
  }
  function formatWeekRange(date) {
    const start = H.startOfISOWeek(date);
    const end = H.addDays(start, 6);

    const sameMonth = start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear();

    const dayStart = start.getDate();
    const dayEnd = end.getDate();
    const monthStart = new Intl.DateTimeFormat("it-IT", { month: "short" }).format(start).replace(/\.$/, "");
    const monthEnd = new Intl.DateTimeFormat("it-IT", { month: "short" }).format(end).replace(/\.$/, "");
    const yearStart = start.getFullYear();
    const yearEnd = end.getFullYear();

    if (yearStart !== yearEnd) {
      // es: 28 dic 2025 – 3 gen 2026
      return `${dayStart} ${monthStart} ${yearStart} – ${dayEnd} ${monthEnd} ${yearEnd}`;
    }
    if (sameMonth) {
      // es: 12–18 ago 2025
      const monthYear = new Intl.DateTimeFormat("it-IT", { month: "short", year: "numeric" }).format(start).replace(/\.$/, "");
      return `${dayStart}–${dayEnd} ${monthYear}`;
    }
    // es: 29 lug – 4 ago 2025
    const year = start.getFullYear();
    return `${dayStart} ${monthStart} – ${dayEnd} ${monthEnd} ${year}`;
  }

  function setHeaderTitle(view, date) {
    if (!monthYearEl) return;
    if (view === "viewMonth") {
      monthYearEl.textContent = formatMonthTitle(date);
    } else if (view === "viewWeek") {
      monthYearEl.textContent = formatWeekRange(date);
    } else {
      monthYearEl.textContent = formatDayTitle(date);
    }
  }

  // ===== Rendering in base alla vista
  function render() {
    const { currentView, currentDate } = state;
    setHeaderTitle(currentView, currentDate);

    if (currentView === "viewMonth") {
      if (typeof window.renderCalendarMonth === "function") {
        window.renderCalendarMonth(currentDate);
      } else {
        console.warn("renderCalendarMonth non trovato");
      }
      return;
    }
    if (currentView === "viewWeek") {
      if (typeof window.renderCalendarWeek === "function") {
        window.renderCalendarWeek(currentDate);
      } else {
        console.warn("renderCalendarWeek non trovato");
      }
      return;
    }
    // default: day
    if (typeof window.renderCalendarDay === "function") {
      window.renderCalendarDay(currentDate);
    } else {
      console.warn("renderCalendarDay non trovato");
    }
  }

  // ===== Utilità UI
  function getViewNameFromButton(btn) {
    return btn.dataset.view || btn.id || "";
  }
  function setActiveViewButton(viewName) {
    viewButtons.forEach((b) => {
      if ((b.dataset.view || b.id) === viewName) {
        b.classList.add("bg-blue-600", "text-white");
        b.setAttribute("aria-pressed", "true");
      } else {
        b.classList.remove("bg-blue-600", "text-white");
        b.setAttribute("aria-pressed", "false");
      }
    });
  }

  // ===== Step logica prev/next per vista
  const VIEWS = {
    viewDay: {
      step(date, dir) {
        return H.addDays(date, dir);
      },
    },
    viewWeek: {
      step(date, dir) {
        return H.addDays(date, 7 * dir);
      },
    },
    viewMonth: {
      step(date, dir) {
        return H.addMonths(date, dir);
      },
    },
  };

  function onViewClick(e) {
    const btn = e.target.closest("button");
    if (!btn) return;
    const name = getViewNameFromButton(btn);
    if (!name || !VIEWS[name]) return;

    state.currentView = name;
    setActiveViewButton(name);
    render();
  }

  function changeDate(dir) {
    const view = VIEWS[state.currentView];
    if (!view) return;
    state.currentDate = view.step(state.currentDate, dir);
    render();
  }

  // ===== Event listeners
  buttonsRoot.addEventListener("click", onViewClick);
  buttonPrev.addEventListener("click", () => changeDate(-1));
  buttonNext.addEventListener("click", () => changeDate(1));

  // ===== Inizializzazione
  setActiveViewButton(state.currentView);
  render();
})();