export default function ({ $axios, $config, store, redirect }) {
  $axios.defaults.timeout = $config.axiosTimeout
  //   $axios.defaults.baseURL = $config.baseURL
  $axios.defaults.baseURL = 'https://teklabspace-live.herokuapp.com/hunter/'

  //   $axios.defaults.headers['Access-Control-Allow-Origin'] = '*'
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
