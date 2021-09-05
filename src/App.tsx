import { useCallback, useEffect, useState } from "react";
import "./app.css";
import styled from "styled-components";
interface IColorBox {
  id: number;
  top: number;
  left: number;
  right: number;
  bottom: number;
  color: string;
}

interface IStyleBox {
  bg: string;
}
const column = Math.floor(window.screen.width / 60);
const rows = Math.floor(window.screen.height / 60);
function App() {
  const [colorBox, setColorBox] = useState<IColorBox[] | []>([]);

  useEffect(() => {
    let arr = [];
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < column; j++) {
        let id = i * column + j;
        let body = {
          id: id,
          top: -1,
          right: -1,
          left: -1,
          bottom: -1,
          color: getRandomColor(),
        };
        if (id - 1 >= i * column) {
          body.left = id - 1;
        }

        if (j + 1 < column) {
          body.right = id + 1;
        }
        if (i > 0) {
          body.top = id - column;
        }
        if (i < rows) {
          body.bottom = id + column;
        }
        arr.push(body);
      }
    }
    setColorBox(arr);
  }, []);
  const getRandomColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
  };

  const onClick = useCallback(
    (x: IColorBox) => {
      let arr = [];
      if (x.left > -1) {
        arr.push(x.left);
      }
      if (x.right > -1) {
        arr.push(x.right);
      }
      if (x.bottom > -1) {
        arr.push(x.bottom);
      }
      if (x.top > -1) {
        arr.push(x.top);
      }
      let second = arr[Math.floor(Math.random() * arr.length)];
      const colorBoxArray = colorBox.map((c: IColorBox) => {
        if (c.id === x.id) {
          return { ...c, color: getRandomColor() };
        } else if (c.id === second) {
          return { ...c, color: getRandomColor() };
        } else {
          return c;
        }
      });
      setColorBox(colorBoxArray);
    },
    [colorBox]
  );
  return (
    <main>
      {colorBox.map((x: IColorBox) => {
        return <ColorBox onClick={() => onClick(x)} bg={x.color} key={x.id} />;
      })}
    </main>
  );
}

const ColorBox = styled.div<IStyleBox>`
  width: 60px;
  height: 60px;
  background-color: ${(props) => props.bg};
`;
export default App;
