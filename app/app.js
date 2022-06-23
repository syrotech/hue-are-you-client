'use strict'

const authEvents = require('./auth/events')
const gameEvents = require('./game/events')

$(() => {
  authEvents.addHandlers()
  gameEvents.addHandlers()
  $('section.before-auth')
    .hide()
    .fadeIn(300)
})
