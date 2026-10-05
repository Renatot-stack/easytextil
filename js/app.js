const DB_KEY = "easytextil_db_v1";
const SESSION_KEY = "easytextil_session_v1";
const emptyDB = () => ({
  users: [],
  products: [],
  faccoes: [],
  acabamentos: [],
});
function getDB() {
  try {
    return JSON.parse(localStorage.getItem(DB_KEY)) || emptyDB();
  } catch {
    return emptyDB();
  }
}
function saveDB(db) {
  localStorage.setItem(DB_KEY, JSON.stringify(db));
}
function currentUser() {
  const id = localStorage.getItem(SESSION_KEY);
  return getDB().users.find((u) => u.id === id) || null;
}
function requireAuth() {
  if (
    !currentUser() &&
    !location.pathname.endsWith("login.html") &&
    !location.pathname.endsWith("cadastro.html")
  )
    location.href = "login.html";
}
function logout() {
  localStorage.removeItem(SESSION_KEY);
  location.href = "login.html";
}
function uid() {
  return crypto.randomUUID
    ? crypto.randomUUID()
    : Date.now().toString(36) + Math.random().toString(36).slice(2);
}
function userData(list) {
  const u = currentUser();
  return list.filter((x) => x.userId === u?.id);
}
function money(v) {
  return Number(v || 0).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
function esc(s) {
  return String(s ?? "").replace(
    /[&<>"']/g,
    (c) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      })[c],
  );
}
function seededUserData() {
  return getDB();
}
requireAuth();
