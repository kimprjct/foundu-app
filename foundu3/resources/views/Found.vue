<template>
  <div class="main-container">
    <!-- Popup Message -->
    <div v-if="showPopup" class="popup-message">
      <img src="@/assets/checkicon.webp" alt="Check Icon" class="check-icon" />
      Your found item has been reported successfully!
    </div>
    <div class="found-items-title">Found Items</div>
    <div class="top-section">
      <div class="left-placeholder"></div>
      <div class="search-container">
        <input
          v-model="searchTerm"
          type="text"
          class="search-input"
          placeholder="Item Name"
        />
        <button @click="searchItems" class="search-btn">
          <img :src="searchIcon" alt="Search Icon" />
        </button>
      </div>
      <router-link to="/report-found" class="report-button">
        <span>Report</span>
        <img :src="foundIcon" alt="Report Icon" />
      </router-link>
    </div>
    <div class="found-items-grid">
      <div
        v-for="(item, index) in filteredItems"
        :key="index"
        class="found-item-column"
      >
        <div class="reporter-info">
          <div class="profile-circle">{{ reporterFullName.charAt(0) }}</div>
          <div class="reporter-name">{{ reporterFullName }}</div>
        </div>
        <img :src="item.photoURL" alt="Found Item" class="found-item-image" />
        <div class="item-details">
          <div class="found-item-name">{{ item.itemName }}</div>
          <div class="found-item-location">{{ item.landmark }}</div>
          <div class="found-item-date">{{ item.dateFound }} | {{ item.timeFound }}</div>
        </div>
        <p class="found-item-description">{{ item.itemDescription }}</p>
        <div class="claim-it-container">
          <button
            class="claim-it-button"
            :class="{ 'claimed-item-under-review': item.claimed }"
            :style="{ backgroundColor: item.claimed ? '#11A104' : '#65558F' }"
            @click="markItemAsClaimed(index)"
          >
            {{ item.claimed ? "Claim Under Review" : "Claim It" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import searchIcon from '@/assets/searchicon.png';
import foundIcon from '@/assets/foundicon.png';

export default {
  data() {
    return {
      searchIcon,
      foundIcon,
      foundItems: [],
      searchTerm: '',
      reporterFullName: localStorage.getItem('userFullName') || 'Unknown User',
      showPopup: false,
      filteredItems: [],
    };
  },
  methods: {
    loadItems() {
      const storedItems = JSON.parse(localStorage.getItem('foundItems')) || [];
      this.foundItems = storedItems;
      this.filteredItems = storedItems;
    },
    saveItems() {
      localStorage.setItem('foundItems', JSON.stringify(this.foundItems));
    },
    searchItems() {
      this.filteredItems = this.foundItems.filter((item) =>
        item.itemName.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    },
    markItemAsClaimed(index) {
      localStorage.setItem('itemToClaim', index);
      this.$router.push('/claim-it-form');
    },
    verifyAndMarkAsClaimed() {
      const index = localStorage.getItem('itemToClaim');
      if (index !== null) {
        this.foundItems[index].claimed = true;
        this.saveItems();
        localStorage.removeItem('itemToClaim');
        this.showPopup = true;
      }
    },
    deleteFoundItem(index) {
      if (confirm('Are you sure you want to remove this item?')) {
        this.foundItems.splice(index, 1);
        this.saveItems();
        this.filteredItems = this.foundItems;
      }
    },
  },
  mounted() {
    this.loadItems();
    if (localStorage.getItem('claimVerificationComplete') === 'true') {
      this.verifyAndMarkAsClaimed();
      localStorage.removeItem('claimVerificationComplete');
      setTimeout(() => {
        this.showPopup = false;
      }, 3000);
    }
  },
};
</script>


<style scoped>
.popup-message {
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: #D9D9D9; /* Solid opaque color */
  color: rgb(87, 87, 240);
  padding: 15px 30px;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.check-icon {
  width: 24px; /* Adjust the size of the check icon */
  height: 24px;
  margin-right: 10px; /* Space between the icon and the message */
}

.main-container {
  padding: 20px;
}

.top-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.left-placeholder {
  flex: 1;
}

.search-container {
  flex: 1;
  border-radius: 28px;
  border: 1px solid transparent;
  background: linear-gradient(#fffdff, #eaffcd) padding-box, 
              linear-gradient(to right, #11D300, #b90909) border-box;
  display: flex;
  align-items: center;
  height: 45px;
  width: 200px;
}

.search-input {
  flex-grow: 1;
  border: none;
  outline: none;
  padding: 8px 16px;
  font-size: 16px;
  background: transparent;
}

.search-btn {
  border: none;
  background: transparent;
  cursor: pointer;
}

.search-btn img {
  width: 40px;
  height: 40px;
}

.report-button {
  border-radius: var(--Radius-200, 8px);
  background: linear-gradient(90deg, rgba(0, 203, 20, 0.72) 0%, rgba(0, 101, 10, 0.72) 74.5%);
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  padding: 12px 10px;
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-left: 140px;
  margin-right: 140px;
  height: 65PX;
}

.report-button img {
  width: 50px; /* Reduces the icon size */
  height: 50px; /* Adjusts height to match width */
  margin-left: 8px; /* Optional, adds spacing between the text and icon */
}

.report-button span {
  margin-left: 15px;
  font-size: 24px;
}

.found-items-title {
  font-size: 45px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 20px; 
  background: linear-gradient(90deg,#13F000, #AE0000 );
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.found-items-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr); /* 4 columns on larger screens */
    grid-gap: 50px;
    width: 100%;
    max-width: 1200px;
    margin-left: 75px;
    margin-top: 20pxpx;
    margin-bottom: 20px;
}

.found-item-column {
    padding: 20px;
    border-radius: 12px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    background: rgba(255, 255, 255, 0.59);
    text-align: center;
    max-height: 350px;
     display: flex; /* Flexbox for vertical alignment */
    flex-direction: column; /* Stack elements vertically */
    align-items: flex-start; /* Align items to the start */
    justify-content: space-between; /* Ensure space between content and button */
    height: 100%; /* Make sure the column takes full height */
    position: relative; /* Ensure the column's positioning context */
}

.reporter-info {
  display: flex;          /* Use flexbox for layout */
  align-items: center;   /* Vertically center align items */
  margin-bottom: 10px;   /* Space between reporter info and next element */
}

.profile-circle {
  border-radius: 50%;
  background-color: #65558F;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  width: 35px;           /* Fixed width for the circle */
  height: 35px;          /* Fixed height for the circle */
  margin-right: 10px;    /* Space between circle and name */
}

.reporter-name {
  font-size: 1em;
  color: #65558F;
  font-weight: bold;
}


.found-item-image {
    width: 100%;
    height: 100px;
    object-fit: cover;
    margin-bottom: 10px;
}

.found-item-name {
    font-size: 13px;
    font-weight: bold;
    margin-bottom: 5px;
    text-align: left;
}

.found-item-location, .found-item-date {
    font-size: 12px;
    margin-bottom: 5px;
    text-align: left;
}

.found-item-description {
    font-size: 11px;
    color: #49454F;
    margin-bottom: 10px;
    width: 100%; /* Ensure it stays within the parent width */
    max-height: 60px; /* Set a maximum height for the description */
    overflow-y: auto; /* Add vertical scrolling when content overflows */
    overflow-wrap: break-word; /* Prevent word breaks that may make the text look awkward */
    text-align: left;
    padding-right: 5px; /* Optional: Adds padding for scrollbar space */
}


.claim-it-container {
    display: flex;
    justify-content: flex-end;
    width: 100%; /* Ensure the container takes full width */
    margin-top: auto; /* Push the button to the bottom */
}

.claim-it-button {
    font-size: 12px;
    padding: 8px;
    background-color: #11A104; /* Initial green background color */
    color: white;
    border-radius: 50px;
    cursor: pointer;
    transition: background-color 0.3s ease, width 0.3s ease;
    white-space: nowrap; /* Prevent text wrapping */
    text-align: center;
    width: auto; /* Auto width to accommodate content */
}

.claim-it-button:hover {
    background-color: #007B02; /* Darker hover color */
}
/* Optional: Style for "Found Item Under Review" */
.claim-item-under-review {
    background-color: #65558F; /* Purple background */
}


.found-item-column {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between; /* Pushes content apart vertically */
    position: relative;
    height: 100%;
}
.found-item-description {
    font-size: 11px;
    color: #49454F;
    margin-bottom: 10px;
    width: 100%; /* Ensure it stays within the parent width */
    width: 220px;    
    overflow-wrap: break-word; 
    margin-bottom: 10px;
    text-align: left;
}

.item-details {
    margin-bottom: 10px; /* Spacing between details */
}
</style>
