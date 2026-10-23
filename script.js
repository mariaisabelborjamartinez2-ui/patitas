document.addEventListener("DOMContentLoaded", () => {
  // MENÚ HAMBURGUESA
  const hamburguesa = document.getElementById("hamburguesa");
  const enlaces = document.getElementById("enlaces");

  hamburguesa.addEventListener("click", () => {
    const abierto = enlaces.classList.toggle("abierto");

    hamburguesa.setAttribute("aria-expanded", abierto);
    hamburguesa.setAttribute(
      "aria-label",
      abierto ? "Cerrar menú de navegación" : "Abrir menú de navegación"
    );
  });

  // CERRAR MENÚ AL SELECCIONAR UN ENLACE
  enlaces.querySelectorAll("a").forEach((enlace) => {
    enlace.addEventListener("click", () => {
      enlaces.classList.remove("abierto");
      hamburguesa.setAttribute("aria-expanded", "false");
      hamburguesa.setAttribute("aria-label", "Abrir menú de navegación");
    });
  });

  // FILTRAR PRODUCTOS POR CATEGORÍA
  const filtros = document.querySelectorAll(".filtro");
  const productos = document.querySelectorAll(".producto");

  filtros.forEach((filtro) => {
    filtro.addEventListener("click", () => {
      const categoria = filtro.dataset.categoria;

      filtros.forEach((boton) => {
        boton.classList.remove("activo");
      });

      filtro.classList.add("activo");

      productos.forEach((producto) => {
        const coincide =
          categoria === "todos" ||
          producto.dataset.categoria === categoria;

        producto.hidden = !coincide;
      });
    });
  });

  // PEDIDOS POR WHATSAPP
  const telefono = "573126020219";

  document.querySelectorAll(".boton-pedir").forEach((boton) => {
    boton.addEventListener("click", () => {
      const producto = boton.dataset.producto;
      const precio = Number(boton.dataset.precio);

      const precioCOP = precio.toLocaleString("es-CO", {
        style: "currency",
        currency: "COP",
        maximumFractionDigits: 0
      });

      const mensaje =
        `Hola, Bella Napoli. 🍕\n` +
        `Quiero pedir: ${producto}.\n` +
        `Precio publicado: ${precioCOP}.\n` +
        `Por favor, confirmen disponibilidad y el valor total de mi pedido.`;

      const url =
        `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;

      window.open(url, "_blank", "noopener,noreferrer");
    });
  });

  // BOTÓN VOLVER ARRIBA
  const volverArriba = document.getElementById("volverArriba");

  function actualizarBoton() {
    volverArriba.classList.toggle("visible", window.scrollY > 350);
  }

  window.addEventListener("scroll", actualizarBoton, {
    passive: true
  });

  volverArriba.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });

  actualizarBoton();

  // AÑO AUTOMÁTICO EN EL PIE DE PÁGINA
  document.getElementById("anio").textContent =
    new Date().getFullYear();
});