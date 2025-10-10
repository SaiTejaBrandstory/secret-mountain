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

// Section Three - Title typing effect from left
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
    scale: 1.1,
    duration: 1,
    ease: 'power2.inOut',
    scrollTrigger: {
        trigger: '.ar-rahman-img',
        start: 'top 70%',
        end: 'bottom 30%',
        toggleActions: 'play reverse play reverse'
    }
});

// Horizontal Scroll - Section 3 to Section 4
const horizontalScroll = gsap.to('.horizontal-scroll-container', {
    x: '-100vw',
    ease: 'none',
    force3D: true,
    scrollTrigger: {
        trigger: '.horizontal-scroll-wrapper',
        start: 'top -10%',
        end: '+=200%',
        scrub: 1,
        pin: true,
        anticipatePin: 1
    }
});

// Section Four - Sequenced animations
const section4Timeline = gsap.timeline({
    scrollTrigger: {
        trigger: '.section-four',
        start: 'left 60%',
        toggleActions: 'play reverse play reverse',
        containerAnimation: horizontalScroll
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

