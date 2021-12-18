import { useEffect, useLayoutEffect, useState, useCallback, useMemo } from 'react';
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
    const typeChk = (typeof obj !== 'string');
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