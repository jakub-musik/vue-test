<template>
  <div class="results">
    <h1 class="results__title">Latest results</h1>
    <div v-if="!isReady"><Loader /></div>
    <div v-else-if="isError">
      There was an error while loading the results. Please try again later.
    </div>
    <ul v-else class="results__list">
      <NumberField :key="number" :number="number" v-for="number in numbers" />
      <NumberField
        :isSecondary="true"
        :key="number"
        :number="number"
        v-for="number in additionalNumbers"
      />
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ActionTypes } from "@/store/actions";
import { NumberField } from "@/components/NumberField.vue";
import { Loader } from "@/components/Loader.vue";
import { LoadingStateEnum } from "@/shared/loading-state.enum";

export const Results = defineComponent({
  name: "Results",
  components: {
    NumberField,
    Loader
  },
  data() {
    return {
      data: []
    };
  },
  computed: {
    loadingState() {
      return this.$store.state.eurojackpot.loadingState;
    },
    numbers() {
      return this.$store.state.eurojackpot.numbers;
    },
    additionalNumbers() {
      return this.$store.state.eurojackpot.additionalNumbers;
    },
    isReady() {
      return (
        this.$store.state.eurojackpot.loadingState === LoadingStateEnum.loaded
      );
    },
    isError() {
      return (
        this.$store.state.eurojackpot.loadingState === LoadingStateEnum.failed
      );
    }
  },
  created() {
    this.$store.dispatch(ActionTypes.fetchEurojackpot, undefined);
  }
});

export default Results;
</script>

<style scoped lang="scss">
.results__list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}
.results__title {
  font-size: 32px;
  margin-bottom: 32px;
}
.results {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
