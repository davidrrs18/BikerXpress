// script.js (Corregido para Talleres y Eventos)

// Import Firebase desde CDN (versión módulos)
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-analytics.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";

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
const firestore = getFirestore(app);
getAnalytics(app);


// Espera a que todo el HTML esté cargado para ejecutar el script
document.addEventListener('DOMContentLoaded', () => {

    // ======================================================
    // === LÓGICA PARA LA PÁGINA DE TALLERES ================
    // ======================================================
    const talleresSection = document.getElementById('talleres');
    if (talleresSection) {
        const filterBtns = talleresSection.querySelectorAll('.filter-btn');
        const workshopItems = talleresSection.querySelectorAll('.workshop-item');
        const verMasBtn = talleresSection.querySelector('#toggleButton');
        let areAllWorkshopsVisible = false;

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
                areAllWorkshopsVisible = false;
            } else {
                verMasBtn.style.display = 'none';
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

        verMasBtn?.addEventListener('click', () => {
            const filtroActivo = talleresSection.querySelector('.filter-btn.active').dataset.filter;
            if (!areAllWorkshopsVisible) {
                workshopItems.forEach(item => {
                    const isInFilter = filtroActivo === 'todos' || item.dataset.category.includes(filtroActivo);
                    if (isInFilter) {
                        item.classList.remove('hidden');
                    }
                });
                verMasBtn.textContent = 'Ver menos';
                areAllWorkshopsVisible = true;
            } else {
                let visibles = 0;
                workshopItems.forEach(item => {
                    const isInFilter = filtroActivo === 'todos' || item.dataset.category.includes(filtroActivo);
                    if (isInFilter) {
                        if (visibles < 3) {
                            visibles++;
                        } else {
                            item.classList.add('hidden');
                        }
                    }
                });
                verMasBtn.textContent = 'Ver más';
                areAllWorkshopsVisible = false;
            }
        });

        handleWorkshopVisibility('todos');
    }

    // ======================================================
    // === LÓGICA PARA LA PÁGINA DE EVENTOS =================
    // ======================================================
    const eventosSection = document.getElementById('eventos');
    if (eventosSection) {
        const eventFilterButtons = eventosSection.querySelectorAll('.filter-btn');
        const eventItems = eventosSection.querySelectorAll('.event-item');
        const calendarButtons = eventosSection.querySelectorAll('.btn-calendar');

        // Lógica para los filtros de eventos
        eventFilterButtons.forEach(button => {
            button.addEventListener('click', function() {
                eventFilterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                const filtro = this.dataset.filter;

                eventItems.forEach(item => {
                    const categoria = item.dataset.category;
                    item.style.display = (filtro === 'all' || categoria === filtro) ? 'block' : 'none';
                });
            });
        });

        // Lógica para el botón "Añadir al Calendario"
        calendarButtons.forEach(button => {
            button.addEventListener('click', function() {
                const { title, description, start, end, location } = this.dataset;

                if (!title || !start || !end) {
                    console.error("Faltan atributos 'data' en el botón del calendario.");
                    return;
                }

                const url = `https://calendar.google.com/calendar/render?action=TEMPLATE` +
                    `&text=${encodeURIComponent(title)}` +
                    `&dates=${start}/${end}` +
                    `&details=${encodeURIComponent(description || '')}` +
                    `&location=${encodeURIComponent(location || '')}` +
                    `&sf=true&output=xml`;

                window.open(url, '_blank');
            });
        });
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
            let currentIndex = (currentIndex - 1 + carouselImages.length) % carouselImages.length;
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
});



document.addEventListener('DOMContentLoaded', () => {
    // ... (todo tu código existente hasta el final)

    // INICIALIZACIÓN DE EMAILJS (al principio del DOMContentLoaded)
    emailjs.init('KZZkzoo8UVWisX-iU'); // Usa este User ID que ya tenías configurado

   // === LÓGICA DEL FORMULARIO DE CONTACTO (TODAS LAS PÁGINAS)
    // ======================================================
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        // Inicializa EmailJS con tu User ID
        if (typeof emailjs !== 'undefined') {
            emailjs.init('KZZkzoo8UVWisX-iU');
        } else {
            console.error("Error: La librería de EmailJS no se ha cargado.");
        }

        // Crea un elemento para mostrar mensajes de estado
        const statusMessage = document.createElement('p');
        statusMessage.className = 'status-message';
        contactForm.appendChild(statusMessage);

        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            submitBtn.disabled = true;
            submitBtn.textContent = 'Enviando...';
            statusMessage.textContent = ''; // Limpia mensaje anterior

            // Verifica si EmailJS está disponible
            if (typeof emailjs === 'undefined') {
                statusMessage.textContent = 'Error de configuración. No se pudo enviar.';
                statusMessage.style.color = 'red';
                submitBtn.disabled = false;
                submitBtn.textContent = 'Enviar Mensaje';
                return;
            }

            try {
                // 1. Preparar datos para Firestore
                const contactData = {
                    nombre: contactForm.querySelector('#nombre').value,
                    email: contactForm.querySelector('#email').value,
                    telefono: contactForm.querySelector('#telefono').value,
                    mensaje: contactForm.querySelector('#mensaje').value,
                    fecha: new Date() // Añade una marca de tiempo
                };

                // 2. Crear promesas para guardar en Firebase y enviar email
                const saveToFirebase = addDoc(collection(firestore, "contactos"), contactData);
                const sendEmail = emailjs.sendForm('service_z6fd8hr', 'template_sk2usq7', this);

                // 3. Ejecutar ambas operaciones en paralelo
                await Promise.all([saveToFirebase, sendEmail]);

                // 4. Si ambas tienen éxito
                statusMessage.textContent = '¡Mensaje enviado y registrado con éxito!';
                statusMessage.style.color = 'green';
                
                setTimeout(() => {
                    contactForm.reset();
                    statusMessage.textContent = '';
                }, 4000); // Limpia el formulario y el mensaje después de 4 segundos

            } catch (error) {
                console.error("Error al enviar el formulario: ", error);
                statusMessage.textContent = 'Hubo un error al enviar el mensaje.';
                statusMessage.style.color = 'red';
            } finally {
                // Reactivar el botón
                submitBtn.disabled = false;
                submitBtn.textContent = 'Enviar Mensaje';
            }
        });
    }
});