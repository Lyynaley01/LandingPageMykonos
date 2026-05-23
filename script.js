        // --- 0. SOLUSI TOTAL AGAR REFRESH TIDAK JUMP KE TESTIMONI ---
        // Matikan sistem auto-restore bawaan browser
        if (history.scrollRestoration) {
            history.scrollRestoration = 'manual';
        }

        // Jalankan pemaksaan scroll atas sesegera mungkin
        window.scrollTo(0, 0);

        // Jalankan ulang begitu struktur HTML sepenuhnya siap (mencegah bentrok render)
        window.addEventListener('DOMContentLoaded', () => {
            window.scrollTo(0, 0);
        });

        // Jalankan sekali lagi dengan sedikit jeda (mengakali browser agresif/lambat loading)
        window.addEventListener('load', () => {
            setTimeout(() => {
                window.scrollTo(0, 0);
            }, 50); 
        });

        // --- 1. LOGIK INTERAKTIF MODAL ---
        const openModalBtn = document.getElementById('openModalBtn');
        const closeModalBtn = document.getElementById('closeModalBtn');
        const modalOverlay = document.getElementById('modalOverlay');

        openModalBtn.addEventListener('click', () => {
            modalOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        closeModalBtn.addEventListener('click', () => {
            modalOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        });

        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                modalOverlay.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });

        // --- 2. LOGIK ANIMASI TEXT MUNCUL SAAT DI-SCROLL ---
        const revealElements = document.querySelectorAll('.reveal');

        const revealOnScroll = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: "0px 0px -50px 0px"
        });

        revealElements.forEach(element => {
            revealOnScroll.observe(element);
        });