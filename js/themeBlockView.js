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

    switch (componentVerticalAlignment) {
      case 'center':
        this.$el.addClass('align-vert-center');
        break;
      case 'bottom':
        this.$el.toggleClass('align-vert-bottom');
        break;
      default:
        this.$el.toggleClass('align-vert-top');
        break;
    }
  }

  onRemove() {}

}
