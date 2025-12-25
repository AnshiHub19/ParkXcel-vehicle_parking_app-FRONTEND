<template>
  <div class="d-flex vh-100 align-items-center justify-content-center" style="background: linear-gradient(135deg,#f3e8ff,#ffffff);">
    <div class="card p-4" style="width:400px; border-radius:12px;">
      
      <h3 class="text-center mb-3" style="color:#6f42c1;">Login to your account</h3>
      <p class="text-muted text-center mb-4">
        Continue your flow — ParkXcel
      </p>

      <form @submit.prevent="doLogin">
        <div class="mb-3">
          <label class="form-label">Username / Email</label>
          <input v-model="username" class="form-control" required />
        </div>

        <div class="mb-3">
          <label class="form-label">Password</label>
          <input v-model="password" type="password" class="form-control" required />
        </div>

        <button class="btn w-100 text-white" style="background-color:#6f42c1;" type="submit">Login</button>

        <p class="mt-3 text-danger" v-if="error">{{ error }}</p>
      </form>

      <p class="mt-3 text-center">
        No account yet? 
        <router-link to="/register" style="color:#6f42c1; font-weight:600;">Sign up now</router-link>
      </p>
    </div>
  </div>
</template>
<script>
import API from "@/api"; // use the API instance with interceptor

export default {
  name: "LoginPage",
  data() {
    return { username: "", password: "", error: "" };
  },
  methods: {
    async doLogin() {
      this.error = "";
      try {
        // use API.post instead of axios.post
        const res = await API.post("/login", {
          username: this.username,
          password: this.password
        });

        if(res.status === 200){
          const userData = res.data.user;
          const authToken = res.data.access_token;

          // save token for further requests (API interceptor will attach it)
          localStorage.setItem("auth_token", authToken);
          localStorage.setItem("user_roles", JSON.stringify(userData.roles));

          // redirect based on role
          if (userData.roles.includes("admin")) {
            this.$router.push("/admin");
          } else if (userData.roles.includes("user")) {
            this.$router.push("/user");
          } else {
            this.error = "Role not recognized.";
          }
        }
      } catch (err) {
        this.error = err.response?.data?.message || "Server error or invalid credentials.";
      }
    },
  },
};
</script>
