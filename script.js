document.addEventListener('DOMContentLoaded', function() {
    const accordionItems = document.querySelectorAll('.accordion-item');
    const navLinks = document.querySelectorAll('nav a');
    const searchInput = document.getElementById('search-input');
    const themeToggle = document.getElementById('theme-toggle');

    // --- 1. Accordion & Navigasi Aktif Logic ---
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        
        header.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Tutup semua item accordion lainnya & hapus class active dari nav
            accordionItems.forEach(i => i.classList.remove('active'));
            navLinks.forEach(link => link.classList.remove('active'));

            // Jika item belum aktif, buat menjadi aktif
            if (!isActive) {
                item.classList.add('active');
                
                // Tandai link navigasi yang sesuai sebagai aktif
                const itemId = item.id;
                const activeLink = document.querySelector(`a[data-section="${itemId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    });

    // --- 2. Smooth Scrolling & Navigasi Aktif (pada klik) ---
    navLinks.forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');

        // Jika link menuju halaman lain (bukan anchor di halaman ini), biarkan default
        if (!targetId.startsWith('#')) {
            return; // biarkan browser membuka halaman baru
        }

        // Jika menuju anchor di halaman ini (#section), cegah reload dan lakukan smooth scroll
        e.preventDefault();
        const targetElement = document.querySelector(targetId);


            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
                
                // Logic untuk membuka accordion dan menandai nav aktif
                if (targetElement.classList.contains('accordion-item')) {
                    accordionItems.forEach(i => i.classList.remove('active'));
                    navLinks.forEach(link => link.classList.remove('active'));
                    
                    targetElement.classList.add('active');
                    this.classList.add('active');
                }
            }
        });
    });

    // --- 3. Dark Mode Toggle ---
    if (themeToggle) {
        // Atur ikon awal berdasarkan status dark mode dari script di <head>
        const isDarkMode = document.documentElement.classList.contains('dark-mode');
        themeToggle.querySelector('i').className = isDarkMode ? 'fas fa-sun' : 'fas fa-moon';

        themeToggle.addEventListener('click', () => {
            document.documentElement.classList.toggle('dark-mode');
            const isDark = document.documentElement.classList.contains('dark-mode');

            // Simpan preferensi pengguna
            localStorage.setItem('theme', isDark ? 'dark' : 'light');

            // Ganti ikon toggle
            themeToggle.querySelector('i').className = isDark ? 'fas fa-sun' : 'fas fa-moon';
        });
    }

    // --- 4. Search Bar (Filter Sederhana) ---
    if (searchInput) {
        searchInput.addEventListener('keyup', function() {
            const searchTerm = searchInput.value.toLowerCase();

            accordionItems.forEach(item => {
                const headerText = item.querySelector('h3').textContent.toLowerCase();
                const contentText = item.querySelector('.accordion-content').textContent.toLowerCase();
                
                // Cari di judul atau konten
                if (headerText.includes(searchTerm) || contentText.includes(searchTerm)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }
});