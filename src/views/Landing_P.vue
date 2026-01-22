<template>
  <div class="landing-page d-flex flex-column min-vh-100">
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
      <div class="container">
        <router-link class="navbar-brand d-flex align-items-center" to="/">
          <img
            src="@/assets/carlogo.webp"
            alt="ParkXcel Logo"
            class="me-2 logo"
          />
          <span class="fw-bold brand-text">ParkXcel</span>
        </router-link>

        <div class="ms-auto">
          <router-link class="btn btn-outline-primary me-2" to="/login">
            Login
          </router-link>
          <router-link class="btn btn-primary" to="/register">
            Register
          </router-link>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="hero d-flex flex-grow-1 align-items-center">
      <div class="container">
        <div class="row align-items-center">
          <!-- Text -->
          <div class="col-lg-6 mb-4 mb-lg-0">
            <div class="hero-card">
              <h1 class="fw-bold mb-3">
                Smart parking,<br />
                <span class="highlight">made effortless</span>
              </h1>
              <p class="lead text-muted mb-4">
                ParkXcel helps you find, manage, and optimize parking spaces
                seamlessly — anytime, anywhere.
              </p>
              <router-link to="/register" class="btn btn-primary btn-lg">
                Get Started
              </router-link>
            </div>
          </div>

          <!-- Image -->
          <div class="col-lg-6 text-center">
            <img
              src="@/assets/garage.jpg"
              alt="Parking Illustration"
              class="hero-image"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer text-center mt-auto">
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
/* ---------- Brand ---------- */
.brand-text {
  color: #4f46e5;
  font-size: 1.3rem;
}

.logo {
  width: 40px;
}

/* ---------- Hero ---------- */
.hero {
  background: linear-gradient(135deg, #eef2ff, #f8fafc);
  padding: 80px 0;
}

.hero-card {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(10px);
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
}

.hero-card h1 {
  font-size: 2.5rem;
  color: #1f2937;
}

.highlight {
  color: #4f46e5;
}

.hero-image {
  max-width: 100%;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

/* ---------- Buttons ---------- */
.btn-primary {
  background-color: #4f46e5;
  border: none;
  border-radius: 10px;
  padding: 10px 22px;
}

.btn-primary:hover {
  background-color: #4338ca;
}

.btn-outline-primary {
  border-radius: 10px;
}

/* ---------- Footer ---------- */
.footer {
  background: #ffffff;
  padding: 15px;
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.05);
  color: #374151;
}
</style>
