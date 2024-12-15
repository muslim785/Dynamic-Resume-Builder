document.getElementById('download').addEventListener('click', function () {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const education = document.getElementById('education').value;
  const skills = document.getElementById('skills').value;
  const experience = document.getElementById('experience').value;

  const pdf = new jspdf.jsPDF();

  let yPosition = 20;

  // Add Profile Picture
  if (profileImageBase64) {
    pdf.addImage(profileImageBase64, 'JPEG', 10, yPosition, 30, 30); // Adjust size and position
    yPosition += 40; // Move yPosition below the image
  }

  // Add Name
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(24);
  pdf.text(name, 10, yPosition);
  yPosition += 10;

  // Add Email and Phone
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(12);
  pdf.text(`Email: ${email}`, 10, yPosition);
  yPosition += 10;
  pdf.text(`Phone: ${phone}`, 10, yPosition);
  yPosition += 20;

  // Add Education
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(16);
  pdf.text("Education", 10, yPosition);
  yPosition += 10;
  pdf.setFont("helvetica", "normal");
  education.split('\n').forEach(line => {
    pdf.text(line, 10, yPosition);
    yPosition += 10;
  });

  // Add Skills
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(16);
  pdf.text("Skills", 10, yPosition);
  yPosition += 10;
  pdf.setFont("helvetica", "normal");
  skills.split('\n').forEach(line => {
    pdf.text(line, 10, yPosition);
    yPosition += 10;
  });

  // Add Experience
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(16);
  pdf.text("Experience", 10, yPosition);
  yPosition += 10;
  pdf.setFont("helvetica", "normal");
  experience.split('\n').forEach(line => {
    pdf.text(line, 10, yPosition);
    yPosition += 10;
  });

  pdf.save("resume.pdf");
});
