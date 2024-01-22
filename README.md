# counter-app

## Setting up `Vue3` + `Tailwind` + `DaisyUI` project

### 1) Vue3

```
npm create vue@latest
```

#### For the first project of `INT203`, choose `No` for every optional features

```
✔ Project name: … <your-project-name>
✔ Add TypeScript? … (No) / Yes
✔ Add JSX Support? … (No) / Yes
✔ Add Vue Router for Single Page Application development? … (No) / Yes
✔ Add Pinia for state management? … (No) / Yes
✔ Add Vitest for Unit testing? … (No) / Yes
✔ Add an End-to-End Testing Solution? … (No) / Cypress / Playwright
✔ Add ESLint for code quality? … (No) / Yes
```

#### Go to your project path, and install the dependencies

```
$ cd <your-project-name>
$ npm install
```

#### Ref. from Vue.js Documentation: https://vuejs.org/guide/quick-start.html

---

### 2) Tailwind

- ### Install Tailwind CSS

`!!!` Check your current path that is on the root (your-project-name)

```
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

#### Then looking for `tailwind.config.js` and `postcss.config.js`

- ### Configure your template paths

Add the paths to all of your template files in your **tailwind.config.js** file.

```js
/** @type {import("tailwindcss").Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

- ### Add the Tailwind directives to your CSS

```css
/* your css file which is imported on main.js */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

### 3) DaisyUI

- ### Install daisyUI

```
npm i -D daisyui@latest
```

- ### Add daisyUI to your tailwind.config.js files

```js
plugins: [require("daisyui")],
```

---

## Guide For Essentials

### เริ่มต้นจาก `Component` กันก่อน

Component คือ 1 ใน core concept ของ vue

> เป็นการแบ่งส่วนเว็บออกเป็นชิ้นเล็ก ๆ ที่รวม html, css และ javascript เอาไว้ในก้อนเดียวกัน นั่นคือ

- template (html)
- script (javascript logic)
- style (css styling)

### จุดเริ่มต้นของ Vue Application = Root component

App.vue คือส่วนที่เป็น Root component ที่เป็นจุดเริ่มต้นของ Application

```
├─ index.html
├─ package.json
├─ public
├─ src
│   ├─ App.vue <-- (root component)
│   ├─ assets
│   ├─ components
│   ├─ main.js
│   ├─ style.css
├─ vite.config.js
```

ถ้าเราดู `main.js` (ซึ่งเป็นจุดเริ่มต้นของ javascript) มันจะมีคำสั่งเริ่มต้น application อยู่คือ `createApp`

```js
import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

createApp(App).mount("#app");
```

- `createApp` คือจุดเริ่มต้นในการสร้าง vue application
- component ที่ใส่ไปใน `createApp = Root component`
- application จะไม่สามารถเกิดขึ้นได้หากไม่เกิดการ mount เข้า HTML DOM จริง ๆ = ซึ่งนั่นก็คือ `<div id="app"></div>`
- `.mount("#app")` คือการนำ javascript (ที่เขียนด้วย Vue component) ใส่กลับเข้าไปใน DOM html เพื่อให้สามารถ render จุดเริ่มต้นของ application ได้

### พื้นฐานของ Component ประกอบด้วย

### 1) Template Syntax

Component ประกอบด้วย 3 ส่วน

```js
<script>
/* ส่วนสำหรับวาง script ของ Vue*/
</script>

<template>
<!-- ส่วนสำหรับวาง html ของ vue-->
</template>

<style>
/* สำหรับใส่ style ของ component */
</style>
```

> Document นี้จะ **ไม่อธิบายในส่วนของ Basic HTML, CSS, JavaScript รวมถึง CSS framework อื่น ๆ** และจะอธิบายการใช้ Vue แบบคร่าว ๆ เพื่อให้เห็นภาพรวมเท่านั้น

- ### Text Interpolation

```js
<script setup>
const message = "Hello world";
</script>

<template>
  <div>{{ message }}</div>
</template>
```

เราจะเห็นได้ว่าตัวแปร `message` ที่ถูกประกาศไว้ใน script tag สามารถถูกใช้เพื่อแสดงออกมาเป็น text ภายใน HTML tag ได้โดยการใส่ใน `{{ }}` "Mustache" syntax (double curly braces)

- ### Attribute Bindings

```js
<div id={{ dynamicId }}></div> ❌

<div v-bind:id="dynamicId"></div> ✅
<div :id="dynamicId"></div> ✅
```

เราสามารถผูกค่าของตัวแปรไว้กับ HTML attributes แต่ `ไม่สามารถใช้ "Mustache" หรือ {{  }}` ได้ ในกรณีนี้เราต้องใช้ `v-bind:` หรือ `:` (shorthand) ไว้หน้า attribute

