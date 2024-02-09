const themeDarkName = "theme--dark";
const themeLightName = "theme--light";

function saveTheme(theme) {
    localStorage.removeItem("theme");
    localStorage.setItem("theme", theme);
}

function activateTheme(theme) {
    if (theme === themeDarkName) {
        document.body.classList.remove(themeLightName);
        document.body.classList.add(themeDarkName);
    } else {
        document.body.classList.remove(themeDarkName);
        document.body.classList.add(themeLightName);
    }
}

// Use theme based on local storage
// ---
// Prefer user settings over system settings

const savedTheme = localStorage.getItem("theme");

// If there is no local storage value set
if (savedTheme === null) {
    const darkModeMediaQuery = window.matchMedia(
        "(prefers-color-scheme: dark)"
    );
    // Set theme according to operating system settings
    if (darkModeMediaQuery.matches) {
        activateTheme(themeDarkName);
    } else {
        activateTheme(themeLightName);
    }
}
// Otherwise set theme according to local storage value
else {
    activateTheme(savedTheme);
}

// Toggle theme using button
// ---

const btn = document.querySelector(".js-theme-toggle");
btn.addEventListener("click", () => {
    if (document.body.classList.contains(themeLightName)) {
        activateTheme(themeDarkName);
        saveTheme(themeDarkName);
    } else {
        activateTheme(themeLightName);
        saveTheme(themeLightName);
    }
});

// Switch theme dynamically when OS theme is changing
// ---

const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
darkModeMediaQuery.addListener((e) => {
    const darkModeOn = e.matches;
    if (darkModeOn) {
        activateTheme(themeDarkName);
    } else {
        activateTheme(themeLightName);
    }
});

// ---
// https://web.dev/prefers-color-scheme/
// https://web.dev/prefers-color-scheme/
// https://css-tricks.com/a-complete-guide-to-dark-mode-on-the-web/#os-level
