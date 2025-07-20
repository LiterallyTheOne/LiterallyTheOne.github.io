const index = new FlexSearch.Document({
  tokenize: "forward",
  document: {
    store: true,
    id: "url",
    index: ["title", "description", "content"],
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
  const results = index.search({ query: query,
  enrich: true,
  suggest: true,
  highlight: {template: "<b class='rounded shadow-md bg-purple-500'>$1</b>", boundary: 100},

      });
  const flat = [
    ...new Set(results.flatMap(group => group.result))
  ];
  return flat;  // each item contains the full stored document
}

function render(results) {
  const container = document.getElementById("searchResults");
  container.innerHTML = "";
  for (const res of results) {
    const d1 = document.createElement("div");
    d1.classList.add("rounded");
    d1.classList.add("border-2");
    const a = document.createElement("a");
    a.classList.add("bg-cyan-500");
    a.href = res.doc.url;
    a.innerHTML = res.doc.title || res.doc.url;  // allows HTML (like <mark>)
//    a.textContent = res.doc.title || res.doc.url; // fallback to URL if title is missing
    d1.appendChild(a);

    // Optionally show description
    const desc = document.createElement("p");
    desc.innerHTML = res.highlight;
    d1.appendChild(desc);

    container.appendChild(d1);
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

//document.getElementById("searchBox").addEventListener("focus", async (e) => {
//  const div_result= document.getElementById("searchResults");
//  div_result.classList.remove('hidden');
//});

//document.getElementById("searchBox").addEventListener("blur", async (e) => {
//  const div_result= document.getElementById("searchResults");
//  div_result.classList.add('hidden');
//});
