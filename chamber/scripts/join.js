document.addEventListener('DOMContentLoaded', () => {

  const timestampField = document.getElementById('timestamp');
  if (timestampField) {
    timestampField.value = new Date().toISOString();
  }

  const detailsLinks = document.querySelectorAll('.details-link');
  const closeButtons = document.querySelectorAll('.close-button');
  const modals = document.querySelectorAll('.modal');

  detailsLinks.forEach(link => {
    link.addEventListener('click', (event) => {
      event.preventDefault(); 
      const card = event.target.closest('.card');
      const modalTargetId = card.getAttribute('data-modal-target');
      const modal = document.querySelector(modalTargetId);
      if (modal) {
        modal.style.display = 'block';
      }
    });
  });

  closeButtons.forEach(button => {
    button.addEventListener('click', (event) => {
      const modal = event.target.closest('.modal');
      if (modal) {
        modal.style.display = 'none';
      }
    });
  });

  window.addEventListener('click', (event) => {
    modals.forEach(modal => {
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    });
  });
});
