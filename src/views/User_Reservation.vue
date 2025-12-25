<template>
  <div class="d-flex">
    <UserSidebar />
    <div class="flex-grow-1">
      <UserNavbar />

      <div class="container mt-4">
        <h4 class="mb-3">Active Reservations</h4>

        <!-- Show all active reservations -->
        <div v-if="activeReservations.length">
          <div 
            class="card p-3 mb-3" 
            v-for="r in activeReservations" 
            :key="r.reservation_id"
          >
            <div><strong>Lot:</strong> {{ r.lot_name }}</div>
            <div><strong>Spot:</strong> {{ r.spot_id }}</div>
            <div><strong>Since:</strong> {{ formatDate(r.parking_time) }}</div>
            <div class="mt-3 d-flex gap-2">
              <button class="btn btn-danger" @click="release(r.spot_id)">
                Release Spot
              </button>
              <button class="btn btn-outline-secondary" @click="$router.push('/user/history')">
                History
              </button>
            </div>
          </div>
        </div>

        <!-- If no active reservations -->
        <div v-else class="text-center text-muted py-5">
          No active reservations. <br />
          <button class="btn btn-primary mt-3" @click="$router.push('/user/lots')">
            Reserve a spot
          </button>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import UserSidebar from "@/components/UserSidebar.vue";
import UserNavbar from "@/components/UserNavbar.vue";
import API from "@/api";

export default {
  name: "UserActiveReservation",
  components: { UserSidebar, UserNavbar },
  data() {
    return { 
      activeReservations: []  // holds all active reservations
    };
  },

  methods: {
    async fetchActive() {
      try {
        const res = await API.get("/user/booking_history");
        const all = res.data.parking_history || [];
        // keep all active reservations
        this.activeReservations = all.filter(r => r.status === "active");
      } catch(e) {
        console.error(e);
        alert("Failed to load reservations.");
      }
    },

    formatDate(iso) {
      return iso ? new Date(iso).toLocaleString() : "-";
    },

    async release(spot_id) {
      if (!confirm("Release spot now?")) return;
      try {
        const res = await API.post("/user/leaving_spot", { spot_id });
        alert(res.data.message + "\nCost: ₹" + (res.data.parking_cost || 0));
        await this.fetchActive(); // refresh list after release
      } catch(e) {
        console.error(e);
        alert(e.response?.data?.message || "Failed to release.");
      }
    }
  },

  mounted() {
    this.fetchActive();
  }
};
</script>

<style scoped>
.card { min-height: 100px; }
</style>
