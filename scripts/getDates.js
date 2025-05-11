document.addEventListener("DOMContentLoaded", function() {
  const lastModified = document.getElementById('lastModified');
  const footerFirstParagraph = document.querySelector('footer p:first-of-type');
  const lastModifiedDate = document.lastModified;
  lastModified.textContent = `Last modified: ${lastModifiedDate}`;

  const currentYear = new Date().getFullYear();
  footerFirstParagraph.textContent = `©${currentYear} | Michelangelo | Pezzini | Brazil`;
});
