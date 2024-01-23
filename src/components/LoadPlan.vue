<script lang="ts">

export default {
  name: 'LoadPlan',
  data() {
    return {
      planName: '',
      fileName: ''
    }
  },
  methods: {
    getFileName(e: Event) {
      this.fileName = (e.target as HTMLInputElement)?.files?.[0].name || ''
    },
    handleClose() {
      this.$emit('close-modal')
    },
    handleCreate(e: Event) {
      this.$emit('create-plan', new FormData(e.target as HTMLFormElement))
    },
  },
  mounted() {
    (this.$refs.nameRef as HTMLInputElement).focus()
  }
}
</script>

<template>
  <form id="load" v-click-outside="handleClose" @keydown.esc="handleClose" @submit.prevent="handleCreate"
    @keydown.enter="handleCreate">
    <button type="button" class="exit" @click="handleClose">
      <ExitIcon />
    </button>
    <h2 class="heading">Выбор новой схемы</h2>
    <input type="text" name="name" placeholder="Название схемы" class="wrap input" required v-model="planName"
      ref="nameRef">

    <label class="input-file">
      <input type="file" name="img" required @change="getFileName">
      <span class="input-file-btn button wrap">Выберите файл</span>
      <span class="input-file-text">{{ fileName || 'Файл не выбран' }}</span>
    </label>

    <button type="submit" class="wrap button">Загрузить схему</button>
  </form>
</template>

<style scope>
#load {
  position: absolute;
  padding: 50px 30px 30px;
  width: 490px;
  background-color: #fff;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 35px;
}

.exit {
  position: absolute;
  top: 5px;
  right: 5px;
  background-color: transparent;
  border: none;
}

.heading {
  font-size: 30px;
  font-weight: 600;
  color: var(--button-submit-bg-color);
}

.input-file {
  position: relative;
  display: inline-block;
  width: 100%;
}

.input {
  outline: none;
  width: 100%;
  border: 2px solid var(--button-submit-bg-color);
}

.wrap {
  font-size: 14px;
  border-radius: 20px;
  height: 40px;
  padding: 10px 20px;
}

.button {
  display: inline-block;
  color: #fff;
  background-color: var(--);
  border: none;
  cursor: pointer;
  text-align: center;
  width: 50%;
  transition: transform 0.5s;
}

.button[type="submit"] {
  background-color: var(--button-submit-bg-color);
  width: 100%;
}

.input-file-btn {
  position: relative;
}

.input-file-text {
  padding: 0 10px;
  line-height: 40px;
  display: inline-block;
  color: var(--button-submit-bg-color);
}

.input-file input[type=file] {
  position: absolute;
  z-index: -1;
  opacity: 0;
  display: block;
}

.button[type="submit"]:hover {
  background-color: var(--button-submit-bg-hover-color);
  transform: scale(1.03);
}

.input-file:hover .input-file-btn {
  background-color: var(--button-bg-hover-color);
  transform: scale(1.03);
}
</style>

