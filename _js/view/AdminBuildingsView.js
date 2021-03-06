/* globals Buildings:true */
/* globals Building:true */
/* globals BiggieSmalls:true */
/* globals AdminContentItemView:true */

var AdminBuildingsView = Backbone.View.extend({
    id: 'admin_buildings',
    tagName: 'section',
    template: tpl.admincontent,
    currentDay: 0,
    buildings: undefined,

    initialize: function () {
        _.bindAll.apply(_, [this].concat(_.functions(this)));
        this.collection.on("sync reset destroy", this.render);
        this.buildings = this.collection;
    },

    renderBuildings: function (content) {
        var adminContentItemView = new AdminContentItemView({model: content});
        this.$el.find('#list_content').append(adminContentItemView.render().$el);
    },

    updateToDay: function (day) {
        console.log('[AdminBuildingsView] updateToDay()', day);
        this.currentDay = day;
        this.collection = this.buildings;
        this.collection = new Buildings(this.collection.where({day_id: this.currentDay}));
        this.render();
    },

    render: function () {
        this.$el.html(this.template());
        if (this.collection.length > 0) {
            this.collection.each(function (building, index) {
                this.renderBuildings(building);
            }, this);
        } else {
            this.$el.find('#list_content').remove();
            this.$el.append('<div class="border_shadow"><p class="content_item">Er zijn nog geen gebouwen beschikbaar voor deze dag.</p><div class="border_right"></div><div class="border_bottom"></div><div class="border_connection"></div></div>');
        }
        return this;
    }
});