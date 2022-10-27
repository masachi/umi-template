import React, { useState, useRef } from 'react';
import { useLocation, history } from 'umi';
import {
  Layout,
  Menu,
  notification,
  Dropdown,
  Badge,
  Space,
  Button,
  message,
  List,
} from 'antd';
import {
  UserOutlined,
  NotificationOutlined,
  UnlockOutlined,
  InfoCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import './index.less';

const { Header } = Layout;

const colorSet = (type: string) => {
  switch (type) {
    case '0':
    default:
      return '#7495f7';
    case '2':
      return '#48d12b';
    case '3':
      return '#f7b072';
    case '4':
      return '#ff3232';
  }
};

interface SiteHeaderProps {}

const SiteHeader = (props: SiteHeaderProps) => {
  const noti = useRef(null);

  const [totalMessages, setTotalMessages] = useState([]);

  // 轮询
  // useInterval(() => {
  //     fetchMessages();
  // }, 1000 * 60);

  const [modalState, setModalState] = useState({
    visible: false,
    record: null,
  });

  // 设置已读
  // const {
  //     run: notificationSetReadReq,
  // } = useRequest(
  //     ids =>
  //         normalApi({
  //             method: 'POST',
  //             apiUrl: 'Api/Pm/PmOp/SetRead',
  //             data: {
  //                 PmIds: ids,
  //             },
  //         }),
  //     {
  //         manual: true,
  //         formatResult: (res: any) => res,
  //         onSuccess: data => {
  //
  //         },
  //     },
  // );
  //
  // const {
  //     loading: notificationNotReadMessagesLoading,
  //     run: notificationNotReadMessagesReq,
  // } = useRequest(
  //     () =>
  //         normalApi({
  //             method: 'POST',
  //             apiUrl: 'Api/Pm/PmQuery/GetPersonalMessages',
  //             data: {
  //                 IsNotRead: true,
  //             },
  //         }),
  //     {
  //         manual: true,
  //         formatResult: (res: any) => res,
  //         onSuccess: (data, params) => {
  //
  //         },
  //     },
  // );

  // const fetchMessages = () => {
  //     notificationNotReadMessagesReq();
  // };

  const avatarMenu = (
    <Menu>
      <Menu.Item onClick={() => {}} key="changePassword">
        <span>
          <UnlockOutlined />
          修改密码
        </span>
      </Menu.Item>
      <Menu.Item key="logout" onClick={() => {}}>
        <span>
          <LogoutOutlined /> 退出登录
        </span>
      </Menu.Item>
    </Menu>
  );

  const globalNotificationClk = () => {
    notification.open({
      key: 'global',
      message: '未读消息',
      top: 10,
      onClose: () => {},
      description: (
        <>
          <List
            itemLayout="horizontal"
            className="noti_list"
            dataSource={totalMessages?.filter((d) => !d.IsRead) || []}
            renderItem={(item: any) => (
              <List.Item
                onClick={(e) => {
                  e.stopPropagation();
                  setModalState({
                    visible: true,
                    record: item,
                  });
                }}
              >
                <List.Item.Meta
                  avatar={
                    item.MsgLevel === '4' ? (
                      <CloseCircleOutlined style={{ color: '#ff3232' }} />
                    ) : item.MsgLevel === '2' ? (
                      <CheckCircleOutlined style={{ color: '#48d12b' }} />
                    ) : item.MsgLevel === '3' ? (
                      <ExclamationCircleOutlined style={{ color: '#f7b072' }} />
                    ) : (
                      <InfoCircleOutlined style={{ color: '#7495f7' }} />
                    )
                  }
                  title={
                    <span style={{ color: colorSet(item.MsgLevel) }}>
                      {item.Title}
                    </span>
                  }
                  description={<span>{item.Content}</span>}
                />
              </List.Item>
            )}
          />
          <div className="noti_footer">
            <span
              onClick={(e) => {
                e.stopPropagation();
                notification.close('global');
                // fetchMessages();
                // notReadMessagesReq();
                setTimeout(() => {
                  history.push('/totalMessages');
                }, 200);
              }}
              style={{ cursor: 'pointer', color: '#7495f7' }}
            >
              查看全部消息
            </span>
            <span
              style={{
                cursor: 'pointer',
                color:
                  totalMessages?.filter((d) => !d.IsRead)?.length > 0
                    ? '#7495f7'
                    : '#aaa',
              }}
              onClick={(e) => {
                if (totalMessages?.filter((d) => !d.IsRead)?.length > 0) {
                  // notiSetReadReq(
                  //     totalMessages?.filter(d => !d.IsRead)?.map(d => d.Id),
                  // );
                }
              }}
            >
              全部已读
            </span>
          </div>
        </>
      ),
      className: 'custom-class',
      duration: null,
    });
  };

  return (
    <Header className="site-layout-header">
      <div className="header-right">
        <Space size="middle">
          <Button
            icon={<ExclamationCircleOutlined />}
            onClick={() => {
              window.open('http://192.192.12.85:5005/ChromeSetup64.exe');
            }}
          >
            下载新版浏览器
          </Button>
          <Badge count={totalMessages?.filter((d) => !d.IsRead)?.length || 0}>
            <NotificationOutlined
              onClick={() => globalNotificationClk()}
              className={
                totalMessages?.filter((d) => !d.IsRead)?.length > 0
                  ? 'header-noti shake-left'
                  : ''
              }
              ref={noti}
            />
          </Badge>
          <Dropdown overlay={avatarMenu} trigger={['click']}>
            <UserOutlined />
          </Dropdown>
        </Space>
      </div>
    </Header>
  );
};

export default SiteHeader;
