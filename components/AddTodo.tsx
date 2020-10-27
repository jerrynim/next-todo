import { useRouter } from "next/router";
import React, { useState } from "react";
import styled from "styled-components";
import { addTodoAPI } from "../lib/api/todo";
import BrushIcon from "../public/statics/svg/brush.svg";
import pallete from "../styles/pallete";
import { TodoType } from "../types/todo";

const Container = styled.div`
  padding: 16px;

  .add-todo-header-title {
    font-size: 21px;
  }

  .add-todo-header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .add-todo-submit-button {
      padding: 4px 8px;
      border: 1px solid black;
      border-radius: 5px;
      background-color: white;
      outline: none;
      font-size: 14px;
    }
  }
  .add-todo-colors-wrapper {
    width: 100%;
    margin-top: 16px;
    display: flex;
    justify-content: space-between;
    .add-todo-color-list {
      display: flex;
      .add-todo-color-button {
        width: 24px;
        height: 24px;
        margin-right: 16px;
        border: 0;
        outline: 0;
        border-radius: 50%;
        &:last-child {
          margin: 0;
        }
      }
      .add-todo-selected-color {
        border: 2px solid black !important;
      }
    }
  }
  .bg-blue {
    background-color: ${pallete.blue};
  }
  .bg-green {
    background-color: ${pallete.green};
  }
  .bg-navy {
    background-color: ${pallete.navy};
  }
  .bg-orange {
    background-color: ${pallete.orange};
  }
  .bg-red {
    background-color: ${pallete.red};
  }
  .bg-yellow {
    background-color: ${pallete.yellow};
  }
  .add-todo-textarea {
    width: 100%;
    border-radius: 5px;
    height: 300px;
    border-color: ${pallete.gray};
    margin-top: 12px;
    resize: none;
    outline: none;
    padding: 12px;
    font-size: 16px;
  }
`;

const AddTodo: React.FC = () => {
  const [text, setText] = useState("");
  const [selectedColor, setSelectedColor] = useState<TodoType["color"]>();

  const router = useRouter();
  //*투두 추가하기
  const addTodo = async () => {
    try {
      if (!text || !selectedColor) {
        alert("색상과 할일을 입력해주세요.");
        return;
      }
      await addTodoAPI({ text, color: selectedColor });
      console.log("추가했습니다.");
      router.push("/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container>
      <div className="add-todo-header">
        <h1 className="add-todo-header-title">Add Todo</h1>
        <button
          type="button"
          className="add-todo-submit-button"
          onClick={addTodo}
        >
          추가하기
        </button>
      </div>
      <div className="add-todo-colors-wrapper">
        <div className="add-todo-color-list">
          {["red", "orange", "yellow", "green", "blue", "navy"].map(
            (color, index) => (
              <button
                type="button"
                className={`bg-${color} add-todo-color-button ${
                  color === selectedColor ? "add-todo-selected-color " : ""
                }`}
                key={index}
                onClick={() => setSelectedColor(color as TodoType["color"])}
              />
            )
          )}
        </div>
        <BrushIcon />
      </div>
      <textarea
        value={text}
        className="add-todo-textarea"
        onChange={(e) => setText(e.currentTarget.value)}
        placeholder="할 일을 입력해 주세요."
      />
    </Container>
  );
};

export default AddTodo;
