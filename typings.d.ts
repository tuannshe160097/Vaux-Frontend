import { ReCaptchaInstance } from "@nuxtjs/recaptcha"

declare const _: any

declare module '@nuxt/types' {
  interface Context {
    $recaptcha: ReCaptchaInstance
  }
}
