export enum MENU_ACTION {
  LOGOUT
}

export const PAGE_MENU = [
  { id: 1, icon: 'shopping-cart', label: 'Thống kê', hideToggled: true },
  { id: 2, icon: 'shopping-cart', label: 'Quản lý tài khoản' },
  { id: 3, to: '/admin', icon: 'shopping-cart', label: 'Thông tin quản trị viên', parentId: 2, hideToggled: true},
  { id: 4, to: '/expert', icon: 'shopping-cart', label: 'Thông tin người chuyên gia', parentId: 2, hideToggled: true},
  { id: 5, to: '/admin/user', icon: 'shopping-cart', label: 'Thông tin người dùng', parentId: 2, hideToggled: true},
  { id: 6, to: '/category', icon: 'shopping-cart', label: 'Thông tin thể loại', hideToggled: true},



  // { id: 5, icon: 'shopping-cart', label: 'Shipper', hideToggled: true },
  // { id: 6, icon: 'shopping-cart', label: 'Tags', hideToggled: true },
  // { id: 7, icon: 'shopping-cart', label: 'Seller', hideToggled: true },
  // { id: 8, icon: 'shopping-cart', label: 'Dashboard', hideToggled: true },
  // { id: 9, icon: 'shopping-cart', label: 'Inventory Fee', hideToggled: true }
]

export const SETTING_MENU = [
  { id: 100, icon: 'notification', label: 'Notifications', hideToggled: true },
  { id: 200, icon: 'setting', label: 'Setting' },
  { id: 201, label: 'Logout', parentId: 200, action: MENU_ACTION.LOGOUT, isLast: true }
]
