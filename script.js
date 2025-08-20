import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";

// Configuración de Firebase
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
const db = getFirestore(app);


// Espera a que todo el HTML esté cargado para ejecutar el script
document.addEventListener('DOMContentLoaded', () => {

    // --- VARIABLES GLOBALES PARA TALLERES ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const workshopItems = document.querySelectorAll('.workshop-item');
    const verMasBtn = document.getElementById('toggleButton');

        // --- FUNCIÓN PARA MANEJAR LA VISIBILIDAD DE TALLERES Y EL BOTÓN "VER MÁS" ---
    verMasBtn?.addEventListener('click', () => {
        const filtroActivo = document.querySelector('.filter-btn.active').dataset.filter;
        const isVerMas = verMasBtn.textContent === "Ver más";

        if (isVerMas) {
            // Mostrar todos los talleres del filtro
            workshopItems.forEach(item => {
                const isInFilter = filtroActivo === 'todos' || item.dataset.category.includes(filtroActivo);
                if (isInFilter && item.classList.contains('hidden')) {
                    item.classList.remove('hidden');
                }
            });
            verMasBtn.textContent = "Ver menos";
        } else {
            // Ocultar nuevamente dejando solo los primeros 3
            handleWorkshopVisibility(filtroActivo);
            verMasBtn.textContent = "Ver más";
        }
    });

    // --- FORMULARIO DE CONTACTO ---
    const contactForm = document.querySelector(".contact-form");
    const contactMessage = document.getElementById("contact-message");

    // Función para mostrar mensaje
    function showContactMessage(msg, type) {
    contactMessage.textContent = msg;
    const contactMessage = document.getElementById("formMessage");
    contactMessage.classList.add(type); // 'success' o 'error'
    contactMessage.style.display = "block";

    setTimeout(() => {
        contactMessage.style.display = "none";
    }, 4000);
}

    if (contactForm) {
        contactForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            // Obtener valores del formulario
            const nombre = document.getElementById("nombre").value;
            const email = document.getElementById("email").value;
            const telefono = document.getElementById("telefono").value;
            const mensaje = document.getElementById("mensaje").value;

            try {
                await addDoc(collection(db, "contactos"), {
                    nombre,
                    email,
                    telefono,
                    mensaje,
                    fecha: serverTimestamp()
                });

                // Mostrar mensaje de éxito
                showContactMessage("✅ ¡Gracias! Tu mensaje se envió correctamente.", "success");
                contactForm.reset();
            } catch (error) {
                console.error("❌ Error al guardar:", error);
                showContactMessage("❌ Hubo un error al enviar tu mensaje. Intenta de nuevo.", "error");
            }
        });
    }

    //funcion correo gmail

    document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const submitButton = this.querySelector('button[type="submit"]');
    submitButton.classList.add('loading');

    const formData = new FormData(this);

    fetch('/send_email', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        showFlashMessage('Mensaje enviado correctamente.', 'success');
        this.reset(); // Limpia el formulario
        submitButton.classList.remove('loading');
    })
    .catch(error => {
        showFlashMessage('Hubo un error al enviar el mensaje.', 'danger');
        console.error('Error:', error);
        submitButton.classList.remove('loading');
    });
});

function showFlashMessage(message, category) {
    const flashContainer = document.getElementById('flash-messages');
    const flashMessage = document.createElement('div');
    flashMessage.className = `alert ${category}`;
    flashMessage.textContent = message;

    flashContainer.appendChild(flashMessage);

    setTimeout(() => {
        flashMessage.remove();
    }, 5000);
}



    // --- LÓGICA PARA LOS BOTONES DE FILTRO ---
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filtro = btn.dataset.filter;
            handleWorkshopVisibility(filtro);
        });
    });

    // --- ESTADO INICIAL ---
    function handleWorkshopVisibility(filtro = 'todos') {
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

    if (verMasBtn) {
        if (totalEnFiltro > 3) {
            verMasBtn.style.display = 'block';
            verMasBtn.textContent = "Ver más"; // 🔑 Reinicia siempre
        } else {
            verMasBtn.style.display = 'none';
        }
    }
}



    // ======================================================
    // === FUNCIONALIDADES COMUNES (MENÚ, SCROLL, ETC.) =====
    // ======================================================

    // === Carrusel (si existe en la página) ===
    const carouselImages = document.querySelectorAll('.carousel-image');
    if (carouselImages.length > 0) {
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        let currentIndex = 0;
        let interval = setInterval(nextImage, 2000);

        function showImage(index) {
            carouselImages.forEach((img, i) => {
                img.classList.toggle('active', i === index);
            });
        }

        function nextImage() {
            currentIndex = (currentIndex + 1) % carouselImages.length;
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
            currentIndex = (currentIndex - 1 + carouselImages.length) % carouselImages.length; 
            showImage(currentIndex);
            resetInterval();
        });

        showImage(currentIndex);
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

    // === Galería de imágenes (miniaturas) ===
    document.querySelectorAll('.thumbnail').forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            const mainImage = document.querySelector('.main-image');
            if (mainImage) mainImage.src = this.src;
        });
    });

    // === Filtro de eventos y botón de calendario ===
    const eventItems = document.querySelectorAll('.event-item');
    const calendarButtons = document.querySelectorAll('.btn-calendar');
    const eventFilterButtons = document.querySelectorAll('.event-filter-btn'); 

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
