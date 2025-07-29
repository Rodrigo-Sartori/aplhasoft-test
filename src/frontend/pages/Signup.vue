<template>
  <div class="signup-container">
    <h2>Create account</h2>
    <form @submit.prevent="signup">
      <input v-model="name" type="text" placeholder="Name" required />
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">Register</button>
    </form>
    <p>Already signed up? <router-link to="/">Back to login Screen</router-link></p>
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
        await axios.post(`/api/auth/register`, {
          name: name.value,
          email: email.value,
          password: password.value,
        });

        alert('Account created sucessfuly!');
        router.push('/');
      } catch (err) {
        console.error('Register error:', err);
        alert('Was not possible to create the account');
      }
    };

    return { name, email, password, signup };
  },
});
</script>

<style scoped>
.signup-container {
  max-width: 400px;
  margin: 3rem auto;
  padding: 2rem;
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  text-align: center;
}

h2 {
  margin-bottom: 1.5rem;
  font-size: 1.6rem;
  color: #333;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

input[type="text"],
input[type="email"],
input[type="password"] {
  padding: 0.75rem 1rem;
  border-radius: 10px;
  border: 1px solid #ccc;
  font-size: 1rem;
  transition: border-color 0.2s ease;
}

input:focus {
  border-color: #28a745;
  outline: none;
}

button[type="submit"] {
  padding: 0.75rem;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button[type="submit"]:hover {
  background-color: #218838;
}

p {
  margin-top: 1rem;
  color: #555;
  font-size: 0.95rem;
}

a {
  color: #28a745;
  text-decoration: none;
  font-weight: bold;
}

a:hover {
  text-decoration: underline;
}
</style>
