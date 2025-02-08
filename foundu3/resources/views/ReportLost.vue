<template>
    <main>
      <section class="report-section">
        <h2>Report Lost Item</h2>
        <form class="report-form" @submit.prevent="submitForm">
          <div class="form-group">
            <label for="item-name">Item Name:</label>
            <input type="text" v-model="formData.itemName" required>
          </div>
          <div class="form-group">
            <label for="landmark">Landmark:</label>
            <input type="text" v-model="formData.landmark" required>
          </div>
          <div class="form-group">
            <label for="contact-details">Contact Details:</label>
            <input type="text" v-model="formData.contactDetails" required>
          </div>
          <div class="form-group">
            <label for="date-lost">Date Lost:</label>
            <input type="date" v-model="formData.dateLost" required>
          </div>
          <div class="form-group">
            <label for="time-lost">Time Lost:</label>
            <input type="time" v-model="formData.timeLost" required>
          </div>
          <div class="form-group">
            <label for="item-description">Item Description:</label>
            <textarea v-model="formData.itemDescription" rows="4" style="width: 400px; height: 100px;" required placeholder="Write a detailed description of the item..."></textarea>
          </div>
          <div class="form-group">
            <label for="upload-photo">Upload Photo:</label>
            <input type="file" @change="handleFileUpload" accept="image/*">
          </div>
          <div class="form-actions">
            <button type="submit" class="submit-btn">Submit</button>
            <button type="reset" class="reset-btn" @click="resetForm">Reset</button>
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
        itemName: '',
        landmark: '',
        contactDetails: '',
        dateLost: '',
        timeLost: '',
        itemDescription: '',
        photo: null,
      },
    };
  },
  methods: {
    submitForm() {
      // Retrieve existing items from localStorage or initialize an empty array
      let lostItems = JSON.parse(localStorage.getItem('lostItems')) || [];

      // Add the new lost item to the list
      lostItems.push(this.formData);

      // Save the updated list back to localStorage
      localStorage.setItem('lostItems', JSON.stringify(lostItems));

      // Set a flag in localStorage to show the popup in Lost.vue
      localStorage.setItem('showPopup', 'true');

      // Redirect to the Lost.vue page
      this.$router.push('/lost');
    },
    handleFileUpload(event) {
      this.formData.photo = event.target.files[0];
    },
    resetForm() {
      this.formData = {
        itemName: '',
        landmark: '',
        contactDetails: '',
        dateLost: '',
        timeLost: '',
        itemDescription: '',
        photo: null,
      };
    }
  }
};
</script>

  
  <style scoped>

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
  max-width: 650px;
  height:700px;
  margin: 0 auto;
  background: rgba(255, 254, 254, 0.40);
  padding: 20px;
  border-radius: 14px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border: 1px solid black;
}

.form-group {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
}

.form-group label {
  font-size: 18px;
  font-weight: 500;
  margin-right: 10px;
  width: 250px;
  margin-top: 25px;
}

.form-group input {
  width: 400px;
  height: 38px;
  padding: 8px;
  border-radius: 8px;
  background: #D9D9D9;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25) inset;
  border: none;
  margin-top: 25px;
}

.form-group textarea {
  width: 400px; /* Matches the width of your input fields */
  padding: 8px; 
  border-radius: 8px;
  background: #D9D9D9;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25) inset;
  border: none;
  margin-top: 25px;
  resize: vertical; /* Allow users to resize vertically */
}


.form-actions {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.submit-btn, .reset-btn {
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
}

.submit-btn {
  background-color: #2C2C2C;
  color: #fff;
  border: none;
  margin-left: 158px;
  margin-top: 25px;
  
}

.reset-btn {
  background-color: #D9D9D9D9;
  border: black;
  margin-left: 100px;
  margin-top: 25px;
  height: 45px;
}  </style>
  