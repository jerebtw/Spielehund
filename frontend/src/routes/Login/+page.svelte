<script lang="ts">
  import { currentUser, pb } from "src/utils/pocketbase";
  import { Input, Label, Button } from 'flowbite-svelte';

  let password: string;
  let email: string;

  async function login() {
    const user = await pb.collection('users').authWithPassword(email, password);
    console.log(user)
    location.href="/"
  }

</script>

  <form on:submit|preventDefault>
    <div class="mb-6">
      <Label for="email" class="mb-2">Email Adresse</Label>
      <Input type="email" id="email" placeholder="ben.dover@company.com" required bind:value={email} />
    </div>
    <div class="mb-6">
      <Label for="password" class="mb-2">Passwort</Label>
      <Input type="password" id="password" placeholder="•••••••••" required bind:value={password} />
    </div>
    <Button on:click={login}>Login</Button>
    <Button href="SignUp">Sign Up</Button>
  </form>