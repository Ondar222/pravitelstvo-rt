import React from "react";

export default function Appeals() {
  const [form, setForm] = React.useState({
    name: "",
    email: "",
    phone: "",
    text: "",
  });
  const [ok, setOk] = React.useState(false);
  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    setOk(true);
  };

  return (
    <section className="section">
      <div className="container">
        <h1>Обращения граждан</h1>
        {ok ? (
          <div className="tile">
            Спасибо! Ваше обращение отправлено. Номер регистрации: A-
            {Date.now().toString().slice(-6)}
          </div>
        ) : (
          <form
            className="tile"
            onSubmit={onSubmit}
            style={{ display: "grid", gap: 12 }}
          >
            <input
              required
              name="name"
              placeholder="ФИО"
              value={form.name}
              onChange={onChange}
            />
            <input
              required
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={onChange}
            />
            <input
              name="phone"
              placeholder="Телефон"
              value={form.phone}
              onChange={onChange}
            />
            <textarea
              required
              name="text"
              placeholder="Текст обращения"
              value={form.text}
              onChange={onChange}
              rows={6}
            ></textarea>
            <button className="btn" type="submit">
              Отправить
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
