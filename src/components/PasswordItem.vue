<template>
  <ion-item
    v-if="item"
    :detail="false"
    button
    :color="getColor(item.group)"
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

const getColor = (group: string) => {
  switch (group) {
    case 'top':
      return 'success'
    case 'standard':
      return 'warning'
    case 'low':
      return 'tertiary'
    default:
      return 'primary'
  }
}

const openModal = () => {
  emit('openModal', item?.id)
}
</script>

<style scoped>
.item-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
ion-label {
  text-align: center;
}
.list-item {
  width: calc(100% / 3 - 7px);
  --border-radius: 10px;
}
</style>
