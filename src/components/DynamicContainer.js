import styled from "styled-components";

const DynamicContainer = styled.div`
  background-color: ${(props) => (props.bgColor ? props.bgColor : "white")};
  width: 300px;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 60px;
`;

export default DynamicContainer;
