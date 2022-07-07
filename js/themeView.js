import Adapt from 'core/js/adapt';

export default class ThemeView extends Backbone.View {

  className() {}

  initialize() {
    // Making a test
    this.setStyles();

    this.listenTo(Adapt, {
      'device:changed': this.onDeviceResize,
      remove: this.remove
    });
  }

  onDeviceResize() {
    this.setStyles();
  }

  remove() {
    super.remove();

    this.onRemove();
  }

  setStyles() {
    this.setClasses();
    this.setBackgroundImage();
    this.setBackgroundStyles();
    this.setMinimumHeight();
    this.setResponsiveClasses();
    this.setCustomStyles();
  }

  setClasses() {
    this.$el.addClass(this.className());
  }

  setBackgroundImage() {
    const backgroundImages = this.model.get('_backgroundImage');

    if (!backgroundImages) return;

    let backgroundImage;

    switch (Adapt.device.screenSize) {
      case 'large':
        backgroundImage = backgroundImages._large;
        break;
      case 'medium':
        backgroundImage = backgroundImages._medium;
        break;
      default:
        backgroundImage = backgroundImages._small;
    }

    if (backgroundImage) {
      this.$el
        .addClass('has-bg-image')
        .css('background-image', 'url(' + backgroundImage + ')');
      return;
    }

    this.$el
      .removeClass('has-bg-image')
      .css('background-image', '');
  }

  setBackgroundStyles() {
    const styles = this.model.get('_backgroundStyles');

    if (!styles) return;

    this.$el.css({
      'background-repeat': styles._backgroundRepeat,
      'background-size': styles._backgroundSize,
      'background-position': styles._backgroundPosition
    });
  }

  setMinimumHeight() {
    const minimumHeights = this.model.get('_minimumHeights');

    if (!minimumHeights) return;

    let minimumHeight;

    switch (Adapt.device.screenSize) {
      case 'large':
        minimumHeight = minimumHeights._large;
        break;
      case 'medium':
        minimumHeight = minimumHeights._medium;
        break;
      default:
        minimumHeight = minimumHeights._small;
    }

    if (minimumHeight) {
      this.$el
        .addClass('has-min-height')
        .css('min-height', minimumHeight + 'px');
      return;
    }

    this.$el
      .removeClass('has-min-height')
      .css('min-height', '');
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
