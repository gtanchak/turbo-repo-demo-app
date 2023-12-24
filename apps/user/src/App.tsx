import { Button } from "@repo/ui";
import { useEffect, useState } from "react";

function Child() {
  console.log("%c Child: render", "color: mediumspringgreen");
  const [count, setCount] = useState(() => {
    console.log("%c Child: useState(): 0", "color: mediumturquoise");
    return 0;
  });

  useEffect(() => {
    console.log("%c App: useEffect", "color: tomato");
    return () => {
      console.log("%c App: cleanup useEffect", "color:orange");
    };
  });

  return (
    <div>
      <Button onClick={() => setCount((prev) => prev + 1)}>{count}</Button>child{" "}
      {count}
    </div>
  );
}

function App() {
  console.log("%c, App:render start", "color: lightcoral");
  const [childCount, setChildCount] = useState(() => {
    console.log("%c App: useState(): false", "color: mediumturquoise");
    return false;
  });
  console.log("%c, App:render end", "color: pink");

  return (
    <>
      <Button>button</Button>
      <Child />
    </>
  );
}

export default App;
