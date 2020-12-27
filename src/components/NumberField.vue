<template>
  <li :class="{ ball: true, 'ball--secondary': isSecondary }">
    <p class="ball__number">{{ number }}</p>
  </li>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export const NumberField = defineComponent({
  name: "NumberField",
  props: {
    number: String,
    isSecondary: { type: Boolean, default: false }
  }
});

export default NumberField;
</script>

<style scoped lang="scss">
.ball {
  margin: 5px;
  display: flex;
  justify-content: center;
  align-items: center;

  height: 40px;
  width: 40px;
  border-radius: 20px;

  background: radial-gradient(
    circle at 65% 15%,
    white 1px,
    $number-ball-color 3%,
    darken($number-ball-color, 12) 60%,
    $number-ball-color 100%
  );

  @include respond-to("small") {
    height: 60px;
    width: 60px;
    border-radius: 30px;
  }
}

.ball__number {
  font-size: 14px;
  font-weight: 900;
  color: $number-ball-text-color;

  @include respond-to("small") {
    font-size: 20px;
  }
}

.ball--secondary {
  background: radial-gradient(
    circle at 65% 15%,
    white 1px,
    $secondary-ball-color 3%,
    darken($secondary-ball-color, 12) 60%,
    $secondary-ball-color 100%
  );

  & .ball__number {
    color: $secondary-ball-text-color;
  }
}
</style>
