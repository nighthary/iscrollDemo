define([
        'butterfly/view',
        'butterfly',
        'listview/ListView',
        'shared/js/datasource',
        'shared/js/client'
    ],
    function(View, Butterfly, ListView, DataSource, Client) {

        var MyDataSource = DataSource.extend({

            ajaxLoadData: function(options) {
            	var me = this;
                Client.ajax({
                    url: options.url,
                    type: 'GET',
                    dataType: 'json',
                    success: function(response) {
                        if (response && response.result == 0) { // && response.success
                            //mark as finish
                            if (response.data.length) {
                                me.setFinish();
                            };

                            //callback
                            options.success(response.data);
                        } else {
                            options.fail(response.data);
                        }
                    },
                    error: function(xhr, status) {
                        options.fail(xhr, status);
                    }
                });
            }
        });

        return View.extend({
            events: {
                "click .back": "goBack",
            },
            onShow: function(options) {
                View.prototype.onShow.apply(this, arguments);
            },
            render: function(options) {
                this.initListView();
            },
            initListView: function() {
                var me = this;
                if (!me.listview) {
                    //初始化活动列表
                    me.datasSource = new MyDataSource({
                        identifier: 'index-list',
                        storage: 'session',
                        url: '../samples/ListView/data.json',
                        requestParams: {}
                    });
                    var newsListEl = me.el.querySelector('#list');
                    var template = _.template(this.$('#itemTemplate').html());
                    //初始化垂直列表
                    me.listview = new ListView({
                        el: newsListEl,
                        itemTemplate: template,
                        dataSource: me.datasSource,
                        autoLoad: true,
                        id: 'list',
                        isPullToRefresh: false
                    });

                    this.listenTo(this.listview, 'load', this.listViewLoaded);
                    this.listenTo(this.listview, 'error', this.listViewError);
                }
            },
            listViewLoaded: function() {
                console.log('loaded...');
            },
            listViewError: function() {
                console.log('load error...');
            }
        }); //view define
    });
