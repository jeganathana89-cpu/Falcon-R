 document.addEventListener('DOMContentLoaded', () => {

      // ===== NAVBAR: sticky scroll effect =====
      const header = document.getElementById('header');
      window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 50);
      });

      // ===== NAVBAR: mobile menu toggle =====
      function toggleMenu() {
        document.getElementById('mobileMenu').classList.toggle('open');
      }
      function closeMenu() {
        document.getElementById('mobileMenu').classList.remove('open');
      }

      document.getElementById('hamburger').addEventListener('click', toggleMenu);

      // Close on outside click
      document.addEventListener('click', function(e) {
        const menu = document.getElementById('mobileMenu');
        const hamburger = document.getElementById('hamburger');
        if (menu.classList.contains('open') && !menu.contains(e.target) && !hamburger.contains(e.target)) {
          closeMenu();
        }
      });

      // Close on mobile menu link click
      document.querySelectorAll('#mobileMenu a').forEach(link => {
        link.addEventListener('click', closeMenu);
      });

      // ===== Scroll Animations =====
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

      document.querySelectorAll('.fade-in-section').forEach(el => observer.observe(el));

      // ===== Service Navigation =====
      const serviceNavBtns = document.querySelectorAll('.service-nav-btn');
      const serviceDetailCards = document.querySelectorAll('.service-detail-card');

      serviceNavBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          const targetService = btn.getAttribute('data-service');
          serviceNavBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          serviceDetailCards.forEach(card => card.classList.remove('active'));
          const targetCard = document.querySelector(`.service-detail-card[data-service="${targetService}"]`);
          if (targetCard) targetCard.classList.add('active');
        });
      });

      // ===== Workflow Slider =====
      const workflowSlides = document.querySelectorAll('.workflow-slide');
      let currentSlide = 0;

      function updateSlides(index) {
        workflowSlides.forEach((slide, i) => slide.classList.toggle('active', i === index));
      }

      document.getElementById('workflow-prev').addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + workflowSlides.length) % workflowSlides.length;
        updateSlides(currentSlide);
      });

      document.getElementById('workflow-next').addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % workflowSlides.length;
        updateSlides(currentSlide);
      });

      // ===== FAQ Accordion =====
      document.querySelectorAll('.faq-question-item').forEach(item => {
        item.querySelector('.faq-question-header').addEventListener('click', () => {
          document.querySelectorAll('.faq-question-item').forEach(i => { if (i !== item) i.classList.remove('active'); });
          item.classList.toggle('active');
        });
      });

      // ===== Work Skills Animation =====
      const skillsSection = document.getElementById('work-skills');
      if (skillsSection && typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        ScrollTrigger.create({
          trigger: "#work-skills",
          start: "top 70%",
          onEnter: () => {
            document.querySelectorAll('#work-skills .circle-fill').forEach(circle => {
              const pct = circle.getAttribute('data-pct');
              const offset = 251.2 - (251.2 * pct) / 100;
              gsap.to(circle, { strokeDashoffset: offset, duration: 2, ease: "power2.out" });
            });
            document.querySelectorAll('#work-skills .skill-percent').forEach(el => {
              const target = parseInt(el.textContent);
              let obj = { val: 0 };
              gsap.to(obj, { val: target, duration: 2, ease: "power2.out", onUpdate: () => { el.textContent = Math.round(obj.val) + "%"; } });
            });
          }
        });
        gsap.to(".overlay-card", { y: -15, duration: 2, repeat: -1, yoyo: true, ease: "sine.inOut", stagger: 0.5 });
      }
    });