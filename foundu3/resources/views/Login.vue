<template>
  <div class="login-container">
    <div class="login-background"></div>

    <div class="logo-container">
      <router-link to="/home">
        <div class="logo"></div>
      </router-link>
      <div class="logo-text">
        <h1 class="logo-title">FoundU</h1>
        <p class="tagline">DISCOVER. CONNECT. RECLAIM.</p>
      </div>
    </div>

    <h2 class="main-title">SNSU LOST AND FOUND SYSTEM</h2>

    <div class="button-container">
      <div class="button slider"></div>
      <router-link to="/login" class="button login"><span>Login</span></router-link>
      <router-link to="/register" class="button register"
        ><span>Register</span></router-link
      >
    </div>

    <div class="notification" v-if="isNotificationVisible">
      <div class="check-mark">
        <img src="@/assets/checkicon.webp" alt="Check Icon" width="38" height="36" />
      </div>
      <span class="action-success">{{ notificationMessage }}</span>
    </div>

    <div class="signin-container">
      <div class="signin-content">
        <h1 class="signin-title">FoundU</h1>
        <p class="signin-subtitle">Lost and Found System</p>

        <!-- Google Sign-In Button -->
        <div id="google-signin-button" class="google-signin-button"></div>

        <p class="signin-info">Use your SNSU Google Workplace account</p>
        <p class="signin-support">
          Having trouble signing in?
          <a href="https://www.facebook.com/snsucitycampusssg" class="support-link"
            >Customer Support</a
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isNotificationVisible: false,
      notificationMessage: "",
    };
  },
  mounted() {
    // Initialize Google Sign-In
    window.google.accounts.id.initialize({
      client_id:
        "49525188165-oep23reli1b3mkpmuecreieds5likhbe.apps.googleusercontent.com",
      callback: this.handleCredentialResponse,
    });

    // Render Google Sign-In button
    window.google.accounts.id.renderButton(
      document.getElementById("google-signin-button"),
      {
        theme: "filled_blue",
        size: "large",
        shape: "pill",
        width: "250",
      }
    );
  },
  methods: {
    showNotification(messageType) {
      this.notificationMessage =
        messageType === "register" ? "Registration Complete!" : "Login Successful!";
      this.isNotificationVisible = true;
      setTimeout(() => {
        this.isNotificationVisible = false;
      }, 7000);
    },
    handleCredentialResponse(response) {
      const credential = this.parseJwt(response.credential);
      const userEmail = credential.email;

      if (userEmail === "kimberlynpareja6@gmail.com" || userEmail === "talictickimberly@gmail.com" || userEmail === "renarabee@gmail.com") {
        localStorage.setItem("currentUser", JSON.stringify(credential));
        this.$router.push({ name: "adminHome" });
      } else if (!userEmail.endsWith("@ssct.edu.ph")) {
        alert("Only ssct.edu.ph accounts are allowed to sign in.");
        return;
      } else {
        const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];
        const user = registeredUsers.find((user) => user.email === userEmail);

        if (user) {
          localStorage.setItem("currentUser", JSON.stringify(user));
          this.$router.push({ name: "home" });
        } else {
          const newUser = {
            email: userEmail,
            fullName: credential.name,
            profilePicture: credential.picture,
          };
          registeredUsers.push(newUser);
          localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));
          localStorage.setItem("currentUser", JSON.stringify(newUser));
          this.$router.push({ name: "home" });
        }
      }
    },
    parseJwt(token) {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
      return JSON.parse(jsonPayload);
    },
  },
};
</script>

<style scoped>
/* Your existing styles */
</style>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Abel&family=Bruno+Ace+SC&family=Italianno&display=swap");

.login-container {
  position: relative;
  z-index: 1;
  overflow: hidden;
}

.login-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: url("@/assets/snsuphoto.png") center / cover no-repeat;
  z-index: -1;
}

.logo-container {
  position: absolute;
  top: 1px;
  left: 20px;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.logo {
  width: 110px;
  height: 121px;
  background: url("@/assets/snsulogo.png") no-repeat center center;
  background-size: cover;
  margin-top: 1px;
}

.logo-text {
  margin-left: 10px;
}

.logo-title {
  color: #ffe9e9;
  font-family: "Bruno Ace SC", sans-serif;
  font-size: 27px;
}

.tagline {
  color: #ffe9e9;
  font-family: "Abel", sans-serif;
  font-size: 11px;
}

.main-title {
  color: #fff;
  font-size: 38px;
  font-weight: 800;
  margin-top: 60px;
  margin-left: 5px;
  text-align: center;
  padding-top: 30px;
}

.button-container {
  position: relative;
  width: 300px;
  height: 43px;
  margin: 40px auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(217, 217, 217, 0.16);
  border: 2px solid #eff32b;
  border-radius: 50px;
  overflow: hidden;
}

.button.slider {
  position: absolute;
  width: 125px;
  height: 100%;
  background-color: #2fa725;
  border-radius: 50px;
  transition: all 0.3s ease;
  z-index: 1;
}

.button.login,
.button.register {
  width: 125px;
  height: 100%;
  background: transparent;
  color: #fff;
  font-size: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  cursor: pointer;
  text-decoration: none;
}

.button.login span,
.button.register span {
  color: white;
  font-size: 24px;
  z-index: 10;
  position: relative;
}

.signin-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 20px;
  border: 2px solid #a4a4a4;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  width: 430px;
  height: 300px;
  margin-top: 50px;
  margin-bottom: 70px;
  margin-left: 34%;
}

.signin-content {
  text-align: center;
  width: 100%;
}

.signin-title {
  color: #176b10;
  font-family: "Bruno Ace SC", sans-serif;
  font-size: 40px;
  margin-bottom: -15px;
}

.signin-subtitle {
  color: #000;
  font-family: "Italianno", cursive;
  font-size: 30px;
  margin-bottom: 20px;
}

/* Center the Google Sign-In Button */
.google-signin-button {
  display: flex;
  justify-content: center;
  margin: 0 auto;
}

.signin-info {
  color: #000;
  font-family: "Inter", sans-serif;
  font-size: 16px;
  margin-top: 30px;
  margin-bottom: 5px;
}

.signin-support {
  color: #000;
  font-family: "Inter", sans-serif;
  font-size: 14px;
}

.support-link {
  color: #2622f0;
  text-decoration: none;
}
</style>
