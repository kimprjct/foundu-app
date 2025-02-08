<template>
  <div class="main-container">
    <h2 class="profile-heading">Profile</h2>
    <div class="profile-section">
      <form class="profile-form">
        <div class="profile-picture">
          <input
            type="file"
            id="profile-pic"
            accept="image/*"
            @change="handleFileChange"
            style="display: none"
          />
          <label for="profile-pic" class="profile-image">
            <img
              :src="profileImage"
              alt="Profile Picture"
              id="profile-image"
              v-if="profileImage"
            />
            <span v-else>Upload Image</span>
          </label>
        </div>

        <div>
          <label for="name">Name</label>
          <input type="text" id="name" v-model="profile.name" placeholder="" />
        </div>
        <div>
          <label for="id-number">ID Number</label>
          <input type="text" id="id-number" v-model="profile.idNumber" placeholder="" />
        </div>
        <div>
          <label for="department">Department</label>
          <select id="department" v-model="profile.department">
            <option value="">Department</option>
            <option value="CAS">CAS</option>
            <option value="CEIT">CEIT</option>
            <option value="COT">COT</option>
            <option value="CTE">CTE</option>
          </select>
        </div>
        <div>
          <label for="contact-number">Contact Number</label>
          <input
            type="tel"
            id="contact-number"
            v-model="profile.contactNumber"
            placeholder=""
          />
        </div>
        <div>
          <label for="email">School Email Address</label>
          <input type="email" id="email" v-model="profile.email" placeholder="" />
        </div>
        <div>
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            v-model="profile.password"
            placeholder=""
          />
        </div>
        <button type="button" @click="showModal = true" class="edit-profile-btn">
          Edit Profile
        </button>
      </form>
    </div>

    <div class="posted-items">
      <h2>Items You Posted</h2>
      <div id="posted-items-container" class="item-grid">
        <div v-for="item in postedItems" :key="item.id" class="item-card">
          <div class="item-info">
            <h3>{{ item.title }}</h3>
            <p>Posted by: {{ item.reporterName }}</p>
            <p>Location: {{ item.location }}</p>
            <p>Description: {{ item.description }}</p>
            <button class="delete-item-btn" @click="deleteItem(item.id)">
              Delete Item
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal for editing profile -->
    <div v-if="showModal" class="modal-overlay">
      <div class="modal-content">
        <h2>Edit Profile</h2>
        <form @submit.prevent="saveChanges">
          <div>
            <label for="modal-name">Name:</label>
            <input type="text" id="modal-name" v-model="profile.name" />
          </div>
          <div>
            <label for="modal-id-number">ID Number:</label>
            <input type="text" id="modal-id-number" v-model="profile.idNumber" />
          </div>
          <div>
            <label for="modal-department">Department:</label>
            <select id="modal-department" v-model="profile.department">
              <option value="CAS">CAS</option>
              <option value="CEIT">CEIT</option>
              <option value="COT">COT</option>
              <option value="CTE">CTE</option>
            </select>
          </div>
          <div>
            <label for="modal-contact-number">Contact Number:</label>
            <input type="tel" id="modal-contact-number" v-model="profile.contactNumber" />
          </div>
          <div>
            <label for="modal-email">School Email Address:</label>
            <input type="email" id="modal-email" v-model="profile.email" />
          </div>
          <div>
            <label for="modal-password">Password:</label>
            <input type="password" id="modal-password" v-model="profile.password" />
          </div>
          <!-- Save and Cancel buttons -->
          <button type="submit">Save Changes</button>
          <button type="button" @click="showModal = false">Cancel</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showModal: false, // Controls modal visibility
      profile: {
        name: "",
        idNumber: "",
        department: "",
        contactNumber: "",
        email: "",
        password: "",
      },
      profileImage: null,
      postedItems: [],
    };
  },
  mounted() {
    // Retrieve user data from localStorage
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
      this.profile.name = currentUser.fullName;
      this.profile.email = currentUser.email;
      this.profileImage = currentUser.profilePicture || "";
    }
  },
  methods: {
    handleFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.profileImage = URL.createObjectURL(file);
      }
    },
    editProfile() {
      const updatedProfile = { ...this.profile, profileImage: this.profileImage };
      localStorage.setItem("currentUser", JSON.stringify(updatedProfile));
      console.log("Profile updated:", updatedProfile); // Debugging
    },
    saveChanges() {
      this.editProfile();
      this.showModal = false; // Close the modal after saving
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
  --sds-color-border-default-default: #d9d9d9;
  --sds-color-background-default-secondary-hover: #e6e6e6;
  --sds-color-text-brand-on-brand-secondary: #1e1e1e;
}

.main-container {
  padding: 20px;
}

.profile-heading {
  font-size: 45px;
  font-weight: 700;
  font-family: "Inter", sans-serif;
  text-align: center;
  margin-bottom: 20px;
  background: linear-gradient(90deg, red, #13f00057, #4d0000, #004d00, #13f000, #ae0000);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.profile-picture {
  position: relative;
  width: 100px;
  height: 100px;
  margin: 0 auto;
  border-radius: 50%;
  overflow: hidden;
  background-color: #e0e0e0;
  border: 2px dashed #ccc;
}

.profile-pic-label {
  display: block;
  width: 100%;
  height: 100%;
  cursor: pointer;
  position: relative;
}

#profile-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
}

.profile-section {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  border-radius: 6px;
  border: 1px solid #000;
  background: rgba(217, 217, 217, 0);
  margin-top: 20px;
}

.profile-form {
  display: flex;
  flex-direction: column;
  gap: var(--sds-size-space-600);
  text-align: left;
}

.profile-form label {
  font-weight: 600;
  color: #555;
  margin-bottom: 5px;
  margin-left: 33px;
}

.profile-form input,
.profile-form select {
  margin-bottom: 10px;
  margin-left: 33px;
  padding: 7px;
  font-size: 16px;
  width: 85%;
  border-radius: 8px;
  background: #d3d3d3;
  border: none;
}

button {
  
  margin-left: 130px;
  padding: 10px;
  border-radius: 8px;
  background-color: #d9d9d9;
  color: #2d2c2c;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  border-color: black;
  width: 200px;

  
}

button:hover {
  background-color: #d9d9d9;
}

.edit-profile-btn {
  margin-top: 15px;
  background-color: #d9d9d9;
  border: black;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  width: 400px;
}

.modal-content h2 {
  margin-bottom: 20px;
  text-align: center;
}

.modal-content input {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.modal-content button {
  width: 48%;
  margin: 10px 1%;
}

.item-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.item-card {
  background-color: #fff;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.delete-item-btn {
  background-color: red;
  color: white;
  padding: 5px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.delete-item-btn:hover {
  background-color: darkred;
}
</style>
