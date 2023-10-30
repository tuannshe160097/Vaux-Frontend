export enum MENU_ACTION {
  LOGOUT
}

export const PAGE_MENU = [
  { id: 1, to: '/dashboard', icon: 'dashboard', label: 'Thống kê', hideToggled: true },
  { id: 2, icon: 'account', label: 'Quản lý tài khoản' },
  { id: 3, to: '/admin', icon: 'admin', label: 'Thông tin quản trị viên', parentId: 2 },
  { id: 4, to: '/expert', icon: 'expert', label: 'Thông tin chuyên gia', parentId: 2 },
  { id: 5, to: '/user', icon: 'user', label: 'Thông tin người dùng', parentId: 2 },
  { id: 6, to: '/category', icon: 'category', label: 'Thể loại', hideToggled: true },



  
  // { id: 5, icon: 'shopping-cart', label: 'Shipper', hideToggled: true },
  // { id: 6, icon: 'shopping-cart', label: 'Tags', hideToggled: true },
  // { id: 7, icon: 'shopping-cart', label: 'Seller', hideToggled: true },
  // { id: 8, icon: 'shopping-cart', label: 'Dashboard', hideToggled: true },
  // { id: 9, icon: 'shopping-cart', label: 'Inventory Fee', hideToggled: true }
]

export const SETTING_MENU = [
  { id: 100, icon: 'notification', label: 'Notifications', hideToggled: true },
  { id: 200, icon: 'settings', label: 'Setting' },
  { id: 201, label: 'Logout', parentId: 200, action: MENU_ACTION.LOGOUT, isLast: true }
]
