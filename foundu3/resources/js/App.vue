<template>
  <div
    :class="[ 
      'app-container', 
      { 
        'gradient-bg': $route.path !== '/login' && $route.path !== '/register' 
      } 
    ]"
  >
    <!-- The global NavBar and Footer will not be shown on the Login, Register, and ManageFound routes -->
    <NavBar v-if="showHeaderFooter" />
    <router-view />
    <Footer v-if="showHeaderFooter" />
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import Footer from "@/components/Footer.vue";

export default {
  components: { NavBar, Footer },
  computed: {
    showHeaderFooter() {
      return (
        this.$route.path !== "/login" &&
        this.$route.path !== "/register" &&
        this.$route.name !== "manageFound" &&
        this.$route.name !== "adminHome" &&
        this.$route.name !== "manageLost" &&
        this.$route.name !== "claimRequest" &&
         this.$route.name !== "foundRequest" &&
         this.$route.name !== "usermanagement" &&
         this.$route.name !== "claimHistory"

      );
    },
  },
};
</script>

<style>
.gradient-bg {
  background: linear-gradient(90deg, #ffe9e9 0%, #edffbb 100%);
}

.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

router-view {
  flex-grow: 1;
}
</style>
