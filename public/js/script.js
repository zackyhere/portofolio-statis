document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const sidebar = document.getElementById('sidebar');
    const header = document.getElementById('main-header');
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const themeIcon = themeToggle.querySelector('svg');

    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'light') {
        body.classList.remove('dark-mode');
        themeIcon.dataset.feather = 'moon';
        feather.replace();
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');

        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            themeToggle.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-sun"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>';
            themeToggle.querySelector('svg').style.color = 'var(--accent)';
        } else {
            localStorage.setItem('theme', 'light');
            themeToggle.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-moon"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>';
        }
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const methodBtns = document.querySelectorAll('.method-btn');
    const form = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');

    let selectedMethod = 'wa';

    methodBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            methodBtns.forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-pressed', 'false');
            });

            btn.classList.add('active');
            btn.setAttribute('aria-pressed', 'true');

            selectedMethod = btn.dataset.method;
        });
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        document.querySelectorAll('.form-group').forEach(g => g.classList.remove('error'));

        const name = nameInput.value.trim();
        const subject = subjectInput.value.trim();
        const message = messageInput.value.trim();
        let isValid = true;

        if (!name) {
            nameInput.parentElement.classList.add('error');
            isValid = false;
        }

        if (!message) {
            messageInput.parentElement.classList.add('error');
            isValid = false;
        }

        if (!isValid) return;

        const fullMessage = `Name: ${name}\nSubject: ${subject || 'No Subject'}\n\n${message}`;
        const encodedMessage = encodeURIComponent(fullMessage);
        const encodedSubject = encodeURIComponent(subject || 'Inquiry from Portfolio');

        let url = '';

        switch (selectedMethod) {
            case 'wa':
                url = `https://wa.me/6281554269688?text=${encodedMessage}`;
                break;

            case 'telegram':
                url = `https://t.me/zackyy425?text=${encodedMessage}`;
                break;

            case 'gmail':
                url = `mailto:zackyy425@gmail.com?subject=${encodedSubject}&body=${encodedMessage}`;
                break;
        }

        if (url) {
            window.location.href = url;
        }
    });
});