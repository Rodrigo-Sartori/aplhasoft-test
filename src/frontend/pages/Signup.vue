<template>
  <div class="signup-container">
    <h2>Criar Conta</h2>
    <form @submit.prevent="signup">
      <input v-model="name" type="text" placeholder="Nome" required />
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Senha" required />
      <button type="submit">Cadastrar</button>
    </form>
    <p>Já tem conta? <router-link to="/">Voltar para Login</router-link></p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const name = ref('');
    const email = ref('');
    const password = ref('');
    const router = useRouter();

    const signup = async () => {
      try {
        await axios.post('http://localhost:3000/api/auth/register', {
          name: name.value,
          email: email.value,
          password: password.value,
        });

        alert('Conta criada com sucesso!');
        router.push('/');
      } catch (err) {
        console.error('Erro no cadastro:', err);
        alert('Erro ao criar conta');
      }
    };

    return { name, email, password, signup };
  },
});
</script>

<style scoped>
.signup-container {
  padding: 2rem;
}
input {
  display: block;
  margin-bottom: 1rem;
}
</style>
