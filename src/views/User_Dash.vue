<template>
  <div class="d-flex">
    <UserSidebar />
    <div class="flex-grow-1">
      <UserNavbar />

      <div class="container mt-4">
        <h4 class="mb-3">Your Dashboard</h4>

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

        <div class="row mt-4">
          <div class="col-md-6">
            <div class="card p-3">
              <h6>Lot Usage</h6>
              <canvas id="lotUsageChart"></canvas>
            </div>
          </div>

          <div class="col-md-6">
            <div class="card p-3">
              <h6>Quick Actions</h6>
              <button class="btn btn-primary w-100 my-2" @click="$router.push('/user/lots')">Reserve a Spot</button>
              <button class="btn btn-outline-secondary w-100 my-2" @click="$router.push('/user/history')">View History</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
  <div class="col-md-6 mt-3">
  <div class="card p-3">
    <h6>Scheduled Jobs & CSV Export</h6>

    <!-- Daily Reminders Trigger -->
    <button class="btn btn-outline-primary w-100 my-2" @click="sendDailyReminders">
      Send Daily Reminder
    </button>

    <!-- Monthly Report Trigger -->
    <button class="btn btn-outline-success w-100 my-2" @click="sendMonthlyReport">
      Send Monthly Report
    </button>

    <!-- CSV Export Trigger -->
    <button class="btn btn-outline-secondary w-100 my-2" @click="exportCSV">
      Export Parking History (CSV)
    </button>
  </div>
</div>

  
</template>

<script>
import UserSidebar from "@/components/UserSidebar.vue";
import UserNavbar from "@/components/UserNavbar.vue";
import API from "@/api";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

export default {
  name: "UserDashboard",
  components: { UserSidebar, UserNavbar },
  data() {
    return {
      summary: { total_parks:0, total_hours:0, total_cost:0, lot_usage: {} },
    };
  },
  computed: {
    cards() {
      return [
        { title: "Total Parks", value: this.summary.total_parks || 0, subtitle: "" },
        { title: "Total Hours", value: this.summary.total_hours || 0, subtitle: "hrs" },
        { title: "Total Cost", value: `₹${this.summary.total_cost || 0}`, subtitle: "" },
        { title: "Distinct Lots Used", value: Object.keys(this.summary.lot_usage || {}).length, subtitle: "" },
      ];
    }
  },
  methods: {
    async fetchSummary() {
      try {
        const res = await API.get("/user/summary");
        this.summary = res.data || this.summary;
        this.renderLotChart();
      } catch (e) {
        console.error(e);
        alert("Failed to load user summary.");
      }
    },
    renderLotChart() {
      const labels = Object.keys(this.summary.lot_usage || {});
      const values = Object.values(this.summary.lot_usage || {});
      const ctx = document.getElementById("lotUsageChart");
      if(!ctx) return;
      new Chart(ctx, {
        type: "bar",
        data: { labels, datasets:[{ label:"Usage", data: values, backgroundColor: "#6f42c1" }] },
        options: { responsive:true, maintainAspectRatio:false, plugins:{legend:{display:false}} }
      });
    }
  },
  mounted() { this.fetchSummary(); }
};

</script>

<style scoped>
.card canvas { height: 220px !important; }
</style>