> การใช้ `Mustache` หรือ `Binding` ไม่จำเป็นต้องใช้กับตัวแปร ขอแค่เป็น expression (return ค่าบางอย่างกลับมา) ก็สามารถใช้ได้

```js
{{ number + 1 }}

{{ ok ? "YES" : "NO" }}

{{ message.split(").reverse().join(") }}

<div :id="`list-${id}`"></div>
```

- ### More of Built-in Directives

#### 1. `v-show` [Conditional Rendering]

ทำให้ element นั้น `ถูกแสดง` โดยดูจากค่าที่รับเข้ามาว่าเป็น true `(truthy value)` หรือไม่ ถ้าค่าที่ได้รับเป็น false `(falsy value)` จะทำให้ element นั้นถูกกำหนด style เป็น `display: none;` (ยังคงถูก render ใน DOM)

```js
<script setup>
const message = "Hello world";
const isHidden = true;
</script>

<template>
  <div v-show="!isHidden">{{ message }}</div>
</template>
```

#### 2. `v-if`, `v-if-else`, `v-else` [Conditional Rendering]

สำหรับ v-if จะทำงานคล้ายกับ v-show โดยใช้เงื่อนไขการแสดงผลจาก truthy value แต่ถ้าหากเป็น falsy value จะทำให้ element นั้น `ไม่ถูก render ใน DOM`

v-if-else `เหมือนกับ v-if` ซึ่งจำเป็นต้องใช้ต่อจาก element ที่มี v-if หรือ v-if-else

v-else `ไม่จำเป็นต้องรับค่าใด ๆ` และเช่นเดิม จะต้องมี sibling element ก่อนหน้าที่ใช้ v-if หรือ v-if-else (ห้ามมี sibling element ที่ไม่ใช้มาคั่นกลาง)

```js
<script setup>
  const type = "D";
</script>

<template>
  <div v-if="type === "A"">
    A
  </div>
  <div v-else-if="type === "B"">
    B
  </div>
  <div v-else-if="type === "C"">
    C
  </div>
  <div v-else>
    Not A/B/C
  </div>
</template>
```

#### 3. `v-for` [List Rendering]

ใช้ในการ loop element (render ซํ้า) สามารถรับข้อมูลเป็น Data type ได้ตามนี้

`Array | Object | number | string | Iterable`

หลักการทำงานคล้ายกับ **forEach()**

```js
<script setup>
  const items = [
    { name: "🍎", price: 10 },
    { name: "🍌", price: 20 },
    { name: "🍇", price: 30 },
    { name: "🍉", price: 40 },
    { name: "🍊", price: 50 },
    { name: "🍋", price: 60 },
    { name: "🍍", price: 70 },
  ];
</script>

<template>
  <!-- Array -->
  <div v-for="item in items">
    <!-- Object -->
    <div v-for="(value, key) in item">
      {{ key }}: {{ value }}
    </div>
  </div>

  <!-- Array, Object with index -->
  <div v-for="(item, index) in items">
    Element {{ index }} => {{ item }}
    <div v-for="(value, key, index) in item">
      Object at key {{ index }} = {{ key }}: {{ value }}
    </div>
  </div>

  <!-- number, string -->
  <div v-for="digit in 9">
    {{ digit * 10 }}
  </div>
  <div v-for="char in "word"">
    {{ char }}
  </div>

</template>
```

#### 3.1 `v-for` with `v-if`

> **! ไม่ควรใช้ 2 ตัวนี้บน element เดียวกัน** ในกรณีที่ใช้ alias (ตัวที่ถูกประกาศใน v-for) ใน v-if เพราะ `v-if จะถูกอ่านก่อนเสมอ` (higher priority)

```js
<!-- ให้ todos เป็น array ของ object -->
<li v-for="todo in todos" v-if="!todo.isComplete">
  {{ todo.name }}
</li>
```

#### 4. `v-on` [Event Handling]

**วิธีการเทียบ Event ใน Javascript ปกติกับ Vue Event**

- `onclick="functionName()"` ใน javascript
- มีค่าเทียบเท่ากับ `v-on:click="functionName()"`
- หรือเทียบเท่ากับ `@click="functionName()"`

Binding event มีทั้งหมด 2 ประเภทคือ

1. Inline handler
2. Method handler

```js
<script setup>
  const count = 0;

  const log = (msg) => {
    console.log(msg)
  }
</script>

<template>
  <!-- Inline -->
  <button @click="++count"></button>
  <!-- Method -->
  <input @keyup.enter="log(`count = ${count}`)">
</template>
```

#### 5. `v-model` [Form Input Bindings]

