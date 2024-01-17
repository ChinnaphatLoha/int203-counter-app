<script setup>
import { ref } from 'vue'
const count = ref(0)
const isDark = ref(false)
const setDark = () => {
  isDark.value = !isDark.value
}
</script>

<template>
  <div
    class="w-full min-h-screen"
    :class="isDark ? 'bg-black' : 'bg-slate-50 '"
  >
    <header class="bg-blue-700 text-white">
      <section class="mx-auto p-4 flex flex-row items-center justify-between">
        <h1>
          <img src="./assets/sit-logo.png" class="h-16" />
        </h1>
        <nav class="flex gap-8">
          <a href="#counter" class="text-lg hover:opacity-80">Counter</a>
          <a href="#aboutus" class="text-lg hover:opacity-90">About us</a>
        </nav>
      </section>
    </header>
    <main>
      <section class="p-2">
        <div class="flex justify-end">
          <input
            @click="setDark"
            v-model="isDark"
            type="checkbox"
            class="toggle"
          />
        </div>
        <h1 class="heading">My First Counter Application</h1>
        <h1 class="text-slate-600">with Vue and Tailwind CSS Framework</h1>
      </section>
      <section id="counter" class="flex p-4 justify-center">
        <div class="inline-block w-80 bg-white shadow-md rounded-xl">
          <img src="./assets/counter.jpg" />
          <div class="flex gap-2 p-3 justify-center">
            <button
              @click="count <= 0 ? 1 : --count"
              class="bg-red-700 text-white px-3 py-2 rounded-lg"
            >
              -
            </button>
            <h1>Counter: <span v-text="count"></span></h1>
            <button
              @click="++count"
              class="bg-green-600 text-white px-3 py-2 rounded-lg"
            >
              +
            </button>
          </div>
        </div>
      </section>
    </main>
    <footer id="aboutus">
      <section class="p-4">
        <p class="flex text-xl italic justify-center text-slate-600">
          By Umaporn Supasitthmethee
        </p>
      </section>
    </footer>
  </div>
</template>

<style scoped></style>
