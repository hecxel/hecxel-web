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

  // Project modal logic
  const projectTitles = {
    'Kindle Commercial': 'Kindle Commercial',
    'Peekaboo VR': 'Peekaboo VR',
    'Missing Link Movie': 'Missing Link Movie',
    'Other Projects': 'Other Projects'
  };
  const projectDescriptions = {
    'Kindle Commercial': 'Technical direction and rigging.',
    'Peekaboo VR': 'XR experience for children, focusing on interactive and immersive play.',
    'Missing Link Movie': 'Character TD work for the Golden Globe winning stop-motion film.',
    'Peter Rabbit Movie': 'Character TD work for the animated feature film.',
    'Other Projects': 'An extensive portfolio spanning film, advertising, XR, and creative technology—where Héctor has delivered both technical expertise and artistic innovation across a wide range of projects.'
  };

  function openProjectModal(img) {
    const modal = document.getElementById('project-modal');
    const modalImg = modal.querySelector('.project-modal-img');
    let modalTitle = modal.querySelector('.project-modal-title');
    let modalDesc = modal.querySelector('.project-modal-desc');
    // If title element doesn't exist, create it before desc
    if (!modalTitle) {
      modalTitle = document.createElement('div');
      modalTitle.className = 'project-modal-title';
      modalDesc = modal.querySelector('.project-modal-desc');
      modalDesc.parentNode.insertBefore(modalTitle, modalDesc);
    }
    modalImg.src = img.src;
    modalImg.alt = img.alt;
    modalTitle.textContent = projectTitles[img.alt] || img.alt || '';
    modalDesc.textContent = projectDescriptions[img.alt] || '';
    modal.style.display = 'flex';
    setTimeout(() => { modal.style.opacity = '1'; }, 10);
    document.body.style.overflow = 'hidden';
  }

  function closeProjectModal() {
    const modal = document.getElementById('project-modal');
    modal.style.opacity = '0';
    setTimeout(() => {
      modal.style.display = 'none';
      document.body.style.overflow = '';
    }, 300);
  }

  // Project image click handler (update for new structure)
  document.querySelectorAll('.gallery-item .project-image').forEach(img => {
    img.style.cursor = 'pointer';
    img.addEventListener('click', () => openProjectModal(img));
  });

  // Modal close logic
  const modal = document.getElementById('project-modal');
  modal.querySelector('.project-modal-close').addEventListener('click', closeProjectModal);
  modal.querySelector('.project-modal-overlay').addEventListener('click', closeProjectModal);
  document.addEventListener('keydown', function(e) {
    if (modal.style.display !== 'none' && (e.key === 'Escape' || e.key === 'Esc')) closeProjectModal();
  });
});
