import { useAuthStore } from '@/stores/auth'

export default defineNuxtRouteMiddleware((to) => {
    const authStore = useAuthStore()

    // If user is not authenticated and trying to access a page other than login
    if (!authStore.isAuthenticated && to.path !== '/login') {
        return navigateTo('/login')
    }

    // If user is authenticated and tries to go to login, send them back to home
    if (authStore.isAuthenticated && to.path === '/login') {
        return navigateTo('/')
    }
})
