<template>
  <div class="dashboard-container">
    <Header />
    <div class="content-wrapper">
      <Sidebar />
      <div class="main-content">
        <ManageTable
          title="Manage Found Items"
          :columns="[
            'Item ID',
            'Item Name',
            'Reported Date',
            'Status',
            'Location',
            'Found by',
            'Action',
          ]"
          :fields="['id', 'name', 'date', 'status', 'location', 'foundBy']"
          :items="foundItems"
        />
      </div>
    </div>
  </div>
</template>

<script>
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
      foundItems: [
        {
          id: 1,
          name: "Umbrella",
          date: "Sept. 23, 2024",
          status: "Found",
          location: "Canteen",
          foundBy: "Rena Rabe",
        },
        {
          id: 2,
          name: "Phone Case",
          date: "Sept. 28, 2024",
          status: "Found",
          location: "EB Room 209",
          foundBy: "Soliel Reigo",
        },
        {
          id: 3,
          name: "Red Record Book",
          date: "Sept. 29, 2024",
          status: "Found",
          location: "Student Center",
          foundBy: "Kimberlyn Pareja",
        },
        {
          id: 4,
          name: "Money 100 pesos",
          date: "Sept. 30, 2024",
          status: "Found",
          location: "Stair Exit",
          foundBy: "Kim Talictic",
        },
        {
          id: 5,
          name: "Makeup",
          date: "Oct. 01, 2024",
          status: "Lost",
          location: "Academic Hall",
          foundBy: "Maureen Paas",
        },
        {
          id: 6,
          name: "Headset",
          date: "Oct. 02, 2024",
          status: "Found",
          location: "EB Room 310",
          foundBy: "Ralph Narada",
        },
        {
          id: 7,
          name: "Yellow Pad",
          date: "Oct. 03, 2024",
          status: "Found",
          location: "Library",
          foundBy: "John Narada",
        },
        {
          id: 8,
          name: "Bracelet",
          date: "Oct. 04, 2024",
          status: "Found",
          location: "Field",
          foundBy: "Aighyne Pareja",
        },
        // Add more found items as needed
      ],
    };
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
  background-color: #dcdbdb;
}
.view-button, .edit-button {
  padding: 10px 20px;
  font-size: 14px;
  border: none;
  cursor: pointer;
  margin: 5px;
  transition: background-color 0.3s;
}
/* View Button Color */
.view-button {
  background-color: #4CAF50; /* Green */
  color: white;
}
.view-button:hover {
  background-color: #45a049; /* Darker green on hover */
}

/* Edit Button Color */
.edit-button {
  background-color: #f79409; /* Orange */
  color: white;
}

.edit-button:hover {
  background-color: #e08e39; /* Darker orange on hover */
}
/* Add other main-content-specific styles */
</style>
