import { notification } from 'antd';
import React from 'react';
import styles from './andt.module.scss';
import exitIcon from '@/assets/images/svg/antd-exit.svg';

notification.config({
  maxCount: 2,
  closeIcon: (
    <span className="ant-notification-close-x">
      <span role="img" aria-label="close" className="anticon anticon-close ant-notification-close-icon">
        <img className={styles.exitBtn} src={exitIcon} alt="close message icon" />
      </span>
    </span>
  ),
});

const configObj = {
  className: styles.messageContainer,
  duration: 3,
  message: '',
  description: '',
  placement: 'topRight',
};

export const showNotification = (description: string): void => {
  notification.info({
    ...configObj,
    message: `Notification!`,
    description,
    placement: 'topRight',
  });
};

export const showError = (description: string): void => {
  notification.error({
    ...configObj,
    message: `Error!`,
    description,
    placement: 'topRight',
  });
};

export const showSuccsess = (description: string): void => {
  notification.success({
    ...configObj,
    message: `Success!`,
    description,
    placement: 'topRight',
  });
};
