import './App.scss';
import {BrowserRouter,Route, Routes} from "react-router-dom"
import Home from "./components/home"
import Room from "./components/room"
import rootReducer from "./reducers/rootReducer"
import {Provider} from "react-redux"

import {createStore} from "redux";

const store = createStore(rootReducer)

function App() {
  return (
    <div className="App">
      <BrowserRouter>
         <Provider store={store}>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/room" element={<Room/>}/>
          </Routes>
         </Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
