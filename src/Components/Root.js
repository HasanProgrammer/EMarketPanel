import React from "react";
import { BrowserRouter as Router , Switch , Route} from "react-router-dom";

/*-------------------------------------------------------------------*/

//Components
import MasterPage             from "./MasterPage";
import HomePage               from "./HomePage";
import LoginPage              from "./AccountPages/LoginPage";
import CreateRootCategoryPage from "./RootCategoryPages/CreatePage";
import EditRootCategoryPage   from "./RootCategoryPages/EditPage";
import IndexRootCategoryPage  from "./RootCategoryPages/IndexPage";
import CreateCategoryPage     from "./CategoryPages/CreatePage";
import EditCategoryPage       from "./CategoryPages/EditPage";
import IndexCategoryPage      from "./CategoryPages/IndexPage";
import IndexRolePage          from "./RolePages/IndexPage";
import CreateRolePage         from "./RolePages/CreatePage";
import CreatePermissionPage   from "./PermissionPages/CreatePage";
import EditPermissionPage     from "./PermissionPages/EditPage";
import IndexPermissionPage    from "./PermissionPages/IndexPage";
import IndexUserPage          from "./UserPages/IndexPage";

//Configs
import RouteConfig  from "./../Configs/Route";

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

                    <Route path={`${RouteConfig.LoginPage}`}>
                        <LoginPage/>
                    </Route>

                    <MasterPage>

                        {/*RootCategory*/}
                        <Route exact path={`${RouteConfig.HomePage}`}>
                            <HomePage/>
                        </Route>

                        <Route path={`${RouteConfig.AllRootCategoryPage}`}>
                            <IndexRootCategoryPage/>
                        </Route>

                        <Route path={`${RouteConfig.CreateRootCategoryPage}`}>
                            <CreateRootCategoryPage/>
                        </Route>

                        <Route path={`${RouteConfig.EditRootCategoryPage}`} component={EditRootCategoryPage}/>
                        {/*RootCategory*/}

                        {/*Category*/}
                        <Route path={`${RouteConfig.AllCategoryPage}`}>
                            <IndexCategoryPage/>
                        </Route>

                        <Route path={`${RouteConfig.CreateCategoryPage}`}>
                            <CreateCategoryPage/>
                        </Route>

                        <Route path={`${RouteConfig.EditCategoryPage}`} component={EditCategoryPage}/>
                        {/*Category*/}

                        {/*Role*/}
                        <Route path={`${RouteConfig.AllRolePage}`}>
                            <IndexRolePage/>
                        </Route>

                        <Route path={`${RouteConfig.CreateRolePage}`}>
                            <CreateRolePage/>
                        </Route>
                        {/*Role*/}

                        {/*Permission*/}
                        <Route path={`${RouteConfig.AllPermissionPage}`}>
                            <IndexPermissionPage/>
                        </Route>

                        <Route path={`${RouteConfig.CreatePermissionPage}`}>
                            <CreatePermissionPage/>
                        </Route>

                        <Route path={`${RouteConfig.EditPermissionPage}`} component={EditPermissionPage}/>
                        {/*Permission*/}

                        {/*User*/}
                        <Route path={`${RouteConfig.AllUserPage}`}>
                            <IndexUserPage/>
                        </Route>
                        {/*User*/}

                    </MasterPage>

                </Switch>
            </Router>
        );
    }
}

export default Root;