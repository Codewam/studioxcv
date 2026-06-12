// ============================================
// STUDIOXCV — CONTACT SCRIPT + FORM VALIDATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  const form    = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');
  if (!form) return;

  const fields = {
    fullName: { el: document.getElementById('fullName'), err: document.getElementById('nameErr'),    rules: [required('Name is required'), minLen(2, 'Name too short')] },
    email:    { el: document.getElementById('email'),    err: document.getElementById('emailErr'),   rules: [required('Email is required'), isEmail('Enter a valid email')] },
    service:  { el: document.getElementById('service'),  err: document.getElementById('serviceErr'), rules: [required('Please select a service')] },
    message:  { el: document.getElementById('message'),  err: document.getElementById('msgErr'),     rules: [required('Message is required'), minLen(20, 'Please provide more detail (min 20 chars)')] },
  };

  // Validators
  function required(msg) {
    return v => (v.trim() ? '' : msg);
  }
  function minLen(n, msg) {
    return v => (v.trim().length >= n ? '' : msg);
  }
  function isEmail(msg) {
    return v => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? '' : msg);
  }

  function validateField(key) {
    const f = fields[key];
    const val = f.el.value;
    for (const rule of f.rules) {
      const msg = rule(val);
      if (msg) {
        f.err.textContent = msg;
        f.el.classList.add('error');
        return false;
      }
    }
    f.err.textContent = '';
    f.el.classList.remove('error');
    return true;
  }

  // Live validation on blur
  Object.keys(fields).forEach(key => {
    fields[key].el.addEventListener('blur', () => validateField(key));
    fields[key].el.addEventListener('input', () => {
      if (fields[key].el.classList.contains('error')) validateField(key);
    });
  });

  // Submit
  form.addEventListener('submit', e => {
    e.preventDefault();
    const valid = Object.keys(fields).map(validateField).every(Boolean);
    if (!valid) return;

    // Simulate submission
    const btn = form.querySelector('.form-submit');
    btn.textContent = 'Sending…';
    btn.disabled = true;

    setTimeout(() => {
      form.style.display = 'none';
      success.classList.add('visible');
    }, 1400);
  });

});
