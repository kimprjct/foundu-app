<template>
  <div class="dashboard-container">
    <!-- Header and Sidebar from the Admin Layout -->
    <Header>
      <template #notifications>
        <!-- Notifications Bell Icon in Header -->
        <button class="notification-btn" @click="toggleNotifications">
          <span class="bell-icon">🔔</span>
          <span class="notification-count">{{ notificationCount }}</span>
        </button>
      </template>
    </Header>
    <div class="content-wrapper">
      <Sidebar />
      <div class="main-content">
        <!-- Dashboard Content -->
        <div class="dashboard-content">
          <h2>DASHBOARD</h2>

          <!-- Stats Section -->
          <div class="stats">
            <div class="stat-box red">
              <router-link to="/manage-found">
                <h3>Total Number of Found Items</h3>
                <p>{{ foundItemsCount }}</p>
              </router-link>
            </div>
            <div class="stat-box yellow">
              <router-link to="/home">
                <h3>Pending Verifications</h3>
                <p>{{ pendingVerificationsCount }}</p>
              </router-link>
            </div>
            <div class="stat-box purple">
              <router-link to="/manage-lost">
                <h3>Total Number of Lost Items</h3>
                <p>{{ lostItemsCount }}</p>
              </router-link>
            </div>
          </div>

          <!-- Stats Row Section -->
          <div class="stats-row">
            <div class="stat-box green">
              <router-link to="/claim-history">
                <h3>Items Claimed</h3>
                <p>{{ claimedItemsCount }}</p>
              </router-link>
            </div>
            <div class="stat-box blue">
              <router-link to="/claim-request">
                <h3>Unclaimed Items</h3>
                <p>{{ unclaimedItemsCount }}</p>
              </router-link>
            </div>
          </div>

          <!-- Recent Activities Section -->
          <div class="recent-activities">
            <h2>Recent Activities</h2>
            <table>
              <tr>
                <th>Icon</th>
                <th>Activity Description</th>
                <th>Date/Time</th>
                <th>Action</th>
              </tr>
              <tr v-for="(activity, index) in recentActivities" :key="index">
                <td>{{ activity.icon }}</td>
                <td>{{ activity.description }}</td>
                <td>{{ activity.dateTime }}</td>
                <td>
                  <router-link :to="activity.link" class="view-btn">View</router-link>
                </td>
              </tr>
            </table>
          </div>

          <!-- Notifications Popup -->
          <div class="notifications-popup" :class="{ active: notificationsActive }">
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// Importing components
import Header from "@/components/AdminHeader.vue";
import Sidebar from "@/components/Sidebar.vue";

export default {
  components: {
    Header,
    Sidebar,
  },
  data() {
    return {
      // Counts for the stats
      foundItemsCount: 10,
      pendingVerificationsCount: 5,
      lostItemsCount: 15,
      claimedItemsCount: 4,
      unclaimedItemsCount: 3,

      // Recent activities
      recentActivities: [
        { icon: "🔍", description: "Wallet reported lost by Maria Batumbakal", dateTime: "Oct. 5, 2024 | 10:20 AM", link: "/manage-lost" },
        { icon: "📦", description: "Folder found by Maria Theresa", dateTime: "Oct. 5, 2024 | 9:01 AM", link: "/manage-lost" },
        { icon: "☂️", description: "Umbrella claimed by Soliel Riego", dateTime: "Oct. 4, 2024 | 9:30 AM", link: "/manage-found" }
      ],

      // Notifications
      notifications: [
        { message: "New Claim Request", date: "October 5, 2024 | 10:20 AM", link: "/claim-request" },
        { message: "New Found Item Reported", date: "October 5, 2024 | 9:01 AM", link: "/found-request" },
        { message: "Claim Rejected", date: "October 4, 2024", link: "/claim-request" }
      ],
      notificationCount: 3,
      notificationsActive: false,
    };
  },
  methods: {
    toggleNotifications() {
      this.notificationsActive = !this.notificationsActive;
    },
  },
};
</script>

<style scoped>
.dashboard-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1500px;
}

.content-wrapper {
  display: flex;
  width: 100%;
}

.main-content {
  flex: 1;
  padding: 20px;
  background-color: #d9d9d9;
}

.dashboard-content {
  padding: 20px;
  background-color: #d9d9d9;
}

.stats,
.stats-row {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 20px;
  font-weight: bold;
  font-size: 18px;
}

.stat-box {
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  width: 300px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.stat-box:hover {
  transform: scale(1.05);
}

.red { background-color: #e50909; }
.yellow { background-color: #f1c40f; }
.purple { background-color: #8e44ad; }
.green { background-color: #4caf50; }
.blue { background-color: #2196f3; }

.recent-activities {
  margin-top: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
  text-align: center;
}

table th, table td {
  padding: 10px;
  border: 1px solid #ddd;
  text-align: center;
}

.notification-btn {
  position: relative;
  background-color: transparent;
  border: none;
  font-size: 24px;
  cursor: pointer;
}

.bell-icon {
  font-size: 30px;
}

.notification-count {
  position: absolute;
  top: 0;
  right: 0;
  background-color: red;
  color: white;
  border-radius: 50%;
  padding: 3px 8px;
  font-size: 12px;
}

.notifications-popup {
  position: absolute;
  right: 20px;
  top: 70px;
  width: 300px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: none;
  z-index: 1000;
}

.notifications-popup.active {
  display: block;
}

.notifications-header {
  padding: 10px;
  background-color: #3498db;
  color: white;
}

.notification-list {
  list-style: none;
  padding: 0;
}

.notification-list li {
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.review-btn {
  color: #3498db;
  text-decoration: none;
}

.view-all {
  display: block;
  padding: 10px;
  text-align: center;
  background-color: #3498db;
  color: white;
  text-decoration: none;
  border-radius: 5px;
}

/* Style for View button */
.view-btn {
  color: rgb(15, 15, 15);
  background-color: #3498db;
  padding: 8px 12px;
  border-radius: 4px;
  text-decoration: none;
  font-weight: bold;
  display: inline-block;
  transition: background-color 0.3s ease;
}

.view-btn:hover {
  background-color: #2c80b4; /* Darker shade for hover effect */
}

</style>
