const translations = {
  ru: {
    languageLabel: "Switch to English",
    themeToDark: "Включить тёмную тему",
    themeToLight: "Включить светлую тему",
    navHome: "Главная",
    navGames: "Игры",
    navAbout: "Студия",
    homeTitle: "Silicon Muffin — Think Free.",
    homeDescription: "Silicon Muffin — Think Free.",
    seeGames: "Смотреть игры",
    gamesTitle: "Игры — Silicon Muffin",
    gamesDescription: "Игры Silicon Muffin.",
    gamesHeading: "Игры",
    demoLink: "Скачать демку ↗",
    playNow: "Играть ↗",
    availableNow: "Можно играть",
    inDevelopment: "В разработке",
    aboutTitle: "Студия — Silicon Muffin",
    aboutDescription: "О Silicon Muffin — независимой игровой студии.",
    aboutHeading: "Делаем по-своему.",
    aboutIntro: "Silicon Muffin — независимая игровая студия.",
    teamLabel: "Команда"
  },
  en: {
    languageLabel: "Switch to Russian",
    themeToDark: "Switch to dark theme",
    themeToLight: "Switch to light theme",
    navHome: "Home",
    navGames: "Games",
    navAbout: "Studio",
    homeTitle: "Silicon Muffin — Think Free.",
    homeDescription: "Silicon Muffin — Think Free.",
    seeGames: "Explore games",
    gamesTitle: "Games — Silicon Muffin",
    gamesDescription: "Games by Silicon Muffin.",
    gamesHeading: "Games",
    demoLink: "Download the demo ↗",
    playNow: "Play now ↗",
    availableNow: "Available to play",
    inDevelopment: "In development",
    aboutTitle: "Studio — Silicon Muffin",
    aboutDescription: "About Silicon Muffin, an independent game studio.",
    aboutHeading: "Made our own way.",
    aboutIntro: "Silicon Muffin is an independent game studio.",
    teamLabel: "The team"
  }
};

const languageButton = document.querySelector("#languageButton");
const themeButton = document.querySelector("#themeButton");
const currentYear = document.querySelector("#currentYear");
const page = document.body.dataset.page || (location.pathname.endsWith("games.html") ? "games" : location.pathname.endsWith("about.html") ? "about" : "home");

function setLanguage(language) {
  const selected = translations[language] ? language : "ru";
  const text = translations[selected];
  document.documentElement.lang = selected;
  document.querySelectorAll("[data-copy]").forEach((element) => {
    const key = element.dataset.copy;
    if (text[key]) element.textContent = text[key];
  });

  const titleKey = page === "games" ? "gamesTitle" : page === "about" ? "aboutTitle" : "homeTitle";
  const descriptionKey = page === "games" ? "gamesDescription" : page === "about" ? "aboutDescription" : "homeDescription";
  document.title = text[titleKey];
  document.querySelector('meta[name="description"]').content = text[descriptionKey];
  languageButton.textContent = selected.toUpperCase();
  languageButton.setAttribute("aria-label", text.languageLabel);
  languageButton.setAttribute("aria-pressed", String(selected === "en"));
  themeButton.setAttribute("aria-label", document.documentElement.dataset.theme === "dark" ? text.themeToLight : text.themeToDark);

  try {
    localStorage.setItem("siliconMuffinLanguage_v2", selected);
  } catch (error) {
    // Language selection still works without browser storage.
  }
}

let savedLanguage = "en";
try {
  savedLanguage = localStorage.getItem("siliconMuffinLanguage_v2") || "en";
} catch (error) {
  savedLanguage = "en";
}

setLanguage(savedLanguage);
languageButton.addEventListener("click", () => {
  setLanguage(document.documentElement.lang === "ru" ? "en" : "ru");
});

function setTheme(theme) {
  const selected = theme === "dark" ? "dark" : "light";
  const language = document.documentElement.lang;
  const text = translations[language];
  document.documentElement.dataset.theme = selected;
  themeButton.querySelector(".theme-icon").textContent = selected === "dark" ? "☀" : "☾";
  themeButton.setAttribute("aria-label", selected === "dark" ? text.themeToLight : text.themeToDark);
  themeButton.setAttribute("aria-pressed", String(selected === "dark"));
  document.querySelector('meta[name="theme-color"]').content = selected === "dark" ? "#161617" : "#ffffff";

  try {
    localStorage.setItem("siliconMuffinTheme", selected);
  } catch (error) {
    // Theme selection still works without browser storage.
  }
}

let savedTheme = "light";
try {
  savedTheme = localStorage.getItem("siliconMuffinTheme") || "light";
} catch (error) {
  savedTheme = "light";
}
setTheme(savedTheme);
themeButton.addEventListener("click", () => {
  setTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark");
});

currentYear.textContent = String(new Date().getFullYear());
