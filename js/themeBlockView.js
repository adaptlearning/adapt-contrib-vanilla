define([
  "./themeView",
  "core/js/adapt"
], function(ThemeView, Adapt) {

  var ThemeBlockView = ThemeView.extend({

    className: function() {
      return this.model.get("_isDividerBlock") ? "divider-block" : "";
    },

    setCustomStyles: function() {},

    onRemove: function() {}

  });

  return ThemeBlockView;

});
