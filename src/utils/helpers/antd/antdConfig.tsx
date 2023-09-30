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

const showNotification = (description: string): void => {
  notification.info({
    message: `Notification!`,
    className: styles.messageContainer,
    duration: 3,
    description,
    placement: 'topRight',
  });
};

export default showNotification;
