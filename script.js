"use strict";

function readStorage(key, fallback = "") {
  try {
    return localStorage.getItem(`aurelle-${key}`) ?? fallback;
  } catch {
    return fallback;
  }
}

function writeStorage(key, value) {
  try {
    localStorage.setItem(`aurelle-${key}`, value);
  } catch {
    // Если localStorage недоступен, сайт работает без сохранения.
  }
}

function removeStorage(key) {
  try {
    localStorage.removeItem(`aurelle-${key}`);
  } catch {
    // Ошибка хранилища не мешает работе сайта.
  }
}

let language = readStorage("language", "ru");

if (!["ru", "en"].includes(language)) {
  language = "ru";
}

let category = readStorage("category", "all");

if (!["all", "planning", "design"].includes(category)) {
  category = "all";
}


const translations = {
  ru: {
    navStages: "Этапы",
    navServices: "Услуги",
    navDate: "До свадьбы",
    navContacts: "Контакты",

    heroTitle: "Искусство создавать ваш особенный день",
    heroText:
      "Вы наслаждаетесь моментом — мы заботимся о деталях.",
    discuss: "Обсудить свадьбу",

    stagesTitle: "Путь к вашему торжеству",
    servicesTitle: "Наши услуги",
    servicesText:
      "Выберите формат сопровождения вашей свадьбы.",

    searchLabel: "Поиск услуг",
    searchPlaceholder: "Название или описание услуги",
    all: "Все",
    planning: "Организация",
    design: "Оформление",
    details: "Подробнее",
    noResults:
      "Ничего не найдено. Измените запрос или категорию.",

    countdownTitle: "До свадьбы осталось",
    days: "дней",
    hours: "часов",
    minutes: "минут",
    seconds: "секунд",
    dateTime: "Дата и время свадьбы",
    start: "Начать отсчёт",
    reset: "Сбросить",
    timezone:
      "Используется часовой пояс вашего устройства.",
    chooseDate:
      "Выберите дату и нажмите «Начать отсчёт».",
    invalidDate:
      "Выберите корректную дату и время в будущем.",
    dateStarted: "Отсчёт запущен. Дата события:",
    dateFinished: "Время события наступило!",

    sliderTitle: "Ваша свадьба — ваш стиль",
    previous: "Предыдущий слайд",
    next: "Следующий слайд",

    contactTitle: "Начнём вашу историю",
    contactText:
      "Расскажите о вашей дате, количестве гостей и пожеланиях — " +
      "мы предложим решение.",

    contactPhoneLabel: "Телефон:",
    contactEmailLabel: "Почта:",
    contactAddressLabel: "Адрес:",
    contactAddress: "г. Улаг-Удэ, ул. Советская, 23",
    contactHoursLabel: "Часы работы:",
    contactHours: "Ежедневно с 10:00 до 20:00",

    formTitle: "Заявка на консультацию",
    name: "Ваше имя",
    phone: "Телефон",
    weddingDate: "Дата свадьбы",
    wishes: "Ваши пожелания",
    send: "Отправить заявку",
    sending: "Отправляем…",
    badName: "Введите имя: минимум 2 символа.",
    badPhone: "Введите телефон: от 10 до 15 цифр.",
    badWeddingDate:
      "Выберите дату свадьбы не раньше сегодняшнего дня.",
    localForm:
      "Отправка доступна на опубликованном сайте с настроенной формой.",
    sent: "Спасибо! Заявка отправлена.",
    sendError:
      "Не удалось подтвердить отправку. " +
      "Попробуйте ещё раз или свяжитесь с нами по телефону.",

    top: "Наверх ↑",
    close: "Закрыть"
  },

  en: {
    navStages: "Our process",
    navServices: "Services",
    navDate: "Countdown",
    navContacts: "Contact",

    heroTitle: "The art of creating your special day",
    heroText:
      "Enjoy every moment — we will take care of the details.",
    discuss: "Plan your wedding",

    stagesTitle: "Your journey to a beautiful celebration",
    servicesTitle: "Our services",
    servicesText:
      "Choose the right support for your wedding.",

    searchLabel: "Search services",
    searchPlaceholder: "Service name or description",
    all: "All",
    planning: "Planning",
    design: "Design",
    details: "View details",
    noResults:
      "No services found. Try another search or category.",

    countdownTitle: "Counting down to your wedding",
    days: "days",
    hours: "hours",
    minutes: "minutes",
    seconds: "seconds",
    dateTime: "Wedding date and time",
    start: "Start countdown",
    reset: "Reset",
    timezone: "Your device's time zone is used.",
    chooseDate:
      "Choose a date and click “Start countdown”.",
    invalidDate:
      "Choose a valid future date and time.",
    dateStarted: "Countdown started. Event date:",
    dateFinished: "The event time has arrived!",

    sliderTitle: "Your wedding — your style",
    previous: "Previous slide",
    next: "Next slide",

    contactTitle: "Let your story begin",
    contactText:
      "Tell us your date, guest count and wishes — " +
      "we will help you find the right approach.",

    contactPhoneLabel: "Phone:",
    contactEmailLabel: "Email:",
    contactAddressLabel: "Address:",
    contactAddress: "23 Sovet Street, Ulan-Ude",
    contactHoursLabel: "Opening hours:",
    contactHours: "Daily, 10:00–20:00",

    formTitle: "Request a consultation",
    name: "Your name",
    phone: "Phone number",
    weddingDate: "Wedding date",
    wishes: "Your wishes",
    send: "Send request",
    sending: "Sending…",
    badName:
      "Enter a name with at least 2 characters.",
    badPhone:
      "Enter a phone number with 10 to 15 digits.",
    badWeddingDate:
      "Choose today or a future wedding date.",
    localForm:
      "Submission is available on the published site with a configured form.",
    sent: "Thank you! Your request has been sent.",
    sendError:
      "Submission could not be confirmed. " +
      "Please try again or contact us by phone.",

    top: "Back to top ↑",
    close: "Close"
  }
};

