<template>
  <div class="d-flex">
    <AdminSidebar />
    <div class="flex-grow-1">
      <AdminNavbar />

      <div class="container mt-4">
        <h4>All Bookings</h4>

        <div class="d-flex justify-content-between align-items-center mb-3">
          <input
            v-model="q"
            @input="onSearch"
            class="form-control form-control-sm"
            placeholder="Search by user or lot..."
            style="max-width: 300px;"
          />
        </div>

        <div class="card">
          <div class="card-body p-2 table-responsive">
            <table class="table table-sm table-striped table-hover mb-0">
              <thead class="table-light">
                <tr>
                  <th>User</th>
                  <th>Email</th>
                  <th>Lot</th>
                  <th>Spot</th>
                  <th>Parking Time</th>
                  <th>Exit Time</th>
                  <th>Status</th>
                  <th>Cost</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="b in pagedRows" :key="b.reservation_id">
                  <td>{{ b.user_name }}</td>
                  <td>{{ b.user_email }}</td>
                  <td>{{ b.lot_name }}</td>
                  <td>{{ b.spot_id }}</td>
                  <td>{{ formatDate(b.parking_time) }}</td>
                  <td>{{ formatDate(b.exit_time) }}</td>
                  <td>{{ b.status }}</td>
                  <td>{{ b.parking_cost }}</td>
                </tr>

                <tr v-if="filtered.length === 0">
                  <td colspan="8" class="text-center text-muted py-4">No bookings found.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="card-footer d-flex justify-content-between align-items-center">
            <div>
              Showing <strong>{{ startRow + 1 }}</strong> -
              <strong>{{ Math.min(endRow, filtered.length) }}</strong> of
              <strong>{{ filtered.length }}</strong>
            </div>

            <div class="d-flex align-items-center">
              <button class="btn btn-sm btn-outline-secondary me-2" :disabled="page === 1" @click="prevPage">Prev</button>
              <nav>
                <ul class="pagination pagination-sm mb-0">
                  <li v-for="p in pageCount" :key="p" :class="['page-item', { active: p === page }]" style="cursor:pointer">
                    <a class="page-link" @click="gotoPage(p)">{{ p }}</a>
                  </li>
                </ul>
              </nav>
              <button class="btn btn-sm btn-outline-secondary ms-2" :disabled="page === pageCount" @click="nextPage">Next</button>
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

export default {
  name: "BookingsPage",
  components: { AdminSidebar, AdminNavbar },

  data() {
    return {
      bookings: [],
      q: "",
      page: 1,
      perPage: 8
    };
  },

  computed: {
    filtered() {
      const q = this.q.trim().toLowerCase();
      return this.bookings.filter(
        b => !q || b.user_name.toLowerCase().includes(q) || (b.lot_name && b.lot_name.toLowerCase().includes(q))
      );
    },
    pageCount() { return Math.max(1, Math.ceil(this.filtered.length / this.perPage)); },
    startRow() { return (this.page - 1) * this.perPage; },
    endRow() { return this.page * this.perPage; },
    pagedRows() { return this.filtered.slice(this.startRow, this.endRow); }
  },

  methods: {
    async fetchBookings() {
      try {
        const res = await API.get("/admin/bookings");
        this.bookings = res.data.all_reservations || [];
      } catch (e) {
        console.error(e);
        alert("Failed to load bookings.");
      }
    },
    formatDate(dt) { return dt ? new Date(dt).toLocaleString() : "-"; },
    onSearch() { this.page = 1; },
    prevPage() { if(this.page>1) this.page--; },
    nextPage() { if(this.page<this.pageCount) this.page++; },
    gotoPage(p) { if(p>=1 && p<=this.pageCount) this.page=p; }
  },

  mounted() { this.fetchBookings(); }
};
</script>
