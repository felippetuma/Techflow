const htmlElement = document.documentElement;
const btnLight = document.getElementById('btnLight');
const btnDark = document.getElementById('btnDark');
const btnSystem = document.getElementById('btnSystem');
const statusText = document.getElementById('statusTexto');

const mediaQueryDark = window.matchMedia("(prefers-color-scheme: dark)");

const classActive = ["bg-white", "dark:bg-slate-700", "shadow-sm", "text-slate-900", "dark:text-white"];
const classInactive = ["text-slate-500", "dark:text-slate-400", "hover:text-slate-900", "dark:hover:text-white"];

function updateButtons(optionActive) {
    [btnLight, btnDark, btnSystem].forEach(btn => {
        btn.classList.remove(...classActive);
        btn.classList.add(...classInactive);
    });

    if(optionActive === "light") {
        btnLight.classList.add(...classActive);
        btnLight.classList.remove(...classInactive);
    } else if(optionActive === "dark") {
        btnDark.classList.add(...classActive);
        btnDark.classList.remove(...classInactive);
    } else {
        btnSystem.classList.add(...classActive);
        btnSystem.classList.remove(...classInactive);
    }
}

function applyTheme(option) {
    const isDark = option === "dark" || (option === "system" && mediaQueryDark.matches);

    htmlElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", option);
    updateButtons(option);
}

const savedTheme = localStorage.getItem("theme");
const initialTheme = ["light", "dark", "system"].includes(savedTheme) ? savedTheme : "system";

btnLight.addEventListener("click", () => applyTheme("light"));
btnDark.addEventListener("click", () => applyTheme("dark"));
btnSystem.addEventListener("click", () => applyTheme("system"));

mediaQueryDark.addEventListener("change", () => {
    if (localStorage.getItem("theme") === "system") {
        applyTheme("system");
    }
});

applyTheme(initialTheme);