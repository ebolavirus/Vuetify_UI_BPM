<template>
  <v-app>
    <v-content>
      <HelloWorld />
    </v-content>
    <Sidedrawer v-model="draweropen" />
    <TopBar @drawerclick="draweropen = !draweropen" />
  </v-app>
</template>

<script>
  import HelloWorld from './components/HelloWorld';
  import Sidedrawer from './components/Sidedrawer';
  import TopBar from './components/TopBar';

  export default {
    name: 'it-service-demo',
    components: {
      HelloWorld,
      Sidedrawer,
      TopBar
    },
    data: () => ({
      draweropen: true
    }),
  };
</script>