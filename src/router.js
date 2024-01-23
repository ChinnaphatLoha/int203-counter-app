import { createRouter, createWebHistory } from "vue-router";
import TestView from "./TestView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "test",
      component: TestView,
    },
  ],
});

export default router;
