import { useState, useCallback, useEffect } from "react";

type GeolocationType = "default" | "getCurrentPosition" | "watchPosition";
type GeolocationState =
  | "position_unsupported" // navigator.geolocation API 자체를 지원하지 않을 때
  | `permission_${PermissionState}` // 예: "permission_granted", "permission_denied", "permission_prompt"
  | "permission_unsupported" // Permissions API 자체를 지원하지 않을 때
  | "permission_error" // 권한 쿼리 중 알 수 없는 오류 발생 시
  | "position_unavailable" // 위치 정보를 가져올 수 없을 때 (GeolocationPositionError.POSITION_UNAVAILABLE)
  | "position_timeout" // 위치 정보를 가져오는 데 시간 초과 (GeolocationPositionError.TIMEOUT)
  | "unknown_error"; // 그 외 알 수 없는 오류 발생 시

type UseGeolocationCurrentPositionOptions = {
  fetchOnMount?: boolean; // 컴포넌트 마운트 시 자동 요청 여부 (기본값: true)
  permissionChange?: boolean; // permission change를 반영 여부 (기본값: true)
  positionOptions?: PositionOptions; // Geolocation API에 전달할 설정 값
};

// Geolocation API의 기본 기능(getCurrentPosition, watchPosition) 지원 여부 확인
const isGeolocationSupported = (type: GeolocationType = "default"): boolean => {
  if (typeof window === "undefined" || typeof navigator === "undefined") return false;
  const geo = navigator.geolocation;
  if (!geo || typeof geo !== "object") return false;
  if (type === "getCurrentPosition") return typeof geo.getCurrentPosition === "function";
  if (type === "watchPosition") return typeof geo.watchPosition === "function" && typeof geo.clearWatch === "function";
  return true;
};

// Permissions API (navigator.permissions.query) 지원 여부 확인
const isNavigatorPermissionSupported = (): boolean => {
  return typeof navigator !== "undefined" && "permissions" in navigator && typeof navigator.permissions.query === "function";
};

// Geolocation API의 현재 권한 상태를 비동기적으로 확인
const getPermissionState = async (type: GeolocationType = "default"): Promise<GeolocationState> => {
  if (!isGeolocationSupported(type)) return "position_unsupported";
  if (!isNavigatorPermissionSupported()) return "permission_unsupported";
  try {
    const permission = await navigator.permissions.query({ name: "geolocation" as PermissionName });
    const state = permission.state;
    return state === "granted" || state === "prompt" || state === "denied" ? `permission_${state}` : "permission_error";
  } catch {
    return "unknown_error";
  }
};

const DEFAULT_POSITION_OPTIONS: PositionOptions = { enableHighAccuracy: false, timeout: 5000, maximumAge: 0 };

export const useGeolocationCurrentPosition = (options: UseGeolocationCurrentPositionOptions) => {
  const { fetchOnMount = true, permissionChange = true, positionOptions = DEFAULT_POSITION_OPTIONS } = options;

  const [supported, setSupported] = useState(isGeolocationSupported("getCurrentPosition"));

  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState<GeolocationPosition | null>(null);

  useEffect(() => {
    const initialize = async () => {};
    initialize();
  }, []);

  useEffect(() => {}, []);

  return {};
};

// // Geolocation API의 현재 권한 상태를 비동기적으로 확인
// const geolocationPermissionState = async (type: "default" | "getCurrentPosition" | "watchPosition" = "default"): Promise<GeolocationState> => {
//   if (!geolocationPositionSupported(type)) return "position_unsupported";
//   if (!geolocationPermissionSupported()) return "";
//   try {
//     const permission = await navigator.permissions.query({ name: "geolocation" as PermissionName });
//     const state = permission.state;
//     return state === "granted" || state === "prompt" || state === "denied" ? `permission_${state}` : "permission_error";
//   } catch {
//     return "unknown_error";
//   }
// };

// const geolocationPositionErrorState = (e: GeolocationPositionError): GeolocationState => {
//   if (e.code === 1 || e.PERMISSION_DENIED) return "permission_denied";
//   if (e.code === 2 || e.POSITION_UNAVAILABLE) return "position_unavailable";
//   if (e.code === 3 || e.TIMEOUT) return "position_timeout";

//   // 알수 없는 오류
//   return "unknown_error";
// };

// export const useGeolocationCurrentPosition = (options: UseGeolocationCurrentPositionOptions) => {
//   const { fetchOnMount = true, permissionChange = true, positionOptions = DEFAULT_POSITION_OPTIONS } = options;

//   const [supported, setSupported] = useState();

//   const [] = useState();
//   const [isLoading, setIsLoading] = useState(false);
//   const [position, setPosition] = useState<GeolocationPosition | null>(null);

