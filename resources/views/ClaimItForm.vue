<template>
    <main>
      <section class="report-section">
        <h2>Claim Verification Form</h2>
        <form @submit.prevent="handleSubmit" class="report-form" id="lost-item-form">
          <div class="form-group">
            <label for="fullname">Full Name:</label>
            <input type="text" v-model="formData.fullname" required />
          </div>
          <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" v-model="formData.email" required />
          </div>
          <div class="form-group">
            <label for="phone-number">Phone Number:</label>
            <input type="number" v-model="formData.phoneNumber" required />
          </div>
          <div class="form-group">
            <label for="item-description">Description of Lost Item:</label>
            <textarea v-model="formData.itemDescription" rows="4" required placeholder="Write a detailed description of your lost item..."></textarea>
          </div>
          <div class="form-group">
            <label for="date-found">Date of Lost:</label>
            <input type="date" v-model="formData.dateLost" required />
          </div>
          <div class="form-group">
            <label for="location">Location or Landmark:</label>
            <input type="text" v-model="formData.location" required />
          </div>
          <div class="form-group">
            <label for="upload-photo">Upload Photo:</label>
            <input type="file" @change="handleFileUpload" accept="image/*" />
          </div>
          <div class="checkbox-group">
            <input type="checkbox" id="certify" v-model="formData.certify" required />
            <label for="certify">I certify that the information provided is accurate and truthful.</label>
          </div>
          <div class="form-actions">
            <button type="submit" class="submit-btn">Submit</button>
            <button type="reset" class="reset-btn">Reset</button>
          </div>
        </form>
      </section>
    </main>
  </template>
  
  <script>
  export default {
    data() {
      return {
        formData: {
          fullname: '',
          email: '',
          phoneNumber: '',
          itemDescription: '',
          dateLost: '',
          location: '',
          photo: null,
          certify: false,
        },
      };
    },
    methods: {
      handleSubmit() {
        const selectedItemIndex = localStorage.getItem('itemToClaim');
        if (selectedItemIndex === null) return;
  
        const foundItems = JSON.parse(localStorage.getItem('foundItems')) || [];
        foundItems[selectedItemIndex].claimed = true;
        localStorage.setItem('foundItems', JSON.stringify(foundItems));
  
        localStorage.setItem('claimVerificationComplete', 'true');
        this.$router.push({ name: 'found' });
      },
      handleFileUpload(event) {
        this.formData.photo = event.target.files[0];
      },
    },
  };
  </script>
  
  <style scoped>
  @import url("https://fonts.googleapis.com/css2?family=Abel&family=Bruno+Ace+SC&family=Inter:wght@400;500;600&display=swap");
  
  :root {
    --sds-size-space-800: 16px;
    --sds-size-space-600: 12px;
    --sds-size-space-200: 8px;
    --sds-size-radius-200: 8px;
    --sds-size-stroke-border: 1px;
    --sds-color-border-default-default: #D9D9D9;
    --sds-color-background-default-secondary-hover: #E6E6E6;
    --sds-color-text-brand-on-brand-secondary: #1E1E1E;
  }
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    font-family: 'Inter', sans-serif;
    background: linear-gradient(90deg, #FFE9E9 0%, #EDFFBB 100%);
    background-attachment: fixed;
  }
  
  /* Autofill color override */
  input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 1000px #D9D9D9 inset !important;
    -webkit-text-fill-color: black !important;
    transition: background-color 5000s ease-in-out 0s;
  }
  
  input:-webkit-autofill:focus {
    -webkit-box-shadow: 0 0 0 1000px #D9D9D9 inset !important;
    -webkit-text-fill-color: black !important;
  }
  
  .report-section {
    padding: 20px;
  }
  
  .report-section h2 {
    font-size: 45px;
    font-weight: 600;
    text-align: center;
    margin-bottom: 30px;
    margin-top: 20px;
    background: linear-gradient(90deg, #AE0000, #13F000);
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  
  .report-form {
    width: 100%;
    max-width: 700px;
    height: 750px;
    margin: 0 auto;
    background: rgba(255, 254, 254, 0.40);
    padding: 20px;
    border-radius: 14px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border: 1px solid black;
  }
  
  .checkbox-group {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 45px;
    font-size: 14px;
  }
  
  .checkbox-group input[type="checkbox"] {
    width: 15px;
    height: 15px;
    margin-right: 15px;
  }
  
  .form-group {
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
    gap: 10px;
  }
  
  .form-group label {
    font-size: 16px;
    font-weight: 500;
    margin-right: 10px;
    width: 200px;
    margin-top: 25px;
  }
  
  .form-group input,
.form-group textarea {
    font-size: 14px; /* Reduced font size */
    width: 400px;
    padding: 8px;
    border-radius: 8px;
    background: #D9D9D9;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25) inset;
    border: none;
    margin-top: 25px;
}

.form-group textarea {
    resize: vertical;
}
  
  .form-actions {
    display: flex;
    gap: 10px;
    margin-top: 20px;
  }
  
  .checkbox-group {
    margin-left: 40px;
    display: flex;
    align-items: center;
    margin-top: 45px;
    font-size: 14px;
  }
  
  .checkbox-group input[type="checkbox"] {
    width: 15px;
    height: 15px;
    margin-right: 15px;
  }
  
  .submit-btn, .reset-btn {
    padding: 8px 16px;  /* Reduced padding for smaller buttons */
    border-radius: 8px;
    cursor: pointer;
    font-size: 14px;  /* Reduced font size */
}

.submit-btn {
    background-color: #2C2C2C;
    color: #fff;
    border: none;
    margin-left: 158px;
    margin-top: 25px;
    height: 40px;  /* Reduced height */
}

.reset-btn {
    background-color: #D9D9D9;
    border: var(--sds-size-stroke-border) solid var(--sds-color-border-default-default);
    margin-left: 100px;
    margin-top: 25px;
    height: 40px;  /* Reduced height */
    border: 1px solid black;
}

  </style>
  