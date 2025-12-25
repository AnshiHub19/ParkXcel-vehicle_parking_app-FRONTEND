<template>
<div class="d-flex flex-column p-3 text-white" :style="sidebarStyle">
      
    <h4 class="mb-4 fw-bold">Admin Panel</h4>

<a @click="$router.push('/admin')" class="mb-3 fs-5 text-white" style="cursor:pointer">Dashboard</a>
<a @click="$router.push('/admin/users')" class="mb-2 text-white" style="cursor:pointer">Users</a>
<a @click="$router.push('/admin/lots')" class="mb-2 text-white" style="cursor:pointer">Parking Lots</a>
<a @click="$router.push('/admin/bookings')" class="mb-2 text-white" style="cursor:pointer">Bookings</a>
<a @click="$router.push('/admin/charts')" class="mb-2 text-white" style="cursor:pointer">Analytics</a>

</div>
</template>


<script>
export default {
name: 'AdminSidebar',
computed: {
sidebarStyle() {
return {
width: '220px',
minHeight: '100vh',
background: 'linear-gradient(180deg,#5b2a86,#7e4fbf)'
}
}
}
}
</script>