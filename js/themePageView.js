import ThemeView from './themeView';

export default class ThemePageView extends ThemeView {

  className() {}

  setCustomStyles() {
    this.processHeader();
  }

  processHeader() {
    const header = this.model.get('_pageHeader');
    if (!header) return;
    const $header = this.$('.page__header');
    this.setTextAlignment(header);
    this.setHeaderGraphic(header, $header);
    this.addHeaderBackgroundLayer($header);
    this.setHeaderBackgroundImage(header, $header);
    this.setHeaderBackgroundStyles(header, $header);
    this.setHeaderMinimumHeight(header, $header);
  }

  setHeaderGraphic(config, $header) {
    const graphic = config._graphic;
    if (!graphic?._src) return;
    const $headerInner = $header.find('.page__header-inner');
    if (!$headerInner.length) return;
    if ($headerInner.find('.page__image-container').length) return;
    const $imageContainer = $('<div class="page__image-container"></div>');
    const $image = $('<img />')
      .addClass('page__image')
      .attr('src', graphic._src)
      .attr('alt', graphic.alt || '');
    $imageContainer.append($image);
    $headerInner.prepend($imageContainer);
  }

}
