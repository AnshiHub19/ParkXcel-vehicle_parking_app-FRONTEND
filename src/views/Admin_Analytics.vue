<template>
  <div class="d-flex">
    <AdminSidebar />
    <div class="flex-grow-1">
      <AdminNavbar />

      <div class="container mt-4">
        <h4 class="mb-3">Parking Analytics</h4>

        <div class="row g-3">
          <!-- Users Chart -->
          <div class="col-md-6">
            <div class="card p-3 shadow-sm">
              <h6 class="mb-3">Active Users vs Total Users</h6>
              <canvas id="usersChart"></canvas>
            </div>
          </div>

          <!-- Spots Chart -->
          <div class="col-md-6">
            <div class="card p-3 shadow-sm">
              <h6 class="mb-3">Occupied vs Available Spots</h6>
              <canvas id="spotsChart"></canvas>
            </div>
          </div>
        </div>

        <!-- Revenue Chart -->
        <div class="row mt-3">
          <div class="col-md-12">
            <div class="card p-3 shadow-sm">
              <h6 class="mb-3">Revenue by Parking Lot</h6>
              <canvas id="revenueChart"></canvas>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import AdminSidebar from "@/components/AdminSidebar.vue";
import AdminNavbar from "@/components/AdminNavbar.vue";
import API from "@/api";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

export default {
  name: "AdminCharts",
  components: { AdminSidebar, AdminNavbar },

  data() {
    return {
      summary: {},
    };
  },

  methods: {
    async fetchSummary() {
      try {
        const res = await API.get("/admin/summary");
        this.summary = res.data;
        this.renderUserAndSpotCharts();
        this.fetchRevenueByLot();
      } catch (e) {
        console.error(e);
        alert("Failed to load analytics.");
      }
    },

    renderUserAndSpotCharts() {
      // Users Chart
      const usersCtx = document.getElementById("usersChart");
      new Chart(usersCtx, {
        type: "doughnut",
        data: {
          labels: ["Active Users", "Inactive Users"],
          datasets: [{
            data: [this.summary.active_users || 0, (this.summary.total_users || 0) - (this.summary.active_users || 0)],
            backgroundColor: ["#6f42c1", "#d6bbfc"]
          }]
        },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: "bottom" } } }
      });

      // Spots Chart
      const spotsCtx = document.getElementById("spotsChart");
      new Chart(spotsCtx, {
        type: "doughnut",
        data: {
          labels: ["Occupied", "Available"],
          datasets: [{
            data: [this.summary.occupied_spots || 0, this.summary.available_spots || 0],
            backgroundColor: ["#6f42c1", "#d6bbfc"]
          }]
        },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: "bottom" } } }
      });
    },

    async fetchRevenueByLot() {
      try {
        const res = await API.get("/admin/revenue_bylot");
        const data = res.data.revenue_by_lot || [];

        const labels = data.map(d => d.lot_name);
        const revenues = data.map(d => d.revenue);

        const ctx = document.getElementById("revenueChart");
        new Chart(ctx, {
          type: "bar",
          data: {
            labels,
            datasets: [{
              label: "Revenue",
              data: revenues,
              backgroundColor: "#6f42c1"
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } }
          }
        });

      } catch (e) {
        console.error(e);
        alert("Failed to load revenue data.");
      }
    }
  },

  mounted() {
    this.fetchSummary();
  }
};
</script>

<style scoped>
.card canvas {
  height: 250px !important;
}
</style>
