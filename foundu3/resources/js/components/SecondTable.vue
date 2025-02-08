<template>
    <section class="table-section">
      <div class="search-bar">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Search by item name or claimant..."
          @input="filterItems"
        />
      </div>
  
      <div class="title-container">
        <h2>{{ title }}</h2>
      </div>
  
      <table class="items-table">
        <thead>
          <tr>
            <th v-for="col in columns" :key="col">{{ col }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in filteredItems" :key="item.claimId">
            <td v-for="field in fields" :key="field">
              <img
                v-if="field === 'image'"
                :src="item[field]"
                alt="Item Image"
                class="item-image"
              />
              <span v-else>{{ item[field] }}</span>
            </td>
            <td>
                <td>
  <button class="view-button" @click="viewItem(item)">View</button>
  <button class="edit-button" @click="openEditForm(item)">Edit</button>
</td>

            </td>
          </tr>
        </tbody>
      </table>
  
      <!-- View Modal for Item Details -->
  <div v-if="isViewModalOpen" class="modal">
    <div class="modal-content">
      <h3>Item Details</h3>
      <img v-if="viewItemData.image" :src="viewItemData.image" alt="Item Image" class="modal-item-image" />
      <p><strong>Item Name:</strong> {{ viewItemData.itemName }}</p>
      <p><strong>Claimant:</strong> {{ viewItemData.claimant }}</p>
      <p><strong>Description:</strong> {{ viewItemData.description || "." }}</p>
      <button type="button" @click="closeViewModal" class="cancel-button">Close</button>
    </div>
  </div>
  <div v-if="isViewModalOpen" class="modal">
    <div class="modal-content">
      <h3>Item Details</h3>
      <img v-if="viewItemData.image" :src="viewItemData.image" alt="Item Image" class="modal-item-image" />
      <p><strong>Item Name:</strong> {{ viewItemData.itemName }}</p>
      <p><strong>Claimant:</strong> {{ viewItemData.claimant }}</p>
      <p><strong>Description:</strong> {{ viewItemData.description || "I fou." }}</p>
      <button type="button" @click="closeViewModal" class="cancel-button">Close</button>
    </div>
  </div>
  <div v-if="isViewModalOpen" class="modal">
    <div class="modal-content">
      <h3>Item Details</h3>
      <img v-if="viewItemData.image" :src="viewItemData.image" alt="Item Image" class="modal-item-image" />
      <p><strong>Item Name:</strong> {{ viewItemData.itemName }}</p>
      <p><strong>Claimant:</strong> {{ viewItemData.claimant }}</p>
      <p><strong>Description:</strong> {{ viewItemData.description || "I found a phone case in ROO." }}</p>
      <button type="button" @click="closeViewModal" class="cancel-button">Close</button>
    </div>
  </div>
  
      <!-- Edit Modal -->
      <div v-if="isEditModalOpen" class="modal">
        <div class="modal-content">
          <h3>Edit Found Items</h3>
          <form @submit.prevent="saveEdit">
            <div class="form-group">
              <label for="itemid">Item ID:</label>
              <input type="text" id="itemID" v-model="editForm.itemID" />
            </div>
  
            <div class="form-group">
              <label for="reporteddate">Reported Date:</label>
              <input type="text" id="reporteddate" v-model="editForm.reporteddate" />
            </div>
  
            <div class="form-group">
              <label for="status">Status:</label>
              <input type="text" id="status" v-model="editForm.status" />
            </div>
  
            <div class="form-group">
              <label for="location">Location:</label>
              <input type="text" id="location" v-model="editForm.location" />
            </div>
            <div class="form-group">
              <label for="foundby">Found By:</label>
              <input type="text" id="foundby" v-model="editForm.foundby" />
            </div>
  
            <div class="button-group">
              <button type="submit" class="save-button">Save</button>
              <button type="button" @click="closeEditForm" class="cancel-button">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  </template>
  
  <script>
  export default {
    props: {
      title: String,
      columns: Array,
      fields: Array,
      items: Array,
    },
    data() {
      return {
        searchQuery: '',
        filteredItems: this.items,
        isEditModalOpen: false,
        isViewModalOpen: false, // Added for view modal visibility
        viewItemData: {         // Added to hold item details for viewing
          claimId: null,
          itemName: '',
          claimant: '',
          image: '',
          description: '',
        },
        editForm: {
          claimId: null,
          itemName: '',
          claimant: '',
        },
      };
    },
    watch: {
      items: {
        handler(newItems) {
          this.filteredItems = newItems;
        },
        immediate: true,
      },
    },
    methods: {
      filterItems() {
        this.filteredItems = this.items.filter(item =>
          item.itemName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          item.claimant.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      },
      viewItem(item) {
      this.viewItemData = {
        ...item,
        description: item.description || "I found a phone case in ROOM EB 209. The design is Cartoon-themed, and I think it fits a Realme C55. Please claim it at the USG office and verify that it's yours.",
        image: item.image || 'default-image-url.jpg', // Ensure fallback if no image
      };
      this.isViewModalOpen = true;
    },
    closeViewModal() {
      this.isViewModalOpen = false;
    },
      openEditForm(item) {
        this.isEditModalOpen = true;
        this.editForm = { ...item }; // Fill the form with item data
      },
      saveEdit() {
        const index = this.filteredItems.findIndex(i => i.claimId === this.editForm.claimId);
        if (index !== -1) {
          this.filteredItems.splice(index, 1, { ...this.editForm });
        }
        this.closeEditForm();
      },
      closeEditForm() {
        this.isEditModalOpen = false;
        this.editForm = {
          claimId: null,
          itemName: '',
          claimant: '',
        };
      },
      reviewItem(claimId) {
        this.$emit('review-item', claimId);
      },
    },
  };
  </script>
  
  
  <style scoped>
  .table-section {
    padding: 20px;
  }
  
  .search-bar {
    margin-bottom: 20px;
  }
  
  .search-bar input {
    width: 300px;
    padding: 10px;
    border: 2px solid green;
    border-radius: 7px;
    font-size: 16px;
    margin-left: 700px;
  }
  
  .title-container {
    margin-bottom: 20px;
  }
  
  .title-container h2 {
    font-size: 25px;
    font-weight: bold;
    margin: 0;
  }
  
  .items-table {
    width: 100%;
    border-collapse: collapse;
  }
  
  thead {
    background-color: #007bff;
    color: #100f0f;
  }
  
  th, td {
    padding: 10px;
    text-align: center;
    font-size: 17px;
  }
  
  .item-image {
    width: 100px;
    height: auto;
    border-radius: 4px;
  }
  
  button {
    margin: 5px;
    padding: 5px 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    color: #090909;

  }
  
  .view-button {
    background-color: #0ec0fb;
    margin-left: 60px;
  }
  
  .edit-button {
    background-color: #007bff;
    
  }
  
  .approve-button {
    background-color: #27f22e;
  }
  
  .delete-button {
    background-color: #f70303;
  }
  
  .reject-button {
    background-color: #f20808;
  }
  
  .review-button {
    background-color: #d48105;
  }
  
  /* Modal Styles */
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
  }
  
  .modal-content {
    background: white;
    padding: 20px;
    border-radius: 8px;
    width: 300px;
    height: auto; /* Adjusted to auto to fit content dynamically */
    max-height: 90vh; /* Optional: limits max height for overflow */
    overflow-y: auto; /* Allows scrolling if content exceeds max height */
  }
  
  .modal-item-image {
    width: 150px;
    height: auto;
    margin-bottom: 15px;
    border-radius: 8px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .form-group label {
    display: block;
    font-size: 14px;
    margin-bottom: 5px;
  }
  
  .form-group input {
    width: 100%;
    padding: 8px;
    font-size: 14px;
    border-radius: 4px;
    border: 1px solid #ccc;
  }
  
  .button-group {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 15px;
  }
  
  .save-button, .cancel-button {
    padding: 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .save-button {
    background-color: #27ae60;
    color: white;
    margin-right: 120px; /* Adjusted margin */
    transition: background-color 0.3s ease;
  }
  
  .cancel-button {
    background-color: #e74c3c;
    color: white;
    transition: background-color 0.3s ease;
  }
  
  .save-button:hover {
    background-color: #0aa149; /* Lighter green on hover */
  }
  
  .cancel-button:hover {
    background-color: #f63030; /* Darker red on hover */
  }
  </style>
  