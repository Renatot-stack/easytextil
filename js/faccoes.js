function renderFaccoes() {
  const el = document.getElementById("listaFaccoes"),
    items = userData(getDB().faccoes);
  el.innerHTML = items.length
    ? items
        .map(
          (f) =>
            `<div class="list-item"><div><b>${esc(f.nome)}</b><div class="muted">Salário total: ${money(f.salario)}</div></div><button class="button danger" onclick="removerFaccao('${f.id}')">Excluir</button></div>`,
        )
        .join("")
    : '<div class="empty">Nenhuma facção cadastrada.</div>';
}
function removerFaccao(id) {
  const db = getDB();
  db.faccoes = db.faccoes.filter((x) => x.id !== id);
  saveDB(db);
  renderFaccoes();
}
document.getElementById("faccaoForm").onsubmit = (e) => {
  e.preventDefault();
  const db = getDB();
  db.faccoes.push({
    id: uid(),
    userId: currentUser().id,
    nome: document.getElementById("faccaoNome").value.trim(),
    salario: Number(document.getElementById("faccaoSalario").value),
  });
  saveDB(db);
  e.target.reset();
  renderFaccoes();
};
renderFaccoes();
