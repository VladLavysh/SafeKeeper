import { toastController } from '@ionic/vue'
import { saveOutline, createOutline, trashOutline, alertCircleOutline, clipboardOutline } from 'ionicons/icons'

export default async (message: string, icon: string) => {
  const icons: { [key: string]: string } = {
    create: saveOutline,
    update: createOutline,
    delete: trashOutline,
    alert: alertCircleOutline,
    copy: clipboardOutline
  }

  const toast = await toastController.create({
    message,
    color: 'tertiary',
    duration: 1500,
    position: 'bottom',
    icon: icons[icon]
  })

  await toast.present()
}