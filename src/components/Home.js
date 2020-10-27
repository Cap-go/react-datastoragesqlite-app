import React from "react";
import { Link } from 'react-router-dom';
import "./Home.css";

class Home extends React.Component{

  render() {
    return (
      <div className="Home">
        <div id="header">
            <p id="title">Home</p>
        </div>
        <div id="content">
          <Link to="/storedefault">
              <button type="button">
                    Store Default Test
              </button>
          </Link> 
          <Link to="/storeonedbonetable">
              <button type="button">
                    One DB One Table Test
              </button>
          </Link> 
          <Link to="/storeonedbtwotables">
              <button type="button">
                    One DB Two Tables Test
              </button>
          </Link> 
          <Link to="/storetwodbstwotables">
              <button type="button">
                    Two DBs Two Tables Test
              </button>
          </Link> 
          <Link to="/storeImagesIssue31">
              <button type="button">
                    Test Image issue#31
              </button>
          </Link> 
        </div>
      </div>  
   );
  }
}
export default Home;