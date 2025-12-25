<template>
  <div class="d-flex">
    <UserSidebar />
    <div class="flex-grow-1">
      <UserNavbar />

      <div class="container mt-4">
        <!-- Header + Search -->
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h4>Available Parking Lots</h4>
          <input v-model="q" @input="onSearch" placeholder="Search..." class="form-control form-control-sm" style="max-width:260px;" />
        </div>

        <!-- Parking Lots -->
        <div class="row g-3">
          <div class="col-md-4" v-for="lot in pagedRows" :key="lot.lot_id">
            <div class="card p-3 shadow-sm">
              <h6>{{ lot.location_name }}</h6>
              <div class="small text-muted">Price: ₹{{ lot.price }} / hr</div>
              <div class="mt-2"><strong>{{ lot.available_spots }}</strong> available of {{ lot.total_spots }}</div>
              <div class="d-flex gap-2 mt-3">
                <button 
                  class="btn btn-primary btn-sm" 
                  :disabled="lot.available_spots===0" 
                  @click="reserve(lot.lot_id)"
                >
                  Reserve
                </button>
                <button class="btn btn-outline-secondary btn-sm" @click="$router.push('/user/history')">History</button>
              </div>
            </div>
          </div>

          <div v-if="filtered.length===0" class="col-12 text-center text-muted py-4">
            No lots found.
          </div>
        </div>

        <!-- Pagination -->
        <div class="mt-3 d-flex justify-content-between align-items-center">
          <div>
            Showing <strong>{{ startRow + 1 }}</strong> - <strong>{{ Math.min(endRow, filtered.length) }}</strong> of <strong>{{ filtered.length }}</strong>
          </div>
          <div>
            <button class="btn btn-sm btn-outline-secondary me-2" :disabled="page===1" @click="prevPage">Prev</button>
            <button class="btn btn-sm btn-outline-secondary" :disabled="page===pageCount" @click="nextPage">Next</button>
          </div>
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
  name: "UserLots",
  components: { UserSidebar, UserNavbar },
  data() {
    return { 
      lots: [], 
      q: "", 
      page: 1, 
      perPage: 6, 
      loading: false 
    };
  },
  computed: {
    filtered() {
      const q = this.q.trim().toLowerCase();
      return this.lots.filter(l => !q || l.location_name.toLowerCase().includes(q));
    },
    pageCount() { return Math.max(1, Math.ceil(this.filtered.length / this.perPage)); },
    startRow() { return (this.page - 1) * this.perPage; },
    endRow() { return this.page * this.perPage; },
    pagedRows() { return this.filtered.slice(this.startRow, this.endRow); }
  },
  methods: {
    async fetchLots() {
      this.loading = true;
      try {
        const res = await API.get("/user/view_lots");
        this.lots = res.data.parking_lots || [];
      } catch(e) {
        console.error(e);
        alert("Failed to load lots.");
      }
      this.loading = false;
    },
    onSearch() { this.page = 1; },
    prevPage() { if(this.page > 1) this.page--; },
    nextPage() { if(this.page < this.pageCount) this.page++; },

    async reserve(lot_id) {
      if(!confirm("Reserve a spot in this lot?")) return;
      try {
        const res = await API.post("/user/taking_spot", { lot_id });
        alert(res.data.message || "Reserved successfully.");
        await this.fetchLots(); // refresh availability after reserve
      } catch(e) {
        console.error(e);
        alert(e.response?.data?.message || "Failed to reserve.");
      }
    }
  },
  mounted() { this.fetchLots(); }
};
</script>

<style scoped>
.card { min-height: 140px; }
</style>
