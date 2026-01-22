<template>
  <div class="d-flex admin-wrapper">
    <AdminSidebar />

    <div class="flex-grow-1 main-area">
      <AdminNavbar />

      <!-- Header -->
      <div class="dashboard-header">
        <h3>Admin Dashboard</h3>
        <p>Overview of parking activity & system performance</p>
      </div>

      <div class="container-fluid px-4">

        <!-- Summary Cards -->
        <div class="row g-4 mb-4">
          <div class="col-md-3" v-for="card in cards" :key="card.title">
            <div class="stat-card">
              <div class="icon">{{ card.icon }}</div>
              <div>
                <h6>{{ card.title }}</h6>
                <h3>{{ card.value }}</h3>
              </div>
            </div>
          </div>
        </div>

        <!-- Main Section -->
        <div class="row g-4">
          <!-- Recent Bookings -->
          <div class="col-lg-8">
            <div class="card-box">
              <h5 class="section-title">Recent Bookings</h5>

              <div class="table-responsive">
                <table class="table custom-table">
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
                      <td>#{{ r.spot_id }}</td>
                      <td>{{ formatDate(r.parking_time) }}</td>
                      <td>
                        <span class="status" :class="r.status">
                          {{ r.status }}
                        </span>
                      </td>
                      <td>₹{{ r.parking_cost }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- Right Panel -->
          <div class="col-lg-4">
            <div class="card-box mb-4">
              <h5 class="section-title">Quick Actions</h5>

              <button class="action-btn primary" @click="$router.push('/admin/lots')">
                Manage Lots
              </button>
              <button class="action-btn secondary" @click="$router.push('/admin/users')">
                Manage Users
              </button>
              <button class="action-btn outline" @click="refresh">
                Refresh Data
              </button>
            </div>

            <div class="card-box revenue-card">
              <h6>Total Revenue</h6>
              <h2>₹{{ summary.total_revenue || 0 }}</h2>
              <p>Generated so far</p>
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
        { title: "Total Lots", value: this.summary.total_lots || 0, icon: "🅿️" },
        { title: "Total Spots", value: this.summary.total_spots || 0, icon: "📍" },
        { title: "Occupied", value: this.summary.occupied_spots || 0, icon: "🚗" },
        { title: "Active Users", value: this.summary.active_users || 0, icon: "👤" }
      ];
    }
  },

  methods: {
    async fetchSummary() {
      const res = await API.get("/admin/summary");
      this.summary = res.data;
    },

    async fetchBookings() {
      const res = await API.get("/admin/bookings");
      this.bookings = res.data.all_reservations;
    },

    formatDate(iso) {
      if (!iso) return "-";
      return new Date(iso).toLocaleString();
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

<style scoped>
/* ---------- Layout ---------- */
.admin-wrapper {
  background: #f5f7fb;
  min-height: 100vh;
}

.main-area {
  background: #f5f7fb;
}

/* ---------- Header ---------- */
.dashboard-header {
  background: linear-gradient(135deg, #7c3aed, #6366f1);
  padding: 28px 40px;
  color: white;
}

.dashboard-header h3 {
  margin: 0;
  font-weight: 600;
}

.dashboard-header p {
  margin: 4px 0 0;
  opacity: 0.9;
}

/* ---------- Stat Cards ---------- */
.stat-card {
  background: white;
  border-radius: 18px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: 0 15px 40px rgba(0,0,0,0.08);
}

.stat-card .icon {
  font-size: 28px;
  background: #eef2ff;
  padding: 14px;
  border-radius: 14px;
}

.stat-card h6 {
  margin: 0;
  color: #6b7280;
  font-size: 13px;
}

.stat-card h3 {
  margin: 0;
  font-weight: 600;
}

/* ---------- Card Box ---------- */
.card-box {
  background: white;
  border-radius: 18px;
  padding: 22px;
  box-shadow: 0 15px 40px rgba(0,0,0,0.08);
}

.section-title {
  font-weight: 600;
  margin-bottom: 16px;
}

/* ---------- Table ---------- */
.custom-table th {
  font-size: 13px;
  color: #6b7280;
  border-bottom: none;
}

.custom-table td {
  font-size: 14px;
  vertical-align: middle;
}

.status {
  padding: 4px 10px;
  border-radius: 10px;
  font-size: 12px;
  text-transform: capitalize;
}

.status.active {
  background: #dcfce7;
  color: #15803d;
}

.status.completed {
  background: #e5e7eb;
  color: #374151;
}

/* ---------- Actions ---------- */
.action-btn {
  width: 100%;
  padding: 12px;
  border-radius: 14px;
  border: none;
  margin-bottom: 12px;
  font-weight: 500;
}

.action-btn.primary {
  background: #6366f1;
  color: white;
}

.action-btn.secondary {
  background: #7c3aed;
  color: white;
}

.action-btn.outline {
  background: transparent;
  border: 1px solid #d1d5db;
}

/* ---------- Revenue ---------- */
.revenue-card {
  text-align: center;
}

.revenue-card h2 {
  color: #4f46e5;
  margin: 8px 0;
}
</style>
