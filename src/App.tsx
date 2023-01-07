import React from 'react';
import {Route, Routes} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Categories from "./containers/Categories/Categories";
import NewCategory from "./containers/NewCategory/NewCategory";
import EditCategory from "./containers/EditCategory/EditCategory";
import Home from "./containers/Home/Home";
import NewTransaction from "./containers/NewTransaction/NewTransaction";
import EditTransaction from "./containers/EditTransaction/EditTransaction";


function App() {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/new-transaction" element={<NewTransaction/>}/>
        <Route path="/edit-transaction/:trId" element={<EditTransaction/>}/>
        <Route path="/categories" element={<Categories/>}/>
        <Route path="/categories/new-category" element={<NewCategory/>}/>
        <Route path="/categories/edit-category/:id" element={<EditCategory/>}/>
        <Route path="*" element={(<h1>Not found!</h1>)}/>
      </Routes>
    </div>
  );
}

export default App;
