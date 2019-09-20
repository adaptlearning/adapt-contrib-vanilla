define([
  "core/js/adapt"
], function(Adapt) {

  var ThemeView = Backbone.View.extend({

    className: function() {},

    initialize: function() {
      this.setStyles();

      this.listenTo(Adapt, {
        "device:resize": this.onDeviceResize,
        "remove": this.remove
      });
    },

    onDeviceResize: function() {
      this.setStyles();
    },

    remove: function() {
      Backbone.View.prototype.remove.call(this);

      this.onRemove();
    },

    setStyles: function() {
      this.setClasses();
      this.setBackgroundImage();
      this.setMinHeight();
      this.setCustomStyles();
    },

    setClasses: function() {
      this.$el.addClass(this.className());
    },

    setBackgroundImage: function() {
      var backgroundImages = this.model.get("_backgroundImage");

      if (!backgroundImages) return;

      var backgroundImage;

      switch (Adapt.device.screenSize) {
        case "large":
          backgroundImage = backgroundImages._large;
          break;
        case "medium":
          backgroundImage = backgroundImages._medium;
          break;
        default:
          backgroundImage = backgroundImages._small;
      }

      if (!backgroundImage) return;

      this.$el
        .addClass("has-bg-image")
        .css("background-image", "url(" + backgroundImage + ")");
    },

    setMinHeight: function() {
      var minimumHeights = this.model.get("_minimumHeights");

      if (!minimumHeights) return;

      var minimumHeight;

      switch (Adapt.device.screenSize) {
        case "large":
          minimumHeight = minimumHeights._large;
          break;
        case "medium":
          minimumHeight = minimumHeights._medium;
          break;
        default:
          minimumHeight = minimumHeights._small;
      }

      if (!minimumHeight) return;

      this.$el
        .addClass('has-min-height')
        .css("min-height", minimumHeight + "px");
    },

    setCustomStyles: function() {},

    onRemove: function() {}

  });

  return ThemeView;

});
