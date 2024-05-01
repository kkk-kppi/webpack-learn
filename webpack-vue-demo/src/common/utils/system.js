/**
 * @description 获取当前浏览器内核及版本信息
 * @returns {browser}
 */
export function getBrowserInfo() {
  const browser = {};
  if (navigator.userAgent.indexOf("Firefox") !== -1) {
    browser.name = "Firefox";
    browser.version = navigator.userAgent.match(/Firefox\/(\d+\.\d+)/)[1];
  } else if (navigator.userAgent.indexOf("Chrome") !== -1) {
    browser.name = "Chrome";
    browser.version = navigator.userAgent.match(/Chrome\/(\d+\.\d+)/)[1];
  } else if (navigator.userAgent.indexOf("Safari") !== -1) {
    browser.name = "Safari";
    browser.version = navigator.userAgent.match(/Version\/(\d+\.\d+)/)[1];
  } else if (navigator.userAgent.indexOf("Opera") !== -1) {
    browser.name = "Opera";
    browser.version = navigator.userAgent.match(/Opera\/(\d+\.\d+)/)[1];
  } else if (
    navigator.userAgent.indexOf("IE") !== -1 ||
    navigator.userAgent.indexOf("Trident") !== -1
  ) {
    browser.name = "IE";
    browser.version =
      navigator.userAgent.match(/MSIE\s(\d+\.\d+)/)[1] ||
      navigator.userAgent.match(/Trident\/7\.0; rv:(\d+\.\d+)/)[1];
  }
  return browser;
}

/**
 * @description 获取当前设备的电量信息
 * @returns {Battery}
 */
export function getBattery() {
  return new Promise((resolve, reject) => {
    try {
      navigator
        .getBattery()
        .then(({ level, charging, chargingTime, dischargingTime }) => {
          resolve({
            level, // 剩余电量 0 - 1
            charging, // boolean 是否正在充电
            chargingTime, // 还剩n秒充满
            dischargingTime, // 还剩n秒用完
          });
        });
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * @description 获取当前设备的网络信息
 */
export function getNetwork() {
  return new Promise((resolve, reject) => {
    try {
      resolve(navigator.connection);
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * @description 获取当前设备的定位信息
 */
export function getLocation() {
  return new Promise((resolve, reject) => {
    try {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve(position);
        },
        (error) => {
          reject(error);
        }
      );
    } catch (error) {
      reject(error);
    }
  });
}
