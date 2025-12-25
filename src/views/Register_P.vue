<template>
  <div class="d-flex vh-100 align-items-center justify-content-center" style="background: linear-gradient(135deg, #f3e8ff, #ffffff);">
    <div class="card shadow p-4" style="width: 420px; border-radius: 14px;">
      <h3 class="text-center text-purple mb-3">Create Your Account</h3>
      <p class="text-muted text-center mb-4">Start your hassle-free parking journey — ParkXcel</p>

      <form @submit.prevent="doRegister">
        <div class="mb-3">
          <label class="form-label fw-bold">Username</label>
          <input v-model="username" class="form-control" placeholder="Enter username" required />
        </div>

        <div class="mb-3">
          <label class="form-label fw-bold">Email</label>
          <input v-model="email" type="email" class="form-control" placeholder="Enter your email" required />
        </div>

        <div class="mb-3">
          <label class="form-label fw-bold">Password</label>
          <input v-model="password" type="password" class="form-control" placeholder="Create password" minlength="6" required />
        </div>

        <button class="btn w-100 text-white" style="background-color:#6f42c1;" type="submit">Register</button>

        <div class="mt-3 text-center">
          <p class="text-danger" v-if="error">{{ error }}</p>
          <p class="text-success" v-if="success">{{ success }}</p>
        </div>
      </form>

      <p class="text-center mt-3 mb-0">
        Already have an account?
        <router-link to="/login" style="color:#6f42c1; font-weight:600;">Login here</router-link>
      </p>
    </div>
  </div>
</template>
<script>
import API from "@/api";

export default {
  name: "RegisterPage",
  data() {
    return {
      username: "",
      email: "",
      password: "",
      error: "",
      success: "",
    };
  },
  methods: {
    async doRegister() {
      this.error = "";
      this.success = "";

      try {
        const res = await API.post("/register", {
          email: this.email,
          password: this.password,
        });

        if (res.status === 200 || res.status === 201) {
          this.success = "Registration successful! Redirecting to login...";
          setTimeout(() => {
            this.$router.push("/login");
          }, 1000);
        }
      } catch (err) {
        this.error =
          err.response?.data?.message ||
          "Registration failed — please try again.";
      }
    },
  },
};
</script>
