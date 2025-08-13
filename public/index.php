<!DOCTYPE html>
<html lang="it" dir="ltr">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <title>Calendar & Tasks</title>

  <link rel="stylesheet" href="./assets/style/output.css">
</head>

<body class="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-[#1e1f20] dark:via-[#1e2329] dark:to-[#262d3f] min-h-screen font-inter p-3">

  <!-- HTML dell'intestazione iniziale -->
  <header class="mx-auto max-w-7xl flex flex-col gap-6 mb-8">
    <div class="text-center">
      <h1 class="text-4xl text-transparent font-bold bg-clip-text bg-gradient-to-br from-indigo-400 to-[#764ba2] mb-3">Calendar & Tasks</h1>
      <!-- TODO: Aggiungere nello span la variabile per il nome dell'utente -->
      <p class="text-lg text-slate-600 dark:text-slate-400">Welcom back, <span class="font-semibold">Vlad</span></p>
    </div>

    <nav class="flex justify-end gap-3">
      <button class="px-3 py-3 bg-white dark:bg-black border-1 border-slate-200 dark:border-slate-700 rounded-xl shadow-sm">
        <svg class="w-4 h-4 fill-none stroke-current stroke-1 lucide lucide-bell-icon lucide-bell dark:text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round">
          <path d="M10.268 21a2 2 0 0 0 3.464 0" />
          <path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326" />
        </svg>
      </button>
      <button class="px-3 py-3 bg-white dark:bg-black border-1 border-slate-200 dark:border-slate-700 rounded-xl shadow-sm">
        <svg class="w-4 h-4 fill-none stroke-current stroke-1 lucide lucide-bell-icon lucide-bell dark:text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      </button>
    </nav>

  </header>

  <!-- HTML dell'applicazione principale -->
  <main class="mx-auto max-w-7xl">

    <!-- HTML Corpo del calendario -->
    <section class="border-1 border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden shadow-sm">
      <!-- HTML contenitore del menu del calendario e del titolo -->
      <div class="bg-gradient-to-r from-white to-slate-50 dark:from-neutral-950 dark:to-zinc-900 p-3">
        <div class="flex justify-between items-center">
          <h3 class="text-xl tracking-tight font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-calendar-range-icon lucide-calendar-range">
                <rect width="18" height="18" x="3" y="4" rx="2" />
                <path d="M16 2v4" />
                <path d="M3 10h18" />
                <path d="M8 2v4" />
                <path d="M17 14h-6" />
                <path d="M13 18H7" />
                <path d="M7 14h.01" />
                <path d="M17 18h.01" />
              </svg>
            </span>Calendar
          </h3>
          <!-- HTML del menu del calendario -->
          <div class="flex justify-center h-10">
            <div id="buttonsForView" class="text-xs flex p-1 bg-slate-100 dark:bg-[#202326] rounded-xl font-medium gap-1">
              <button id="viewMonth" class="bg-blue-600 px-3 py-2 text-white dark:text-white rounded-lg flex gap-1.5">
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-grid3x3-icon lucide-grid-3x3">
                    <rect width="18" height="18" x="3" y="3" rx="2" />
                    <path d="M3 9h18" />
                    <path d="M3 15h18" />
                    <path d="M9 3v18" />
                    <path d="M15 3v18" />
                  </svg>
                </span>
                <span class="max-[426px]:hidden">Month</span>
              </button>
              <button id="viewWeek" class="px-3 py-2 rounded-lg flex gap-1.5 dark:text-white">
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-list-icon lucide-list">
                    <path d="M3 12h.01" />
                    <path d="M3 18h.01" />
                    <path d="M3 6h.01" />
                    <path d="M8 12h13" />
                    <path d="M8 18h13" />
                    <path d="M8 6h13" />
                  </svg>
                </span>
                <span class="max-[426px]:hidden">Week</span>
              </button>
              <button id="viewDay" class="px-3 py-2 rounded-lg flex gap-1.5 dark:text-white">
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-calendar-icon lucide-calendar">
                    <path d="M8 2v4" />
                    <path d="M16 2v4" />
                    <rect width="18" height="18" x="3" y="4" rx="2" />
                    <path d="M3 10h18" />
                  </svg>
                </span>
                <span class="max-[426px]:hidden">Day</span>
              </button>
            </div>
          </div>
        </div>

        <!-- HTML Cambio mese con frecce -->
        <div class="w-full flex justify-between items-center mt-2">
          <button id="buttonPrev" class="px-3 py-2 border-slate-200 dark:border-slate-700 dark:bg-black dark:text-white border-1 rounded-xl shadow">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-left-icon lucide-chevron-left">
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
          <h2 class="dark:text-white" id="monthYear"></h2>
          <button id="buttonNext" class="px-3 py-2 dark:bg-black border-1 border-slate-200 dark:border-slate-700 dark:text-white rounded-xl shadow">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right-icon lucide-chevron-right">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>
        <!-- TODO: Implementare la barra di ricerca dei eventi -->
      </div>

      <!-- Genera calendario in abse al bottone -->
      <div id="calendar" class="">

      </div>

      <!-- Bottone aggiungi evento -->
      <div class="flex justify-center items-center bg-white dark:bg-[#121212] p-4">
        <button class="flex justify-center items-center gap-2 w-full py-2.5 px-4 rounded-xl bg-linear-to-r from-[#667eea] to-[#764ba2] text-sm font-semibold text-white">
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus-icon lucide-plus">
              <path d="M5 12h14" />
              <path d="M12 5v14" />
            </svg>
          </span>
          Aggiungi un evento</button>
      </div>
    </section>

    <!-- HTML section Tasks -->
    <section>

    </section>
  </main>
</body>

<script src="./assets/js/helpers.js"></script>
<script src="./assets/js/renderCalendarDay.js"></script>
<script src="./assets/js/renderCalendarWeek.js"></script>
<script src="./assets/js/renderCalendarMonth.js"></script>
<script src="./assets/js/switch_format.js"></script>

</html>