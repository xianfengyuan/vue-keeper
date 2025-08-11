import { createRouter, createWebHistory } from 'vue-router'
import AccessDenied from '@/views/auth/AccessDenied.vue'
import NotFound from '@/views/auth/NotFound.vue'
import SignIn from '@/views/auth/SignIn.vue'
import SignUp from '@/views/auth/SignUp.vue'
import ContactUs from '@/views/home/ContactUs.vue'
import Home from '@/views/home/Home.vue'
import LoginList from '@/views/Login/LoginList.vue'
import LoginUpsert from '@/views/Login/LoginUpsert.vue'
import { APP_ROUTE_NAMES } from '@/constants/routeNames'
import { useAuthStore } from '@/stores/authStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: APP_ROUTE_NAMES.HOME,
      component: Home,
    },
    {
      path: '/contact-us',
      name: APP_ROUTE_NAMES.CONTACT_US,
      component: ContactUs,
    },
    {
      path: '/sign-in',
      name: APP_ROUTE_NAMES.SIGN_IN,
      component: SignIn,
    },
    {
      path: '/sign-up',
      name: APP_ROUTE_NAMES.SIGN_UP,
      component: SignUp,
    },
    {
      path: '/access-denied',
      name: APP_ROUTE_NAMES.ACCESS_DENIED,
      component: AccessDenied,
    },
    {
      path: '/not-found',
      name: APP_ROUTE_NAMES.NOT_FOUND,
      component: NotFound,
    },
    {
      path: '/login-list',
      name: APP_ROUTE_NAMES.LOGIN_LIST,
      component: LoginList,
      beforeEnter: [isAdmin],
    },
    {
      path: '/login-create',
      name: APP_ROUTE_NAMES.LOGIN_CREATE,
      component: LoginUpsert,
      beforeEnter: [isAdmin],
    },
    {
      path: '/login-update/:id',
      name: APP_ROUTE_NAMES.LOGIN_UPDATE,
      component: LoginUpsert,
      beforeEnter: [isAdmin],
    },
  ],
})

router.beforeEach(async (toString, from) => {
  const authStore = useAuthStore()

  if (!authStore.initialized) {
    await authStore.initializeAuth()
  }
})

function isAdmin() {
  const authStore = useAuthStore()
  console.log('Auth Store:', authStore.isAuthenticated)
  if (authStore.isAuthenticated) {
    if (authStore.isAdmin) {
      return true
    } else {
      return { name: APP_ROUTE_NAMES.ACCESS_DENIED }
    }
  } else {
    return { name: APP_ROUTE_NAMES.SIGN_IN }
  }
}

function isAuthenticated() {
  const authStore = useAuthStore()
  if (authStore.isAuthenticated) {
    return true
  } else {
    return { name: APP_ROUTE_NAMES.SIGN_IN }
  }
}

export default router
