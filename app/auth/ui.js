'use strict'

const store = require('../store')
const Swal = require('sweetalert2')

const onSuccess = message => {
  Swal.fire({
    position: 'top',
    icon: 'success',
    title: message,
    showConfirmButton: false,
    timer: 1500
  })
  $('form').trigger('reset')
}

const onFailure = (title, text) => {
  Swal.fire({
    position: 'top',
    icon: 'error',
    title: title,
    text: text || null,
    showConfirmButton: false,
    timer: 2500
  })
  $('form').trigger('reset')
}

const onSignupSuccess = () => {
  onSuccess('Successfully signed up')
  $('#sign-up-form').hide()
  $('#sign-in-form').show()
}

const onSignupFailure = () => {
  onFailure(
    'Unable to sign up',
    "We weren't able to sign you up. Try using a different email, or if you already have an account, sign in instead."
  )
}

const onSigninSuccess = responseData => {
  // store the user data we get back
  store.user = responseData.user
  // hide the sign up/in forms and show the main part of the app
  $('.after-auth').show()
  $('.before-auth').hide()
  // give the user confirmation that they've signed in
  Swal.fire({
    position: 'top',
    icon: 'success',
    title: 'Successfully logged in',
    showConfirmButton: false,
    timer: 1000
  })
}

const onSigninFailure = () => {
  onFailure(
    'Unable to sign you in',
    'Check to make sure you spelled your username and password correctly, and that your account exists.'
  )
}

const onChangePasswordSuccess = responseData => {
  onSuccess('Successfully changed password')
  $('#change-password').css('visibility', 'hidden')
}

const onChangePasswordFailure = () => {
  onFailure(
    'Unable to change your password',
    'Check to make sure you spelled your old password correctly.'
  )
}

const onSignOutSuccess = () => {
  onSuccess('Successfully signed out')
  // clean things up: clear store, hide the app again, reset session stats
  store.user = {}
  store.winsX = 0
  store.winsO = 0
  store.tie = 0
  store.sessionGamesCount = 0
  $('#count-all-games').html('')
  $('#count-x').html('0')
  $('#count-o').html('0')
  $('#count-draw').html('0')
  $('#count-session-games').html('0')
  $('#current-turn').html('')
  $('form').trigger('reset')
  $('.board').css('display', 'none')
  $('#change-password').css('visibility', 'hidden')
  $('.after-auth').hide()
  $('.before-auth').show()
}

const onSignOutFailure = () => {
  onFailure('Unable to sign you out')
}

module.exports = {
  onSignupSuccess,
  onSignupFailure,
  onSigninSuccess,
  onSigninFailure,
  onChangePasswordSuccess,
  onChangePasswordFailure,
  onSignOutSuccess,
  onSignOutFailure
}
