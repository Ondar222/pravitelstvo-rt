import React from "react";
import { useData } from "../context/DataContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import {
  Tabs,
  Button,
  Space,
  Input,
  Upload,
  message,
  Typography,
  Divider,
  Alert,
  Popconfirm,
  Tabs as AntTabs,
  Pagination,
} from "antd";
import { PersonsApi } from "../api/client.js";
import SideNav from "../components/SideNav.jsx";
import { useHashRoute } from "../Router.jsx";

const { TextArea } = Input;
const { Title, Paragraph } = Typography;

function downloadJson(filename, dataObj) {
  try {
    const blob = new Blob([JSON.stringify(dataObj, null, 2)], {
      type: "application/json;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  } catch (e) {
    console.warn("Download error", e);
  }
}

function JsonEditor({ title, filename, initial }) {
  const [text, setText] = React.useState(() =>
    JSON.stringify(initial || [], null, 2)
  );
  const [valid, setValid] = React.useState(true);

  React.useEffect(() => {
    setText(JSON.stringify(initial || [], null, 2));
  }, [initial]);

  const handleValidate = (value) => {
    try {
      JSON.parse(value);
      setValid(true);
    } catch {
      setValid(false);
    }
  };

  const handleExport = () => {
    try {
      const parsed = JSON.parse(text || "[]");
      downloadJson(filename, parsed);
      message.success("Файл экспортирован: " + filename);
    } catch (e) {
      message.error("Исправьте JSON перед экспортом");
    }
  };

  const beforeUpload = async (file) => {
    try {
      const content = await file.text();
      JSON.parse(content);
      setText(content);
      setValid(true);
      message.success("Загружен " + file.name);
    } catch {
      message.error("Некорректный JSON в файле");
    }
    return false; // prevent auto-upload
  };

  return (
    <div className="card" style={{ padding: 16 }}>
      <Space direction="vertical" size="middle" style={{ width: "100%" }}>
        <Title level={4} style={{ margin: 0 }}>
          {title}
        </Title>
        <Paragraph type="secondary" style={{ marginTop: -8 }}>
          Импортируйте JSON или редактируйте ниже. Экспорт сохранит файл{" "}
          {filename}.
        </Paragraph>
        <Space wrap>
          <Upload
            accept=".json,application/json"
            maxCount={1}
            beforeUpload={beforeUpload}
            showUploadList={false}
          >
            <Button>Импорт JSON</Button>
          </Upload>
          <Button type="primary" onClick={handleExport} disabled={!valid}>
            Экспорт JSON
          </Button>
        </Space>
        {!valid && (
          <Alert
            type="error"
            message="JSON синтаксис некорректен. Исправьте текст."
          />
        )}
        <TextArea
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            handleValidate(e.target.value);
          }}
          spellCheck={false}
          autoSize={{ minRows: 16, maxRows: 28 }}
          style={{
            fontFamily:
              "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
          }}
        />
      </Space>
    </div>
  );
}

