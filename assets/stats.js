async function loadNekowebStats() {
  const domain = "rainy351.nekoweb.org";
  try {
    const response = await fetch(`https://nekoweb.org/api/site/info/${domain}`);
    const json = await response.json();

    const updated = new Date(json.updated_at).toLocaleDateString();
    const created = new Date(json.created_at).toLocaleDateString();

    if (document.getElementById("created"))
      document.getElementById("created").innerHTML =
        `<em>Created</em>: ${created}`;
    if (document.getElementById("updated"))
      document.getElementById("updated").innerHTML =
        `<em>Updated</em>: ${updated}`;
    if (document.getElementById("visitors"))
      document.getElementById("visitors").innerHTML =
        `<em>Visits</em>: ${json.views}`;
    if (document.getElementById("followers"))
      document.getElementById("followers").innerHTML =
        `<em>Followers</em>: ${json.followers}`;
  } catch (error) {
    console.error("Stats error:", error);
    document.getElementById("visitors").innerText = "Failed to load stats :p";
  }
}

loadNekowebStats();
