<template>
  <aside class="sidebar">
    <div class="profile-section">
      <img src="@/assets/avatar.png" alt="Profile Image" class="profile-image" />
      <span class="profile-name">KRK</span>
    </div>
    <nav class="sidebar-menu">
      <router-link to="/admin-home" :class="['nav-link', { active: $route.name === 'adminHome' }]">Home</router-link>
      <router-link to="/manage-lost" :class="['nav-link', { active: $route.name === 'manageLost' }]">Manage Lost Items</router-link>
      <router-link to="/manage-found" :class="['nav-link', { active: $route.name === 'manageFound' }]">Manage Found Items</router-link>
      <router-link to="/claimrequest" :class="['nav-link', { active: $route.name === 'claimRequest' }]">Claim Requests</router-link>
      <router-link to="/foundrequest" :class="['nav-link', { active: $route.name === 'foundRequest' }]">Found Requests</router-link> <!-- Added this link -->
      <router-link to="/usermanagement" :class="['nav-link', { active: $route.name === 'userManagement' }]">User Management</router-link>
      <router-link to="/claimhistory" :class="['nav-link', { active: $route.name === 'claimHistory' }]">Claim History</router-link>
    </nav>
  </aside>
</template>

<script>
export default {};
</script>

<style scoped>
.sidebar {
  width: 250px;
  background-color: #d9d9d9;
  padding-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-right: 1px solid #ccc;
  height: calc(170vh - 100px); /* Full height minus header height */
}

.profile-section {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 30px;
  margin-bottom: 20px;
}

.profile-image {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-size: cover;
  background-position: center;
  margin-right: 10px;
}

.profile-name {
  font-weight: bold;
  font-size: 18px;
}

.sidebar-menu {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.nav-link {
  padding: 10px;
  color: #333;
  text-align: center;
  text-decoration: none;
  margin: 5px 0;
  background-color: #e5e5e5;
  border-radius: 0px;
  transition: background-color 0.3s;
  font-size: 18px;
}

.nav-link:hover {
  background-color: #c0c0c0;
}

.nav-link.active {
  background-color: #a9a9a9;
  color: black;
}
</style>
