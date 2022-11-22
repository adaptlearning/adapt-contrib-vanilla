import ThemeView from './themeView';

export default class ThemeBlockView extends ThemeView {

  className() {
    return this.model.get('_isDividerBlock') ? 'is-divider-block' : '';
  }

  setCustomStyles() {
    this.setPaddingTop();
    this.setPaddingBottom();
    this.setComponentVerticalAlignment();
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

  onRemove() {}

}
