import ThemeView from './themeView';
import Adapt from 'core/js/adapt';

export default class ThemePageView extends ThemeView {

  className() {}

  setCustomStyles() {
    this.processHeader();
  }

  processHeader() {
    const header = this.model.get('_pageHeader');
    if (!header) return;
    const $header = this.$('.page__header');
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
    if (!backgroundImages) return;
    const backgroundImage = backgroundImages[`_${Adapt.device.screenSize}`] ?? backgroundImages._small;
    $header.toggleClass('has-bg-image', Boolean(backgroundImage));
    this.$headerBackground.css('background-image', backgroundImage ? 'url(' + backgroundImage + ')' : '');
  }

  setHeaderBackgroundStyles(config, $header) {
    const styles = config._backgroundStyles;
    if (!styles) return;
    this.$headerBackground.css({
      'background-repeat': styles._backgroundRepeat,
      'background-size': styles._backgroundSize,
      'background-position': styles._backgroundPosition
    });
  }

  setHeaderMinimumHeight(config, $header) {
    const minimumHeights = config._minimumHeights;
    if (!minimumHeights) return;
    const minimumHeight = minimumHeights[`_${Adapt.device.screenSize}`] ?? minimumHeights._small;
    $header
      .toggleClass('has-min-height', Boolean(minimumHeight))
      .css('min-height', minimumHeight ? minimumHeight + 'px' : '');
  }
  
}
