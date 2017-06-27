/* @flow */
/* eslint-disable react/no-children-prop */

import React, { Component, PropTypes } from 'react';
import {
  Motion,
  spring,
} from 'react-motion';
import type {
  OpaqueConfig,
  SpringHelperConfig,
} from 'react-motion/lib/Types';

/**
 * Set min / max limit on a value.
 *
 * @param {int} val - The limiting value.
 * @param {int} min - Minimum boundary.
 * @param {int} max - Maximum boundary.
 * @returns {int} Either the value itself, min or max.
 */
export const valBetween = (
  val: number,
  min: number,
  max: number,
): number => (Math.min(max, Math.max(min, val)));

type DefaultPropsType = {
  trailColor: string;
  trailWidth: number;
  strokeColor: string;
  strokeWidth: number;
  stiffness: number;
  damping: number;
  start: boolean;
  temporaryStopAtPercent: number;
  temporaryStopAtDeg: number;
};

type PropsType = {
  trailColor: string;
  trailWidth: number;
  strokeColor: string;
  strokeWidth: number;
  stiffness: number;
  damping: number;
  start: boolean;
  complete: boolean;
  temporaryStopAtPercent: number;
  temporaryStopAtDeg: number;
  onCompleteEnd: Function;
  onStartEnd: Function;
};

type CircleStyleType = {
  percent: OpaqueConfig,
  rotation: OpaqueConfig,
};

type CircleMotionType = {
  percent: number,
  rotation: number,
};

export const getStylesForTrail = (radius: number) => ({
  cx: '50%',
  cy: '50%',
  r: radius,
  fill: 'transparent',
});

export const getStyleForStroke = (
  radius: number,
  rotation: number,
  percent: number,
): Object => {
  const maxDeg = 2 * Math.PI * radius;
  const percentRatio = percent / 100;
  const deg = maxDeg * percentRatio;

  return {
    cx: '50%',
    cy: '50%',
    fill: 'transparent',
    transformOrigin: 'center',
    r: radius,
    transform: `rotate(${rotation}deg)`,
    strokeDasharray: `${deg}, ${maxDeg}`,
  };
};

/**
 * CircularIntegrationProgress
 *
 * material design circular integration progress
 */

class CircularIntegrationProgress extends Component<DefaultPropsType, PropsType, void> {
  static propTypes = {
    complete: PropTypes.bool.isRequired,
    start: PropTypes.bool,
    temporaryStopAtPercent: PropTypes.number,
    temporaryStopAtDeg: PropTypes.number,
    trailColor: PropTypes.string,
    trailWidth: PropTypes.number,
    strokeColor: PropTypes.string,
    strokeWidth: PropTypes.number,
    stiffness: PropTypes.number,
    damping: PropTypes.number,
    onCompleteEnd: PropTypes.func,
    onStartEnd: PropTypes.func,
  };

  static defaultProps = {
    start: false,
    temporaryStopAtPercent: 90,
    temporaryStopAtDeg: 250,
    trailColor: '#FFB650',
    trailWidth: 5,
    strokeColor: '#F47D12',
    strokeWidth: 5,
    stiffness: 100,
    damping: 50,
  };

  constructor(props: PropsType) {
    super(props);

    this._handleEndAnimation = this._handleEndAnimation.bind(this);
  }

  _handleEndAnimation: () => void;

  _handleEndAnimation() {
    const {
      start,
      complete,
      onCompleteEnd,
      onStartEnd,
    } = this.props;

    if (complete && typeof onCompleteEnd === 'function') {
      onCompleteEnd();
      return;
    }

    if (!complete && start && typeof onStartEnd === 'function') {
      onStartEnd();
    }
  }

  render(): React.Element<*> {
    const {
      trailColor,
      trailWidth,
      strokeColor,
      strokeWidth,
      stiffness,
      damping,
      start,
      complete,
      temporaryStopAtPercent,
      temporaryStopAtDeg,
    } = this.props;

    const radius = (56 - strokeWidth) / 2;
    const circleConfig: SpringHelperConfig = {
      stiffness,
      damping,
      precision: 10,
    };

    const rotationConfig: SpringHelperConfig = {
      stiffness,
      damping,
      precision: 15,
    };

    let circleStyle: CircleStyleType = {
      percent: spring(0, circleConfig),
      rotation: spring(0, rotationConfig),
    };

    if (!complete && start) {
      const guardedRotationDeg = valBetween(temporaryStopAtDeg, 0, 270);
      const guardedPercent = valBetween(temporaryStopAtPercent, 0, 100);

      circleStyle = {
        percent: spring(guardedPercent, circleConfig),
        rotation: spring(guardedRotationDeg, rotationConfig),
      };
    }

    if (complete) {
      circleStyle = {
        percent: spring(100, circleConfig),
        rotation: spring(270, rotationConfig),
      };
    }

    return (
      <Motion
        style={circleStyle}
        onRest={this._handleEndAnimation}
        children={(interpolatedStyle: CircleMotionType): React.Element<*> => {
          const {
            rotation,
            percent,
          } = interpolatedStyle;
          const trailStyles = getStylesForTrail(radius);
          const strokeStyles = getStyleForStroke(radius, rotation, percent);

          return (
            <svg
              width="56"
              height="56"
              viewBox="0 0 56 56"
            >
              {/* trail */}
              <circle
                stroke={trailColor}
                strokeWidth={trailWidth}
                style={trailStyles}
              />

              {/* stroke */}
              <circle
                stroke={strokeColor}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                style={strokeStyles}
              />
            </svg>
          );
        }}
      />
    );
  }
}

export default CircularIntegrationProgress;