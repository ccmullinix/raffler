describe "Entries view", ->


  invisible_table = document.createElement 'table'

  beforeEach ->
    @server = sinon.fakeServer.create()
    @Entries_collection = new Raffler.Collections.EntriesCollection Entries_data
    @Entries_view = new Raffler.Views.EntriesView
      collection: @Entries_collection
      el: invisible_table

  afterEach ->
    @server.restore()

  it "should be defined", ->
    expect(Raffler.Views.EntriesView).toBeDefined()

  it "should have the right element", ->
    expect(@Entries_view.el).toEqual invisible_table

  it "should have the right collection", ->
    expect(@Entries_view.collection).toEqual @Entries_collection

  it "should render the the view when initialized", ->
    expect($(invisible_table).children().length).toEqual 3

  it "should render when an element is added to the collection", ->
    @Entries_collection.add
      name: 'Panjab'
    expect($(invisible_table).children().length).toEqual 4

  it "should render when an element is removed from the collection", ->
    @Entries_collection.pop()
    expect($(invisible_table).children().length).toEqual 2

  it "should remove the restaurant when clicking the remove icon", ->
    remove_button = $('.remove', $(invisible_table))[0]
    $(remove_button).trigger 'click'
    removed_restaurant = @Entries_collection.get remove_button.id
    expect(@Entries_collection.length).toEqual 2
    expect(@Entries_collection.models).not.toContain removed_entrie

  it "should send an ajax request to delete the restaurant", ->
    evt = { target: { id: 1 } }
    @Entries_view.removeRestaurant evt
    expect(@server.requests.length).toEqual 1
    expect(@server.requests[0].method).toEqual('DELETE')
    expect(@server.requests[0].url).toEqual('/Entries/1')
