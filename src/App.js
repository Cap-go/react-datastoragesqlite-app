import React from "react";
import { BrowserRouter, Route } from 'react-router-dom';

import ReactDOM from "react-dom";
import "./App.css";
import Home from './components/Home';
import StoreDefault from './components/StoreDefault';
import StoreOneDBOneTable from './components/StoreOneDBOneTable';
import StoreOneDBTwoTables from './components/StoreOneDBTwoTables';
import StoreTwoDBsTwoTables from './components/StoreTwoDBsTwoTables';
import StoreImagesIssue31 from './components/StoreImagesIssue31';

class App extends React.Component{
  render() {
    return (
      <BrowserRouter>
      <div>
          <Route path="/" component={Home} exact/>
          <Route path="/storedefault" component={StoreDefault} />
          <Route path="/storeonedbonetable" component={StoreOneDBOneTable} />
          <Route path="/storeonedbtwotables" component={StoreOneDBTwoTables} />
          <Route path="/storetwodbstwotables" component={StoreTwoDBsTwoTables} />
          <Route path="/storeImagesIssue31" component={StoreImagesIssue31} />
      </div> 
    </BrowserRouter>
  );
  }
}
/*
        <Switch>
          <Route path="/" component={Home} exact/>
        </Switch>

*/
const rootElement = document.getElementById("root") || document.createElement('div');  // for testing purposes
ReactDOM.render(<App />, rootElement);

export default App;

