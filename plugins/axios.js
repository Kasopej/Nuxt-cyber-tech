export default function ({ $axios, store, redirect }) {
  $axios.defaults.headers['Content-Type'] = 'application/json'

  // Adds header: `Authorization: Bearer XXXX` to requests
  const accessToken = store.state.auth.accessToken
  if (accessToken) {
    $axios.setToken(accessToken, 'Bearer')
  } else {
    // Redirect to Logout
    redirect('/account/logout/')
  }
}
