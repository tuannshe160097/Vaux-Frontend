import { Middleware } from '@nuxt/types'

const authenticate: Middleware = async ({ store, redirect, route }) => {

  let requiredRole
  let isPublic

  if (route.meta != undefined) {
    requiredRole = route.meta[0]?.role
    isPublic = route.meta[0]?.isPublic
  }

  // Đảm bảo requiredRole luôn là mảng
  if (requiredRole != null && !Array.isArray(requiredRole)) {
    requiredRole = [requiredRole];
  }
  if (!store.$auth.loggedIn) {
    if (isPublic) return
    redirect('/authen/login');
  } else {
    await store.dispatch('user-auth/store-user/actGetUserDetail')
    if (!store.state['user-auth']['store-user'].user) {
    } else if (requiredRole != null && !(requiredRole.includes(store.state['user-auth']['store-user'].user.roleId))) {
      redirect('/authen/login');
    }
  }
}

export default authenticate
