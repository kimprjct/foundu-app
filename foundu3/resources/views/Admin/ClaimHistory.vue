<template>
    <div class="dashboard-container">
      <Header />
      <div class="content-wrapper">
        <Sidebar />
        <div class="main-content">
          <ManageTable
            title="Claim History"
            :columns="['Claim ID', 'Item Name', 'Claimant', 'Claim Date', 'Claim Status', 'Action']"
            :fields="['claimId', 'itemName', 'claimant', 'claimDate', 'claimStatus']"
            :items="claims"
          />
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import Header from "@/components/AdminHeader.vue";
  import Sidebar from "@/components/Sidebar.vue";
  import ManageTable from "@/components/ManageTable.vue";
  
  export default {
    components: {
      Header,
      Sidebar,
      ManageTable,
    },
    data() {
      return {
        claims: [
          {
            claimId: 1,
            itemName: "Bag",
            claimant: "Maria Jose",
            claimDate: "Sept. 24, 2024",
            claimStatus: "Completed",
          },
          {
            claimId: 2,
            itemName: "Key",
            claimant: "Aighyne Pareja",
            claimDate: "Sept. 25, 2024",
            claimStatus: "Completed",
          },
          {
            claimId: 3,
            itemName: "Money",
            claimant: "Abigail Smith",
            claimDate: "Sept. 26, 2024",
            claimStatus: "Pending",
          },
          {
            claimId: 4,
            itemName: "Wallet",
            claimant: "Trisha Uy",
            claimDate: "Sept. 29, 2024",
            claimStatus: "Completed",
          },
          {
            claimId: 5,
            itemName: "Umbrella",
            claimant: "Kimby Pareja",
            claimDate: "Sept. 30, 2024",
            claimStatus: "Completed",
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
  