export default function Admin() {
  const data = useData();
  const { isAuthenticated, login } = useAuth();
  const { route } = useHashRoute();
  const base = (route || "/").split("?")[0];
  const sub = base.replace(/^\/admin\/?/, "") || "dashboard";
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const deleteItem = React.useCallback(
    (collection, id) => {
      const setter =
        {
          news: data.setNews,
          deputies: data.setDeputies,
          documents: data.setDocuments,
          achievements: data.setAchievements,
        }[collection] || null;
      if (!setter) return;
      const arr = Array.isArray(data[collection]) ? data[collection] : [];
      setter(arr.filter((x) => x && (x.id || x._id) !== id));
    },
    [data]
  );

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login({ email, password });
      message.success("Вход выполнен");
    } catch (err) {
      message.error((err && err.message) || "Ошибка входа");
    } finally {
      setLoading(false);
    }
  };

  const adminLinks = React.useMemo(
    () => [
      { label: "Панель", href: "#/admin" },
      { label: "Новости", href: "#/admin/news" },
      { label: "Депутаты", href: "#/admin/deputies" },
      { label: "Документы", href: "#/admin/documents" },
      { label: "Достопримечательности", href: "#/admin/achievements" },
    ],
    []
  );

  return (
    <section className="section">
      <div className="container">
        <Title level={2} style={{ marginBottom: 8 }}>
          Администрирование
        </Title>
        <Paragraph type="secondary" style={{ marginBottom: 16 }}>
          Редактируйте данные сайта, импортируйте и экспортируйте JSON файлы.
        </Paragraph>

        <div className="page-grid">
          <div>
            <div className="card" style={{ padding: 16, marginBottom: 16 }}>
              <Title level={4} style={{ marginTop: 0 }}>
                Авторизация API
              </Title>
              <Paragraph type="secondary">
                Опционально. Если у вас есть доступ к API, выполните вход для
                операций, требующих авторизации.
              </Paragraph>
              <form
                onSubmit={handleLogin}
                style={{ display: "grid", gap: 12, maxWidth: 420 }}
              >
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input.Password
                  placeholder="Пароль"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button type="primary" htmlType="submit" loading={loading}>
                  Войти
                </Button>
              </form>
              {isAuthenticated ? (
                <Paragraph style={{ marginTop: 8, color: "#059669" }}>
                  Статус: авторизовано
                </Paragraph>
              ) : (
                <Paragraph style={{ marginTop: 8, color: "#9ca3af" }}>
                  Статус: не авторизовано
                </Paragraph>
              )}
            </div>

            {sub === "dashboard" && (
              <>
                <Divider />
                <CreateForms />
              </>
            )}

            {sub === "news" && (
              <AdminSectionView
                title="Новости"
                filename="news.json"
                items={data.news || []}
                onDelete={(id) => deleteItem("news", id)}
                renderRow={(n) => (
                  <span>
                    {n.title} {n.image ? "• [фото]" : ""}
                  </span>
                )}
              />
            )}
            {sub === "deputies" && (
              <AdminSectionView
                title="Депутаты"
                filename="deputies.json"
                items={data.deputies || []}
                onDelete={(id) => deleteItem("deputies", id)}
                renderRow={(d) => (
                  <span>
                    {d.name} {d.photo ? "• [фото]" : ""}
                  </span>
                )}
              />
            )}
            {sub === "documents" && (
              <AdminSectionView
                title="Документы"
                filename="documents.json"
                items={data.documents || []}
                onDelete={(id) => deleteItem("documents", id)}
                renderRow={(doc) => <span>{doc.title}</span>}
              />
            )}
            {sub === "achievements" && (
              <AdminSectionView
                title="Достопримечательности"
                filename="achievements.json"
                items={data.achievements || []}
                onDelete={(id) => deleteItem("achievements", id)}
                renderRow={(a) => (
                  <span>
                    {a.title} {a.images?.length ? "• [фото]" : ""}
                  </span>
                )}
              />
            )}
          </div>

          <SideNav title="Меню админки" links={adminLinks} />
        </div>
      </div>
    </section>
  );
}

