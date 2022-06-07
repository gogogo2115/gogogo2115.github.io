import { useEffect, useState, useCallback } from 'react';
import isBoolean from './isBoolean';
import isEmpty from './isEmpty';
import { isBrowser } from './useSSR';

const parse = (str, isErrNull=false) => {
  try {
    const isTypeStrChk = (typeof str === 'string');
    const isTypeObjChk = (typeof str === 'object');
    return (isTypeStrChk) ? JSON.parse(str) : (isTypeObjChk) ? str : String(str);
  } catch (err) {
    console.log('parse : JSON parse Error', typeof str, str);
    return isErrNull ? null : String(str);
  }
}

const stringify = (obj, isErrNull=false) => {
  try {
    const isTypeChk = (typeof obj !== 'string' && typeof obj !== 'function');
    return (isTypeChk) ? JSON.stringify(obj) : String(obj);
  } catch (err) {
    console.log('stringify : JSON stringify Error', typeof obj, obj);
    return isErrNull ? null : String(obj);
  }
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

const useLocalStoreageOptions = {
  sync : true
}

/**
 * @param {string} key 
 * @param {any} initialValue 
 */
export default function useLocalStoreage(key, initialValue=null, options=useLocalStoreageOptions){

  const optionSync = isBoolean(options?.sync) ? options.sync : true;

  const [storedValue, setStoredValue] = useState((v)=>{
    const parseInitialValue = parse(initialValue);
    if(!supported()) return parseInitialValue;
    try { 
      const storage = (window.localStorage||localStorage);
      const item = storage.getItem(key);
      if(isEmpty(item,true)){
        if(isEmpty(initialValue,true) === false){
          storage.setItem(key, stringify(initialValue));
        }
        return parseInitialValue;
      }
      return parse(item);
    } catch (err) {
      return parseInitialValue;
    }
  });

  const set = useCallback((value)=>{
   try {
    const valueToStore = value instanceof Function ? value(storedValue) : value;
    setStoredValue( parse(valueToStore) );
    if(!supported()) return false;
    (window.localStorage||localStorage).setItem(key, stringify(valueToStore));
    return true;
   } catch (err) {
    return false;
   }
  },[key, storedValue]);

  const remove = useCallback((emptySetValue)=>{
    try {
      setStoredValue( parse(emptySetValue) );
      if(!supported()) return false;
      (window.localStorage||localStorage).removeItem( key );
      return true;
    } catch (err) {
      return false;
    }
  },[key]);

  const handleStorageChange = useCallback((e) => {
    if (e.key !== key && e.storageArea !== localStorage) return;
    try {
      const newValue = (typeof e.newValue === 'string') ? parse(e.newValue) : e.newValue;
      setStoredValue(newValue);
      return;
    } catch (ere) {
      return;
    }
  },[key]);

  useEffect(() => {
    if (optionSync === false) return;
    window.addEventListener('storage', handleStorageChange);
    return () => { 
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [handleStorageChange, optionSync]);

  return { get : storedValue, set, remove };
}