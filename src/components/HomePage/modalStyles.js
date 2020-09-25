import styled from "styled-components";

export const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #6b5ec9;
  top: 50%;
  left: 50%;
  position: absolute;
  transform: translate(-50%, -50%);
  width: 60%;
  height: 60%;
`;

export const ModalImage = styled.img`
  max-height: 80%;
  max-width: 80%;
`;

// top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
//   position: absolute;
//   width: 90%;
//   max-width: 400px;
//   background-color: white;
//   padding: 1rem;
