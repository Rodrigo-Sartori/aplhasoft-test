<template>
  <div class="form-page">
    <h1>{{ isEdit ? 'Editar Contato' : 'Novo Contato' }}</h1>
    <form @submit.prevent="handleSubmit" class="contact-form">
      <label>Name:</label>
      <input v-model="contact.name" type="text" required />

      <label>Email:</label>
      <input v-model="contact.email" type="email" required />

      <label>Contact phone:</label>
      <input v-model="contact.contact" type="text" required />

      <label>Picture:</label>
      <input type="file" @change="handleFile" />
      <img v-if="imagePreview" :src="imagePreview" alt="Imagem atual"
      style="max-height: 150px; margin-top: 10px; border-radius: 8px"
      />

      <button type="submit">{{ isEdit ? 'Update' : 'Create' }}</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';

interface Contact {
  id?: number;
  name: string;
  email: string;
  contact: string;
  picture?: string;
}

export default defineComponent({
  name: 'ContactForm',
  setup() {
    const route = useRoute();
    const router = useRouter();
    const isEdit = ref(false);
    const imagePreview = ref<string | null>(null);
    const contact = ref<Contact>({
      name: '',
      email: '',
      contact: ''
    });

    const file = ref<File | null>(null);

    const handleFile = (event: Event) => {
      const target = event.target as HTMLInputElement;
      if (target.files?.[0]) {
      file.value = target.files[0];
      imagePreview.value = URL.createObjectURL(file.value);
    }
};

    const fetchContact = async (id: string) => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`/api/contacts/${id}`,{
            headers: {Authorization: `Bearer ${token}`}
          });
        contact.value = res.data;
        if (res.data.picture) {
        imagePreview.value = res.data.picture.startsWith('data:')
        ? res.data.picture
        : `data:image/jpeg;base64,${res.data.picture}`;
        }
        isEdit.value = true;
      } catch (err) {
        console.error('Contact was not found:', err);
      }
    };

    const handleSubmit = async () => {
      const formData = new FormData();
      formData.append('name', contact.value.name);
      formData.append('email', contact.value.email);
      formData.append('contact', contact.value.contact);
      if (file.value) formData.append('picture', file.value);

      try {
        const token = localStorage.getItem('token');
        if (isEdit.value && contact.value.id) {
          await axios.put(`/api/contacts/${contact.value.id}`, formData, {
            headers: {Authorization: `Bearer ${token}`}
          });
        } else {
          await axios.post(`/api/contacts`, formData,{
            headers: {Authorization: `Bearer ${token}`}
          });
        }
        router.push('/agenda');
      } catch (err) {
        console.error('Contact was not found:', err);
      }
    };

    onMounted(() => {
      const id = route.params.id;
      if (id && typeof id === 'string') {
        fetchContact(id);
      }
    });

    return {
      contact,
      isEdit,
      handleFile,
      handleSubmit,
      imagePreview
    };
  }
});
</script>

<style scoped>
.form-page {
  max-width: 500px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
  color: #333;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

label {
  font-weight: 600;
  color: #555;
  margin-bottom: -0.4rem;
}

input[type='text'],
input[type='email'],
input[type='file'] {
  padding: 0.75rem 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s ease;
}

input[type='text']:focus,
input[type='email']:focus {
  border-color: #007bff;
  outline: none;
}

button[type='submit'] {
  margin-top: 1rem;
  padding: 0.75rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button[type='submit']:hover {
  background-color: #0056b3;
}
</style>
