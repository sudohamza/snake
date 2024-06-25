import { useEffect, useState } from "react";
import "./App.css";
type directionType = "up" | "down" | "left" | "right" | "none";
let direction: directionType = "down";
let food = { top: 0, left: 0 };

const genRandomFood = (min: number, max: number) => {
  let top = Math.floor(Math.random() * (max - min) + min);
  let left = Math.floor(Math.random() * (max - min) + min);
  if (top % 20 !== 0) {
    top -= top % 20;
  }
  if (left % 20 !== 0) {
    left -= left % 20;
  }

  food = {
    top,
    left,
  };
};
genRandomFood(1, 500);
function App() {
  type snakeStruct = {
    top: number;
    left: number;
  };

  const [snake, setSnake] = useState<Array<snakeStruct>>([
    { top: 240, left: 240 },
  ]);
  const move = () => {
    switch (direction) {
      case "up":
        if (snake[0].top > 0) {
          let currentSnake = snake.slice();
          let newDot = {
            top: currentSnake[0].top - 20,
            left: currentSnake[0].left,
          };
          currentSnake.unshift(newDot);
          if (currentSnake.length > 1) {
            currentSnake.pop();
          }
          setSnake(currentSnake);
        }
        break;
      case "down":
        if (snake[0].top < 480) {
          let currentSnake = snake.slice();
          let newDot = {
            top: currentSnake[0].top + 20,
            left: currentSnake[0].left,
          };
          currentSnake.unshift(newDot);
          if (currentSnake.length > 1) {
            currentSnake.pop();
          }
          setSnake(currentSnake);
        }
        break;
      case "left":
        if (snake[0].left > 0) {
          let currentSnake = snake.slice();
          let newDot = {
            top: currentSnake[0].top,
            left: currentSnake[0].left - 20,
          };
          currentSnake.unshift(newDot);
          if (currentSnake.length > 1) {
            currentSnake.pop();
          }
          setSnake(currentSnake);
        }
        break;
      case "right":
        if (snake[0].left < 480) {
          let currentSnake = snake.slice();
          let newDot = {
            top: currentSnake[0].top,
            left: currentSnake[0].left + 20,
          };
          currentSnake.unshift(newDot);
          if (currentSnake.length > 1) {
            currentSnake.pop();
          }
          setSnake(currentSnake);
        }
        break;
      case "none":
        console.log("none");
        break;
      default:
        break;
    }
  };

  const checkKey = (event: any) => {
    console.log(event);
    switch (event.key) {
      case "ArrowLeft":
        if (direction !== "right") {
          direction = "left";
        }

        break;
      case "ArrowRight":
        if (direction !== "left") direction = "right";
        break;
      case "ArrowUp":
        if (direction !== "down") direction = "up";
        break;
      case "ArrowDown":
        if (direction !== "up") direction = "down";
        break;
      default:
        break;
    }
  };
  window.addEventListener("keydown", checkKey);
  let arr = ["a", "b", "c", "d"];
  console.log(arr[arr.length - 1]);
  useEffect(() => {
    setTimeout(() => {
      move();
      if (snake[0].top === food.top && snake[0].left === food.left) {
        genRandomFood(1, 500);
        let thisSnake = snake.slice();
        let newDot = { ...thisSnake[thisSnake.length - 1] };
        thisSnake.push(newDot);
        setSnake(thisSnake);
      }
    }, 150);
  }, [snake, direction]);
  let a = 5;
  a -= 2;
  return (
    <>
      <div className="main">
        <div>
          <div style={{ textAlign: "center" }}>
            <h1>
              Press <span style={{ color: "green" }}>Space</span> for Play/Pause
            </h1>
          </div>
          <div className="arena">
            {snake.map((dot, index) => {
              return (
                <div
                  key={index}
                  style={{ top: dot.top, left: dot.left }}
                  className="snake"
                ></div>
              );
            })}
            <div
              className="food"
              style={{ top: food.top, left: food.left }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
