import ThemeView from './themeView';

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
