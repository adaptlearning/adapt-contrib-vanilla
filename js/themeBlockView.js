define([
  './themeView'
], function(ThemeView) {

  var ThemeBlockView = ThemeView.extend({

    className: function() {
      return this.model.get('_isDividerBlock') ? 'is-divider-block' : '';
    },

    setCustomStyles: function() {},

    onRemove: function() {}

  });

  return ThemeBlockView;

});
