import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import "./StoreOneDBTwoTables.css";
import { useStorageSQLite } from 'react-data-storage-sqlite-hook/dist';

const StoreOneDBTwoTables = () => {
  const [log, setLog] = useState([]);

  const {openStore, getItem, setItem, getAllKeys, getAllValues,
    getAllKeysValues, isKey, setTable, removeItem, clear} = useStorageSQLite();
  useEffect(() => {
    const keyList1 = ["app","user","state"];
    const keyList2 = ["key1","key2"];
    async function setFirstTable() {
      var firstTable = false;
      try {
        // open a named store 
        setLog((log) => log.concat("**** Test One DB One Table Store ****\n")); 
        await openStore({database:"myStore",table:"saveData"});
        setLog((log) => log.concat('One DB One Table Store open \n'));
        // clear the store table "saveData" for successive test runs
        await clear();
        setLog((log) => log.concat('clear One DB One Table Store \n')); 
        // store a string 
        await setItem("app","App Opened");
        const app = await getItem('app');
        if( app ) {
          setLog((log) => log.concat("app " + app + "\n")); 
        } else {
          throw(Error("app return null"));
        }
        // store a JSON Object in the default store
        const data = {'age':40,'name':'jeep','email':'jeep@example.com'}
        await setItem("user",JSON.stringify(data));
        const testUser = await getItem("user");
        if( testUser != null ) {
          setLog((log) => log.concat("testUser " + testUser + "\n")); 
        } else {
          throw(Error("testUser return null"));
        }
        // Get All Keys
        const keys = await getAllKeys();
        setLog((log) => log.concat("keys : " + keys.length + "\n"));
        for(let i = 0; i< keys.length;i++) {
          setLog((log) => log.concat(' key[' + i + "] = " + keys[i] + "\n"));
        }
        if(keys && keys.length === 2 && 
            keyList1.includes(keys[0]) && keyList1.includes(keys[1])) {
          firstTable = true;
          setLog((log) => log.concat("*** Set First Table Store was successfull ***\n"));
        } else {
          setLog((log) => log.concat("*** Set First Table Store was not successfull ***\n"));
        }
      } catch(err) {
        setLog((log) => log.concat(`>>> ${err}\n`));
        setLog((log) => log.concat("*** Set First Table Store was not successfull ***\n"));
      }
      return firstTable;
    }
    async function setSecondTable() {
      var secondTable = false;
      try {
        await setTable("otherData");
        setLog((log) => log.concat('set table "otherData" \n')); 
        // clear the store table "otherData" for successive test runs
        await clear();
        setLog((log) => log.concat('clear "otherData" table \n')); 
        // store data in the new table
        await setItem("key1", "Hello World!");
        const testKey1 = await getItem("key1");
        if( testKey1 != null ) {
          setLog((log) => log.concat("testKey1 " + testKey1 + "\n")); 
        } else {
          throw(Error("testKey1 return null"));
        }
        const data1 = {'a':60,'pi':'3.141516','b':'cool'}
        await setItem("key2",JSON.stringify(data1));
        const testKey2 = await getItem("key2");
        if( testKey2 != null) {
          setLog((log) => log.concat("testKey2 " + testKey2 + "\n")); 
        } else {
          throw(Error("testKey2 return null"));
        }
        const keys = await getAllKeys();
        setLog((log) => log.concat("keys : " + keys.length + "\n"));
        for(let i = 0; i< keys.length;i++) {
          setLog((log) => log.concat(' key[' + i + "] = " + keys[i] + "\n"));
        }
        if(keys && keys.length === 2 && 
            keyList2.includes(keys[0]) && keyList2.includes(keys[1])) {
          secondTable = true;
          setLog((log) => log.concat("*** Set Second Table Store was successfull ***\n"));
        } else {
          setLog((log) => log.concat("*** Set Second Table Store was not successfull ***\n"));
        }
      } catch(err) {
        setLog((log) => log.concat(`>>> ${err}\n`));
        setLog((log) => log.concat("*** Set Second Table Store was not successfull ***\n"));        
      }
      return secondTable;
    }
    async function updateFirstTable() {
      var firstTable = false;
      try {
        await setTable("saveData");
        setLog((log) => log.concat('set table "saveData" result \n')); 
        await setItem("state",JSON.stringify({'color':"#ff235a",'opacity':0.75}));
        // read app from the store
        const testState = await getItem("state");
        if( testState ) {
           setLog((log) => log.concat("state " + testState + "\n")); 
          } else {
            throw(Error("testState return null"));
          }
          // Get All Keys
        const keys = await getAllKeys();
        setLog((log) => log.concat("keys : " + keys.length + "\n"));
        for(let i = 0; i< keys.length;i++) {
          setLog((log) => log.concat(' key[' + i + "] = " + keys[i] + "\n"));
        }
        if(keys && keys.length === 3 && 
            keyList1.includes(keys[0]) && keyList1.includes(keys[1])
                && keyList1.includes(keys[2])) {
          firstTable = true;
          setLog((log) => log.concat("*** Update First Table Store was successfull ***\n"));
        } else {
          setLog((log) => log.concat("*** Update First Table Store was not successfull ***\n"));        
        }           
      } catch(err) {
        setLog((log) => log.concat(`>>> ${err}\n`));
        setLog((log) => log.concat("*** Update First Table Store was not successfull ***\n"));        
      }
      return firstTable;
    }
    async function getKeysValuesFromSecondTable() {
      var secondTable = false;
      try {
        await setTable("otherData");
        setLog((log) => log.concat('set table "otherData" result \n')); 
        const keysvalues = await getAllKeysValues();
        setLog((log) => log.concat("keysvalues : " + keysvalues.length + "\n"));
        for(let i = 0; i< keysvalues.length; i++) {
          setLog((log) => log.concat(' key[' + i + "] = " + keysvalues[i].key +
            ' value[' + i + "] = " + keysvalues[i].value  + "\n"));
        }
        if(keysvalues && keysvalues.length === 2 && 
          keyList2.includes(keysvalues[0].key) && keyList2.includes(keysvalues[1].key)) {
            secondTable = true;
            setLog((log) => log.concat("*** KeysValues from Second Table Store was successfull ***\n"));        
        } else {
          setLog((log) => log.concat("*** KeysValues from Second Table Store was not successfull ***\n"));        
        }
      } catch(err) {
        setLog((log) => log.concat(`>>> ${err}\n`));
        setLog((log) => log.concat("*** KeysValues from Second Table Store was not successfull ***\n"));        
      }
      return secondTable;
    }
    async function testStoreOneDBTwoTables() {
      // create the first table
      const firstTable = await setFirstTable(); 
      if(!firstTable) {
        document.querySelector('.failure').classList.remove('display'); 
        return;       
      }
      // create the second table in the same store
      const secondTable = await setSecondTable(); 
      if(!secondTable) {
        document.querySelector('.failure').classList.remove('display');
        return;        
      }
      // update first table
      const firstTable1 = await updateFirstTable();
      if(!firstTable1) {
        document.querySelector('.failure').classList.remove('display');
        return;        
      }
      // reopen the second store and read all keys-values
      const secondTable1 = await getKeysValuesFromSecondTable();
      if(!secondTable1) {
        document.querySelector('.failure').classList.remove('display');        
      } else {
        document.querySelector('.success').classList.remove('display');        
      }
      return;
    }
    testStoreOneDBTwoTables();
  }, [ openStore, getItem, setItem, getAllKeys, getAllValues,
    getAllKeysValues, isKey, setTable, removeItem, clear]);   

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
          <pre>
            <p>{log}</p>
          </pre>
          <p className="success display">
            The set of tests was successful
          </p>
          <p className="failure display">
            The set of tests failed
          </p>
        </div>
      </div>
    </React.Fragment>
  );

}
export default StoreOneDBTwoTables;