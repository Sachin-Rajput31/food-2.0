
import "./Header.css";

import Loader from "./pizza";



const Header = () => {
  return (
    <div className="header">
      <div className="header-contents">

     
        
          <Loader/>
          
        <h3 className="orange-gradient-text">Taste That Travels Bringing Flavor to Your Door!♨️</h3>
        <button className="button">View Menu</button>
      </div>
    </div>
  );
};

export default Header;
