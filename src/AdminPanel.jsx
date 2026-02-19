import React, { useMemo, useState } from "react";

/**
 * AdminPanel — админка для одобрения/удаления мастеров.
 * ВАЖНО: работает и без твоего lsSave — сохранение сделано через fallback в localStorage.
 *
 * Ожидает, что ctx содержит:
 *  - T, masters, setMasters, users, setUsers, showToast
 *
 * Опционально ctx может содержать:
 *  - storageKeys: { mastersKey: "твоя_мастер_ключ", usersKey: "твоя_юзер_ключ" }
 */
export default function AdminPanel({ ctx }) {
  const { T, masters, setMasters, users, setUsers, showToast } = ctx;

  const [q, setQ] = useState("");
  const [tab, setTab] = useState("pending"); // pending | approved | all

  const norm = (s) => (s || "").toString().trim().toLowerCase();

  // --- сохранение: если у тебя есть lsSave — используй, если нет — fallback ---
  const saveJSON = (key, value) => {
    try {
      if (typeof ctx?.lsSave === "function") {
        ctx.lsSave(key, value);
      } else {
        localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (_) {}
  };

  // --- ключи хранения: можно задать в ctx.storageKeys, иначе используем стандартные ---
  const mastersKey = ctx?.storageKeys?.mastersKey || "il_masters";
  const usersKey = ctx?.storageKeys?.usersKey || "il_users";

  const pendingCount = useMemo(
    () => (masters || []).filter((m) => m?.role === "master" && !m?.approved).length,
    [masters]
  );

  const filtered = useMemo(() => {
    return (masters || [])
      .filter((m) => m?.role === "master")
      .filter((m) => {
        if (tab === "pending") return !m?.approved;
        if (tab === "approved") return !!m?.approved;
        return true;
      })
      .filter((m) => {
        const query = norm(q);
        if (!query) return true;
        return (
          norm(m?.name).includes(query) ||
          norm(m?.email).includes(query) ||
          norm(m?.city).includes(query) ||
          norm(m?.district).includes(query)
        );
      })
      .sort((a, b) => Number(!!a?.approved) - Number(!!b?.approved)); // pending first
  }, [masters, q, tab]);

  const approveMaster = (id) => {
    const nextMasters = (masters || []).map((m) =>
      m?.id === id ? { ...m, approved: true } : m
    );
    const nextUsers = (users || []).map((u) =>
      u?.id === id ? { ...u, approved: true } : u
    );

    setMasters(nextMasters);
    setUsers(nextUsers);

    saveJSON(mastersKey, nextMasters);
    saveJSON(usersKey, nextUsers);

    showToast?.("Мастер одобрен ✅");
  };

  const rejectMaster = (id) => {
    const nextMasters = (masters || []).filter((m) => m?.id !== id);
    const nextUsers = (users || []).filter((u) => u?.id !== id);

    setMasters(nextMasters);
    setUsers(nextUsers);

    saveJSON(mastersKey, nextMasters);
    saveJSON(usersKey, nextUsers);

    showToast?.("Заявка удалена ⛔");
  };

  return (
    <div style={{ padding: 18, maxWidth: 980, margin: "0 auto" }}>
      <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 14 }}>
        <div style={{ fontFamily: T.fontTitle, fontSize: 20, color: T.tx, fontWeight: 800 }}>
          👑 Админ-панель
        </div>
        <div style={{ fontSize: 12, color: T.muted, marginLeft: "auto" }}>
          Ожидают одобрения: <b style={{ color: T.accent }}>{pendingCount}</b>
        </div>
      </div>

      <div
        style={{
          background: T.card,
          border: `1px solid ${T.bdr}`,
          borderRadius: T.cardRadius,
          padding: 12,
          display: "flex",
          gap: 10,
          alignItems: "center",
          marginBottom: 14,
          flexWrap: "wrap",
        }}
      >
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Поиск: имя, email, город, район…"
          style={{
            flex: 1,
            minWidth: 260,
            padding: "10px 12px",
            borderRadius: T.btnRadius,
            border: `1px solid ${T.bdr}`,
            background: T.bg2,
            color: T.tx,
            outline: "none",
          }}
        />

        {[
          ["pending", `Ожидают (${pendingCount})`],
          ["approved", "Одобрены"],
          ["all", "Все"],
        ].map(([id, label]) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            style={{
              padding: "10px 12px",
              borderRadius: T.btnRadius,
              border: `1px solid ${tab === id ? T.accent : T.bdr}`,
              background: tab === id ? T.accentPl : "transparent",
              color: tab === id ? T.accent : T.muted,
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            {label}
          </button>
        ))}
      </div>

      <div style={{ display: "grid", gap: 12 }}>
        {filtered.map((m) => (
          <div
            key={m.id}
            style={{
              background: T.card,
              border: `1px solid ${T.bdr}`,
              borderRadius: T.cardRadius,
              padding: 14,
            }}
          >
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 14,
                  background: m.color || T.accentPl,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 900,
                  color: "#fff",
                }}
              >
                {(m.avatar || "M").slice(0, 2)}
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 900, color: T.tx }}>
                  {m.name}{" "}
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 700,
                      color: m.approved ? "#13a463" : T.muted,
                    }}
                  >
                    {m.approved ? "• Одобрен" : "• Ожидает"}
                  </span>
                </div>
                <div style={{ fontSize: 12, color: T.muted, marginTop: 2 }}>
                  {m.email} • {m.city}
                  {m.district ? `, ${m.district}` : ""} • {m.phone || ""}
                </div>
                <div style={{ fontSize: 12, color: T.muted, marginTop: 6 }}>
                  Категория: <b style={{ color: T.tx }}>{m.category}</b> • Услуги:{" "}
                  <b style={{ color: T.tx }}>{(m.services || []).join(", ")}</b>
                </div>
              </div>

              <div style={{ display: "flex", gap: 8 }}>
                {!m.approved && (
                  <button
                    onClick={() => approveMaster(m.id)}
                    style={{
                      padding: "10px 12px",
                      borderRadius: T.btnRadius,
                      border: "none",
                      background: T.btnGrad,
                      color: "#fff",
                      fontWeight: 900,
                      cursor: "pointer",
                    }}
                  >
                    ✅ Одобрить
                  </button>
                )}
                <button
                  onClick={() => rejectMaster(m.id)}
                  style={{
                    padding: "10px 12px",
                    borderRadius: T.btnRadius,
                    border: `1px solid ${T.bdr}`,
                    background: "transparent",
                    color: T.muted,
                    fontWeight: 900,
                    cursor: "pointer",
                  }}
                >
                  ⛔ Удалить
                </button>
              </div>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div style={{ padding: 18, textAlign: "center", color: T.muted }}>
            Ничего не найдено
          </div>
        )}
      </div>
    </div>
  );
}
