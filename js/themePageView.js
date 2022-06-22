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

    this.setHeaderBackgroundImage(header, $header);
    this.setHeaderBackgroundStyles(header, $header);
    this.setHeaderMinimumHeight(header, $header);
  }

  setHeaderBackgroundImage(config, $header) {
    const backgroundImages = config._backgroundImage;

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
      $('<div></div>')
        .prependTo($header)
        .addClass('has-bg-image')
        .css('background-image', 'url(' + backgroundImage + ')');
      return;
    }

    $header
      .find('> .has-bg-image')
      .removeClass('has-bg-image')
      .css('background-image', '');
  }

  setHeaderBackgroundStyles(config, $header) {
    const styles = config._backgroundStyles;

    if (!styles) return;

    $header.css({
      'background-repeat': styles._backgroundRepeat,
      'background-size': styles._backgroundSize,
      'background-position': styles._backgroundPosition
    });
  }

  setHeaderMinimumHeight(config, $header) {
    const minimumHeights = config._minimumHeights;

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
      $header
        .addClass('has-min-height')
        .css('min-height', minimumHeight + 'px');
      return;
    }

    $header
      .removeClass('has-min-height')
      .css('min-height', '');
  }

  onRemove() {}

}
