// Generated by CoffeeScript 1.6.3
(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Raffler.Views.EntriesIndex = (function(_super) {
    __extends(EntriesIndex, _super);

    function EntriesIndex() {
      _ref = EntriesIndex.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    EntriesIndex.prototype.template = _.template($('#item-template').html());

    EntriesIndex.prototype.events = {
      'click #newvalue': 'createEntry',
      'click #choosewinner': 'drawWinner',
      'click button': 'deleteEntry',
      'click #resetWinner': 'reset'
    };

    EntriesIndex.prototype.initialize = function() {
      this.collection.on('sync', this.render, this);
      this.collection.on('add', this.render, this);
      return this.collection.on('destroy', this.render, this);
    };

    EntriesIndex.prototype.render = function() {
      $(this.el).html(this.template({
        entries: this.collection.toJSON()
      }));
      return this;
    };

    EntriesIndex.prototype.createEntry = function() {
      return this.collection.create({
        name: $('#new-name').val()
      });
    };

    EntriesIndex.prototype.drawWinner = function() {
      var winner;
      winner = this.collection.shuffle()[0];
      if (winner) {
        winner.set({
          winner: true
        });
        return winner.save();
      }
    };

    EntriesIndex.prototype.deleteEntry = function(ev) {
      var item;
      console.log($(ev.target).attr('id'));
      item = this.collection.find(function(model) {
        this.model = model;
        return this.model.get("id") === $(ev.target).attr('id');
      });
      return item.destroy();
    };

    EntriesIndex.prototype.reset = function() {
      var model, _i, _len, _ref1, _results;
      _ref1 = this.collection.models;
      _results = [];
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        model = _ref1[_i];
        model.set({
          winner: false
        });
        _results.push(model.save());
      }
      return _results;
    };

    return EntriesIndex;

  })(Backbone.View);

}).call(this);