//   const fetchPosition = useCallback(async () => {
//     try {
//       setIsLoading(() => true);
//       await navigator.geolocation.getCurrentPosition(
//         (ev) => {
//           setPosition(ev);
//         },
//         (er) => {
//           console.log(er);
//         },
//         positionOptions
//       );
//     } catch {
//     } finally {
//       setIsLoading(() => false);
//     }
//   }, [positionOptions]);

//   useEffect(() => {
//     const initialize = async () => {
//       const positionSupported = geolocationPositionSupported("getCurrentPosition");
//       const permissionSupported = await geolocationPermissionState("getCurrentPosition");
//     };
//     initialize();
//   }, []);

//   useEffect(() => {
//     if (!permissionChange) return;
//   }, [permissionChange]);

//   // useEffect(() => {
//   //   const initialize = async () => {
//   //     const checkSupported = geolocationPositionSupported("getCurrentPosition");
//   //     const checkPermission = await geolocationPermissionState("getCurrentPosition");

//   //     if (fetchOnMount && checkSupported && checkPermission === "permission_granted") {
//   //       try {
//   //         navigator.geolocation.getCurrentPosition(
//   //           (v) => setPosition(v),
//   //           (e) => {
//   //             if (e.code === 1 || e.PERMISSION_DENIED) {
//   //               return;
//   //             }

//   //             if (e.code === 2 || e.POSITION_UNAVAILABLE) {
//   //               return;
//   //             }

//   //             if (e.code === 3 || e.TIMEOUT) {
//   //               return;
//   //             }

//   //             // 알수 없는 오류
//   //             return;
//   //           }
//   //         );
//   //       } catch {}
//   //     }
//   //   };
//   //   initialize();
//   // }, [fetchOnMount]);

//   return { fetchPosition, position };
// };

// export const useGeolocationWatchPosition = (options: UseGeolocationWatchPositionOptions) => {
//   const { fetchOnMount = true, permissionChange = true, positionOptions = DEFAULT_POSITION_OPTIONS } = options;

//   return {};
// };

//   const fetchPosition = useCallback(async () => {}, [positionOptions, state]);

//   useEffect(() => {
//     const initialize = async () => {
//       const checkState = await geolocationPermissionState();
//       setState(checkState);

//       if (fetchOnMount && checkState === "permission_granted") {
//       }
//     };
//     initialize();
//   }, [fetchOnMount]);

//   return { supported, state, isLoading, position, fetchPosition };
// };

//   useEffect(() => {
//     const initialize = async () => {};
//     initialize();
//   }, []);

//   return { isLoading, position, fetchPosition };
// };

//   const [supported, setSupported] = useState<boolean>(() => geolocationSupported("getCurrentPosition"));
//   const [permission, setPermission] = useState<GeolocationPermission | null>(() => (!supported ? "geolocation_unsupported" : "permission_unavailable"));

//   useEffect(() => {
//     const initialize = async () => {
//       const checkSupported = geolocationSupported("getCurrentPosition");
//       setSupported(checkSupported);

//       const checkPermission = await geolocationPermission("getCurrentPosition");
//       setPermission(checkPermission);

//       if (fetchOnMount && checkPermission === "permission_granted") {
//       }
//     };
//     initialize();
//   }, [fetchOnMount, positionOptions]);

//   useEffect(() => {
//     let permissionStatus: PermissionStatus | null = null;
//     const handlePermissionChange = async () => {
//       const perm = await geolocationPermission("getCurrentPosition");
//       setPermission(perm);
//     };

//     navigator.permissions.query({ name: "geolocation" }).then((status) => {
//       permissionStatus = status;
//       permissionStatus.onchange = handlePermissionChange;
//     });

//     return () => {
//       if (permissionStatus) {
//         permissionStatus.onchange = null;
//       }
//     };
//   }, []);

//   return { isLoading, position, permission, fetchPosition };
// };

//   const [supported, setSupported] = useState<boolean>(() => geolocationSupported("getCurrentPosition"));
//   const [permission, setPermission] = useState<GeolocationPermission | null>(!supported ? "geolocation_unsupported" : null);

//   const didFetchRef = useRef(false);

//   const fetchPosition = useCallback(async () => {
//     if (!supported) return;
//     setLoading(true);
//     try {
//       const pos = await new Promise<GeolocationPosition>((resolve, reject) => {
//         navigator.geolocation.getCurrentPosition(resolve, reject, positionOptions);
//       });
//       setPosition(pos);
//       setPermission("permission_granted");
//     } catch (error) {
//       const geoError = error as GeolocationPositionError;
//       if (geoError.code === geoError.PERMISSION_DENIED) {
//         setPermission("permission_denied");
//       } else {
//         setPermission("permission_error");
//       }
//       setPosition(null);
//     } finally {
//       setLoading(false);
//     }
//   }, [positionOptions, supported]);

//   useEffect(() => {
//     const initialize = async () => {
//       const perm = await geolocationPermission("getCurrentPosition");
//       setPermission(perm);
//       if (fetchOnMount && !didFetchRef.current && perm === "permission_granted") {
//         didFetchRef.current = true;
//         await fetchPosition();
//       }
//     };
//     initialize();

