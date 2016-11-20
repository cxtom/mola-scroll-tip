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
            return _this;
        }

        ScrollTip.prototype.componentDidMount = function componentDidMount() {
            document.addEventListener('scroll', this.onScroll);
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

        ScrollTip.prototype.render = function render() {
            var _props = this.props,
                _props$className = _props.className,
                className = _props$className === undefined ? null : _props$className,
                _props$style = _props.style,
                style = _props$style === undefined ? null : _props$style,
                color = _props.color,
                text = _props.text,
                height = _props.height,
                fontSize = _props.fontSize;


            return _react2['default'].createElement(
                'div',
                {
                    className: (0, _classnames2['default'])('mola-scroll-tip', className, { 'state-show': this.state.show }),
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
        fontSize: _react.PropTypes.number.isRequired
    };

    ScrollTip.defaultProps = {
        color: '#fff',
        text: '滑动查看',
        height: 50,
        fontSize: 14
    };

    exports['default'] = (0, _mola.registerComponent)(_constants.type, _constants.level)(ScrollTip);
});
//# sourceMappingURL=ScrollTip.js.map
