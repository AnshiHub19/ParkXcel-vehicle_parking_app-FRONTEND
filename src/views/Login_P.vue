<template>
  <div class="login-page">
    <div class="login-card">

      <!-- Top Icon -->
      <div class="avatar">
        <i class="bi bi-person-fill"></i>
      </div>

      <h3 class="title">Login to your account</h3>
      <p class="subtitle">Continue your flow — ParkXcel</p>

      <form @submit.prevent="doLogin">
        <div class="form-group">
          <input
            v-model="username"
            type="text"
            placeholder="Username / Email"
            required
          />
        </div>

        <div class="form-group">
          <input
            v-model="password"
            type="password"
            placeholder="Password"
            required
          />
        </div>

        <button type="submit" class="login-btn">
          Log in
        </button>

        <p class="error" v-if="error">{{ error }}</p>
      </form>

      <p class="bottom-text">
        No account yet?
        <router-link to="/register">Sign up now</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import API from "@/api";

export default {
  name: "LoginPage",
  data() {
    return {
      username: "",
      password: "",
      error: ""
    };
  },
  methods: {
    async doLogin() {
      this.error = "";
      try {
        const res = await API.post("/login", {
          username: this.username,
          password: this.password
        });

        const userData = res.data.user;
        const token = res.data.access_token;

        localStorage.setItem("auth_token", token);
        localStorage.setItem("user_roles", JSON.stringify(userData.roles));

        if (userData.roles.includes("admin")) {
          this.$router.push("/admin");
        } else {
          this.$router.push("/user");
        }
      } catch (err) {
        this.error =
          err.response?.data?.message ||
          "Invalid credentials or server error.";
      }
    }
  }
};
</script>

<style scoped>
/* ---------- Background ---------- */
.login-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #8b5cf6, #6366f1);
  display: flex;
  align-items: center;
  justify-content: center;
}

/* ---------- Card ---------- */
.login-card {
  width: 360px;
  background: #ffffff;
  border-radius: 22px;
  padding: 45px 30px;
  text-align: center;
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.18);
  position: relative;
}

/* ---------- Avatar ---------- */
.avatar {
  width: 70px;
  height: 70px;
  background: linear-gradient(135deg, #7c3aed, #6366f1);
  border-radius: 50%;
  margin: -80px auto 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 30px;
}

/* ---------- Text ---------- */
.title {
  font-weight: 600;
  color: #4f46e5;
  margin-bottom: 6px;
}

.subtitle {
  font-size: 14px;
  color: #6b7280;
  margin-bottom: 25px;
}

/* ---------- Inputs ---------- */
.form-group input {
  width: 100%;
  padding: 12px 14px;
  border-radius: 12px;
  border: 1px solid #d1d5db;
  margin-bottom: 16px;
  font-size: 14px;
}

.form-group input:focus {
  outline: none;
  border-color: #6366f1;
  box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
}

/* ---------- Button ---------- */
.login-btn {
  width: 100%;
  padding: 12px;
  border-radius: 14px;
  border: none;
  background: linear-gradient(135deg, #7c3aed, #6366f1);
  color: white;
  font-weight: 600;
  margin-top: 10px;
}

.login-btn:hover {
  opacity: 0.95;
}

/* ---------- Error ---------- */
.error {
  color: #dc2626;
  font-size: 14px;
  margin-top: 12px;
}

/* ---------- Bottom ---------- */
.bottom-text {
  margin-top: 22px;
  font-size: 14px;
}

.bottom-text a {
  color: #6366f1;
  font-weight: 600;
  text-decoration: none;
}
</style>
