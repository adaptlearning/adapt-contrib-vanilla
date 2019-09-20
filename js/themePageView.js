define([
  './themeView',
  'core/js/adapt'
], function(ThemeView, Adapt) {

  var ThemePageView = ThemeView.extend({

    className: function() {},

    setCustomStyles: function() {
      this.processHeader();
    },

    processHeader: function() {
      var header = this.model.get('_pageHeader');
      var $header = this.$('.page__header');

      if (!header) return;

      this.setElementBackground(header, $header);
      this.setElementMinHeight(header, $header);
    },

    setElementBackground: function(config, $element) {
      var backgroundImages = config._backgroundImage;

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

      $element
        .addClass("has-bg-image")
        .css("background-image", "url(" + backgroundImage + ")");
    },

    setElementMinHeight: function(config, $element) {
      var minimumHeights = config._minimumHeights;

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

      $element
        .addClass('has-min-height')
        .css("min-height", minimumHeight + "px");
    },

    onRemove: function() {}

  });

  return ThemePageView;

});
