<template>
  <div class="landing-page d-flex flex-column min-vh-100">
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
      <div class="container">
        <router-link class="navbar-brand d-flex align-items-center" to="/">
          <img src="@/assets/carlogo.webp" alt="ParkXcel Logo" style="width: 40px; height: auto;" class="me-2" />
          <span class="fw-bold text-purple">ParkXcel</span>
        </router-link>

        <div class="ms-auto">
          <router-link class="btn btn-outline-purple me-2" to="/login">Login</router-link>
          <router-link class="btn btn-purple" to="/register">Register</router-link>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <div class="d-flex flex-grow-1 hero-section">
      <!-- Left Image -->
      <div class="hero-left"></div>

      <!-- Right Content -->
      <div class="hero-right d-flex flex-column justify-content-center p-5">
        <h1 class="text-purple fw-bold mb-3">Your parking, elevated with ParkXcel</h1>
        <p class="lead text-dark mb-4">Find, manage, and optimize spots with ease — anytime, anywhere.</p>
        <router-link class="btn btn-purple btn-lg w-50" to="/register">Get Started</router-link>
      </div>
    </div>

    <!-- Footer -->
    <footer class="bg-white text-center text-dark py-3 shadow-top mt-auto">
      &copy; 2025 ParkXcel. All rights reserved.
    </footer>
  </div>
</template>

<script>
export default {
  name: "LandingPage",
};
</script>

<style scoped>
/* Navbar buttons */
.btn-purple {
  background-color: #6f42c1;
  color: #fff;
  border-radius: 6px;
  border: none;
}
.btn-purple:hover {
  background-color: #5a32a3;
}

.btn-outline-purple {
  border: 2px solid #6f42c1;
  color: #6f42c1;
  border-radius: 6px;
}
.btn-outline-purple:hover {
  background-color: #6f42c1;
  color: #fff;
}

/* Logo */
.logo {
  width: 40px;
  height: auto;
}

/* Hero Section 50-50 */
.hero-section {
  height: 80vh; /* ensure visible */
}

/* Left image */
.hero-left {
  width: 50%;
  background-image: url("@/assets/garage.jpg"); /* relative path */
  background-size: cover;
  background-position: center;
}

/* Right content */
.hero-right {
  width: 50%;
}

/* Footer shadow */
.shadow-top {
  box-shadow: 0 -4px 20px rgba(0,0,0,0.05);
}
</style>
