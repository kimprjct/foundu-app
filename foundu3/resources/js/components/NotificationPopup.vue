<template>
  <div id="notification-popup">
    <!-- Close Button -->
    <button class="close-btn" @click="$emit('close')">
      <i class="fas fa-times"></i>
    </button>
    <h3>Notifications</h3>
    <div class="notification">
      <p class="notification-header">
        <i class="fas fa-bell bell-icon"></i>
        <strong>System Notification</strong>
        <span class="notification-date">09.29.2024</span>
      </p>
      <p>
        Your claim for the item Red Record Book has been approved! You can now
        proceed with the retrieval process by following these instructions:
      </p>
      <ul>
        <li>You can pick up your item at the University Student Council office.</li>
        <li>Please visit between 8:00 AM and 5:00 PM on weekdays only.</li>
        <li>Bring a valid ID (e.g., student ID, driver's license) for verification.</li>
        <li>
          If you have any questions, email us at
          <a href="mailto:foundu@gmail.com">foundu@gmail.com</a>.
        </li>
      </ul>
    </div>
    <div class="view-all">
      <router-link to="/notifications">View All Notifications</router-link> <!-- Updated link -->
    </div>
  </div>
</template>

<script>
export default {
  name: "NotificationPopup",
  emits: ["close"], // Emit an event to allow the parent to close the popup
};
</script>

<style scoped>
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css");

#notification-popup {
  margin-top: 90px;
  position: fixed;
  top: 14%;
  right: 2rem;
  width: 350px; /* Slightly smaller container width */
  background: #d9d9d9;
  padding: 1.5rem; /* Reduced padding for smaller popup */
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  z-index: 1000; /* Ensure popup is on top */
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 18px; /* Slightly smaller close button font size */
  cursor: pointer;
}

.close-btn i {
  color: #333;
}

.notification ul {
  margin-top: 8px;
  padding-left: 18px;
  color: #333;
  list-style-type: decimal;
  font-size: 0.9em; /* Smaller font size for list items */
}

.notification ul li {
  margin-bottom: 6px;
}

.notification-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.95em; /* Smaller font size for header */
  font-weight: bold;
  margin-bottom: 8px;
  gap: 8px;
}

.bell-icon {
  color: yellow;
  font-size: 16px; /* Smaller bell icon */
}

.fa-bell {
  font-size: 16px;
  color: #333;
}

.notification-date {
  color: black;
  font-weight: bold;
  font-size: 0.85em; /* Smaller date font size */
  margin-left: 40px;
}

.view-all {
  margin-top: 0.8rem;
  text-align: center;
}

.view-all a {
  color: #0056b3;
  text-decoration: none;
  font-size: 0.9em; /* Smaller link font size */
}

.view-all a:hover {
  text-decoration: underline;
}
</style>
