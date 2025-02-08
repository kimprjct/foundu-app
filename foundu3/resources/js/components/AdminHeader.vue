<template>
  <header class="header">
    <div class="header-logo"></div>
    <img src="@/assets/snsulogo.png" alt="Logo" class="logo-image" />
    <div class="header-title">
      <h1 class="logo-content">FoundU</h1>
      <p class="logo-content-2">Discover. Connect. Reclaim.</p>
    </div>
    <div class="header-controls">
      <!-- Notification Bell Icon with Red Badge -->
      <button class="notification-icon" @click="toggleNotifications">
        &#128276;
        <span v-if="notificationCount > 0" class="notification-badge">{{ notificationCount }}</span>
      </button>

      <!-- Admin Dropdown -->
      <select class="admin-dropdown" @change="navigate($event)">
        <option value="#">Admin</option>
        <option value="logout">Logout</option>
      </select>
    </div>

    <!-- Notification Popup -->
    <div class="notifications-popup" v-if="notificationsActive">
      <div class="notifications-header">
        <h3>Notifications</h3>
      </div>
      <ul class="notification-list">
        <li v-for="(notification, index) in notifications" :key="index">
          <span>{{ index + 1 }}.</span> {{ notification.message }}<br>
          <span>Date: {{ notification.date }}</span><br>
          <router-link :to="notification.link" class="review-btn">Review</router-link>
        </li>
      </ul>
      <router-link to="/home" class="view-all">View All Notifications</router-link>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      // Notification Data
      notificationsActive: false,
      notifications: [
        { message: "New Claim Request", date: "October 5, 2024 | 10:20 AM", link: "/claim-request" },
        { message: "New Found Item Reported", date: "October 5, 2024 | 9:01 AM", link: "/found-request" },
        { message: "Claim Rejected", date: "October 4, 2024", link: "/claim-request" }
      ],
      notificationCount: 3, // Sample notification count
    };
  },
  methods: {
    toggleNotifications() {
      // Toggle the visibility of the notification popup
      this.notificationsActive = !this.notificationsActive;
    },
    navigate(event) {
      const value = event.target.value;
      if (value === 'logout') {
        this.$router.push({ name: 'login' });  // Redirect to login page
      }
    }
  }
};
</script>

<style scoped>
.header {
  width: 100%;
  height: 100px;
  background-color: #d9d9d9;
  display: flex;
  align-items: center;
  padding: 0 20px;
  box-shadow: 0 4px 2px -2px gray;
  margin-bottom: 1px;
}

.content-wrapper {
  display: flex;
  width: 100%;
}

.header-controls {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 10px;
}

.header-title {
  display: flex;
  flex-direction: column;
  margin-left: 0;
}

.logo-image {
  width: 85px;
  height: 85px;
}

.logo-content {
  font-family: "Bruno Ace SC", sans-serif;
  font-size: 24px;
  font-weight: bold;
}

.logo-content-2 {
  font-family: "Abel", sans-serif;
  font-size: 16px;
  font-weight: normal;
}

.notification-icon {
  font-size: 24px;
  cursor: pointer;
  background: none;
  border: none;
  position: relative; /* Ensure badge is positioned relative to the bell */
}

.notification-badge {
  width: 20px;  /* Increase the size of the badge */
  height: 20px;
  background-color: red;
  color: rgb(245, 245, 245);
  border-radius: 50%;
  position: absolute;
  top: -2px;  /* Bring the badge closer to the top of the bell */
  right: -2px; /* Bring the badge closer to the right of the bell */
  font-size: 12px;  /* Adjust font size to fit within the badge */
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid #eb0707;  /* Optional: add border to make it stand out more */
}


.admin-dropdown {
  padding: 8px 10px;
  font-size: 16px;
  border-radius: 7px;
  background-color: white;
  border: 1px solid #ccc;
}

.notification-icon:hover {
  color: #007bff;
}

.admin-dropdown:hover {
  background-color: #c0c0c0;
}

/* Notification Popup Styling */
.notifications-popup {
  position: absolute;
  top: 100px;
  right: 20px;
  width: 300px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  padding: 15px;
  font-style: arial;
  font-weight: 500;
}

.notifications-header {
  padding: 10px;
  color: rgb(13, 13, 13);
  font-weight: bold;
  font-size: 20px;
}

.notification-list {
  list-style: none;
  padding: 0;
}

.notification-list li {
  padding: 10px;
  border-bottom: 1px solid #fcfcfc;
}

.review-btn {
  display: inline-block;
  padding: 8px 16px;  /* Adds padding to make it look like a button */
  background-color: #ef7008;  /* Sets the background color to match the original text color */
  color: rgb(18, 18, 18);  /* Text color inside the button */
  text-decoration: none;  /* Remove underline from the link */
  border-radius: 5px;  /* Rounds the corners of the button */
  font-size: 14px;  /* Adjust the font size */
  text-align: center;  /* Centers the text inside the button */
  cursor: pointer;  /* Shows a pointer cursor on hover */
  transition: background-color 0.3s ease, transform 0.2s ease;  /* Adds transition effects */
  font-weight: 500;
}
.view-all {
  display: block;
  padding: 10px;
  text-align: center;
  color: rgb(10, 113, 209);
  text-decoration: underline;
  border-radius: 5px;
}
</style>
