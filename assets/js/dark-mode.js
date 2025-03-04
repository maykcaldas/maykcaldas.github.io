// Select the toggle button
const toggleButton = document.getElementById("dark-mode-toggle");

// Check for saved user preference
const userPreference = localStorage.getItem("theme");
if (userPreference === "dark") {
document.body.classList.add("dark-mode");
}

// Toggle dark mode
toggleButton.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const isDarkMode = document.body.classList.contains("dark-mode");
    // Toggle icons
    if (isDarkMode) {
        toggleButton.classList.remove("fa-moon");
        toggleButton.classList.add("fa-sun");
        toggleButton.classList.toggle("light-mode-icon");
        toggleButton.classList.toggle("dark-mode-icon");
    } else {
        toggleButton.classList.remove("fa-sun");
        toggleButton.classList.add("fa-moon");
        toggleButton.classList.toggle("light-mode-icon");
        toggleButton.classList.toggle("dark-mode-icon");
    }

    // Save user preference
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
});
