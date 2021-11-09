import { useEffect, useState } from "react";

const parse = (str) => {
    let value = null;
    try {
        value = JSON.parse(str);
    } catch (err) {
        value = null;
    }
    return value;
}

const stringify = (obj) => {
    let value = null;
    try {
        value = JSON.stringify(obj);
    } catch (err) {
        value = null;
    }
    return value;
}