let profileImageBase64 = '';

// Handle image upload
document.getElementById('profilePicture').addEventListener('change', function (event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      profileImageBase64 = e.target.result;
      const profilePreview = document.getElementById('profilePreview');
      profilePreview.src = profileImageBase64;
      profilePreview.style.display = 'block';
    };
    reader.readAsDataURL(file);
  }
});

// Generate Resume
document.getElementById('generate').addEventListener('click', function () {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const education = document.getElementById('education').value;
  const skills = document.getElementById('skills').value;
  const experience = document.getElementById('experience').value;

  // Unique Path
  const uniqueID = 'resume-' + Date.now();
  const resumeData = {
    name,
    email,
    phone,
    education,
    skills,
    experience,
    profileImageBase64,
  };

  // Save to localStorage
  localStorage.setItem(uniqueID, JSON.stringify(resumeData));

  // Create a Shareable Link
  const shareableURL = `${window.location.origin}${window.location.pathname}?id=${uniqueID}`;
  document.getElementById('shareableLink').innerHTML = `
    Shareable Link: <a href="${shareableURL}" target="_blank">${shareableURL}</a>
  `;

  // Show Preview
  let resumeHTML = `
    ${profileImageBase64 ? `<img src="${profileImageBase64}" style="width: 100px; border-radius: 50%;">` : ''}
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
  document.getElementById('resumeOutput').innerHTML = resumeHTML;
  document.getElementById('resumeOutput').style.display = 'block';
  document.getElementById('download').style.display = 'block';
});

// Clear Data
document.getElementById('clearData').addEventListener('click', function () {
  if (confirm('Are you sure you want to clear all data?')) {
    document.getElementById('resumeForm').reset();
    document.getElementById('profilePreview').style.display = 'none';
    document.getElementById('resumeOutput').style.display = 'none';
    document.getElementById('download').style.display = 'none';
    document.getElementById('shareableLink').innerHTML = '';
    profileImageBase64 = '';
  }
});

// Download PDF
document.getElementById('download').addEventListener('click', function () {
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF();

  const name = document.getElementById('name').value;
  pdf.setFont('helvetica', 'bold').setFontSize(20).text(name, 10, 20);

  if (profileImageBase64) {
    pdf.addImage(profileImageBase64, 'JPEG', 10, 30, 40, 40);
  }

  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const education = document.getElementById('education').value;
  const skills = document.getElementById('skills').value;
  const experience = document.getElementById('experience').value;

  pdf.setFont('helvetica', 'normal').setFontSize(12);
  pdf.text(`Email: ${email}`, 10, 80);
  pdf.text(`Phone: ${phone}`, 10, 90);

  pdf.text('Education:', 10, 110);
  pdf.text(education, 10, 120);

  pdf.text('Skills:', 10, 140);
  pdf.text(skills, 10, 150);

  pdf.text('Experience:', 10, 170);
  pdf.text(experience, 10, 180);

  pdf.save('resume.pdf');
});
