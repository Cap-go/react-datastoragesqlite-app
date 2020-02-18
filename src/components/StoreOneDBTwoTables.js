import React from "react";
import { Link } from 'react-router-dom';
import "./StoreOneDBTwoTables.css";
import { StoreService } from "../services/StoreService";

class StoreOneDBTwoTables extends React.Component{

  constructor() {
    super();
    this.store = new StoreService();
    console.log("in constructor this.store ",this.store)
  }

  async componentDidMount() {
    await this.store.init();
    console.log('store.isService ',this.store.isService());
    console.log('store.platform ',this.store.platform());
    await this.StoreOneDBTwoTables();
  }
  componentWillUnmount() {
    this.store = null;
  }

  async StoreOneDBTwoTables() {
    var firstTable = false;
    var secondTable = false;
    var firstTable1 = false;
    var secondTable1 = false;
    const keyList1 = ["app","user","state"];
    const keyList2 = ["key1","key2"];

    /***************************************
     * Open "myStore" and table "saveData" *
     ***************************************/ 

    console.log("**** Test One DB Two Table Store");
    var result = await this.store.openStore({database:"myStore",table:"saveData"});
    if(result) {
      console.log('Default Database open ', result);
      // Clear the table "saveData" in case of multiple runs
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
          firstTable = true;
      }
      console.log("******************")
      console.log(" firstTable ",firstTable)
      console.log("******************")
      /***************************************
       * Open "myStore" and table "otherData" *
       ***************************************/ 

      result = await this.store.setTable("otherData");
      // Clear the table "otherData" in case of multiple runs
      await this.store.clear();
      // store data in the new table
      await this.store.setItem("key1", "Hello World!");
      result = await this.store.getItem("key1");
      console.log("Get Data in New Table key1: " + result);
      const data1 = {'a':60,'pi':'3.141516','b':'cool'}
      await this.store.setItem("key2",JSON.stringify(data1));
      result = await this.store.getItem("key2");
      // Get All Keys
      result = await this.store.getAllKeys();
      console.log("Get keys : " + result);
      console.log("Keys length " + result.length);

      if(result && result.length === 2 && 
        keyList2.includes(result[0]) && keyList2.includes(result[1])) {
          secondTable = true;
      }
      console.log("******************")
      console.log(" secondTable ",secondTable)
      console.log("******************")

      /***************************************
       * Store new Data in table "saveData"  *
       ***************************************/ 
      result = await this.store.setTable("saveData");
      // store a string in the default store
      await this.store.setItem("state",JSON.stringify({'color':"#ff235a",'opacity':0.75}));
      // read app from the store
      result = await this.store.getItem("state");
      console.log('Get app ', result);
      // Get All Keys
      result = await this.store.getAllKeys();
      console.log("Get keys : " + result);
      console.log("Keys length " + result.length);
      if(result && result.length === 3 && 
        keyList1.includes(result[0]) && keyList1.includes(result[1]) && 
        keyList1.includes(result[2])) {
          firstTable1 = true;
      }
      console.log("******************")
      console.log(" firstTable1 ",firstTable1)
      console.log("******************")

      /***************************************
       * get Data in table "otherData"       *
       ***************************************/ 
      result = await this.store.setTable("otherData");
      // Get All Keys
      result = await this.store.getAllKeys();
      console.log("Get keys : " + result);
      console.log("Keys length " + result.length);
      if(result && result.length === 2 && 
        keyList2.includes(result[0]) && keyList2.includes(result[1])) {
          secondTable1 = true;
      }
      console.log("******************")
      console.log(" secondTable1 ",secondTable1)
      console.log("******************")

      if(firstTable && secondTable && firstTable1 && secondTable1 ) {
          console.log("test one DB two Tables was successfull");
          document.querySelector('.success').classList.remove('display');
      } else {
          console.log("test one DB two Tables was not successfull");
          document.querySelector('.failure').classList.remove('display');
      }

    } else {
      console.log("test one DB two Tables was not successfull");
      document.querySelector('.failure').classList.remove('display');
    }

  }
  render() {

    return (
      <React.Fragment>
        <div className="StoreOneDBTwoTables">
          <div id="header">
            <Link to="/">
              <button>
                Home
              </button>
            </Link>
            <p id="title">Test Store One DB Two Tables</p>
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
export default StoreOneDBTwoTables;