/*
The theme feature is no longer supported. It was deemed unnecessary to maintain, so I've decided to keep only the
white theme. Enjoy it —everything else is dark-themed these days, so this makes it unique.

const themeToggle = document.getElementById('themeToggle');

const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    //themeToggle.textContent = savedTheme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme';
}

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    //themeToggle.textContent = newTheme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme';
});*/