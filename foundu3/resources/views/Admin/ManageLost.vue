<template>
    <div class="dashboard-container">
      <Header />
      <div class="content-wrapper">
        <Sidebar />
        <div class="main-content">
          <ManageTable
            title="Manage Lost Items"
            :columns="[
              'Item ID',
              'Item Name',
              'Reported Date',
              'Status',
              'Location',
              'Lost by',
              'Action',
            ]"
            :fields="['id', 'name', 'date', 'status', 'location', 'lostBy']"
            :items="lostItems"
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
        lostItems: [
          {
            id: 1,
            name: "Key",
            date: "Sept. 24, 2024",
            status: "Lost",
            location: "Canteen",
            lostBy: "Kimberlyn Pareja",
          },
          {
            id: 2,
            name: "Wallet",
            date: "Sept. 23, 2024",
            status: "Lost",
            location: "Library",
            lostBy: "John Doe",
          },
          {
            id: 3,
            name: "Cellphone",
            date: "Sept. 25, 2024",
            status: "Lost",
            location: "LRC",
            lostBy: "Charity Rama",
          },
          {
            id: 4,
            name: "Flash drive",
            date: "Sept. 26, 2024",
            status: "Lost",
            location: "EB Room 310",
            lostBy: "Kim Mercadejas",
          },
          {
            id: 5,
            name: "Bag",
            date: "Sept. 26, 2024",
            status: "Lost",
            location: "Academic Hall",
            lostBy: "Maureen Paas",
          },
          {
            id: 6,
            name: "Money",
            date: "Sept. 27, 2024",
            status: "Lost",
            location: "Field",
            lostBy: "Michael Nam",
          },
          {
            id: 7,
            name: "Ballpen",
            date: "Sept. 28, 2024",
            status: "Lost",
            location: "Canteen",
            lostBy: "Rosendo Martin",
          },
          {
            id: 8,
            name: "Notebook",
            date: "Sept. 28, 2024",
            status: "Lost",
            location: "Library",
            lostBy: "Knoxx Montefalco",
          },
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
    background-color: #d9d9d9;
  }
  </style>
  