<template>
  <div class="register-container">
    <div class="background"></div>

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
      <router-link to="/login" class="button login"><span>Login</span></router-link>
      <router-link to="/register" class="button register"><span>Register</span></router-link>
    </div>

    <h1 class="create-account">Create an Account</h1>

    <form @submit.prevent="submitForm" class="form">
      <div class="input-field">
        <input type="text" v-model="fullName" placeholder="Full Name*" required />
      </div>
      <div class="input-field">
        <input type="email" v-model="email" placeholder="School email address*" required />
      </div>

      <div class="input-row">
        <div class="input-field-number">
          <input type="text" v-model="idNumber" placeholder="ID Number*" required />
        </div>
        <div class="input-field-department">
          <select v-model="department" required>
            <option value="" disabled selected>Department*</option>
            <option value="CAS">CAS</option>
            <option value="CEIT">CEIT</option>
            <option value="COT">COT</option>
            <option value="CTE">CTE</option>
          </select>
        </div>
        <div class="input-field-contact">
          <input type="text" v-model="contactNumber" placeholder="Contact Number*" required />
        </div>
      </div>

      <div class="input-row">
        <div class="input-field-password">
          <input type="password" v-model="password" placeholder="Password*" required />
        </div>
        <div class="input-field-confirm">
          <input type="password" v-model="confirmPassword" placeholder="Confirm Password*" required />
        </div>
      </div>

      <div class="button register-btn" @click="submitForm">
        <span>Register</span>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      fullName: "",
      email: "",
      idNumber: "",
      department: "",
      contactNumber: "",
      password: "",
      confirmPassword: "",
    };
  },
  methods: {
    async submitForm() {
      if (this.password !== this.confirmPassword) {
        alert("Passwords do not match.");
        return;
      }

      if (!this.email.endsWith("@ssct.edu.ph")) {
        alert("Please use a valid SSCT email address.");
        return;
      }

      try {
        const response = await axios.post("http://localhost:8000/api/register", {
          fullName: this.fullName,
          email: this.email,
          idNumber: this.idNumber,
          department: this.department,
          contactNumber: this.contactNumber,
          password: this.password,
        });


        if (response.data.success) {
          alert("Registration successful! Please log in.");
          this.$router.push({ name: "login" });
        } else {
          alert(response.data.message || "Registration failed. Please try again.");
        }
      } catch (error) {
        console.error(error);
        alert("An error occurred during registration.");
      }
    },
  },
};
</script>


<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Abel&family=Bruno+Ace+SC&family=Italianno&display=swap");

.register-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Ensure it takes full height */
  text-align: center;
  overflow: hidden;
}

.background {
  background-image: url("@/assets/snsuphoto.png");
  background-size: cover;
  background-position: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
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
  margin-top: 205px;
  margin-left: 5px;
  text-align: center;
  padding-top: 30px;
  margin-bottom: -40px;
}

.button-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  width: 100%; /* This ensures it stretches across */
  justify-content: space-evenly; /* Spread the buttons evenly */
}

.button {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease-out;
  margin: 70px;
}

.button.login {
  width: 300px;
  height: 43px;
  background: rgba(217, 217, 217, 0.16);
  border: 2px solid #eff32b;
  display: flex;
  justify-content: left;
  align-items: left;
  position: relative;
  margin-bottom: 10px;
  text-decoration: none;
}

.button.login span {
  color: #fff;
  font-size: 25px;
  margin-left: 30px;
}

.button.register {
  width: 130px;
  height: 39px;
  background-color: #2fa725;
  border: 1px solid #31c024;
  position: absolute;
  right: 1px; /* Adjust position inside the login button */
  top: 1px;
  margin-right: 530px;
  margin-top: 188px;
  margin-bottom: 1px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  text-decoration: none;
  padding: 10px;
}

.button.register span {
  color: #fff;
  font-size: 25px;
  margin-left: 5px;
}

.create-account {
  color: #fff;
  font-size: 30px;
  font-weight: regular;
  margin: 20px 0;
  text-align: center;
  margin-bottom: 2px;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%; /* Take up full width */
  max-width: 600px; /* Limit form width */
  margin: 0 auto; /* Center form */
  margin-bottom: 0px;
}

