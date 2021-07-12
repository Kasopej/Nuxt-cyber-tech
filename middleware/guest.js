// This is the middle ware for pages that doesn't require authentication

export default ({ store, redirect }) => {
  let authenticated

  try {
    authenticated = store.state.auth.loggedIn
  } catch {
    // do nothing
  }

  if (authenticated) {
    redirect('/')
  }
}
