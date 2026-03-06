/* ========================================
   FRAME CULTURE — script.js
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ── CUSTOM CURSOR ─────────────────────
    const cursor = document.getElementById('cursor');
    let mouseX = 0, mouseY = 0, curX = 0, curY = 0;

    document.addEventListener('mousemove', e => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        curX += (mouseX - curX) * 0.18;
        curY += (mouseY - curY) * 0.18;
        if (cursor) {
            cursor.style.left = curX + 'px';
            cursor.style.top = curY + 'px';
        }
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    document.querySelectorAll('a, button, .case-card, .service-card, .play-btn').forEach(el => {
        el.addEventListener('mouseenter', () => cursor && cursor.classList.add('expanded'));
        el.addEventListener('mouseleave', () => cursor && cursor.classList.remove('expanded'));
    });

    // ── STICKY NAV ────────────────────────
    const nav = document.getElementById('nav');
    window.addEventListener('scroll', () => {
        if (nav) nav.classList.toggle('scrolled', window.scrollY > 60);
    });

    // ── SCROLL REVEAL ─────────────────────
    const reveals = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => entry.target.classList.add('visible'), i * 60);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.05, rootMargin: '0px 0px 0px 0px' });

    reveals.forEach(el => observer.observe(el));

    // Сразу показываем элементы уже в viewport при загрузке
    setTimeout(() => {
        reveals.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight) {
                el.classList.add('visible');
            }
        });
    }, 100);

    // Фолбек: через 2с показываем всё что осталось скрытым
    setTimeout(() => {
        reveals.forEach(el => el.classList.add('visible'));
    }, 2000);

    // ── HERO PARALLAX ─────────────────────
    const heroPhoto = document.getElementById('hero-photo');
    window.addEventListener('scroll', () => {
        if (window.scrollY < window.innerHeight && heroPhoto) {
            const img = heroPhoto.querySelector('img');
            if (img) img.style.transform = `translateY(${window.scrollY * 0.25}px)`;
        }
    }, { passive: true });

    // ── SHOWREEL PLAY ─────────────────────
    const showreelOverlay = document.getElementById('showreel-overlay');
    const showreelVideo = document.getElementById('showreel-video');

    if (showreelOverlay && showreelVideo) {

        function startPlay() {
            showreelOverlay.classList.add('hidden');
            showreelVideo.muted = false;
            const p = showreelVideo.play();
            if (p !== undefined) {
                p.catch(() => {
                    showreelVideo.muted = true;
                    showreelVideo.play();
                });
            }
        }

        let isTouched = false;

        showreelOverlay.addEventListener('touchstart', (e) => {
            e.preventDefault();
            isTouched = true;
            startPlay();
        }, { passive: false });

        showreelOverlay.addEventListener('click', () => {
            if (!isTouched) startPlay();
            isTouched = false;
        });

        showreelVideo.addEventListener('click', () => {
            if (!showreelVideo.paused) {
                showreelVideo.pause();
                showreelOverlay.classList.remove('hidden');
            }
        });
    }

    // ── CONTACT FORM ──────────────────────
    const ctaForm = document.getElementById('cta-form');
    if (ctaForm) {
        ctaForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = document.getElementById('contact-input');
            const btn = document.getElementById('cta-submit-btn');
            if (!input || !input.value.trim()) return;

            btn.innerHTML = '✓ Отправлено';
            btn.style.background = 'linear-gradient(135deg, #10B981, #059669)';
            input.value = '';
            setTimeout(() => {
                btn.innerHTML = 'Написать <svg class="arrow" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>';
                btn.style.background = '';
            }, 3000);
        });
    }

    // ── STAGGER SERVICE CARDS ─────────────
    document.querySelectorAll('.service-card, .testimonial-card').forEach((card, i) => {
        card.style.transitionDelay = (i * 80) + 'ms';
    });

});
