    // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Navbar scroll effect
        window.addEventListener('scroll', function() {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Intersection Observer for fade-in animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Animate skill bars when skills section is visible
                    if (entry.target.classList.contains('skills')) {
                        const skillBars = entry.target.querySelectorAll('.skill-progress');
                        skillBars.forEach(bar => {
                            const width = bar.getAttribute('data-width');
                            setTimeout(() => {
                                bar.style.width = width;
                            }, 300);
                        });
                    }
                }
            });
        }, observerOptions);

        // Observe all fade-in elements
        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });

        // Contact form submission - Fixed to target the correct form
        document.querySelector('form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value
            };
            
            // Simulate form submission
            const submitBtn = document.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.textContent = 'Message Sent!';
                submitBtn.style.background = '#4CAF50';
                
                // Reset form
                this.reset();
                
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                }, 2000);
            }, 1000);
        });

        // Add some interactive hover effects
        document.querySelectorAll('.project-card, .skill-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Parallax effect for hero section
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            if (hero) {
                hero.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
        });

        // Dark theme toggle functionality - FIXED VERSION
        const themeToggle = document.getElementById('themeToggle');
        const body = document.body;

        // Check for saved theme preference or default to light mode
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark-theme') {
            body.classList.add('dark-theme');
            updateThemeToggle();
        }

        themeToggle.addEventListener('click', function() {
            body.classList.toggle('dark-theme');
            updateThemeToggle();
            
            // Save theme preference
            const currentTheme = body.classList.contains('dark-theme') ? 'dark-theme' : '';
            localStorage.setItem('theme', currentTheme);
        });

        function updateThemeToggle() {
            const isDarkMode = body.classList.contains('dark-theme');
            themeToggle.textContent = isDarkMode ? '☀️' : '🌙';
            themeToggle.setAttribute('aria-label', isDarkMode ? 'Switch to light mode' : 'Switch to dark mode');
        }

            // Initialize theme toggle on page load
            document.addEventListener('DOMContentLoaded', function() {
                updateThemeToggle();
            });