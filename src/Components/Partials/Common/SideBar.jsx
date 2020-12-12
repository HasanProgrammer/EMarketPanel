import React    from "react";
import { Link } from "react-router-dom";

/*-------------------------------------------------------------------*/

//Configs
import RouteConfig from "./../../../Configs/Route"

/**
 * @class Footer
 */
class SideBar extends React.Component
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
            <div className="main-sidebar sidebar-style-2">
                <aside id="sidebar-wrapper">

                    <ul className="sidebar-menu">
                        <li className="dropdown active" style={{display: "block"}}>
                            <div className="sidebar-profile">
                                <div className="siderbar-profile-pic">
                                    <img src="/Assets/img/users/user-6.png" className="profile-img-circle box-center" alt="تصویر کاربر"/>
                                </div>
                                <div className="siderbar-profile-details">
                                    <div className="siderbar-profile-name">حسن کرمی محب</div>
                                    <br/>
                                </div>
                            </div>
                        </li>

                        <li className={`${window.location.pathname === RouteConfig.HomePage ? "active" : ""}`}>
                            <Link onClick={this.onClickLink} to={`${RouteConfig.HomePage}`} className="nav-link">
                                <i className="fas fa-desktop"/><span>داشبورد</span>
                            </Link>
                        </li>

                        <li className={`${window.location.pathname === RouteConfig.AllUserPage ? "active" : ""}`}>
                            <Link onClick={this.onClickLink} className="nav-link" to={`${RouteConfig.AllUserPage}`}>
                                <i className="fas fa-meteor"/><span>کاربران سیستم</span>
                            </Link>
                        </li>

                        <li className={`${window.location.pathname === RouteConfig.AllRolePage ? "active" : ""}`}>
                            <Link onClick={this.onClickLink} className="nav-link" to={`${RouteConfig.AllRolePage}`}>
                                <i className="fas fa-meteor"/><span>نقش های سیستمی</span>
                            </Link>
                        </li>

                        <li className={`${window.location.pathname === RouteConfig.AllPermissionPage ? "active" : ""}`}>
                            <Link onClick={this.onClickLink} className="nav-link" to={`${RouteConfig.AllPermissionPage}`}>
                                <i className="fas fa-meteor"/><span>دسترسی های سیستمی</span>
                            </Link>
                        </li>

                        <li className={`${window.location.pathname === RouteConfig.AllRootCategoryPage ? "active" : ""}`}>
                            <Link onClick={this.onClickLink} className="nav-link" to={`${RouteConfig.AllRootCategoryPage}`}>
                                <i className="fas fa-meteor"/><span>دسته بندی های اصلی</span>
                            </Link>
                        </li>

                        <li className={`${window.location.pathname === RouteConfig.AllCategoryPage ? "active" : ""}`}>
                            <Link onClick={this.onClickLink} className="nav-link" to={`${RouteConfig.AllCategoryPage}`}>
                                <i className="fas fa-meteor"/><span>دسته بندی ها</span>
                            </Link>
                        </li>
                    </ul>
                </aside>
            </div>
        );
    }

    /*---------------------------------------------------------------CUSTOM---------------------------------------------------------------*/

    /**
     * @function onClickLink
     */
    onClickLink = () =>
    {
        this.setState({});
    }
}

export default SideBar;