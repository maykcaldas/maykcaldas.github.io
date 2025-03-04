document.addEventListener("DOMContentLoaded", () => {
    fetch("../posts.json")
        .then(response => response.json())
        .then(posts => {
            const postsContainer = document.getElementById("posts");
            const tagFilter = document.getElementById("tagFilter");
            let tags = new Set();

            posts.forEach(post => {
                tags = new Set([...tags, ...post.tags]);

                const postElement = document.createElement("div");
                postElement.innerHTML = `
                <div class="posts">
                    <article>
                        <h2><a href="post.html?file=${post.file}">${post.title}</a></h2>
                        <p>${post.date}</p>
                        <p>Tags: ${post.tags.join(", ")}</p>
                    </article>
                </div>
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
                        const postElement = document.createElement("div");
                        postElement.innerHTML = `
                            <h2><a href="post.html?file=${post.file}">${post.title}</a></h2>
                            <p>${post.date}</p>
                            <p>Tags: ${post.tags.join(", ")}</p>
                        `;
                        postsContainer.appendChild(postElement);
                    });
            });
        });
});
