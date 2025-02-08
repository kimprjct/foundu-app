<template>
  <div class="dashboard-container">
    <Header />
    <div class="content-wrapper">
      <Sidebar />
      <div class="main-content">
        <ManageTable
          title="User Management"
          :columns="[ 
            'User ID',
            'Name',
            'Department',
            'Email',
            'Contact Number',
            'Actions'
          ]"
          :fields="[ 
            'userId',
            'name',
            'department',
            'email',
            'contactNumber'
          ]"
          :items="users"
          @view="viewUser"
          @edit="editUser"
          @delete="deleteUser"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Header from "@/components/AdminHeader.vue";
import Sidebar from "@/components/Sidebar.vue";
import ManageTable from "@/components/SecondTable.vue";

export default {
  components: {
    Header,
    Sidebar,
    ManageTable,
  },
  data() {
    return {
      users: [],
    };
  },
  methods: {
    // Fetch all users from the backend
    async fetchUsers() {
      try {
        const response = await axios.get("http://localhost:3000/api/users");
        this.users = response.data.users || [];
      } catch (error) {
        console.error("Error fetching users:", error);
        alert("Failed to fetch user data.");
      }
    },

    // View user details
    async viewUser(userId) {
      try {
        const response = await axios.get(`http://localhost:3000/api/users/${userId}`);
        const user = response.data.user;
        alert(`Viewing User:\n\nName: ${user.name}\nEmail: ${user.email}`);
      } catch (error) {
        console.error("Error viewing user:", error);
        alert("Failed to view user details.");
      }
    },

    // Edit user (mockup)
    async editUser(userId) {
      const updatedData = {
        name: prompt("Enter new name:"),
        email: prompt("Enter new email:"),
      };

      try {
        const response = await axios.put(`http://localhost:3000/api/users/${userId}`, updatedData);
        if (response.data.success) {
          alert("User updated successfully!");
          this.fetchUsers(); // Refresh the user list
        } else {
          alert("Failed to update user.");
        }
      } catch (error) {
        console.error("Error editing user:", error);
        alert("Failed to edit user.");
      }
    },

    // Delete user
    async deleteUser(userId) {
      if (confirm("Are you sure you want to delete this user?")) {
        try {
          const response = await axios.delete(`http://localhost:3000/api/users/${userId}`);
          if (response.data.success) {
            alert("User deleted successfully!");
            this.fetchUsers(); // Refresh the user list
          } else {
            alert("Failed to delete user.");
          }
        } catch (error) {
          console.error("Error deleting user:", error);
          alert("Failed to delete user.");
        }
      }
    },
  },
  created() {
    this.fetchUsers(); // Load users when the component is created
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
</style>
