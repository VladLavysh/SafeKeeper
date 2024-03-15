<template>
  <ion-item
    v-if="item"
    :detail="false"
    button
    color="success"
    class="list-item"
    @click="openModal"
  >
    <ion-label>{{ item.name }}</ion-label>
  </ion-item>
</template>

<script setup lang="ts">
import { IonItem, IonLabel } from '@ionic/vue'

const { item } = defineProps({
  item: Object,
})
const emit = defineEmits(['openModal'])

const openModal = () => {
  emit('openModal', item?.id)
}
</script>

<style scoped>
ion-label {
  text-align: center;
}
.list-item {
  width: calc(100% / 3 - 7px);
  --border-radius: 10px;
}
</style>
