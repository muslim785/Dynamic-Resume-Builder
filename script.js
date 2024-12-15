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

  // Set margins and line height
  const leftMargin = 10;
  const lineHeight = 10;
  let yPosition = 20;

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const education = document.getElementById('education').value;
  const skills = document.getElementById('skills').value;
  const experience = document.getElementById('experience').value;

  // Add Name and Profile Picture
  pdf.setFont('helvetica', 'bold').setFontSize(20).text(name, leftMargin, yPosition);
  if (profileImageBase64) {
    pdf.addImage(profileImageBase64, 'JPEG', leftMargin, yPosition + 10, 40, 40);
    yPosition += 50;
  } else {
    yPosition += 10;
  }

  // Add Contact Info
  pdf.setFont('helvetica', 'normal').setFontSize(12);
  pdf.text(`Email: ${email}`, leftMargin, yPosition);
  yPosition += lineHeight;
  pdf.text(`Phone: ${phone}`, leftMargin, yPosition);
  yPosition += lineHeight + 5;

  // Add Education Section
  pdf.setFont('helvetica', 'bold').setFontSize(14).text('Education', leftMargin, yPosition);
  yPosition += lineHeight;
  pdf.setFont('helvetica', 'normal').setFontSize(12);
  pdf.text(education, leftMargin, yPosition, { maxWidth: 190 });
  yPosition += pdf.getTextDimensions(education).h + 5;

  // Add Skills Section
  pdf.setFont('helvetica', 'bold').setFontSize(14).text('Skills', leftMargin, yPosition);
  yPosition += lineHeight;
  pdf.setFont('helvetica', 'normal').setFontSize(12);
  pdf.text(skills, leftMargin, yPosition, { maxWidth: 190 });
  yPosition += pdf.getTextDimensions(skills).h + 5;

  // Add Experience Section
  pdf.setFont('helvetica', 'bold').setFontSize(14).text('Experience', leftMargin, yPosition);
  yPosition += lineHeight;
  pdf.setFont('helvetica', 'normal').setFontSize(12);
  pdf.text(experience, leftMargin, yPosition, { maxWidth: 190 });
  yPosition += pdf.getTextDimensions(experience).h + 5;

  // Add Bottom Padding
  yPosition += 20; // Extra space at the bottom

  // Add Footer (Optional)
  if (yPosition < 280) { // Adjust if content fits on a single page
    pdf.setFont('helvetica', 'italic').setFontSize(10);
    pdf.text('Generated using Resume Builder', leftMargin, yPosition + 10);
  } else {
    pdf.addPage();
    pdf.setFont('helvetica', 'italic').setFontSize(10);
    pdf.text('Generated using Resume Builder', leftMargin, 20);
  }

  // Save the PDF
  pdf.save('resume.pdf');
});
