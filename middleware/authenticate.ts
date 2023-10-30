import { Middleware } from '@nuxt/types'

const authenticate: Middleware = async ({ store, redirect }) => {
  if (!store.$auth.loggedIn) {
    redirect('/authen/login');
  } else if (!store.state['user-auth']['store-user'].user) {
    await store.dispatch('user-auth/store-user/actGetUserDetail')
  }
}

export default authenticate
