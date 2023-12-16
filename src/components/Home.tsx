import { useState } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { newCard } from '../types/listType';
import Cards from './Cards';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, deleteTodo, switchTodo } from '../redux/modules/todos';
import { RootState } from '../redux/config/configStore';
import axios from 'axios';

const Home = () => {
  const [titleValue, setTitleValue] = useState<string>('');
  const [contentValue, setContentValue] = useState<string>('');
  const list = useSelector((state: RootState) => state.todosSlice);

  const dispatch = useDispatch();
  const addCardHandler = async () => {
    const newCard: newCard = {
      id: uuidv4(),
      title: titleValue,
      contents: contentValue,
      isDone: false,
    };

    if (!titleValue || !contentValue) {
      Swal.fire({
        icon: 'error',
        title: '제목과 내용을 써주세요!!',
      });
    } else {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: '내용이 등록 되었습니다!',
        showConfirmButton: false,
        timer: 1500,
      });
      dispatch(addTodo(newCard));
      await axios.post(`${process.env.REACT_APP_SERVER_URL}/todos`, newCard);
      setContentValue('');
      setTitleValue('');
    }
  };

  const switchHandler = async (item: newCard) => {
    dispatch(switchTodo(item));
    await axios.patch(`${process.env.REACT_APP_SERVER_URL}/todos/${item.id}`, {
      isDone: !item.isDone,
    });
  };

  const deleteHandler = async (id: string) => {
    await Swal.fire({
      title: '삭제하시겠어요?!',
      text: '삭제하면 영영 돌이킬 수 없습니다. 그래도 하시겠습니까?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ffc5c5',
      cancelButtonColor: '#d33',
      confirmButtonText: '네!',
      cancelButtonText: '아니요!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: '삭제되었습니다!',
          text: '내용이 삭제 되었어요!',
          icon: 'success',
        });
        axios.delete(`${process.env.REACT_APP_SERVER_URL}/todos/${id}`);
        dispatch(deleteTodo(id));
      }
    });
  };

  return (
    <>
      <StMainTitle>TODO-LIST</StMainTitle>
      <StContainer>
        <header>
          <div>
            &nbsp; 제목 :{' '}
            <input
              value={titleValue}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setTitleValue(e.target.value);
              }}
            />
          </div>
          <div>
            &nbsp; 내용 :{' '}
            <input
              value={contentValue}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setContentValue(e.target.value);
              }}
            />
            &nbsp; <button onClick={addCardHandler}>추가하기</button>
          </div>
        </header>
        <section>
          <p>🤩 working 🤩</p>
          <div>
            {list
              .filter((item) => !item.isDone)
              .map((item) => {
                return (
                  <Cards
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    contents={item.contents}
                    deleteHandler={deleteHandler}
                    switchHandler={switchHandler}
                    isDone={item.isDone}
                    item={item}
                  />
                );
              })}
          </div>
          <p>👌 Done 👌</p>
          <div>
            {list
              .filter((item) => item.isDone)
              .map((item) => {
                return (
                  <Cards
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    contents={item.contents}
                    deleteHandler={deleteHandler}
                    switchHandler={switchHandler}
                    isDone={item.isDone}
                    item={item}
                  />
                );
              })}
          </div>
        </section>
      </StContainer>
    </>
  );
};

export default Home;

const StMainTitle = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  font-size: 100px;
`;

const StContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;

  header {
    background-color: #ffc5c5;
    display: flex;
    height: 150px;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    font-size: 20px;
    font-weight: 800;
    width: 100%;

    input {
      outline: none;
      border-radius: 20px;
      border: none;
      padding: 10px;
    }
  }

  button {
    margin: 15px;
    border: none;
    width: 100px;
    height: 40px;
    border-radius: 10px;
    transition: all.4s;
    &:hover {
      background-color: #ffebd8;
    }
  }

  p {
    font-size: 40px;
    font-weight: 800;
    margin: 30px;
  }

  section {
    margin-top: 20px;
    background-color: #ffc5c5;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    border-radius: 20px;
  }
`;
