function loadComponent(containerId, filePath) {
    fetch(filePath)
        .then(response => response.text())
        .then(data => {
            document.getElementById(containerId).innerHTML = data;
        })
        .catch(error => console.error(`Error loading ${filePath}:`, error));
}

// Load components on page load
document.addEventListener("DOMContentLoaded", function () {
    Promise.all([
        loadComponent("header-container", "/components/header.html"),
        loadComponent("sidebar-container", "/components/sidebar.html"),
    ]).then(() => {
        document.body.style.visibility = "visible";
    });
});
