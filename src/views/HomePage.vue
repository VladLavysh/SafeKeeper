<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-searchbar
        v-model="searchItem"
        class="ion-padding-top ion-padding-bottom"
        placeholder="Find Element"
        autocapitalize="off"
        :debounce="500"
        @ionInput="handleInput($event)"
      />
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-refresher slot="fixed" @ionRefresh="refresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>

      <div class="wrapper">
        <ion-list v-if="results.length">
          <PasswordItem
            v-for="item in results"
            :key="item.id"
            :item="item"
            @openModal="openModal"
          />
        </ion-list>
        <ion-text v-else>
          <h4>No items found</h4>
        </ion-text>
      </div>
    </ion-content>

    <ion-fab slot="fixed" vertical="bottom" horizontal="end">
      <ion-fab-button color="light" @click="openModal(null)">
        <ion-icon :icon="addOutline"></ion-icon>
      </ion-fab-button>
    </ion-fab>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonSearchbar,
  IonFab,
  IonFabButton,
  IonIcon,
  IonText,
  modalController
} from '@ionic/vue'
import { addOutline } from 'ionicons/icons'
import { ref } from 'vue'
import { Item, Action } from '@/types/item'
import { useItemsStore } from '@/stores/itemsStore'
import presentToast from '@/composables/presentToast'
import PasswordItem from '@/components/PasswordItem.vue'
import ItemModal from '@/components/PasswordItemDetails.vue'

const { items, manageItem, getItems } = useItemsStore()
getItems()

const searchItem = ref<string>('')
const results = ref<Item[]>(items)

const handleInput = (event: CustomEvent) => {
  const target = event.target as HTMLInputElement
  const query = target.value?.toLowerCase()
  results.value = items.filter((el: Item) => el.name.toLowerCase().includes(query))
}

const openModal = async (id: string | null) => {
  const modal = await modalController.create({
      component: ItemModal,
      componentProps: {
        itemId: id
      }
    })
  modal.present()

  const { data, role } = await modal.onWillDismiss()
  if (role !== 'cancel') {
    manageItem({...data.value}, role as Action)
    presentToast(`Item ${role}d`, role as string)
  }
}

const refresh = (ev: CustomEvent) => {
  setTimeout(() => {
    ev.detail.complete()
  }, 3000)
}
</script>

<style scoped>
  .wrapper {
    height: 100%;
    padding-top: 10px;
    background-color: #1e1e1e;
  }
  ion-page {
    --background-color: #1e1e1e !important;
  }
  ion-text {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
  ion-list {
    display: flex;
    justify-content: start;
    flex-wrap: wrap;
    gap: 10px;
    padding: 15px 10px;
  }
</style>
