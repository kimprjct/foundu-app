<template>
  <div class="dashboard-container">
    <Header />
    <div class="content-wrapper">
      <Sidebar />
      <div class="main-content">
        <ManageTable
          title="Claim Requests"
          :columns="[
            'Claim ID',
            'Item Name',
            'Claim Date',
            'Claimant',
            'Location Found',
            'Image',
            'Verification Status',
            'Action'
          ]"
          :fields="['claimId', 'itemName', 'claimDate', 'claimant', 'locationFound', 'image', 'verificationStatus']"
          :items="claims"
          @view-item="onViewItem"
          @edit-item="onEditItem"
          @approve-item="onApproveItem"
          @reject-item="onRejectItem"
          @review-item="onReviewItem"
          @delete-item="onDeleteItem"
        />

        <!-- View Modal -->
        <div v-if="viewModal" class="modal">
          <div class="modal-content">
            <span class="close" @click="closeViewModal">&times;</span>
            <h3>View Claim Details</h3>
            <p><strong>Claim ID:</strong> {{ selectedItem.claimId }}</p>
            <p><strong>Item Name:</strong> {{ selectedItem.itemName }}</p>
            <p><strong>Claim Date:</strong> {{ selectedItem.claimDate }}</p>
            <p><strong>Claimant:</strong> {{ selectedItem.claimant }}</p>
            <p><strong>Location Found:</strong> {{ selectedItem.locationFound }}</p>
            <p><strong>Verification Status:</strong> {{ selectedItem.verificationStatus }}</p>
            <img v-if="field === 'image'" :src="require(`@/assets/images${item[field]}`)" alt="Item Image" class="item-image" />


          </div>
        </div>

        <!-- Edit Modal -->
        <div v-if="editModal" class="modal">
          <div class="modal-content">
            <span class="close" @click="closeEditModal">&times;</span>
            <h3>Edit Claim</h3>
            <label>Item Name</label>
            <input type="text" v-model="editableItem.itemName" />
            <label>Claim Date</label>
            <input type="text" v-model="editableItem.claimDate" />
            <label>Claimant</label>
            <input type="text" v-model="editableItem.claimant" />
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
    ManageTable,
  },
  data() {
    return {
      claims: [
        {
          claimId: 1,
          itemName: "Red Record Book",
          claimDate: "Sept. 29, 2024",
          claimant: "Maria Jose",
          locationFound: "EB Room 208",
          image: "/@assests/images/image1.png",
          verificationStatus: "Verified",
        },
        {
          claimId: 2,
          itemName: "Money",
          claimDate: "Sept. 24, 2024",
          claimant: "Aighyne Pareja",
          locationFound: "Stair sa exit",
          image: "/images/image2.png",
          verificationStatus: "Verified",
        },
        {
          claimId: 3,
          itemName: "Phone Case",
          claimDate: "Sept. 25, 2024",
          claimant: "Charity Rama",
          locationFound: "EB Room 209",
          image: "/images/image3.png",
          verificationStatus: "Pending",
        },
        {
          claimId: 4,
          itemName: "Umbrella",
          claimDate: "Sept. 26, 2024",
          claimant: "Soleil Riego",
          locationFound: "Canteen",
          image: "/images/image4.png",
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
    onViewItem(id) {
      this.selectedItem = this.claims.find(item => item.claimId === id);
      this.viewModal = true;
    },
    onEditItem(id) {
      this.selectedItem = this.claims.find(item => item.claimId === id);
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
      // Find the index of the original item and update it with the edited item
      const index = this.claims.findIndex(item => item.claimId === this.editableItem.claimId);
      if (index !== -1) {
        this.$set(this.claims, index, { ...this.editableItem });
        alert("Changes saved successfully!"); // Optional feedback
      }
      this.closeEditModal();
    },
    onApproveItem(id) {
      this.updateClaimStatus(id, "Approved");
    },
    onRejectItem(id) {
      this.updateClaimStatus(id, "Rejected");
    },
    onReviewItem(id) {
      this.updateClaimStatus(id, "Under Review");
    },
    onDeleteItem(id) {
      this.claims = this.claims.filter(claim => claim.claimId !== id);
    },
    updateClaimStatus(id, newStatus) {
      const claim = this.claims.find(claim => claim.claimId === id);
      if (claim) claim.verificationStatus = newStatus;
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
