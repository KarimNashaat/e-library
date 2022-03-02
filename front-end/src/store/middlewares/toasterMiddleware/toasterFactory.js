import { toasterPlacement, toasterType } from './toasterTypes';

export const toaster = (
  type = toasterType.default,
  message = '',
  description = '',
  style = {},
  placement = toasterPlacement.bottomRight
) => {
  return {
    toaster: {
      type,
      message,
      description,
      style,
      placement,
    },
  };
};
