// This is the middleware for pages that requires authentication

export default ({ $axios, store, redirect, route }) => {
  let authenticated = ''

  try {
    authenticated = store.state.auth.loggedIn
    // Adds header: `Authorization: Bearer XXXX` to requests
    $axios.setToken(store.state.auth.user.token, 'Bearer')
  } catch {
    // do nothing
  }

  if (!authenticated) {
    // Remove User's data from a persisted Vuex store
    store.commit('auth/LOG_USER_OUT')
    //  Redirect to login page
    return redirect('/account/login/')
  }
}
