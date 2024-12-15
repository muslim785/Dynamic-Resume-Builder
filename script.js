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

document.getElementById('download').addEventListener('click', function () {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const education = document.getElementById('education').value;
  const skills = document.getElementById('skills').value;
  const experience = document.getElementById('experience').value;

  const pdf = new jspdf.jsPDF();

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(24);
  pdf.text(name, 10, 20);

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(12);
  pdf.text(`Email: ${email}`, 10, 30);
  pdf.text(`Phone: ${phone}`, 10, 40);

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(16);
  pdf.text("Education", 10, 50);
  pdf.setFont("helvetica", "normal");
  pdf.text(education.split('\n'), 10, 60);

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(16);
  pdf.text("Skills", 10, 80);
  pdf.setFont("helvetica", "normal");
  pdf.text(skills.split('\n'), 10, 90);

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(16);
  pdf.text("Experience", 10, 110);
  pdf.setFont("helvetica", "normal");
  pdf.text(experience.split('\n'), 10, 120);

  pdf.save("resume.pdf");
});
