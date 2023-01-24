<script lang="ts">

import { Input, Label, Button } from 'flowbite-svelte';

    let username: string;
    let password: string;
    let email: string;
    let passwordConfirm: string;

async function signUp() {
    if (password === passwordConfirm){
    try {
      const data = {
        username,
        password,
        email
      };
      const createdUser = await pb.collection('users').create(data);
      await login();
    } catch (err) {
      console.error(err)
    }
  } else {
    prompt("Das Passwort stimmt nicht überein")
  }
}

async function login() {
    const user = await pb.collection('users').authWithPassword(username, password);
    console.log(user)
  }
  
</script>

<form on:submit|preventDefault>
    <div class="mb-6">
      <Label for="username" class="mb-2">Nutzername</Label>
      <Input type="username" id="username" placeholder="BenDover69" required bind:value={username} />
    </div>
    <div class="mb-6">
      <Label for="email" class="mb-2">Email Adresse</Label>
      <Input type="email" id="email" placeholder="ben.dover@company.com" required bind:value={email} />
    </div>
    <div class="mb-6">
      <Label for="password" class="mb-2">Passwort</Label>
      <Input type="password" id="password" placeholder="•••••••••" required bind:value={password} />
    </div>
    <div class="mb-6">
      <Label for="password" class="mb-2">Passwort wiederholen</Label>
      <Input type="password" id="password" placeholder="•••••••••" required bind:value={passwordConfirm} />
    </div>
    <Button on:click={signUp}>Sign Up</Button>
  </form>