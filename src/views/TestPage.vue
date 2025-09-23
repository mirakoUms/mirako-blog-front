<template>
  <div class="multi-select">
    <div class="selected-tags">
      <span v-for="(tag, index) in selected" :key="index" class="tag">
        {{ tag }}
        <button @click="removeTag(index)">x</button>
      </span>
    </div>

    <input
      type="text"
      v-model="search"
      @focus="show = true"
      placeholder="输入搜索..."
    />

    <ul v-if="show" class="dropdown">
      <li
        v-for="(option, i) in filteredOptions"
        :key="i"
        @click="selectTag(option)"
      >
        {{ option }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const options = ref(["Vue", "React", "Angular", "Svelte"]);
const selected = ref([]);
const search = ref("");
const show = ref(false);

const filteredOptions = computed(() =>
  options.value.filter(
    (o) => o.toLowerCase().includes(search.value.toLowerCase()) && !selected.value.includes(o)
  )
);

function selectTag(option) {
  selected.value.push(option);
  search.value = "";
  show.value = false;
}

function removeTag(index) {
  selected.value.splice(index, 1);
}
</script>

<style>
.multi-select { position: relative; width: 200px; }
.dropdown li { padding: 5px; cursor: pointer; }
.dropdown li:hover { background: #eee; }
</style>
