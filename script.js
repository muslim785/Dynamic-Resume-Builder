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
  const resume = document.getElementById('resumeOutput').innerHTML;
  const blob = new Blob([resume], { type: 'text/html' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'resume.html';
  link.click();
});
