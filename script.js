let profileImageBase64 = ''; // Store Base64 string of the image

// Handle image upload and preview
document.getElementById('profilePicture').addEventListener('change', function (event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      profileImageBase64 = e.target.result; // Save Base64 image
      const profilePreview = document.getElementById('profilePreview');
      profilePreview.src = profileImageBase64; // Display image preview
      profilePreview.style.display = 'block';
    };
    reader.readAsDataURL(file); // Convert the image to Base64
  }
});
