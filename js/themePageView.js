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
    this.setHeaderTextAlignment(header);
    this.addHeaderBackgroundLayer($header);
    this.setHeaderBackgroundImage(header, $header);
    this.setHeaderBackgroundStyles(header, $header);
    this.setHeaderMinimumHeight(header, $header);
  }

}
