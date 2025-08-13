(function (Calendar) {
  const Helpers = {
    /**Ritorna "YYYY-MM-DD" */
    toISODate(d) {
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      return `${y}-${m}-${day}`;
    },

    /** Vero se a e b sono lo stesso giorno */
    isSameDay(a, b) {
      return a.getDate() === b.getDate() && a.getMonth() === b.getMonth() && a.getFullYear() === b.getFullYear();
    },

    /** Lunedi della settimana (ISO) della data */
    startOfISOWeek(d) {
      const x = new Date(d.getFullYear(), d.getMonth(), d.getDate());
      const idx = (x.getDay() + 6) % 7;
      x.setDate(x.getDate() - idx);
      x.setHours(0, 0, 0, 0);
      return x;
    },

    /** Nomi brevi dei giorni Lunedi -> Domenica, localizzati (es. it-IT) */
    getWeekDayShortLabels(locale = "it-IT") {
      const base = new Date(2021, 0, 4);
      const fmt = new Intl.DateTimeFormat(locale, { weekday: "short" });
      const out = [];
      for (let i = 0; i < 7; i++) {
        const d = new Date(base);
        d.setDate(base.getDate() + i);
        out.push(fmt.format(d).replace(/\.$/, ""));
      }
      return out;
    },
    addDays(date, n) {
      const d = new Date(date);
      d.setDate(d.getDate() + n);
      return d;
    },
    addMonths(date, n) {
      const d = new Date(date);
      d.setMonth(d.getMonth() + n);
      return d;
    },
  };

  Calendar.helpers = Helpers;
})(window.Calendar || (window.Calendar = {}));
