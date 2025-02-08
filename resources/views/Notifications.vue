<template>
  <div class="container mx-auto px-4 py-8">
    <h2 class="mb-6 text-3xl font-bold">Notifications</h2>
    <div class="max-w-2xl space-y-4">
      <div v-for="notification in notifications" 
           :key="notification.id" 
           class="rounded-lg bg-white p-4 shadow-lg">
        <div class="flex items-center justify-between">
          <h3 class="font-medium">{{ notification.title }}</h3>
          <span class="text-sm text-gray-500">{{ notification.time }}</span>
        </div>
        <p class="mt-2 text-gray-600">{{ notification.message }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const notifications = ref([
  {
    id: 1,
    title: 'New Match Found',
    message: 'We found a potential match for your lost laptop',
    time: '2 hours ago'
  },
  {
    id: 2,
    title: 'Report Update',
    message: 'Your lost item report has been processed',
    time: '1 day ago'
  },
  {
    id: 3,
    title: 'Status Change',
    message: 'Your found item has been claimed',
    time: '2 days ago'
  }
])
</script>

<style scoped>
.container {
  max-width: 1300px;
  margin: 0 auto;
  padding-top: 2rem;
  margin-bottom: 20px;
}

h2 {
  margin-bottom: 1.5rem;
  font-size: 2rem;
  font-weight: bold;
}

.max-w-2xl {
  max-width: 40rem;
  margin: 0 auto;
}

.space-y-4 {
  display: grid;
  gap: 1rem;
}

.rounded-lg {
  border-radius: 0.75rem;
}

.bg-white {
  background-color: #ffffff;
}

.p-4 {
  padding: 1rem;
}

.shadow-lg {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.flex {
  display: flex;
}

.items-center {
  align-items: center;
}

.justify-between {
  justify-content: space-between;
}

.font-medium {
  font-weight: 500;
}

.text-sm {
  font-size: 0.875rem;
}

.text-gray-500 {
  color: #6b7280;
}

.mt-2 {
  margin-top: 0.5rem;
}

.text-gray-600 {
  color: #4b5563;
}
</style>