function t(key) {
  return translations[language][key] ?? key;
}


const stages = [
  {
    ru: [
      "Знакомство",
      "Обсуждаем ваши пожелания, дату и бюджет."
    ],
    en: [
      "Getting to know you",
      "We discuss your wishes, date and budget."
    ]
  },
  {
    ru: [
      "Концепция",
      "Создаём стиль и атмосферу вашей свадьбы."
    ],
    en: [
      "Concept",
      "We create your wedding's style and atmosphere."
    ]
  },
  {
    ru: [
      "Команда",
      "Подбираем площадку и специалистов."
    ],
    en: [
      "Team",
      "We select the venue and wedding professionals."
    ]
  },
  {
    ru: [
      "Подготовка",
      "Согласовываем детали и тайминг дня."
    ],
    en: [
      "Preparation",
      "We coordinate the details and wedding timeline."
    ]
  },
  {
    ru: [
      "День свадьбы",
      "Заботимся о деталях, пока вы празднуете."
    ],
    en: [
      "Wedding day",
      "We manage the details while you celebrate."
    ]
  },
  {
    ru: [
      "После торжества",
      "Завершаем организационные вопросы."
    ],
    en: [
      "After the celebration",
      "We take care of the final arrangements."
    ]
  }
];

// ========================================
// ДАННЫЕ УСЛУГ
// ========================================

const services = [
  {
    id: "full",
    category: "planning",
    price: 150000,

    ru: {
      title: "Свадьба под ключ",
      short:
        "Полная организация от первой идеи до финального танца.",
      details:
        "Разрабатываем концепцию, подбираем площадку и команду, " +
        "планируем бюджет и координируем свадебный день."
    },

    en: {
      title: "Full wedding planning",
      short:
        "Complete planning from the first idea to the final dance.",
      details:
        "We develop the concept, select the venue and team, " +
        "plan the budget and coordinate your wedding day."
    }
  },

  {
    id: "coordination",
    category: "planning",
    price: 45000,

    ru: {
      title: "Координация дня",
      short:
        "Спокойствие и порядок в самый важный день.",
      details:
        "Проверяем тайминг, встречаем подрядчиков, " +
        "помогаем гостям и следим за программой мероприятия."
    },

    en: {
      title: "Wedding day coordination",
      short:
        "Peace of mind on your most important day.",
      details:
        "We review the timeline, welcome suppliers, " +
        "assist guests and keep the celebration running smoothly."
    }
  },

  {
    id: "decor",
    category: "design",
    price: 70000,

    ru: {
      title: "Декор и флористика",
      short:
        "Красота пространства и внимание к каждой детали.",
      details:
        "Создаём оформление церемонии, столов и фотозоны. " +
        "Подбираем цветовую палитру, цветы и декоративные элементы."
    },

    en: {
      title: "Decor and floristry",
      short:
        "Beautiful spaces with thoughtful details.",
      details:
        "We design the ceremony area, tables and photo space, " +
        "selecting colours, flowers and decorative elements."
    }
  }
];

