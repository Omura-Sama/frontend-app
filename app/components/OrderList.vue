<template>
  <v-card flat>
    <v-card-title class="d-flex align-center pe-2">
      <v-icon icon="mdi-camera-timer"></v-icon> &nbsp;
      Active Orders
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        density="compact"
        label="Search Invoice"
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
      :items="orders"
      :search="search"
      :loading="loading"
    >
      <template v-slot:item.invoice_number="{ item }">
        <span class="font-weight-bold text-primary">{{ item.invoice_number }}</span>
      </template>
      <template v-slot:item.customer="{ item }">
        {{ item.customer?.name || 'Unknown' }}
      </template>
      <template v-slot:item.grand_total="{ item }">
        Rp {{ formatNumber(item.grand_total) }}
      </template>
      <template v-slot:item.production_state="{ item }">
        <v-chip
          :color="getProductionColor(item.production_state)"
          size="small"
          label
        >
          {{ item.production_state }}
        </v-chip>
      </template>
      <template v-slot:item.payment_status="{ item }">
        <v-chip
          :color="item.payment_status === 'paid' ? 'success' : 'warning'"
          variant="tonal"
          size="x-small"
        >
          {{ item.payment_status }}
        </v-chip>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-btn icon="mdi-printer-outline" variant="text" size="small"></v-btn>
        <v-btn icon="mdi-pencil-outline" variant="text" size="small"></v-btn>
      </template>
    </v-data-table>
  </v-card>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const search = ref('')
const loading = ref(false)
const orders = ref([])

const headers = [
  { title: 'Invoice #', key: 'invoice_number' },
  { title: 'Customer', key: 'customer' },
  { title: 'Total', key: 'grand_total' },
  { title: 'Production', key: 'production_state' },
  { title: 'Payment', key: 'payment_status' },
  { title: 'Actions', key: 'actions', sortable: false },
]

const formatNumber = (val) => {
  return new Intl.NumberFormat('id-ID').format(val)
}

const getProductionColor = (state) => {
  switch (state?.toLowerCase()) {
    case 'completed': return 'success'
    case 'processing': return 'info'
    case 'pending': return 'warning'
    default: return 'grey'
  }
}

const fetchOrders = async () => {
  loading.value = true
  try {
    const response = await useApiFetch('/orders')
    orders.value = response.data || []
  } catch (err) {
    console.error('Failed to fetch orders:', err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchOrders()
})
</script>
