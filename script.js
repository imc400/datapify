// Funcionalidad del sitio web Datapify
document.addEventListener('DOMContentLoaded', function() {
    
    // Variables globales
    const header = document.getElementById('header');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Header scroll effect
    function handleScroll() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    // Smooth scroll para los enlaces de navegación
    function smoothScroll(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 120;
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            
            // Actualizar enlace activo
            updateActiveLink(this);
        }
    }
    
    // Actualizar enlace activo en la navegación
    function updateActiveLink(clickedLink) {
        navLinks.forEach(link => link.classList.remove('active'));
        clickedLink.classList.add('active');
    }
    
    // Toggle del menú móvil
    function toggleMobileMenu() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
        
        // Animación del hamburguer icon
        const spans = navToggle.querySelectorAll('span');
        spans.forEach(span => span.classList.toggle('active'));
    }
    
    // Detectar sección activa mientras se hace scroll
    function updateActiveNavOnScroll() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 150;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const correspondingLink = document.querySelector(`a[href="#${sectionId}"]`);
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                }
            }
        });
    }
    
    // FAQ Accordion functionality
    function initFAQ() {
        const faqQuestions = document.querySelectorAll('.faq-question');
        
        faqQuestions.forEach(question => {
            question.addEventListener('click', function() {
                const faqItem = this.parentElement;
                const isActive = faqItem.classList.contains('active');
                
                // Cerrar todos los elementos FAQ
                document.querySelectorAll('.faq-item').forEach(item => {
                    item.classList.remove('active');
                });
                
                // Abrir el elemento clicado si no estaba activo
                if (!isActive) {
                    faqItem.classList.add('active');
                }
            });
        });
    }
    
    // Intersection Observer para animaciones de entrada
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);
        
        // Elementos a animar
        const animatedElements = document.querySelectorAll(`
            .hero-content,
            .hero-image,
            .description-text,
            .description-logos,
            .advantages-list,
            .advantages-media,
            .discovery-card,
            .metric-card,
            .pricing-card,
            .testimonial,
            .faq-item
        `);
        
        animatedElements.forEach(el => {
            el.classList.add('fade-in');
            observer.observe(el);
        });
    }
    
    // Parallax effect para elementos decorativos
    function initParallax() {
        const circles = document.querySelectorAll('.circle');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            circles.forEach((circle, index) => {
                const speed = 0.2 + (index * 0.1);
                circle.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });
    }
    
    // Smooth hover effects para botones
    function initButtonEffects() {
        const buttons = document.querySelectorAll(`
            .cta-button,
            .cta-button-secondary,
            .login-btn,
            .plan-button
        `);
        
        buttons.forEach(button => {
            button.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-3px) scale(1.02)';
            });
            
            button.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    }
    
    // Testimonials slider (simple auto-scroll)
    function initTestimonialsSlider() {
        const slider = document.querySelector('.testimonials-slider');
        const testimonials = document.querySelectorAll('.testimonial');
        
        if (testimonials.length > 3) {
            let currentIndex = 0;
            const totalTestimonials = testimonials.length;
            
            setInterval(() => {
                currentIndex = (currentIndex + 1) % totalTestimonials;
                const translateX = -(currentIndex * (100 / 3));
                slider.style.transform = `translateX(${translateX}%)`;
            }, 5000);
        }
    }
    
    // Contador animado para métricas
    function animateCounters() {
        const counters = document.querySelectorAll('.metric-number');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = counter.textContent;
                    const isPercentage = target.includes('%');
                    const isNegative = target.includes('-');
                    const number = parseInt(target.replace(/[^\d]/g, ''));
                    
                    let current = 0;
                    const increment = number / 50;
                    
                    const updateCounter = () => {
                        if (current < number) {
                            current += increment;
                            const prefix = isNegative ? '-' : '+';
                            const suffix = isPercentage ? '%' : '';
                            counter.textContent = `${prefix}${Math.floor(current)}${suffix}`;
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.textContent = target;
                        }
                    };
                    
                    updateCounter();
                    observer.unobserve(counter);
                }
            });
        });
        
        counters.forEach(counter => observer.observe(counter));
    }
    
    // Event Listeners
    window.addEventListener('scroll', () => {
        handleScroll();
        updateActiveNavOnScroll();
    });
    
    navToggle.addEventListener('click', toggleMobileMenu);
    
    navLinks.forEach(link => {
        if (link.getAttribute('href').startsWith('#')) {
            link.addEventListener('click', smoothScroll);
        }
    });
    
    // Inicialización
    initFAQ();
    initScrollAnimations();
    initParallax();
    initButtonEffects();
    initTestimonialsSlider();
    animateCounters();
    
    // Cerrar menú móvil al hacer click en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    });
    
    // Cerrar menú móvil al hacer click fuera
    document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            if (navMenu.classList.contains('active')) {
                toggleMobileMenu();
            }
        }
    });
    
    // Modal functionality
    function initModalFunctionality() {
        const modal = document.getElementById('qualification-modal');
        const form = document.getElementById('qualification-form');
        const closeBtn = document.querySelector('.close-modal');
        const noShopifyMessage = document.getElementById('no-shopify-message');
        const successMessage = document.getElementById('success-message');
        const goToCalendarBtn = document.getElementById('go-to-calendar');
        
        // Abrir modal
        function openModal() {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
        
        // Cerrar modal
        function closeModal() {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            
            // Reset form and messages
            form.style.display = 'flex';
            noShopifyMessage.style.display = 'none';
            successMessage.style.display = 'none';
            form.reset();
        }
        
        // Event listeners para abrir modal
        const ctaButtons = document.querySelectorAll('.cta-button, .plan-button, .cta-button-secondary');
        ctaButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                openModal();
            });
        });
        
        // Event listener para cerrar modal
        closeBtn.addEventListener('click', closeModal);
        
        // Cerrar modal al hacer click fuera
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
        
        // Cerrar modal con tecla Escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.style.display === 'block') {
                closeModal();
            }
        });
        
        // Handle form submission
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(form);
            const shopifyValue = formData.get('shopify');
            
            // Preparar datos para Google Sheet
            const data = {
                nombre: formData.get('nombre'),
                apellido: formData.get('apellido'),
                correo: formData.get('correo'),
                telefono: formData.get('telefono'),
                website: formData.get('website'),
                shopify: shopifyValue
            };
            
            // Enviar a Google Apps Script
            console.log('Enviando datos:', data);
            
            fetch('https://script.google.com/macros/s/AKfycbxIdqfa9cK6zRu_w1kuO-bXFecnVpjaqEostL7n8PPJcBmXUUxZMBELCXoSLxLKgRZ_/exec', {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
            .then(response => {
                console.log('Respuesta recibida:', response);
                return response;
            })
            .then(result => {
                console.log('Datos enviados exitosamente a Google Sheet');
            })
            .catch(error => {
                console.error('Error enviando datos:', error);
                alert('Error enviando datos. Revisa la consola para más detalles.');
            });
            
            // Hide form
            form.style.display = 'none';
            
            if (shopifyValue === 'si') {
                // Show success message
                successMessage.style.display = 'block';
            } else {
                // Show no-Shopify message
                noShopifyMessage.style.display = 'block';
            }
        });
        
        // Redirect to Calendly
        goToCalendarBtn.addEventListener('click', function() {
            window.open('https://calendar.app.google/kp98Sdw9zs11SH326', '_blank');
            closeModal();
        });
        
        // Make closeModal globally accessible
        window.closeModal = closeModal;
    }
    
    // Performance optimization: throttle scroll events
    let ticking = false;
    
    function updateOnScroll() {
        handleScroll();
        updateActiveNavOnScroll();
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateOnScroll);
            ticking = true;
        }
    });
    
    // Loading animation
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
        
        // Trigger inicial para elementos visibles
        const initialElements = document.querySelectorAll('.fade-in');
        initialElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight) {
                el.classList.add('visible');
            }
        });
    });
    
    // Modal functionality
    initModalFunctionality();
    
    console.log('Datapify website loaded successfully!');
});