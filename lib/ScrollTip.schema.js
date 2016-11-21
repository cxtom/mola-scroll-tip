(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', './constants', 'react-addons-update', './babelHelpers', './ScrollTip'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('./constants'), require('react-addons-update'), require('./babelHelpers'), require('./ScrollTip'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.constants, global.reactAddonsUpdate, global.babelHelpers, global.ScrollTip);
        global.ScrollTipSchema = mod.exports;
    }
})(this, function (exports, _constants, _reactAddonsUpdate, babelHelpers) {
    'use strict';

    exports.__esModule = true;
    exports.editorProps = exports.level = exports.type = undefined;
    Object.defineProperty(exports, 'type', {
        enumerable: true,
        get: function () {
            return _constants.type;
        }
    });
    Object.defineProperty(exports, 'level', {
        enumerable: true,
        get: function () {
            return _constants.level;
        }
    });

    exports.default = function (props) {

        if (props.clickScroll) {
            return (0, _reactAddonsUpdate2['default'])(DEFAULT_SCHEMA, {
                properties: {
                    $merge: {
                        distance: {
                            'title': '滑动距离',
                            'type': 'number',
                            'default': 200,
                            'min': 100
                        }
                    }
                },
                required: {
                    $push: ['distance']
                }
            });
        }

        return DEFAULT_SCHEMA;
    };

    var _reactAddonsUpdate2 = babelHelpers.interopRequireDefault(_reactAddonsUpdate);

    /**
     * @file 滑动提示组件
     * @author cxtom <cxtom2008@gmail.com>
     */

    var editorProps = exports.editorProps = {
        movable: false,
        resizable: 'none',
        droppable: false,
        selectable: true,
        style: {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0
        }
    };

    var DEFAULT_SCHEMA = {
        type: 'object',
        properties: {
            height: {
                'title': '高度',
                'type': 'number',
                'default': 50
            },
            fontSize: {
                'title': '字体大小',
                'type': 'number',
                'default': 14
            },
            color: {
                type: 'string',
                title: '颜色',
                format: 'color'
            },
            text: {
                'type': 'string',
                'title': '提示文案',
                'default': '滑动查看'
            },
            clickScroll: {
                'type': 'boolean',
                'component': 'Toggle',
                'title': '是否支持点击滑动',
                'default': false
            }
        },
        required: ['color', 'height', 'text', 'fontSize', 'click']
    };
});
//# sourceMappingURL=ScrollTip.schema.js.map
