<template>
  <div>
    <v-row>
      <v-col cols="12" md="4">
        <v-card color="primary" theme="dark">
          <v-card-title>Total Orders</v-card-title>
          <v-card-text class="text-h3">124</v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card color="success" theme="dark">
          <v-card-title>Revenue</v-card-title>
          <v-card-text class="text-h3">Rp 15.000k</v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card color="warning" theme="dark">
          <v-card-title>Pending Editing</v-card-title>
          <v-card-text class="text-h3">12</v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-4">
      <v-col cols="12">
        <v-card>
          <v-card-title>Welcome to Ku-OS Studio</v-card-title>
          <v-card-text>
            Frontend has been successfully powered by Nuxt 3 and Vuetify 3! Next step is connecting to our Laravel Backend API.
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" variant="flat">Explore Bookings</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
</script>
