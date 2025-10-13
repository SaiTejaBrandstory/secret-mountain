// GSAP is ready to use!
console.log('GSAP loaded:', gsap.version);

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Create animation timeline
const tl = gsap.timeline();

// 1. Black screen for 2 seconds
tl.to({}, {
    duration: 1
})
// 2. Logo appears (fade in)
.to('.logo', {
    duration: 1,
    opacity: 1,
    scale: 1,
    ease: 'power3.out'
})
// 2. Logo stays visible for a moment
.to('.logo', {
    duration: 0.5,
    opacity: 1
})
// 3. Logo disappears (fade out)
.to('.logo', {
    duration: 1.2,
    opacity: 0,
    scale: 0.9,
    ease: 'power2.inOut'
})
// 4. First banner appears at 80% width after logo disappears
.to('.banner-one', {
    duration: 1.5,
    opacity: 1,
    scale: 0.8,
    ease: 'power2.out'
}, '-=0.3') // Start slightly before logo fully disappears for smoother transition
// 5. First banner expands to full screen
.to('.banner-one', {
    duration: 0.5,
    scale: 1,
    ease: 'power2.inOut'
})
// 6. Second banner appears at full screen with smooth transition
.to('.banner-two', {
    duration: 1.5,
    opacity: 1,
    scale: 1,
    ease: 'power2.inOut'
})
// 7. Hero text reveals from top to bottom
.fromTo('.hero-text', 
{
    opacity: 1,
    clipPath: 'inset(0 0 100% 0)'
},
{
    duration: 0.4,
    clipPath: 'inset(0 0 0% 0)',
    ease: 'power2.inOut'
}, '-=0.5')
// 8. Button fades in after text
.to('.hero-button', {
    duration: 0.6,
    opacity: 1,
    ease: 'power2.out'
}, '+=0.2');

// Section Two - Background fade in on scroll
gsap.to('.section-two', {
    opacity: 1,
    duration: 1,
    delay: 0.5,
    ease: 'power2.out',
    scrollTrigger: {
        trigger: '.section-two',
        start: 'top 60%',
        toggleActions: 'play none none none'
    }
});

// Contact modal open/close + submit (mailto)
document.addEventListener('DOMContentLoaded', function () {
    const openBtn = document.querySelector('.contact-cta');
    const modal = document.getElementById('contactModal');
    const backdrop = document.getElementById('contactBackdrop');
    const closeBtn = document.getElementById('contactClose');
    const form = document.getElementById('contactForm');

    if (!openBtn || !modal) return;

    function openModal() {
        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
        // focus first field for accessibility
        const first = document.getElementById('contactName');
        if (first) first.focus();
    }

    function closeModal() {
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
    }

    openBtn.addEventListener('click', function (e) {
        e.preventDefault();
        openModal();
    });

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (backdrop) backdrop.addEventListener('click', closeModal);
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeModal();
    });

    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const name = document.getElementById('contactName')?.value?.trim() || '';
            const email = document.getElementById('contactEmail')?.value?.trim() || '';
            const type = document.getElementById('contactType')?.value || '';
            const subject = document.getElementById('contactSubject')?.value?.trim() || '';

            // basic validation
            if (!name || !email || !type || !subject) {
                alert('Please fill all fields.');
                return;
            }

            const mailtoTo = 'enquiry@radiantsouls.ai';
            const mailtoSubject = encodeURIComponent(`[${type}] ${subject}`);
            const bodyLines = [
                `Name: ${name}`,
                `Email: ${email}`,
                `Enquiry Type: ${type}`,
                '',
                'Message:',
                subject
            ];
            const mailtoBody = encodeURIComponent(bodyLines.join('\n'));
            const href = `mailto:${mailtoTo}?subject=${mailtoSubject}&body=${mailtoBody}`;
            window.location.href = href;
            closeModal();
        });
    }
});

// Section Two - Logo fade in on scroll
gsap.fromTo('.section-two-logo', 
{
    opacity: 0,
    scale: 0.8
},
{
    opacity: 1,
    scale: 1,
    duration: 1.5,
    delay: 1,
    ease: 'power3.out',
    scrollTrigger: {
        trigger: '.section-two',
        start: 'top 60%',
        toggleActions: 'play none none none'
    }
});

// Section Two - Text reveal from left after logo
gsap.fromTo('.section-two-text',
{
    clipPath: 'inset(0 100% 0 0)'
},
{
    clipPath: 'inset(0 0% 0 0)',
    duration: 1.5,
    ease: 'power2.inOut',
    scrollTrigger: {
        trigger: '.section-two-logo',
        start: 'top 40%',
        toggleActions: 'play none none none'
    }
});

// Horizontal scroller removed — sections 3 and 4 will animate on normal vertical scroll

// Section Three - Title typing effect (within horizontal scroll)
gsap.fromTo('.section-three-title',
{
    clipPath: 'inset(0 100% 0 0)'
},
{
    clipPath: 'inset(0 0% 0 0)',
    duration: 1.8,
    ease: 'power2.inOut',
    scrollTrigger: {
        trigger: '.section-three',
        start: 'top 70%',
        toggleActions: 'play none none reverse'
    }
});

