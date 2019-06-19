define([
  "./themeView",
  "core/js/adapt"
], function(ThemeView, Adapt) {

  var ThemeArticleView = ThemeView.extend({

    className: function() {},

    setCustomStyles: function() {},

    onRemove: function() {}

  });

  return ThemeArticleView;

});
