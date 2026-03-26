<template>
  <v-app-bar color="primary" app>
    <v-app-bar-title>Ku-OS Studio ({{ user?.name || 'Guest' }})</v-app-bar-title>
    <v-spacer></v-spacer>
    
    <v-btn text @click="logout" v-if="user">
      Logout
    </v-btn>
    <v-btn icon v-else>
      <v-icon>mdi-account-circle</v-icon>
    </v-btn>
  </v-app-bar>

  <v-navigation-drawer app>
    <v-list>
      <v-list-item prepend-icon="mdi-view-dashboard" title="Dashboard" to="/"></v-list-item>
      <v-list-item prepend-icon="mdi-camera" title="Booking & Orders" to="/orders"></v-list-item>
      <v-list-item prepend-icon="mdi-finance" title="Financials" to="/finance"></v-list-item>
      <v-list-item prepend-icon="mdi-cog" title="Settings" to="/settings"></v-list-item>
    </v-list>
  </v-navigation-drawer>

  <v-main>
    <v-container fluid>
      <slot />
    </v-container>
  </v-main>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const user = computed(() => authStore.user)

const logout = async () => {
  try {
    await useApiFetch('/logout', { method: 'POST' })
  } catch(e) {
     // Ignore logout backend errors gracefully on frontend
  } finally {
     authStore.logout()
     router.push('/login')
  }
}
</script>
