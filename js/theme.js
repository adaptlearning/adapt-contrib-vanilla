import Adapt from 'core/js/adapt';
import ThemePageView from './themePageView';
import ThemeArticleView from './themeArticleView';
import ThemeBlockView from './themeBlockView';
import ThemeComponentView from './themeComponentView';
import ThemeView from './themeView';

class Theme extends Backbone.Controller {

  initialize() {
    this.listenTo(Adapt, {
      'app:dataReady': this.onDataReady,
      'pageView:postRender articleView:postRender blockView:postRender componentView:postRender': this.onPostRender
    });
  }

  onDataReady() {
    $('html').addClass(Adapt.course.get('_courseStyle'));
    this.addFavIcon();
  }

  addFavIcon() {
    const theme = Adapt.course.get('_vanillaVis');
    if (!theme?._favIcon?._src) return;
    const $linkStandard = $(`<link rel="icon" href="${theme._favIcon._src}" size="192x192" />`);
    const $linkApple = $(`<link rel="apple-touch-icon" href="${theme._favIcon._src}" />`);
    $('head')
      .append($linkStandard)
      .append($linkApple);
  }

  onPostRender(view) {
    const viewModel = view.model;
    const theme = viewModel.get('_vanillaVis');
    if (!theme) return;
    const model = new Backbone.Model(theme);
    const el = view.$el;
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
      case 'component':
        new ThemeComponentView({ model, el });
        break;
      default:
        new ThemeView({ model, el });
    }
  }

}

export default new Theme();
