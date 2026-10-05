const campos = [
  "tecido",
  "aviamentos",
  "salarios",
  "energia",
  "agua",
  "aluguel",
  "manutencao",
  "embalagens",
  "transporte",
  "outros",
];
function renderProdutos() {
  const termo = (document.getElementById("buscador").value || "").toLowerCase();
  const lista = document.getElementById("listaProdutos");
  const ps = userData(getDB().products).filter((p) =>
    p.nome.toLowerCase().includes(termo),
  );
  if (!ps.length) {
    lista.innerHTML =
      '<div class="empty">Nenhum produto cadastrado.<br><br><a class="button primary" href="produto.html">Cadastrar primeiro produto</a></div>';
    return;
  }
  lista.innerHTML = ps
    .map(
      (p) =>
        `<article class="product"><a href="produto.html?id=${encodeURIComponent(p.id)}">${p.imagem ? `<img src="${p.imagem}" alt="${esc(p.nome)}">` : '<div class="product-placeholder">Sem imagem</div>'}<div class="product-body"><h3>${esc(p.nome)}</h3><p>${p.quantidade} peças · ${money(p.custoUnitario)} por peça</p><p>Tamanhos: ${esc((p.tamanhos || []).join(", ") || "não informados")}</p></div></a><div class="product-body"><button class="button danger" onclick="event.preventDefault();excluirProduto('${p.id}')">Excluir</button></div></article>`,
    )
    .join("");
}
function novoProduto() {
  location.href = "produto.html";
}
function excluirProduto(id) {
  if (!confirm("Excluir este produto?")) return;
  const db = getDB();
  db.products = db.products.filter((p) => p.id !== id);
  saveDB(db);
  renderProdutos();
}
function exportarJSON() {
  const data = {
    version: 1,
    exportedAt: new Date().toISOString(),
    products: userData(getDB().products),
    faccoes: userData(getDB().faccoes),
    acabamentos: userData(getDB().acabamentos),
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "easytextil-backup.json";
  a.click();
  URL.revokeObjectURL(a.href);
}
document.getElementById("buscador")?.addEventListener("input", renderProdutos);
document.getElementById("arquivoJSON")?.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const r = new FileReader();
  r.onload = () => {
    try {
      const data = JSON.parse(r.result);
      const db = getDB(),
        uidu = currentUser().id;
      for (const p of data.products || [])
        db.products.push({ ...p, id: uid(), userId: uidu });
      for (const f of data.faccoes || [])
        db.faccoes.push({ ...f, id: uid(), userId: uidu });
      for (const a of data.acabamentos || [])
        db.acabamentos.push({ ...a, id: uid(), userId: uidu });
      saveDB(db);
      renderProdutos();
      alert("Backup importado.");
    } catch {
      alert("Arquivo JSON inválido.");
    }
  };
  r.readAsText(file);
});
renderProdutos();
