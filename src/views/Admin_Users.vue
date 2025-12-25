<template>
  <div class="d-flex">
    <AdminSidebar />
    <div class="flex-grow-1">
      <AdminNavbar />

      <div class="container mt-4">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h4>Users</h4>

          <div class="d-flex">
            <input
              v-model="q"
              @input="onSearch"
              type="search"
              class="form-control form-control-sm me-2"
              placeholder="Search name or email..."
              style="min-width: 220px;"
            />

            <select v-model="roleFilter" class="form-select form-select-sm me-2" style="width:140px;">
              <option value="">All roles</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>

            <button class="btn btn-outline-secondary btn-sm" @click="exportCSV">
              Export CSV
            </button>
          </div>
        </div>

        <div class="card">
          <div class="card-body p-2">
            <div class="table-responsive">
              <table class="table table-striped table-hover mb-0">
                <thead class="table-light">
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th style="width:130px">Roles</th>
                    <th style="width:120px">Current Status</th>
                    <th>Current Lot</th>
                    <th style="width:160px">Parking Since</th>
                  </tr>
                </thead>

                <tbody>
                  <tr v-for="u in pagedRows" :key="u.user_id">
                    <td>{{ u.name }}</td>
                    <td>{{ u.email }}</td>
                    <td>
                      <span
                        v-for="r in u.roles"
                        :key="r"
                        class="badge me-1"
                        :class="r === 'admin' ? 'bg-primary' : 'bg-secondary'"
                      >
                        {{ r }}
                      </span>
                    </td>
                    <td>
                      <span
                        class="badge"
                        :class="u.current_status === 'Parked' ? 'bg-success' : 'bg-warning text-dark'"
                      >
                        {{ u.current_status }}
                      </span>
                    </td>
                    <td>{{ u.current_lot || '-' }}</td>
                    <td>{{ formatDate(u.parking_since) }}</td>
                  </tr>

                  <tr v-if="filtered.length === 0">
                    <td colspan="6" class="text-center text-muted py-4">
                      No users found.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="card-footer d-flex justify-content-between align-items-center">
            <div>
              Showing <strong>{{ startRow + 1 }}</strong> -
              <strong>{{ Math.min(endRow, filtered.length) }}</strong> of
              <strong>{{ filtered.length }}</strong>
            </div>

            <div class="d-flex align-items-center">
              <button class="btn btn-sm btn-outline-secondary me-2" :disabled="page === 1" @click="prevPage">
                Prev
              </button>

              <nav>
                <ul class="pagination pagination-sm mb-0">
                  <li
                    v-for="p in pageCount"
                    :key="p"
                    :class="['page-item', { active: p === page }]"
                    style="cursor:pointer"
                  >
                    <a class="page-link" @click="gotoPage(p)">{{ p }}</a>
                  </li>
                </ul>
              </nav>

              <button class="btn btn-sm btn-outline-secondary ms-2" :disabled="page === pageCount" @click="nextPage">
                Next
              </button>
            </div>
          </div>
        </div>
      </div> <!-- container -->
    </div>
  </div>
</template>

<script>
import AdminSidebar from "@/components/AdminSidebar.vue";
import AdminNavbar from "@/components/AdminNavbar.vue";
import API from "@/api";

export default {
  name: "UsersPage",
  components: { AdminSidebar, AdminNavbar },

  data() {
    return {
      users: [],        // all users from backend
      q: "",            // search query
      roleFilter: "",   // role filter
      page: 1,
      perPage: 8,
    };
  },

  computed: {
    // filtered by search and role
    filtered() {
      const q = this.q.trim().toLowerCase();
      return this.users.filter((u) => {
        const matchQ =
          !q ||
          (u.name && u.name.toLowerCase().includes(q)) ||
          (u.email && u.email.toLowerCase().includes(q));
        const matchRole = !this.roleFilter || (u.roles && u.roles.includes(this.roleFilter));
        return matchQ && matchRole;
      });
    },

    pageCount() {
      return Math.max(1, Math.ceil(this.filtered.length / this.perPage));
    },

    startRow() {
      return (this.page - 1) * this.perPage;
    },

    endRow() {
      return this.page * this.perPage;
    },

    pagedRows() {
      return this.filtered.slice(this.startRow, this.endRow);
    }
  },

  methods: {
    async fetchUsers() {
      try {
        const res = await API.get("/admin/view_users");
        this.users = res.data.users || [];
      } catch (e) {
        console.error(e);
        alert("Failed to load users. Make sure you are logged in as admin.");
      }
    },

    onSearch() {
      this.page = 1; // reset to first page on search
    },

    formatDate(iso) {
      if (!iso) return "-";
      try {
        return new Date(iso).toLocaleString();
      } catch {
        return iso;
      }
    },

    gotoPage(p) {
      if (p >= 1 && p <= this.pageCount) this.page = p;
    },
    prevPage() {
      if (this.page > 1) this.page -= 1;
    },
    nextPage() {
      if (this.page < this.pageCount) this.page += 1;
    },
    exportCSV() {
      const rows = this.filtered.map((u) => ({
        user_id: u.user_id,
        name: u.name,
        email: u.email,
        roles: (u.roles || []).join("|"),
        current_status: u.current_status,
        current_lot: u.current_lot || "",
        parking_since: u.parking_since || "",
      }));

      if (!rows.length) {
        alert("No rows to export.");
        return;
      }

      const header = Object.keys(rows[0]);
      const csv = [
        header.join(","),
        ...rows.map((r) =>
          header
            .map((h) => {
              const v = r[h] === null || r[h] === undefined ? "" : String(r[h]);
              // escape quotes
              return `"${v.replace(/"/g, '""')}"`;
            })
            .join(",")
        ),
      ].join("\r\n");

      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `users_export_${new Date().toISOString().slice(0, 19)}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    },
  },

  mounted() {
    this.fetchUsers();
  },
};
</script>

<style scoped>
.table > tbody > tr > td .badge {
  font-size: 0.75rem;
}
</style>
