import React from "react";
import { useData } from "../context/DataContext.jsx";
import { Select, Card, Tag, Space, Button } from "antd";

export default function Deputies() {
  const { deputies } = useData();
  const [district, setDistrict] = React.useState("Все");
  const [convocation, setConvocation] = React.useState("Все");
  const [faction, setFaction] = React.useState("Все");

  const districts = React.useMemo(
    () => ["Все", ...Array.from(new Set(deputies.map((d) => d.district)))],
    [deputies]
  );
  const convocations = React.useMemo(
    () => ["Все", ...Array.from(new Set(deputies.map((d) => d.convocation)))],
    [deputies]
  );
  const factions = React.useMemo(
    () => ["Все", ...Array.from(new Set(deputies.map((d) => d.faction)))],
    [deputies]
  );

  const filtered = React.useMemo(
    () =>
      deputies.filter(
        (d) =>
          (district === "Все" || d.district === district) &&
          (convocation === "Все" || d.convocation === convocation) &&
          (faction === "Все" || d.faction === faction)
      ),
    [deputies, district, convocation, faction]
  );

  return (
    <section className="section">
      <div className="container">
        <h1>Депутаты</h1>
        <Space
          className="filters"
          size="middle"
          style={{ margin: "12px 0 20px" }}
          wrap
        >
          <Select
            value={district}
            onChange={setDistrict}
            options={districts.map((x) => ({ value: x, label: x }))}
            style={{ minWidth: 200 }}
          />
          <Select
            value={convocation}
            onChange={setConvocation}
            options={convocations.map((x) => ({ value: x, label: x }))}
            style={{ minWidth: 200 }}
          />
          <Select
            value={faction}
            onChange={setFaction}
            options={factions.map((x) => ({ value: x, label: x }))}
            style={{ minWidth: 200 }}
          />
        </Space>
        <div className="grid cols-3">
          {filtered.map((d) => (
            <Card
              key={d.id}
              title={
                <div className="card-title">
                  <img
                    className="avatar"
                    src={d.photo || "/img/max.png"}
                    alt=""
                    loading="lazy"
                  />
                  <span>{d.name}</span>
                </div>
              }
              extra={<Tag color="gold">{d.convocation}</Tag>}
            >
              <div style={{ color: "#6b7280", marginBottom: 6 }}>
                {d.district} · {d.faction}
              </div>
              <p>Приём граждан: {d.reception}</p>
              <Space wrap style={{ width: "100%" }}>
                <Button href={`#/government?type=dep&id=${d.id}`}>
                  Подробнее
                </Button>
                <Button href={`tel:${d.contacts.phone}`}>Позвонить</Button>
                <Button href={`mailto:${d.contacts.email}`} type="primary">
                  Написать
                </Button>
              </Space>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