// ========================================
// ДАННЫЕ СЛАЙДЕРА
// ========================================

const slides = [
  {
    ru: [
      "Нежная классика",
      "Светлые оттенки, цветы и элегантные детали."
    ],
    en: [
      "Timeless elegance",
      "Soft colours, flowers and elegant details."
    ]
  },
  {
    ru: [
      "Свадьба в саду",
      "Зелень, свежий воздух и естественная красота."
    ],
    en: [
      "Garden wedding",
      "Greenery, fresh air and natural beauty."
    ]
  },
  {
    ru: [
      "Современная эстетика",
      "Чистые линии и выразительные акценты."
    ],
    en: [
      "Modern aesthetics",
      "Clean lines and expressive accents."
    ]
  }
];

function formatPrice(value) {
  const number = new Intl.NumberFormat(
    language === "ru" ? "ru-RU" : "en-US"
  ).format(value);

  return language === "ru"
    ? `от ${number} ₽`
    : `from RUB ${number}`;
}

// ========================================
// АНИМАЦИЯ КАРТОЧЕК
// ========================================

const reducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
);

const observer = "IntersectionObserver" in window
  ? new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove("reveal-pending");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 })
  : null;

function stopObservingCards(container) {
  container.querySelectorAll(".card").forEach((card) => {
    observer?.unobserve(card);
  });
}

function observeCards(container) {
  if (!observer || reducedMotion.matches) return;

  container.querySelectorAll(".card").forEach((card) => {
    card.classList.add("reveal-pending");
    observer.observe(card);
  });
}

// ========================================
// ЭТАПЫ, ПОИСК И ФИЛЬТРАЦИЯ
// ========================================

const stagesGrid = document.getElementById("stagesGrid");
const servicesGrid = document.getElementById("servicesGrid");
const searchInput = document.getElementById("serviceSearch");
const emptyResults = document.getElementById("emptyResults");

searchInput.value = readStorage("search");

function renderStages() {
  stopObservingCards(stagesGrid);

  stagesGrid.innerHTML = stages.map((stage, index) => `
    <article class="card">
      <span class="stage-number" aria-hidden="true">
        ${String(index + 1).padStart(2, "0")}
      </span>
      <h3>${stage[language][0]}</h3>
      <p>${stage[language][1]}</p>
    </article>
  `).join("");

  observeCards(stagesGrid);
}

function renderServices() {
  stopObservingCards(servicesGrid);

  const query = searchInput.value.trim().toLocaleLowerCase();

  const filtered = services.filter((service) => {
    const matchesCategory =
      category === "all" || service.category === category;

    const content = service[language];

    const text = (
      `${content.title} ${content.short} ${content.details}`
    ).toLocaleLowerCase();

    return matchesCategory && text.includes(query);
  });

  servicesGrid.innerHTML = filtered.map((service) => `
    <article class="card service-card">
      <h3>${service[language].title}</h3>
      <p>${service[language].short}</p>
      <p class="price">${formatPrice(service.price)}</p>

      <button
        class="btn"
        type="button"
        data-service="${service.id}"
      >
        ${t("details")}
      </button>
    </article>
  `).join("");

  emptyResults.hidden = filtered.length > 0;
  emptyResults.textContent = t("noResults");

  document.querySelectorAll("[data-filter]").forEach((button) => {
    const active = button.dataset.filter === category;

    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });

  observeCards(servicesGrid);
}

searchInput.addEventListener("input", () => {
  writeStorage("search", searchInput.value);
  renderServices();
});

document.querySelectorAll("[data-filter]").forEach((button) => {
  button.addEventListener("click", () => {
    category = button.dataset.filter;
    writeStorage("category", category);
    renderServices();
  });
});

// ========================================
// МОДАЛЬНОЕ ОКНО
// ========================================

const dialog = document.getElementById("serviceDialog");

let activeService = null;
let modalTrigger = null;

function fillDialog() {
  if (!activeService) return;

  document.getElementById("dialogTitle").textContent =
    activeService[language].title;

  document.getElementById("dialogDescription").textContent =
    activeService[language].details;

  document.getElementById("dialogPrice").textContent =
    formatPrice(activeService.price);
}

