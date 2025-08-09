// script.js (Corregido)

// Import Firebase desde CDN (versión módulos)
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-analytics.js";

const firebaseConfig = {
    apiKey: "AIzaSyBByhHzF2_20hXBZUhxWVfxid28FmkFkRI",
    authDomain: "bikerxpress-6d953.firebaseapp.com",
    projectId: "bikerxpress-6d953",
    storageBucket: "bikerxpress-6d953.appspot.com",
    messagingSenderId: "166780380695",
    appId: "1:166780380695:web:c6308c02411e91e3a7de52",
    measurementId: "G-9CTXGSLLYE"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
getAnalytics(app);

// Espera a que todo el HTML esté cargado para ejecutar el script
document.addEventListener('DOMContentLoaded', () => {

    // --- VARIABLES GLOBALES PARA TALLERES ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const workshopItems = document.querySelectorAll('.workshop-item');
    const verMasBtn = document.getElementById('toggleButton');

    // --- FUNCIÓN PARA MANEJAR LA VISIBILIDAD DE TALLERES Y EL BOTÓN "VER MÁS" ---
    const handleWorkshopVisibility = (filtro = 'todos') => {
        let visibles = 0;
        let totalEnFiltro = 0;

        // Primero, contamos cuántos talleres hay en la categoría del filtro
        workshopItems.forEach(item => {
            if (filtro === 'todos' || item.dataset.category.includes(filtro)) {
                totalEnFiltro++;
            }
        });

        // Luego, mostramos los primeros 3 y ocultamos el resto
        workshopItems.forEach(item => {
            const isInFilter = filtro === 'todos' || item.dataset.category.includes(filtro);
            
            if (isInFilter) {
                if (visibles < 3) {
                    item.classList.remove('hidden');
                    visibles++;
                } else {
                    item.classList.add('hidden');
                }
            } else {
                item.classList.add('hidden');
            }
        });

        // Finalmente, decidimos si mostrar el botón "Ver más"
        if (totalEnFiltro > 3) {
            verMasBtn.style.display = 'block'; // Usamos 'block' para que sea visible
        } else {
            verMasBtn.style.display = 'none';
        }
    };

    // --- LÓGICA PARA LOS BOTONES DE FILTRO ---
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Actualiza la clase 'active' en los botones
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Obtiene el filtro del botón presionado
            const filtro = btn.dataset.filter;
            
            // Llama a la función principal para actualizar la vista
            handleWorkshopVisibility(filtro);
        });
    });

    // --- LÓGICA PARA EL BOTÓN "VER MÁS" ---
    verMasBtn?.addEventListener('click', () => {
        // Busca el filtro que está activo actualmente
        const filtroActivo = document.querySelector('.filter-btn.active').dataset.filter;

        // Muestra todos los talleres ocultos que pertenecen al filtro activo
        workshopItems.forEach(item => {
            const isInFilter = filtroActivo === 'todos' || item.dataset.category.includes(filtroActivo);
            if (isInFilter && item.classList.contains('hidden')) {
                item.classList.remove('hidden');
            }
        });

        // Oculta el botón "Ver más" después de usarlo
        verMasBtn.style.display = 'none';
    });

    // --- ESTADO INICIAL AL CARGAR LA PÁGINA ---
    // Llama a la función con el filtro 'todos' por defecto
    handleWorkshopVisibility('todos');


    // ======================================================
    // === OTRAS FUNCIONALIDADES (CARRUSEL, MENÚ, ETC.) ===
    // ======================================================

    // === Carrusel ===
    const images = document.querySelectorAll('.carousel-image');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentIndex = 0;
    let interval;

    if (images.length > 0) {
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

        function resetInterval() {
            clearInterval(interval);
            interval = setInterval(nextImage, 2000);
        }

        nextBtn?.addEventListener('click', () => {
            nextImage();
            resetInterval();
        });

        prevBtn?.addEventListener('click', () => {
            prevImage();
            resetInterval();
        });

        showImage(currentIndex);
        interval = setInterval(nextImage, 2000);
    }


    // === Menú de navegación con animación de salida ===
    document.querySelectorAll('.nav-menu a').forEach(link => {
        const href = link.getAttribute('href');
        if (href && !href.startsWith('#')) { // Ignora los enlaces de ancla
            link.addEventListener('click', function(e) {
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
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // Evita valores negativos
    });

    // === Galería de imágenes (cambio al hacer clic en miniaturas) ===
    document.querySelectorAll('.thumbnail').forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            const mainImage = document.querySelector('.main-image');
            if (mainImage) mainImage.src = this.src;
        });
    });

    // === Filtro de eventos y botón de calendario ===
    const eventItems = document.querySelectorAll('.event-item');
    const calendarButtons = document.querySelectorAll('.btn-calendar');
    // Nota: 'filterButtons' no está definido, asumo que te refieres a los botones de filtro de eventos
    const eventFilterButtons = document.querySelectorAll('.event-filter-btn'); // Asumiendo que tienen esta clase

    eventFilterButtons.forEach(button => {
        button.addEventListener('click', function() {
            eventFilterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const filtro = button.dataset.filter;

            eventItems.forEach(item => {
                const categoria = item.dataset.category;
                item.style.display = (filtro === 'all' || categoria === filtro) ? 'block' : 'none';
            });
        });
    });

    calendarButtons.forEach(button => {
        button.addEventListener('click', function() {
            const { title, description, start, end, location } = this.dataset;
            const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${start}/${end}&details=${encodeURIComponent(description)}&location=${encodeURIComponent(location)}&sf=true&output=xml`;
            window.open(url, '_blank');
        });
    });

});
