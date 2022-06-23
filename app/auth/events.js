'use strict'

const api = require('./api')
const getFormFields = require('../../lib/get-form-fields')
const ui = require('./ui')
const gameUi = require('../game/ui')

const onSignUp = e => {
  e.preventDefault()

  const form = e.target
  const formData = getFormFields(form)

  api
    .signUp(formData)
    .then(ui.onSignupSuccess)
    .catch(ui.onSignupFailure)
}

const onSignIn = e => {
  e.preventDefault()

  const form = e.target
  const formData = getFormFields(form)
  console.log(formData)
  api
    .signIn(formData)
    .then(ui.onSigninSuccess)
    .catch(ui.onSigninFailure)
}

const onDemoSignInLink = e => {
  e.preventDefault()

  api
    .signIn({
      credentials: {
        email: 'demo@prod',
        password: 'demo'
      }
    })
    .then(ui.onSigninSuccess)
    .catch(ui.onSigninFailure)
}

const onChangePassword = e => {
  e.preventDefault()

  const form = e.target
  const formData = getFormFields(form)

  api
    .changePassword(formData)
    .then(ui.onChangePasswordSuccess)
    .catch(ui.onChangePasswordFailure)
}

const onSignOut = e => {
  e.preventDefault()
  // clear the board so user doesn't see the same game
  gameUi.clearBoard()
  api
    .signOut()
    .then(ui.onSignOutSuccess)
    .catch(ui.onSignOutFailure)
}

const onSignInLink = () => {
  $('#sign-up-form').hide()
  $('#sign-in-form').show()
  $('form').trigger('reset')
}

const onSignUpLink = () => {
  $('#sign-in-form').hide()
  $('#sign-up-form').show()
  $('form').trigger('reset')
}

const onChangePasswordLink = () => {
  $('#change-password').css('visibility', 'visible')
}

const addHandlers = e => {
  $('#sign-up').on('submit', onSignUp)
  $('#sign-in').on('submit', onSignIn)
  $('#change-password').on('submit', onChangePassword)
  $('#sign-out').on('submit', onSignOut)
  $('#sign-in-link').on('click', onSignInLink)
  $('#demo-sign-in-link').on('click', onDemoSignInLink)
  $('#sign-up-link').on('click', onSignUpLink)
  $('#sign-in-form').hide()
  $('#change-password-link').on('click', onChangePasswordLink)
  $('#change-password').css('visibility', 'hidden')
}

module.exports = {
  addHandlers
}
