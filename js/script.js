document.addEventListener('DOMContentLoaded', function() {

    // ==========================================
    // ИНТРО-ЗАСТАВКА
    // ==========================================
    const intro = document.querySelector('.intro');
    
    if (intro) {
        // Блокируем скролл во время интро
        document.body.style.overflow = 'hidden';
        
        setTimeout(function() {
            intro.classList.add('hide');
            document.body.style.overflow = '';
            document.body.classList.add('loaded');
            
            // Удаляем интро после анимации
            setTimeout(function() {
                if (intro.parentNode) {
                    intro.parentNode.removeChild(intro);
                }
            }, 1000);
        }, 3500);
    } else {
        document.body.classList.add('loaded');
    }

    // ==========================================
    // КАСТОМНЫЙ КУРСОР
    // ==========================================
    const cursor = document.querySelector('.cursor');
    const cursorDot = document.querySelector('.cursor-dot');
    
    if (cursor && cursorDot && window.innerWidth > 768) {
        let mouseX = 0;
        let mouseY = 0;
        let cursorX = 0;
        let cursorY = 0;
        let dotX = 0;
        let dotY = 0;
        
        document.addEventListener('mousemove', function(e) {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Точка следует мгновенно
            cursorDot.style.left = mouseX + 'px';
            cursorDot.style.top = mouseY + 'px';
        });
        
        // Плавное движение основного курсора
        function animateCursor() {
            cursorX += (mouseX - cursorX) * 0.15;
            cursorY += (mouseY - cursorY) * 0.15;
            
            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';
            
            requestAnimationFrame(animateCursor);
        }
        
        animateCursor();
        
        // Эффекты при наведении на интерактивные элементы
        const interactiveElements = document.querySelectorAll(
            'a, button, .btn, input, textarea, select, .filter-btn, ' +
            '.project-card, .service-card, .advantage-card, .stat-item, ' +
            '.team-card, .additional-card, .mission-box, .contact-item, ' +
            '.gallery-thumbs img, .thumb, .scroll-top, .burger'
        );
        
        interactiveElements.forEach(function(el) {
            el.addEventListener('mouseenter', function() {
                cursor.classList.add('hover');
            });
            
            el.addEventListener('mouseleave', function() {
                cursor.classList.remove('hover');
            });
        });
        
        // Эффект при клике
        document.addEventListener('mousedown', function() {
            cursor.classList.add('click');
        });
        
        document.addEventListener('mouseup', function() {
            cursor.classList.remove('click');
        });
        
        // Скрываем курсор когда он выходит за пределы окна
        document.addEventListener('mouseleave', function() {
            cursor.style.opacity = '0';
            cursorDot.style.opacity = '0';
        });
        
        document.addEventListener('mouseenter', function() {
            cursor.style.opacity = '1';
            cursorDot.style.opacity = '1';
        });
    }

    // ==========================================
    // ПЛАВНЫЕ ПЕРЕХОДЫ МЕЖДУ СТРАНИЦАМИ
    // ==========================================
    const pageTransition = document.querySelector('.page-transition');
    
    // Перехватываем все внутренние ссылки
    document.addEventListener('click', function(e) {
        const link = e.target.closest('a');
        
        if (link && 
            link.href && 
            link.href.indexOf(window.location.origin) === 0 && 
            link.href.indexOf('#') === -1 &&
            !link.hasAttribute('download') &&
            link.target !== '_blank' &&
            !link.classList.contains('scroll-top')) {
            
            e.preventDefault();
            
            if (pageTransition) {
                // Запускаем анимацию перехода
                pageTransition.classList.add('active');
                
                setTimeout(function() {
                    pageTransition.classList.add('exit');
                    
                    setTimeout(function() {
                        window.location.href = link.href;
                    }, 400);
                }, 600);
            } else {
                window.location.href = link.href;
            }
        }
    });
    
    // При загрузке страницы убираем переход
    window.addEventListener('pageshow', function() {
        if (pageTransition) {
            pageTransition.classList.add('exit-active');
            
            setTimeout(function() {
                pageTransition.classList.remove('active', 'exit', 'exit-active');
            }, 800);
        }
    });

    // ==========================================
    // HEADER SCROLL EFFECT
    // ==========================================
    const header = document.querySelector('.header');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Скрываем/показываем хедер при скролле
        if (currentScroll > 300 && currentScroll > lastScroll) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });

    // ==========================================
    // BURGER MENU
    // ==========================================
    const burger = document.getElementById('burgerBtn');
    const nav = document.getElementById('navMenu');

    if (burger && nav) {
        burger.addEventListener('click', function() {
            this.classList.toggle('open');
            nav.classList.toggle('open');
            
            if (nav.classList.contains('open')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        const navLinks = nav.querySelectorAll('a');
        navLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                burger.classList.remove('open');
                nav.classList.remove('open');
                document.body.style.overflow = '';
            });
        });
    }

    // ==========================================
    // SCROLL ANIMATIONS (Reveal)
    // ==========================================
    function revealElements() {
        const reveals = document.querySelectorAll(
            '.reveal, .reveal-up, .reveal-left, .reveal-right, .reveal-scale'
        );
        
        reveals.forEach(function(element) {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', revealElements);
    revealElements();

    // ==========================================
    // STATS COUNTER ANIMATION
    // ==========================================
    function animateCounter(element) {
        const target = parseInt(element.textContent);
        if (isNaN(target)) return;
        
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        function update() {
            current += step;
            if (current < target) {
                element.textContent = Math.floor(current);
                requestAnimationFrame(update);
            } else {
                element.textContent = target + '+';
            }
        }
        
        requestAnimationFrame(update);
    }

    const statNumbers = document.querySelectorAll('.stat-number');
    let statsAnimated = false;

    function checkStats() {
        if (statsAnimated || !statNumbers.length) return;
        
        const statsSection = document.querySelector('.stats');
        if (!statsSection) return;
        
        const rect = statsSection.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            statsAnimated = true;
            statNumbers.forEach(function(number) {
                animateCounter(number);
            });
        }
    }

    window.addEventListener('scroll', checkStats);
    checkStats();

    // ==========================================
    // PROJECT FILTER
    // ==========================================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');

    filterBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            filterBtns.forEach(function(b) {
                b.classList.remove('active');
            });
            this.classList.add('active');

            const filter = this.getAttribute('data-filter');

            projectItems.forEach(function(item, index) {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeInUp 0.6s ease ' + (index * 0.1) + 's forwards';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // ==========================================
    // GALLERY
    // ==========================================
    const mainImg = document.querySelector('.gallery-main img');
    const thumbs = document.querySelectorAll('.gallery-thumbs img');

    if (mainImg && thumbs.length) {
        thumbs.forEach(function(thumb) {
            thumb.addEventListener('click', function() {
                mainImg.style.opacity = '0';
                mainImg.style.transform = 'scale(0.95)';
                
                setTimeout(function() {
                    mainImg.src = thumb.src.replace('w=200', 'w=1200');
                    mainImg.style.opacity = '1';
                    mainImg.style.transform = 'scale(1)';
                }, 300);
                
                thumbs.forEach(function(t) {
                    t.classList.remove('active');
                });
                this.classList.add('active');
            });
        });
    }

    // ==========================================
    // CONTACT FORM
    // ==========================================
    const contactForm = document.querySelector('.form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Отправка...';
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.7';
            
            setTimeout(function() {
                alert('🎉 Спасибо! Ваша заявка успешно отправлена.\n\nМы свяжемся с вами в ближайшее время!');
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.opacity = '1';
            }, 1500);
        });
    }

    // ==========================================
    // SCROLL TOP BUTTON
    // ==========================================
    const scrollTopBtn = document.querySelector('.scroll-top');
    if (scrollTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 500) {
                scrollTopBtn.style.opacity = '1';
                scrollTopBtn.style.pointerEvents = 'all';
            } else {
                scrollTopBtn.style.opacity = '0';
                scrollTopBtn.style.pointerEvents = 'none';
            }
        });
        
        scrollTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ==========================================
    // PHONE MASK
    // ==========================================
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(function(input) {
        input.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 11) value = value.substring(0, 11);
            
            let formatted = '+7';
            if (value.length > 1) formatted += ' (' + value.substring(1, 4);
            if (value.length >= 4) formatted += ') ' + value.substring(4, 7);
            if (value.length >= 7) formatted += '-' + value.substring(7, 9);
            if (value.length >= 9) formatted += '-' + value.substring(9, 11);
            
            e.target.value = formatted;
        });
    });

    // ==========================================
    // PARALLAX EFFECT
    // ==========================================
    window.addEventListener('scroll', function() {
        const hero = document.querySelector('.hero');
        const pageHeader = document.querySelector('.page-header');
        
        if (hero) {
            const scrolled = window.pageYOffset;
            hero.style.backgroundPositionY = (scrolled * 0.4) + 'px';
        }
        
        if (pageHeader) {
            const scrolled = window.pageYOffset;
            pageHeader.style.backgroundPositionY = (scrolled * 0.3) + 'px';
        }
    });

    // ==========================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ==========================================
    // TILT EFFECT ДЛЯ КАРТОЧЕК (3D эффект)
    // ==========================================
    function initTilt() {
        const cards = document.querySelectorAll('.stat-item, .service-card, .advantage-card, .team-card');
        
        cards.forEach(function(card) {
            card.addEventListener('mousemove', function(e) {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / centerY * -10;
                const rotateY = (x - centerX) / centerX * 10;
                
                card.style.transform = 'perspective(1000px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) scale3d(1.02, 1.02, 1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            });
        });
    }
    
    if (window.innerWidth > 1024) {
        initTilt();
    }

    console.log('🔥 Elite-Stroy - PREMIUM VERSION загружен!');
    console.log('✨ Интро | 🖱️ Кастомный курсор | 🔄 Плавные переходы | 🎨 3D эффекты');
});