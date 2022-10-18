const DEFAULT_EXPIRE_SECONDS = 15 * 60;

const DEFAULT_INTERVAL_SECONDS = 1;

let timer;
let interval;

let operateTimestamp;

let ports = [];

const handleLogoutInterval = (expireSeconds, port) => {
  console.log(`auto logout timer interval`);

  interval = setInterval(() => {
    if (new Date().getTime() - operateTimestamp >= expireSeconds * 1000) {
      if (interval) {
        if (ports.length > 0) {
          ports.forEach((port) => {
            port.postMessage({
              type: 'EXPIRE',
            });
          });
          resetInterval(interval);
          self.close();
        }
      }
    } else {
      ports.forEach((port) => {
        port.postMessage({
          type: 'RESET_CLOSE_EXPIRE',
        });
      });
    }
  }, DEFAULT_INTERVAL_SECONDS * 1000);
};

const resetInterval = () => {
  if (interval) {
    clearTimeout(interval);
  }
};

onconnect = (e) => {
  const port = e.ports[0];

  ports.push(port);

  port.addEventListener('message', (event) => {
    // initialize 表示 初始化  terminate 表示 终止
    if (event.data?.type === 'INITIALIZE') {
      self.window = event.data?.window;
      console.log('auto logout timer worker initializing...');
      console.log(event.data?.expireSeconds || DEFAULT_EXPIRE_SECONDS);
      operateTimestamp = new Date().getTime();
      resetInterval();
      handleLogoutInterval(event.data?.expireSeconds || DEFAULT_EXPIRE_SECONDS);
    }

    // terminate deprecated
    if (event.data?.type === 'TERMINATE') {
      console.log('auto logout timer worker destroy...');
    }

    if (event.data?.type === 'OPERATE') {
      console.log('auto logout timer worker resetting...');
      operateTimestamp = event.data?.timestamp;
    }

    // port close
    if (event.data?.type === 'PORT_CLOSE') {
      ports.splice(ports.indexOf(port), 1);
      if (ports.length === 0) {
        self.close();
      }
      ports.forEach((port) => {
        port.postMessage({
          type: 'LEAVE',
          portSize: ports.length,
        });
      });
    }
  });

  port.postMessage({
    type: 'JOIN',
    portSize: ports.length,
  });

  port.start(); // Required when using addEventListener. Otherwise called implicitly by onmessage setter.
};
