;(function (win, $) {
    var stars = function (obj) {
        this.starBox = $(obj);
        this.starWarp = this.starBox.find('.StarsEvaluation');
        this.list = this.starWarp.find('li');
        this.num = 5;
        this.lightOn(this.num);
        this.starsHover();

    };
    $.extend(true, stars.prototype, {
        starsHover: function () {
            var _this = this;
            this.list.on('mouseover', function () {
                _this.lightOn($(this).index() + 1);
            }).on('click', function () {
                _this.num = $(this).index() + 1;
                var _vm = $(this);
                if (_this.num == 5) {
                    _vm.parent().siblings('p.StarEvaluation-score').text('5分');
                    _vm.parent().siblings('p.StarEvaluation-text').text('惊喜');
                } else if (_this.num == 4) {
                    _vm.parent().siblings('p.StarEvaluation-score').text('4分');
                    _vm.parent().siblings('p.StarEvaluation-text').text('优秀');
                } else if (_this.num == 3) {
                    _vm.parent().siblings('p.StarEvaluation-score').text('3分');
                    _vm.parent().siblings('p.StarEvaluation-text').text('一般');
                } else if (_this.num == 2) {
                    _vm.parent().siblings('p.StarEvaluation-score').text('2分');
                    _vm.parent().siblings('p.StarEvaluation-text').text('较差');
                } else if (_this.num == 1) {
                    _vm.parent().siblings('p.StarEvaluation-score').text('1分');
                    _vm.parent().siblings('p.StarEvaluation-text').text('失望');
                }
            });
            this.starWarp.on('mouseout', function () {
                _this.lightOn(_this.num);
            });
        },
        lightOn: function (num) {
            this.list.each(function (index) {
                if (index < num) {
                    $(this).css('background-position', '0 0');

                } else {
                    $(this).css('background-position', '0 -19px');
                }
            })
        }
    });
    //实例化
    stars.init = function (arr) {
        for (var i = 0, n = arr.length; i < n; i++) {
            new this(arr[i]);
        }
    };
    win.myStarEvaluation = stars;
})(window, jQuery);
myStarEvaluation.init($('.StarEvaluation-box'));

