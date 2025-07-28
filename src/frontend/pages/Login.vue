<template>
  <div class="login-container">
    <h2>Login</h2>
    <form @submit.prevent="login">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Senha" required />
      <button type="submit">Entrar</button>
    </form>
    <p>Não tem conta? <router-link to="/signup">Criar Conta</router-link></p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const email = ref('');
    const password = ref('');
    const router = useRouter();

    const login = async () => {
      try {
        const res = 
        await axios.post('http://localhost:3000/api/auth/login', {
          email: email.value,
          password: password.value,
        });

        localStorage.setItem('token', res.data.token);
        router.push('/agenda');
      } catch (err) {
        console.error('Erro no login:', err);
        alert('Login inválido');
      }
    };

    return { email, password, login };
  },
});
</script>

<style scoped>
.login-container {
  padding: 2rem;
}
input {
  display: block;
  margin-bottom: 1rem;
}
</style>
