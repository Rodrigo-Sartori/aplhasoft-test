import { createRouter, createWebHistory } from "vue-router";
import Agenda from "../pages/Agenda.vue";
import Login from "../pages/Login.vue";
import ContactForm from "../pages/ContactForm.vue";
import { jwtDecode } from "jwt-decode";
import Signup from "../pages/Signup.vue";

function isTokenValid() {
  const token = localStorage.getItem("token");
  if (!token) return false;

  try {
    const decoded = jwtDecode(token);
    const now = Math.floor(Date.now() / 1000);
    return (decoded.exp ?? 0) > now;
  } catch {
    return false;
  }
}

const routes = [
  { path: "/", redirect: "/login" },
  { path: "/login", name: "Login", component: Login },
  { path: "/signup", component: Signup },
  {
    path: "/agenda",
    name: "Agenda",
    component: Agenda,
    meta: { requiresAuth: true },
  },
  {
    path: "/contact/:id?",
    name: "ContactForm",
    component: ContactForm,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to: any, _: any, next: any) => {
  if (to.meta.requiresAuth && !isTokenValid()) {
    return next("/login");
  }
  next();
});

export default router;
