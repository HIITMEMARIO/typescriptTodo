import React from 'react';
import styled from 'styled-components';

interface CardProps {
  id: string;
  title: string;
  contents: string;
  deleteHandler: (id: string) => void;
  switchHandler: (id: string) => void;
  isDone: boolean;
}

function Cards({
  id,
  title,
  contents,
  deleteHandler,
  switchHandler,
  isDone,
}: CardProps) {
  return (
    <StContainer key={id}>
      <StContentsBox>
        <div>{title}</div>
        <div>{contents}</div>
      </StContentsBox>
      <StbuttonBox>
        <button onClick={() => deleteHandler(id)}>삭제하기</button>
        <button onClick={() => switchHandler(id)}>
          {isDone ? '취소' : '완료'}
        </button>
      </StbuttonBox>
    </StContainer>
  );
}

export default Cards;

const StContainer = styled.div`
  /* width: 100%; */
  height: 200px;
  /* padding: 100px; */
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 10px;
`;

const StContentsBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffebd8;
  /* width: 50%; */
  height: 1300px;
  border-radius: 20px;

  div {
    padding: 20px;
  }
  div:first-child {
    font-size: 30px;
  }
`;
const StbuttonBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
`;
