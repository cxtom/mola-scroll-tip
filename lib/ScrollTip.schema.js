(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', './constants'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('./constants'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.constants);
        global.ScrollTipSchema = mod.exports;
    }
})(this, function (exports, _constants) {
    'use strict';

    exports.__esModule = true;
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

    exports['default'] = {
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
            }
        },
        required: ['color', 'height', 'text', 'fontSize']
    };
});
//# sourceMappingURL=ScrollTip.schema.js.map
