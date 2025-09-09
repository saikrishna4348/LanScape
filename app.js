document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    // Enhanced Mobile Menu Toggle with animation
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            const isHidden = mobileMenu.classList.contains('hidden');
            if (isHidden) {
                mobileMenu.classList.remove('hidden');
                mobileMenu.style.maxHeight = '0px';
                mobileMenu.style.opacity = '0';
                setTimeout(() => {
                    mobileMenu.style.maxHeight = '300px';
                    mobileMenu.style.opacity = '1';
                }, 10);
            } else {
                mobileMenu.style.maxHeight = '0px';
                mobileMenu.style.opacity = '0';
                setTimeout(() => {
                    mobileMenu.classList.add('hidden');
                }, 300);
            }
        });
    }
    
    // Enhanced Animate on Scroll with better performance
    const animatedElements = document.querySelectorAll('.fade-in-up');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    animatedElements.forEach(el => observer.observe(el));

    // Enhanced form submission with better UX
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                alert('Thank you for your message! We will get back to you within 24 hours.');
                contactForm.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }

    // Add smooth scrolling to anchor links
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

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (mobileMenu && !mobileMenu.contains(e.target) && !mobileMenuButton.contains(e.target)) {
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.style.maxHeight = '0px';
                mobileMenu.style.opacity = '0';
                setTimeout(() => {
                    mobileMenu.classList.add('hidden');
                }, 300);
            }
        }
    });

    // Highlight active navigation based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath === currentPage || (currentPage === '' && linkPath === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});

let lastScrollY = window.scrollY;
const header = document.getElementById('main-header');

window.addEventListener('scroll', () => {
    if (window.scrollY > lastScrollY && window.scrollY > 80) {
        // Scrolling down
        header.style.transform = 'translateY(-100%)';
        header.style.transition = 'transform 0.3s cubic-bezier(0.4,0,0.2,1)';
    } else {
        // Scrolling up
        header.style.transform = 'translateY(0)';
        header.style.transition = 'transform 0.3s cubic-bezier(0.4,0,0.2,1)';
    }
    lastScrollY = window.scrollY;
});


