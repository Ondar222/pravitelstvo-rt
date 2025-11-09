import React from "react";

export default function Apparatus() {
  return (
    <section className="section">
      <div className="container">
        <div className="tabs" style={{ marginTop: 8, marginBottom: 12 }}>
          <a className="pill" href="#/government?type=org">
            ← Назад к структуре
          </a>
        </div>
        <h1>Аппарат Верховного Хурала (парламента) Республики Тыва</h1>

        <div className="orgv2">
          {/* Руководитель + заместитель */}
          <div className="orgv2__chain">
            <div className="orgv2__line" />
            <div className="person-card">
              <img
                className="person-card__photo person-card__photo--xl"
                src="https://khural.rtyva.ru/upload/iblock/c37/%D0%A3%D1%81%D0%BF%D1%83%D0%BD%20%D0%9C.%D0%98..jpg"
                alt=""
                loading="lazy"
              />
              <div className="person-card__body">
                <div className="person-card__name">Успун Маадыр Иргитович</div>
                <div className="person-card__role">
                  Руководитель Аппарата Верховного Хурала (парламента)
                  Республики Тыва
                </div>
                <ul className="person-card__meta">
                  <li>+7 (959)123‑45‑67</li>
                  <li>lol@mail.ru</li>
                  <li>г. Кызыл, ул. Ленина, 40</li>
                  <li>Фракция: «ЕДИНАЯ РОССИЯ»</li>
                </ul>
                <a
                  className="btn btn--primary btn--compact"
                  href="#/government?type=gov"
                >
                  Подробнее
                </a>
              </div>
            </div>
            <div className="person-card">
              <img
                className="person-card__photo"
                src="https://khural.rtyva.ru/upload/iblock/2d3/IMG_1348.JPG"
                alt=""
                loading="lazy"
              />
              <div className="person-card__body">
                <div className="person-card__name">
                  Ананьина Ирина Викторовна
                </div>
                <div className="person-card__role">
                  Заместитель руководителя Аппарата, начальник организационного
                  управления
                </div>
                <ul className="person-card__meta">
                  <li>+7 (959)123‑45‑67</li>
                  <li>lol@mail.ru</li>
                  <li>г. Кызыл, ул. Ленина, 40</li>
                </ul>
                <a
                  className="btn btn--primary btn--compact"
                  href="#/government?type=gov"
                >
                  Подробнее
                </a>
              </div>
            </div>
          </div>

          {/* Ветка организационного управления */}
          <div className="orgv2__strip" style={{ justifyContent: "center" }}>
            <span className="orgv2__pill orgv2__pill--outline">
              Организационное управление аппарата
            </span>
          </div>

          <div className="grid cols-1" style={{ gap: 16, marginBottom: 24 }}>
            <div className="person-card person-card--committee">
              <img
                className="person-card__photo"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrm9qv4DwbeHFaIDG39k6DjPnAb8ue71tAJ6ZFX1j5WQbSLbibwC_XiG4x42Zy_dE97Fk&usqp=CAU"
                alt=""
                loading="lazy"
              />
              <div className="person-card__body">
                <div className="person-card__name">Ондар Айбина Борисовна</div>
                <div className="person-card__role">
                  Начальник отдела по организационному обеспечению Комитета по
                  государственному строительству и местному самоуправлению
                </div>
                <ul className="person-card__meta">
                  <li>+7 (959)123‑45‑67</li>
                  <li>lol@mail.ru</li>
                  <li>г. Кызыл, ул. Ленина, 40</li>
                </ul>
                <a
                  className="btn btn--primary btn--compact"
                  href="#/government?type=gov"
                >
                  Подробнее
                </a>
              </div>
            </div>
          </div>

          {/* Прочие подразделения аппарата */}
          <div className="orgv2__list">
            <div className="orgv2__pill orgv2__pill--outline">
              Государственно-правовое управление
            </div>
            <div className="orgv2__pill orgv2__pill--outline">
              Управление делами Аппарата ВХ РТ
            </div>
            <div className="orgv2__pill orgv2__pill--outline">
              Информационно-аналитическое управление
            </div>
            <div className="orgv2__pill orgv2__pill--outline">
              Управление финансов, бухгалтерского учета и отчетности Аппарата ВХ
              РТ
            </div>
            <div className="orgv2__pill orgv2__pill--outline">
              Отдел технического и программного обеспечения Аппарата ВХ РТ
            </div>
            <div className="orgv2__pill orgv2__pill--outline">
              Отдел кадров и государственной службы Аппарата ВХ РТ
            </div>
          </div>

          {/* Помощники руководства */}
          <div className="grid cols-1" style={{ gap: 16, marginTop: 24 }}>
            <div className="person-card">
              <img
                className="person-card__photo"
                src="https://khural.rtyva.ru/upload/iblock/a62/DSC_5473.jpg"
                alt=""
                loading="lazy"
              />
              <div className="person-card__body">
                <div className="person-card__name">
                  Орус-оол Амир Донгакович
                </div>
                <div className="person-card__role">
                  Первый помощник Председателя
                </div>
                <ul className="person-card__meta">
                  <li>+7 (959)123‑45‑67</li>
                  <li>lol@mail.ru</li>
                  <li>г. Кызыл, ул. Ленина, 40</li>
                </ul>
                <a
                  className="btn btn--primary btn--compact"
                  href="#/government?type=gov"
                >
                  Подробнее
                </a>
              </div>
            </div>

            <div className="person-card">
              <img
                className="person-card__photo"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrm9qv4DwbeHFaIDG39k6DjPnAb8ue71tAJ6ZFX1j5WQbSLbibwC_XiG4x42Zy_dE97Fk&usqp=CAU"
                alt=""
                loading="lazy"
              />
              <div className="person-card__body">
                <div className="person-card__name">Хуурак Кумир Валерьевич</div>
                <div className="person-card__role">Помощник Председателя</div>
                <ul className="person-card__meta">
                  <li>+7 (959)123‑45‑67</li>
                  <li>lol@mail.ru</li>
                  <li>г. Кызыл, ул. Ленина, 40</li>
                </ul>
                <a className="btn btn--primary" href="#/government?type=gov">
                  Подробнее
                </a>
              </div>
            </div>

            <div className="person-card">
              <img
                className="person-card__photo"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrm9qv4DwbeHFaIDG39k6DjPnAb8ue71tAJ6ZFX1j5WQbSLbibwC_XiG4x42Zy_dE97Fk&usqp=CAU"
                alt=""
                loading="lazy"
              />
              <div className="person-card__body">
                <div className="person-card__name">
                  Ондар Айдын Сарыг-оолович
                </div>
                <div className="person-card__role">
                  Помощник заместителя Председателя
                </div>
                <ul className="person-card__meta">
                  <li>+7 (959)123‑45‑67</li>
                  <li>lol@mail.ru</li>
                  <li>г. Кызыл, ул. Ленина, 40</li>
                </ul>
                <a className="btn btn--primary" href="#/government?type=gov">
                  Подробнее
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
