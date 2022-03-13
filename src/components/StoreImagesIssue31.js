import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import "./StoreImagesIssue31.css";
import { useStorageSQLite } from 'react-data-storage-sqlite-hook/dist';

const StoreImagesIssue31 = () => {
    const [log, setLog] = useState([]);
    const {openStore, getItem, setItem, getAllKeys, getAllValues,
        getAllKeysValues, isKey, setTable, removeItem, clear} = useStorageSQLite();
    useEffect(() => {
        async function testStoreImagesIssue31() {
            setLog((log) => log.concat("**** Test Images Issue#31 ****\n")); 
            const images = [
                "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAkCAYAAAD7PHgWAAAEcElEQVRYR8WYP2hTQRzHfx10aQchi0JcLGpBSBcrlTrpIjoFiy6FDipOHVz8Q0HrUGxdg1N1KBRBackiVoQ6FMVIuzQgpEpdjOiSLUXQIfK9976X37t3l6RNxVuS3Hvv7nPf3+/3vcvraTQaDdlFK4z3yMT8rh7d0Ww97QAzfX12wFq9br4buOk7UpicaQm5F4toCajh9LKnLm23Bex0Ee3k7ArwS/mVvH5elqEzzWmGr0dhDwGGFs3ouMAdA7491y+Dhw5KZuG9UEEA1r6XZfhUPOxgQ0pzPQJIDTi11NtOKOkKkHCcpfDrjQlxaXnGdFE1fAcg2to7sWmgAfVYWCzbPwO06imNHt0Tyd/IyfDlrYRy7kI3fvyUsyvRPbsCxIPIGQ6MAdFWD5RbKnjxZhTSWn0+AqyuS2agEPWNjZhPjrUngBgQkABDQ3hNOJdnmvkXa5UZ6W2CxXBaRoBiLLR2cLgnUSRIbOSLlptVx8LQk7k5iHutah44Pks12+VfApBVh04YsAbV1yR7sslYXU+oSPUK46NWZWPmseJdATLfTJ5UJsxYBNXqoc+EeX7RgpbmRmX1pcjsSq95VkP5AM1czMl63ViS27iNen2QYSUoH+bWVq1WpTh5OAFp1ekbtz7JRVJBPH/+Sk6O5i4YQCxc57Sbq0i1loA2R6hKfDho7rFLqZWzYvXiqCKgSi/6LSC+o7l2ZCIWz5UChHqfH2alvPVVRp/sT4Q7P/1NstmssZ6okNKAyD803+5BICjohjm90qgnAajhcNEHiP7BgQHZqFQkK49FF40uDtyHrZAKEQ6/NWDIoAkcBAQcmpuHoZWG+l1IwlHBjgGp3rP1zchi4kpG3vi+7wQUkMgz5p8tKIwdnzHbhtiatALTRcLvtBnmmc/ANQCuo3JxLGMF6+tmHFUULqgJsUl6Bwy/jXr1elQUWlGnj37JyfQksBhWL/tpM/itK9kHanOQ3rd47bcZxxSIkl97ow67u2Lfouh/+l6EnIvXuU5/TNkMAAjnA7RhUf9RQkWkTRhh9TUCuuO6kUooCMBc/xHzzLG71ZYJjAUhPD6TDUERxoXTC7CRiqOXAIRBZ/J5e3/oXxvhdE6FqpA2g+sslFaA3iLRMmvfYz6l8ixWD/3adF0bwXUNiN87gcP9qfOg72jkepVWkIC6ELQZu5BdAWIwbSl6F9AWQEAXRB8GtOpaxa4BCan3Tp3cemJ3G9R+R/g9DbGenDtLCJQVHIL0AeqKb7fFkaWjdzMIrz4+afdvpWKoslks+Lx9YltufQy/hPICUj1OQAOHR9KGeABwAfk6xOeFOmdrxaI5c6Ktffgjs5/4VzV6QRVUkKcafRMHQh8hQ9udPrm4ChJQw7n3EJYp4D0PPl3YlKtjx+0K3UEAiZ3G9T3fATWRd5UJ8cEBCm3o9D47Fc8CKUCEEw/om/kUD7H4zY2e+Vh8UJb8/fTrDt+BA8/rfZ/j63m9gLSYUHL7Ks99ndZpdYZew3Fub4hbVd3/uvYXfqiMwjPten8AAAAASUVORK5CYII=",
                "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAU1QTFRFNjtAQEVK////bG9zSk9T/v7+/f39/f3+9vf3O0BETlJWNzxB/Pz8d3t+TFFVzM3O1NXX7u/vUldbRElNs7W3v8HCmZyeRkpPW19j8vLy7u7vvsDC9PT1cHR3Oj9Eo6WnxsjJR0tQOD1Bj5KVgYSHTVFWtri50dLUtLa4YmZqOT5D8vPzRUpOkZOWc3Z64uPjr7Gzuru95+jpX2NnaGxwPkNHp6mrioyPlZeadXh8Q0hNPEBFyszNh4qNc3d6eHx/OD1Cw8XGXGBkfoGEra+xxcbIgoaJu72/m52ggoWIZ2tu8/P0wcLE+vr7kZSXgIOGP0NIvr/BvL6/QUZKP0RJkpWYpKaoqKqtVVldmJqdl5qcZWhstbe5bHB0bnJ1UVVZwsTF5ubnT1RYcHN3oaSm3N3e3NzdQkdLnJ+h9fX1TlNX+Pj47/DwwsPFVFhcEpC44wAAAShJREFUeNq8k0VvxDAQhZOXDS52mRnKzLRlZmZm+v/HxmnUOlFaSz3su4xm/BkGzLn4P+XimOJZyw0FKufelfbfAe89dMmBBdUZ8G1eCJMba69Al+AABOOm/7j0DDGXtQP9bXjYN2tWGQfyA1Yg1kSu95x9GKHiIOBXLcAwUD1JJSBVfUbwGGi2AIvoneK4bCblSS8b0RwwRAPbCHx52kH60K1b9zQUjQKiULbMDbulEjGha/RQQFDE0/ezW8kR3C3kOJXmFcSyrcQR7FDAi55nuGABZkT5hqpk3xughDN7FOHHHd0LLU9qtV7r7uhsuRwt6pEJJFVLN4V5CT+SErpXt81DbHautkpBeHeaqNDRqUA0Uo5GkgXGyI3xDZ/q/wJMsb7/pwADAGqZHDyWkHd1AAAAAElFTkSuQmCC"
            ];
            const imagesUrl = [
                "https:/example.com/image1",
                "https:/example.com/image2"
            ];
            let isValid = false;
            try {
                await openStore({database:"pfmaster",table:"profiles"});
                await setItem("img1", JSON.stringify({
                  id: "img1",
                  profileImg: imagesUrl[0],
                  text1: "This is image 1"  
                }));
                let iskey = await isKey('img1');
                setLog((log) => log.concat("iskey img1 " + iskey + " in table 'profiles'\n"));
                // Get All KeysValues
                const keysvalues = await getAllKeysValues();
                setLog((log) => log.concat("keysvalues table 'profiles' : " + keysvalues.length + "\n"));
                for(let i = 0; i< keysvalues.length;i++) {
                setLog((log) => log.concat(" key[" + i + "] = " + keysvalues[i].key +
                    " value[" + i + "] = " + keysvalues[i].value  + "\n"));
                }
                // Open the profilesImages table
                await setTable("profilesImages");
                setLog((log) => log.concat("set table 'profilesImages' \n")); 
                await setItem("img1", images[0]);
                iskey = await isKey('img1');
                setLog((log) => log.concat("iskey img1 " + iskey + " in table 'profilesImages'\n"));
                // Get All KeysValues
                const keysvalues1 = await getAllKeysValues();
                setLog((log) => log.concat("keysvalues table 'profilesImages' : " + keysvalues1.length + "\n"));
                for(let i = 0; i< keysvalues1.length;i++) {
                setLog((log) => log.concat(" key[" + i + "] = " + keysvalues1[i].key +
                    " value[" + i + "] = " + keysvalues1[i].value  + "\n"));
                }
                // Set profiles table
                await setTable("profiles");
                setLog((log) => log.concat("set table 'profiles' result \n")); 
                await setItem("img2", JSON.stringify({
                    id: "img2",
                    profileImg: imagesUrl[1],
                    text1: "This is image 2"  
                }));
                iskey = await isKey('img2');
                setLog((log) => log.concat("iskey img2 " + iskey + " in table 'profiles'\n"));
                // Get All KeysValues
                const keysvalues2 = await getAllKeysValues();
                setLog((log) => log.concat("keysvalues table 'profiles' : " + keysvalues2.length + "\n"));
                for(let i = 0; i< keysvalues2.length;i++) {
                setLog((log) => log.concat(" key[" + i + "] = " + keysvalues2[i].key +
                    " value[" + i + "] = " + keysvalues2[i].value  + "\n"));
                }
                if( keysvalues2.length === 2 ) isValid = true;
                if(isValid) {
                    // Open the profilesImages table
                    await setTable("profilesImages");
                    setLog((log) => log.concat("set table 'profilesImages' result \n")); 
                    await setItem("img2", images[1]);
                    const iskey = await isKey('img2');
                    setLog((log) => log.concat("iskey img2 " + iskey + " in table 'profilesImages'\n"));
                    // Get All KeysValues
                    const keysvalues = await getAllKeysValues();
                    setLog((log) => log.concat("keysvalues table 'profilesImages' : " + keysvalues.length + "\n"));
                    for(let i = 0; i< keysvalues.length;i++) {
                    setLog((log) => log.concat(" key[" + i + "] = " + keysvalues[i].key +
                        " value[" + i + "] = " + keysvalues[i].value  + "\n"));
                    }
                    if( keysvalues.length === 2 ) {
                        isValid = true;
                    } else {
                        isValid = false;
                    }
                }
                if (isValid) {
                    document.querySelector('.success').classList.remove('display');

                } else {
                    document.querySelector('.failure').classList.remove('display');
                }

                
              } catch(err) {
                setLog((log) => log.concat(`>>> ${err}\n`));
                setLog((log) => log.concat("*** Set 'profiles' table failed ***\n"));
                document.querySelector('.failure').classList.remove('display');
            }
        }
    testStoreImagesIssue31();
  }, [ openStore, getItem, setItem, getAllKeys, getAllValues,
    getAllKeysValues, isKey, setTable, removeItem, clear]);   

  return (
    <React.Fragment>
      <div className="StoreImagesIssue31">
        <div id="header">
          <Link to="/">
            <button>
              Home
            </button>
          </Link>
          <p id="title">Test Store Images Issue#31</p>
        </div>
        <div id="content">
          <pre>
            <p>{log}</p>
          </pre>
          <p className="success display">
            The test StoreImagesIssue31 was successful
          </p>
          <p className="failure display">
            The test StoreImagesIssue31 failed
          </p>
        </div>
      </div>
    </React.Fragment>
  );

}
export default StoreImagesIssue31;