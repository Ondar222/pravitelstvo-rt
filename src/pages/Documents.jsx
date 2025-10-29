import React from "react";
import { useData } from "../context/DataContext.jsx";
import { Table, Input, Select, Tag } from "antd";

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
        <Table
          rowKey="id"
          dataSource={filtered}
          columns={[
            { title: "Название", dataIndex: "title", key: "title" },
            { title: "№", dataIndex: "number", key: "number", width: 120 },
            {
              title: "Категория",
              dataIndex: "category",
              key: "category",
              render: (v) => <Tag color="blue">{v}</Tag>,
            },
            { title: "Дата", dataIndex: "date", key: "date", width: 140 },
          ]}
          pagination={{ pageSize: 10 }}
        />
      </div>
    </section>
  );
}
