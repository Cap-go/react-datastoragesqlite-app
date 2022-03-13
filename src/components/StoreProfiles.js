import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import "./StoreProfiles.css";
import { useStorageSQLite } from 'react-data-storage-sqlite-hook/dist';


const StoreProfiles = () => {
  const [log, setLog] = useState([]);
  // --> below add to demonstrate issue#5
  const [profileList, setProfileList] = useState([]);
  // <--

  const {openStore, setItem, getAllKeysValues, clear} = useStorageSQLite();
  useEffect(() => {
    async function testStoreProfiles() {
      try {
        // open a default store 
        setLog((log) => log.concat("**** Test Profiles Store ****\n")); 
        await openStore({database:"testProfiles",table:"profiles"});
        setLog((log) => log.concat('open Profiles Store \n'));
        // clear the store 
        await clear();
        setLog((log) => log.concat('clear Profiles Store \n'));
        // store profiles
        const jsonProfiles = [
          {id:"profile_kh1iwmnm",profileImg:"capacitor://localhost/_capacitor_file_/var/mobile/Containers/Data/Application/36884AA4-3B3D-45E2-9515-2460C0BBD0AA/Documents/pfimages/kh1iweg6.jpeg",firstName:"caca",lastName:"affa"},
          {id:"profile_kh1jj9zq",profileImg:"capacitor://localhost/_capacitor_file_/var/mobile/Containers/Data/Application/895D8F3D-B474-47BD-8727-4D161AA58112/Documents/pfimages/kh1jivfr.jpeg",firstName:"dnnsbd",lastName:"bsbz"}
        ]
        await setItem("profile_kh1iwmnm", JSON.stringify(jsonProfiles[0])); 
        await setItem("profile_kh1jj9zq", JSON.stringify(jsonProfiles[1])); 
        // Get All KeysValues
        const keysvalues = await getAllKeysValues();
        setLog((log) => log.concat("keysvalues : " + keysvalues.length + "\n"));
        if (keysvalues.length === 2) {
          let profiles = keysvalues.map(c => JSON.parse(c["value"]));
          setProfileList(profiles);
          setLog((log) => log.concat("*** Test Profiles Store was successfull ***\n"));
          document.querySelector('.success').classList.remove('display');

        } else {
          setLog((log) => log.concat("*** Test Profiles Store was not successfull ***\n"));
          document.querySelector('.failure').classList.remove('display');
        }  
      } catch(err) {
        setLog((log) => log.concat(`>>> ${err}\n`));
        setLog((log) => log.concat("*** Test Profiles Store was not successfull ***\n"));
        document.querySelector('.failure').classList.remove('display');
      }
    }
    testStoreProfiles();
  }, [ openStore, setItem, getAllKeysValues, clear]); 

  return (
    <React.Fragment>
      <div className="StoreProfiles">
        <div id="header">
          <Link to="/">
            <button>
              Home
            </button>
          </Link>
          <p id="title">Test Store Profiles</p>
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
          <ul>
            {profileList.map(item => (
              <li key={item.id}>
                <div>{item.id} {item.lastName}</div>
              </li>
            ))}
          </ul>

        </div>
      </div>
    </React.Fragment>
  );

}
export default StoreProfiles;