import React from "react";
import { Link } from 'react-router-dom';
import "./StoreTwoDBsTwoTables.css";
import { StoreService } from "../services/StoreService";

class StoreTwoDBsTwoTables extends React.Component{

  constructor() {
    super();
    this.store = new StoreService();
    console.log("in constructor this.store ",this.store)
  }

  async componentDidMount() {
    await this.store.init();
    console.log('store.isService ',this.store.isService());
    console.log('store.platform ',this.store.platform());
    await this.StoreTwoDBsTwoTables();
  }
  componentWillUnmount() {
    this.store = null;
  }

  async StoreTwoDBsTwoTables() {
    var firstDBfirstTable = false;
    var firstDBsecondTable = false;
    var firstDBfirstTable1 = false;
    var firstDBsecondTable1 = false;
    var secondDBfirstTable = false;
    var secondDBsecondTable = false;
    var secondDBfirstTable1 = false;
    var secondDBsecondTable1 = false;
    const keyList1 = ["app","user","state"];
    const keyList2 = ["key1","key2"];
    const keyList3 = ["session","contact","state"];
    const keyList4 = ["comments1","comments2","comments3"];

    /***************************************
     * Open "myStore" and table "saveData" *
     ***************************************/ 

    console.log("**** Test Two DBs Two Table Store");
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
          firstDBfirstTable = true;
      }
      console.log("******************")
      console.log(" firstDBfirstTable ",firstDBfirstTable)
      console.log("******************")
    }
    /***************************************
     * Open "secondStore" and table "saveData" *
     ***************************************/ 

    result = await this.store.openStore({database:"secondStore",table:"saveData"});
    if(result) {
      console.log('Default Database open ', result);
      // Clear the table "saveData" in case of multiple runs
      await this.store.clear();
      // store a string 
      await this.store.setItem("session","Session Opened");
      // read app from the store
      result = await this.store.getItem("session");
      console.log('Get session ', result);
      // store a JSON Object 
      const data = {'age':30,'name':'White','email':'white@example.com'}
      await this.store.setItem("contact",JSON.stringify(data));
      result = await this.store.getItem("contact");
      console.log("Get JSON Object : " + result);
      // Get All Keys
      result = await this.store.getAllKeys();
      console.log("Get keys : " + result);
      console.log("Keys length " + result.length);
      console.log("Keys[0] " + result[0]);
      console.log("Keys[1] " + result[1]);
      console.log("Keys length " + result.length);
      if(result && result.length === 2 && 
        keyList3.includes(result[0]) && keyList3.includes(result[1])) {
          secondDBfirstTable = true;
      }
      console.log("******************")
      console.log(" secondDBfirstTable ",secondDBfirstTable)
      console.log("******************")

    }

    /***************************************
     * Open "myStore" and table "otherData" *
     ***************************************/ 
    result = await this.store.openStore({database:"myStore",table:"otherData"});
    if(result) {
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
          firstDBsecondTable = true;
      }
      console.log("******************")
      console.log(" firstDBsecondTable ",firstDBsecondTable)
      console.log("******************")

      /***************************************
       * Store new Data in table "saveData"  *
       ***************************************/ 
      result = await this.store.setTable("saveData");
      // store a string in the default store
      await this.store.setItem("state",JSON.stringify({'color':"#ff235a",'opacity':0.75}));
      // read app from the store
      result = await this.store.getItem("state");
      console.log('Get state ', result);
      // Get All Keys
      result = await this.store.getAllKeys();
      console.log("Get keys : " + result);
      console.log("Keys length " + result.length);
      if(result && result.length === 3 && 
        keyList1.includes(result[0]) && keyList1.includes(result[1]) && 
        keyList1.includes(result[2])) {
          firstDBfirstTable1 = true;
      }
      console.log("******************")
      console.log(" firstDBfirstTable1 ",firstDBfirstTable1)
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
          firstDBsecondTable1 = true;
      }
      console.log("******************")
      console.log(" firstDBsecondTable1 ",firstDBsecondTable1)
      console.log("******************")
    }
    /*******************************************
     * Open "secondStore" and table "comments" *
     *******************************************/ 
    result = await this.store.openStore({database:"secondStore",table:"comments"});
    if(result) {
      // Clear the table "comments" in case of multiple runs
      await this.store.clear();
      // store data in the new table
      await this.store.setItem("comments1", "Lorem ipsum dolor sit amet");
      result = await this.store.getItem("comments1");
      console.log('Get comments1 ', result);
      await this.store.setItem("comments2", "Nam pretium risus velit");
      result = await this.store.getItem("comments2");
      console.log('Get comments2 ', result);
      // Get All Keys
      result = await this.store.getAllKeys();
      console.log("Get keys : " + result);
      console.log("Keys length " + result.length);
      if(result && result.length === 2 && 
        keyList4.includes(result[0]) && keyList4.includes(result[1])) {
          secondDBsecondTable = true;
      }
      console.log("******************")
      console.log(" secondDBsecondTable ",secondDBsecondTable)
      console.log("******************")

      /****************************************************
       * Store data in "secondStore" and table "saveData" *
       ****************************************************/ 

      result = await this.store.setTable("saveData");
      await this.store.setItem("state", JSON.stringify({platform: ['ios','android','web']}));
      result = await this.store.getItem("state");
      console.log('Get state ', result);
      // Get All Keys
      result = await this.store.getAllKeys();
      console.log("Get keys : " + result);
      console.log("Keys length " + result.length);
      if(result && result.length === 3 && 
        keyList3.includes(result[0]) && keyList3.includes(result[1]) && 
        keyList3.includes(result[2])) {
          secondDBfirstTable1 = true;
      }
      console.log("******************")
      console.log(" secondDBfirstTable1 ",secondDBfirstTable1)
      console.log("******************")

      result = await this.store.setTable("comments");
      await this.store.setItem("comments3", "Suspendisse lobortis volutpat elit ac mattis");
      result = await this.store.getItem("comments3");
      console.log('Get comments3 ', result);
      // Get All Keys
      result = await this.store.getAllKeys();
      console.log("Get keys : " + result);
      console.log("Keys length " + result.length);
      if(result && result.length === 3 && 
        keyList4.includes(result[0]) && keyList4.includes(result[1]) && 
        keyList4.includes(result[2])) {
          secondDBsecondTable1 = true;
      }
      console.log("******************")
      console.log(" secondDBsecondTable1 ",secondDBsecondTable1)
      console.log("******************")

    }
    if(firstDBfirstTable && firstDBsecondTable && firstDBfirstTable1 && firstDBsecondTable1 &&
      secondDBfirstTable && secondDBsecondTable && secondDBfirstTable1 && secondDBsecondTable1) {
        console.log("test one DB two Tables was successfull");
        document.querySelector('.success').classList.remove('display');
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
export default StoreTwoDBsTwoTables;