import "./App.css";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";

function App() {
  return (
    <>
      <Header></Header>
      <Home />
      <main style={{ height: "200vh", padding: "1rem" }}>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
          tincidunt, ...
        </p>
        <p>
          Suspendisse commodo fermentum lorem, vel convallis turpis fringilla
          at. ...
        </p>
      </main>
    </>
  );
}

export default App;
