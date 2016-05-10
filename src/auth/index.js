// src/auth/index.js

// import {router} from '../router'

// URL and endpoint constants
const CACHE_URL = 'http://localhost:3001'
// const WORKFLOW_URL = 'http://localhost:3002'

export default {

  // User object will let us check authentication status
  user: {
    authenticated: false
  },

  // Send a request to the login URL and save the returned JWT
  login (context, creds, redirect) {
    context.$http.get(CACHE_URL + '/cache/user_rights/A0070984.json', creds, (data) => {
      localStorage.setItem('user_rights', data)
    })

    context.$http.get(CACHE_URL + '/cache/app_tokens/qlc_workflow.json', creds, (data) => {
      localStorage.setItem('id_token', data.access_token)

      this.user.authenticated = true

      // Redirect to a specified route
      if (redirect) {
        alert(redirect)
        window.router.go(redirect)
      }

    }).error((err) => {
      context.error = err
    })
  },

  // To log out, we just need to remove the token
  logout () {
    localStorage.removeItem('id_token')
    this.user.authenticated = false
  },

  checkAuth () {
    var jwt = localStorage.getItem('id_token')
    if (jwt) {
      this.user.authenticated = true
    }
    else {
      this.user.authenticated = false
    }
  },

  // The object to be passed as a header for authenticated requests
  getAuthHeader () {
    return {
      'Authorization': 'Bearer ' + localStorage.getItem('id_token')
    }
  }
}
