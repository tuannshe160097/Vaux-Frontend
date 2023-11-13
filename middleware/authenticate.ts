import { Middleware } from '@nuxt/types'

const authenticate: Middleware = async ({ store, redirect, route }) => {

  let requiredRole
  if (route.meta != undefined) {
    requiredRole = route.meta[0]?.role
  }

  console.log('Lta: ', store.state['user-auth']['store-user'].user)
  
  // Đảm bảo requiredRole luôn là mảng
  if (requiredRole != null && !Array.isArray(requiredRole)) {
    debugger
    requiredRole = [requiredRole];
  }
  if (!store.$auth.loggedIn) {
    redirect('/authen/login');
  } else if (!store.state['user-auth']['store-user'].user) {
    const user = await store.dispatch('user-auth/store-user/actGetUserDetail')
  } else if (requiredRole != null && !(requiredRole.includes(store.state['user-auth']['store-user'].user.roleId))) {
    debugger
    redirect('/authen/login');
  }
}

export default authenticate