//     let permissionStatus: PermissionStatus | null = null;
//     const handlePermissionChange = async () => {
//       const perm = await geolocationPermission("getCurrentPosition");
//       setPermission(perm);
//     };
//     navigator.permissions.query({ name: "geolocation" }).then((status) => {
//       permissionStatus = status;
//       permissionStatus.onchange = handlePermissionChange;
//     });

//     return () => {
//       if (permissionStatus) {
//         permissionStatus.onchange = null;
//       }
//     };
//   }, [fetchOnMount, fetchPosition]);

//   return { supported, permission, loading, position, fetchPosition };
// };

// export const useGeolocationCurrentPosition = (options: UseGeolocationCurrentPositionOptions): UseGeolocationCurrentPosition => {
//   const { fetchOnMount = true, positionOptions } = options;

//   const [supported, setSupported] = useState<boolean>(() => geolocationSupported("getCurrentPosition"));
//   const [permission, setPermission] = useState<GeolocationPermission | null>(!geolocationSupported("getCurrentPosition") ? "geolocation_unsupported" : "permission_unavailable");

//   const [loading, setLoading] = useState(false);
//   const [position, setPosition] = useState<GeolocationPosition | null>(null);

//   const didFetchRef = useRef(false);

//   const fetchPosition = useCallback(async () => {}, []);

//   useEffect(() => {
//     if (fetchOnMount && !didFetchRef.current) {
//       didFetchRef.current = true;
//     }
//   }, [fetchOnMount]);

//   return { supported, permission, loading, position, fetchPosition };
// };

// 0: "불분명한 오류가 발생하였습니다.",
// 1: "위치 정보 읽기가 거부 되었습니다.",
// 2: "위치 정보를 읽을 수 없습니다.",
// 3: "위치 정보 요청이 시간 초과되었습니다.",

// export const useGeolocationCurrentPosition = (options?: UseGeolocationCurrentPositionOptions) => {
//   const [state, setState] = useState<GeolocationState>({
//     loading: true,
//     position: null,
//     error: null,
//     permission: null,
//   });

//   const getPosition = useCallback(async () => {
//     setState((prevState) => ({ ...prevState, loading: true, error: null }));

//     if (!geolocationSupported("getCurrentPosition")) {
//       setState({
//         loading: false,
//         position: null,
//         error: { code: 0, message: "Geolocation not supported by this browser." },
//         permission: "unsupported",
//       });
//       return;
//     }

//     const currentPermission = await geolocationPermission();
//     setState((prevState) => ({ ...prevState, permission: currentPermission }));

//     if (currentPermission === "denied") {
//       setState({
//         loading: false,
//         position: null,
//         error: { code: 1, message: "Geolocation permission denied." },
//         permission: "denied",
//       });
//       return;
//     }

//     // 'prompt'나 'granted' 상태일 때만 위치 요청을 시도합니다.
//     if (currentPermission !== "granted" && currentPermission !== "prompt") {
//       setState({
//         loading: false,
//         position: null,
//         error: { code: 0, message: `Geolocation permission status is ${currentPermission}. Cannot get position.` },
//         permission: currentPermission,
//       });
//       return;
//     }

//     const successHandler = (pos: GeolocationPosition) => {
//       setState({
//         loading: false,
//         position: pos,
//         error: null,
//         permission: "granted", // 성공적으로 위치를 가져왔으므로 'granted'로 간주
//       });
//     };

//     const errorHandler = (err: GeolocationPositionError) => {
//       setState({
//         loading: false,
//         position: null,
//         error: { code: err.code, message: err.message },
//         // 에러 발생 시의 권한 상태는 이전 상태를 유지하거나, 다시 확인해볼 수 있습니다.
//         // 여기서는 에러 발생 시에도 최신 권한 상태를 유지하도록 했습니다.
//         permission: currentPermission,
//       });
//     };

//     try {
//       navigator.geolocation.getCurrentPosition(successHandler, errorHandler, options);
//     } catch (e: any) {
//       // getCurrentPosition 호출 자체에서 발생할 수 있는 동기적 에러 처리
//       setState({
//         loading: false,
//         position: null,
//         error: { code: 0, message: e.message || "An unknown error occurred while trying to get position." },
//         permission: currentPermission,
//       });
//     }
//   }, [options]); // options가 변경될 때마다 getPosition 함수를 재생성

//   useEffect(() => {
//     getPosition();
//   }, [getPosition]); // getPosition 함수가 변경될 때마다 (즉, options가 변경될 때) 실행

//   return { ...state, getPosition }; // getPosition 함수를 반환하여 필요할 때 수동으로 재요청 가능하게 함
// };
// type UseGeolocationCurrentPosition = {
//   supported: boolean;
//   state: GeolocationState | null;
//   isLoading: boolean;
//   position: GeolocationPosition | null;
//   fetchPosition: () => Promise<void>;
// };
