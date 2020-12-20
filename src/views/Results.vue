<template>
  <div>
    <h1>This is an results page</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { LoadingStateEnum } from "@/shared/loading-state.enum";
import { request, gql } from "graphql-request";

const query = gql`
  {
    draw(type: "superlotto", limit: 1) {
      draws {
        numbers
      }
    }
  }
`;

export default defineComponent({
  name: "Results",

  data() {
    return {
      loadingState: LoadingStateEnum.notStarted,
      data: []
    };
  },
  created() {
    request("https://www.lottohelden.de/graphql", query).then(data =>
      console.log(data)
    );

    this.loadingState = LoadingStateEnum.loading;

    console.log("created");
  }
});
</script>
