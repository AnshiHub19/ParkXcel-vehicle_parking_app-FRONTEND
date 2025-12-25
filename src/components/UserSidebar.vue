<template>
  <div class="d-flex flex-column p-3 text-white" :style="sidebarStyle">

    <h4 class="mb-4 fw-bold">User Panel</h4>

    <a @click="$router.push('/user')" class="mb-3 sidebar-link">Dashboard</a>
    <a @click="$router.push('/user/lots')" class="mb-3 sidebar-link">Available Lots</a>
    <a @click="$router.push('/user/reservations')" class="mb-3 sidebar-link">My Reservations</a>
    <a @click="$router.push('/user/history')" class="mb-3 sidebar-link">Parking History</a>
    <a @click="$router.push('/user/charts')" class="mb-3 sidebar-link">Analytics</a>

  </div>
</template>

<script>
export default {
  name: "UserSidebar",

  computed: {
    sidebarStyle() {
      return {
        width: "220px",
        minHeight: "100vh",
        background: "linear-gradient(180deg,#5b2a86,#7e4fbf)",
        boxShadow: "2px 0 10px rgba(0,0,0,0.15)"
      };
    }
  }
};
</script>

<style scoped>
.sidebar-link {
  cursor: pointer;
  color: #ffffff;
  font-size: 15px;
  text-decoration: none;
  transition: 0.2s;
}
.sidebar-link:hover {
  color: #d6bbfc;
  padding-left: 5px;
}
</style>
