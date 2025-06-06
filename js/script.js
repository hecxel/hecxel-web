// Initialize Swiper.js
const swiper = new Swiper('.swiper', {
  loop: true,
  autoplay: {
    delay: 3000,
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  slidesPerView: 1,
  spaceBetween: 30,
  breakpoints: {
    700: {
      slidesPerView: 2,
      spaceBetween: 30,
    }
  }
});

document.addEventListener('DOMContentLoaded', function() {
  document.body.classList.add('loaded');

  // Rolling subtitle animation
  const titles = [
    'Technical Artist',
    'Character TD',
    'Creative Coder',
    'XR Specialist'
  ];
  let idx = 0;
  const subtitle = document.getElementById('subtitle-text');

  function showNextTitle() {
    // Animate out
    subtitle.classList.remove('subtitle-animate-in');
    subtitle.classList.add('subtitle-animate-out');
    setTimeout(() => {
      idx = (idx + 1) % titles.length;
      subtitle.textContent = titles[idx];
      subtitle.classList.remove('subtitle-animate-out');
      subtitle.classList.add('subtitle-animate-in');
    }, 400);
  }

  // Initial animate in
  subtitle.classList.add('subtitle-animate-in');
  setInterval(showNextTitle, 2200);
});
