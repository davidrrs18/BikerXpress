
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBByhHzF2_20hXBZUhxWVfxid28FmkFkRI",
    authDomain: "bikerxpress-6d953.firebaseapp.com",
    projectId: "bikerxpress-6d953",
    storageBucket: "bikerxpress-6d953.firebasestorage.app",
    messagingSenderId: "166780380695",
    appId: "1:166780380695:web:c6308c02411e91e3a7de52",
    measurementId: "G-9CTXGSLLYE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

let currentIndex = 0;
const images = document.querySelectorAll('.carousel-image');

// Función para actualizar el estado del carrusel
function updateCarousel() {
    images.forEach((img, index) => {
    img.classList.remove('active');
    if (index === currentIndex) {
    img.classList.add('active');
    }
    });
}

// Funciones para navegar manualmente
function prevSlide() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateCarousel();
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % images.length;
    updateCarousel();
}

// Cambiar imagen cada 5 segundos
setInterval(() => {
nextSlide();
}, 5000); // 5000 ms = 5 segundos

// Inicializar carrusel al cargar
updateCarousel();

/*Detectar url y cambiar clase en body
const body = document.body;
if (window.location.pathname.includes('talleres.html')) {
    body.classList.remove('index-page');
    body.classList.add('talleres-page');
} else {
    body.classList.remove('talleres-page');
    body.classList.add('index-page');
}
*/
    document.addEventListener('DOMContentLoaded', () => {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const workshopItems = document.querySelectorAll('.workshop-item');
        const toggleButton = document.getElementById('toggleButton');
        const extraWorkshops = document.querySelectorAll('.extra-workshop');
        let allTalleresShown = false;

        // Filtro de categorías
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const filter = button.dataset.filter;

                workshopItems.forEach(item => {
                    const isExtra = item.classList.contains('extra-workshop');
                    const categories = item.dataset.category ? item.dataset.category.split(' ') : [];

                    if ((filter === 'todos' || categories.includes(filter)) && (!isExtra || allTalleresShown)) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });

        // Botón "Ver más productos"
        if (toggleButton && extraWorkshops.length > 0) {
            toggleButton.addEventListener('click', () => {
        allTalleresShown = !allTalleresShown;

        extraWorkshops.forEach(taller => {
            taller.style.display = allTalleresShown ? 'block' : 'none';
        });

        toggleButton.textContent = allTalleresShown ? 'Ver menos' : 'Ver más';

        // Aplicar el filtro activo nuevamente para respetar categorías
        const activeFilter = document.querySelector('.filter-btn.active');
        if (activeFilter) activeFilter.click();

        // Si estamos ocultando los talleres, hacer scroll hacia el contenedor principal
        if (!allTalleresShown) {
            const contenedorPrincipal = document.querySelector('#talleres'); // cambia este selector si tu contenedor tiene otro id
            if (contenedorPrincipal) {
                contenedorPrincipal.scrollIntoView({ behavior: 'smooth' });
            }
        }
            });
        } else {
            if (toggleButton) {
                toggleButton.style.display = 'none';
            }
        }

        // Ocultar extra workshops por defecto
        extraWorkshops.forEach(taller => {
            taller.style.display = 'none';
        });
    });
document.querySelectorAll('.nav-menu a').forEach(link => {
        // Ignorar enlaces con #
        if (!link.getAttribute('href').includes('#')) {
            link.addEventListener('click', function (e) {
                e.preventDefault(); // Previene el cambio inmediato
                const href = this.getAttribute('href');
                document.body.classList.add('fade-out');
                setTimeout(() => {
                    window.location.href = href;
                }, 300); // Espera el tiempo de la transición
            });
        }
    });

    const toggleBtn = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    toggleBtn.addEventListener('click', () => {
        navMenu.classList.toggle('show');
    });

    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('show');
        });
    });

    let lastScrollTop = 0;
const nav = document.querySelector('nav');

window.addEventListener('scroll', () => {
    let scrollTop = window.scrollY || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop) {
        nav.style.top = "-100px"; // oculta el nav
    } else {
        nav.style.top = "0"; // muestra el nav
    }
    lastScrollTop = scrollTop;
});

document.querySelectorAll('.thumbnail').forEach(thumbnail => {
            thumbnail.addEventListener('click', function() {
                document.querySelector('.main-image').src = this.src;
            });
        });



  document.addEventListener('DOMContentLoaded', function () {
    // === Filtros de eventos ===
    const filterButtons = document.querySelectorAll('.filter-btn');
    const eventItems = document.querySelectorAll('.event-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Quitar clase 'active' de todos los botones
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            const filtro = this.dataset.filter; // 'all', 'feria', 'ruta', etc.

            eventItems.forEach(item => {
                const categoria = item.dataset.category;
                if (filtro === 'all' || categoria === filtro) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // === Botón "Añadir al Calendario" ===
    const calendarButtons = document.querySelectorAll('.btn-calendar');

    calendarButtons.forEach(button => {
        button.addEventListener('click', function () {
            const title = this.dataset.title;
            const description = this.dataset.description;
            const start = this.dataset.start;
            const end = this.dataset.end;
            const location = this.dataset.location;

            const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${start}/${end}&details=${encodeURIComponent(description)}&location=${encodeURIComponent(location)}&sf=true&output=xml`;

            window.open(googleCalendarUrl, '_blank');
            alert('El evento se ha añadido a tu calendario de Google (se abrirá en una nueva pestaña).');
        });
    });
});
