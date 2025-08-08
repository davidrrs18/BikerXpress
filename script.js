// === Firebase (solo funcionará si usas HTTPS y servidor local) ===
// script.js (debe estar en la misma carpeta que tu HTML o ajustar la ruta en el <script>)

// Import Firebase desde CDN (versión módulos)
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-analytics.js";

    const firebaseConfig = {
    apiKey: "AIzaSyBByhHzF2_20hXBZUhxWVfxid28FmkFkRI",
    authDomain: "bikerxpress-6d953.firebaseapp.com",
    projectId: "bikerxpress-6d953",
    storageBucket: "bikerxpress-6d953.appspot.com", // corregido .appspot.com
    messagingSenderId: "166780380695",
    appId: "1:166780380695:web:c6308c02411e91e3a7de52",
    measurementId: "G-9CTXGSLLYE"
    };

const app = initializeApp(firebaseConfig);
getAnalytics(app);

document.addEventListener('DOMContentLoaded', () => {
  // Carrusel
const images = document.querySelectorAll('.carousel-image');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentIndex = 0;

function showImage(index) {
    images.forEach((img, i) => {
        img.classList.toggle('active', i === index);
    });
}

function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
}

function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
}

nextBtn.addEventListener('click', () => {
    nextImage();
    resetInterval();
});

prevBtn.addEventListener('click', () => {
    prevImage();
    resetInterval();
});

showImage(currentIndex);

let interval = setInterval(nextImage, 2000);

function resetInterval() {
    clearInterval(interval);
    interval = setInterval(nextImage, 2000);
}



//filtro talleres
 document.addEventListener('DOMContentLoaded', () => {
  const botonesCategoria = document.querySelectorAll('.categoria-btn');
  const talleres = document.querySelectorAll('.taller');
  const btnVerMas = document.getElementById('ver-mas');

  let visibleCount = 3; // número inicial de talleres visibles

  // Función para mostrar talleres según la categoría y visibleCount
  function filtrarTalleres(categoria) {
    let contador = 0;
    talleres.forEach(taller => {
      // Mostrar solo los talleres que coinciden con la categoría o todos si es "all"
      if (categoria === 'all' || taller.dataset.category === categoria) {
        // Mostrar hasta visibleCount
        if (contador < visibleCount) {
          taller.classList.remove('hidden');
        } else {
          taller.classList.add('hidden');
        }
        contador++;
      } else {
        taller.classList.add('hidden');
      }
    });

    // Mostrar u ocultar botón "Ver más" dependiendo si quedan más talleres ocultos
    const totalTalleres = [...talleres].filter(t => categoria === 'all' || t.dataset.category === categoria).length;
    if (visibleCount >= totalTalleres) {
      btnVerMas.style.display = 'none';
    } else {
      btnVerMas.style.display = 'inline-block';
    }
  }

  // Evento para los botones de categoría
  botonesCategoria.forEach(btn => {
    btn.addEventListener('click', () => {
      // Reiniciar visibleCount al cambiar categoría
      visibleCount = 3;

      // Quitar clase activa a todos y ponerla al actual
      botonesCategoria.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      filtrarTalleres(btn.dataset.category);
    });
  });

  // Evento para botón "Ver más"
  btnVerMas.addEventListener('click', () => {
    visibleCount += 3; // mostrar 3 más
    const categoriaActiva = [...botonesCategoria].find(b => b.classList.contains('active'))?.dataset.category || 'all';
    filtrarTalleres(categoriaActiva);
  });

  // Mostrar todos al inicio
  // Marcar el botón "Todos" como activo por defecto
  const btnTodos = document.querySelector('.categoria-btn[data-category="all"]');
  if (btnTodos) btnTodos.classList.add('active');
  filtrarTalleres('all');
});

    





    // === Menú de navegación con animación de salida ===
    document.querySelectorAll('.nav-menu a').forEach(link => {
        const href = link.getAttribute('href');
        if (href && !href.includes('#')) {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            document.body.classList.add('fade-out');
            setTimeout(() => {
            window.location.href = href;
            }, 300);
        });
        }
    });

    // === Botón de menú hamburguesa ===
    const toggleBtn = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    toggleBtn?.addEventListener('click', () => {
        navMenu?.classList.toggle('show');
    });

    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
        navMenu?.classList.remove('show');
        });
    });

    // === Ocultar navbar al hacer scroll hacia abajo ===
    let lastScrollTop = 0;
    const nav = document.querySelector('nav');

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        if (scrollTop > lastScrollTop) {
        nav.style.top = "-100px";
        } else {
        nav.style.top = "0";
        }
        lastScrollTop = scrollTop;
    });

    // === Galería de imágenes (cambio al hacer clic en miniaturas) ===
    document.querySelectorAll('.thumbnail').forEach(thumbnail => {
        thumbnail.addEventListener('click', function () {
        const mainImage = document.querySelector('.main-image');
        if (mainImage) mainImage.src = this.src;
        });
    });

    // === Filtro de eventos y botón de calendario ===
    const eventItems = document.querySelectorAll('.event-item');
    const calendarButtons = document.querySelectorAll('.btn-calendar');

    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        const filtro = button.dataset.filter;

        eventItems.forEach(item => {
            const categoria = item.dataset.category;
            item.style.display = (filtro === 'all' || categoria === filtro) ? 'block' : 'none';
        });
        });
    });

    calendarButtons.forEach(button => {
        button.addEventListener('click', function () {
        const { title, description, start, end, location } = this.dataset;
        const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${start}/${end}&details=${encodeURIComponent(description)}&location=${encodeURIComponent(location)}&sf=true&output=xml`;
        window.open(url, '_blank');
        alert('El evento se ha añadido a tu calendario de Google (se abrirá en una nueva pestaña).');
        });
    });

});
