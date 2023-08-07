import { useRoutes } from "react-router-dom";
import routes from "./router";

function App() {
  return (
    <div className="app">
      {/* 占位符  类似于vue里的router-view */}
      {/* <Outlet></Outlet> */}
      {useRoutes(routes)}
    </div>
  );
}

export default App;
