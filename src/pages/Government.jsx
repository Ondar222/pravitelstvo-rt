import React from "react";
import { useData } from "../context/DataContext.jsx";
import { Select, Card, Tag, Space, Button } from "antd";
import PersonDetail from "../components/PersonDetail.jsx";

export default function Government() {
  const { government, deputies } = useData();

  const [section, setSection] = React.useState(() => {
    const h = window.location.hash;
    const sp = new URLSearchParams(h.split("?")[1]);
    const t = sp.get("type");
    if (t === "dep") return "Депутаты";
    if (t === "org") return "Структура";
    return "Правительство";
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
      if (t === "dep") setSection("Депутаты");
      else if (t === "org") setSection("Структура");
      else setSection("Правительство");
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
      <PersonDetail
        item={item}
        type={section === "Депутаты" ? "dep" : "gov"}
        backHref={`#/government?type=${section === "Депутаты" ? "dep" : "gov"}`}
      />
    );
  }

  return (
    <section className="section">
      <div className="container">
        <h1>Правительство</h1>
        {section !== "Структура" && (
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
        )}

        {section === "Структура" ? (
          <>
            <div className="org org--khural">
              <div className="org__row org__row--center">
                <div className="org__item org__item--blue org__item--wide">
                  СТРУКТУРА ВЕРХОВНОГО ХУРАЛА (ПАРЛАМЕНТА) РЕСПУБЛИКИ ТЫВА
                </div>
              </div>
              <div className="org__row org__row--center">
                <div className="org__item org__item--blue org__item--lg">
                  Председатель Верховного Хурала (парламента) Республики Тыва
                </div>
              </div>
              <div className="org__row org__row--factions">
                <div className="org__item org__item--blue">
                  Фракция Единая Россия
                </div>
                <div className="org__item org__item--blue">Фракция КПРФ</div>
                <div className="org__item org__item--blue">Фракция ЛДПР</div>
                <div className="org__item org__item--blue">
                  Фракция Новые люди
                </div>
              </div>

              <div className="org__row">
                <div className="org__col">
                  <div className="org__item org__item--blue">
                    Комитеты Верховного Хурала (парламента) Республики Тыва
                  </div>
                  <div className="org__item org__item--green">
                    Комитет по аграрной политике, земельным отношениям,
                    природопользованию, экологии и делам коренных малочисленных
                    народов
                  </div>
                  <div className="org__item org__item--green">
                    Комитет по развитию инфраструктуры и промышленной политике
                  </div>
                  <div className="org__item org__item--green">
                    Комитет по молодежной, информационной политике, физической
                    культуре и спорту, развитию институтов гражданского общества
                  </div>
                  <div className="org__item org__item--green">
                    Комитет по безопасности и правопорядку
                  </div>
                  <div className="org__item org__item--green">
                    Комитет по охране здоровья, занятости населения и социальной
                    политике
                  </div>
                  <div className="org__item org__item--green">
                    Комитет по конституционно‑правовой политике и местному
                    самоуправлению
                  </div>
                  <div className="org__item org__item--green">
                    Комитет по экономической, финансово‑бюджетной, налоговой
                    политике, предпринимательству, туризму и государственной
                    собственности
                  </div>
                  <div className="org__item org__item--green">
                    Комитет по образованию, культуре, науке и национальной
                    политике
                  </div>
                </div>

                <div className="org__col">
                  <div className="org__item org__item--blue">
                    Комитет Верховного Хурала (парламента) Республики Тыва по
                    межрегиональным и международным связям
                  </div>
                  <div className="org__item org__item--blue">
                    Комитет Верховного Хурала (парламента) Республики Тыва по
                    взаимодействию со средствами массовой информации и
                    общественными организациями
                  </div>
                  <div className="org__item org__item--blue">
                    Наградная комиссия Верховного Хурала (парламента) Республики
                    Тыва
                  </div>
                </div>

                <div className="org__col">
                  <div className="org__item org__item--blue">
                    Комиссия Верховного Хурала (парламента) Республики Тыва по
                    Регламенту Верховного Хурала (парламента) Республики Тыва и
                    депутатской этике
                  </div>
                  <div className="org__item org__item--blue">
                    Комиссия Верховного Хурала (парламента) Республики Тыва
                    контроля за достоверностью сведений о доходах, об имуществе
                    и обязательствах имущественного характера, представляемых
                    депутатами Верховного Хурала (парламента) Республики Тыва
                  </div>
                  <div className="org__item org__item--blue">
                    Комиссия Верховного Хурала (парламента) Республики Тыва по
                    поддержке участников специальной военной операции и их
                    семей.
                  </div>
                  <div className="org__item org__item--blue">
                    Счетная комиссия Верховного Хурала (парламента) Республики
                    Тыва
                  </div>
                </div>
              </div>

              <div className="org__row org__row--center">
                <div className="org__item org__item--blue org__item--wide">
                  Аппарат Верховного Хурала (парламента) Республики Тыва
                </div>
              </div>
            </div>
          </>
        ) : section === "Депутаты" ? (
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
                  title={
                    <div className="card-title card-title--stack">
                      <img
                        className="avatar"
                        src={p.photo || "/img/ok.png"}
                        alt=""
                        loading="lazy"
                      />
                      <div className="card-title__text">
                        <span className="card-title__name">{p.name}</span>
                        {p.role && (
                          <span className="card-subtitle">{p.role}</span>
                        )}
                      </div>
                    </div>
                  }
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
