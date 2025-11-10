import React from "react";
import PdfPreviewModal from "../../components/PdfPreviewModal.jsx";

const CATEGORIES = [
  {
    slug: "laws",
    title: "Законы Республики Тыва",
    data: "/data/docs_laws.json",
  },
  {
    slug: "resolutions",
    title: "Постановления ВХ РТ",
    data: "/data/docs_resolutions.json",
  },
  {
    slug: "initiatives",
    title: "Законодательные инициативы",
    data: "/data/docs_initiatives.json",
  },
  {
    slug: "civic",
    title: "Законодательная инициатива гражданами",
    data: "/data/docs_civic.json",
  },
  {
    slug: "constitution",
    title: "Реализация принятых поправок в Конституцию РФ",
    data: "/data/docs_constitution.json",
  },
  { slug: "bills", title: "Законопроекты", data: "/data/docs_bills.json" },
];

async function fetchJson(path) {
  try {
    const res = await fetch(path, { cache: "no-cache" });
    if (!res.ok) throw new Error("Failed " + path);
    return await res.json();
  } catch {
    return [];
  }
}

export default function DocsPage() {
  const [docs, setDocs] = React.useState([]);
  const [q, setQ] = React.useState("");
  const [preview, setPreview] = React.useState(null); // {url, title}

  const slug = React.useMemo(() => {
    const h = window.location.hash;
    const base = h.replace(/^#/, "").split("?")[0];
    const parts = base.split("/").filter(Boolean);
    return parts[1] || "laws";
  }, []);

  const cat = CATEGORIES.find((c) => c.slug === slug) || CATEGORIES[0];

  React.useEffect(() => {
    fetchJson(cat.data).then(setDocs);
  }, [cat.data]);

  const filtered = React.useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return docs;
    return docs.filter((d) =>
      (d.title + " " + (d.number || "") + " " + (d.desc || ""))
        .toLowerCase()
        .includes(s)
    );
  }, [docs, q]);

  return (
    <section className="section">
      <div className="container">
        <h1>{cat.title}</h1>
        <div
          style={{
            display: "flex",
            gap: 12,
            flexWrap: "wrap",
            margin: "12px 0 20px",
          }}
        >
          <input
            className="search-input"
            placeholder="Поиск по названию, номеру или описанию"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            style={{ minWidth: 320, flex: "1 1 320px" }}
          />
        </div>
        <div className="law-list">
          {filtered.map((d) => (
            <div key={d.id || d.url} className="law-item card">
              <div className="law-left">
                <div className="law-ico">📄</div>
                <div>
                  <div className="law-title">{d.title}</div>
                  {d.desc && <div className="law-desc">{d.desc}</div>}
                  {d.number && <div className="law-status">№ {d.number}</div>}
                </div>
              </div>
              <a
                className="btn btn--primary"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setPreview({ url: d.url, title: d.title });
                }}
              >
                Открыть
              </a>
            </div>
          ))}
        </div>
      </div>
      <PdfPreviewModal
        open={!!preview}
        onClose={() => setPreview(null)}
        url={preview?.url}
        title={preview?.title}
      />
    </section>
  );
}
