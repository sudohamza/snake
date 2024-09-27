import { useEffect, useState } from "react";
import "./App.css";
type directionType = "up" | "down" | "left" | "right" | "none";
let direction: directionType = "none";
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
  const [lastState, setLastState] = useState<directionType>("none");
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
        } else {
          window.location.reload();
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
        } else {
          window.location.reload();
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
        } else {
          window.location.reload();
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
        } else {
          window.location.reload();
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
    let key = event.key;
    key.toString();
    if (direction === "none" && key.includes("Arrow")) {
      if (lastState === "none") {
        direction = "down";
      } else {
        direction = lastState;
      }
      return;
    }

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
      case "Escape":
        if (direction !== "none") {
          setLastState(direction);
          direction = "none";
        } else {
        }
        break;
      default:
        break;
    }
  };
  window.addEventListener("keydown", checkKey);
  useEffect(() => {
    setTimeout(() => {
      // if (snake[0].top === food.top && snake[0].left === food.left) {
      //   genRandomFood(1, 500);
      //   let thisSnake = snake.slice();
      //   let newDot = { ...thisSnake[thisSnake.length - 1] };
      //   thisSnake.push(newDot);
      //   setSnake(thisSnake);
      // }
    }, 50);
  }, [snake, direction]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      move();
      if (snake[0].top === food.top && snake[0].left === food.left) {
        genRandomFood(1, 500);
        let thisSnake = snake.slice();
        let newDot = { ...thisSnake[thisSnake.length - 1] };
        thisSnake.push(newDot);
        setSnake(thisSnake);
      }
    }, 200);

    return () => {
      clearInterval(intervalId);
    };
  });

  let a = 5;
  a -= 2;
  return (
    <>
      <div className="main">
        <div>
          <div
            style={{
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h1>Press </h1>
            <div
              style={{
                padding: 10,
                margin: 20,
                border: "4px solid gray",
                borderRadius: 10,
                backgroundColor: "white",
                fontSize: "40px",
                fontWeight: "bold",
              }}
            >
              Esc
            </div>
            <h1>for Pause.</h1>
          </div>
          <div className="arena">
            {snake.map((dot, index) => {
              return (
                <div
                  key={index}
                  style={{
                    top: dot.top,
                    left: dot.left,
                    border: "2px solid white",
                  }}
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
