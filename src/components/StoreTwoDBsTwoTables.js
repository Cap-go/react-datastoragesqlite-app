import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import "./StoreTwoDBsTwoTables.css";
import { useStorageSQLite } from 'react-data-storage-sqlite-hook/dist';


const StoreTwoDBsTwoTables = () => {
  const [log, setLog] = useState([]);

  const {openStore, getItem, setItem, getAllKeys, getAllValues,
    getAllKeysValues, isKey, setTable, removeItem, clear} = useStorageSQLite();
  useEffect(() => {
    const keyList1 = ["app","user","state"];
    const keyList2 = ["key1","key2"];
    const keyList3 = ["session","contact","state"];
    const keyList4 = ["comment1","comment2","comment3"];
    async function setFirstDBFirstTable() {
      var firstTable = false;
      // open a named store 
      setLog((log) => log.concat("**** Test Two DBs Two Tables Store ****\n")); 
      const resOpen =  await openStore({database:"myStore",table:"saveData"});
      if(resOpen) {
        // clear the store table "saveData" for successive test runs
        await clear();
        // store a string 
        await setItem("app","App Opened");
        await getItem('app');
        // store a JSON Object in the default store
        const data = {'age':40,'name':'jeep','email':'jeep@example.com'}
        await setItem("user",JSON.stringify(data));
        await getItem("user");
        // Get All Keys
        const keys = await getAllKeys();
        if(keys && keys.length === 2 && 
            keyList1.includes(keys[0]) && keyList1.includes(keys[1])) {
          firstTable = true;
          setLog((log) => log.concat("*** Set First Table Store was successfull ***\n"));
        } else {
          setLog((log) => log.concat("*** Set First Table Store was not successfull ***\n"));
        }
      } else {
        setLog((log) => log.concat("*** Set First Table Store was not successfull ***\n"));
      }
      return firstTable;
    }
    async function setFirstDBSecondTable() {
      var secondTable = false;
      setLog((log) => log.concat("**** Test First Store Second Table ****\n")); 
      const resOpen = await openStore({database:"myStore",table:"otherData"});
      if(resOpen) {
        // clear the store table "otherData" for successive test runs
        await clear();
        // store data in the new table
        await setItem("key1", "Hello World!");
        await getItem("key1");
        const data1 = {'a':60,'pi':'3.141516','b':'cool'}
        await setItem("key2",JSON.stringify(data1));
        await getItem("key2");
        const keys = await getAllKeys();
        if(keys && keys.length === 2 && 
            keyList2.includes(keys[0]) && keyList2.includes(keys[1])) {
          secondTable = true;
          setLog((log) => log.concat("*** Set First Store Second Table was successfull ***\n"));
        } else {
          setLog((log) => log.concat("*** Set First Store Second Table was not successfull ***\n"));
        }
      } else {
        setLog((log) => log.concat("*** Set First Store Second Table was not successfull ***\n"));        
      }
      return secondTable;
    }
    async function updateFirstDBFirstTable() {
      var firstTable = false;
      setLog((log) => log.concat("**** Test First Store First Table ****\n")); 
      const r = await setTable("saveData");
      if(r.result) {
        await setItem("state",JSON.stringify({'color':"#ff235a",'opacity':0.75}));
        // read app from the store
        await getItem("state");
        // Get All Keys
        const keys = await getAllKeys();
        if(keys && keys.length === 3 && 
            keyList1.includes(keys[0]) && keyList1.includes(keys[1]) && keyList1.includes(keys[2])) {
          firstTable = true;
          setLog((log) => log.concat("*** Update First Store First Table was successfull ***\n"));
        } else {
          setLog((log) => log.concat("*** Update First Store First Table was not successfull ***\n"));        
        }           
      } else {
        setLog((log) => log.concat("*** Update First Store First Table was not successfull ***\n"));        
      }
      return firstTable;
    }
    async function getKeysValuesFromFirstDBSecondTable() {
      var secondTable = false;
      setLog((log) => log.concat("**** Test First Store Second Table ****\n")); 
      const r = await setTable("otherData");
      if(r.result) {
        const keysvalues = await getAllKeysValues();
        if(keysvalues && keysvalues.length === 2 && 
          keyList2.includes(keysvalues[0].key) && keyList2.includes(keysvalues[1].key)) {
            secondTable = true;
            setLog((log) => log.concat("*** KeysValues from First Store Second Table was successfull ***\n"));        
        } else {
          setLog((log) => log.concat("*** KeysValues from First Store Second Table was not successfull ***\n"));        
        }
      } else {
        setLog((log) => log.concat("*** KeysValues from First Store Second Table was not successfull ***\n"));        
      }
      return secondTable;
    }
    async function setSecondDBFirstTable() {
      var firstTable = false;
      // open a named store 
      setLog((log) => log.concat("**** Test Second Store First Table ****\n")); 
      const resOpen =  await openStore({database:"secondStore",table:"saveData"});
      if(resOpen) {
        // clear the store table "saveData" for successive test runs
        await clear();
        // store a string 
        await setItem("session","Session Opened");
        await getItem('session');
        // store a JSON Object in the default store
        const data = {'age':30,'name':'White','email':'white@example.com'}
        await setItem("contact",JSON.stringify(data));
        await getItem("contact");
        // Get All Keys
        const keys = await getAllKeys();
        if(keys && keys.length === 2 && 
            keyList3.includes(keys[0]) && keyList3.includes(keys[1])) {
          firstTable = true;
          setLog((log) => log.concat("*** Set Second Store First Table was successfull ***\n"));
        } else {
          setLog((log) => log.concat("*** Set Second Store First Table was not successfull ***\n"));
        }
      } else {
        setLog((log) => log.concat("*** Set Second Store First Table was not successfull ***\n"));
      }
      return firstTable;
    }
    async function setSecondDBSecondTable() {
      var secondTable = false;
      setLog((log) => log.concat("**** Test Second Store First Table ****\n")); 
      const resOpen =  await openStore({database:"secondStore",table:"comments"});
      if(resOpen) {
        // clear the store table "saveData" for successive test runs
        await clear();
        // store data in the new table
        await setItem("comment1", "Lorem ipsum dolor sit amet");
        await getItem("comment1");
        await setItem("comment2", "Nam pretium risus velit");
        await getItem("comment2");
        // Get All Keys
        const keys = await getAllKeys();
        if(keys && keys.length === 2 && 
            keyList4.includes(keys[0]) && keyList4.includes(keys[1])) {
          secondTable = true;    
          setLog((log) => log.concat("*** Set Second Store Second Table was successfull ***\n"));
        } else {
          setLog((log) => log.concat("*** Set Second Store Second Table was not successfull ***\n"));
        }
      } else {
        setLog((log) => log.concat("*** Set Second Store Second Table was not successfull ***\n"));
      }
      return secondTable;
    }    
    async function updateSecondDBFirstTable() {
      var firstTable = false;
      setLog((log) => log.concat("**** Test Second Store First Table ****\n")); 
      const r = await setTable("saveData");
      if(r.result) {
        await setItem("state",JSON.stringify({platform: ['ios','android','web']}));
        await getItem("state");
        // Get All Keys
        const keys = await getAllKeys();
        if(keys && keys.length === 3 && 
            keyList3.includes(keys[0]) && keyList3.includes(keys[1])
                && keyList3.includes(keys[2])) {
          firstTable = true;
          setLog((log) => log.concat("*** Update Second Store First Table was successfull ***\n"));
        } else {
          setLog((log) => log.concat("*** Update Second Store First Table was not successfull ***\n"));        
        }           
      } else {
        setLog((log) => log.concat("*** Update Second Store First Table was not successfull ***\n"));        
      }
      return firstTable;
    }
    async function getKeysValuesFromSecondDBSecondTable() {
      var secondTable = false;
      setLog((log) => log.concat("**** Test Second Store Second Table ****\n")); 
      const r = await setTable("comments");
      if(r.result) {
        await setItem("comment3", "Suspendisse lobortis volutpat elit ac mattis");
        await getItem("comment3");
        // Get All Keys
        const keys = await getAllKeys();
        if(keys && keys.length === 3 && 
            keyList4.includes(keys[0]) && keyList4.includes(keys[1])
                && keyList4.includes(keys[2])) {
          secondTable = true;
          setLog((log) => log.concat("*** Update Second Store Second Table was successfull ***\n"));
        } else {
          setLog((log) => log.concat("*** Update Second Store Second Table was not successfull ***\n"));        
        }           
      } else {
        setLog((log) => log.concat("*** Update Second Store Second Table was not successfull ***\n"));        
      }
      return secondTable;
    }    
    async function testStoreTwoDBsTwoTables() {
      // create the first table in the first store
      const fStore_fTable = await setFirstDBFirstTable(); 
      if(!fStore_fTable) {
        document.querySelector('.failure').classList.remove('display'); 
        return;       
      }
      // create the first table in the second store
      const sStore_fTable = await setSecondDBFirstTable(); 
      if(!sStore_fTable) {
        document.querySelector('.failure').classList.remove('display'); 
        return;       
      }
      // create the second table in the first store
      const fStore_sTable = await setFirstDBSecondTable(); 
      if(!fStore_sTable) {
        document.querySelector('.failure').classList.remove('display'); 
        return;       
      }
      // update first table in the first store
      const fStore_fTable1 = await updateFirstDBFirstTable();
      if(!fStore_fTable1) {
        document.querySelector('.failure').classList.remove('display');
        return;        
      }
      // reopen the second table in the first store and read all keys-values
      const fStore_sTable1 = await getKeysValuesFromFirstDBSecondTable();
      if(!fStore_sTable1) {
        document.querySelector('.failure').classList.remove('display');        
      } else {
        document.querySelector('.success').classList.remove('display');        
      }
      // open second table in second store
      const sStore_sTable = await setSecondDBSecondTable(); 
      if(!sStore_sTable) {
        document.querySelector('.failure').classList.remove('display'); 
        return;       
      }
      // update first table in the second store
      const sStore_fTable1 = await updateSecondDBFirstTable();
      if(!sStore_fTable1) {
        document.querySelector('.failure').classList.remove('display');
        return;        
      }
      // reopen the second table in the second store and read all keys-values
      const sStore_sTable1 = await getKeysValuesFromSecondDBSecondTable();
      if(!sStore_sTable1) {
        document.querySelector('.failure').classList.remove('display');        
      } else {
        document.querySelector('.success').classList.remove('display');        
      }

      return;
    }
    testStoreTwoDBsTwoTables();
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
          <p id="title">Test Store Two DBs Two Tables</p>
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

export default StoreTwoDBsTwoTables;