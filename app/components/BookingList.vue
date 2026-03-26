<template>
  <v-card flat>
    <v-card-title class="d-flex align-center pe-2">
      <v-icon icon="mdi-calendar-check"></v-icon> &nbsp;
      Recent Bookings
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        density="compact"
        label="Search"
        prepend-inner-icon="mdi-magnify"
        variant="solo-filled"
        flat
        hide-details
        single-line
      ></v-text-field>
    </v-card-title>

    <v-divider></v-divider>

    <v-data-table
      :headers="headers"
      :items="bookings"
      :search="search"
      :loading="loading"
    >
      <template v-slot:item.customer="{ item }">
        {{ item.customer?.name || 'Unknown' }}
      </template>
      <template v-slot:item.status="{ item }">
        <v-chip
          :color="getStatusColor(item.status)"
          size="small"
          label
        >
          {{ item.status }}
        </v-chip>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-btn icon="mdi-eye-outline" variant="text" size="small"></v-btn>
        <v-btn icon="mdi-pencil-outline" variant="text" size="small"></v-btn>
      </template>
    </v-data-table>
  </v-card>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const search = ref('')
const loading = ref(false)
const bookings = ref([])

const headers = [
  { title: 'Customer', key: 'customer' },
  { title: 'Date', key: 'schedule_date' },
  { title: 'Time', key: 'schedule_time' },
  { title: 'Status', key: 'status' },
  { title: 'Actions', key: 'actions', sortable: false },
]

const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case 'confirmed': return 'success'
    case 'pending': return 'warning'
    case 'cancelled': return 'error'
    default: return 'grey'
  }
}

const fetchBookings = async () => {
  loading.value = true
  try {
    const response = await useApiFetch('/bookings')
    bookings.value = response.data || [] // Assuming Laravel length-aware pagination
  } catch (err) {
    console.error('Failed to fetch bookings:', err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchBookings()
})
</script>
