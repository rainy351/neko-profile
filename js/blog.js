async function loadBlogPosts() {
  const container = document.querySelector(".blog-posts");
  if (!container) return;

  try {
    const response = await fetch("assets/blog.json");
    if (!response.ok) throw new Error("Failed to load blog posts");
    const posts = await response.json();

    container.innerHTML = posts
      .map((post) => {
        const titleLine = post.date
          ? `<p class="post-title">${post.date} -- ${post.title}</p>`
          : "";

        return `
          <div class="post">
            ${titleLine}
            <p class="post-excerpt">${post.excerpt}</p>
          </div>
        `;
      })
      .join("");
  } catch (error) {
    console.error("Error loading blog posts:", error);
    container.innerHTML =
      '<div class="post"><p class="post-excerpt">Failed to load blog posts. Please refresh.</p></div>';
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", loadBlogPosts);
} else {
  loadBlogPosts();
}
