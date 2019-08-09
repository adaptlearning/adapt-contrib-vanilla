define([
  "./themeView",
  "core/js/adapt"
], function(ThemeView, Adapt) {

  var ThemeBlockView = ThemeView.extend({

    className: function() {},

    setCustomStyles: function() {},

    onRemove: function() {}

  });

  return ThemeBlockView;

});
