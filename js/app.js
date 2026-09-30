// Логика интерфейса: корзина-счётчик, фильтры, карточка товара, формы
const fmt = n => n.toLocaleString("ru-RU") + " ₽";
const toastEl = document.getElementById("appToast");
function showToast(text) {
  document.getElementById("toastText").textContent = text;
  bootstrap.Toast.getOrCreateInstance(toastEl, { delay: 2500 }).show();
}

// Корзина (счётчик хранится в localStorage)
const cartBadge = document.getElementById("cartCount");
let cart = Number(localStorage.getItem("cart") || 0);
cartBadge.textContent = cart;
document.addEventListener("click", e => {
  const b = e.target.closest(".js-add");
  if (!b) return;
  cart++; localStorage.setItem("cart", cart); cartBadge.textContent = cart;
  showToast("«" + b.dataset.name + "» добавлен в корзину");
});

// Каталог: фильтр, поиск, пагинация
const grid = document.getElementById("grid");
if (grid) {
  const cols = [...grid.querySelectorAll(".product-col")];
  const pager = document.getElementById("pagination");
  const PER = 6; let cat = "all", q = "", page = 1;
  function render() {
    const list = cols.filter(c => (cat === "all" || c.dataset.cat === cat) && c.dataset.name.toLowerCase().includes(q));
    const pages = Math.max(1, Math.ceil(list.length / PER));
    if (page > pages) page = pages;
    cols.forEach(c => c.classList.add("d-none"));
    list.slice((page - 1) * PER, page * PER).forEach(c => c.classList.remove("d-none"));
    document.getElementById("empty").classList.toggle("d-none", list.length > 0);
    pager.innerHTML = "";
    for (let i = 1; i <= pages; i++)
      pager.insertAdjacentHTML("beforeend", `<li class="page-item ${i === page ? "active" : ""}"><button class="page-link" data-p="${i}">${i}</button></li>`);
  }
  document.querySelectorAll(".js-filter").forEach(b => b.addEventListener("click", () => {
    document.querySelectorAll(".js-filter").forEach(x => x.classList.remove("active"));
    b.classList.add("active"); cat = b.dataset.cat; page = 1; render();
  }));
  document.getElementById("search").addEventListener("input", e => { q = e.target.value.trim().toLowerCase(); page = 1; render(); });
  pager.addEventListener("click", e => { const p = e.target.dataset.p; if (p) { page = Number(p); render(); } });
  render();
}

// Страница товара: данные по ?id=
const pName = document.getElementById("p-name");
if (pName) {
  const id = Number(new URLSearchParams(location.search).get("id")) || 1;
  const p = PRODUCTS.find(x => x.id === id) || PRODUCTS[0];
  document.title = p.name + " — ТехНест";
  pName.textContent = p.name;
  document.getElementById("crumb").textContent = p.name;
  document.getElementById("p-desc").textContent = p.desc;
  document.getElementById("p-price").textContent = fmt(p.price);
  document.getElementById("p-cat").textContent = p.cat;
  document.getElementById("p-img").src = "images/p" + p.id + ".svg";
  document.getElementById("p-img").alt = p.name;
  document.getElementById("p-order").href = "order.html?product=" + p.id;
  document.getElementById("p-add").dataset.name = p.name;
  const bd = document.getElementById("p-badge");
  if (p.badge) { bd.textContent = p.badge; bd.className = "badge mb-2 " + ({ "Хит": "text-bg-danger", "Новинка": "text-bg-success", "Скидка": "text-bg-warning" }[p.badge]); }
  else bd.classList.add("d-none");
}

// Форма заказа: подстановка товара из ?product=
const sel = document.getElementById("product");
if (sel) { const v = new URLSearchParams(location.search).get("product"); if (v) sel.value = v; }

// Валидация и отправка форм (заказ и модальное окно)
document.querySelectorAll("form.needs-validation").forEach(form => form.addEventListener("submit", e => {
  e.preventDefault();
  if (!form.checkValidity()) { e.stopPropagation(); form.classList.add("was-validated"); return; }
  const name = form.elements.name.value;
  form.reset(); form.classList.remove("was-validated");
  if (form.dataset.modal) bootstrap.Modal.getInstance(document.getElementById(form.dataset.modal)).hide();
  const box = document.getElementById("orderAlert");
  if (box && form.id === "orderForm") {
    box.innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert">Спасибо, ${name}! Заявка принята, менеджер свяжется с вами.<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Закрыть"></button></div>`;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  showToast("Заявка отправлена");
}));
