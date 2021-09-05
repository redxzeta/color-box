import "./app.css";

function App() {
  return (
    <main>
      <div className="color-box">test</div>
      {[...Array(1000)].map((i, x) => (
        <div className="color-box">test</div>
      ))}
    </main>
  );
}

export default App;
