<template>
  <div class="dashboard-container">
    <Header />
    <div class="content-wrapper">
      <Sidebar />
      <div class="main-content">
        <ManageTable
          title="Found Requests"
          :columns="['Item ID', 'Item Name', 'Date Found', 'Found by', 'Location Found', 'Image', 'Verification Status', 'Action']"
          :fields="['itemId', 'itemName', 'dateFound', 'foundBy', 'locationFound', 'image', 'verificationStatus']"
          :items="requests"
          @approve="approveRequest"
          @reject="rejectRequest"
          @view="viewRequest"
          @edit="editRequest"
        />

        <!-- View Modal -->
        <div v-if="viewModal" class="modal">
          <div class="modal-content">
            <span class="close" @click="closeViewModal">&times;</span>
            <h3>View Found Request Details</h3>
            <p><strong>Item ID:</strong> {{ selectedItem.itemId }}</p>
            <p><strong>Item Name:</strong> {{ selectedItem.itemName }}</p>
            <p><strong>Date Found:</strong> {{ selectedItem.dateFound }}</p>
            <p><strong>Found by:</strong> {{ selectedItem.foundBy }}</p>
            <p><strong>Location Found:</strong> {{ selectedItem.locationFound }}</p>
            <p><strong>Verification Status:</strong> {{ selectedItem.verificationStatus }}</p>
            <img :src="selectedItem.image" alt="Item Image" class="modal-image" />
          </div>
        </div>

        <!-- Edit Modal -->
        <div v-if="editModal" class="modal">
          <div class="modal-content">
            <span class="close" @click="closeEditModal">&times;</span>
            <h3>Edit Found Request</h3>
            <label>Item Name</label>
            <input type="text" v-model="editableItem.itemName" />
            <label>Date Found</label>
            <input type="text" v-model="editableItem.dateFound" />
            <label>Found by</label>
            <input type="text" v-model="editableItem.foundBy" />
            <label>Location Found</label>
            <input type="text" v-model="editableItem.locationFound" />
            <label>Verification Status</label>
            <select v-model="editableItem.verificationStatus">
              <option>Verified</option>
              <option>Pending</option>
              <option>Rejected</option>
            </select>
            <button @click="saveEdit" class="save-button">Save</button>
          </div>
        </div>
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
    ManageTable
  },
  data() {
    return {
      requests: [
        {
          itemId: 1,
          itemName: "Key",
          dateFound: "Sept. 29, 2024",
          foundBy: "Abigail Smith",
          locationFound: "EB Room 208",
          image: "images/image6.png",
          verificationStatus: "Verified",
        },
        {
          itemId: 2,
          itemName: "Coach Black Wallet",
          dateFound: "Sept. 24, 2024",
          foundBy: "Trisha Uy",
          locationFound: "SNSU Gym",
          image: "images/image7.png",
          verificationStatus: "Verified",
        },
        {
          itemId: 3,
          itemName: "Cellphone",
          dateFound: "Sept. 25, 2024",
          foundBy: "Kimby Pareja",
          locationFound: "LRC",
          image: "images/image8.png",
          verificationStatus: "Pending",
        },
        {
          itemId: 4,
          itemName: "Flash drive",
          dateFound: "Sept. 26, 2024",
          foundBy: "Kim Talictic",
          locationFound: "EB Room 310",
          image: "images/image9.png",
          verificationStatus: "Rejected",
        },
      ],
      viewModal: false,
      editModal: false,
      selectedItem: {},
      editableItem: {},
    };
  },
  methods: {
    approveRequest(itemId) {
      const request = this.requests.find(item => item.itemId === itemId);
      if (request) request.verificationStatus = "Approved";
    },
    rejectRequest(itemId) {
      const request = this.requests.find(item => item.itemId === itemId);
      if (request) request.verificationStatus = "Rejected";
    },
    viewRequest(itemId) {
      this.selectedItem = this.requests.find(item => item.itemId === itemId);
      this.viewModal = true;
    },
    editRequest(itemId) {
      this.selectedItem = this.requests.find(item => item.itemId === itemId);
      this.editableItem = { ...this.selectedItem }; // Make a copy for editing
      this.editModal = true;
    },
    closeViewModal() {
      this.viewModal = false;
      this.selectedItem = {};
    },
    closeEditModal() {
      this.editModal = false;
      this.selectedItem = {};
      this.editableItem = {};
    },
    saveEdit() {
      const index = this.requests.findIndex(item => item.itemId === this.editableItem.itemId);
      if (index !== -1) {
        this.$set(this.requests, index, { ...this.editableItem });
        alert("Changes saved successfully!");
      }
      this.closeEditModal();
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

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  width: 400px;
  border-radius: 8px;
  position: relative;
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 18px;
  cursor: pointer;
}

.modal-image {
  width: 100%;
  height: auto;
  border-radius: 8px;
  margin-top: 10px;
}

.save-button {
  margin-top: 15px;
  padding: 10px 15px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.save-button:hover {
  background-color: #388e3c;
}
</style>
