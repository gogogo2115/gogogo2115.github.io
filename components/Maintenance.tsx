"use client";
import { useEffect, useState } from "react";
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

const Maintenance = () => {
  useEffect(() => {}, []);

  return (
    <StyledMaintenance id="Maintenance">
      <div>준비중입니다.</div>
    </StyledMaintenance>
  );
};

export default Maintenance;
