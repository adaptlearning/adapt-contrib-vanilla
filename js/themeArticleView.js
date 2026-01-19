import ThemeView from './themeView';

export default class ThemeArticleView extends ThemeView {

  className() {}

  setCustomStyles() {
    this.processHeader();
  }

  processHeader() {
    const header = this.model.get('_articleHeader');
    if (!header) return;
    const $header = this.$('.article__header');
    this.setHeaderTextAlignment(header);
    this.addHeaderBackgroundLayer($header);
    this.setHeaderBackgroundImage(header, $header);
    this.setHeaderBackgroundStyles(header, $header);
    this.setHeaderMinimumHeight(header, $header);
  }

  onRemove() {}

}
