// Year in footer
(function setYear() {
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
})();

// Simple toast
function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2000);
}

// Community form handling
(function communityForm() {
  const form = document.getElementById('community-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const fd = new FormData(form);
    const data = {
      name: String(fd.get('name') || '').trim(),
      birthday: String(fd.get('birthday') || '').trim(),
      city: String(fd.get('city') || '').trim(),
      email: String(fd.get('email') || '').trim(),
      timestamp: new Date().toISOString(),
    };

    // Basic validation
    if (!data.name || !data.birthday || !data.city || !data.email) {
      showToast('Please fill out all fields.');
      return;
    }

    // Save locally
    try {
      const key = 'communitySignups';
      const existing = JSON.parse(localStorage.getItem(key) || '[]');
      existing.push(data);
      localStorage.setItem(key, JSON.stringify(existing));
    } catch (err) {
      console.warn('Local save failed:', err);
    }

    form.reset();
    showToast('Thanks for joining MUSE! Your signup was saved locally.');
  });
})();
