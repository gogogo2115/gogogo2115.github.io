"use client";

import { Suspense, useEffect, useState } from "react";
import styled from "styled-components";

const StyledMaintenance = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const fetchData = () => {
  return new Promise((resolve) => setTimeout(() => resolve("World!"), 2000));
};

const AsyncDataFetcher = () => {
  const dataPromise = fetchData();
  return <>{dataPromise}</>;
};

const Maintenance = () => {
  useEffect(() => {}, []);

  return (
    <StyledMaintenance id="Maintenance">
      <div>준비중입니다.</div>
      <div>
        Hello{" "}
        <Suspense fallback="...">
          <AsyncDataFetcher />
        </Suspense>
      </div>
    </StyledMaintenance>
  );
};

export default Maintenance;
