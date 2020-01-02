export default function(context) {
  if (context.route.path === '/signin') {
    return
  }
  if (context.route.path === '/signup') {
    return
  }
  if (!context.store.getters['auth/isAuthenticated']) {
    return context.redirect('/signin')
  }
}