// Simplified Working Carousel functionality
document.addEventListener('DOMContentLoaded', () => {
    const carouselTrack = document.querySelector('.carousel-track');
    const carouselSlides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    const indicators = document.querySelectorAll('.carousel-indicator');
    const carouselWrapper = document.querySelector('.carousel-wrapper');
    
    if (!carouselTrack || carouselSlides.length === 0) return;
    
    let currentSlide = 0;
    const totalSlides = carouselSlides.length;
    let isTransitioning = false;
    
    // Function to update carousel position
    const updateCarousel = () => {
        if (isTransitioning) return;
        
        isTransitioning = true;
        
        // Simple percentage-based transform
        const translateXPercent = -(currentSlide * (100 / totalSlides));
        carouselTrack.style.transform = `translateX(${translateXPercent}%)`;
        
        // Update indicators
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentSlide);
        });
        
        console.log(`Moving to slide ${currentSlide}, translateX: ${translateXPercent}%`);
        
        // Reset transition flag after animation
        setTimeout(() => {
            isTransitioning = false;
        }, 500);
    };
    
    // Next slide function
    const nextSlide = () => {
        if (isTransitioning) return;
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel();
    };
    
    // Previous slide function
    const prevSlide = () => {
        if (isTransitioning) return;
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateCarousel();
    };
    
    // Event listeners
    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            nextSlide();
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            prevSlide();
        });
    }
    
    // Indicator click handlers
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', (e) => {
            e.preventDefault();
            if (isTransitioning) return;
            currentSlide = index;
            updateCarousel();
        });
    });
    
    // Touch/swipe support
    let startX = 0;
    let isDragging = false;
    
    if (carouselWrapper) {
        carouselWrapper.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
        }, { passive: true });
        
        carouselWrapper.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            
            const currentX = e.touches[0].clientX;
            const diffX = Math.abs(currentX - startX);
            
            if (diffX > 10) {
                e.preventDefault();
            }
        }, { passive: false });
        
        carouselWrapper.addEventListener('touchend', (e) => {
            if (!isDragging) return;
            isDragging = false;
            
            const endX = e.changedTouches[0].clientX;
            const diff = startX - endX;
            
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
            }
        }, { passive: true });
    }
    
    // Auto-play
    let autoPlay = setInterval(nextSlide, 5000);
    
    if (carouselWrapper) {
        carouselWrapper.addEventListener('mouseenter', () => {
            clearInterval(autoPlay);
        });
        
        carouselWrapper.addEventListener('mouseleave', () => {
            autoPlay = setInterval(nextSlide, 5000);// Ultra Smooth Website with Carousel - Complete JavaScript
document.addEventListener('DOMContentLoaded', () => {
    
    // Enhanced smooth scrolling configuration
    const smoothScrollConfig = {
        duration: 800,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        offset: 100, // Account for fixed header
        mobile: {
            duration: 600,
            easing: 'cubic-bezier(0.23, 1, 0.32, 1)'
        }
    };
    
    // Detect if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Enhanced easing function for custom scrolling
    const easeOutCubic = (t) => {
        return 1 - Math.pow(1 - t, 3);
    };
    
    const easeInOutCubic = (t) => {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };
    
    // Custom smooth scroll function with momentum
    const smoothScrollTo = (targetY, duration = 800, easing = easeOutCubic, callback = null) => {
        if (prefersReducedMotion) {
            window.scrollTo(0, targetY);
            if (callback) callback();
            return;
        }
        
        const startY = window.pageYOffset;
        const distance = targetY - startY;
        const startTime = performance.now();
        
        let rafId;
        
        const scroll = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easing(progress);
            
            const currentY = startY + distance * easedProgress;
            window.scrollTo(0, currentY);
            
            if (progress < 1) {
                rafId = requestAnimationFrame(scroll);
            } else {
                if (callback) callback();
                // Ensure we end exactly at target
                window.scrollTo(0, targetY);
            }
        };
        
        rafId = requestAnimationFrame(scroll);
        
        // Return a function to cancel the animation
        return () => cancelAnimationFrame(rafId);
    };
    
    // Enhanced anchor link smooth scrolling
    const initSmoothAnchorLinks = () => {
        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        
        anchorLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                
                // Skip empty hashes
                if (href === '#' || href === '#!') return;
                
                const targetElement = document.querySelector(href);
                if (!targetElement) return;
                
                e.preventDefault();
                
                // Calculate target position with offset
                const targetY = targetElement.offsetTop - smoothScrollConfig.offset;
                const isMobile = window.innerWidth < 768;
                const config = isMobile ? smoothScrollConfig.mobile : smoothScrollConfig;
                
                // Visual feedback on link
                link.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    link.style.transform = '';
                }, 150);
                
                // Perform smooth scroll
                smoothScrollTo(targetY, config.duration, easeInOutCubic, () => {
                    // Update URL after scroll completes
                    history.pushState(null, null, href);
                    
                    // Focus target element for accessibility
                    targetElement.focus({ preventScroll: true });
                    
                    // Add visual highlight to target
                    targetElement.style.boxShadow = '0 0 20px rgba(37, 99, 235, 0.3)';
                    setTimeout(() => {
                        targetElement.style.boxShadow = '';
                    }, 1000);
                });
            });
        });
    };
    
    // Scroll-to-top functionality
    const initScrollToTop = () => {
        // Create scroll-to-top button if it doesn't exist
        let scrollToTopBtn = document.querySelector('.scroll-to-top');
        if (!scrollToTopBtn) {
            scrollToTopBtn = document.createElement('button');
            scrollToTopBtn.className = 'scroll-to-top';
            scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
            scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
            document.body.appendChild(scrollToTopBtn);
        }
        
        // Show/hide button based on scroll position
        const toggleScrollToTop = () => {
            const scrolled = window.pageYOffset > 300;
            scrollToTopBtn.classList.toggle('visible', scrolled);
        };
        
        // Smooth scroll to top
        scrollToTopBtn.addEventListener('click', () => {
            smoothScrollTo(0, 1000, easeInOutCubic);
        });
        
        // Throttled scroll listener for performance
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    toggleScrollToTop();
                    ticking = false;
                });
                ticking = true;
            }
        });
    };
    
    // Enhanced page loading animation
    const initPageLoader = () => {
        // Create page loader if it doesn't exist
        let pageLoader = document.querySelector('.page-loader');
        if (!pageLoader) {
            pageLoader = document.createElement('div');
            pageLoader.className = 'page-loader';
            pageLoader.innerHTML = '<div class="spinner"></div>';
            document.body.appendChild(pageLoader);
        }
        
        // Add loading class to body
        document.body.classList.add('loading');
        
        // Hide loader when page is fully loaded
        window.addEventListener('load', () => {
            setTimeout(() => {
                pageLoader.classList.add('hidden');
                document.body.classList.remove('loading');
                
                // Remove loader from DOM after animation
                setTimeout(() => {
                    if (pageLoader.parentNode) {
                        pageLoader.parentNode.removeChild(pageLoader);
                    }
                }, 600);
            }, 300);
        });
    };
    
    // Enhanced header scroll behavior
    const initHeaderScrollBehavior = () => {
        const header = document.getElementById('main-header');
        if (!header) return;
        
        let lastScrollTop = 0;
        let ticking = false;
        
        const updateHeader = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollDirection = scrollTop > lastScrollTop ? 'down' : 'up';
            
            // Add/remove scrolled class for styling
            header.classList.toggle('scrolled', scrollTop > 50);
            
            // Hide/show header based on scroll direction (optional)
            if (scrollTop > 100) {
                header.style.transform = scrollDirection === 'down' ? 'translateY(-100%)' : 'translateY(0)';
            } else {
                header.style.transform = 'translateY(0)';
            }
            
            lastScrollTop = scrollTop;
        };
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    updateHeader();
                    ticking = false;
                });
                ticking = true;
            }
        });
    };
    
    // Enhanced section scroll animations
    const initScrollAnimations = () => {
        const animatedElements = document.querySelectorAll('.fade-in-up');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Add staggered animation to children
                    const children = entry.target.querySelectorAll('.stagger-children > *');
                    children.forEach((child, index) => {
                        child.style.transitionDelay = `${index * 100}ms`;
                        child.classList.add('visible');
                    });
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        animatedElements.forEach(el => observer.observe(el));
    };
    
    // Enhanced Mobile Menu Toggle with animation
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            const isHidden = mobileMenu.classList.contains('hidden');
            if (isHidden) {
                mobileMenu.classList.remove('hidden');
                mobileMenu.style.maxHeight = '0px';
                mobileMenu.style.opacity = '0';
                setTimeout(() => {
                    mobileMenu.style.maxHeight = '300px';
                    mobileMenu.style.opacity = '1';
                }, 10);
            } else {
                mobileMenu.style.maxHeight = '0px';
                mobileMenu.style.opacity = '0';
                setTimeout(() => {
                    mobileMenu.classList.add('hidden');
                }, 300);
            }
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (mobileMenu && !mobileMenu.contains(e.target) && !mobileMenuButton.contains(e.target)) {
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.style.maxHeight = '0px';
                mobileMenu.style.opacity = '0';
                setTimeout(() => {
                    mobileMenu.classList.add('hidden');
                }, 300);
            }
        }
    });
    
    // Highlight active navigation based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath === currentPage || (currentPage === '' && linkPath === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    // Ultra Smooth Carousel functionality
    const carouselTrack = document.querySelector('.carousel-track');
    const carouselSlides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    const indicators = document.querySelectorAll('.carousel-indicator');
    const carouselWrapper = document.querySelector('.carousel-wrapper');
    
    if (carouselTrack && carouselSlides.length > 0) {
        let currentSlide = 0;
        const totalSlides = carouselSlides.length;
        let isTransitioning = false;
        let touchStartX = 0;
        let touchStartTime = 0;
        let autoPlayInterval;
        let direction = 1; // 1 for forward, -1 for backward
        
        // Enhanced easing functions
        const easingFunctions = {
            smooth: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            bounce: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
            fast: 'cubic-bezier(0.23, 1, 0.32, 1)',
            slow: 'cubic-bezier(0.19, 1, 0.22, 1)'
        };
        
        // Smooth transition durations based on interaction type
        const transitionDurations = {
            click: 800,
            swipe: 600,
            auto: 1000,
            indicator: 700
        };
        
        // Preload next/previous slides for smoother transitions
        const preloadSlides = () => {
            carouselSlides.forEach((slide, index) => {
                const images = slide.querySelectorAll('img');
                images.forEach(img => {
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                    }
                });
            });
        };
        
        // Enhanced update function with smooth animations
        const updateCarousel = (transitionType = 'click', customDirection = null) => {
            if (isTransitioning) return;
            
            isTransitioning = true;
            direction = customDirection || direction;
            
            // Apply appropriate transition style
            carouselTrack.style.transition = `transform ${transitionDurations[transitionType]}ms ${easingFunctions.smooth}`;
            
            // Add entrance animations
            carouselSlides.forEach((slide, index) => {
                slide.classList.remove('entering-right', 'entering-left');
                if (index === currentSlide) {
                    slide.classList.add(direction > 0 ? 'entering-right' : 'entering-left');
                }
            });
            
            // Smooth percentage-based transform with momentum
            const translateXPercent = -(currentSlide * (100 / totalSlides));
            
            // Apply transform with hardware acceleration
            requestAnimationFrame(() => {
                carouselTrack.style.transform = `translate3d(${translateXPercent}%, 0, 0)`;
            });
            
            // Update indicators with staggered animation
            indicators.forEach((indicator, index) => {
                setTimeout(() => {
                    indicator.classList.toggle('active', index === currentSlide);
                }, index * 50); // Stagger indicator updates
            });
            
            // Visual feedback for buttons
            if (transitionType === 'click') {
                const activeBtn = direction > 0 ? nextBtn : prevBtn;
                if (activeBtn) {
                    activeBtn.style.transform = 'scale(0.9) translateY(-50%)';
                    setTimeout(() => {
                        activeBtn.style.transform = 'scale(1) translateY(-50%)';
                    }, 150);
                }
            }
            
            console.log(`Smooth transition to slide ${currentSlide}, translateX: ${translateXPercent}%, type: ${transitionType}`);
            
            // Reset transition flag with proper timing
            setTimeout(() => {
                isTransitioning = false;
                // Reset transition for better performance
                carouselTrack.style.transition = '';
            }, transitionDurations[transitionType]);
        };
        
        // Enhanced next slide with momentum
        const nextSlide = (transitionType = 'click') => {
            if (isTransitioning) return;
            direction = 1;
            currentSlide = (currentSlide + 1) % totalSlides;
            updateCarousel(transitionType, direction);
        };
        
        // Enhanced previous slide with momentum
        const prevSlide = (transitionType = 'click') => {
            if (isTransitioning) return;
            direction = -1;
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            updateCarousel(transitionType, direction);
        };
        
        // Smooth indicator navigation
        const goToSlide = (slideIndex, transitionType = 'indicator') => {
            if (isTransitioning || slideIndex === currentSlide) return;
            direction = slideIndex > currentSlide ? 1 : -1;
            currentSlide = slideIndex;
            updateCarousel(transitionType, direction);
        };
        
        // Enhanced button event listeners
        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.preventDefault();
                nextSlide('click');
            });
            
            // Button hover preview
            nextBtn.addEventListener('mouseenter', () => {
                if (!isTransitioning) {
                    nextBtn.style.transform = 'scale(1.1) translateY(-50%)';
                }
            });
            
            nextBtn.addEventListener('mouseleave', () => {
                if (!isTransitioning) {
                    nextBtn.style.transform = 'scale(1) translateY(-50%)';
                }
            });
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.preventDefault();
                prevSlide('click');
            });
            
            // Button hover preview
            prevBtn.addEventListener('mouseenter', () => {
                if (!isTransitioning) {
                    prevBtn.style.transform = 'scale(1.1) translateY(-50%)';
                }
            });
            
            prevBtn.addEventListener('mouseleave', () => {
                if (!isTransitioning) {
                    prevBtn.style.transform = 'scale(1) translateY(-50%)';
                }
            });
        }
        
        // Enhanced indicator interactions
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', (e) => {
                e.preventDefault();
                goToSlide(index, 'indicator');
            });
        });
        
        // Smooth touch/swipe with momentum
        let touchMomentum = 0;
        let lastTouchX = 0;
        let touchVelocity = 0;
        
        if (carouselWrapper) {
            carouselWrapper.addEventListener('touchstart', (e) => {
                touchStartX = e.touches[0].clientX;
                lastTouchX = touchStartX;
                touchStartTime = Date.now();
                touchMomentum = 0;
                touchVelocity = 0;
            }, { passive: true });
            
            carouselWrapper.addEventListener('touchmove', (e) => {
                const currentX = e.touches[0].clientX;
                const currentTime = Date.now();
                const deltaX = currentX - lastTouchX;
                const deltaTime = currentTime - touchStartTime;
                
                touchVelocity = deltaX / deltaTime;
                lastTouchX = currentX;
                
                // Smooth follow-finger effect (optional)
                const diffX = Math.abs(currentX - touchStartX);
                if (diffX > 10) {
                    e.preventDefault();
                }
            }, { passive: false });
            
            carouselWrapper.addEventListener('touchend', (e) => {
                const endX = e.changedTouches[0].clientX;
                const endTime = Date.now();
                const diff = touchStartX - endX;
                const timeDiff = endTime - touchStartTime;
                const velocity = Math.abs(diff) / timeDiff;
                
                // Enhanced swipe detection with momentum
                const minSwipeDistance = 30;
                const minVelocity = 0.3;
                
                if (Math.abs(diff) > minSwipeDistance || velocity > minVelocity) {
                    if (diff > 0) {
                        nextSlide('swipe');
                    } else {
                        prevSlide('swipe');
                    }
                }
            }, { passive: true });
        }
        
        // Smooth auto-play with pause on interaction
        const startAutoPlay = () => {
            stopAutoPlay();
            autoPlayInterval = setInterval(() => {
                nextSlide('auto');
            }, 6000);
        };
        
        const stopAutoPlay = () => {
            if (autoPlayInterval) {
                clearInterval(autoPlayInterval);
                autoPlayInterval = null;
            }
        };
        
        // Enhanced hover controls
        if (carouselWrapper) {
            carouselWrapper.addEventListener('mouseenter', () => {
                stopAutoPlay();
                // Subtle hover effect on wrapper
                carouselWrapper.style.transform = 'scale(1.01)';
            });
            
            carouselWrapper.addEventListener('mouseleave', () => {
                startAutoPlay();
                carouselWrapper.style.transform = 'scale(1)';
            });
        }
        
        // Keyboard navigation with smooth transitions
        document.addEventListener('keydown', (e) => {
            if (!carouselWrapper || !carouselWrapper.contains(document.activeElement)) return;
            
            switch (e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    prevSlide('click');
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    nextSlide('click');
                    break;
                case 'Home':
                    e.preventDefault();
                    goToSlide(0, 'indicator');
                    break;
                case 'End':
                    e.preventDefault();
                    goToSlide(totalSlides - 1, 'indicator');
                    break;
            }
        });
        
        // Smooth resize handling for carousel
        let carouselResizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(carouselResizeTimeout);
            carouselResizeTimeout = setTimeout(() => {
                // Temporarily disable transitions during resize
                carouselTrack.style.transition = 'none';
                updateCarousel('click');
                
                // Re-enable transitions
                setTimeout(() => {
                    carouselTrack.style.transition = '';
                }, 50);
            }, 250);
        });
        
        // Initialize carousel with smooth entrance
        preloadSlides();
        updateCarousel('auto');
        
        // Start auto-play after initial load
        setTimeout(startAutoPlay, 1000);
        
        // Intersection Observer for carousel performance
        const carouselObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startAutoPlay();
                } else {
                    stopAutoPlay();
                }
            });
        }, { threshold: 0.3 });
        
        if (carouselWrapper) {
            carouselObserver.observe(carouselWrapper);
        }
    }
    
    // Enhanced form submission with better UX
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                alert('Thank you for your message! We will get back to you within 24 hours.');
                contactForm.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
    
    // Handle URL hash on page load
    const handleInitialHash = () => {
        const hash = window.location.hash;
        if (hash && hash !== '#') {
            const targetElement = document.querySelector(hash);
            if (targetElement) {
                // Delay to ensure page is fully rendered
                setTimeout(() => {
                    const targetY = targetElement.offsetTop - smoothScrollConfig.offset;
                    smoothScrollTo(targetY, 1000, easeInOutCubic);
                }, 500);
            }
        }
    };
    
    // Handle browser back/forward buttons
    window.addEventListener('popstate', (e) => {
        const hash = window.location.hash;
        if (hash && hash !== '#') {
            const targetElement = document.querySelector(hash);
            if (targetElement) {
                const targetY = targetElement.offsetTop - smoothScrollConfig.offset;
                smoothScrollTo(targetY, 600, easeInOutCubic);
            }
        } else {
            smoothScrollTo(0, 600, easeInOutCubic);
        }
    });
    
    // Enhanced resize handler
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Recalculate positions after resize
            const hash = window.location.hash;
            if (hash && hash !== '#') {
                const targetElement = document.querySelector(hash);
                if (targetElement) {
                    const targetY = targetElement.offsetTop - smoothScrollConfig.offset;
                    window.scrollTo(0, targetY);
                }
            }
        }, 250);
    });
    
    // Add keyboard navigation enhancement for website
    document.addEventListener('keydown', (e) => {
        switch (e.key) {
            case 'Home':
                if (e.ctrlKey) {
                    e.preventDefault();
                    smoothScrollTo(0, 800, easeInOutCubic);
                }
                break;
            case 'End':
                if (e.ctrlKey) {
                    e.preventDefault();
                    const maxY = document.body.scrollHeight - window.innerHeight;
                    smoothScrollTo(maxY, 800, easeInOutCubic);
                }
                break;
        }
    });
    
    // Initialize all smooth scrolling features
    initPageLoader();
    initSmoothAnchorLinks();
    initScrollToTop();
    initHeaderScrollBehavior();
    initScrollAnimations();
    
    // Handle initial page load
    setTimeout(handleInitialHash, 100);
    
    console.log('✨ Ultra-smooth website with carousel initialized successfully!');
});

// Enhanced mobile touch scrolling (iOS momentum scrolling)
document.addEventListener('touchstart', () => {}, { passive: true });

// Performance monitoring for smooth scrolling
if ('PerformanceObserver' in window) {
    const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
            if (entry.name === 'scroll') {
                console.log(`Scroll performance: ${entry.duration.toFixed(2)}ms`);
            }
        }
    });
    
    observer.observe({ entryTypes: ['measure'] });
}

        });
    }
    
    // Initialize carousel
    updateCarousel();
    
    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            updateCarousel();
        }, 250);
    });
});
