import Adapt from 'core/js/adapt';
import ThemePageView from './themePageView';
import ThemeArticleView from './themeArticleView';
import ThemeBlockView from './themeBlockView';
import ThemeView from './themeView';

export default class Theme extends Backbone.Controller {

  initialize() {
    this.listenTo(Adapt, {
      'app:dataReady': this.onDataReady,
      'pageView:postRender articleView:postRender blockView:postRender': this.onPostRender
    });
  }

  onDataReady() {
    $('html').addClass(Adapt.course.get('_courseStyle'));
  }

  onPostRender(view) {
    const viewModel = view.model;
    const theme = viewModel.get('_vanilla');
    const model = new Backbone.Model(theme);
    const el = view.$el;

    if (!theme) return;

    switch (viewModel.get('_type')) {
      case 'page':
        new ThemePageView({ model, el });
        break;
      case 'article':
        new ThemeArticleView({ model, el });
        break;
      case 'block':
        new ThemeBlockView({ model, el });
        break;
      default:
        new ThemeView({ model, el });
    }
  }

}
