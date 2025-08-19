// async function checkActive(timeout = 100): Promise<boolean> {
//   return new Promise((resolve) => {
//     if (!getIsSupported()) {
//       // getIsSupported() 대신 isSupported() 사용
//       resolve(false);
//       return;
//     }

//     let hasData = false;
//     const handler = (e: DeviceOrientationEvent) => {
//       if (e.alpha !== null || e.beta !== null || e.gamma !== null) {
//         hasData = true;
//         clearTimeout(timer);
//         window.removeEventListener("deviceorientation", handler);
//         resolve(true);
//       }
//     };

//     window.addEventListener("deviceorientation", handler);
//     const timer = setTimeout(() => {
//       window.removeEventListener("deviceorientation", handler);
//       resolve(hasData);
//     }, timeout);
//   });
// }

// async function checkActive1(timeout = 200): Promise<boolean> {
//   return new Promise((resolve) => {
//     if (!getIsSupported()) {
//       resolve(false);
//       return;
//     }

//     let resolved = false;

//     const cleanup = () => {
//       window.removeEventListener("deviceorientation", handler);
//       clearTimeout(timer);
//     };

//     const handler = (e: DeviceOrientationEvent) => {
//       if (e.alpha !== null || e.beta !== null || e.gamma !== null) {
//         if (!resolved) {
//           resolved = true;
//           cleanup();
//           resolve(true);
//         }
//       }
//     };

//     window.addEventListener("deviceorientation", handler);

//     const timer = setTimeout(() => {
//       if (!resolved) {
//         resolved = true;
//         cleanup();
//         resolve(false);
//       }
//     }, timeout);
//   });
// }
