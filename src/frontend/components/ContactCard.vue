<template>
  <div class="contact-card">
    <h3>{{ contact.name }}</h3>
    <p><strong>Email:</strong> {{ contact.email }}</p>
    <p><strong>Telefone:</strong> {{ contact.contact }}</p>
  </div>
</template>

<script setup>
defineProps({
  contact: Object
})
</script>

<style scoped>
.contact-card {
  border: 1px solid #ccc;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 8px;
}
</style>
