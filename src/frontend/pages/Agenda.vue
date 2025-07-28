<template>
  <div class="contacts">
    <h1>Contacts</h1>
      <router-link class="add-contact-btn" :to="`/contact`">Add Contact</router-link>
    <ul class="contact-list">
      <li
        class="contact-card"
        v-for="contact in contacts"
        :key="contact.id"
      >
        <div class="contact-main-info">
            <img
              class="contact-image"
              :src="getImageUrl(contact.picture)"
              alt="Foto"
            />
            <div class="contact-info">
              <h3>{{ contact.name }}</h3>
              <p>Email: {{ contact.email }}</p>
            </div>
        </div>
        <p>Contact: {{ contact.contact }}</p>
        <router-link class="edit-btn" :to="`/contact/${contact.id}`">Edit</router-link>
        <button class="delete-btn" @click="openModal(contact.id)">Delete</button>
      </li>
    </ul>
    <div v-if="showModal" class="modal-overlay">
      <div class="modal">
        <h2>Deseja deletar este contato?</h2>
        <div class="modal-actions">
          <button class="cancel" @click="closeModal">Cancelar</button>
          <button class="confirm" @click="confirmDelete">Deletar</button>
        </div>
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
     const showModal = ref(false);
     const selectedId = ref<number | null>(null);

    const fetchContacts = async () => {
      try {
        const response = await axios.get(`https://11cb8c901a3b.ngrok-free.app/api/contacts`, {
        });
        contacts.value = response.data;
      } catch (error) {
        console.error('Contacts were not found', error);
      }
    };
    
    const openModal = (id: number) => {
      selectedId.value = id;
      showModal.value = true;
    };

    const closeModal = () => {
      showModal.value = false;
      selectedId.value = null;
    };

    const confirmDelete = async () => {
      const token = localStorage.getItem('token');
      if (selectedId.value !== null) {
        await axios.delete(`https://11cb8c901a3b.ngrok-free.app/api/contacts/${selectedId.value}`,{
            headers: {Authorization: `Bearer ${token}`}
          });
        await fetchContacts();
        closeModal();
      }
    };

    const getImageUrl = (base64: string): string => {
      if (!base64) return '';
      return `data:image/jpeg;base64,${base64}`;
    };

    onMounted(fetchContacts);

    return {
      contacts,
      showModal,
      openModal,
      closeModal,
      confirmDelete,
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
  flex-direction: column;
  gap: 8px;
  width: 100%;
  max-width: 450px;
  padding: 1rem;
  background: #f2f2f2;
  border-radius: 16px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1);
}

.contact-main-info {
    display: flex;
    gap: 8px;
}

.contact-image {
  width: 48px;
  height: 48px;
  object-fit: cover;
  border-radius: 50%;
  margin-right: 1rem;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.modal {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  text-align: center;
  width: 300px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.modal-actions {
  margin-top: 1rem;
  display: flex;
  justify-content: space-around;
}

.modal .cancel {
  background: #ccc;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
}

.modal .confirm {
  background: red;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
}
.add-contact-btn {
  display: inline-block;
  background-color: #4CAF50;
  color: white;
  font-weight: 500;
  padding: 10px 20px;
  border-radius: 8px;
  text-decoration: none;
  margin-bottom: 1.5rem;
  transition: background-color 0.3s ease;
}

.add-contact-btn:hover {
  background-color: #45a049;
}

.edit-btn {
  background-color: #2196F3;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  text-decoration: none;
  text-align: center;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.3s ease;
}

.edit-btn:hover {
  background-color: #1976D2;
}
</style>
