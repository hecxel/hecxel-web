document.addEventListener('DOMContentLoaded', function () {
  document.body.classList.add('loaded');

  /* ---- theme (respects saved choice, then OS preference) ---- */
  var themeToggle = document.getElementById('theme-toggle');
  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  function setTheme(dark) {
    document.body.classList.toggle('dark-theme', dark);
    themeToggle.textContent = dark ? '☀️' : '🌙';
  }

  setTheme(
    localStorage.getItem('theme') === 'dark' ||
      (!localStorage.getItem('theme') && prefersDark)
  );

  themeToggle.addEventListener('click', function () {
    var isDark = document.body.classList.toggle('dark-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    themeToggle.textContent = isDark ? '☀️' : '🌙';
  });

  /* ---- rolling subtitle ---- */
  var titles = [
    'Technical Artist',
    'Character TD',
    'Creative Coder',
    'XR Specialist'
  ];
  var idx = 0;
  var subtitle = document.getElementById('subtitle-text');

  function showNextTitle() {
    subtitle.classList.remove('subtitle-animate-in');
    subtitle.classList.add('subtitle-animate-out');
    setTimeout(function () {
      idx = (idx + 1) % titles.length;
      subtitle.textContent = titles[idx];
      subtitle.classList.remove('subtitle-animate-out');
      subtitle.classList.add('subtitle-animate-in');
    }, 400);
  }

  subtitle.classList.add('subtitle-animate-in');
  setInterval(showNextTitle, 2200);

  /* ---- project modal ---- */
  var projectTitles = {
    'Kindle Commercial': 'Kindle Commercial',
    'Peekaboo VR': 'Peekaboo VR',
    'Missing Link Movie': 'Missing Link Movie',
    'Peter Rabbit Movie': 'Peter Rabbit Movie',
    'Other Projects': 'Other Projects'
  };
  var projectDescriptions = {
    'Kindle Commercial': 'Technical direction and rigging.',
    'Peekaboo VR': 'XR experience for children, focusing on interactive and immersive play.',
    'Missing Link Movie': 'Character TD work for the Golden Globe winning stop-motion film.',
    'Peter Rabbit Movie': 'Character TD work for the animated feature film.',
    'Other Projects': 'An extensive portfolio spanning film, advertising, XR, and creative technology—where Héctor has delivered both technical expertise and artistic innovation across a wide range of projects.'
  };

  var modal = document.getElementById('project-modal');
  var modalImg = modal.querySelector('.project-modal-img');
  var modalTitle = modal.querySelector('.project-modal-title');
  var modalDesc = modal.querySelector('.project-modal-desc');

  function openProjectModal(img) {
    modalImg.src = img.src;
    modalImg.alt = img.alt;
    modalTitle.textContent = projectTitles[img.alt] || img.alt || '';
    modalDesc.textContent = projectDescriptions[img.alt] || '';
    modal.style.display = 'flex';
    setTimeout(function () { modal.style.opacity = '1'; }, 10);
    document.body.style.overflow = 'hidden';
  }

  function closeProjectModal() {
    modal.style.opacity = '0';
    setTimeout(function () {
      modal.style.display = 'none';
      document.body.style.overflow = '';
    }, 300);
  }

  document.querySelectorAll('.project-card').forEach(function (card) {
    var img = card.querySelector('.project-image');
    img.style.cursor = 'pointer';
    card.addEventListener('click', function () { openProjectModal(img); });
    card.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openProjectModal(img);
      }
    });
  });

  modal.querySelector('.project-modal-close').addEventListener('click', closeProjectModal);
  modal.querySelector('.project-modal-overlay').addEventListener('click', closeProjectModal);
  document.addEventListener('keydown', function (e) {
    if (modal.style.display !== 'none' && (e.key === 'Escape' || e.key === 'Esc')) {
      closeProjectModal();
    }
  });
});
