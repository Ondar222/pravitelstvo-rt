import React from "react";
import { useData } from "../context/DataContext.jsx";
import { Select, Card, Tag, Space, Button } from "antd";
import PersonDetail from "../components/PersonDetail.jsx";

export default function Government() {
  const {
    government,
    deputies,
    committees,
    factions: structureFactions,
    commissions: structureCommissions,
    councils: structureCouncils,
  } = useData();

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

  // Committees expand/collapse (Структура)
  const [openCommittee, setOpenCommittee] = React.useState(null);
  const renderCommittee = (id) => {
    const committee = (committees || []).find((c) => c.id === id) || null;
    const leader = committee?.members?.[0] || null;
    if (!leader) return null;
    return (
      <div className="orgv2__committee">
        <div className="person-card person-card--committee">
          <img
            className="person-card__photo"
            src={leader.photo || "/img/max.png"}
            alt=""
            loading="lazy"
          />
          <div className="person-card__body">
            <div className="person-card__name">{leader.name}</div>
            <div className="person-card__role">
              {leader.role || "Представитель Комитета"}
            </div>
            <ul className="person-card__meta">
              {leader.phone && <li>+ {leader.phone}</li>}
              {leader.email && <li>{leader.email}</li>}
              {leader.address && <li>{leader.address}</li>}
            </ul>
            <a
              className="btn btn--primary btn--compact"
              href={`#/committee?id=${id}`}
            >
              Подробнее
            </a>
          </div>
        </div>
        <div className="orgv2__actions">
          <a href={`#/committee?id=${id}`} className="btn btn--primary">
            Подробнее о комитете
          </a>
        </div>
      </div>
    );
  };

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
            <h1>О Верховном Хурале Республики Тыва</h1>
            <div className="tabs" style={{ marginBottom: 10 }}>
              <a className="pill" href="#/about">
                Общие сведения
              </a>
              <span className="pill pill--solid" aria-current="page">
                Структура органов управления
              </span>
            </div>
            {/* Blue diagram per provided reference (Image 2) */}
            <div className="org org--khural">
              <div className="org__row org__row--center">
                <div className="org__item org__item--blue org__item--xl">
                  Председатель Верховного Хурала (парламента) Республики Тыва
                </div>
              </div>
              <div className="org__row org__row--factions">
                {["Единая Россия", "КПРФ", "ЛДПР", "Новые люди"].map((f) => (
                  <a
                    key={f}
                    className="org__item org__item--blue"
                    href={`#/deputies?faction=${encodeURIComponent(f)}`}
                  >
                    Фракция
                    <br />
                    {f}
                  </a>
                ))}
              </div>
              <div className="org__row org__row--cols4">
                <div className="org__col">
                  <a
                    className="org__item org__item--blue"
                    href={"#/section?title=" + encodeURIComponent("Комитеты")}
                  >
                    Комитеты Верховного Хурала (парламента) Республики Тыва
                  </a>
                  {(committees || []).map((c) => (
                    <a
                      key={c.id}
                      className="org__item org__item--green"
                      href={`#/committee?id=${encodeURIComponent(c.id)}`}
                    >
                      {c.title}
                    </a>
                  ))}
                </div>
                <div className="org__col">
                  <a
                    className="org__item org__item--blue"
                    href={
                      "#/section?title=" +
                      encodeURIComponent(
                        "Комитет Верховного Хурала (парламента) Республики Тыва по межрегиональным связям"
                      )
                    }
                  >
                    Комитет Верховного Хурала (парламента) Республики Тыва по
                    межрегиональным связям
                  </a>
                  <a
                    className="org__item org__item--blue"
                    href={
                      "#/section?title=" +
                      encodeURIComponent(
                        "Комитет Верховного Хурала (парламента) Республики Тыва по взаимодействию со средствами массовой информации и общественными организациями"
                      )
                    }
                  >
                    Комитет Верховного Хурала (парламента) Республики Тыва по
                    взаимодействию со средствами массовой информации и
                    общественными организациями
                  </a>
                </div>
                <div className="org__col org__col--span2">
                  {[
                    "Комиссия Верховного Хурала (парламента) Республики Тыва по Регламенту Верховного Хурала (парламента) Республики Тыва и депутатской этике",
                    "Комиссия Верховного Хурала (парламента) Республики Тыва контрольно за достоверностью сведений о доходах, об имуществе и обязательствах имущественного характера, представляемых депутатами Верховного Хурала (парламента) Республики Тыва",
                    "Наградная комиссия Верховного Хурала (парламента) Республики Тыва",
                    "Комиссия Верховного Хурала (парламента) Республики Тыва по поддержке участников специальной военной операции и их семей",
                    "Счетная комиссия Верховного Хурала (парламента) Республики Тыва",
                  ].map((title, i) => (
                    <a
                      key={`wide-${i}`}
                      className="org__item org__item--blue"
                      href={`#/section?title=${encodeURIComponent(title)}`}
                    >
                      {title}
                    </a>
                  ))}
                </div>
              </div>
              <div className="org__row org__row--center">
                <a
                  className="org__item org__item--xl org__item--blue"
                  href="#/apparatus"
                >
                  Аппарат Верховного Хурала (парламента) Республики Тыва
                </a>
              </div>
            </div>
            <h2 style={{ marginTop: 0 }}>
              Структура Верховного Хурала (парламента) Республики Тыва
            </h2>
            <div className="orgv2">
              <div className="orgv2__chain">
                <div className="orgv2__line" />
                {[government[0], government[1]]
                  .filter(Boolean)
                  .map((p, idx) => (
                    <div key={p.id} className="person-card">
                      <img
                        className={`person-card__photo ${
                          idx === 0 ? "person-card__photo--xl" : ""
                        }`}
                        src={p.photo || "/img/ok.png"}
                        alt=""
                        loading="lazy"
                      />
                      <div className="person-card__body">
                        <div className="person-card__name">{p.name}</div>
                        <div className="person-card__role">{p.role}</div>
                        <ul className="person-card__meta">
                          {p.phone && <li>+ {p.phone}</li>}
                          {p.email && <li>{p.email}</li>}
                          {p.address && <li>{p.address}</li>}
                        </ul>
                        <a
                          className="btn btn--primary btn--compact"
                          href={`#/government?type=gov&id=${p.id}`}
                        >
                          Подробнее
                        </a>
                      </div>
                    </div>
                  ))}
              </div>
              <div className="orgv2__strip">
                <span className="pill pill--solid">
                  Фракция «Единая Россия»
                </span>
                <span className="pill pill--solid">Фракция ЛДПР</span>
                <span className="pill pill--solid">Фракция КПРФ</span>
                <span className="pill pill--solid">Фракция «Новые люди»</span>
                <a
                  href="#/committee?id=agro"
                  className="btn btn--primary orgv2__strip_btn"
                >
                  Подробнее о комитете
                </a>
              </div>
              <div className="orgv2__list">
                <div
                  className={`orgv2__pill orgv2__pill--outline orgv2__pill--button ${
                    openCommittee === "agro" ? "orgv2__pill--open" : ""
                  }`}
                  onClick={() =>
                    setOpenCommittee(openCommittee === "agro" ? null : "agro")
                  }
                >
                  Комитет по аграрной политике, земельным отношениям,
                  природопользованию, экологии и делам коренных малочисленных
                  народов
                </div>
                {openCommittee === "agro" ? renderCommittee("agro") : null}
                <div
                  className={`orgv2__pill orgv2__pill--outline orgv2__pill--button ${
                    openCommittee === "infra" ? "orgv2__pill--open" : ""
                  }`}
                  onClick={() =>
                    setOpenCommittee(openCommittee === "infra" ? null : "infra")
                  }
                >
                  Комитет по развитию инфраструктуры и промышленной политике
                </div>
                {openCommittee === "infra" ? renderCommittee("infra") : null}
                <div
                  className={`orgv2__pill orgv2__pill--outline orgv2__pill--button ${
                    openCommittee === "youth" ? "orgv2__pill--open" : ""
                  }`}
                  onClick={() =>
                    setOpenCommittee(openCommittee === "youth" ? null : "youth")
                  }
                >
                  Комитет по молодежной, информационной политике, физической
                  культуре и спорту, развитию институтов гражданского общества
                </div>
                {openCommittee === "youth" ? renderCommittee("youth") : null}
                <div
                  className={`orgv2__pill orgv2__pill--outline orgv2__pill--button ${
                    openCommittee === "security" ? "orgv2__pill--open" : ""
                  }`}
                  onClick={() =>
                    setOpenCommittee(
                      openCommittee === "security" ? null : "security"
                    )
                  }
                >
                  Комитет по безопасности и правопорядку
                </div>
                {openCommittee === "security"
                  ? renderCommittee("security")
                  : null}
                <div
                  className={`orgv2__pill orgv2__pill--outline orgv2__pill--button ${
                    openCommittee === "health" ? "orgv2__pill--open" : ""
                  }`}
                  onClick={() =>
                    setOpenCommittee(
                      openCommittee === "health" ? null : "health"
                    )
                  }
                >
                  Комитет по охране здоровья, занятости населения и социальной
                  политике
                </div>
                {openCommittee === "health" ? renderCommittee("health") : null}
                <div
                  className={`orgv2__pill orgv2__pill--outline orgv2__pill--button ${
                    openCommittee === "const" ? "orgv2__pill--open" : ""
                  }`}
                  onClick={() =>
                    setOpenCommittee(openCommittee === "const" ? null : "const")
                  }
                >
                  Комитет по конституционно‑правовой политике и местному
                  самоуправлению
                </div>
                {openCommittee === "const" ? renderCommittee("const") : null}
                <div
                  className={`orgv2__pill orgv2__pill--outline orgv2__pill--button ${
                    openCommittee === "econ" ? "orgv2__pill--open" : ""
                  }`}
                  onClick={() =>
                    setOpenCommittee(openCommittee === "econ" ? null : "econ")
                  }
                >
                  Комитет по экономической, финансово‑бюджетной и налоговой
                  политике, предпринимательству, туризму и государственной
                  собственности
                </div>
                {openCommittee === "econ" ? renderCommittee("econ") : null}
                <div
                  className={`orgv2__pill orgv2__pill--outline orgv2__pill--button ${
                    openCommittee === "edu" ? "orgv2__pill--open" : ""
                  }`}
                  onClick={() =>
                    setOpenCommittee(openCommittee === "edu" ? null : "edu")
                  }
                >
                  Комитет по образованию, культуре, науке и национальной
                  политике
                </div>
                {openCommittee === "edu" ? renderCommittee("edu") : null}
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
                  <Space wrap size="middle" style={{ width: "100%" }}>
                    <Button
                      className="btn--compact"
                      size="small"
                      href={`#/government?type=dep&id=${d.id}`}
                    >
                      Подробнее
                    </Button>
                    <Button
                      className="btn--compact"
                      size="small"
                      href={`tel:${d.contacts.phone}`}
                    >
                      Позвонить
                    </Button>
                    <Button
                      className="btn--compact"
                      size="small"
                      href={`mailto:${d.contacts.email}`}
                      type="primary"
                    >
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
                  <Space wrap size="middle" style={{ width: "100%" }}>
                    <Button
                      className="btn--compact"
                      size="small"
                      href={`#/government?type=gov&id=${p.id}`}
                    >
                      Подробнее
                    </Button>
                    <Button
                      className="btn--compact"
                      size="small"
                      href={`tel:${p.phone}`}
                    >
                      Позвонить
                    </Button>
                    <Button
                      className="btn--compact"
                      size="small"
                      href={`mailto:${p.email}`}
                      type="primary"
                    >
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
