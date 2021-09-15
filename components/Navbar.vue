<template>
  <nav class="navbar navbar-expand navbar-dark bg-dark" v-if="navbar">
    <div class="collapse navbar-collapse">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <nuxt-link exact no-prefetch active-class="active" class="nav-item nav-link" to="/"> Домашняя </nuxt-link>
        </li>
        <li class="nav-item" v-if="loading">
          <nuxt-link exact no-prefetch active-class="active" class="nav-item nav-link" to="/admin"> Админ </nuxt-link>
        </li>

        <li class="nav-item">
          <a @click.prevent="logout" class="nav-item nav-link" href="#"> Выход </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { bus } from "~/bus/bus";

export default {
  data: () => ({
    loading: false,
    navbar: false,
  }),

  mounted() {
    bus.$on("role", (role) => {
      this.loading = role === "admin" ? true : false;

      this.navbar = role ? true : false;
    });

    if (localStorage.getItem("login")) {
      this.loading = localStorage.getItem("login") === "admin" ? true : false;

      this.navbar = localStorage.getItem("login") ? true : false;
    }
  },

  methods: {
    //выход из системы, переход на страницу авторизации
    logout() {
      this.$router.push("/login");
      this.navbar = false;
      localStorage.removeItem("login");
      localStorage.removeItem("password");
      this.$store.dispatch("clear");
    },
  },
};
</script>
