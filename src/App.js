import React from "react";
import "./App.css";
import Tinder from "./containers/Tinder";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faUser,
  faCalendar,
  faMap,
  faPhone,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
library.add(faUser, faCalendar, faMap, faPhone, faLock);
function App() {
  return (
    <div className="App">
      {/* preload: Load trước 10 friend và 8 bức hình đầu tiên */}
      <Tinder preLoad={10} preLoadImage={8} />
    </div>
  );
}

export default App;
