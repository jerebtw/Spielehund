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

<div class="px-[30%] py-[15%]">
  <form on:submit|preventDefault>
    <div class="mb-6">
      <Label for="email" class="mb-2">Email Adresse</Label>
      <Input type="email" id="email" placeholder="ben.dover@company.com" required bind:value={email} />
    </div>
    <div class="mb-6">
      <Label for="password" class="mb-2">Passwort</Label>
      <Input type="password" id="password" placeholder="•••••••••" required bind:value={password} />
    </div>
    <div class="w-[100%] flex justify-center gap-4">
      <Button color="purple" class="w-[15%]" on:click={login}>Login</Button>
      <Button color="purple" class="w-[15%]" href="SignUp">Sign Up</Button>
    </div>
  </form></div>