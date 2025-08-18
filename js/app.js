document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scrolling para los enlaces del navbar
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    /*Animación de enlace activo en Navbar*/
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        const sections = document.querySelectorAll('.product-section');
        const navbarHeight = navbar.offsetHeight;
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navbarHeight - 50;
            const sectionHeight = section.offsetHeight;
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
    
   /*Configuración de carrusel para mostrar 1 imagen a la vez */
    document.querySelectorAll('.carousel-container').forEach(container => {
        const carousel = container.querySelector('.carousel');
        const items = carousel.querySelectorAll('.carousel-item');
        const prevBtn = container.querySelector('.prev-btn');
        const nextBtn = container.querySelector('.next-btn');
        const dots = container.querySelectorAll('.dot');
        
        let currentIndex = 0;
        const totalItems = items.length;
        
        function showSlide(index) {
            // Ocultar todos los items
            items.forEach(item => {
                item.classList.remove('active');
            });
            
            // Mostrar el item actual
            items[index].classList.add('active');
            
            // Actualizar dots
            dots.forEach((dot, dotIndex) => {
                dot.classList.toggle('active', dotIndex === index);
            });
            
            // Actualizar currentIndex
            currentIndex = index;
        }
        
        function nextSlide() {
            const nextIndex = (currentIndex + 1) % totalItems;
            showSlide(nextIndex);
        }
        
        function prevSlide() {
            const prevIndex = (currentIndex - 1 + totalItems) % totalItems;
            showSlide(prevIndex);
        }
        
        // Event listeners para botones
        nextBtn.addEventListener('click', nextSlide);
        prevBtn.addEventListener('click', prevSlide);
        
        // Event listeners para dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showSlide(index);
            });
        });
        
        showSlide(0);
    });
    
    /*Configuración de botones "Ver Más" y "Flecha" */
    const verMasButtons = document.querySelectorAll('.btn-secondary:not([href])');
    const arrowButtons = document.querySelectorAll('.btn-primary');
    
    verMasButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            const section = this.closest('.product-section');
            const sectionId = section.getAttribute('id');
            
            console.log(`Ver más productos de: ${sectionId}`);
            
        });
    });
    
    arrowButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            const section = this.closest('.product-section');
            const sectionId = section.getAttribute('id');
            
            // Lógica para el botón de flecha (puede ser igual o diferente)
            console.log(`Acción de flecha para: ${sectionId}`);
            
            // Ejemplo: scroll a la siguiente sección
            const nextSection = section.nextElementSibling;
            if (nextSection && nextSection.classList.contains('product-section')) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = nextSection.offsetTop - navbarHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    /*Configuración para cargar todo el contenido de la landing al abrirla*/
    const productSections = document.querySelectorAll('.product-section');
    productSections.forEach((section, index) => {
        if (index === 0) {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        } else {
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
        }
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
    
    const carouselItems = document.querySelectorAll('.carousel-item');
    
    carouselItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
});

// Función para manejar el redimensionamiento de la ventana
window.addEventListener('resize', function() {
    // Aquí puedes agregar lógica específica para el responsive
    console.log('Ventana redimensionada');
});

