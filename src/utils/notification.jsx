
import {  notification } from 'antd';



export const openNotification = (type, content ) => {
  notification[type]({
    message: 'Thông báo',
    description: content,
  });
};

notification.config({
  placement: 'bottomRight',
  bottom:24,
  duration: 2,
  rtl: false,
});
