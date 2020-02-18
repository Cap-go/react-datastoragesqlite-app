import React from "react";
import { Link } from 'react-router-dom';
import "./StoreDefault.css";
import { StoreService } from "../services/StoreService";

class StoreDefault extends React.Component{

  constructor() {
    super();
    this.store = new StoreService();
    console.log("in constructor this.store ",this.store)
  }

  async componentDidMount() {
    await this.store.init();
    console.log('store.isService ',this.store.isService());
    console.log('store.platform ',this.store.platform());
    await this.testStoreDefault();
  }

  componentWillUnmount() {
    this.store = null;
  }
  async testStoreDefault() {
    const keyList1 = ["session","testJson","testNumber"];

    // open a default store 
    console.log("**** Test Default Store");
    var result = await this.store.openStore({});
    if(result) {
      console.log('Default Database open ', result);
      await this.store.clear();
      // store a string in the default store
      await this.store.setItem("session","Session Opened");
      // read session from the store
      result = await this.store.getItem("session");
      console.log('Get Session ', result);
      // store a JSON Object in the default store
      const data = {'a':20,'b':'Hello World','c':{'c1':40,'c2':'cool'}};
      await this.store.setItem("testJson",JSON.stringify(data));
      result = await this.store.getItem("testJson");
      console.log("Get JSON Object : " + result);
      // store a number in the default store
      const data1 = 243.567;
      await this.store.setItem("testNumber",data1.toString());
      // read number from the store
      result = await this.store.getItem("testNumber");
      console.log("Get Number : " + result);
      // isKey test
      const isKey1 = await this.store.isKey("testNumber");
      console.log("isKey testNumber " + isKey1);
      const isKey2 = await this.store.isKey("foo");
      console.log("isKey foo " + isKey2);
      // Get All Keys
      result = await this.store.getAllKeys();
      console.log("Get keys : " + result);
      console.log("Keys length " + result.length);
      // Get All Values
      result = await this.store.getAllValues();
      console.log("Get values : " + result);
      console.log("Values length " + result.length);
      // Get All Key/Values      
      result = await this.store.getAllKeysValues();
      result.forEach(element => {
        console.log(element);
      });
      console.log("KeysValues length " + result.length);
      // Remove a Key
      result = await this.store.removeItem("testJson");
      result = await this.store.getAllKeys();
      console.log("Get keys : " + result);
      console.log("Keys length " + result.length);
      if(isKey1 && !isKey2 && result && result.length === 2 && 
        keyList1.includes(result[0]) && keyList1.includes(result[1])) {
          console.log("test default store was successfull");
          document.querySelector('.success').classList.remove('display');
        } else {
          console.log("test default store was not successfull");
          document.querySelector('.failure').classList.remove('display');
        }

    } else {
      console.log("test default store was not successfull");
      document.querySelector('.failure').classList.remove('display');
    }

  }
  render() {

    return (
      <React.Fragment>
        <div className="StoreDefault">
          <div id="header">
            <Link to="/">
              <button>
                Home
              </button>
            </Link>
            <p id="title">Test Store Default</p>
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
export default StoreDefault;