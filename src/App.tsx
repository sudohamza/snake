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
        } else {
          let score = Number(localStorage.getItem("High Score"));
          if (snake.length - 1 > score) {
            localStorage.setItem("High Score", String(snake.length - 1));
          }
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
          let score = Number(localStorage.getItem("High Score"));
          if (snake.length - 1 > score) {
            localStorage.setItem("High Score", String(snake.length - 1));
          }
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
          let score = Number(localStorage.getItem("High Score"));
          if (snake.length - 1 > score) {
            localStorage.setItem("High Score", String(snake.length - 1));
          }
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
          let score = Number(localStorage.getItem("High Score"));
          if (snake.length - 1 > score) {
            localStorage.setItem("High Score", String(snake.length - 1));
          }
          window.location.reload();
        }
        break;
      case "none":
        break;
      default:
        break;
    }
  };

  const checkKey = (event: any) => {
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
        break;
      default:
        break;
    }
  };

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
    }, 100);

    return () => {
      clearInterval(intervalId);
    };
  });

  useEffect(() => {
    window.addEventListener("keydown", checkKey);

    return () => {
      window.removeEventListener("keydown", checkKey);
    };
  }, []);

  return (
    <>
      <div className="main" onKeyDownCapture={checkKey}>
        <div>
          <div
            style={{
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h1>High Score </h1>
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
              {localStorage.getItem("High Score") || 0}
            </div>
            <h1>Your Score</h1>
            <div
              style={{
                padding: 10,
                margin: 20,
                paddingLeft: 20,
                paddingRight: 20,
                border: "4px solid gray",
                borderRadius: 10,
                backgroundColor: "white",
                fontSize: "40px",
                fontWeight: "bold",
              }}
            >
              {snake.length - 1}
            </div>
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
