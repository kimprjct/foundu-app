<template>
  <div class="page-container">
    <div class="main-content">
      <!-- Your main content goes here -->
    </div>

    <footer class="footer">
      <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/3822b4ed9fbf380f18a2b504f3186154d89eaa41b897a787c8d54ebb633da4a1?placeholderIfAbsent=true&apiKey=1e113a967b894d87983e26d5e9de7e7e" alt="Company logo" class="footer-logo" />

      <div class="footer-column">
        <h2 class="footer-heading">Help</h2>
        <a href="#" class="footer-link">Customer Support</a>
        <a href="#" class="footer-link">Terms & Conditions</a>
        <a href="#" class="footer-link">Privacy Policy</a>
      </div>

      <p class="copyright">© Copyright 2024 Lost and Found All Rights Reserved</p>

      <nav class="footer-column">
        <h2 class="footer-heading">Site</h2>
        <a href="#" class="footer-link">Lost</a>
        <a href="#" class="footer-link">Found</a>
        <a href="#" class="footer-link">About Us</a>
      </nav>

      <div class="contact-info">
        <div class="contact-details">
          <h2 class="footer-heading">Contact</h2>
          <p>Tel: +94 716520690</p>
          <p>Email: <a href="mailto:foundu@gmail.com" class="footer-link">foundu@gmail.com</a></p>
        </div>

        <div class="social-icons">
          <a href="https://www.facebook.com/SNSUOfficial" target="_blank">
            <img src="@/assets/fbicon.png" alt="Facebook Icon" class="social-icon">
          </a>
          <a href="https://www.instagram.com/SNSUOfficial/" target="_blank">
            <img src="@/assets/instaicon.png" alt="Instagram Icon" class="social-icon">
          </a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'FooterComponent'
};
</script>

<style scoped>

.footer {
  background-color: rgba(255, 250, 250, 0.74);
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  gap: 10px 15px;
  color: #000;
  padding: 10px;
  font: 600 10px Inter, sans-serif;
  width: 100%;
  height: 100px;
}

.footer-column {
  display: flex;
  flex-direction: column;
  margin-right: 50px;
}

.footer-logo {
  aspect-ratio: 0.76;
  object-fit: contain;
  width: 70px;
  align-self: flex-start;
  margin-top: 1px;
  margin-left: 10px;
}

.footer-heading {
  font-size: 13px;
  font-weight: 800;
  margin-right: 10px;
}

.footer-link {
  margin-top: 5px;
  margin-bottom: 1px;
  text-decoration: none;
  color: black;
}

.footer-link:hover {
  text-decoration: underline;
}

.copyright {
  font-size: 11px;
  text-align: center;
  width: 250px;
  padding-bottom: 13px;
  margin-bottom: 5px;
  margin-top: 25px;
}

.contact-info {
  display: flex;
  flex-direction: column;
  margin-right: 20px;
}

.contact-details {
  padding-left: 10px;
  padding-bottom: 5px;
}

.social-icons {
  display: flex;
  gap: 10px;
  margin-bottom: 2px;
}

.social-icon {
  width: 45px;
  height: 35px;
}
</style>
