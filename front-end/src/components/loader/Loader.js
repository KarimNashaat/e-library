import React from 'react';
import PropTypes from 'prop-types';
import './Loader.css';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const Loader = (props) => {
  const {
    children,
    hideChildren = true,

    show = true,
    fullscreen = false,
    className = '',
    backgroundOpacity = 1,
    backgroundStyle = {},

    centerSpinner = false,
    spinnerStyle = {},
    spinnerColor = 'inherit',
    spinnerSize = 48,
  } = props;
  const antIcon = (
    <LoadingOutlined
      style={{ fontSize: spinnerSize, color: spinnerColor }}
      color={'rgb(100,100,100)'}
      spin
    />
  );

  if (!show) {
    return <>{children}</>;
  }

  let spinnerContainerClasses = 'loader';
  if (fullscreen) spinnerContainerClasses += ' loader-fullscreen';

  let spinnerClasses = '';
  if (centerSpinner || fullscreen) spinnerClasses += ' center-spinner';

  let renderChildren = hideChildren ? null : children;
  return (
    <>
      <div
        className={`${spinnerContainerClasses} ${className}`}
        style={{ ...backgroundStyle, opacity: backgroundOpacity }}
      >
        <Spin
          indicator={antIcon}
          className={spinnerClasses}
          style={spinnerStyle}
        />
      </div>

      {renderChildren}
    </>
  );
};

Loader.propTypes = {
  hideChildren: PropTypes.bool,

  show: PropTypes.bool,
  fullscreen: PropTypes.bool,
  className: PropTypes.string,
  backgroundOpacity: PropTypes.number,
  backgroundStyle: PropTypes.object,

  centerSpinner: PropTypes.bool,
  spinnerStyle: PropTypes.object,
  spinnerColor: PropTypes.string,
  spinnerSize: PropTypes.number,
};

export default Loader;
