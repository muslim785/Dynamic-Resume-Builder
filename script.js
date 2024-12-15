
  let profileImageBase64 = ''; 

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


    document.getElementById('generate').addEventListener('click', function () {
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const phone = document.getElementById('phone').value;
      const education = document.getElementById('education').value;
      const skills = document.getElementById('skills').value;
      const experience = document.getElementById('experience').value;

      
      let resumeOutput = `
        ${profileImageBase64 ? `<img src="${profileImageBase64}" style="width: 100px; height: 100px; border-radius: 50%;"><br>` : ''}
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
      document.getElementById('resumeOutput').style.display = 'block'; 
      document.getElementById('download').style.display = 'inline-block'; 
    });


    document.getElementById('download').addEventListener('click', function () {
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const phone = document.getElementById('phone').value;
      const education = document.getElementById('education').value;
      const skills = document.getElementById('skills').value;
      const experience = document.getElementById('experience').value;

      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF();

      let yPosition = 20;

      
      if (profileImageBase64) {
        pdf.addImage(profileImageBase64, 'JPEG', 10, yPosition, 30, 30); 
        yPosition += 40; 
      }


      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(24);
      pdf.text(name, 10, yPosition);
      yPosition += 10;

    
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(12);
      pdf.text(`Email: ${email}`, 10, yPosition);
      yPosition += 10;
      pdf.text(`Phone: ${phone}`, 10, yPosition);
      yPosition += 20;

    
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(16);
      pdf.text("Education", 10, yPosition);
      yPosition += 10;
      pdf.setFont("helvetica", "normal");
      education.split('\n').forEach(line => {
        pdf.text(line, 10, yPosition);
        yPosition += 10;
      });

      
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(16);
      pdf.text("Skills", 10, yPosition);
      yPosition += 10;
      pdf.setFont("helvetica", "normal");
      skills.split('\n').forEach(line => {
        pdf.text(line, 10, yPosition);
        yPosition += 10;
      });

      
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