.input-row {
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 800px;
  margin-bottom: 3px;
}

.input-field {
  width: 600px;
  height: 38px;
  background: #d9d9d9;
  border-radius: 50px;
  display: flex;
  align-items: center;
  padding-left: 30px;
  text-align: center;
  margin-left: 0px;
}
.input-field input {
  width: 100%;
  height: 100%;
  border: none;
  background: transparent;
  font-size: 14px;
  color: #000;
  font-family: "Inter", sans-serif;
  outline: none;
}

.input-field-number {
  width: 250px;
  height: 38px;
  background: #d9d9d9;
  border-radius: 50px;
  display: flex;
  align-items: left;
  padding-left: 20px;
  margin-right: 20px;
}

.input-field-number input {
  width: 100%;
  height: 100%;
  border: none;
  background: transparent;
  font-size: 14px;
  color: #000;
  font-family: "Inter", sans-serif;
  outline: none;
}

.input-field-department select {
  width: 100%;
  height: 100%;
  border: none;
  background: transparent;
  font-size: 14px;
  color: gray;
  font-family: "Inter", sans-serif;
  outline: none;
}

.input-field-department select option:not(:first-child) {
  color: black;
}

.input-field-department select:focus,
.input-field-department select:valid {
  color: black;
}

.input-field-department {
  width: 250px;
  height: 38px;
  background: #d9d9d9;
  border-radius: 50px;
  display: flex;
  align-items: center;
  padding-left: 20px;
  margin-right: 20px;
}

.input-field-contact {
  width: 250px;
  height: 38px;
  background: #d9d9d9;
  border-radius: 50px;
  display: flex;
  align-items: left;
  padding-left: 20px;
}

.input-field-contact input {
  width: 100%;
  height: 100%;
  border: none;
  background: transparent;
  font-size: 14px;
  color: #000;
  font-family: "Inter", sans-serif;
  outline: none;
}

.input-field-password {
  width: 250px;
  height: 38px;
  background: #d9d9d9;
  border-radius: 50px;
  display: flex;
  align-items: left;
  padding-left: 20px;
  margin-left: 125px;
  margin-right: 20px;
}

.input-field-password input {
  width: 100%;
  height: 100%;
  border: none;
  background: transparent;
  font-size: 14px;
  color: #000;
  font-family: "Inter", sans-serif;
  outline: none;
}

.input-field-confirm {
  width: 250px;
  height: 38px;
  background: #d9d9d9;
  border-radius: 50px;
  display: flex;
  align-items: left;
  padding-left: 20px;
  margin-right: 135px;
}

.input-field-confirm input {
  width: 100%;
  height: 100%;
  border: none;
  background: transparent;
  font-size: 14px;
  color: #000;
  font-family: "Inter", sans-serif;
  outline: none;
}

.register-btn {
  width: 260px;
  height: 43px;
  background-color: #2fa725;
  border: 1px solid #31c024;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease-out;
  margin-left: 170px;
  margin-bottom: 190px;
  margin-top: 10px;
}

.register-btn:hover {
  background-color: #31c024;
}

.register-btn span {
  color: #fff;
  font-size: 20px;
}

.button.login:hover,
.register-btn:hover {
  animation: dissolve 300ms ease-out;
}

@keyframes dissolve {
  from {
    opacity: 1;
  }
  to {
    opacity: 0.8;
  }
}

@media (max-width: 768px) {
  .main-title {
    font-size: 24px;
  }

  .button.login span,
  .button.register span,
  .register-btn span {
    font-size: 18px;
  }

  .register-container {
    padding: 10px;
  }

  .logo {
    width: 90px;
    height: 80px;
  }

  .logo-text {
    margin-left: 10px;
  }

  .logo-title {
    color: #ffe9e9;
    font-family: "Bruno Ace SC", sans-serif;
    font-size: 25px;

    .tagline {
      font-size: 7px;
    }
  }
}
</style>