function CreateForms() {
  const data = useData();
  const { isAuthenticated } = useAuth();
  const [depForm, setDepForm] = React.useState({
    name: "",
    district: "",
    faction: "",
    convocation: "",
    phone: "",
    email: "",
    reception: "",
    photoFile: null,
    photoUrl: "",
  });
  const [newsForm, setNewsForm] = React.useState({
    title: "",
    category: "",
    date: new Date().toISOString().slice(0, 10),
    excerpt: "",
    imageFile: null,
    imageUrl: "",
  });
  const [achForm, setAchForm] = React.useState({
    title: "",
    imageFile: null,
    imageUrl: "",
  });
  const [submitting, setSubmitting] = React.useState(false);

  const handleDepPhoto = async (file) => {
    setDepForm((f) => ({
      ...f,
      photoFile: file,
      photoUrl: URL.createObjectURL(file),
    }));
    message.success("Фото выбрано: " + file.name);
    return false;
  };
  const handleNewsImage = async (file) => {
    setNewsForm((f) => ({
      ...f,
      imageFile: file,
      imageUrl: URL.createObjectURL(file),
    }));
    message.success("Изображение выбрано: " + file.name);
    return false;
  };
  const handleAchImage = async (file) => {
    setAchForm((f) => ({
      ...f,
      imageFile: file,
      imageUrl: URL.createObjectURL(file),
    }));
    message.success("Изображение выбрано: " + file.name);
    return false;
  };

  const createDeputy = async () => {
    if (!depForm.name) {
      message.error("Укажите ФИО");
      return;
    }
    setSubmitting(true);
    try {
      let createdId = null;
      const apiBase = import.meta?.env?.VITE_API_BASE_URL || "";
      if (apiBase && isAuthenticated) {
        const payload = {
          fullName: depForm.name,
          electoralDistrict: depForm.district,
          faction: depForm.faction,
          convocation: depForm.convocation,
          phoneNumber: depForm.phone,
          email: depForm.email,
          receptionSchedule: depForm.reception,
        };
        const created = await PersonsApi.create(payload);
        createdId = created?.id || null;
        if (createdId && depForm.photoFile) {
          await PersonsApi.uploadMedia(createdId, depForm.photoFile);
        }
      }
      const local = {
        id:
          createdId ||
          Math.random().toString(36).slice(2) + Date.now().toString(36),
        name: depForm.name,
        district: depForm.district,
        faction: depForm.faction,
        convocation: depForm.convocation,
        reception: depForm.reception,
        photo: createdId ? "" : depForm.photoUrl || "",
        contacts: { phone: depForm.phone, email: depForm.email },
      };
      data.setDeputies([...(data.deputies || []), local]);
      message.success("Депутат создан");
      setDepForm({
        name: "",
        district: "",
        faction: "",
        convocation: "",
        phone: "",
        email: "",
        reception: "",
        photoFile: null,
        photoUrl: "",
      });
    } catch (e) {
      message.error(e?.message || "Ошибка создания");
    } finally {
      setSubmitting(false);
    }
  };

  const createNews = async () => {
    if (!newsForm.title) {
      message.error("Заголовок обязателен");
      return;
    }
    const item = {
      id: Math.random().toString(36).slice(2),
      title: newsForm.title,
      category: newsForm.category || "Новости",
      date: newsForm.date,
      excerpt: newsForm.excerpt,
      content: [],
      image: newsForm.imageUrl || "",
    };
    data.setNews([...(data.news || []), item]);
    message.success("Новость добавлена");
    setNewsForm({
      title: "",
      category: "",
      date: new Date().toISOString().slice(0, 10),
      excerpt: "",
      imageFile: null,
      imageUrl: "",
    });
  };

  const createAchievement = async () => {
    if (!achForm.title || !achForm.imageUrl) {
      message.error("Укажите название и изображение");
      return;
    }
    const item = {
      id: Math.random().toString(36).slice(2),
      title: achForm.title,
      images: [achForm.imageUrl],
    };
    data.setAchievements([...(data.achievements || []), item]);
    message.success("Достопримечательность создана");
    setAchForm({ title: "", imageFile: null, imageUrl: "" });
  };

  const deleteById = (collection, id) => {
    const setter =
      {
        news: data.setNews,
        deputies: data.setDeputies,
        documents: data.setDocuments,
        achievements: data.setAchievements,
      }[collection] || null;
    if (!setter) return;
    const arr = Array.isArray(data[collection]) ? data[collection] : [];
    setter(arr.filter((x) => x && (x.id || x._id) !== id));
  };

  return (
    <div className="grid" style={{ marginBottom: 20 }}>
      <div className="card" style={{ padding: 16 }}>
        <Typography.Title level={4} style={{ marginTop: 0 }}>
          Создать депутата
        </Typography.Title>
        <Space direction="vertical" size="middle" style={{ width: "100%" }}>
          <Input
            value={depForm.name}
            onChange={(e) =>
              setDepForm((f) => ({ ...f, name: e.target.value }))
            }
            placeholder="ФИО"
          />
          <Input
            value={depForm.district}
            onChange={(e) =>
              setDepForm((f) => ({ ...f, district: e.target.value }))
            }
            placeholder="Округ"
          />
          <Input
            value={depForm.faction}
            onChange={(e) =>
              setDepForm((f) => ({ ...f, faction: e.target.value }))
            }
            placeholder="Фракция"
          />
          <Input
            value={depForm.convocation}
            onChange={(e) =>
              setDepForm((f) => ({ ...f, convocation: e.target.value }))
            }
            placeholder="Созыв"
          />
          <Input
            value={depForm.reception}
            onChange={(e) =>
              setDepForm((f) => ({ ...f, reception: e.target.value }))
            }
            placeholder="Приём граждан"
          />
          <Space wrap>
            <Input
              value={depForm.phone}
              onChange={(e) =>
                setDepForm((f) => ({ ...f, phone: e.target.value }))
              }
              placeholder="Телефон"
              style={{ minWidth: 220 }}
            />
            <Input
              value={depForm.email}
              onChange={(e) =>
                setDepForm((f) => ({ ...f, email: e.target.value }))
              }
              placeholder="Email"
              style={{ minWidth: 220 }}
            />
          </Space>
          <Upload
            accept="image/*"
            maxCount={1}
            beforeUpload={handleDepPhoto}
            showUploadList={!!depForm.photoFile}
          >
            <Button>Фото (опционально)</Button>
          </Upload>
          {depForm.photoUrl ? (
            <img
              src={depForm.photoUrl}
              alt=""
              style={{
                width: 96,
                height: 96,
                borderRadius: 12,
                objectFit: "cover",
              }}
            />
          ) : null}
          {!isAuthenticated && (
            <Typography.Paragraph type="secondary">
              Подсказка: без авторизации запись будет создана только локально,
              для предпросмотра.
            </Typography.Paragraph>
          )}
          <Button type="primary" onClick={createDeputy} loading={submitting}>
            Создать депутата
          </Button>
        </Space>
      </div>

      <div className="card" style={{ padding: 16 }}>
        <Typography.Title level={4} style={{ marginTop: 0 }}>
          Создать новость
        </Typography.Title>
        <Space direction="vertical" size="middle" style={{ width: "100%" }}>
          <Input
            value={newsForm.title}
            onChange={(e) =>
              setNewsForm((f) => ({ ...f, title: e.target.value }))
            }
            placeholder="Заголовок"
          />
          <Space wrap>
            <Input
              value={newsForm.category}
              onChange={(e) =>
                setNewsForm((f) => ({ ...f, category: e.target.value }))
              }
              placeholder="Категория"
              style={{ minWidth: 220 }}
            />
            <Input
              type="date"
              value={newsForm.date}
              onChange={(e) =>
                setNewsForm((f) => ({ ...f, date: e.target.value }))
              }
              style={{ minWidth: 180 }}
            />
          </Space>
          <Input.TextArea
            value={newsForm.excerpt}
            onChange={(e) =>
              setNewsForm((f) => ({ ...f, excerpt: e.target.value }))
            }
            placeholder="Краткое описание"
            autoSize={{ minRows: 4, maxRows: 8 }}
          />
          <Upload
            accept="image/*"
            maxCount={1}
            beforeUpload={handleNewsImage}
            showUploadList={!!newsForm.imageFile}
          >
            <Button>Изображение</Button>
          </Upload>
          {newsForm.imageUrl ? (
            <img
              src={newsForm.imageUrl}
              alt=""
              style={{
                width: 160,
                height: 100,
                borderRadius: 8,
                objectFit: "cover",
              }}
            />
          ) : null}
          <Button type="primary" onClick={createNews}>
            Создать новость
          </Button>
        </Space>
      </div>

      <div className="card" style={{ padding: 16 }}>
        <Typography.Title level={4} style={{ marginTop: 0 }}>
          Создать достопримечательность
        </Typography.Title>
        <Space direction="vertical" size="middle" style={{ width: "100%" }}>
          <Input
            value={achForm.title}
            onChange={(e) =>
              setAchForm((f) => ({ ...f, title: e.target.value }))
            }
            placeholder="Название"
          />
          <Upload
            accept="image/*"
            maxCount={1}
            beforeUpload={handleAchImage}
            showUploadList={!!achForm.imageFile}
          >
            <Button>Изображение</Button>
          </Upload>
          <Button type="primary" onClick={createAchievement}>
            Создать
          </Button>
        </Space>
      </div>
    </div>
  );
}

