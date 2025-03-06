document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const file = params.get("file");

    if (file) {
        fetch(`/posts/${file}`) // Adjusted to correctly fetch markdown posts
            .then(response => response.text())
            .then(content => {
                document.getElementById("post-content").innerHTML = marked.parse(content);
                Prism.highlightAll();
            });
    }
});
