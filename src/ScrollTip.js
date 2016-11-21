/**
 * @file 滑动提示组件
 * @author cxtom <cxtom2008@gmail.com>
 */

import React, {Component, PropTypes} from 'react';

import {
    px2rem,
    WINDOW_WIDTH,
    registerComponent
} from 'mola';

import cx from 'classnames';

import {level, type} from './constants';

function easeInOutQuad(t, b, c, d) {
    t /= d / 2;
    if (t < 1) {
        return c / 2 * t * t + b;
    }
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
}

const raf = window.requestAnimationFrame
    || window.webkitRequestAnimationFrame
    || window.mozRequestAnimationFrame
    || function (callback) {
        window.setTimeout(callback.bind(null, Date.now()), 1000 / 60);
    };

export class ScrollTip extends Component {

    constructor(...args) {
        super(...args);
        this.state = {
            show: true
        };
        this.onScroll = this.onScroll.bind(this);
        this.onClick = this.onClick.bind(this);
        this.loop = this.loop.bind(this);
        this.done = this.done.bind(this);

        this.timeStart = null;
        this.distance = null;
    }

    componentDidMount() {
        this.distance = this.props.distance * document.getElementsByTagName('html')[0].clientWidth / WINDOW_WIDTH;
        document.addEventListener('scroll', this.onScroll);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.distance !== this.distance) {
            this.distance = nextProps.distance * document.getElementsByTagName('html')[0].clientWidth / WINDOW_WIDTH;
        }
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

    done() {
        window.scrollTo(0, this.distance);
        this.setState({show: false});
    }

    loop(timeCurrent) {
        if (!this.timeStart) {
            this.timeStart = timeCurrent;
        }

        const duration = 300 * (1 - this.startY / this.distance);

        // determine time spent scrolling so far
        const timeElapsed = timeCurrent - this.timeStart;

        // calculate next scroll position
        const next = easeInOutQuad(timeElapsed, this.startY, this.distance - this.startY, duration);

        // scroll to it
        window.scrollTo(0, next);

        // check progress
        timeElapsed < duration
          ? raf(this.loop)       // continue scroll loop
          : this.done();
    }

    onClick(e) {
        this.startY = document.documentElement.scrollTop || document.body.scrollTop;
        if (this.startY > this.distance) {
            return;
        }
        raf(this.loop);
    }

    render() {

        let {
            className = null,
            style = null,
            color,
            text,
            height,
            fontSize,
            clickScroll
        } = this.props;

        return (
            <div
                className={cx('mola-scroll-tip', className, {'state-show': this.state.show})}
                onClick={clickScroll ? this.onClick : null}
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
    fontSize: PropTypes.number.isRequired,
    clickScroll: PropTypes.bool.isRequired
};

ScrollTip.defaultProps = {
    color: '#fff',
    text: '滑动查看',
    height: 50,
    fontSize: 14,
    clickScroll: false,
    distance: 200
};

export default registerComponent(type, level)(ScrollTip);
