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
            <!-- Single line button container -->
            <div class="button-container">
              <button v-if="item.verificationStatus === 'Pending'" class="view-button" @click="$emit('view-item', item.claimId)">View</button>
              <button v-if="item.verificationStatus === 'Pending'" class="edit-button" @click="openEditForm(item)">Edit</button>
              <button v-if="item.verificationStatus === 'Verified'" class="approve-button" @click="$emit('approve-item', item.claimId)">Approve</button>
              <button v-if="item.verificationStatus === 'Verified'" class="reject-button" @click="$emit('reject-item', item.claimId)">Reject</button>
              <button v-if="item.verificationStatus === 'Rejected'" class="review-button" @click="reviewItem(item.claimId)">Review</button>
              <button v-if="item.claimStatus === 'Completed'" class="view-button" @click="$emit('view-item', item.claimId)">View</button>
              <button v-if="item.claimStatus === 'Completed'" class="delete-button" @click="$emit('delete-item', item.claimId)">Delete</button>
              <button v-if="item.claimStatus === 'Pending'" class="view-button" @click="$emit('view-item', item.claimId)">View</button>
              <button v-if="item.claimStatus === 'Pending'" class="delete-button" @click="$emit('delete-item', item.claimId)">Delete</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
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
      isViewModalOpen: false,
      viewItemData: {
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
    openEditForm(item) {
      this.isEditModalOpen = true;
      this.editForm = { ...item };
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
    closeViewModal() {
      this.isViewModalOpen = false;
    }
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

.button-container {
  display: flex;
  justify-content: center;
  gap: 8px; /* Small space between buttons */
}

button {
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  color: #090909;
}

.view-button {
  background-color: #0ec0fb;
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
</style>
