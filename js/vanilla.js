define(function(require) {
	
	var Adapt = require('coreJS/adapt');
	var Backbone = require('backbone');
	var ThemeBlock = require('theme/adapt-contrib-vanilla/js/theme-block');


	// Page View
	// =========

	Adapt.on('pageView:postRender', function(view) {
		var pageClasses = view.model.get('_classes');

		if (pageClasses) {
			this.$('.page').addClass(pageClasses);
		}
	});

	// Block View
	// ==========

	Adapt.on('blockView:postRender', function(view) {
		var theme = view.model.get('_theme');
		
		if (theme) {
			new ThemeBlock({
				model: new Backbone.Model({
					_themeBlockConfig: theme
				}),
				el: view.$el
			});
		}
	});
});
