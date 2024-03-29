export enum MENU_ACTION {
  LOGOUT
}

export const PAGE_MENU = [
  { id: 1, to: '/admin/dashboard', icon: 'dashboard', label: 'Thống kê', hideToggled: true },
  { id: 2, icon: 'account', label: 'Quản lý tài khoản' },
  { id: 3, to: '/admin/sellerApplication', icon: 'seller', label: 'Người bán', parentId: 2 },
  { id: 4, to: '/admin/user/detail', icon: 'new-page', label: 'Tạo tài khoản', parentId: 2 },
  { id: 5, to: '/admin/user', icon: 'user', label: 'Danh sách người dùng', parentId: 2 },
  { id: 6, to: '/admin/category', icon: 'category', label: 'Thể loại', hideToggled: true },
  { id: 8, to: '/admin/item', icon: 'product', label: 'Sản phẩm', hideToggled: true},
  { id: 10, to: '/admin/auction', icon: 'auction', label: 'Phiên đấu giá', hideToggled: true },
  { id: 12, to: '/admin/order', icon: 'regulatory', label: 'Đơn hàng', hideToggled: true },
  { id: 13, to: '/admin/payment', icon: 'credit-card', label: 'Thanh toán', hideToggled: true },
  { id: 14, to: '/admin/shipment', icon: 'fast-delivery', label: 'Giao hàng', hideToggled: true },
]

export const PAGE_MENU_MOD = [
  { id: 1, to: '/admin/dashboard', icon: 'dashboard', label: 'Thống kê', hideToggled: true },
  { id: 2, icon: 'account', label: 'Quản lý tài khoản' },
  { id: 3, to: '/admin/sellerApplication', icon: 'seller', label: 'Người bán', parentId: 2 },
  { id: 4, to: '/admin/user/detail', icon: 'new-page', label: 'Tạo tài khoản', parentId: 2 },
  { id: 5, to: '/admin/user', icon: 'user', label: 'Danh sách người dùng', parentId: 2 },
  { id: 6, to: '/admin/category', icon: 'category', label: 'Thể loại', hideToggled: true },
  { id: 7, to: '/admin/item', icon: 'product', label: 'Sản phẩm', hideToggled: true},
  { id: 10, to: '/admin/auction', icon: 'auction', label: 'Phiên đấu giá', hideToggled: true },
  { id: 11, to: '/admin/order', icon: 'regulatory', label: 'Đơn hàng', hideToggled: true },
  { id: 12, to: '/admin/payment', icon: 'credit-card', label: 'Thanh toán', hideToggled: true },
  { id: 13, to: '/admin/shipment', icon: 'fast-delivery', label: 'Vận chuyển', hideToggled: true},
]

export const PAGE_MENU_EXPERT = [
  { id: 1, to: '/homepage', icon: 'dashboard', label: 'Trang chủ', hideToggled: true },
  { id: 8, to: '/expert/items', icon: 'product', label: 'Danh sách Sản phẩm', hideToggled: true },
  // { id: 9, to: '/expert/items', icon: 'user', label: 'Danh sách Sản phẩm', parentId: 7 },
]

export const SETTING_MENU = [
  { id: 200, icon: 'settings', label: 'Cài đặt' },
  { id: 201, icon: 'logout', label: 'Đăng xuất', parentId: 200, action: MENU_ACTION.LOGOUT, isLast: true }
]