servicesGrid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-service]");
  if (!button) return;

  activeService = services.find(
    (service) => service.id === button.dataset.service
  );

  modalTrigger = button;

  fillDialog();
  dialog.showModal();
  document.body.classList.add("modal-open");
});

document.getElementById("closeDialog").addEventListener("click", () => {
  dialog.close();
});

dialog.addEventListener("click", (event) => {
  if (event.target !== dialog) return;

  const rect = dialog.getBoundingClientRect();

  const outside =
    event.clientX < rect.left ||
    event.clientX > rect.right ||
    event.clientY < rect.top ||
    event.clientY > rect.bottom;

  if (outside) dialog.close();
});

dialog.addEventListener("close", () => {
  document.body.classList.remove("modal-open");

  if (modalTrigger?.isConnected) {
    modalTrigger.focus();
  }
});

document.getElementById("dialogContact").addEventListener("click", () => {
  dialog.close();

  requestAnimationFrame(() => {
    document.getElementById("contacts").scrollIntoView({
      behavior: reducedMotion.matches ? "instant" : "smooth"
    });
  });
});

// ========================================
// СЛАЙДЕР
// ========================================

let slideIndex = 0;

function renderSlide() {
  const slide = slides[slideIndex][language];

  document.getElementById("slideContent").innerHTML = `
    <article class="slide slide-${slideIndex}">
      <h3>${slide[0]}</h3>
      <p>${slide[1]}</p>
    </article>
  `;

  document.getElementById("slideCounter").textContent =
    `${slideIndex + 1} / ${slides.length}`;

  document.getElementById("previousSlide").setAttribute(
    "aria-label",
    t("previous")
  );

  document.getElementById("nextSlide").setAttribute(
    "aria-label",
    t("next")
  );
}

document.getElementById("previousSlide").addEventListener("click", () => {
  slideIndex = (slideIndex - 1 + slides.length) % slides.length;
  renderSlide();
});

document.getElementById("nextSlide").addEventListener("click", () => {
  slideIndex = (slideIndex + 1) % slides.length;
  renderSlide();
});

// ========================================
// КНОПКА «НАВЕРХ»
// ========================================

const backToTop = document.getElementById("backToTop");

function updateBackToTop() {
  backToTop.hidden = window.scrollY < 450;
}

window.addEventListener("scroll", updateBackToTop, {
  passive: true
});

updateBackToTop();

// ========================================
// ТАЙМЕР
// ========================================

const dateForm = document.getElementById("dateForm");
const eventDateInput = document.getElementById("eventDate");
const dateMessage = document.getElementById("dateMessage");

const timeElements = [
  document.getElementById("days"),
  document.getElementById("hours"),
  document.getElementById("minutes"),
  document.getElementById("seconds")
];

let targetTimestamp = 0;
let timerId = null;
let dateError = false;

function showStatus(element, text, type = "") {
  element.textContent = text;
  element.className = `status ${type}`;
}

function updateDateMessage() {
  if (dateError) {
    showStatus(dateMessage, t("invalidDate"), "error");
    return;
  }

  if (!targetTimestamp) {
    showStatus(dateMessage, t("chooseDate"));
    return;
  }

  if (targetTimestamp <= Date.now()) {
    showStatus(dateMessage, t("dateFinished"), "success");
    return;
  }

  const formatted = new Date(targetTimestamp).toLocaleString(
    language === "ru" ? "ru-RU" : "en-GB",
    {
      dateStyle: "long",
      timeStyle: "short"
    }
  );

  showStatus(
    dateMessage,
    `${t("dateStarted")} ${formatted}`,
    "success"
  );
}

function updateCountdown() {
  const difference = targetTimestamp
    ? Math.max(0, targetTimestamp - Date.now())
    : 0;

  const values = [
    Math.floor(difference / 86400000),
    Math.floor((difference / 3600000) % 24),
    Math.floor((difference / 60000) % 60),
    Math.floor((difference / 1000) % 60)
  ];

  values.forEach((value, index) => {
    timeElements[index].textContent =
      String(value).padStart(2, "0");
  });

  if (targetTimestamp && difference === 0) {
    clearInterval(timerId);
    updateDateMessage();
  }
}

function startTimer(timestamp) {
  clearInterval(timerId);

  targetTimestamp = timestamp;
  dateError = false;

  updateCountdown();
  updateDateMessage();

  if (timestamp > Date.now()) {
    timerId = setInterval(updateCountdown, 1000);
  }
}