function AdminSectionView({ title, filename, items, renderRow, onDelete }) {
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);
  const total = items.length;
  const start = (page - 1) * pageSize;
  const paged = items.slice(start, start + pageSize);
  return (
    <div className="grid" style={{ marginBottom: 20 }}>
      <JsonEditor title={title} filename={filename} initial={items} />
      <div className="card" style={{ padding: 16 }}>
        <Typography.Title level={4} style={{ marginTop: 0 }}>
          Текущие записи
        </Typography.Title>
        <Divider />
        <Space direction="vertical" style={{ width: "100%" }}>
          {paged.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 12,
              }}
            >
              {renderRow(item)}
              <Popconfirm
                title="Удалить запись?"
                okText="Да"
                cancelText="Нет"
                onConfirm={() => onDelete(item.id)}
              >
                <Button danger>Удалить</Button>
              </Popconfirm>
            </div>
          ))}
          {total === 0 && (
            <Typography.Paragraph type="secondary">
              Нет записей
            </Typography.Paragraph>
          )}
        </Space>
        <div
          style={{ display: "flex", justifyContent: "flex-end", marginTop: 16 }}
        >
          <Pagination
            current={page}
            pageSize={pageSize}
            total={total}
            showSizeChanger
            pageSizeOptions={["5", "10", "20", "50"]}
            onChange={(p, ps) => {
              setPage(p);
              setPageSize(ps);
            }}
          />
        </div>
      </div>
    </div>
  );
}
