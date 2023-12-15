import { useState } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { addTodo, deleteTodo, getTodos, switchTodo } from '../api/todos';
import { FecthedDataType } from '../types/testType';
import Cards from './Cards';
import Swal from 'sweetalert2';

const Home = () => {
  const { isLoading, isError, data } = useQuery('todos', getTodos);

  const queryClient = useQueryClient();

  const addTodomutation = useMutation(addTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries('todos');
    },
  });
  const deleteTodomutation = useMutation(deleteTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries('todos');
    },
  });

  const siwtchTodomutation = useMutation(switchTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries('todos');
    },
  });

  const [titleValue, setTitleValue] = useState('');
  const [detailValue, setDetailValue] = useState('');

  const addCard = () => {
    const newList: FecthedDataType = {
      id: uuidv4(),
      title: titleValue,
      contents: detailValue,
      isDone: false,
    };

    if (!titleValue || !detailValue) {
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
      addTodomutation.mutate(newList);
      setTitleValue('');
      setDetailValue('');
    }
  };

  const deleteHandler = (id: string) => {
    Swal.fire({
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
        deleteTodomutation.mutate(id);
      }
    });
  };

  const doneHandler = (item: FecthedDataType) => {
    siwtchTodomutation.mutate(item);
  };

  if (isLoading) {
    return <div>로딩중....</div>;
  }

  if (isError) {
    return <div>오류가 발생했어요!</div>;
  }

  return (
    <>
      <StMainTitle>TODO-LIST</StMainTitle>
      <StContainer>
        <header>
          <div>
            &nbsp; 제목 : &nbsp;
            <input
              value={titleValue}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setTitleValue(e.target.value);
              }}
            />
          </div>

          <div>
            &nbsp; 내용 : &nbsp;
            <input
              value={detailValue}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setDetailValue(e.target.value);
              }}
            />
          </div>
          <button onClick={addCard}>추가하기</button>
        </header>

        <section>
          <p>🤩 working 🤩</p>
          {data
            ?.filter((item: FecthedDataType) => !item.isDone)
            .map((item: FecthedDataType) => {
              return (
                <Cards
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  contents={item.contents}
                  deleteHandler={deleteHandler}
                  doneHandler={doneHandler}
                  isDone={item.isDone}
                  item={item}
                />
              );
            })}

          <p>👌 Done 👌</p>
          {data
            ?.filter((item: FecthedDataType) => item.isDone)
            .map((item: FecthedDataType) => {
              return (
                <Cards
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  contents={item.contents}
                  deleteHandler={deleteHandler}
                  doneHandler={doneHandler}
                  isDone={item.isDone}
                  item={item}
                />
              );
            })}
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