ใช้ในการผูกค่า (value) ของ `input`, `select`, `textarea` ไว้กับตัวแปร หมายความว่า **ถ้าค่าใน form เปลี่ยน ค่าของตัวแปรที่ถูกผูกไว้ก็จะเปลี่ยนตาม**

```js
<script setup>
  const text = "";
</script>

<template>
  <!-- Not using v-model -->
  <input
  :value="text"
  @input="event => text = event.target.value">

  <!-- Using v-model -->
  <input v-model="text">
</template>
```

**แต่ถึงค่าใน form จะถูกผูกไว้กับตัวแปร ก็ไม่ได้ทำให้ค่าที่แสดงผลผ่าน DOM เปลี่ยนตาม**

```js
<script setup>
  const count = 0;
</script>

<template>
  <div
  @click="console.log(++count)"
  v-model="count">
    {{ count }}
  </div>
</template>
```

### ซึ่งในบทถัดไป เราจะมาแก้ปัญหานี้กัน

---

**Modifiers** `หัวข้อเสริมที่รู้ไว้ก็ดี`

Modifier ใช้เพื่อระบุว่า directive (v-on และ v-model สามารถใช้ได้) ตัวนั้น จะมีลักษณะการทำงานอะไรเพิ่มขึ้น

- `@click.stop` - ใช้เรียก `event.stopPropagation()` ใน click event
- `@submit.prevent` - ใช้เรียก `event.preventDefault()` ใน submit event
- `v-model.trim` - trim ข้อความที่ได้รับมาโดยอัตโนมัติ

---

### 2) Reactivity Fundamentals

#### ทำความรู้จักกับ `Reactive`

> Reactive คือคุณสมบัติที่มี **การตรวจสอบการเปลี่ยนแปลง (change) ของ state** และสามารถ **update DOM ได้อัตโนมัติ เมื่อมี change** โดยที่ไม่ต้องใช้คำสั่งอย่าง .innerHTML หรือคอย update ตัวแปรกลับ

สรุปโดยย่อคือ `ความสามารถในการจัดการกับ view ใน DOM ได้อย่างอัตโนมัติ`

#### 1. รู้จักกับ `Ref`

- `ref()` คือคำสั่งที่เปลี่ยนตัวแปรที่รับให้กลายเป็น **ตัวแปรแบบ reactive**
- **argument** ที่ใส่ใน `ref()` คือค่าเริ่มต้นของตัวแปร และ `.value` คือ **วิธีดึงค่าและ update** กลับไปผ่านตัวแปร reactive ได้

```js
<script setup>
  // ต้อง import ผ่าน vue ก่อนนำมาใช้
  import { ref } from "vue";

  const count = ref(0);
</script>

<template>
  <button @click="++count.value">
    {{ count }}
  </button>
</template>
```

**จะสังเกตเห็นว่า `{{ count }}` ที่อยู่ใน DOM มีการเปลี่ยนแปลงแล้ว**

#### 2. รู้จักกับ `Reactive`

ใช้กับเคสที่เป็น object สามารถแปลง object ออกมาได้เลย ถ้าใช้ `ref()` **มันจะต้อง .value เสมอ** แต่ถ้าใช้ `reactive()` **จะดึง object ออกมาได้เลย**

```js
<script setup>
  // ต้อง import ผ่าน vue ก่อนนำมาใช้
  import { reactive } from "vue";

  const state = reactive({ count: 0 });
</script>

<template>
  <button @click="++state.count">
    {{ state.count }}
  </button>
</template>
```

#### 3. มาลองใช้ `Reactive กับ v-model`

การทำ Form Input Binding เพื่อให้สิ่งที่แสดงผลใน UI **เปลี่ยนแปลงไปตามตัวแปรที่เกี่ยวข้องหรือถูกผูกอยู่กับ v-model ภายใน form** นั่นเอง (เรียกสิ่งนี้ว่า Reactivity)

```js
<script setup>
  // ต้อง import ผ่าน vue ก่อนนำมาใช้
  import { ref } from "vue";

  const name = ref("");
</script>

<template>
  <div>{{ name }}</div>
  <input v-model="name">
</template>
```

---

### 3) Computed Properties

#### ทำความรู้จักกับ `computed properties`

> computed properties คือ **การใส่ logic** บางอย่างเพื่อไป **ทำงานกับตัวแปร reactive** แล้ว **return ผลลัพธ์กลับไป**

`!!ข้อที่ควรรู้คือ computed() จะเรียกใช้ตัวแปรหลัก (reactive variable ที่ถูกเรียกใช้ข้างใน) ทุกครั้งที่ตัวแปรเหล่านั้นมีการเปลี่ยนแปลง`

