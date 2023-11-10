import { Middleware } from '@nuxt/types'

const interception: Middleware = ({ store, redirect }) => {
  if (store.$auth.loggedIn) {
    redirect('/');
  }
}

export default interception
