import { useState } from 'react';
import styled from 'styled-components';

const Home = () => {
  const [titleValue, setTitleValue] = useState('');
  const [contentValue, setContentValue] = useState('');

  const addCardHandler = () => {
    console.log('hi');
  };

  return (
    <div>
      <StContainer>
        <StHeader>
          &nbsp; 제목 :{' '}
          <input
            value={titleValue}
            onChange={(e) => {
              setTitleValue(e.target.value);
            }}
          />
          &nbsp; 내용 :{' '}
          <input
            value={contentValue}
            onChange={(e) => {
              setContentValue(e.target.value);
            }}
          />
          &nbsp; <button onClick={addCardHandler}>추가하기</button>
        </StHeader>

        <StSection>
          <p>Working</p>
          <div></div>
          <p>Done</p>
          <div></div>
        </StSection>
      </StContainer>
    </div>
  );
};

export default Home;

const StContainer = styled.div``;

const StHeader = styled.div``;

const StSection = styled.section``;
