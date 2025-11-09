import React from "react";
import { useData } from "../context/DataContext.jsx";

export default function Committee() {
  const { committees, deputies } = useData();
  const [committee, setCommittee] = React.useState(null);

  React.useEffect(() => {
    const h = window.location.hash;
    const sp = new URLSearchParams(h.split("?")[1]);
    const id = sp.get("id") || "agro";
    const c = (committees || []).find((x) => x.id === id);
    setCommittee(c || null);
  }, [committees]);

  React.useEffect(() => {
    const onHash = () => {
      const h = window.location.hash;
      const sp = new URLSearchParams(h.split("?")[1]);
      const id = sp.get("id") || "agro";
      const c = (committees || []).find((x) => x.id === id);
      setCommittee(c || null);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, [committees]);

  if (!committee) {
    return (
      <section className="section">
        <div className="container">
          <h1>Комитет</h1>
          <p>Комитет не найден.</p>
        </div>
      </section>
    );
  }

  const resolveMember = (m) => {
    if (!m) return null;
    const d = m.id ? (deputies || []).find((x) => x.id === m.id) : null;
    return {
      id: m.id || d?.id || m.name,
      name: d?.name || m.name,
      role: m.role,
      photo: d?.photo || m.photo || "/img/max.png",
      phone: d?.contacts?.phone || m.phone,
      email: d?.contacts?.email || m.email,
      address: d?.address || m.address,
    };
  };

  const members = (committee.members || []).map(resolveMember).filter(Boolean);
  const leader = members[0];
  const rest = members.slice(1);

  return (
    <section className="section">
      <div className="container">
        <h1>{committee.title}</h1>
        <div className="orgv2__chain" style={{ marginTop: 8 }}>
          <div className="orgv2__line" />
          {[leader, ...rest].filter(Boolean).map((p, idx) => (
            <div key={p.id || idx} className="person-card">
              <img
                className={`person-card__photo ${
                  idx === 0 ? "person-card__photo--xl" : ""
                }`}
                src={p.photo}
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
                  className="btn btn--primary"
                  href={p.id ? `#/government?type=dep&id=${p.id}` : "#"}
                >
                  Подробнее
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
