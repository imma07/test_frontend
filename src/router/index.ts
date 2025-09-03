import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AdminView from '../views/Admin/AdminView.vue'
import AboutView from '@/views/AboutView.vue'
import AdminUsers from '@/views/Admin/AdminUsers.vue'
import AdminLayout from '@/Layouts/AdminLayout.vue'
import Register from '@/views/Admin/Register.vue'
import Login from '@/views/Login.vue'
import { useAuthStore } from "@/stores/auth";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: "/admin",
      component: AdminLayout,
      children: [
        { path: "dashboard", name: "dashboard", component: AdminView, meta: { requiresAuth: true }  },
        { path: "users", name: "users", component: AdminUsers, meta: { requiresAuth: true } },
        { path: "register", name: "register", component: Register, meta: { requiresAuth: true }  },
      ],
    },
    // {
    //   path: "/",
    //   component: CustomLayout,
    //   children: [
    //     { path: "", component: HomeView }, // default route
    //     { path: "about", component: AboutView },
    //   ],
    // },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
      meta: { requiresAuth: true },
    },
  ],
})
router.beforeEach((to, from, next) => {
  const auth = useAuthStore();
  const token = auth.token;
  if (to.meta.requiresAuth && !token) {
    // If route needs auth but no token, redirect to login
    next({ name: "Login" });
  } else if (to.name === "Login" && token) {
    // Prevent going back to login if already logged in
    next({ name: "Home" });
  } else {
    next();
  }
});

export default router