```js
<script setup>
  import { ref, computed } from "vue";
  const firstName = ref("");
  const lastName = ref("");
  const fullName = computed(() => {
    return `${firstName.value} ${lastName.value}`
  });
</script>

<template>
  <div>
    <div>Your fullname: {{ fullName }}</div>
    <div>
      Firstname <input type="text" v-model="firstName">
    </div>
    <div>
      Lastname <input type="text" v-model="lastName">
    </div>
  </div>
</template>
```

### `computed vs method`

- ถ้าตัวแปรที่ computed เรียกใช้ยังไม่เกิดการเปลี่ยนแปลง แล้วเกิดการ re-render มันจะ `ดึงค่าล่าสุดมาใช้` ได้เลย **(caching)**
- ตัว method ที่ถูกประกาศไว้ใน template จะ `ถูกเรียกใช้งานทุกครั้ง` ที่มีการ re-render

---

### 4) Watchers (watch, watchEffect)

#### ทำความรู้จักกับ `wathcher`

> สิ่งที่ computed ทำได้ watcher ก็สามารถทำได้เกือบทั้งหมด แต่ถ้าเราจะจัดการ state schanges อย่างอื่นเพิ่มเติม เช่น การจัดการส่วนต่าง ๆ ใน DOM, การส่งค่าผ่าน API เป็นต้น

#### 1. รู้จักกับ `watch`

argument ตัวแรก ของ watch() **ต้องมาจาก reactive** คือ
`ref()`, `reactive()`, `computed()`, `getter function [() => reactive value]`, `array ของ reactive`

```js
<script setup>
  import { ref, watch } from "vue";
  
  const x = ref(0);
  const y = ref(0);

  // single ref
  watch(x, (newX) => {
    console.log(`x is ${newX}`)
  });

  // getter
  watch(
    () => x.value + y.value,
    (sum) => {
      console.log(`sum of x + y is: ${sum}`)
    }
  );

  // array of multiple sources
  watch([x, () => y.value], ([newX, newY]) => {
    console.log(`x is ${newX} and y is ${newY}`)
  });
</script>

<template>
  <div>
    x: <input v-model.number="x">
    y: <input v-model.number="y">
  </div>
  <div>x = {{ x }}</div>
  <div>y = {{ y }}</div>
</template>
```

- ถ้าเป็น `computed()` เราจะใช้ตัวแปร computed ในการจัดการเลย
- แต่ถ้าเป็น `watch()` เราแค่ดักจับการเปลี่ยนแปลง (change) ของตัวแปรนั้น เพื่อไปทำสิ่งอื่นแทน

#### 1.1 เมื่อใช้ getter function กับ reactive() ให้ใส่ `{ deep: true }` ใน argument ท้ายสุด

#### 1.2 ถ้าหากอยากให้ callback ใน watch ทำงานก่อนที่จะเกิด change ในครั้งแรก ให้เพิ่ม property `immediate: true` ใน argument ตัวสุดท้าย

```js
const user = reactive({id: 0, name: ""});

watch(
  () => user,
  (updatedUser) => {
    console.log(updatedUser.id, updatedUser.name);
  },
  { deep: true, immediate: true }
);
```

#### 2. รู้จักกับ `watchEffect`

`watchEffect()` ไม่จำเป็นต้องใส่ reactive source เข้าไปเป็น argument **สามารถใส่ callback function ได้เลย** เพราะ watchEffect จะดักจับการเปลี่ยนแปลง (change) ของ **reactive variable ทุกตัวใน fucntion และจะทำงานทันทีในครั้งแรก** (คุณสมบัติเดียวกับ `{ immediate: true }` ใน watch)

```js
const user = reactive({id: 0, name: ""});

watchEffect(() => {
  console.log(`id: ${user.id}, name: ${name}`)
})
```

---

## ตัวอย่าง project ของ counter-app ใน `App.vue`

- ### ครอบคลุมเนื้อหา week 1 - 4 (รวมใน document นี้)
- ### เป็นแค่ mini project สามารถใช้เพื่อเป็นแบบเริ่มต้นในการเรียน Basic Vue ได้

- ### ปล. ลอง follow document แล้วก็ดูผลลัพธ์ตามไปด้วยนะ

---

## References

- ### https://vuejs.org/guide/introduction.html

- ### https://docs.mikelopster.dev/c/vue-firebase/intro

---

## More recommended resorces

- ### For techniques: https://www.youtube.com/@LearnVue
- ### For first-intermediate project: https://youtube.com/playlist?list=PLwZ0y9k-cYXCoEjmL9kpPplNrZVk-fp1z&si=wFiLGI8NiMIqjG-I
