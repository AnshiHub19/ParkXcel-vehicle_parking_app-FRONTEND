<template>
  <div class="d-flex">
    <AdminSidebar />

    <div class="flex-grow-1">
      <AdminNavbar />

      <div class="container mt-4">
        <h3 class="mb-3">Admin Dashboard</h3>

        <!-- Summary Cards -->
        <div class="row g-3">
          <div class="col-md-3" v-for="card in cards" :key="card.title">
            <div class="card p-3 shadow-sm">
              <div class="card-body">
                <h6 class="card-title">{{ card.title }}</h6>
                <h4>{{ card.value }}</h4>
                <small class="text-muted">{{ card.subtitle }}</small>
              </div>
            </div>
          </div>
        </div>

        <!-- Bookings + Actions -->
        <div class="row mt-4">
          <div class="col-md-8">
            <div class="card p-3">
              <h5>Recent Bookings</h5>

              <table class="table table-sm mt-2">
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Lot</th>
                    <th>Spot</th>
                    <th>Time</th>
                    <th>Status</th>
                    <th>Cost</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="r in bookings" :key="r.reservation_id">
                    <td>{{ r.user_name }}</td>
                    <td>{{ r.lot_name }}</td>
                    <td>{{ r.spot_id }}</td>
                    <td>{{ formatDate(r.parking_time) }}</td>
                    <td>{{ r.status }}</td>
                    <td>{{ r.parking_cost }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Right Side -->
          <div class="col-md-4">
            <div class="card p-3">
              <h5>Quick Actions</h5>
              <button class="btn btn-primary w-100 my-2" @click="$router.push('/admin/lots')">Manage Lots</button>
              <button class="btn btn-secondary w-100 my-2" @click="$router.push('/admin/users')">Manage Users</button>
              <button class="btn btn-outline-dark w-100 my-2" @click="refresh">Refresh</button>
            </div>

            <div class="card p-3 mt-3">
              <h6>Total Revenue</h6>
              <h4>{{ summary.total_revenue }}</h4>
            </div>
          </div>
        </div>

      </div>

    </div>
  </div>
</template>

<script>
import API from "@/api";
import AdminSidebar from "@/components/AdminSidebar.vue";
import AdminNavbar from "@/components/AdminNavbar.vue";

export default {
  components: { AdminSidebar, AdminNavbar },

  data() {
    return {
      summary: {},
      bookings: []
    };
  },

  computed: {
    cards() {
  return [
    { title: "Total Lots", value: this.summary.total_lots || 0 },
    { title: "Total Spots", value: this.summary.total_spots || 0 },
    { title: "Occupied", value: this.summary.occupied_spots || 0 },
    { title: "Active Users", value: this.summary.active_users || 0 },
    { title: "Total Users", value: this.summary.total_users || 0 },
  ];
}
  },

  methods: {
    async fetchSummary() {
      try {
        const res = await API.get("/admin/summary");
        this.summary = res.data;
      } catch (e) {
        console.error(e);
        alert("Failed to load summary.");
      }
    },

    async fetchBookings() {
      try {
        const res = await API.get("/admin/bookings");
        this.bookings = res.data.all_reservations;
      } catch (e) {
        console.error(e);
      }
    },

    formatDate(iso) {
      if (!iso) return "-";
      const d = new Date(iso);
      return d.toLocaleString();
    },

    refresh() {
      this.fetchSummary();
      this.fetchBookings();
    }
  },

  mounted() {
    this.refresh();
  }
};
</script>