function toLocalInputValue(date) {
  const pad = (value) => String(value).padStart(2, "0");

  return (
    `${date.getFullYear()}-` +
    `${pad(date.getMonth() + 1)}-` +
    `${pad(date.getDate())}T` +
    `${pad(date.getHours())}:${pad(date.getMinutes())}`
  );
}

dateForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const timestamp = new Date(eventDateInput.value).getTime();

  if (!Number.isFinite(timestamp) || timestamp <= Date.now()) {
    dateError = true;
    updateDateMessage();
    eventDateInput.focus();
    return;
  }

  writeStorage("eventDate", String(timestamp));
  startTimer(timestamp);
});

document.getElementById("resetDate").addEventListener("click", () => {
  clearInterval(timerId);

  targetTimestamp = 0;
  dateError = false;
  eventDateInput.value = "";

  removeStorage("eventDate");

  updateCountdown();
  updateDateMessage();
});

// Восстанавливаем только дату, которую пользователь уже выбирал.
const savedTimestamp = Number(readStorage("eventDate", "0"));

if (
  savedTimestamp > 0 &&
  Number.isFinite(new Date(savedTimestamp).getTime())
) {
  eventDateInput.value = toLocalInputValue(
    new Date(savedTimestamp)
  );

  startTimer(savedTimestamp);
}

// ========================================
// ПРОВЕРКА И ОТПРАВКА ФОРМЫ
// ========================================

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");
const submitButton = document.getElementById("submitContact");

let formStatusKey = "";
let formStatusType = "";
let submitting = false;

function setFormStatus(key, type) {
  formStatusKey = key;
  formStatusType = type;

  showStatus(formMessage, t(key), type);
}

contactForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (submitting) return;

  const nameField = contactForm.elements.namedItem("name");
  const phoneField = contactForm.elements.namedItem("phone");
  const dateField = contactForm.elements.namedItem("date");

  const name = nameField.value.trim();
  const phone = phoneField.value.trim();
  const digits = phone.replace(/\D/g, "");

  if (name.length < 2 || name.length > 80) {
    setFormStatus("badName", "error");
    nameField.focus();
    return;
  }

  if (
    !/^\+?[\d\s()-]+$/.test(phone) ||
    digits.length < 10 ||
    digits.length > 15
  ) {
    setFormStatus("badPhone", "error");
    phoneField.focus();
    return;
  }

  const selectedDate = new Date(
    `${dateField.value}T00:00:00`
  );

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (
    Number.isNaN(selectedDate.getTime()) ||
    selectedDate < today
  ) {
    setFormStatus("badWeddingDate", "error");
    dateField.focus();
    return;
  }

  const localHosts = ["localhost", "127.0.0.1", "[::1]"];

  if (
    location.protocol === "file:" ||
    localHosts.includes(location.hostname)
  ) {
    setFormStatus("localForm", "error");
    return;
  }

  submitting = true;
  submitButton.disabled = true;
  submitButton.textContent = t("sending");

  formStatusKey = "";
  showStatus(formMessage, "");

  try {
    const data = new FormData(contactForm);

    data.set("name", name);
    data.set("phone", phone);

    const response = await fetch("/", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams(data).toString()
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    contactForm.reset();
    setFormStatus("sent", "success");
  } catch {
    setFormStatus("sendError", "error");
  } finally {
    submitting = false;
    submitButton.disabled = false;
    submitButton.textContent = t("send");
  }
});

// ========================================
// ПЕРЕКЛЮЧЕНИЕ ЯЗЫКА
// ========================================

function applyLanguage() {
  document.documentElement.lang = language;

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = t(element.dataset.i18n);
  });

  document.querySelectorAll("[data-placeholder]").forEach((element) => {
    element.placeholder = t(element.dataset.placeholder);
  });

  document.getElementById("languageButton").textContent =
    language === "ru" ? "English" : "Русский";

  if (submitting) {
    submitButton.textContent = t("sending");
  }

  renderStages();
  renderServices();
  renderSlide();
  fillDialog();
  updateDateMessage();

  if (formStatusKey) {
    showStatus(
      formMessage,
      t(formStatusKey),
      formStatusType
    );
  }
}

document.getElementById("languageButton").addEventListener("click", () => {
  language = language === "ru" ? "en" : "ru";

  writeStorage("language", language);
  applyLanguage();
});

// Первый вывод содержимого.
applyLanguage();
updateCountdown();