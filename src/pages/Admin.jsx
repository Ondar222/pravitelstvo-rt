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
} from "antd";
import { PersonsApi } from "../api/client.js";

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
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);

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

  return (
    <section className="section">
      <div className="container">
        <Title level={2} style={{ marginBottom: 8 }}>
          Администрирование
        </Title>
        <Paragraph type="secondary" style={{ marginBottom: 16 }}>
          Здесь вы можете редактировать данные сайта в формате JSON:
          импортировать, изменять и экспортировать файлы для последующей
          публикации.
        </Paragraph>

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

        <Divider />

        <CreateForms />

        <Tabs
          defaultActiveKey="news"
          items={[
            {
              key: "news",
              label: "Новости (news.json)",
              children: (
                <JsonEditor
                  title="Новости"
                  filename="news.json"
                  initial={data.news}
                />
              ),
            },
            {
              key: "deputies",
              label: "Депутаты (deputies.json)",
              children: (
                <JsonEditor
                  title="Депутаты"
                  filename="deputies.json"
                  initial={data.deputies}
                />
              ),
            },
            {
              key: "documents",
              label: "Документы (documents.json)",
              children: (
                <JsonEditor
                  title="Документы"
                  filename="documents.json"
                  initial={data.documents}
                />
              ),
            },
          ]}
        />
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

      <div className="card" style={{ padding: 16 }}>
        <Typography.Title level={4} style={{ marginTop: 0 }}>
          Текущие записи
        </Typography.Title>
        <Divider />
        <Typography.Title level={5}>Новости</Typography.Title>
        <Space direction="vertical" style={{ width: "100%" }}>
          {(data.news || []).map((n) => (
            <div
              key={n.id}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 12,
              }}
            >
              <span>
                {n.title} {n.image ? "• [фото]" : ""}
              </span>
              <Popconfirm
                title="Удалить новость?"
                okText="Да"
                cancelText="Нет"
                onConfirm={() => deleteById("news", n.id)}
              >
                <Button danger>Удалить</Button>
              </Popconfirm>
            </div>
          ))}
        </Space>
        <Divider />
        <Typography.Title level={5}>Депутаты</Typography.Title>
        <Space direction="vertical" style={{ width: "100%" }}>
          {(data.deputies || []).map((d) => (
            <div
              key={d.id}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 12,
              }}
            >
              <span>
                {d.name} {d.photo ? "• [фото]" : ""}
              </span>
              <Popconfirm
                title="Удалить депутата?"
                okText="Да"
                cancelText="Нет"
                onConfirm={() => deleteById("deputies", d.id)}
              >
                <Button danger>Удалить</Button>
              </Popconfirm>
            </div>
          ))}
        </Space>
        <Divider />
        <Typography.Title level={5}>Документы</Typography.Title>
        <Space direction="vertical" style={{ width: "100%" }}>
          {(data.documents || []).map((doc) => (
            <div
              key={doc.id}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 12,
              }}
            >
              <span>{doc.title}</span>
              <Popconfirm
                title="Удалить документ?"
                okText="Да"
                cancelText="Нет"
                onConfirm={() => deleteById("documents", doc.id)}
              >
                <Button danger>Удалить</Button>
              </Popconfirm>
            </div>
          ))}
        </Space>
        <Divider />
        <Typography.Title level={5}>Достопримечательности</Typography.Title>
        <Space direction="vertical" style={{ width: "100%" }}>
          {(data.achievements || []).map((a) => (
            <div
              key={a.id}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 12,
              }}
            >
              <span>
                {a.title} {a.images?.length ? "• [фото]" : ""}
              </span>
              <Popconfirm
                title="Удалить запись?"
                okText="Да"
                cancelText="Нет"
                onConfirm={() => deleteById("achievements", a.id)}
              >
                <Button danger>Удалить</Button>
              </Popconfirm>
            </div>
          ))}
        </Space>
      </div>
    </div>
  );
}
