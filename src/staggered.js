import React from 'react';
import {map, compose, pick, __, keys, curry} from 'ramda';
import {StaggeredMotion, spring} from 'react-motion';

const getStyles = curry((pickKeys, springSettings, props, prevStyles) => {
  return prevStyles.map((config, idx) => {
    if (idx === 0) {
      return pickKeys(props);
    }
    return compose(
      map((val) => spring(val, springSettings)),
      pickKeys
    )(prevStyles[idx - 1]);
  });
});

function getStaggeredSettings(defaultStyles, springSettings, props) {
  const pickStyleKeys = pick(keys(defaultStyles[0]));
  const styles = getStyles(pickStyleKeys, springSettings, props);
  return {defaultStyles, styles};
}

function _staggered(defaults, springSettings, Component) {
  return function StaggeredAnimateWrapper(props) {
    function renderArray(animPropsArray) {
      const items = animPropsArray.map((animProps, i) => {
        return (
          <Component {...props} {...animProps} i={i} key={i} length={animPropsArray.length} />
        );
      });
      return (
        <div>{items}</div>
      );
    }

    return (
      <StaggeredMotion {...getStaggeredSettings(defaults, springSettings, props)}>
        {renderArray}
      </StaggeredMotion>
    );
  };
}

export const staggered = curry(_staggered);
