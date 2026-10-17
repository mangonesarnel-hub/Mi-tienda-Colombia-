const productos = [
  { id: 1, nombre: "Café de Colombia 500 g", categoria: "Alimentos", precio: 28000, imagen: "☕" },
  { id: 2, nombre: "Arequipe artesanal", categoria: "Alimentos", precio: 9500, imagen: "🍯" },
  { id: 3, nombre: "Panela orgánica 1 kg", categoria: "Alimentos", precio: 7200, imagen: "🟤" },
  { id: 4, nombre: "Sombrero vueltiao", categoria: "Artesanías", precio: 85000, imagen: "👒" },
  { id: 5, nombre: "Mochila arhuaca", categoria: "Artesanías", precio: 120000, imagen: "🎒" },
  { id: 6, nombre: "Hamaca de San Jacinto", categoria: "Artesanías", precio: 95000, imagen: "🛏️" },
  { id: 7, nombre: "Camiseta Selección", categoria: "Ropa", precio: 99900, imagen: "👕" },
  { id: 8, nombre: "Ruana de lana", categoria: "Ropa", precio: 110000, imagen: "🧥" },
  { id: 9, nombre: "Audífonos Bluetooth", categoria: "Tecnología", precio: 65000, imagen: "🎧" },
  { id: 10, nombre: "Cargador rápido USB-C", categoria: "Tecnología", precio: 35000, imagen: "🔌" },
  { id: 11, nombre: "Balón de fútbol", categoria: "Deportes", precio: 55000, imagen: "⚽" },
  { id: 12, nombre: "Tenis deportivos", categoria: "Deportes", precio: 150000, imagen: "👟" }
];

const categorias = ["Todos", ...new Set(productos.map(p => p.categoria))];
let categoriaActiva = "Todos";
let textoBusqueda = "";

const formatoCOP = new Intl.NumberFormat("es-CO", {
  style: "currency", currency: "COP", maximumFractionDigits: 0
});

const normalizar = t => t.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

function dibujarCategorias() {
  const nav = document.getElementById("categorias");
  nav.innerHTML = "";
  categorias.forEach(cat => {
    const b = document.createElement("button");
    b.className = "chip" + (cat === categoriaActiva ? " activa" : "");
    b.textContent = cat;
    b.onclick = () => { categoriaActiva = cat; dibujarCategorias(); dibujarCatalogo(); };
    nav.appendChild(b);
  });
}

function dibujarCatalogo() {
  const lista = productos.filter(p =>
    (categoriaActiva === "Todos" || p.categoria === categoriaActiva) &&
    normalizar(p.nombre).includes(normalizar(textoBusqueda))
  );
  document.getElementById("contador").textContent = lista.length + " producto(s)";
  const cont = document.getElementById("catalogo");
  if (lista.length === 0) {
    cont.innerHTML = '<p class="vacio">No encontramos productos 😕</p>';
    return;
  }
  cont.innerHTML = lista.map(p => `
    <article class="tarjeta">
      <div class="imagen">${p.imagen}</div>
      <div class="info">
        <div class="nombre">${p.nombre}</div>
        <div class="categoria">${p.categoria}</div>
        <div class="precio">${formatoCOP.format(p.precio)}</div>
      </div>
    </article>`).join("");
}

document.getElementById("buscador").addEventListener("input", e => {
  textoBusqueda = e.target.value;
  dibujarCatalogo();
});

dibujarCategorias();
dibujarCatalogo();

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js");
}
