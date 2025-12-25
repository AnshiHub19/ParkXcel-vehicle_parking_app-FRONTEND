import { createRouter, createWebHistory } from "vue-router";
import Landing from "../views/Landing_P.vue";
import LoginP from "../views/Login_P.vue";
import Register from "../views/Register_P.vue";
import Admindash from "../views/Admin_Dash.vue";
import AdminLots from "../views/Admin_Lots.vue";
import AdminUsers from "../views/Admin_Users.vue";
import AdminViewBookings from "../views/Admin_Bookings.vue";
import AdminAnalytics from "../views/Admin_Analytics.vue";
import UserDashboard from "../views/User_Dash.vue";
import UserLots from "../views/User_lots.vue";
import UserReservations from "../views/User_Reservation.vue";
import UserParkingHistory from "../views/User_Parkhistory.vue";
import UserAnalytics from "../views/User_Analytics.vue";  

const routes = [
  { path: "/", name: "Landing", component: Landing },
  { path: "/login", name: "Login", component: LoginP },
  { path: "/register", name: "Register", component: Register },
  { path: "/admin", name: "Admin", component: Admindash },
  { path: "/admin/lots", component: AdminLots },
  { path: "/admin/users", component: AdminUsers },
  { path: "/admin/bookings", component: AdminViewBookings},
  { path: "/admin/charts", component: AdminAnalytics},
  { path: "/user", component: UserDashboard},
  { path: "/user/lots", component: UserLots},
  { path: "/user/reservations", component: UserReservations},
  { path: "/user/history", component: UserParkingHistory},
  { path: "/user/charts", component: UserAnalytics}

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

