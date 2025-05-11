import { styled } from "styled-components";

export const Container = styled.div`
  width: 300px;
  padding: 16px;
  background-color: #ffffff;
  color: #000000;
`;

export const Title = styled.h1`
  font-size: 18px;
  margin-bottom: 16px;
  color: #000000;
`;

export const SettingRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  padding: 8px;
  background-color: #f0f0f0;
  border-radius: 8px;
`;

export const Label = styled.label`
  flex: 1;
  color: #000000;
`;

export const ToggleButton = styled.button<{ isActive: boolean }>`
  position: relative;
  width: 50px;
  height: 24px;
  background-color: ${(props) => (props.isActive ? "#4CAF50" : "#cccccc")};
  border-radius: 12px;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &::before {
    content: "";
    position: absolute;
    left: ${(props) => (props.isActive ? "26px" : "2px")};
    top: 2px;
    width: 20px;
    height: 20px;
    background-color: white;
    border-radius: 50%;
    transition: left 0.2s ease-in-out;
  }

  &:hover {
    background-color: ${(props) => (props.isActive ? "#45a049" : "#bbbbbb")};
  }
`;
