<template>
  <div class="form-page">
    <h1>{{ isEdit ? 'Editar Contato' : 'Novo Contato' }}</h1>
    <form @submit.prevent="handleSubmit" class="contact-form">
      <label>Nome:</label>
      <input v-model="contact.name" type="text" required />

      <label>Email:</label>
      <input v-model="contact.email" type="email" required />

      <label>Telefone:</label>
      <input v-model="contact.contact" type="text" required />

      <label>Foto:</label>
      <input type="file" @change="handleFile" />

      <button type="submit">{{ isEdit ? 'Atualizar' : 'Criar' }}</button>
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
      }
    };

    const fetchContact = async (id: string) => {
      try {
        const res = await axios.get(`http://localhost:3000/api/contacts/${id}`);
        contact.value = res.data;
        isEdit.value = true;
      } catch (err) {
        console.error('Erro ao buscar contato:', err);
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
          await axios.put(`http://localhost:3000/api/contacts/${contact.value.id}`, formData, {
            headers: {Authorization: `Bearer ${token}`}
          });
        } else {
          await axios.post('http://localhost:3000/api/contacts', formData,{
            headers: {Authorization: `Bearer ${token}`}
          });
        }
        router.push('/agenda');
      } catch (err) {
        console.error('Erro ao salvar contato:', err);
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
      handleSubmit
    };
  }
});
</script>

<style scoped>
.form-page {
  max-width: 500px;
  margin: auto;
  padding: 2rem;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

input,
button {
  padding: 0.5rem;
  font-size: 1rem;
}
</style>
