/**
 * @file 滑动提示组件
 * @author cxtom <cxtom2008@gmail.com>
 */

import update from 'react-addons-update';

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

const DEFAULT_SCHEMA = {
    type: 'object',
    properties: {
        height: {
            'title': '高度',
            'type': 'string',
            'format': 'numeric',
            'formatMinimum': '0',
            'default': '50'
        },
        fontSize: {
            'title': '字体大小',
            'type': 'string',
            'format': 'numeric',
            'formatMinimum': '12',
            'default': '14'
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
    required: ['color', 'height', 'text', 'fontSize']
};

export default function (props) {

    if (props.clickScroll) {
        return update(DEFAULT_SCHEMA, {
            properties: {
                $merge: {
                    distance: {
                        'title': '滑动距离',
                        'type': 'string',
                        'format': 'numeric',
                        'formatMinimum': '100',
                        'default': '200'
                    }
                }
            },
            required: {
                $push: ['distance']
            }
        });
    }

    return DEFAULT_SCHEMA;

}
