<template>
  <div class="container mt-4">
    <h2 class="text-purple mb-3">Create Parking Lot</h2>
    <form @submit.prevent="createLot">
      <div class="mb-3">
        <label class="form-label">Location Name</label>
        <input type="text" v-model="lot.location_name" class="form-control" required />
      </div>
      <div class="mb-3">
        <label class="form-label">Price per Spot</label>
        <input type="number" v-model="lot.price" class="form-control" required />
      </div>
      <div class="mb-3">
        <label class="form-label">Pin Code</label>
        <input type="text" v-model="lot.pin_code" class="form-control" required />
      </div>
      <div class="mb-3">
        <label class="form-label">Number of Spots</label>
        <input type="number" v-model="lot.number_of_spots" class="form-control" required min="1" />
      </div>
      <button type="submit" class="btn btn-purple">Create Lot</button>
      <router-link to="/admin/lots" class="btn btn-outline-secondary ms-2">Cancel</router-link>
    </form>
  </div>
</template>

<script>
import API from "../api";

export default {
  name: "CreateLot",
  data() {
    return {
      lot: {
        location_name: "",
        price: 0,
        pin_code: "",
        number_of_spots: 1,
      },
    };
  },
  methods: {
    async createLot() {
      try {
        await API.post("/api/admin/create_lot", this.lot);
        this.$router.push("/admin/lots");
      } catch (err) {
        alert(err.response?.data?.message || "Failed to create lot");
      }
    },
  },
};
</script>

<style scoped>
.text-purple { color: #6f42c1; }
.btn-purple { background-color: #6f42c1; color: white; border: none; }
.btn-purple:hover { background-color: #5936a2; }
</style>
