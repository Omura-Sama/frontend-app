<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Ku-OS Studio Login</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form @submit.prevent="handleLogin">
              <v-text-field
                v-model="form.email"
                label="Email"
                name="email"
                prepend-icon="mdi-account"
                type="email"
                required
              ></v-text-field>

              <v-text-field
                v-model="form.password"
                label="Password"
                name="password"
                prepend-icon="mdi-lock"
                type="password"
                required
              ></v-text-field>

              <!-- For local testing to switch tenants via header -->
              <v-text-field
                v-model="form.tenantId"
                label="Tenant ID (Optional local test)"
                prepend-icon="mdi-domain"
                type="text"
                hint="Leave empty to use default. Fill 1 or 2 for specific tenant branch."
              ></v-text-field>

              <div v-if="errorMsg" class="text-error mb-4">
                {{ errorMsg }}
              </div>

              <v-btn type="submit" color="primary" block :loading="loading">Login</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

definePageMeta({
  layout: false // Do not use the default layout with nav drawer for the login page
})

const authStore = useAuthStore()
const router = useRouter()

const form = ref({
  email: 'admin@example.com', // Demo defaults
  password: 'password',
  tenantId: '1'
})
const loading = ref(false)
const errorMsg = ref('')

const handleLogin = async () => {
  loading.value = true
  errorMsg.value = ''
  
  try {
    // If user provided a tenant ID, save it to the store so subsequent API calls use it
    if (form.value.tenantId) {
       authStore.setTenant(form.value.tenantId)
    }

    const response = await useApiFetch('/login', {
      method: 'POST',
      body: {
        email: form.value.email,
        password: form.value.password,
      }
    })

    // Suppose Laravel Sanctum returns { access_token, user }
    if (response && response.access_token) {
      authStore.setToken(response.access_token)
      authStore.setUser(response.user)
      
      router.push('/')
    }
  } catch (err) {
    console.error(err)
    errorMsg.value = err.data?.message || 'Login failed. Please check credentials.'
  } finally {
    loading.value = false
  }
}
</script>
