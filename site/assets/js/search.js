const index = new FlexSearch.Document({
  tokenize: "forward",
  document: {
    id: "url",
    index: ["title", "description", "content"],
    store: ["url", "title", "description"]  // 👈 Store full data to use in rendering
  }
});

async function loadData() {
const res = await fetch("/index.json");
const data = await res.json();
for (const doc of data) {
  index.add(doc);
}
}
function search(query) {
  const results = index.search(query, { enrich: true, suggest: true });
  const flat = [
    ...new Set(results.flatMap(group => group.result))
  ];
  return flat;  // each item contains the full stored document
}

function render(results) {
  const container = document.getElementById("searchResults");
  container.innerHTML = "";
  for (const res of results) {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = res.doc.url;
    a.textContent = res.doc.title || res.doc.url; // fallback to URL if title is missing
    li.appendChild(a);

    // Optionally show description
    if (res.description) {
      const desc = document.createElement("p");
      desc.textContent = res.doc.description;
      li.appendChild(desc);
    }

    container.appendChild(li);
  }
}

document.getElementById("searchBox").addEventListener("input", async (e) => {
const query = e.target.value;
if (!index.length) await loadData();
if (query.length > 1) {
  const results = search(query);
  render(results);
}else{
  const container = document.getElementById("searchResults");
  container.innerHTML = "";
}
});

document.getElementById("searchBox").addEventListener("focus", async (e) => {
  const div_result= document.getElementById("searchResultsDiv");
  div_result.classList.remove('hidden');
});


document.getElementById("searchBox").addEventListener("blur", async (e) => {
  const div_result= document.getElementById("searchResultsDiv");
  div_result.classList.add('hidden');
});
