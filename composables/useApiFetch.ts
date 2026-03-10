import { useAuthStore } from '@/stores/auth'

export const useApiFetch = async <T>(request: string, opts?: any) => {
    const config = useRuntimeConfig()
    const authStore = useAuthStore()

    const defaultHeaders: Record<string, string> = {
        'Accept': 'application/json',
    }

    // Inject Authorization Token
    if (authStore.token) {
        defaultHeaders['Authorization'] = `Bearer ${authStore.token}`
    }

    // Inject Custom Tenant ID Header for Multi-Tenancy Architecture
    if (authStore.tenantId) {
        defaultHeaders['X-Tenant-ID'] = authStore.tenantId
    }

    const customOptions = {
        baseURL: config.public.apiBaseUrl,
        headers: { ...defaultHeaders, ...(opts?.headers || {}) },
        ...opts,
        onResponseError({ response }: any) {
            if (response.status === 401) {
                // Automatically logout if token is expired or unauthorized
                authStore.logout()
                const router = useRouter()
                router.push('/login')
            }
        }
    }

    return await $fetch<T>(request, customOptions)
}
