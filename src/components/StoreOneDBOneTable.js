import React from "react";
import { Link } from 'react-router-dom';
import "./StoreOneDBOneTable.css";
import { StoreService } from "../services/StoreService";

class StoreOneDBOneTable extends React.Component{

  constructor() {
    super();
    this.store = new StoreService();
    console.log("in constructor this.store ",this.store)
  }

  async componentDidMount() {
    await this.store.init();
    console.log('store.isService ',this.store.isService());
    console.log('store.platform ',this.store.platform());
    await this.testNamedStore();
  }
  componentWillUnmount() {
    this.store = null;
  }

  async testNamedStore() {
    const keyList1 = ["app","user"];

    // open a named store 
    console.log("**** Test One DB One Table Store");
    var result = await this.store.openStore({database:"myStore",table:"saveData"});
    if(result) {
      console.log('Default Database open ', result);
      await this.store.clear();
      // store a string 
      await this.store.setItem("app","App Opened");
      // read app from the store
      result = await this.store.getItem("app");
      console.log('Get app ', result);
      // store a JSON Object 
      const data = {'age':40,'name':'jeep','email':'jeep@example.com'}
      await this.store.setItem("user",JSON.stringify(data));
      result = await this.store.getItem("user");
      console.log("Get JSON Object : " + result);
      // Get All Keys
      result = await this.store.getAllKeys();
      console.log("Get keys : " + result);
      console.log("Keys length " + result.length);
      console.log("Keys[0] " + result[0]);
      console.log("Keys[1] " + result[1]);
      console.log("Keys length " + result.length);
      if(result && result.length === 2 && 
        keyList1.includes(result[0]) && keyList1.includes(result[1])) {
          console.log("test one DB one Table was successfull");
          document.querySelector('.success').classList.remove('display');
        } else {
          console.log("test one DB one Table was not successfull");
          document.querySelector('.failure').classList.remove('display');
        }

    } else {
      console.log("test one DB one Table was not successfull");
      document.querySelector('.failure').classList.remove('display');
    }

  }
  render() {

    return (
      <React.Fragment>
        <div className="StoreOneDBOneTable">
          <div id="header">
            <Link to="/">
              <button>
                Home
              </button>
            </Link>
            <p id="title">Test Store One DB One Table</p>
          </div>
          <div id="content">
            <p class="success display">
              The set of tests was successful
            </p>
            <p class="failure display">
              The set of tests failed
            </p>
          </div>
        </div>
      </React.Fragment>

    );
  }
}
export default StoreOneDBOneTable;