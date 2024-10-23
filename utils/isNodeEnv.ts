const NODE_ENV = process.env.NODE_ENV || "";

// 개발, 프로덕션, 테스트 환경 여부를 확인하는 플래그
export const IS_DEVELOPMENT = NODE_ENV == "development";
export const IS_PRODUCTION = NODE_ENV === "production";
export const IS_TEST = NODE_ENV === "test";

const env = { IS_DEVELOPMENT, IS_PRODUCTION, IS_TEST };

// 환경 정보를 담은 객체를 export
// module.exports = env;
export default env;
