<template>
  <div class="d-flex">
    <AdminSidebar />
    <div class="flex-grow-1">
      <AdminNavbar />

      <div class="container mt-4">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h4>Parking Lots</h4>

          <div class="d-flex">
            <input
              v-model="q"
              @input="onSearch"
              type="search"
              class="form-control form-control-sm me-2"
              placeholder="Search location..."
              style="min-width: 220px;"
            />

            <button class="btn btn-outline-primary btn-sm" @click="showAddModal = true">
              Add Lot
            </button>
          </div>
        </div>

        <div class="card">
          <div class="card-body p-2">
            <div class="table-responsive">
              <table class="table table-striped table-hover mb-0">
                
                <thead class="table-light">
                  <tr>
                    <th>Location</th>
                    <th>Price</th>
                    <th>Total Spots</th>
                    <th>Available</th>
                    <th>Occupied</th>
                    <th style="width:150px">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="lot in pagedRows" :key="lot.lot_id">
                    <td>{{ lot.location_name }}</td>
                    <td>{{ lot.price }}</td>
                    <td>{{ lot.total_spots }}</td>
                    <td>{{ lot.available_spots }}</td>
                    <td>{{ lot.occupied_spots }}</td>
                    <td>
                      <button class="btn btn-sm btn-outline-success me-1" @click="editLot(lot)">Edit</button>
                      <button class="btn btn-sm btn-outline-danger" @click="deleteLot(lot.lot_id)">Delete</button>
                    </td>
                  </tr>

                  <tr v-if="filtered.length === 0">
                    <td colspan="6" class="text-center text-muted py-4">No lots found.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="card-footer d-flex justify-content-between align-items-center">
            <div>
              Showing <strong>{{ startRow + 1 }}</strong> -
              <strong>{{ Math.min(endRow, filtered.length) }}</strong> of
              <strong>{{ filtered.length }}</strong>
            </div>

            <div class="d-flex align-items-center">
              <button class="btn btn-sm btn-outline-secondary me-2" :disabled="page === 1" @click="prevPage">
                Prev
              </button>

              <nav>
                <ul class="pagination pagination-sm mb-0">
                  <li
                    v-for="p in pageCount"
                    :key="p"
                    :class="['page-item', { active: p === page }]"
                    style="cursor:pointer"
                  >
                    <a class="page-link" @click="gotoPage(p)">{{ p }}</a>
                  </li>
                </ul>
              </nav>

              <button class="btn btn-sm btn-outline-secondary ms-2" :disabled="page === pageCount" @click="nextPage">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Add/Edit Modal -->
      <div v-if="showAddModal || editData" class="modal-backdrop">
        <div class="modal-dialog">
          <div class="modal-content p-3">
            <h5>{{ editData ? 'Edit Lot' : 'Add New Lot' }}</h5>
            <div class="mb-2">
              <label>Location Name</label>
              <input v-model="form.location_name" class="form-control" />
            </div>
            <div class="mb-2">
              <label>Price</label>
              <input type="number" v-model="form.price" class="form-control" />
            </div>
            <div class="mb-2">
              <label>Pin Code</label>
              <input v-model="form.pin_code" class="form-control" />
            </div>
            <div class="mb-2">
              <label>Number of Spots</label>
              <input type="number" v-model="form.number_of_spots" class="form-control" />
            </div>

            <div class="d-flex justify-content-end mt-3">
              <button class="btn btn-secondary me-2" @click="closeModal">Cancel</button>
              <button class="btn btn-primary" @click="submitLot">{{ editData ? 'Update' : 'Create' }}</button>
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
  name: "LotsPage",
  components: { AdminSidebar, AdminNavbar },

  data() {
    return {
      lots: [],
      q: "",
      page: 1,
      perPage: 8,
      showAddModal: false,
      editData: null,
      form: {
        location_name: "",
        price: 0,
        pin_code: "",
        number_of_spots: 0
      }
    };
  },

  computed: {
    filtered() {
      const q = this.q.trim().toLowerCase();
      return this.lots.filter(l => !q || l.location_name.toLowerCase().includes(q));
    },
    pageCount() {
      return Math.max(1, Math.ceil(this.filtered.length / this.perPage));
    },
    startRow() {
      return (this.page - 1) * this.perPage;
    },
    endRow() {
      return this.page * this.perPage;
    },
    pagedRows() {
      return this.filtered.slice(this.startRow, this.endRow);
    }
  },

  methods: {
    async fetchLots() {
      try {
        const res = await API.get("/admin/view_lots");
        this.lots = res.data.parking_lots || [];
      } catch (e) {
        console.error(e);
        alert("Failed to load parking lots.");
      }
    },
    onSearch() { this.page = 1; },
    prevPage() { if(this.page>1) this.page--; },
    nextPage() { if(this.page<this.pageCount) this.page++; },
    gotoPage(p) { if(p>=1 && p<=this.pageCount) this.page=p; },

    editLot(lot) {
      this.editData = lot;
      this.form = { ...lot };
    },
    closeModal() {
      this.showAddModal = false;
      this.editData = null;
      this.form = { location_name:"", price:0, pin_code:"", number_of_spots:0 };
    },

    async submitLot() {
      try {
        if(this.editData){
          // Update existing lot
          await API.put(`/admin/edit_lot/${this.editData.lot_id}`, this.form);
          alert("Lot updated successfully.");
        } else {
          // Create new lot
          await API.post("/admin/create_lot", this.form);
          alert("Lot created successfully.");
        }
        this.closeModal();
        this.fetchLots();
      } catch(e){
        console.error(e);
        alert(e.response?.data?.message || "Error submitting lot.");
      }
    },

    async deleteLot(lot_id){
      if(confirm("Are you sure to delete this lot?")) {
        try {
          await API.delete(`/admin/delete_lot/${lot_id}`);
          alert("Lot deleted successfully.");
          this.fetchLots();
        } catch(e){
          console.error(e);
          alert(e.response?.data?.message || "Cannot delete lot.");
        }
      }
    }
  },

  mounted() {
    this.fetchLots();
  }
};
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width:100%;
  height:100%;
  background: rgba(0,0,0,0.3);
  display:flex;
  justify-content:center;
  align-items:center;
  z-index:1050;
}
.modal-dialog {
  width: 400px;
}
</style>
