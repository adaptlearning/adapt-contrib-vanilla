import ThemeView from './themeView';
import device from 'core/js/device';

export default class ThemeBlockView extends ThemeView {

  className() {
    return this.model.get('_isDividerBlock') ? 'is-divider-block' : '';
  }

  setCustomStyles() {
    this.processHeader();
    this.setPaddingTop();
    this.setPaddingBottom();
    this.setComponentVerticalAlignment();
    this.setComponentHorizontalAlignment();
  }

  processHeader() {
    const header = this.model.get('_blockHeader');
    if (!header) return;
    const $header = this.$('.block__header');
    this.setHeaderTextAlignment(header);
    this.addHeaderBackgroundLayer($header);
    this.setHeaderBackgroundImage(header, $header);
    this.setHeaderBackgroundStyles(header, $header);
    this.setHeaderMinimumHeight(header, $header);
  }

  setHeaderTextAlignment(config) {
    const textAlignment = config._textAlignment;
    if (!textAlignment) return;

    if (textAlignment._title) this.$el.addClass(`title-align-${textAlignment._title}`);
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

  setPaddingTop() {
    const paddingTop = this.model.get('_paddingTop');
    if (!paddingTop) return;
    this.$el.addClass(`${paddingTop}-padding-top`);
  }

  setPaddingBottom() {
    const paddingBottom = this.model.get('_paddingBottom');
    if (!paddingBottom) return;
    this.$el.addClass(`${paddingBottom}-padding-bottom`);
  }

  setComponentVerticalAlignment() {
    const componentVerticalAlignment = this.model.get('_componentVerticalAlignment');
    if (!componentVerticalAlignment) return;
    this.$el.addClass(`align-vert-${componentVerticalAlignment}`);
  }

  setComponentHorizontalAlignment() {
    const componentHorizontalAlignment = this.model.get('_componentHorizontalAlignment');
    if (!componentHorizontalAlignment) return;
    this.$el.addClass(`align-horz-${componentHorizontalAlignment}`);
  }

  onRemove() {}

}
