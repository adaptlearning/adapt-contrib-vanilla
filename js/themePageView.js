define([
  './themeView',
  'core/js/adapt'
], function(ThemeView, Adapt) {

  var ThemePageView = ThemeView.extend({

    className: function() {},

    setCustomStyles: function() {
      this.processHeaderAndFooter();
    },

    processHeaderAndFooter: function() {
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
      var minHeights = config._minHeight;

      if (!minHeights) return;

      var minHeight;

      switch (Adapt.device.screenSize) {
        case "large":
          minHeight = minHeights._large;
          break;
        case "medium":
          minHeight = minHeights._medium;
          break;
        default:
          minHeight = minHeights._small;
      }

      if (!minHeight) return;

      $element
        .addClass('has-min-height')
        .css("min-height", minHeight + "px");
    },

    onRemove: function() {}

  });

  return ThemePageView;

});
