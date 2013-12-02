class Raffler.Views.EntriesIndex extends Backbone.View
  template:  _.template($('#item-template').html())
  events:
    'click #newvalue': 'createEntry'
    'click #choosewinner': 'drawWinner'
    'click button': 'deleteEntry'
    'click #resetWinner': 'reset'
  initialize: ->
    @collection.on('sync', @render, this)
    @collection.on('add', @render, this) 
    @collection.on('destroy',@render,this)
  render: ->
    $(@el).html(@template(entries: @collection.toJSON()))
    this
  createEntry: ->
    @collection.create name: $('#new-name').val()
  drawWinner: ->
    winner = @collection.shuffle()[0]
    if winner
      winner.set(winner: true)
      winner.save()
  deleteEntry: (ev) ->
    console.log $(ev.target).attr('id') 
    item=@collection.find (@model) ->
        @model.get("id") is $(ev.target).attr('id')
        #@model
    item.destroy()
  reset: ->
    for model in @collection.models
      model.set(winner: false)
      model.save()
