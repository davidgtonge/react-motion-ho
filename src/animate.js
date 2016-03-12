import React from 'react';
import {map, compose, pick, __, keys, curry} from 'ramda';
import {spring, Motion} from 'react-motion';

function getSettings(defaultStyle, props) {
  const style = compose(
    map(spring),
    pick(__, props),
    keys,
  )(defaultStyle);
  return {style, defaultStyle};
}

function _animate(defaults, Component) {
  return function AnimateWrapper(props) {
    return (
      <Motion {...getSettings(defaults, props)}>
        {(animProps) =>
          <Component {...props} {...animProps} />
        }
      </Motion>
    );
  };
}

export const animate = curry(_animate);
