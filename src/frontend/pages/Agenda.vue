<template>
  <div class="contacts">
    <h1>Contatos</h1>
            <router-link :to="`/contact`">Adicionar Contato</router-link>
    <div class="contact-list">
      <div
        class="contact-card"
        v-for="contact in contacts"
        :key="contact.id"
      >
        <img
          class="contact-image"
          :src="getImageUrl(contact.picture)"
          alt="Foto"
        />
        <div class="contact-info">
          <h3>{{ contact.name }}</h3>
          <p>Email: {{ contact.email }}</p>
          <p>Contato: {{ contact.contact }}</p>
        </div>
        <router-link :to="`/contact/${contact.id}`">Editar</router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import axios from 'axios';

interface Contact {
  id: number;
  name: string;
  email: string;
  contact: string;
  picture: ArrayBuffer;
}

export default defineComponent({
  name: 'Contacts',
  setup() {
    const contacts = ref<Contact[]>([]);

    const fetchContacts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/contacts', {
        });
        contacts.value = response.data;
      } catch (error) {
        console.error('Erro ao buscar contatos', error);
      }
    };

    const getImageUrl = (base64: string): string => {
      if (!base64) return '';
      return `data:image/jpeg;base64,${base64}`;
    };

    onMounted(fetchContacts);

    return {
      contacts,
      getImageUrl
    };
  }
});
</script>

<style scoped>
.contacts {
  padding: 2rem;
}

.contact-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.contact-card {
  display: flex;
  align-items: center;
  width: 300px;
  padding: 1rem;
  background: #f2f2f2;
  border-radius: 8px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1);
}

.contact-image {
  width: 64px;
  height: 64px;
  object-fit: cover;
  border-radius: 50%;
  margin-right: 1rem;
}

.contact-info {
  display: flex;
  flex-direction: column;
}
</style>
