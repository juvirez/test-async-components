<template>
  <div class="jjjj">
   juvs test
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    msg: String,
  },
});
</script>

<style scoped lang="scss">
h3 {
  margin: 33px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 3px;
}
.jjjj {
  color: #333;
}
</style>
