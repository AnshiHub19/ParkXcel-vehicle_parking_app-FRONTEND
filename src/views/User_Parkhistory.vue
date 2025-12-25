<template>
  <div class="d-flex">
    <UserSidebar />
    <div class="flex-grow-1">
      <UserNavbar />

      <div class="container mt-4">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h4>Parking History</h4>
          <button class="btn btn-sm btn-outline-primary" @click="downloadCSV">Export CSV</button>
        </div>

        <div v-if="history.length === 0" class="text-center text-muted py-4">
          No parking history found.
        </div>

        <div v-else class="table-responsive">
          <table class="table table-bordered">
            <thead class="table-light">
              <tr>
                <th>ID</th>
                <th>Lot</th>
                <th>Spot</th>
                <th>Parking Time</th>
                <th>Exit Time</th>
                <th>Status</th>
                <th>Cost (₹)</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="res in history" :key="res.reservation_id">
                <td>{{ res.reservation_id }}</td>
                <td>{{ res.lot_name }}</td>
                <td>{{ res.spot_id }}</td>
                <td>{{ res.parking_time || "-" }}</td>
                <td>{{ res.exit_time || "-" }}</td>
                <td>{{ res.status }}</td>
                <td>{{ res.parking_cost.toFixed(2) }}</td>
              </tr>
            </tbody>
          </table>
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
  name: "UserParkingHistory",
  components: { UserSidebar, UserNavbar },
  data() {
    return { history: [] };
  },

  methods: {
    async fetchHistory() {
      try {
        const res = await API.get("/user/booking_history");
        this.history = res.data.parking_history || [];
      } catch (e) {
        console.error(e);
        alert("Failed to load parking history.");
      }
    },

    // ✅ UPDATED CSV EXPORT LIKE ADMIN PAGE (pure frontend)
    downloadCSV() {
      if (!this.history.length) {
        alert("No history to export.");
        return;
      }

      const rows = this.history.map((h) => ({
        reservation_id: h.reservation_id,
        lot_name: h.lot_name,
        spot_id: h.spot_id,
        parking_time: h.parking_time || "",
        exit_time: h.exit_time || "",
        status: h.status,
        parking_cost: h.parking_cost,
      }));

      const header = Object.keys(rows[0]);

      const csv = [
        header.join(","),
        ...rows.map((r) =>
          header
            .map((h) => {
              const v = r[h] === null || r[h] === undefined ? "" : String(r[h]);
              return `"${v.replace(/"/g, '""')}"`;
            })
            .join(",")
        ),
      ].join("\r\n");

      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement("a");
      a.href = url;
      a.download = `parking_history_${new Date().toISOString().slice(0, 19)}.csv`;
      a.click();

      URL.revokeObjectURL(url);
    }
  },

  mounted() {
    this.fetchHistory();
  }
};
</script>

<style scoped>
.table td, .table th {
  vertical-align: middle;
}
</style>
