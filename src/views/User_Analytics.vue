<template>
  <div class="d-flex">
    <UserSidebar />
    <div class="flex-grow-1">
      <UserNavbar />

      <div class="container mt-4">
        <h4>Parking Summary</h4>

        <!-- Summary Cards -->
        <div class="row mt-3">
          <div class="col-md-4">
            <div class="card p-3 shadow-sm text-center">
              <h6>Total Parks</h6>
              <div class="fs-4">{{ summary.total_parks }}</div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card p-3 shadow-sm text-center">
              <h6>Total Hours</h6>
              <div class="fs-4">{{ summary.total_hours.toFixed(2) }}</div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card p-3 shadow-sm text-center">
              <h6>Total Cost (₹)</h6>
              <div class="fs-4">{{ summary.total_cost.toFixed(2) }}</div>
            </div>
          </div>
        </div>

        <!-- Lot Usage Chart -->
        <div class="mt-5">
          <h5>Lot-wise Usage (Times Parked)</h5>
          <canvas id="lotChart"></canvas>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserSidebar from "@/components/UserSidebar.vue";
import UserNavbar from "@/components/UserNavbar.vue";
import API from "@/api";
import { Chart, BarController, BarElement, CategoryScale, LinearScale, Title, Tooltip } from 'chart.js';

Chart.register(BarController, BarElement, CategoryScale, LinearScale, Title, Tooltip);

export default {
  name: "UserSummary",
  components: { UserSidebar, UserNavbar },
  data() {
    return {
      summary: {
        total_parks: 0,
        total_hours: 0,
        total_cost: 0,
        lot_usage: {}
      },
      chart: null
    };
  },
  methods: {
    async fetchSummary() {
      try {
        const res = await API.get("/user/summary");
        this.summary = res.data;

        // Prepare chart data from lot_usage
        const labels = Object.keys(this.summary.lot_usage);
        const data = Object.values(this.summary.lot_usage);

        if(this.chart) this.chart.destroy(); // remove old chart

        const ctx = document.getElementById('lotChart').getContext('2d');
        this.chart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [{
              label: 'Times Parked',
              data: data,
              backgroundColor: 'rgba(91, 42, 134, 0.7)'
            }]
          },
          options: {
            responsive: true,
            plugins: { 
              title: { display: true, text: 'Parking Lot Usage (Times Parked)' },
              tooltip: { mode: 'index', intersect: false }
            },
            scales: { y: { beginAtZero: true } }
          }
        });
      } catch(e) {
        console.error(e);
        alert("Failed to fetch summary.");
      }
    }
  },
  mounted() {
    this.fetchSummary();
  }
};
</script>

<style scoped>
.card { min-height: 100px; }
</style>
