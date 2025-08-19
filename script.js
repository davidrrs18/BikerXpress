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

    // ======================================================
    // === FUNCIONALIDAD DE TALLERES CON FILTRO Y PAGINACIÓN ===
    // ======================================================

    const filterBtns = document.querySelectorAll('.filter-btn');
    const workshopItems = document.querySelectorAll('.workshop-item');
    const verMasBtn = document.getElementById('toggleButton');

    /**
     * Muestra los primeros 3 talleres de la categoría seleccionada y oculta el resto.
     * @param {string} filtro La categoría a filtrar.
     */
    const handleWorkshopVisibility = (filtro = 'todos') => {
        let visibles = 0;
        let totalEnFiltro = 0;

        workshopItems.forEach(item => {
            if (filtro === 'todos' || item.dataset.category.includes(filtro)) {
                totalEnFiltro++;
            }
        });

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

        if (totalEnFiltro > 3) {
            verMasBtn.style.display = 'block';
            verMasBtn.textContent = 'Ver más';
        } else {
            verMasBtn.style.display = 'none';
        }
    };

    /**
     * Alterna la visibilidad de los talleres adicionales y cambia el texto del botón.
     */
    const toggleVerMasMenos = () => {
        const isShowingAll = verMasBtn.textContent === 'Ver menos';
        const filtroActivo = document.querySelector('.filter-btn.active')?.dataset.filter || 'todos';

        let talleresEnFiltro = Array.from(workshopItems).filter(item => 
            filtroActivo === 'todos' || item.dataset.category.includes(filtroActivo)
        );

        if (isShowingAll) {
            talleresEnFiltro.slice(3).forEach(item => item.classList.add('hidden'));
            verMasBtn.textContent = 'Ver más';
        } else {
            talleresEnFiltro.forEach(item => item.classList.remove('hidden'));
            verMasBtn.textContent = 'Ver menos';
        }
    };

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filtro = btn.dataset.filter;
            handleWorkshopVisibility(filtro);
        });
    });

    verMasBtn?.addEventListener('click', toggleVerMasMenos);

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
        if (href && !href.startsWith('#')) {
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
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
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
    const eventFilterButtons = document.querySelectorAll('.event-filters .filter-btn');
    const calendarButtons = document.querySelectorAll('.btn-calendar');

    // Filtro de categorías
    eventFilterButtons.forEach(button => {
        button.addEventListener('click', () => {
            eventFilterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filtro = button.dataset.filter;

            eventItems.forEach(item => {
                const categoria = item.dataset.category;
                if (filtro === 'all' || categoria === filtro) {
                    item.style.display = 'block';
                    requestAnimationFrame(() => {
                        item.style.opacity = '1';
                    });
                } else {
                    item.style.opacity = '0';
                    setTimeout(() => item.style.display = 'none', 300);
                }
            });
        });
    });

    // Botón para añadir al calendario
    calendarButtons.forEach(button => {
        button.addEventListener('click', function () {
            const { title, description, start, end, location } = this.dataset;
            const url = `https://calendar.google.com/calendar/u/0/r/eventedit?text=${encodeURIComponent(title)}&dates=${start}/${end}&details=${encodeURIComponent(description)}&location=${encodeURIComponent(location)}`;
            window.open(url, '_blank');
        });
    });
});