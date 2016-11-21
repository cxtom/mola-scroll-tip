/**
 * @file Video example
 * @author cxtom <cxtom2008@gamil.com>
 */

import React from 'react';
import ScrollTip from '../src/ScrollTip.js';
import ReactDOM from 'react-dom';

import {getRootFontSize} from 'mola';

import './index.styl';

document.getElementsByTagName('html')[0].style['font-size'] = getRootFontSize(document.documentElement.clientWidth) + 'px';

ReactDOM.render(
    <div id="wrapper">
        <p>haaaaaa</p>
        <ScrollTip clickScroll color="#333" />
    </div>,
    document.getElementById('app')
);
