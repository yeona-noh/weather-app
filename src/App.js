import React, { useState } from "react";
import Search from './components/Search';

import Header from "./components/Header";
import Footer from "./components/Footer";


function App() {
  const [location, setLocation] = useState();
  const handleSearch = (location) => {
    setLocation(location)
  }

  return (
    <div className="App">
      <Header />
      <Search onSearch={handleSearch}/>
      <Footer />
    </div>
  );
}

export default App;
