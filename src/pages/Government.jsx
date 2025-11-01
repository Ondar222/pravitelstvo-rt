import React from "react";
import { useData } from "../context/DataContext.jsx";
import { Select, Card, Tag, Space, Button } from "antd";

export default function Government() {
  const { government, deputies } = useData();

  const [section, setSection] = React.useState(() => {
    const h = window.location.hash;
    const sp = new URLSearchParams(h.split("?")[1]);
    const t = sp.get("type");
    return t === "dep" ? "Депутаты" : "Правительство";
  });

  const [agency, setAgency] = React.useState("Все");
  const [role, setRole] = React.useState("Все");
  const [district, setDistrict] = React.useState("Все");
  const [convocation, setConvocation] = React.useState("Все");
  const [faction, setFaction] = React.useState("Все");

  const [selected, setSelected] = React.useState(() => {
    const h = window.location.hash;
    const sp = new URLSearchParams(h.split("?")[1]);
    const id = sp.get("id");
    return id || null;
  });
  React.useEffect(() => {
    const onHash = () => {
      const h = window.location.hash;
      const sp = new URLSearchParams(h.split("?")[1]);
      const id = sp.get("id");
      const t = sp.get("type");
      setSection(t === "dep" ? "Депутаты" : "Правительство");
      setSelected(id || null);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const agencies = React.useMemo(
    () => ["Все", ...Array.from(new Set(government.map((p) => p.agency)))],
    [government]
  );
  const roles = React.useMemo(
    () => ["Все", ...Array.from(new Set(government.map((p) => p.role)))],
    [government]
  );

  const filtered = React.useMemo(
    () =>
      government.filter(
        (p) =>
          (agency === "Все" || p.agency === agency) &&
          (role === "Все" || p.role === role)
      ),
    [government, agency, role]
  );

  // Deputies filters
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
  const filteredDeps = React.useMemo(
    () =>
      deputies.filter(
        (d) =>
          (district === "Все" || d.district === district) &&
          (convocation === "Все" || d.convocation === convocation) &&
          (faction === "Все" || d.faction === faction)
      ),
    [deputies, district, convocation, faction]
  );

  if (selected) {
    const dataset = section === "Депутаты" ? deputies : government;
    const item = dataset.find((p) => p.id === selected);
    if (!item) return null;
    return (
      <section className="section">
        <div className="container">
          <a
            className="btn"
            href={`#/government?type=${section === "Депутаты" ? "dep" : "gov"}`}
            style={{ marginBottom: 12 }}
          >
            ← К списку
          </a>
          <h1 style={{ marginBottom: 8 }}>{item.name || item.title}</h1>
          {section === "Депутаты" ? (
            <div className="card" style={{ padding: 16 }}>
              <div style={{ color: "#6b7280", marginBottom: 6 }}>
                {item.district} · {item.faction} · созыв {item.convocation}
              </div>
              <p>Приём граждан: {item.reception}</p>
              <Space wrap style={{ width: "100%" }}>
                <Button href={`tel:${item.contacts?.phone}`}>Позвонить</Button>
                <Button href={`mailto:${item.contacts?.email}`} type="primary">
                  Написать
                </Button>
              </Space>
            </div>
          ) : (
            <div className="card" style={{ padding: 16 }}>
              <div style={{ color: "#6b7280", marginBottom: 6 }}>
                {item.role} · {item.agency}
              </div>
              <p>{item.bio}</p>
              <p>Приём граждан: {item.reception}</p>
              <Space wrap style={{ width: "100%" }}>
                <Button href={`tel:${item.phone}`}>Позвонить</Button>
                <Button href={`mailto:${item.email}`} type="primary">
                  Написать
                </Button>
              </Space>
            </div>
          )}
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="container">
        <h1>Правительство</h1>
        <Space
          className="filters"
          size="middle"
          style={{ margin: "12px 0 20px" }}
          wrap
        >
          <Select
            value={section}
            onChange={setSection}
            options={[
              { value: "Правительство", label: "Правительство" },
              { value: "Депутаты", label: "Депутаты" },
            ]}
            style={{ minWidth: 220 }}
          />
        </Space>

        {section === "Депутаты" ? (
          <>
            <Space
              className="filters"
              size="middle"
              style={{ margin: "0 0 16px" }}
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
              {filteredDeps.map((d) => (
                <Card
                  key={d.id}
                  title={d.name}
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
          </>
        ) : (
          <>
            <Space
              className="filters"
              size="middle"
              style={{ margin: "0 0 16px" }}
              wrap
            >
              <Select
                value={agency}
                onChange={setAgency}
                options={agencies.map((x) => ({ value: x, label: x }))}
                style={{ minWidth: 220 }}
              />
              <Select
                value={role}
                onChange={setRole}
                options={roles.map((x) => ({ value: x, label: x }))}
                style={{ minWidth: 220 }}
              />
            </Space>
            <div className="grid cols-3">
              {filtered.map((p) => (
                <Card
                  key={p.id}
                  title={p.name}
                  extra={<Tag color="gold">{p.role}</Tag>}
                >
                  <div style={{ color: "#6b7280", marginBottom: 6 }}>
                    {p.agency}
                  </div>
                  <p>Приём граждан: {p.reception}</p>
                  <Space wrap style={{ width: "100%" }}>
                    <Button href={`#/government?type=gov&id=${p.id}`}>
                      Подробнее
                    </Button>
                    <Button href={`tel:${p.phone}`}>Позвонить</Button>
                    <Button href={`mailto:${p.email}`} type="primary">
                      Написать
                    </Button>
                  </Space>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
