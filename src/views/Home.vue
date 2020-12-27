<template>
  <div class="home">
    <Welcome />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Welcome } from "@/components/Welcome.vue";

export const Home = defineComponent({
  name: "Home",
  components: {
    Welcome
  }
});

export default Home;
</script>
