import { BrowserRouter, Route } from "react-router-dom";
import { Switch } from 'react-router-dom/cjs/react-router-dom.min';
import Categories from "./pages/Categories";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/category/:cat" component={Categories} />
        <Route path="/" component={HomePage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
