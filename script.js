document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links a');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        // Animate hamburger icon
        hamburger.innerHTML = navLinks.classList.contains('active')
            ? '<i class="fa-solid fa-xmark"></i>'
            : '<i class="fa-solid fa-bars"></i>';
    });

    // Close mobile menu when clicking a link
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.innerHTML = '<i class="fa-solid fa-bars"></i>';
        });
    });

    // Sticky Header Scroll Effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(2, 12, 27, 0.95)';
            header.style.padding = '1rem 5%';
        } else {
            header.style.background = 'rgba(2, 12, 27, 0.85)';
            header.style.padding = '1.5rem 5%';
        }
    });

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // Appointment Form Handling
    const form = document.getElementById('appointmentForm');
    const successModal = document.getElementById('successModal');
    const closeModal = document.getElementById('closeModal');
    const submitBtn = form.querySelector('.btn-submit');
    const originalBtnText = submitBtn.innerHTML;

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Basic Validation
        const inputs = form.querySelectorAll('input, select, textarea');
        let isValid = true;

        inputs.forEach(input => {
            if (input.hasAttribute('required') && !input.value.trim()) {
                isValid = false;
                input.style.borderColor = 'red';
            } else {
                input.style.borderColor = 'rgba(255, 255, 255, 0.1)';
            }
        });

        if (!isValid) return;

        // Show processing state
        submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Preparing...';
        submitBtn.disabled = true;

        setTimeout(() => {
            // Construct Mailto Link
            const targetEmail = "almoizzbuilders@gmail.com";

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const service = document.getElementById('service').value;
            const date = document.getElementById('date').value;
            const message = document.getElementById('message').value;

            const subject = `Appointment Request from ${name}`;

            // Format body for email client
            const body = `Name: ${name}%0D%0A` +
                `Email: ${email}%0D%0A` +
                `Phone: ${phone}%0D%0A` +
                `Service: ${service}%0D%0A` +
                `Preferred Date: ${date}%0D%0A%0D%0A` +
                `Message:%0D%0A${message}`;

            // Open default email client
            window.location.href = `mailto:${targetEmail}?subject=${encodeURIComponent(subject)}&body=${body}`;

            // Show Success State
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;

            // Show Success Modal
            const successContent = successModal.querySelector('.modal-content');
            successContent.innerHTML = `
                <div class="success-icon"><i class="fa-solid fa-paper-plane"></i></div>
                <h3>One Last Step!</h3>
                <p>We've opened your email app with the details.</p>
                <p style="color: var(--primary-color); font-weight: 600;">Please click SEND in your email app to complete the booking.</p>
                <button id="closeModalNew" class="btn-primary" style="margin-top: 1rem;">Close</button>
            `;

            successModal.style.display = 'flex';

            // Bind new close button
            document.getElementById('closeModalNew').addEventListener('click', () => {
                successModal.style.display = 'none';
            });

        }, 800);
    });

    // Close Modal Logic (Initial Bind)
    if (closeModal) {
        closeModal.addEventListener('click', () => {
            successModal.style.display = 'none';
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target == successModal) {
            successModal.style.display = 'none';
        }
    });

    // Intersection Observer for Animations
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.service-card, .section-header, .about-content, .booking-info').forEach(el => {
        el.style.opacity = '0';
        el.classList.remove('animate-up');
        observer.observe(el);
    });
});
