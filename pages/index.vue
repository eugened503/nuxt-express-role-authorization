<template>
  <div>
    <h1>Домашняя</h1>
    <p>Вы вошли в систему с помощью Vue.js & JWT!!</p>
    <p>
      Ваша роль:
      <strong>{{ getToken }}</strong
      >.
    </p>
    <p>Эта страница доступна всем пользователям, прошедшим аутентификацию.</p>
    <div>
      Текущий пользователь из конечной точки безопасного api:
      <ul>
        <li>{{ getToken }} User</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  middleware: ["auth"],
  computed: mapGetters(["getToken"]),
};
</script>
