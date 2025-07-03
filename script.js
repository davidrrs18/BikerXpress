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

// Detectar url y cambiar clase en body
const body = document.body;
if (window.location.pathname.includes('talleres.html')) {
    body.classList.remove('index-page');
    body.classList.add('talleres-page');
} else {
    body.classList.remove('talleres-page');
    body.classList.add('index-page');
}

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

