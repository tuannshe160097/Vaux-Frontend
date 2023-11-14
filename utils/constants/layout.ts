export enum MENU_ACTION {
  LOGOUT
}

export const PAGE_MENU = [
  { id: 1, to: '/admin/dashboard', icon: 'dashboard', label: 'Thống kê', hideToggled: true },
  { id: 2, icon: 'account', label: 'Quản lý tài khoản' },
  { id: 3, to: '/admin/sellerApplication', icon: 'admin', label: 'Người bán', parentId: 2 },
  { id: 4, to: '/admin/user/detail', icon: 'expert', label: 'Tạo tài khoản', parentId: 2 },
  { id: 5, to: '/admin/user', icon: 'user', label: 'Danh sách người dùng', parentId: 2 },
  { id: 6, to: '/admin/category', icon: 'category', label: 'Thể loại', hideToggled: true },
  { id: 7, icon: 'category', label: 'Sản phẩm', hideToggled: true },
  { id: 8, to: '/expert/items', icon: 'user', label: 'Danh sách Sản phẩm', parentId: 7 },
  { id: 9, to: '/expert/items', icon: 'user', label: 'Danh sách Sản phẩm', parentId: 7 },
]

export const PAGE_MENU_ADMIN = [
  { id: 1, to: '/dashboard', icon: 'dashboard', label: 'Thống kê', hideToggled: true },
  { id: 2, icon: 'account', label: 'Quản lý tài khoản' },
  { id: 3, to: '/admin/sellerApplication', icon: 'admin', label: 'Người bán', parentId: 2 },
  { id: 4, to: '/admin/user/detail', icon: 'expert', label: 'Tạo tài khoản', parentId: 2 },
  { id: 5, to: '/admin/user', icon: 'user', label: 'Danh sách người dùng', parentId: 2 },
  { id: 6, to: '/admin/category', icon: 'category', label: 'Thể loại', hideToggled: true },
  { id: 7, icon: 'category', label: 'Sản phẩm', hideToggled: true },
  { id: 8, to: '/expert/items', icon: 'user', label: 'Danh sách Sản phẩm', parentId: 7 },
  { id: 8, to: '/expert/items', icon: 'user', label: 'Danh sách Sản phẩm', parentId: 7 },
]

export const PAGE_MENU_MOD = [
  { id: 1, to: '/dashboard', icon: 'dashboard', label: 'Thống kê', hideToggled: true },
  { id: 2, icon: 'account', label: 'Quản lý tài khoản' },
  { id: 3, to: '/admin/sellerApplication', icon: 'admin', label: 'Người bán', parentId: 2 },
  { id: 4, to: '/admin/user/detail', icon: 'expert', label: 'Tạo tài khoản', parentId: 2 },
  { id: 5, to: '/admin/user', icon: 'user', label: 'Danh sách người dùng', parentId: 2 },
  { id: 6, to: '/admin/category', icon: 'category', label: 'Thể loại', hideToggled: true },
  { id: 7, icon: 'category', label: 'Sản phẩm', hideToggled: true },
  { id: 8, to: '/expert/items', icon: 'user', label: 'Danh sách Sản phẩm', parentId: 7 },
  { id: 8, to: '/expert/items', icon: 'user', label: 'Danh sách Sản phẩm', parentId: 7 },
]

export const PAGE_MENU_EXPERT = [
  { id: 1, to: '/dashboard', icon: 'dashboard', label: 'Thống kê', hideToggled: true },
  { id: 6, to: '/admin/category', icon: 'category', label: 'Thể loại', hideToggled: true },
  { id: 7, icon: 'category', label: 'Sản phẩm', hideToggled: true },
  { id: 8, to: '/expert/items', icon: 'user', label: 'Danh sách Sản phẩm', parentId: 7 },
  // { id: 9, to: '/expert/items', icon: 'user', label: 'Danh sách Sản phẩm', parentId: 7 },
]

export const SETTING_MENU = [
  { id: 100, icon: 'notification', label: 'Notifications', hideToggled: true },
  { id: 200, icon: 'settings', label: 'Setting' },
  { id: 201, icon: 'logout', label: 'Logout', parentId: 200, action: MENU_ACTION.LOGOUT, isLast: true }
]
