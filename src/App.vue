<script setup>
import { ref, computed, reactive, watch } from "vue";
const count = ref(0);
const isDark = ref(true);
const status = computed(() => (isDark.value ? "Dark Mode" : "Light Mode"));
const collaborators = reactive([
  { name: "ImAim" },
  { name: "Chinnaphat" },
  { name: "Your boyfriend" },
]);

watch(count, (newCount, oldCount) => {
  newCount = Number(newCount);
  if (isNaN(newCount)) {
    count.value = oldCount;
  } else {
    count.value = newCount > 9999 ? oldCount : newCount < 0 ? 0 : newCount;
  }
});
</script>

<template>
  <div
    :class="isDark ? 'bg-black' : 'bg-white'"
    class="flex flex-col justify-center items-center gap-16 h-screen"
  >
    <!-- Absolute position components -->
    <div class="absolute top-0 left-0 mt-12 ml-12 cursor-help">
      <h2
        v-if="isDark"
        class="text-2xl"
      >
        ในนี้มืดจังเลยนะฮะ
      </h2>
      <h2
        v-else
        class="text-5xl"
      >
        🏓
      </h2>
    </div>
    <div class="absolute top-0 right-0 mt-12 mr-12 flex flex-col gap-10">
      <!-- Toggle themes -->
      <div class="flex gap-5 items-center">
        <input
          v-model="isDark"
          type="checkbox"
          class="toggle"
        />
        <h2>{{ status }}</h2>
      </div>
      <!-- List of collaborators -->
      <div v-show="isDark">
        <ul>
          <li
            v-for="collaborator in collaborators"
            class="text-lg tracking-widest mb-2"
          >
            {{ collaborator.name }}
          </li>
        </ul>
      </div>
    </div>

    <!-- Counter -->
    <div class="flex justify-between items-center w-1/4">
      <button
        @click="count > 0 ? --count : 0"
        :class="isDark ? 'btn-outline' : ''"
        class="btn btn-error text-3xl"
      >
        -
      </button>
      <input
        v-model="count"
        :class="isDark ? 'text-white' : 'text-black'"
        class="text-5xl bg-transparent text-center w-1/2 focus:outline-none"
      />
      <button
        @click="count < 9999 ? ++count : 9999"
        :class="isDark ? 'btn-outline' : ''"
        class="btn btn-success text-3xl"
      >
        +
      </button>
    </div>
  </div>
</template>
