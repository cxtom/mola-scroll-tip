/**
 * @file 滑动提示组件
 * @author cxtom <cxtom2008@gmail.com>
 */

export {type, level} from './constants';

export const editorProps = {
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

export default {
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
