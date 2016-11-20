/**
 * @file 滑动提示组件
 * @author cxtom <cxtom2008@gmail.com>
 */

import React, {Component, PropTypes} from 'react';

import {
    px2rem,
    registerComponent
} from 'mola';

import cx from 'classnames';

import {level, type} from './constants';

export class ScrollTip extends Component {

    constructor(...args) {
        super(...args);
        this.state = {
            show: true
        };
        this.onScroll = this.onScroll.bind(this);
    }

    componentDidMount() {
        document.addEventListener('scroll', this.onScroll);
    }

    componentWillUnmount() {
        this.removeEvent();
    }

    removeEvent() {
        document.removeEventListener('scroll', this.onScroll);
    }

    onScroll(e) {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        if (scrollTop > 100) {
            this.setState({show: false});
            this.removeEvent();
        }
    }

    render() {

        let {
            className = null,
            style = null,
            color,
            text,
            height,
            fontSize
        } = this.props;

        return (
            <div
                className={cx('mola-scroll-tip', className, {'state-show': this.state.show})}
                style={{
                    ...style,
                    color,
                    fontSize,
                    height: px2rem(height),
                    lineHeight: px2rem(height)
                }}>
                <p>
                    <span>{text}</span>
                    <i style={{borderTopColor: color}}></i>
                </p>
            </div>
        );
    }

}

ScrollTip.displayName = type;

ScrollTip.propTypes = {
    height: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    fontSize: PropTypes.number.isRequired
};

ScrollTip.defaultProps = {
    color: '#fff',
    text: '滑动查看',
    height: 50,
    fontSize: 14
};

export default registerComponent(type, level)(ScrollTip);
