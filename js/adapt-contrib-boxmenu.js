define(function(require) {

    var Backbone = require('backbone');
    var Adapt = require('coreJS/adapt');
    var MenuView = require('coreViews/menuView');
    
    var BoxMenuView = MenuView.extend({

        preRender: function() {
            this.listenTo(this.model, 'change:_isReady', this.isReady);
            $('.loading').fadeIn('fast');
            this.$el.hide();
        },
        
        postRender: function() {
            var nthChild = 0;
            this.model.getChildren().each(function(item) {
                if(item.get('_isAvailable')) {
                    nthChild ++;
                    this.$('.menu-container-inner').append(new BoxMenuItemView({model:item, nthChild:nthChild}).$el);
                }
            });
        },
        
        isReady: function() {
            _.defer(_.bind(function() {
                $('.loading').hide();
                this.$el.fadeIn('slow');
                Adapt.trigger('menuView:ready');
            }, this));
        }

    }, {
        template:'boxmenu'
    });

    var BoxMenuItemView = MenuView.extend({

        className: function() {
            return [
                'menu-item',
                'menu-item-' + this.model.get('_id') ,
                'nth-child-' + this.options.nthChild,
                this.options.nthChild % 2 === 0  ? 'nth-child-even' : 'nth-child-odd'
            ].join(' ');
        },

        events: {
            'click a':'clickItem'
        },

        clickItem: function() {
            console.log('clicked');
            this.model.set('_isVisited', true);
        },

        preRender: function() {

        },

        postRender: function() {
            this.$el.imageready(_.bind(function() {
                this.setReadyStatus();
            }, this));
        }

    }, {
        template:'boxmenu-item'
    });
    
    Adapt.on('router:menu', function(model) {
        console.log(model);
        $('#wrapper').append(new BoxMenuView({model:model}).$el);
    });
    
    /*Adapt.on('router:menu', function(id) {
        var currentModel = Adapt.contentObjects.findWhere({_id:id});
        new BoxMenuView({model:currentModel});
    });*/
    
});