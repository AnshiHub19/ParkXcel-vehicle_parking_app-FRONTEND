<template>
  <div class="login-page">
    <div class="login-container">
      <header class="login-header">
        <h2>Welcome back</h2>
        <p>Sign in to continue with ParkXcel</p>
      </header>

      <form class="login-form" @submit.prevent="handleLogin">
        <div class="form-group">
          <label>Email</label>
          <input
            v-model.trim="username"
            type="text"
            class="form-control"
            placeholder="Enter your email"
            required
          />
        </div>

        <div class="form-group">
          <label>Password</label>
          <input
            v-model="password"
            type="password"
            class="form-control"
            placeholder="Enter your password"
            required
          />
        </div>

        <button class="btn-primary" type="submit">
          Sign In
        </button>

        <p v-if="error" class="error-text">
          {{ error }}
        </p>
      </form>

      <footer class="login-footer">
        <span>New to ParkXcel?</span>
        <router-link to="/register">Create an account</router-link>
      </footer>
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
    async handleLogin() {
      this.error = "";

      try {
        const response = await API.post("/login", {
          username: this.username,
          password: this.password
        });

        const { user, access_token } = response.data;

        localStorage.setItem("auth_token", access_token);
        localStorage.setItem("user_roles", JSON.stringify(user.roles));

        if (user.roles.includes("admin")) {
          this.$router.push("/admin");
        } else if (user.roles.includes("user")) {
          this.$router.push("/user");
        } else {
          this.error = "Unauthorized role detected.";
        }
      } catch (err) {
        this.error =
          err.response?.data?.message ||
          "Invalid credentials. Please try again.";
      }
    }
  }
};
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #eef2ff, #f9fafb);
}

/* Card */
.login-container {
  width: 420px;
  padding: 42px;
  background: rgba(255, 255, 255, 0.88);
  backdrop-filter: blur(12px);
  border-radius: 18px;
  box-shadow: 0 18px 45px rgba(0, 0, 0, 0.1);
}

/* Header */
.login-header h2 {
  margin-bottom: 6px;
  font-weight: 700;
  color: #4f46e5;
}

.login-header p {
  margin-bottom: 28px;
  color: #6b7280;
}

/* Form */
.form-group {
  margin-bottom: 18px;
}

.form-control {
  height: 48px;
  border-radius: 10px;
  border: 1px solid #d1d5db;
  padding: 0 14px;
}

.form-control:focus {
  outline: none;
  border-color: #4f46e5;
  box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.15);
}

/* Button */
.btn-primary {
  width: 100%;
  height: 48px;
  margin-top: 8px;
  background-color: #4f46e5;
  border: none;
  border-radius: 12px;
  color: #ffffff;
  font-weight: 600;
  cursor: pointer;
}

.btn-primary:hover {
  background-color: #4338ca;
}

.error-text {
  margin-top: 14px;
  text-align: center;
  color: #dc2626;
  font-size: 0.9rem;
}
.login-footer {
  margin-top: 28px;
  text-align: center;
  font-size: 0.95rem;
}

.login-footer a {
  margin-left: 6px;
  color: #4f46e5;
  font-weight: 600;
  text-decoration: none;
}

.login-footer a:hover {
  text-decoration: underline;
}
</style>
