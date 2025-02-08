<template>
  <main class="container mx-auto px-4 py-16">
    <div class="grid grid-cols-1 gap-12 lg:grid-cols-2">
      <div class="flex flex-col justify-center text-container">
        <h2 class="heading">
          Find & <br />
          Recover <br />
          <span class="gradient-text">With Ease</span>
        </h2>
        <p class="description">
          Experience effortless recovery with our dedicated lost and found service.
        </p>
      </div>

      <div class="relative right-section">
        <div class="flex flex-col gap-4">
          <router-link to="/lost" class="lost-link">
            <span class="text-xl">Lost</span>
            <img src="@/assets/losticon.png" alt="Lost Icon" class="icon" />
          </router-link>

          <router-link to="/found" class="found-link">
            <span class="text-xl">Found</span>
            <img src="@/assets/foundicon.png" alt="Found Icon" class="icon" />
          </router-link>
        </div>

        <div class="pictures">
          <div class="picture"></div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.text-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 180px;
}

.gradient-text {
  background: linear-gradient(90deg, #AE0000,  #13F000);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.heading {
  margin-bottom: 1rem;
  font-size: 4rem;
  font-weight: bold;
  color: #000000;
}

.description {
  font-size: 1.125rem;
  color: #000000;
  white-space: nowrap; /* Ensures text stays in one line */
  overflow: visible; /* Ensures the text can extend beyond the container */
  width: 100%; /* Ensures the text fits the available width */
}


.right-section {
  margin-left: 160px;
}

.lost-link, .found-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #ef4444;
  padding: 1rem;
  color: white;
  border-radius: 0.375rem;
  transition: background-color 0.3s;
  width: 230px;
  height: 70px;
  transition: transform 0.3s ease; 


}


.lost-link {
  background: linear-gradient(90deg, rgba(153, 19, 19, 0.72) 0%, rgba(255, 31, 31, 0.72) 74.5%);
  
}
.lost-link:hover {
  background: linear-gradient(90deg, rgba(153, 19, 19, 0.72) 0%, rgba(255, 31, 31, 0.72) 74.5%);
  transform: scale(1.05); 

}

.found-link {
  background: linear-gradient(90deg, rgba(0, 203, 20, 0.72) 0%, rgba(0, 101, 10, 0.72) 74.5%);
}

.found-link:hover {
  transform: scale(1.05); 

}

.text-xl {
  margin-left: 20px;
}

.icon {
  width: 4.5rem;
  height: 4.5rem;
  margin-left: 30px;
}

.pictures {
  position: relative;
}

.picture {
  margin-top: 20px;
  margin-bottom: 1px;
  background-image: url('@/assets/homepictures.png');
  background-size: cover;
  background-position: center;
  width: 320px;
  height: 180px;
  border-radius: 0.375rem;
}
</style>