// Section Three - AR Rahman image enlarge on scroll
gsap.to('.ar-rahman-img',
{
    scale: 1.06,
    ease: 'none',
    scrollTrigger: {
        trigger: '.ar-rahman-img',
        start: 'top 60%',
        end: 'bottom 40%',
        scrub: 1
    }
});

// Section Four - Sequenced animations (disabled)
/*
const section4Timeline = gsap.timeline({
    scrollTrigger: {
        trigger: '.section-four',
        start: 'top 60%',
        toggleActions: 'play reverse play reverse'
    }
});

// 1. First: Text reveals from left to right
section4Timeline.fromTo('.section-four-text',
{
    clipPath: 'inset(0 100% 0 0)'
},
{
    clipPath: 'inset(0 0% 0 0)',
    duration: 1,
    ease: 'power2.inOut'
})
// 2. Then: Image pops from 0 to 100%
.fromTo('.ar-rahman-img-2',
{
    scale: 0,
    opacity: 0
},
{
    scale: 1,
    opacity: 1,
    duration: 1,
    ease: 'power2.out',
    force3D: true
}, '+=0.3'); // Starts 0.3s after text completes
*/

// Section Seven - overlay play/pause only
document.addEventListener('DOMContentLoaded', function () {
    const video = document.getElementById('section7Video');
    const overlayBtn = document.getElementById('overlayPlayBtn');
    const wrapper = document.querySelector('.video-full-wrapper');

    if (!video) return;

    // Use overlay-only: hide native controls
    video.controls = false;

    function updateOverlay() {
        if (!overlayBtn) return;
        // Only set icon and aria-label. Visibility is handled by CSS :hover.
        overlayBtn.textContent = video.paused ? '►' : '❚❚';
        overlayBtn.setAttribute('aria-label', video.paused ? 'Play' : 'Pause');
    }

    if (overlayBtn) {
        overlayBtn.addEventListener('click', function (e) {
            e.preventDefault();
            if (video.paused) video.play(); else video.pause();
            updateOverlay();
        });

        if (wrapper) {
            wrapper.addEventListener('mouseenter', function () {
                // on hover set correct icon; visibility handled by CSS
                overlayBtn.textContent = video.paused ? '►' : '❚❚';
            });

            // no mouseleave logic required; CSS hides the overlay when not hovered
        }

        // Manage overlay visibility via wrapper.playing class
        video.addEventListener('play', function () {
            if (wrapper) wrapper.classList.add('playing');
            updateOverlay();
        });
        video.addEventListener('pause', function () {
            if (wrapper) wrapper.classList.remove('playing');
            updateOverlay();
        });
        video.addEventListener('ended', function () {
            if (wrapper) wrapper.classList.remove('playing');
            video.currentTime = 0;
            updateOverlay();
        });

        // Initialize
        updateOverlay();
    }
});

// Section Four (ARR) - overlay play/pause only
document.addEventListener('DOMContentLoaded', function () {
    const video = document.getElementById('arrVideo');
    const overlayBtn = document.getElementById('arrOverlayBtn');
    // Scope the wrapper to the sibling container to avoid interfering with Section Seven
    const wrapper = overlayBtn ? overlayBtn.closest('.video-full-wrapper') : null;

    if (!video) return;

    video.controls = false;

    function updateOverlay() {
        if (!overlayBtn) return;
        overlayBtn.textContent = video.paused ? '►' : '❚❚';
        overlayBtn.setAttribute('aria-label', video.paused ? 'Play' : 'Pause');
    }

    if (overlayBtn) {
        overlayBtn.addEventListener('click', function (e) {
            e.preventDefault();
            if (video.paused) video.play(); else video.pause();
            updateOverlay();
        });

        if (wrapper) {
            wrapper.addEventListener('mouseenter', function () {
                overlayBtn.textContent = video.paused ? '►' : '❚❚';
            });
        }

        video.addEventListener('play', function () {
            if (wrapper) wrapper.classList.add('playing');
            updateOverlay();
        });
        video.addEventListener('pause', function () {
            if (wrapper) wrapper.classList.remove('playing');
            updateOverlay();
        });
        video.addEventListener('ended', function () {
            if (wrapper) wrapper.classList.remove('playing');
            video.currentTime = 0;
            updateOverlay();
        });

        updateOverlay();
    }
});

// Horizontal scroll for sections 3-6 (pin & snap)
document.addEventListener('DOMContentLoaded', function () {
    const container = document.getElementById('hscroll-3-6');
    if (!container) return;
    const panels = gsap.utils.toArray('#hscroll-3-6 .panel');

    // Enable horizontal pin only on >= 993px; fall back to vertical on mobile
    ScrollTrigger.matchMedia({
        '(min-width: 993px)': function () {
            gsap.to(panels, {
                xPercent: -100 * (panels.length - 1),
                ease: 'none',
                scrollTrigger: {
                    trigger: '#hscroll-3-6',
                    pin: true,
                    pinSpacing: true,
                    scrub: 1,
                    snap: 1 / (panels.length - 1),
                    // base vertical scrolling on how wide the container is so it feels more natural.
                    end: () => '+=' + (container.scrollWidth - window.innerWidth)
                }
            });
        },
        '(max-width: 992px)': function () {
            // no horizontal pinning; natural vertical scroll
        }
    });
});

