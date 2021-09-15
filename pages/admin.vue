<template>
  <div>
    <h1>Администратор</h1>
    <p>Эта страница доступна только администраторам.</p>
    <div>
      Все пользовательские end point (только для администратора):
      <ul>
        <li>
          {{ getToken }}
        </li>
        <li>Normal User</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  middleware: ["authAdmin"],
  computed: mapGetters(["getToken"]),
};
</script>
