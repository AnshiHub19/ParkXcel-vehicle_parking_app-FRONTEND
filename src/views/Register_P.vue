<template>
  <div class="register-wrapper">
    <!-- decorative shapes -->
    <div class="shape shape-1"></div>
    <div class="shape shape-2"></div>

    <div class="register-card">
      <!-- top badge -->
      <div class="register-badge">
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 12c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5Zm0 2c-3.33 0-10 1.67-10 5v3h20v-3c0-3.33-6.67-5-10-5Z"
            fill="white"
          />
        </svg>
      </div>

      <h3 class="title">Create Your Account</h3>
      <p class="subtitle">
        Start your hassle-free parking journey — ParkXcel
      </p>

      <form @submit.prevent="doRegister">
        <div class="input-group">
          <input
            v-model="username"
            type="text"
            placeholder="Username"
            required
          />
        </div>

        <div class="input-group">
          <input
            v-model="email"
            type="email"
            placeholder="Email"
            required
          />
        </div>

        <div class="input-group">
          <input
            v-model="password"
            type="password"
            placeholder="Create password"
            minlength="6"
            required
          />
        </div>

        <button class="register-btn" type="submit">
          Register
        </button>

        <p class="error" v-if="error">{{ error }}</p>
        <p class="success" v-if="success">{{ success }}</p>
      </form>

      <p class="footer-text">
        Already have an account?
        <router-link to="/login">Login here</router-link>
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
      success: ""
    };
  },
  methods: {
    async doRegister() {
      this.error = "";
      this.success = "";

      try {
        const res = await API.post("/register", {
          username: this.username,
          email: this.email,
          password: this.password
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
    }
  }
};
</script>

<style scoped>
/* ---------- Background ---------- */
.register-wrapper {
  min-height: 100vh;
  background: linear-gradient(135deg, #7c3aed, #6366f1);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

/* ---------- Shapes ---------- */
.shape {
  position: absolute;
  border-radius: 50%;
  opacity: 0.25;
}

.shape-1 {
  width: 280px;
  height: 280px;
  background: #a78bfa;
  top: -80px;
  left: -80px;
}

.shape-2 {
  width: 200px;
  height: 200px;
  background: #c7d2fe;
  bottom: -60px;
  right: -60px;
}

/* ---------- Card ---------- */
.register-card {
  background: white;
  width: 400px;
  padding: 52px 34px 36px;
  border-radius: 24px;
  box-shadow: 0 30px 70px rgba(0, 0, 0, 0.25);
  text-align: center;
  position: relative;
  z-index: 2;
}

/* ---------- Badge ---------- */
.register-badge {
  width: 82px;
  height: 82px;
  background: linear-gradient(135deg, #7c3aed, #6366f1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: -96px auto 22px;
  box-shadow: 0 14px 30px rgba(99, 102, 241, 0.5);
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
.register-btn {
  width: 100%;
  padding: 14px;
  border-radius: 16px;
  border: none;
  background: linear-gradient(135deg, #7c3aed, #6366f1);
  color: white;
  font-weight: 600;
  margin-top: 6px;
}

.register-btn:hover {
  opacity: 0.96;
}

/* ---------- Messages ---------- */
.error {
  color: #dc2626;
  font-size: 14px;
  margin-top: 12px;
}

.success {
  color: #16a34a;
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
