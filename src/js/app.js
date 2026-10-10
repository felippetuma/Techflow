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
const desktop = window.matchMedia("(min-width: 1024px)");

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

/*

Adicionar Projeto com o modal

 */

const modal = document.getElementById('modal');
const modalPanel = document.getElementById('modalPainel');
const openModal = document.getElementById('abrirModalNew');
const closeModalBtns = modal.querySelectorAll('[data-close-modal]');
const focusableSelector = 'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';
let lastFocus = null;

const isOpenModal = () => modal.dataset.open === "true";

const setOpenModal = (open) => {
    if(open === isOpenModal()) return;
    modal.dataset.open = String(open);
    modal.setAttribute('aria-hidden', String(!open));
    document.body.classList.toggle('overflow-hidden', open || (isOpen() && !desktop.matches));

    if(open) {
        lastFocus = document.activeElement;
        (modalPanel.querySelector('input, textarea') || modalPanel).focus();
    } else if(lastFocus) {
        lastFocus.focus();
        lastFocus = null;
    }
    if(!open) resetForm();
}

openModal.addEventListener('click', () => setOpenModal(true));
closeModalBtns.forEach((btn) => btn.addEventListener('click', () => setOpenModal(false)));
modal.addEventListener('click', (e) => {
    if(e.target === modal) setOpenModal(false);
});

document.addEventListener('keydown', (e) => {
    if(!isOpenModal()) return;
    if(e.key === "Escape") {
        setOpenModal(false);
    } else if(e.key === "Tab") {
        const items = [...modalPanel.querySelectorAll(focusableSelector)];
        const first = items[0];
        const last = items[items.length - 1];
        if(e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
        } else if(!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
        }
    }
});

// Validação do formulário do modal

const form = document.getElementById('formProjeto');
const formStatus = document.getElementById('formStatus');
const submitBtn = form.querySelector('[type="submit"]');
const fields = [...form.querySelectorAll('input[name], select[name], textarea[name]')];

const stateClasses = {
    error: ['border-error!', 'bg-error/10!'],
    success: ['border-sucess!', 'bg-sucess/10!']
};

const today = () => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

const rules = {
    nome: (v) => v.length < 3 ? 'Informe ao menos 3 caracteres.' : '',
    prazo: (v) => !v ? 'Escolha um prazo.' : v < today() ? 'O prazo não pode estar no passado.' : '',
    prioridade: (v) => !v ? 'Selecione a prioridade.' : '',
    responsavel: (v) => v.split(/\s+/).filter(Boolean).length < 2 ? 'Informe nome e sobrenome.' : '',
    categoria: (v) => !v ? 'Selecione uma categoria.' : '',
    descricao: (v) => v.length < 10 ? 'Descreva com ao menos 10 caracteres.' : ''
};

const messageOf = (field) => {
    let msg = field.parentElement.querySelector('[data-error]');
    if(!msg) {
        msg = document.createElement('span');
        msg.dataset.error = '';
        msg.id = `erro-${field.name}`;
        msg.className = 'text-sm font-normal text-error';
        field.parentElement.appendChild(msg);
    }
    return msg;
};

const setFieldState = (field, error) => {
    const msg = messageOf(field);
    field.classList.remove(...stateClasses.error, ...stateClasses.success);
    field.classList.add(...(error ? stateClasses.error : stateClasses.success));
    field.setAttribute('aria-invalid', String(Boolean(error)));
    field.setAttribute('aria-describedby', msg.id);
    msg.textContent = error;
    msg.classList.toggle('hidden', !error);
};

const validateField = (field) => {
    const error = rules[field.name](field.value.trim());
    setFieldState(field, error);
    return !error;
};

const showStatus = (type, text) => {
    formStatus.textContent = text;
    formStatus.className = 'rounded-xl border px-3 py-2 text-sm font-medium ' + (type === 'error'
        ? 'border-error bg-error/10 text-error'
        : 'border-sucess bg-sucess/10 text-sucess');
};

function resetForm() {
    form.reset();
    fields.forEach((field) => {
        field.classList.remove(...stateClasses.error, ...stateClasses.success);
        field.removeAttribute('aria-invalid');
        field.removeAttribute('aria-describedby');
        field.dataset.touched = '';
        const msg = field.parentElement.querySelector('[data-error]');
        if(msg) msg.remove();
    });
    formStatus.className = 'hidden';
    formStatus.textContent = '';
    submitBtn.disabled = false;
}

form.elements.prazo.min = today();

fields.forEach((field) => {
    field.addEventListener('blur', () => {
        field.dataset.touched = 'true';
        validateField(field);
    });
    const live = () => field.dataset.touched === 'true' && validateField(field);
    field.addEventListener('input', live);
    field.addEventListener('change', live);
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    fields.forEach((field) => field.dataset.touched = 'true');
    const invalid = fields.filter((field) => !validateField(field));

    if(invalid.length) {
        showStatus('error', `Corrija ${invalid.length === 1 ? 'o campo destacado' : 'os campos destacados'} para continuar.`);
        invalid[0].focus();
        return;
    }

    const nome = form.elements.nome.value.trim();
    showStatus('success', `Projeto "${nome}" criado com sucesso!`);
    submitBtn.disabled = true;
    setTimeout(() => setOpenModal(false), 1500);
});

// Dropdown do usuário

const userBtn = document.getElementById('openUserMenu');
const userMenu = document.getElementById('userMenu');
const userItems = [...userMenu.querySelectorAll('[role="menuitem"]')];

const isUserMenuOpen = () => userMenu.dataset.open === "true";

const setOpenUserMenu = (open, focusItem = false) => {
    userMenu.dataset.open = String(open);
    userBtn.setAttribute('aria-expanded', String(open));
    if(open && focusItem) userItems[0].focus();
};

userBtn.addEventListener('click', () => setOpenUserMenu(!isUserMenuOpen()));

userBtn.addEventListener('keydown', (e) => {
    if(e.key === "ArrowDown") {
        e.preventDefault();
        setOpenUserMenu(true, true);
    }
});

userMenu.addEventListener('keydown', (e) => {
    const index = userItems.indexOf(document.activeElement);
    if(e.key === "ArrowDown") {
        e.preventDefault();
        userItems[(index + 1) % userItems.length].focus();
    } else if(e.key === "ArrowUp") {
        e.preventDefault();
        userItems[(index - 1 + userItems.length) % userItems.length].focus();
    } else if(e.key === "Home") {
        e.preventDefault();
        userItems[0].focus();
    } else if(e.key === "End") {
        e.preventDefault();
        userItems[userItems.length - 1].focus();
    }
});

userItems.forEach((item) => item.addEventListener('click', () => {
    setOpenUserMenu(false);
    userBtn.focus();
}));

document.addEventListener('click', (e) => {
    if(isUserMenuOpen() && !userBtn.contains(e.target) && !userMenu.contains(e.target)) {
        setOpenUserMenu(false);
    }
});

document.addEventListener('keydown', (e) => {
    if(e.key === "Escape" && isUserMenuOpen()) {
        setOpenUserMenu(false);
        userBtn.focus();
    }
});

userMenu.addEventListener('focusout', (e) => {
    if(isUserMenuOpen() && e.relatedTarget && !userMenu.contains(e.relatedTarget) && e.relatedTarget !== userBtn) {
        setOpenUserMenu(false);
    }
});
