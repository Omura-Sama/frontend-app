<template>
  <div>
    <v-row class="mb-4">
      <v-col cols="12" class="d-flex align-center">
        <h1 class="text-h4 font-weight-bold">Booking & Orders</h1>
        <v-spacer></v-spacer>
        <v-btn color="primary" prepend-icon="mdi-plus">New Booking</v-btn>
      </v-col>
    </v-row>

    <v-card>
      <v-tabs
        v-model="tab"
        bg-color="transparent"
        color="primary"
        grow
      >
        <v-tab value="bookings">
          <v-icon start>mdi-calendar-check</v-icon>
          Bookings
        </v-tab>
        <v-tab value="orders">
          <v-icon start>mdi-camera-timer</v-icon>
          Active Orders
        </v-tab>
      </v-tabs>

      <v-window v-model="tab">
        <v-window-item value="bookings">
          <BookingList />
        </v-window-item>
        
        <v-window-item value="orders">
          <OrderList />
        </v-window-item>
      </v-window>
    </v-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const tab = ref('bookings')
</script>
