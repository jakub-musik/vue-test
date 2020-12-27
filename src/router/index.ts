import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import Results from "../views/Results.vue";

export const routing = {
  home: "/",
  results: "/results"
} as const;

const routes: Array<RouteRecordRaw> = [
  {
    path: routing.home,
    name: "Home",
    component: Home
  },
  {
    path: routing.results,
    name: "Results",
    component: Results
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
