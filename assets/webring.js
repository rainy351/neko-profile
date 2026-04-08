async function loadWebring() {
  try {
    const response = await fetch("assets/webring.json");
    const sites = await response.json();
    const grid = document.getElementById("webringGrid");

    sites.forEach((site) => {
      const a = document.createElement("a");
      a.href = site.url;
      a.target = "_blank";
      a.innerHTML = `<img src="${site.img}" alt="${site.name}" class="webring-item" />`;
      grid.appendChild(a);
    });
  } catch (err) {
    console.error("Не удалось загрузить вебринг:", err);
    document.getElementById("webringGrid").innerHTML =
      "<p>Error loading webring :p</p>";
  }
}

loadWebring();
