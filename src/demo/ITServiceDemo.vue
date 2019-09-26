<template>
  <wh-app>
    <TopBar @drawerclick="draweropen = !draweropen" />
    <wh-content>
      <Sidedrawer v-model="draweropen" />
      <HelloWorld />
    </wh-content>
  </wh-app>
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