function preloadImages() {
    const images = [
        'img/epson-logo.png',
        'img/banner-epson.jpg',
        'img/impresora-destacada.jpg',
        'img/plotter-destacado.jpg',
        'img/suministro-destacado.jpg',
        'img/proyector-destacado.jpg'
    ];
    
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Llamar a la precarga cuando se carga la página
window.addEventListener('load', preloadImages);

/*Configuración del botón de soporte */

document.addEventListener('DOMContentLoaded', function() {
    const supportButton = document.getElementById('supportButton');
    const supportModal = document.getElementById('supportModal');
    const closeSupportModal = document.getElementById('closeSupportModal');
    const supportForm = document.getElementById('supportForm');
    const fileInput = document.getElementById('supportFiles');
    const fileList = document.getElementById('fileList');
    
    let selectedFiles = [];
    const maxFiles = 5;
    
    // Abrir modal de soporte
    supportButton.addEventListener('click', function() {
        supportModal.classList.add('active');
        supportButton.style.display = 'none';
    });
    
    // Cerrar modal de soporte
    closeSupportModal.addEventListener('click', function() {
        supportModal.classList.remove('active');
        supportButton.style.display = 'block';
    });
    
    // Cerrar modal al hacer clic fuera de él
    document.addEventListener('click', function(event) {
        if (supportModal.classList.contains('active') && 
            !supportModal.contains(event.target) && 
            !supportButton.contains(event.target)) {
            supportModal.classList.remove('active');
            supportButton.style.display = 'block';
        }
    });
    
    // Manejar selección de archivos
    fileInput.addEventListener('change', function(event) {
        const files = Array.from(event.target.files);
        
        // Verificar límite de archivos
        if (selectedFiles.length + files.length > maxFiles) {
            alert(`Solo puedes adjuntar un máximo de ${maxFiles} archivos.`);
            return;
        }
        
        // Agregar nuevos archivos
        files.forEach(file => {
            selectedFiles.push(file);
        });
        
        // Actualizar la lista visual
        updateFileList();
        
        // Limpiar el input
        fileInput.value = '';
    });
    
    // Función para actualizar la lista de archivos
    function updateFileList() {
        fileList.innerHTML = '';
        
        selectedFiles.forEach((file, index) => {
            const fileItem = document.createElement('div');
            fileItem.className = 'file-item';
            
            fileItem.innerHTML = `
                <span class="file-name">${file.name}</span>
                <button type="button" class="file-remove" data-index="${index}">×</button>
            `;
            
            fileList.appendChild(fileItem);
        });
        
        // Agregar event listeners para los botones de eliminación
        const removeButtons = fileList.querySelectorAll('.file-remove');
        removeButtons.forEach(button => {
            button.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                selectedFiles.splice(index, 1);
                updateFileList();
            });
        });
    }
    
    // Manejar envío del formulario
    supportForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const formData = new FormData();
        const name = document.getElementById('supportName').value;
        const email = document.getElementById('supportEmail').value;
        const message = document.getElementById('supportMessage').value;
        
        // Validar campos requeridos
        if (!name || !email || !message) {
            alert('Por favor, completa todos los campos obligatorios.');
            return;
        }
        
        // Agregar datos del formulario
        formData.append('name', name);
        formData.append('email', email);
        formData.append('message', message);
        
        // Agregar archivos
        selectedFiles.forEach((file, index) => {
            formData.append(`file_${index}`, file);
        });
        
        const submitBtn = document.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        
        submitBtn.disabled = true;
        submitBtn.textContent = 'Enviando...';
        
        // Simular tiempo de envío
        setTimeout(() => {
            alert('¡Mensaje enviado correctamente! Nos pondremos en contacto contigo pronto.');
            
            // Resetear formulario
            supportForm.reset();
            selectedFiles = [];
            updateFileList();
            
            // Cerrar modal
            supportModal.classList.remove('active');
            supportButton.style.display = 'block';
            
            // Restaurar botón
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }, 2000);
    });
});

/*FUNCIONALIDAD TÁCTIL PARA CARRUSELES (SWIPE EN MOBILE) */

document.addEventListener('DOMContentLoaded', function() {
    // Agregar funcionalidad táctil a todos los carruseles
    const carousels = document.querySelectorAll('.carousel');
    
    carousels.forEach(carousel => {
        let startX = 0;
        let endX = 0;
        let startY = 0;
        let endY = 0;
        const minSwipeDistance = 50;
        const maxVerticalDistance = 100;
        
        // Touch start
        carousel.addEventListener('touchstart', function(e) {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        }, { passive: true });
        
        // Touch move (opcional: prevenir scroll si es un swipe horizontal)
        carousel.addEventListener('touchmove', function(e) {
            if (e.touches.length === 1) {
                const currentX = e.touches[0].clientX;
                const currentY = e.touches[0].clientY;
                const diffX = Math.abs(currentX - startX);
                const diffY = Math.abs(currentY - startY);
                
                // Si el movimiento es más horizontal que vertical, prevenir scroll
                if (diffX > diffY && diffX > 10) {
                    e.preventDefault();
                }
            }
        }, { passive: false });
        
        // Touch end
        carousel.addEventListener('touchend', function(e) {
            endX = e.changedTouches[0].clientX;
            endY = e.changedTouches[0].clientY;
            
            const horizontalDistance = startX - endX;
            const verticalDistance = Math.abs(startY - endY);
            
            // Verificar que sea un swipe horizontal válido
            if (Math.abs(horizontalDistance) > minSwipeDistance && verticalDistance < maxVerticalDistance) {
                const carouselContainer = carousel.closest('.carousel-container');
                const nextBtn = carouselContainer.querySelector('.next-btn');
                const prevBtn = carouselContainer.querySelector('.prev-btn');
                
                if (horizontalDistance > 0) {
                    // Swipe left (mostrar siguiente)
                    if (nextBtn) nextBtn.click();
                } else {
                    // Swipe right (mostrar anterior)
                    if (prevBtn) prevBtn.click();
                }
            }
        }, { passive: true });
    });
});

/*Mejoras de UX y Accesibilidad */

document.addEventListener('DOMContentLoaded', function() {
    // Mejorar navegación por teclado en carruseles
    const carouselItems = document.querySelectorAll('.carousel-item');
    
    carouselItems.forEach(item => {
        item.setAttribute('tabindex', '0');
        
        item.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                // Simular clic en el elemento activo
                const button = this.querySelector('button, a');
                if (button) button.click();
            }
        });
    });
    
    // Pausa automática del carrusel al hacer hover o focus (si hay autoplay)
    const carouselContainers = document.querySelectorAll('.carousel-container');
    
    carouselContainers.forEach(container => {
        container.addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'paused';
        });
        
        container.addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'running';
        });
    });
});