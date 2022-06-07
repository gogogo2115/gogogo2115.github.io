import Header from "components/Header";
import Footer from "components/Footer";

import { useState, useEffect } from "react";
import { isBrowser } from "libs/useSSR";
import useLocalStorage from "libs/useLocalStorage";

import logo from "public/favicon-32x32.png";
import { ModalPotal } from "components/Modal";

function Index() {
  const [open, setOpen] = useState(false);
  const modalClick = () => {
    setOpen((e) => !e);
  };

  console.log(open);
  return (
    <>
      <ModalPotal open={open}>aaaaaaaa</ModalPotal>
      <button
        onClick={() => {
          alert("Hello World!");
        }}
      >
        check
      </button>
    </>
  );
}

// export async function getServerSideProps(context) {
//     console.log(context)
//     return {
//         props: {},
//     }
// }
export default Index;

// const parse = (str) => {
//     let value = null;
//     try {
//         value = JSON.parse(str);
//     } catch (err) {
//         value = null;
//     }
//     return value;
// }

// const stringify = (obj) => {
//     let value = null;
//     try {
//         value = JSON.stringify(obj);
//     } catch (err) {
//         value = null;
//     }
//     return value;
// }
