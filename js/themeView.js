define([
  "core/js/adapt"
], function(Adapt) {

  var ThemeView = Backbone.View.extend({

    className: function() {},

    initialize: function() {
      this.setStyles();

      this.listenTo(Adapt, {
        "device:changed": this.onDeviceResize,
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
      this.setBackgroundStyles();
      this.setMinimumHeight();
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

      if (backgroundImage) {
        this.$el
          .addClass("has-bg-image")
          .css("background-image", "url(" + backgroundImage + ")");
      } else {
        this.$el
          .removeClass("has-bg-image")
          .css("background-image", "");
      }
    },

    setBackgroundStyles: function () {
      var styles = this.model.get("_backgroundStyles");

      if (!styles) return;

      this.$el.css({
        'background-repeat': styles._backgroundRepeat,
        'background-size': styles._backgroundSize,
        'background-position': styles._backgroundPosition
      });
    },

    setMinimumHeight: function() {
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

      if (minimumHeight) {
        this.$el
          .addClass("has-min-height")
          .css("min-height", minimumHeight + "px");
      } else {
        this.$el
          .removeClass("has-min-height")
          .css("min-height", "");
      }
    },

    setCustomStyles: function() {},

    onRemove: function() {}

  });

  return ThemeView;

});
