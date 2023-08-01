import Adapt from 'core/js/adapt';

export default class ThemeView extends Backbone.View {

  className() {}

  initialize() {
    this.setStyles();
    this.resetPageViewReady();

    this.listenTo(Adapt, {
      'pageView:ready': this.onPageViewReady,
      'device:changed': this.onDeviceResize,
      remove: this.remove
    });
  }

  onDeviceResize() {
    this.setStyles();
  }

  onPageViewReady() {
    // Add a class to <html> after all assets are loaded for a page.
    $('html').addClass('page-view-ready');
  }

  resetPageViewReady() {
    $('html').removeClass('page-view-ready');
  }

  remove() {
    super.remove();
    this.onRemove();
  }

  setStyles() {
    this.setClasses();
    this.setTextAlignment();
    this.addBackgroundLayer();
    this.setBackgroundImage();
    this.setBackgroundStyles();
    this.setMinimumHeight();
    this.setResponsiveClasses();
    this.setCustomStyles();
  }

  setClasses() {
    this.$el.addClass(this.className());
  }

  setTextAlignment() {
    const textAlignment = this.model.get('_textAlignment');
    if (!textAlignment) return;

    if (textAlignment._title) this.$el.addClass(`title-align-${textAlignment._title}`);
    if (textAlignment._body) this.$el.addClass(`body-align-${textAlignment._body}`);
    if (textAlignment._instruction) this.$el.addClass(`instruction-align-${textAlignment._instruction}`);
  }

  addBackgroundLayer() {
    if (this.$el.find(' > .background').length) return;
    this.$background = $('<div class="background" aria-hidden="true"></div>')
      .prependTo(this.$el);
  }

  setBackgroundImage() {
    const backgroundImages = this.model.get('_backgroundImage');
    if (!backgroundImages) return;
    const backgroundImage = backgroundImages[`_${Adapt.device.screenSize}`] ?? backgroundImages._small;
    this.$el.toggleClass('has-bg-image', Boolean(backgroundImage));
    this.$background
      .css('background-image', backgroundImage ? 'url(' + backgroundImage + ')' : '');
  }

  setBackgroundStyles() {
    const styles = this.model.get('_backgroundStyles');
    if (!styles) return;
    this.$background.css({
      'background-repeat': styles._backgroundRepeat,
      'background-size': styles._backgroundSize,
      'background-position': styles._backgroundPosition
    });
  }

  setMinimumHeight() {
    const minimumHeights = this.model.get('_minimumHeights');
    if (!minimumHeights) return;

    const minimumHeight = minimumHeights[`_${Adapt.device.screenSize}`] ?? minimumHeights._small;
    this.$el
      .toggleClass('has-min-height', Boolean(minimumHeight))
      .css('min-height', minimumHeight ? minimumHeight + 'px' : '');
  }

  setResponsiveClasses() {
    const responsiveClasses = this.model.get('_responsiveClasses');
    if (!responsiveClasses) return;

    this.$el
      .removeClass(Object.values(responsiveClasses))
      .addClass(responsiveClasses[`_${Adapt.device.screenSize}`]);
  }

  setCustomStyles() {}

  onRemove() {}

}
