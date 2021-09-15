<template>
  <div class="login">
    <div class="alert alert-info">
      <strong>Normal User</strong> - Имя: user Пароль: user<br />
      <strong>Administrator</strong> - Имя: admin Пароль: admin
    </div>
    <section>
      <ValidationObserver v-slot="{ handleSubmit }" ref="form">
        <form @submit.prevent="handleSubmit(onSubmit)">
          <h2>Вход</h2>
          <div class="form-group">
            <label for="username">Имя</label>
            <ValidationProvider rules="required" v-slot="{ errors, classes }">
              <input type="text" v-model="login" class="form-control" :class="classes" name="'Username'" />
              <div class="invalid-feedback">{{ errors[0] }}</div>
            </ValidationProvider>
          </div>

          <div class="form-group">
            <label htmlFor="password">Пароль</label>
            <ValidationProvider rules="required" v-slot="{ errors, classes }">
              <input type="password" v-model="password" class="form-control" :class="classes" name="'Password'" />
              <div class="invalid-feedback">{{ errors[0] }}</div>
            </ValidationProvider>
          </div>

          <div class="form-group">
            <button class="btn btn-primary" :disabled="loading">
              <span class="spinner-border spinner-border-sm" v-show="loading"></span>
              <span>Войти</span>
            </button>
          </div>
          <div v-if="error" class="alert alert-danger">{{ error }}</div>
        </form>
      </ValidationObserver>
    </section>
  </div>
</template>

<script>
import { bus } from "~/bus/bus";

import { ValidationProvider, ValidationObserver, configure, extend } from "vee-validate";
import { required } from "vee-validate/dist/rules.umd.js";
extend("required", {
  ...required,
  message: "Поле {_field_} обязательно для заполнения",
});

configure({
  classes: {
    valid: "is-valid",
    invalid: "is-invalid",
  },
});

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data: () => ({
    login: "",
    password: "",
    error: null,
    loading: false,
  }),

  layout: "empty",

  methods: {
    onSubmit() {
      //валидацей полей формы
      this.$refs.form.validate().then((success) => {
        if (!success) {
          return;
        }

        this.createPage();
        this.persist();

        //очистка полей формы
        this.login = this.password = "";

        //сброс полей формы после валидации
        this.$nextTick(() => {
          this.$refs.form.reset();
        });
      });
    },

    async createPage() {
      if ((this.login !== "") & (this.password !== ""))
        await this.$axios
          .post(`auth/login`, { username: this.login, password: this.password })
          .then((response) => {
            bus.$emit("role", response.data);
            this.$store.dispatch("login", response.data);
            this.error = null;
            this.$router.push("/");
          })
          .catch((error) => {
            this.error = error;
          });
    },
    persist() {
      localStorage.setItem("login", this.login);
      localStorage.setItem("password", this.password);
    },
  },
};
</script>

<style scoped>
.login {
  padding: 50px 200px;
}
.is-valid {
  border: 2px solid green;
}

.is-invalid {
  border: 2px solid red;
}
.btn {
  margin: 20px 0;
}
</style>
