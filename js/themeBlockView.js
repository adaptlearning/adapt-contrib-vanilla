import ThemeView from './themeView';

export default class ThemeBlockView extends ThemeView {

  className() {
    return this.model.get('_isDividerBlock') ? 'is-divider-block' : '';
  }

  setCustomStyles() {
    this.setComponentVerticalAlignment();
  }

  setComponentVerticalAlignment() {
    const componentVerticalAlignment = this.model.get('_componentVerticalAlignment');
    if (!componentVerticalAlignment) return;
    this.$el.addClass(`align-vert-${componentVerticalAlignment}`);
  }

  onRemove() {}

}
