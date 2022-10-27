import { useEffect } from 'react';

const events = [
  'load',
  'mousemove',
  'mousedown',
  'click',
  'scroll',
  'keypress',
];

const DEFAULT_EXPIRE_SECONDS = 15 * 60;

const AutoLogoutLayout = ({
  children,
  getExpireSeconds,
  onExpire,
  expireSecondsDataKey,
}: {
  children: any;
  getExpireSeconds?: () => Promise<any>;
  onExpire?: () => void;
  expireSecondsDataKey?: string;
}) => {
  let idleWorker;

  const initializeUserInfoAndEventListener = async () => {
    console.log('auto logout timer initialize...');

    let userInfoResponse = undefined;
    if (getExpireSeconds) {
      userInfoResponse = await getExpireSeconds();
    }

    idleWorker = new SharedWorker('/idleWorker.js', 'daemon-shared-worker');

    idleWorker.port.postMessage({
      type: 'INITIALIZE',
      expireSeconds: userInfoResponse
        ? userInfoResponse[expireSecondsDataKey]
        : DEFAULT_EXPIRE_SECONDS,
    });

    idleWorker.port.onmessage = (event) => {
      if (event.data?.type === 'EXPIRE') {
        onExpire && onExpire();
      }

      if (event.data?.type === 'LEAVE') {
        console.log('a port leave');
      }

      if (event.data?.type === 'RESET_CLOSE_EXPIRE') {
        let expireItem = localStorage.getItem('expireItem');
        if (expireItem) {
          localStorage.removeItem('expireItem');
        }
      }
    };

    Object.values(events).forEach((item) => {
      window.addEventListener(item, () => {
        idleWorker.port.postMessage({
          type: 'OPERATE',
          timestamp: new Date().getTime(),
        });
      });
    });

    // initialize onload
    window.onbeforeunload = (event) => {
      let closeLocalStorage = {
        closeTime: new Date().getTime(),
        expireSeconds: userInfoResponse
          ? userInfoResponse[expireSecondsDataKey]
          : DEFAULT_EXPIRE_SECONDS,
      };
      localStorage.setItem('expireItem', JSON.stringify(closeLocalStorage));

      // 清理一下timer & event listener
      if (idleWorker) {
        // idleWorker.port.postMessage({ type: 'TERMINATE' });
        idleWorker.port.close();
        idleWorker.port.postMessage({
          type: 'PORT_CLOSE',
        });

        Object.values(events).forEach((item) => {
          window.removeEventListener(item, () => {});
        });
      }
    };
  };

  const checkHasBeenExpiredWithLocalStorageExpireSecond = () => {
    let closeLocalStorageString = localStorage.getItem('expireItem');
    if (closeLocalStorageString) {
      let closeLocalStorage = JSON.parse(closeLocalStorageString);
      if (closeLocalStorage) {
        if (
          new Date().getTime() - closeLocalStorage?.closeTime >=
          closeLocalStorage.expireSeconds * 1000
        ) {
          onExpire && onExpire();
        }
      }
    }
  };

  useEffect(() => {
    checkHasBeenExpiredWithLocalStorageExpireSecond();

    initializeUserInfoAndEventListener();
  }, []);

  return children;
};

export default AutoLogoutLayout;
