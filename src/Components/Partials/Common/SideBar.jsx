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

                    <div className="sidebar-brand">
                        {/*<a href="">*/}
                        {/*    <img alt="تصویر" src="/Assets/img/logo.png" className="header-logo"/>*/}
                        {/*    <span className="logo-name">پنل ادمین</span>*/}
                        {/*</a>*/}
                    </div>

                    <ul className="sidebar-menu">
                        <li className="dropdown active" style={{display: "block"}}>
                            <div className="sidebar-profile">
                                <div className="siderbar-profile-pic">
                                    <img src="/Assets/img/users/user-6.png" className="profile-img-circle box-center" alt="تصویر کاربر"/>
                                </div>
                                <div className="siderbar-profile-details">
                                    <div className="siderbar-profile-name">حسن کرمی محب</div>
                                    <div className="siderbar-profile-position">مدیر</div>
                                </div>
                                {/*<div className="sidebar-profile-buttons">*/}
                                {/*    <a className="tooltips waves-effect waves-block toggled" href="" data-toggle="tooltip" title="" data-original-title="پروفایل">*/}
                                {/*        <i className="fas fa-user sidebarQuickIcon"/>*/}
                                {/*    </a>*/}

                                {/*    <a className="tooltips waves-effect waves-block" href="" data-toggle="tooltip" title="" data-original-title="پیام">*/}
                                {/*        <i className="fas fa-envelope sidebarQuickIcon"/>*/}
                                {/*    </a>*/}

                                {/*    <a className="tooltips waves-effect waves-block" href="" data-toggle="tooltip" title="" data-original-title="گفتگو">*/}
                                {/*        <i className="fas fa-comment-dots sidebarQuickIcon"/>*/}
                                {/*    </a>*/}

                                {/*    <a className="tooltips waves-effect waves-block" href="" data-toggle="tooltip" title="" data-original-title="خروج">*/}
                                {/*        <i className="fas fa-share-square sidebarQuickIcon"/>*/}
                                {/*    </a>*/}
                                {/*</div>*/}
                            </div>
                        </li>

                        <li className={`${window.location.pathname === RouteConfig.HomePage ? "active" : ""}`}>
                            <Link onClick={this.onClickLink} to={`${RouteConfig.HomePage}`} className="nav-link">
                                <i className="fas fa-desktop"/><span>داشبورد</span>
                            </Link>
                        </li>

                        <li className={`${window.location.pathname === RouteConfig.CreateRootCategoryPage ? "active" : ""}`}>
                            <Link onClick={this.onClickLink} className="nav-link" to={`${RouteConfig.CreateRootCategoryPage}`}>
                                <i className="fas fa-meteor"/><span>ساخت دسته بندی اصلی</span>
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