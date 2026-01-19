import Adapt from 'core/js/adapt';
import device from 'core/js/device';

export default class ThemeView extends Backbone.View {

  className() {}

  initialize() {
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
    if (textAlignment._subtitle) this.$el.addClass(`subtitle-align-${textAlignment._subtitle}`);
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
    if (!backgroundImages || !this.$background) return;

    const backgroundImage = backgroundImages[`_${device.screenSize}`] ?? backgroundImages._small;
    this.$el.toggleClass('has-bg-image', Boolean(backgroundImage));
    this.$background
      .css('background-image', backgroundImage ? 'url(' + backgroundImage + ')' : '');
  }

  setBackgroundStyles() {
    const styles = this.model.get('_backgroundStyles');
    if (!styles || !this.$background) return;

    this.$background.css({
      'background-repeat': styles._backgroundRepeat,
      'background-size': styles._backgroundSize,
      'background-position': styles._backgroundPosition
    });
  }

  setMinimumHeight() {
    const minimumHeights = this.model.get('_minimumHeights');
    if (!minimumHeights) return;

    const minimumHeight = minimumHeights[`_${device.screenSize}`] ?? minimumHeights._small;
    this.$el
      .toggleClass('has-min-height', Boolean(minimumHeight))
      .css('min-height', minimumHeight ? minimumHeight + 'px' : '');
  }

  setResponsiveClasses() {
    const responsiveClasses = this.model.get('_responsiveClasses');
    if (!responsiveClasses) return;

    this.$el
      .removeClass(Object.values(responsiveClasses))
      .addClass(responsiveClasses[`_${device.screenSize}`]);
  }

  setCustomStyles() {}

  setHeaderTextAlignment(config) {
    const textAlignment = config._textAlignment;
    if (!textAlignment) return;

    if (textAlignment._title) this.$el.addClass(`title-align-${textAlignment._title}`);
    if (textAlignment._subtitle) this.$el.addClass(`subtitle-align-${textAlignment._subtitle}`);
    if (textAlignment._body) this.$el.addClass(`body-align-${textAlignment._body}`);
    if (textAlignment._instruction) this.$el.addClass(`instruction-align-${textAlignment._instruction}`);
  }

  addHeaderBackgroundLayer($header) {
    if ($header.find(' > .background').length) return;
    this.$headerBackground = $('<div class="background" aria-hidden="true"></div>')
      .prependTo($header);
  }

  setHeaderBackgroundImage(config, $header) {
    const backgroundImages = config._backgroundImage;
    if (!backgroundImages || !this.$headerBackground) return;

    const backgroundImage = backgroundImages[`_${device.screenSize}`] ?? backgroundImages._small;
    $header.toggleClass('has-bg-image', Boolean(backgroundImage));
    this.$headerBackground.css('background-image', backgroundImage ? 'url(' + backgroundImage + ')' : '');
  }

  setHeaderBackgroundStyles(config, $header) {
    const styles = config._backgroundStyles;
    if (!styles || !this.$headerBackground) return;

    this.$headerBackground.css({
      'background-repeat': styles._backgroundRepeat,
      'background-size': styles._backgroundSize,
      'background-position': styles._backgroundPosition
    });
  }

  setHeaderMinimumHeight(config, $header) {
    const minimumHeights = config._minimumHeights;
    if (!minimumHeights) return;
    const minimumHeight = minimumHeights[`_${device.screenSize}`] ?? minimumHeights._small;
    $header
      .toggleClass('has-min-height', Boolean(minimumHeight))
      .css('min-height', minimumHeight ? minimumHeight + 'px' : '');
  }

  onRemove() {}

}
