(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'mola', 'classnames', './constants', './babelHelpers'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('mola'), require('classnames'), require('./constants'), require('./babelHelpers'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.mola, global.classnames, global.constants, global.babelHelpers);
        global.ScrollTip = mod.exports;
    }
})(this, function (exports, _react, _mola, _classnames, _constants, babelHelpers) {
    'use strict';

    exports.__esModule = true;
    exports.ScrollTip = undefined;

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _classnames2 = babelHelpers.interopRequireDefault(_classnames);

    /**
     * @file 滑动提示组件
     * @author cxtom <cxtom2008@gmail.com>
     */

    function easeInOutQuad(t, b, c, d) {
        t /= d / 2;
        if (t < 1) {
            return c / 2 * t * t + b;
        }
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    var raf = window ? window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
        window.setTimeout(callback.bind(null, Date.now()), 1000 / 60);
    } : function () {};

    var ScrollTip = exports.ScrollTip = function (_Component) {
        babelHelpers.inherits(ScrollTip, _Component);

        function ScrollTip() {
            babelHelpers.classCallCheck(this, ScrollTip);

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            var _this = babelHelpers.possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args)));

            _this.state = {
                show: true
            };
            _this.onScroll = _this.onScroll.bind(_this);
            _this.onClick = _this.onClick.bind(_this);
            _this.loop = _this.loop.bind(_this);
            _this.done = _this.done.bind(_this);

            _this.timeStart = null;
            _this.distance = null;
            return _this;
        }

        ScrollTip.prototype.componentDidMount = function componentDidMount() {
            this.distance = this.props.distance * document.getElementsByTagName('html')[0].clientWidth / _mola.WINDOW_WIDTH;
            document.addEventListener('scroll', this.onScroll);
        };

        ScrollTip.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
            if (nextProps.distance !== this.distance) {
                this.distance = nextProps.distance * document.getElementsByTagName('html')[0].clientWidth / _mola.WINDOW_WIDTH;
            }
        };

        ScrollTip.prototype.componentWillUnmount = function componentWillUnmount() {
            this.removeEvent();
        };

        ScrollTip.prototype.removeEvent = function removeEvent() {
            document.removeEventListener('scroll', this.onScroll);
        };

        ScrollTip.prototype.onScroll = function onScroll(e) {
            var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            if (scrollTop > 100) {
                this.setState({ show: false });
                this.removeEvent();
            }
        };

        ScrollTip.prototype.done = function done() {
            window.scrollTo(0, this.distance);
            this.setState({ show: false });
        };

        ScrollTip.prototype.loop = function loop(timeCurrent) {
            if (!this.timeStart) {
                this.timeStart = timeCurrent;
            }

            var duration = 300 * (1 - this.startY / this.distance);

            // determine time spent scrolling so far
            var timeElapsed = timeCurrent - this.timeStart;

            // calculate next scroll position
            var next = easeInOutQuad(timeElapsed, this.startY, this.distance - this.startY, duration);

            // scroll to it
            window.scrollTo(0, next);

            // check progress
            timeElapsed < duration ? raf(this.loop) // continue scroll loop
            : this.done();
        };

        ScrollTip.prototype.onClick = function onClick(e) {
            this.startY = document.documentElement.scrollTop || document.body.scrollTop;
            if (this.startY > this.distance) {
                return;
            }
            raf(this.loop);
        };

        ScrollTip.prototype.render = function render() {
            var _props = this.props,
                _props$className = _props.className,
                className = _props$className === undefined ? null : _props$className,
                _props$style = _props.style,
                style = _props$style === undefined ? null : _props$style,
                color = _props.color,
                text = _props.text,
                height = _props.height,
                fontSize = _props.fontSize,
                clickScroll = _props.clickScroll;


            return _react2['default'].createElement(
                'div',
                {
                    className: (0, _classnames2['default'])('mola-scroll-tip', className, { 'state-show': this.state.show }),
                    onClick: clickScroll ? this.onClick : null,
                    style: babelHelpers['extends']({}, style, {
                        color: color,
                        fontSize: fontSize,
                        height: (0, _mola.px2rem)(height),
                        lineHeight: (0, _mola.px2rem)(height)
                    }) },
                _react2['default'].createElement(
                    'p',
                    null,
                    _react2['default'].createElement(
                        'span',
                        null,
                        text
                    ),
                    _react2['default'].createElement('i', { style: { borderTopColor: color } })
                )
            );
        };

        return ScrollTip;
    }(_react.Component);

    ScrollTip.displayName = _constants.type;

    ScrollTip.propTypes = {
        height: _react.PropTypes.number.isRequired,
        color: _react.PropTypes.string.isRequired,
        text: _react.PropTypes.string.isRequired,
        fontSize: _react.PropTypes.number.isRequired,
        clickScroll: _react.PropTypes.bool.isRequired
    };

    ScrollTip.defaultProps = {
        color: '#fff',
        text: '滑动查看',
        height: 50,
        fontSize: 14,
        clickScroll: false,
        distance: 200
    };

    exports['default'] = (0, _mola.registerComponent)(_constants.type, _constants.level)(ScrollTip);
});
//# sourceMappingURL=ScrollTip.js.map
