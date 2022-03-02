import { notification } from 'antd';
import { toasterType } from './toasterTypes';

export const toasterMiddleware = (store) => (next) => (action) => {
  next(action);
  if (action.meta && action.meta.toaster) {
    let {
      type = toasterType.default,
      message = '',
      description = '',
      placement,
      style = {},
    } = action.meta.toaster;
    if (!notification) {
      return;
    }
    if (typeof message !== 'string') message = '';
    if (typeof description !== 'string') description = '';

    if (type === toasterType.default) {
      notification.open({ message, description, placement, style });
    } else {
      notification[type]({ message, description, placement, style });
    }
  }
};
