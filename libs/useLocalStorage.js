import { useEffect, useState, useCallback } from 'react';
import isEmpty from './isEmpty';
import { isBrowser } from './useSSR';

const parse = (str) => {
  try {
    const typeChk = (typeof str === 'string');
    return typeChk ? JSON.parse(str) : str ;
  } catch (err) {
    //console.log('parse : JSON parse Error', str);
    return String(str);
  }
}

const stringify = (obj) => {
  try {
    const typeChk = (typeof obj !== 'string' && typeof obj !== 'function' );
    return typeChk ? JSON.stringify(obj) : String(obj);
  } catch (err) {
    //console.log('stringify : JSON stringify Error', obj);
    return String(obj);
  }
}

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
export default function useLocalStoreage( key, initialValue=null ){

  
  const [storedValue, setStoredValue] = useState(()=>{
    const parseInitialValue= parse(initialValue);
    try {
      if(!supported()) return parseInitialValue;
      const storeage = (window.localStorage||localStorage);
      const getItem = storeage.getItem(key);
      if(isEmpty(getItem,true)){
        return parseInitialValue;
      }
      return parse(getItem); 
    } catch (err) {
      return parseInitialValue;
    }
  });

  const handleStorageChange = useCallback((e) => {
    if(e.key === key){
    }
  },[]);

  useEffect(() => {
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [handleStorageChange]);

  return { supported, storedValue };
}