import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null as Record<string, any> | null,
        token: useCookie('auth_token', { maxAge: 60 * 60 * 24 * 7 }), // 7 days
        tenantId: useCookie('tenant_id', { maxAge: 60 * 60 * 24 * 7 })
    }),
    getters: {
        isAuthenticated: (state) => !!state.token,
        getCurrentTenant: (state) => state.tenantId
    },
    actions: {
        setUser(userData: Record<string, any>) {
            this.user = userData
        },
        setToken(newToken: string) {
            this.token = newToken
        },
        setTenant(newTenantId: string) {
            this.tenantId = newTenantId
        },
        logout() {
            this.user = null
            this.token = null
            this.tenantId = null
        }
    }
})
