<template>
<nav class="navbar navbar-expand-lg navbar-light" :style="navStyle">
<div class="container-fluid">
<a class="navbar-brand text-white" href="#">ParkXcel Admin</a>
<div class="d-flex ms-auto">
<span class="me-3 text-white">{{ adminEmail }}</span>
<button class="btn btn-outline-light btn-sm" @click="logout">Logout</button>
</div>
</div>
</nav>
</template>


<script>
export default {
name: 'AdminNavbar',
data() {
return { adminEmail: localStorage.getItem('user_email') || 'admin' };
},
computed: {
navStyle() {
return {
background: 'linear-gradient(90deg,#6f42c1,#8e63d6)',
};
}
},
methods: {
logout() {
localStorage.removeItem('token');
localStorage.removeItem('user_email');
this.$router.push('/');
}
}
}
</script>