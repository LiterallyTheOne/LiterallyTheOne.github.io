const index = new FlexSearch.Document({
  tokenize: "forward",
  document: {
    store: true,
    id: "url",
    index: ["title", "description", "content", "image", "date"],
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
  const results = index.search({
    query: query,
    enrich: true,
    suggest: true,
    highlight: { template: "<b class='rounded shadow-md bg-purple-500'>$1</b>", boundary: 100 },
  });

  // Remove duplicate pages by URL
  const seen = new Set();
  for (const group of results) {
    group.result = group.result.filter(item => {
      if (seen.has(item.doc.url)) return false;
      seen.add(item.doc.url);
      return true;
    });
  }
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
    d1.classList.add("flex");
    d1.classList.add("flex-col");
    d1.classList.add("gap-3");
    d1.classList.add("items-center");
    d1.classList.add("rounded");
    d1.classList.add("border-2");
    d1.classList.add("border-blue-200");
    d1.classList.add("dark:border-blue-950");

    const img = document.createElement("img");
    if (res.doc.image != null) {
      img.src = res.doc.url + "/" + res.doc.image;
    } else {
      img.src = "/images/profile.webp";
    }

    img.classList.add("w-[300px]");
    img.classList.add("h-[300px]");
    d1.appendChild(img);

    const a = document.createElement("a");
    a.classList.add("bg-cyan-500");
    a.href = res.doc.url;
    a.innerHTML = res.doc.title || res.doc.url;
    d1.appendChild(a);

    const date = document.createElement("tim");
    date.classList.add("flex")
    date.classList.add("text-sm")
    date.classList.add("text-gray-500")
    date.setAttribute("datetime", res.doc.date);
    date.innerHTML = new Date(res.doc.date).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    d1.appendChild(date);

    const desc = document.createElement("p");
    desc.innerHTML = res.highlight;
    desc.classList.add("text-center");
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
  } else {
    const container = document.getElementById("searchResults");
    container.innerHTML = "";
  }
});