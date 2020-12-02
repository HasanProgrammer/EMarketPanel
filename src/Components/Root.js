import React from "react";
import { BrowserRouter as Router , Switch , Route} from "react-router-dom";

/*-------------------------------------------------------------------*/

//Components
import MasterPage from "./MasterPage";
import HomePage   from "./HomePage";
import CreatePage from "./RootCategoryPages/CreatePage"
import EditPage   from "./RootCategoryPages/EditPage";
import IndexPage  from "./RootCategoryPages/IndexPage";

//Configs
import RouteConfig from "./../Configs/Route";

/**
 * @class Root
 */
class Root extends React.Component
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
            <Router>
                <Switch>

                    <MasterPage>

                        <Route exact path={`${RouteConfig.HomePage}`}>
                            <HomePage/>
                        </Route>

                        <Route path={`${RouteConfig.AllRootCategoryPage}`}>
                            <IndexPage/>
                        </Route>

                        <Route path={`${RouteConfig.CreateRootCategoryPage}`}>
                            <CreatePage/>
                        </Route>

                        <Route path={`${RouteConfig.EditRootCategoryPage}`} component={EditPage}/>

                    </MasterPage>

                </Switch>
            </Router>
        );
    }
}

export default Root;