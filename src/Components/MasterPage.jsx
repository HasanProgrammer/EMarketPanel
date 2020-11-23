import React from "react";

/*-------------------------------------------------------------------*/

//Components
import NavBar  from "./Partials/Common/NavBar";
import SideBar from "./Partials/Common/SideBar";
import Footer  from "./Partials/Common/Footer";

/**
 * @class HomePage
 */
class MasterPage extends React.Component
{
    /**
     * @property state
     */
    state =
    {

    };

    /**
     * @function render
     */
    render()
    {
        return (
            <div>
                <NavBar/>
                <SideBar/>
                {this.props.children}
                <Footer/>
            </div>
        )
    }
}

export default MasterPage;