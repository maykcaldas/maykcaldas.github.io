document.addEventListener("DOMContentLoaded", () => {
    fetch("../posts.json")
        .then(response => response.json())
        .then(posts => {
            const postsContainer = document.getElementById("posts");
            const tagFilter = document.getElementById("tagFilter");
            let tags = new Set();

            posts.forEach(post => {
                tags = new Set([...tags, ...post.tags]);

                const postElement = document.createElement("a");
                postElement.href = `post.html?file=${post.file}`;
                postElement.classList.add("post", "blog-card");
                postElement.innerHTML = `
                    <article>
                        <h2>${post.title}</h2>
                        <p>${post.date}</p>
                        <p>Tags: ${post.tags.join(", ")}</p>
                    </article>
                `;
                postsContainer.appendChild(postElement);
            });

            tags.forEach(tag => {
                let option = document.createElement("option");
                option.value = tag;
                option.textContent = tag;
                tagFilter.appendChild(option);
            });

            tagFilter.addEventListener("change", () => {
                const selectedTag = tagFilter.value;
                postsContainer.innerHTML = "";

                posts.filter(post => selectedTag === "all" || post.tags.includes(selectedTag))
                    .forEach(post => {
                        const postElement = document.createElement("a");
                        postElement.href = `post.html?file=${post.file}`;
                        postElement.classList.add("post", "blog-card");
                        postElement.innerHTML = `
                            <h2>${post.title}</h2>
                            <p>${post.date}</p>
                            <p>Tags: ${post.tags.join(", ")}</p>
                        `;
                        postsContainer.appendChild(postElement);
                    });
            });
        });
});
