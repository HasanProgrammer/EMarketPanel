import React from "react";
import { Redirect } from "react-router-dom";

/*-------------------------------------------------------------------*/

//Components
import NavBar  from "./Partials/Common/NavBar";
import SideBar from "./Partials/Common/SideBar";
import Footer  from "./Partials/Common/Footer";

/*-------------------------------------------------------------------*/

//Configs
import Route from "./../Configs/Route.json";

/*-------------------------------------------------------------------*/

//Plugins
import { ToastContainer } from "react-toastify";

/*-------------------------------------------------------------------*/

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
        return localStorage.getItem("Expired") != null ? ( <Redirect to={`${Route.LoginPage}`}/> ) : (
            <div>
                <ToastContainer/>
                <NavBar/>
                <SideBar/>
                {this.props.children}
                {/*<Footer/>*/}
            </div>
        )
    }
}

export default MasterPage;