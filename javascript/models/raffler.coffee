class Raffler.Models.Entries extends Backbone.Model

  urlRoot: '/index'

  defaults:
    name: null
    winner: null

  validate:
    name:
      required: true
    winner:
      required: true

class Raffler.Collections.Entries extends Backbone.Collection
  model: Raffler.Models.Entry
  localStorage: new Store("coffee-raffle-reset") 
