<script lang="ts">
  import { currentUser, pb } from "src/utils/pocketbase";
  import { Input, Label, Button } from 'flowbite-svelte';

  let username: string;
  let password: string;

  async function login() {
    const user = await pb.collection('users').authWithPassword(username, password);
    console.log(user)
  }

  async function signUp() {
    try {
      const data = {
        username,
        password,
        passwordConfirm: password,
        name: 'hi mom!',
      };
      const createdUser = await pb.collection('users').create(data);
      await login();
    } catch (err) {
      console.error(err)
    }
  }

  function signOut() {
    pb.authStore.clear();
  }

</script>

{#if $currentUser}
  <p>
    Signed in as {$currentUser.username} 
    <button on:click={signOut}>Sign Out</button>
  </p>
{:else}
  <form on:submit|preventDefault>
    <div class="mb-6">
      <Label for="email" class="mb-2">Email address</Label>
      <Input type="email" id="email" placeholder="john.doe@company.com" required bind:value={username} />
    </div>
    <div class="mb-6">
      <Label for="password" class="mb-2">Password</Label>
      <Input type="password" id="password" placeholder="•••••••••" required bind:value={password} />
    </div>
    <Button on:click={login}>Login</Button>
    <Button on:click={signUp}>Sign Up</Button>
  </form>
{/if}