const themes = ['default', 'theme-dark', 'theme-blue'];
let currentThemeIndex = 0;

const setTheme = (themeName) => {
    // Remove all possible theme classes from body
    themes.forEach(theme => document.body.classList.remove(theme));

    if (themeName !== 'default') {
        document.body.classList.add(themeName);
    }
    localStorage.setItem('selectedTheme', themeName);
};

const cycleTheme = () => {
    currentThemeIndex = (currentThemeIndex + 1) % themes.length;
    const nextTheme = themes[currentThemeIndex];
    setTheme(nextTheme);
};

export const initializeTheme = () => {
    const settingsIcon = document.getElementById('settingsIcon');
    if (!settingsIcon) return;

    const savedTheme = localStorage.getItem('selectedTheme');
    if (savedTheme && themes.includes(savedTheme)) {
        currentThemeIndex = themes.indexOf(savedTheme);
        setTheme(savedTheme);
    }

    settingsIcon.addEventListener('click', cycleTheme);
};