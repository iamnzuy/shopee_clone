const path = {
  home: '/',
  user: '/user',
  profile: '/user/profile',
  register: '/register',
  login: '/login',
  logout: '/logout',
  productDetail: '/:nameId',
  cart: '/cart',
  changePassword: '/user/password',
  historyPurchase: 'user/purchase'
} as const

export default path
