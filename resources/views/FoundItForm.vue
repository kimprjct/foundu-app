<template>
    <main>
      <section class="report-section">
        <h2>Found Item Verification Form</h2>
        <form class="report-form" @submit.prevent="handleSubmit">
          <div class="form-group">
            <label for="fullname">Full Name:</label>
            <input type="text" id="fullname" v-model="form.fullname" required />
          </div>
          <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" id="email" v-model="form.email" required />
          </div>
          <div class="form-group">
            <label for="phone-number">Phone Number:</label>
            <input type="tel" id="phone-number" v-model="form.phoneNumber" required />
          </div>
          <div class="form-group">
            <label for="date-found">Date Found:</label>
            <input type="date" id="date-found" v-model="form.dateFound" required />
          </div>
          <div class="form-group">
            <label for="location">Location or Landmark:</label>
            <input type="text" id="location" v-model="form.location" required />
          </div>
          <div class="form-group">
            <label for="item-description">Description of the Found Item:</label>
            <textarea id="item-description" v-model="form.itemDescription" rows="4" required placeholder="Write a detailed description of the item..."></textarea>
          </div>
          <div class="form-group">
            <label for="upload-photo">Upload Photo:</label>
            <input type="file" id="upload-photo" @change="handleFileUpload" accept="image/*" />
          </div>
          <div class="checkbox-group">
            <input type="checkbox" id="certify" v-model="form.certify" />
            <label for="certify">I certify that I found this item and the information provided is accurate and truthful.</label>
          </div>
          <div class="form-actions">
            <button type="submit" class="submit-btn">Submit</button>
            <button type="reset" @click="resetForm" class="reset-btn">Reset</button>
          </div>
        </form>
      </section>
    </main>
  </template>
  
  <script>
  export default {
    name: "FoundItForm",
    data() {
      return {
        form: {
          fullname: "",
          email: "",
          phoneNumber: "",
          itemDescription: "",
          dateFound: "",
          location: "",
          file: null,
          certify: false,
        },
      };
    },
    methods: {
      handleFileUpload(event) {
        this.form.file = event.target.files[0];
      },
      handleSubmit() {
        console.log("Submitting form...");
  
        if (!this.form.certify) {
          alert("Please certify that the information provided is accurate.");
          return;
        }
  
        const selectedItemIndex = localStorage.getItem("selectedItemIndex");
        if (selectedItemIndex === null) {
          console.log("No selected item index in localStorage.");
          return;
        }
  
        const lostItems = JSON.parse(localStorage.getItem("lostItems")) || [];
        if (lostItems[selectedItemIndex]) {
          lostItems[selectedItemIndex].found = true;
          localStorage.setItem("lostItems", JSON.stringify(lostItems));
          console.log("Item status updated in localStorage.");
        } else {
          console.log("Invalid item index in localStorage.");
          return;
        }
  
        console.log("Navigating to Lost page...");
        this.$router.push('/lost'); // Make sure the route name matches the router setup
      },
      resetForm() {
        this.form = {
          fullname: "",
          email: "",
          phoneNumber: "",
          itemDescription: "",
          dateFound: "",
          location: "",
          file: null,
          certify: false,
        };
      },
    },
  };
  </script>
  
  <style scoped>
  @import url("https://fonts.googleapis.com/css2?family=Abel&family=Bruno+Ace+SC&family=Inter:wght@400;500;600&display=swap");
  
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
    font-size: 14px;
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
    font-size: 12px;
  }
  
  .checkbox-group input[type="checkbox"] {
    width: 15px;
    height: 15px;
    margin-right: 15px;
  }
  
  .submit-btn, .reset-btn {
    padding: 8px 16px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 14px;
  }
  
  .submit-btn {
    background-color: #2C2C2C;
    color: #fff;
    border: none;
    margin-left: 158px;
    margin-top: 25px;
    height: 40px;
  }
  
  .reset-btn {
    background-color: #D9D9D9;
    border: 1px solid black;
    margin-left: 100px;
    margin-top: 25px;
    height: 40px;
  }
  </style>
  