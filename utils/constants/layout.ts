export enum MENU_ACTION {
  LOGOUT
}

export const PAGE_MENU = [
  { id: 1, icon: 'shopping-cart', label: 'Stock' },
  { id: 11, to: '/stock', label: 'Stock List', parentId: 1 },
  { id: 12, to: '/box', label: 'Box List', parentId: 1, isLast: true },
  { id: 21, to: '/stock-in', label: 'Stock In', parentId: 2 },
  { id: 22, to: '/stock-out/order-list', label: 'Stock Out', parentId: 2, isLast: true },
  { id: 3, icon: 'shopping-cart', label: 'Bin', hideToggled: true },
  { id: 4, icon: 'shopping-cart', label: 'Role', hideToggled: true },
  { id: 5, icon: 'shopping-cart', label: 'Shipper', hideToggled: true },
  { id: 6, icon: 'shopping-cart', label: 'Tags', hideToggled: true },
  { id: 7, icon: 'shopping-cart', label: 'Seller', hideToggled: true },
  { id: 8, icon: 'shopping-cart', label: 'Dashboard', hideToggled: true },
  { id: 9, icon: 'shopping-cart', label: 'Inventory Fee', hideToggled: true }
]

export const SETTING_MENU = [
  { id: 100, icon: 'notification', label: 'Notifications', hideToggled: true },
  { id: 200, icon: 'setting', label: 'Setting' },
  { id: 201, label: 'Logout', parentId: 200, action: MENU_ACTION.LOGOUT, isLast: true }
]
