// Controle de Tema do site

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

// SideBar

const sideBar = document.getElementById('sideBar');
const overlaySide = document.getElementById('sideBarOverlay');
const openSide = document.getElementById('sideBarOpen');
const closeSide = document.getElementById('sideBarClose');
const desktop = window.matchMedia("(min-width: 768px)");

const setOpenSide = (open) => {
    sideBar.dataset.open = String(open);
    overlaySide.dataset.open = String(open);
    overlaySide.setAttribute('aria-hidden', String(!open));
    openSide.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('overflow-hidden', open && !desktop.matches);
    if(open && !desktop.matches) {
        closeSide.focus();
    } else if(!open && document.activeElement && sideBar.contains(document.activeElement)) {
        openSide.focus();
    }
}

const isOpen = () => sideBar.dataset.open === "true";

openSide.addEventListener('click', () => setOpenSide(true));
closeSide.addEventListener('click', () => setOpenSide(false));
overlaySide.addEventListener('click', (e) => {
    if(e.target === overlaySide) setOpenSide(false);
});
sideBar.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => isOpen() && !desktop.matches && setOpenSide(false)));

document.addEventListener('keydown', (e) => {
    if(e.key === "Escape" && isOpen() && !desktop.matches) {
        setOpenSide(false);
    }
});

desktop.addEventListener('change', (e) => {
    setOpenSide(e.matches);
})

setOpenSide(desktop.matches);