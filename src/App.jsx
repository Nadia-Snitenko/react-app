import React, { useState } from 'react';
import logo from './assets/logo.png';
import './styles/App.css';
import SearchBar from './components/SearchBar';
import Search from './components/Search';
import Addictional from './components/Addictional';


function App() {
  const [showSearchBar, setShowSearchBar] = useState(true);

  function handleCatalogButtonClick() {
      setShowSearchBar(!showSearchBar);
    };

  return (
    <>
      <div>
      <img src={logo} alt="Logo" className="logo" />

        <Addictional/>

        <Search/>

        <h1 className="app-header">Транспортный оператор Самары</h1>
       <button onClick={handleCatalogButtonClick} className="app-header" >Каталог остановок</button>

        <div>
          {showSearchBar && <SearchBar />}
          <button>Поиск </button>
        </div>
       
      </div>
    </>
  );
}

export default App;
