import { Middleware } from '@nuxt/types'

const authenticate: Middleware = async ({ store, redirect, route }) => {
  const requiredRole = route.meta;
  console.log('Lta: ' , requiredRole)
  if (!store.$auth.loggedIn) {
    redirect('/authen/login');
  } else if (!store.state['user-auth']['store-user'].user) {
    const user  = await store.dispatch('user-auth/store-user/actGetUserDetail')
  }
}

export default authenticate
