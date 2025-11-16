import React from "react";
import { useData } from "../context/DataContext.jsx";
import { Input, Select } from "antd";
import SideNav from "../components/SideNav.jsx";

export default function Documents() {
  const { documents } = useData();
  const [q, setQ] = React.useState("");
  const [cat, setCat] = React.useState("Все");
  const cats = React.useMemo(
    () => ["Все", ...Array.from(new Set(documents.map((d) => d.category)))],
    [documents]
  );
  const filtered = React.useMemo(
    () =>
      documents.filter(
        (d) =>
          (cat === "Все" || d.category === cat) &&
          (q === "" ||
            (d.title + " " + d.number + " " + d.text)
              .toLowerCase()
              .includes(q.toLowerCase()))
      ),
    [documents, cat, q]
  );

  return (
    <section className="section">
      <div className="container">
        <div className="page-grid">
          <div>
            <h1>Документы</h1>
            <div
              style={{
                display: "flex",
                gap: 12,
                flexWrap: "wrap",
                margin: "12px 0 20px",
              }}
            >
              <Input.Search
                placeholder="Поиск по названию, номеру, тексту"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                style={{ minWidth: 280, maxWidth: 520 }}
              />
              <Select
                value={cat}
                onChange={setCat}
                options={cats.map((c) => ({ value: c, label: c }))}
                style={{ minWidth: 200 }}
              />
            </div>
            <div className="law-list">
              {filtered.map((d) => (
                <div key={d.id} className="law-item card">
                  <div className="law-left">
                    <div className="law-ico">📄</div>
                    <div>
                      <div className="law-title">{d.title}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <SideNav
            title="Документы"
            links={[
              { label: "Законы Республики Тыва", href: "#/docs/laws" },
              { label: "Постановления ВХ РТ", href: "#/docs/resolutions" },
              {
                label: "Законодательные инициативы",
                href: "#/docs/initiatives",
              },
              {
                label: "Законодательная инициатива гражданами",
                href: "#/docs/civic",
              },
              {
                label: "Реализация поправок в Конституцию РФ",
                href: "#/docs/constitution",
              },
              { label: "Законопроекты", href: "#/docs/bills" },
            ]}
          />
        </div>
      </div>
    </section>
  );
}
