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

  // Add Gap at the Bottom
  const bottomPadding = 30; // Extra padding at the bottom
  yPosition += bottomPadding;

  if (yPosition >= 280) { // If content exceeds page height
    pdf.addPage();
    yPosition = 20; // Reset position for new page
  }

  // Add Footer (Optional)
  pdf.setFont('helvetica', 'italic').setFontSize(10);
  pdf.text('Generated using Resume Builder', leftMargin, yPosition);

  // Save the PDF
  pdf.save('resume.pdf');
});
