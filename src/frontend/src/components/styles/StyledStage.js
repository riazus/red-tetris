import styled from "styled-components";

export const StyledStage = styled.div`
  display: grid;
  margin: 8px;
  padding: 16px;
  grid-template-rows: repeat(
    ${(props) => props.height},
    calc(25vw / ${(props) => props.width})
  );
  grid-template-columns: repeat(${(props) => props.width}, 1fr);
  grid-gap: 1px;
  border: 2px solid #333;
  width: 100%;
  min-width: 25vw;
  max-width: 25vw;
  background: #333;
`;
