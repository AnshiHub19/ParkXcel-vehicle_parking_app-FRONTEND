<template>
  <nav class="navbar navbar-light px-4" :style="navStyle">
    <span class="navbar-brand mb-0 h4 text-white">ParkXcel User</span>

    <button class="btn btn-outline-light btn-sm" @click="logout">
      Logout
    </button>
  </nav>
</template>

<script>
export default {
  name: "UserNavbar",

  computed: {
    navStyle() {
      return {
        background: "linear-gradient(90deg,#5b2a86,#7e4fbf)",
        boxShadow: "0 2px 10px rgba(0,0,0,0.15)"
      };
    }
  },

  methods: {
    logout() {
      localStorage.removeItem("token");
      this.$router.push("/login");
    }
  }
};
</script>

<style scoped>
nav {
  height: 60px;
}
</style>
