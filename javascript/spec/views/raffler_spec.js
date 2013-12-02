// Generated by CoffeeScript 1.6.3
(function() {
  describe("Entries view", function() {
    var invisible_table;
    invisible_table = document.createElement('table');
    beforeEach(function() {
      this.server = sinon.fakeServer.create();
      this.Entries_collection = new Raffler.Collections.EntriesCollection(Entries_data);
      return this.Entries_view = new Raffler.Views.EntriesView({
        collection: this.Entries_collection,
        el: invisible_table
      });
    });
    afterEach(function() {
      return this.server.restore();
    });
    it("should be defined", function() {
      return expect(Raffler.Views.EntriesView).toBeDefined();
    });
    it("should have the right element", function() {
      return expect(this.Entries_view.el).toEqual(invisible_table);
    });
    it("should have the right collection", function() {
      return expect(this.Entries_view.collection).toEqual(this.Entries_collection);
    });
    it("should render the the view when initialized", function() {
      return expect($(invisible_table).children().length).toEqual(3);
    });
    it("should render when an element is added to the collection", function() {
      this.Entries_collection.add({
        name: 'Panjab'
      });
      return expect($(invisible_table).children().length).toEqual(4);
    });
    it("should render when an element is removed from the collection", function() {
      this.Entries_collection.pop();
      return expect($(invisible_table).children().length).toEqual(2);
    });
    it("should remove the restaurant when clicking the remove icon", function() {
      var remove_button, removed_restaurant;
      remove_button = $('.remove', $(invisible_table))[0];
      $(remove_button).trigger('click');
      removed_restaurant = this.Entries_collection.get(remove_button.id);
      expect(this.Entries_collection.length).toEqual(2);
      return expect(this.Entries_collection.models).not.toContain(removed_entrie);
    });
    return it("should send an ajax request to delete the restaurant", function() {
      var evt;
      evt = {
        target: {
          id: 1
        }
      };
      this.Entries_view.removeRestaurant(evt);
      expect(this.server.requests.length).toEqual(1);
      expect(this.server.requests[0].method).toEqual('DELETE');
      return expect(this.server.requests[0].url).toEqual('/Entries/1');
    });
  });

}).call(this);
