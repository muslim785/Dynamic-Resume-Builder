// Save to localStorage
function saveToLocalStorage() {
  const formData = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value,
    education: document.getElementById('education').value,
    skills: document.getElementById('skills').value,
    experience: document.getElementById('experience').value,
  };
  localStorage.setItem('resumeData', JSON.stringify(formData));
}

// Load from localStorage
function loadFromLocalStorage() {
  const savedData = localStorage.getItem('resumeData');
  if (savedData) {
    const formData = JSON.parse(savedData);
    document.getElementById('name').value = formData.name || '';
    document.getElementById('email').value = formData.email || '';
    document.getElementById('phone').value = formData.phone || '';
    document.getElementById('education').value = formData.education || '';
    document.getElementById('skills').value = formData.skills || '';
    document.getElementById('experience').value = formData.experience || '';
  }
}

// Clear localStorage
document.getElementById('clearData').addEventListener('click', function () {
  localStorage.removeItem('resumeData');
  document.getElementById('resumeForm').reset();
  document.getElementById('resumeOutput').innerHTML = '';
  document.getElementById('download').style.display = 'none';
});

// Generate Resume
document.getElementById('generate').addEventListener('click', function () {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const education = document.getElementById('education').value;
  const skills = document.getElementById('skills').value;
  const experience = document.getElementById('experience').value;

  const resumeOutput = `
    <h1>${name}</h1>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone:</strong> ${phone}</p>
    <h2>Education</h2>
    <p>${education.replace(/\n/g, '<br>')}</p>
    <h2>Skills</h2>
    <p>${skills.replace(/\n/g, '<br>')}</p>
    <h2>Experience</h2>
    <p>${experience.replace(/\n/g, '<br>')}</p>
  `;

  document.getElementById('resumeOutput').innerHTML = resumeOutput;
  document.getElementById('download').style.display = 'inline-block';
});

// Attach input event listeners for saving
document.querySelectorAll('#resumeForm input, #resumeForm textarea').forEach(input => {
  input.addEventListener('input', saveToLocalStorage);
});

// Load saved data on page load
window.addEventListener('DOMContentLoaded', loadFromLocalStorage);
