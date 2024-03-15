<template>
  <div v-if="item">
      <ion-header>
        <ion-toolbar>
          <ion-label>
            {{  item.name.trim() || 'New Element' }}
          </ion-label>
          <ion-buttons slot="end">
            <ion-button color="medium" @click="cancel">
              <ion-icon :icon="closeOutline" />
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <div class="element-form">
          <ion-list>
            <ion-item>
              <ion-input
                v-model="item.name"
                label="Name"
                label-placement="floating"
                color="secondary"
                type="text"
                placeholder="..."
                :maxlength="15"
                @ionInput="changeIsEdited"
              />
            </ion-item>
            <ion-item>
              <ion-input
                v-model="item.login"
                label="Login"
                label-placement="floating"
                color="secondary"
                type="text"
                placeholder="..."
                :maxlength="30"
                @ionInput="changeIsEdited"
              >
                <ion-button
                  class="copy-btn"
                  color="success"
                  :disabled="!item.login.trim()"
                  @click="copyToClipboard(item.login)"
                >
                  <ion-icon :icon="copyOutline" />
                </ion-button>
              </ion-input>
            </ion-item>
            <ion-item>
              <ion-input
                v-model="item.password"
                label="Password"
                label-placement="floating"
                color="secondary"
                type="text"
                placeholder="..."
                :maxlength="30"
                @ionInput="changeIsEdited"
              >
                <ion-button
                  class="copy-btn"
                  color="success"
                  :disabled="!item.password.trim()"
                  @click="copyToClipboard(item.password)"
                >
                  <ion-icon :icon="copyOutline" />
                </ion-button>
              </ion-input>
            </ion-item>
            <ion-item>
              <ion-textarea
                v-model="item.notes"
                label="Notes (optional)"
                label-placement="floating"
                helper-text="Enter valid data"
                placeholder="..."
                :maxlength="100"
                @ionInput="changeIsEdited"
              />
            </ion-item>
          </ion-list>
          <div class="action-buttons">
            <ion-button v-if="itemId" color="warning" @click="remove">
              Delete
            </ion-button>
            <ion-button color="success" @click="save" :disabled="!isEdited">
              {{ itemId ? 'Update' : 'Create' }}
            </ion-button>
          </div>
        </div>
      </ion-content>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  IonHeader,
  IonToolbar,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonButtons,
  IonButton,
  IonIcon,
  IonInput,
  IonTextarea,
  modalController,
  alertController
} from '@ionic/vue'
import { closeOutline, copyOutline } from 'ionicons/icons'
import { useItemsStore } from '@/stores/itemsStore'
import presentToast from '@/composables/presentToast'
import { Item } from '@/types/item'

const { itemId } = defineProps({
  itemId: String,
})

const { getItem } = useItemsStore()

const newItem: Item = {
  id: '',
  name: '',
  login: '',
  password: '',
  notes: '',
}
const item = ref<Item>(itemId ? getItem(itemId) : newItem)
const isEdited = ref<boolean>(false)

const isValid = computed(() => {
  return item.value.name.trim() && item.value.login.trim() && item.value.password.trim()
})

const changeIsEdited = () => {
  if (!isEdited.value) isEdited.value = true
}
const copyToClipboard = (data: string) => {
  navigator.clipboard.writeText(data)
  presentToast('Password copied to clipboard', 'copy')
}
const cancel = () => {
  modalController.dismiss(null, 'cancel')
}
const remove = async () => {
  const alert = await alertController.create({
    header: 'Are you sure?',
    buttons: ['Cancel', 'Delete'],
  })

  await alert.present()
  const { role } = await alert.onWillDismiss()
  if (role === 'cancel') return

  modalController.dismiss(item, 'delete')
}
const save = () => {
  if (!isValid.value) {
    presentToast('Please fill all required fields', 'alert')
    return
  }
  modalController.dismiss(item, itemId ? 'update' : 'create')
}
</script>

<style scoped>
ion-content {
  height: 100vh;
}
ion-label {
  margin-left: 15px;
}
.element-form {
  margin: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.copy-btn {
  position: absolute;
  right: 0px;
  bottom: 0;
  z-index: 999;
}
.action-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}
.action-buttons ion-button {
  width: 100%;
}
</style>
