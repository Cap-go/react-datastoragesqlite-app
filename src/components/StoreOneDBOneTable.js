import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import "./StoreOneDBOneTable.css";
import { useStorageSQLite } from 'react-data-storage-sqlite-hook/dist';


const StoreOneDBOneTable = () => {
  const [log, setLog] = useState([]);

  const {openStore, getItem, setItem, getAllKeys, getAllValues,
    getAllKeysValues, isKey, setTable, removeItem, clear} = useStorageSQLite();
  useEffect(() => {
    async function testNamedStore() {
      const keyList1 = ["app","user"];
      // open a named store 
      setLog((log) => log.concat("**** Test One DB One Table Store ****\n")); 
      const resOpen =  await openStore({database:"myStore",table:"saveData"});
      if(resOpen) {
        setLog((log) => log.concat('One DB One Table Store open ' + resOpen + "\n"));
        // clear the store for successive test runs
        const rClear = await clear();
        if( rClear ) setLog((log) => log.concat('clear One DB One Table Store ' + rClear + "\n")); 
        // store a string 
        await setItem("app","App Opened");
        const app = await getItem('app');
        if( app ) setLog((log) => log.concat("app " + app + "\n")); 
        // store a JSON Object in the default store
        const data = {'age':40,'name':'jeep','email':'jeep@example.com'}
        await setItem("user",JSON.stringify(data));
        const testUser = await getItem("user");
        if( testUser ) setLog((log) => log.concat("testUser " + testUser + "\n")); 
        // Get All Keys
        const keys = await getAllKeys();
        setLog((log) => log.concat("keys : " + keys.length + "\n"));
        for(let i = 0; i< keys.length;i++) {
          setLog((log) => log.concat(' key[' + i + "] = " + keys[i] + "\n"));
        }
        if(keys && keys.length === 2 && 
          keyList1.includes(keys[0]) && keyList1.includes(keys[1])) {
            setLog((log) => log.concat("*** test one DB one Table Store was successfull ***\n"));
            document.querySelector('.success').classList.remove('display');
          } else {
            setLog((log) => log.concat("*** test one DB one Table Store was not successfull ***\n"));
            document.querySelector('.failure').classList.remove('display');
          }
      } else {
        setLog((log) => log.concat("*** test one DB one Table Store was not successfull ***\n"));
        document.querySelector('.failure').classList.remove('display');
      }
    }
    testNamedStore();
  }, [ openStore, getItem, setItem, getAllKeys, getAllValues,
    getAllKeysValues, isKey, setTable, removeItem, clear]);   

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
          <pre>
            <p>{log}</p>
          </pre>
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
export default StoreOneDBOneTable;