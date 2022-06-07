import { useEffect, useCallback, useState } from "react";
import isEmpty from "libs/isEmpty";
import { isBrowser } from "libs/useSSR";

const parse = (str) => {
    let value = null;
    try {            
        value = JSON.parse(str);
    } catch (err) {
        console.log('JSON parse Error');
        value = String(str);
    }
    return value;
}

const stringify = (obj) => {
    let value = null;
    try {
        const jsonStringify = (typeof obj !== 'string') 
            ? JSON.stringify(obj) 
            : String(obj);
        value = jsonStringify;
    } catch (err) {
        console.log('JSON stringify Error');
        value = String(obj);
    }
    return value;
}

/**
 * localStorage 지원여부 체크
 * @returns {boolean} 
 */
export function supported(){
    try {
        if(!isBrowser()) return false;     
        return typeof (window.localStorage||localStorage) !== 'undefined';   
    } catch (err) {
        return false;
    }
}

/**
 * 
 * @param {string} key 
 * @param {any} initialValue 
 */
export default function useLocalStoreage(key, initialValue=null){
    
    const keyTypeStr = (typeof key === 'string');
    const keyStrLength = (keyTypeStr) ? key.length : 0;

    const [storedValue, setStoredValue] = useState(()=>{
    });

    const set = useCallback((value) => {
        const 
    },[]);

    const get = useCallback(() => {
    },[]);

    const remove = useCallback((emptyValue=undefined) => {
        
    },[]);

    const handleStorageChange = useCallback((e) => {
        if (e.key === key) {
        }
    },[]);

    useEffect(() => {
        window.addEventListener('storage', handleStorageChange);
        return () => { 
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    return {supported,remove,set,get,remove};
}


// import { useEffect, useState, useCallback, useMemo } from 'react';

// import { isBrowser } from 'libs/useSSR';
// import isEmpty from 'libs/isEmpty';

// const parse = (str, isErrNull=false) => {
//   try {
//     const typeChk = (typeof str === 'string');
//     return typeChk ? JSON.parse(str) : str ;
//   } catch (err) {
//     // process.env.NODE_ENV === "development" 
//     //   && console.log('parse : JSON parse Error', typeof str, str);
//     return isErrNull ? null : String(str);
//   }
// }

// const stringify = (obj, isErrNull=false) => {
//   try {
//     const typeChk = (typeof obj !== 'string' && typeof obj !== 'function');
//     return typeChk ? JSON.stringify(obj) : String(obj);
//   } catch (err) {
//     // process.env.NODE_ENV === "development" 
//     //   &&  console.log('stringify : JSON stringify Error', typeof obj, obj);
//     return isErrNull ? null : String(obj);
//   }
// }

// /**
//  * localStorage 지원여부 체크
//  * @returns {boolean} 
//  */
//  export function supported(){
//   try {
//       if(!isBrowser()) return false;     
//       return typeof (window.localStorage||localStorage) !== 'undefined';   
//   } catch (err) {
//       return false;
//   }
// }

// /**
//  * @param {string} key 
//  * @param {any} initialValue 
//  */
//  export default function useLocalStoreage(key, initialValue=null){

//   const parseInitialValue = useMemo(() =>  parse(initialValue) , [initialValue]);

//   const [storedValue, setStoredValue] = useState(()=>{
//     try {
//       if(!supported()) return parseInitialValue;
//       const storeage = (window.localStorage||localStorage);
//       const getItem = storeage.getItem(key);
//       if(isEmpty(getItem,true)){
//         if(isEmpty(initialValue,true) === false){
//           storeage.setItem(key, stringify(initialValue));
//         }
//         return parseInitialValue;
//       }
//       return parse(getItem);
//     } catch (err) {
//       return parseInitialValue;
//     }
//   });

//   const set = useCallback((value) => {
//     try {
//       const valueToStore = value instanceof Function ? value(storedValue) : value;
//       setStoredValue( parse(valueToStore) );
//       if(!supported()) return false;
//       (window.localStorage||localStorage).setItem(key, stringify(valueToStore));
//       return true;
//     } catch (err) {
//       return false;
//     }
//   },[key, storedValue]);

//   const remove = useCallback((emptyValue=null) => {
//     try {
//       setStoredValue( parse(emptyValue) );
//       if(!supported()) return false;
//       (window.localStorage||localStorage).removeItem(key);
//       return true;
//     } catch (err) {
//       return false;
//     }
//   },[key]);

//   const handleStorageChange = useCallback((e) => {
//     if(e.key === key){
//       const newValue = (typeof e.newValue === 'string') ? parse(e.newValue) : e.newValue;
//       setStoredValue(newValue);   
//     }
//     return;
//   },[key]);

//   useEffect(() => {
//     if(!supported()) return;
//     window.addEventListener('storage', handleStorageChange);
//     return () => { 
//       window.removeEventListener('storage', handleStorageChange);
//     };
//   }, []);

//   return { supported, set, remove };
// }