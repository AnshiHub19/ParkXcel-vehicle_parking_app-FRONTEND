<template>
  <div class="login-wrapper">
    <!-- decorative shapes -->
    <div class="shape shape-1"></div>
    <div class="shape shape-2"></div>

    <div class="login-card">
      <!-- top badge -->
      <div class="login-badge">
  <svg width="38" height="38" viewBox="0 0 24 24" fill="none">
    <path
      d="M12 12c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5Zm0 2c-3.33 0-10 1.67-10 5v3h20v-3c0-3.33-6.67-5-10-5Z"
      fill="white"
    />
  </svg>
</div>
      <h3 class="title">Login to your account</h3>
      <p class="subtitle">Continue your flow — ParkXcel</p>

      <form @submit.prevent="doLogin">
        <div class="input-group">
          <input
            v-model="username"
            type="text"
            placeholder="Username / Email"
            required
          />
        </div>

        <div class="input-group">
          <input
            v-model="password"
            type="password"
            placeholder="Password"
            required
          />
        </div>

        <button class="login-btn" type="submit">
          Log in
        </button>

        <p class="error" v-if="error">{{ error }}</p>
      </form>

      <p class="footer-text">
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

        const user = res.data.user;
        const token = res.data.access_token;

        localStorage.setItem("auth_token", token);
        localStorage.setItem("user_roles", JSON.stringify(user.roles));

        user.roles.includes("admin")
          ? this.$router.push("/admin")
          : this.$router.push("/user");

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
/* ---------- Page Background ---------- */
.login-wrapper {
  min-height: 100vh;
  background: linear-gradient(135deg, #7c3aed, #6366f1);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

/* ---------- Decorative Shapes ---------- */
.shape {
  position: absolute;
  border-radius: 50%;
  opacity: 0.25;
}

.shape-1 {
  width: 300px;
  height: 300px;
  background: #a78bfa;
  top: -80px;
  left: -80px;
}

.shape-2 {
  width: 220px;
  height: 220px;
  background: #c7d2fe;
  bottom: -60px;
  right: -60px;
}

/* ---------- Card ---------- */
.login-card {
  background: white;
  width: 380px;
  padding: 50px 32px 36px;
  border-radius: 22px;
  box-shadow: 0 30px 70px rgba(0, 0, 0, 0.25);
  text-align: center;
  position: relative;
  z-index: 2;
}

/* ---------- Badge ---------- */
  .login-badge {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #7c3aed, #6366f1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: -90px auto 20px;
  color: white;
  font-size: 36px;
  box-shadow: 0 12px 25px rgba(99, 102, 241, 0.5);
}

/* ---------- Text ---------- */
.title {
  font-weight: 600;
  color: #4f46e5;
}

.subtitle {
  font-size: 14px;
  color: #6b7280;
  margin-bottom: 26px;
}

/* ---------- Inputs ---------- */
.input-group input {
  width: 100%;
  padding: 13px 16px;
  border-radius: 14px;
  border: 1px solid #d1d5db;
  margin-bottom: 18px;
  font-size: 14px;
  background: #f9fafb;
}

.input-group input:focus {
  outline: none;
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.18);
}

/* ---------- Button ---------- */
.login-btn {
  width: 100%;
  padding: 13px;
  border-radius: 16px;
  border: none;
  background: linear-gradient(135deg, #7c3aed, #6366f1);
  color: white;
  font-weight: 600;
  margin-top: 8px;
}

.login-btn:hover {
  opacity: 0.96;
}

/* ---------- Error ---------- */
.error {
  color: #dc2626;
  font-size: 14px;
  margin-top: 12px;
}

/* ---------- Footer ---------- */
.footer-text {
  margin-top: 22px;
  font-size: 14px;
}

.footer-text a {
  color: #6366f1;
  font-weight: 600;
  text-decoration: none;
}
</style>
