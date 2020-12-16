import React    from "react";
import { Link } from "react-router-dom";

/*-------------------------------------------------------------------*/

//Components

/*-------------------------------------------------------------------*/

//Configs
import Route            from "./../../Configs/Route";
import RouteServer      from "./../../Configs/RouteServer";
import PaginationConfig from "./../../Configs/Pagination";
import "react-responsive-modal/styles.css";

/*-------------------------------------------------------------------*/

//Plugins
import swal          from "sweetalert";
import Axios         from "axios";
import ReactPaginate from "react-paginate";

import { Modal }          from "react-responsive-modal";
import { toast as Toast } from "react-toastify";

/*-------------------------------------------------------------------*/

/**
 * @class HomePage
 */
class IndexPage extends React.Component
{
    /**
     * @property state
     */
    state =
    {
        Users              : [],
        TargetUser         : null, /*برای ارسال به سمت سرور*/
        Permissions        : [],   /*دسترسی هایی که می توان به کاربر فعلی منسوب کرد*/
        SelectedPermission : [],   /*دسترسی های انتساب داده شده به کاربر*/
        IsOpenModal        : false,

        CurrentPageNumber  : null,
        CountSizePerPage   : null,
        TotalPages         : null,
        HasNextPage        : false,
        HasPrevPage        : false
    };

    /**
     * @function constructor
     * @param    props
     */
    constructor(props)
    {
        super(props);
    }

    /**
     * @function componentDidMount
     */
    async componentDidMount()
    {
        let Configs = {
            headers : {
                "Authorization" : `${"Bearer " + localStorage.getItem("Token")}`
            }
        };

        await Axios.get(`${RouteServer.Root + RouteServer.AllUser + "?PageNumber=1&CountSizePerPage=" + PaginationConfig.CountItemPerPage}`, Configs).then(response => {

            let paginationionHeader = JSON.parse(response.headers["x-pagination"]);

            this.setState({
                Users             : response?.data?.body?.users,
                CurrentPageNumber : paginationionHeader?.CurrentPage,
                CountSizePerPage  : paginationionHeader?.CountSizePerPage,
                TotalPages        : paginationionHeader?.TotalPages,
                HasNextPage       : paginationionHeader?.HasNext,
                HasPrevPage       : paginationionHeader?.HasPrev
            });

        }).catch(response => {

            if(response?.response?.data?.code == 403)
            {
                window.location.href = `${Route.LoginPage}`;
                localStorage.setItem("Expired", "403");
            }

        });
    }

    /**
     * @function render
     */
    render()
    {
        const SelectBoxStyle =
        {
            borderRadius: "0"
        };

        const BadgeStyle =
        {
            borderRadius: "0"
        };

        const ModalStyle =
        {
            width : "50em"
        }

        let Pagination = null;
        if(this.state.TotalPages > 0)
        {
            Pagination = <ReactPaginate
                            className="pagination"
                            previousLabel={'قبلی'}
                            nextLabel={'بعدی'}
                            breakLabel={'...'}
                            breakClassName={'break-me'}
                            pageCount={this.state.TotalPages}
                            marginPagesDisplayed={3}
                            pageRangeDisplayed={5}
                            containerClassName={'pagination'}
                            subContainerClassName={'pages pagination'}
                            activeClassName={'active'}

                            onPageChange={this.onClickPaginateLink}
                        />
        }

        return (
            <div className="main-content">
                <section className="section">
                    <div className="row mt-4">
                        <div className="col-12">
                            <div className="card" style={{borderRadius: "0"}}>
                                <div className="card-header">
                                    <h4 style={{cursor: "default"}}>همه کاربران سیستم</h4>
                                </div>
                                <div className="card-body">
                                    <div className="float-left">
                                        <select className="form-control selectric" style={SelectBoxStyle}>
                                            <option>اقدام برای انتخاب شده</option>
                                            <option>به پیش نویس بروید</option>
                                            <option>انتقال به انتظار</option>
                                            <option>دائمی حذف کنید</option>
                                        </select>
                                    </div>

                                    <div className="float-right">
                                        <Link className="btn btn-success action_button" to={`${Route.CreateUserPage}`}>
                                            <span>ساخت کاربر جدید</span>
                                        </Link>
                                    </div>

                                    <div className="clearfix mb-3"/>
                                    <div className="table-responsive">
                                        <table className="table table-striped">
                                            <tbody>
                                                <tr>
                                                    <th className="pt-2 cell">
                                                        <div className="custom-checkbox custom-checkbox-table custom-control">
                                                            <input type="checkbox" style={{borderRadius: "0"}}/>
                                                        </div>
                                                    </th>
                                                    <th className="cell">نام کاربری</th>
                                                    <th className="cell">پست الکترونیکی</th>
                                                    <th className="cell">نقش های سیستمی</th>
                                                    <th className="cell">عملیات</th>
                                                </tr>
                                                {
                                                    this.state.Users?.map(user => (
                                                        <tr key={user.id}>
                                                            <td className="cell">
                                                                <div className="custom-checkbox custom-control">
                                                                    <input type="checkbox" style={{borderRadius: "0"}}/>
                                                                </div>
                                                            </td>
                                                            <td className="cell">{user.userName}</td>
                                                            <td className="cell">{user.email}</td>
                                                            <td className="cell">
                                                                {
                                                                    user.roles?.map(role => role?.roleName)
                                                                }
                                                            </td>
                                                            <td className="cell">
                                                                <br/>
                                                                <button id={user.id} onClick={this.getAllCurrentUserPermissionsCanBeAssigned} className="btn btn-info action_button" style={{borderRadius: "0", }}>انتساب دسترسی</button>
                                                                <br/>
                                                                <br/>
                                                                <button id={user.id} onClick={this.onClickEditButton} className="btn btn-warning action_button" style={{borderRadius: "0", }}>ویرایش</button>
                                                                <br/>
                                                                <br/>
                                                            </td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {Pagination}

                <Modal open={this.state.IsOpenModal} onClose={this.onCloseModal} center>
                    <div style={ModalStyle}>
                        <br/>
                        <br/>
                        <table className="table table-striped">
                            <tbody>
                                {
                                    this.state.Permissions?.map(permission => (
                                        <tr>
                                            <td className="cell">
                                                <div className="custom-checkbox custom-control">
                                                    <input onChange={this.onChangedCheckBox} id={permission.id}
                                                           checked={ this.state.SelectedPermission?.some(item => item.id == permission.id) }
                                                           type="checkbox"
                                                           style={{borderRadius: "0"}}/>
                                                </div>
                                            </td>
                                            <td className="cell">{permission.name}</td>
                                            <td className="cell">{permission.description}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>

                        <button onClick={this.AssignPermissions} className="btn btn-info action_button" style={{borderRadius: "0", }}>انتساب نهایی</button>
                    </div>
                </Modal>
            </div>
        );
    }

    /*---------------------------------------------------------------CUSTOM---------------------------------------------------------------*/

    onClickPaginateLink = async (page) =>
    {
        let Configs = {
            headers : {
                "Authorization" : `${"Bearer " + localStorage.getItem("Token")}`
            }
        };

        await Axios.get(`${RouteServer.Root + RouteServer.AllUser + "?PageNumber=" +  ( page.selected + 1 ) + "&CountSizePerPage=" + PaginationConfig.CountItemPerPage}`, Configs).then(response => {

            let paginationionHeader = JSON.parse(response.headers["x-pagination"]);

            this.setState({
                Users             : response?.data?.body?.users,
                CurrentPageNumber : paginationionHeader?.CurrentPage,
                CountSizePerPage  : paginationionHeader?.CountSizePerPage,
                TotalPages        : paginationionHeader?.TotalPages,
                HasNextPage       : paginationionHeader?.HasNext,
                HasPrevPage       : paginationionHeader?.HasPrev
            });

        }).catch(response => {

            if(response?.response?.data?.code == 403)
            {
                window.location.href = `${Route.LoginPage}`;
                localStorage.setItem("Expired", "403");
            }

        });
    }

    /**
     * @function onClickEditButton
     */
    onClickEditButton = (event) =>
    {
        localStorage.setItem("user", JSON.stringify(this.state.Users.find(user => user.id == event.target.id)));
    };

    AssignPermissions = async () =>
    {
        let Configs = {
            headers : {
                "Content-Type"  : "application/json",
                "Authorization" : `${"Bearer " + localStorage.getItem("Token")}`
            }
        };

        let permissionsId = [];
        this.state.SelectedPermission?.map(permission => permissionsId.push(parseInt(permission.id)));

        let Data = {
            Permission : permissionsId
        }

        await Axios.patch(`${RouteServer.Root + RouteServer.AssignPermission + this.state.TargetUser}`, JSON.stringify(Data), Configs).then(response => {

            if(response?.data?.code == 201 || response?.data?.code == 200)
                Toast.success(response?.data?.msg);
            else
                Toast.error(response?.data?.msg);

            let usersCopy  = this.state.Users?.slice();
            let userTarget = usersCopy.find(item => item.id == this.state.TargetUser);

            userTarget.permissions = this.state.SelectedPermission;

            this.setState({
                Users : usersCopy
            });

        }).catch(response => {

            if(response?.response?.data?.code == 403)
            {
                window.location.href = `${Route.LoginPage}`;
                localStorage.setItem("Expired", "403");
            }
            else
            {
                Toast.error(response.response?.data?.msg);
                if(typeof response?.response?.data?.body?.errors != "undefined")
                {
                    response.response.data.body.errors.map(error => {

                        Toast.error(error);

                    });
                }
            }

        });
    }

    onChangedCheckBox = (event) =>
    {
        if(event.target.checked == false) /*یعنی تیک خورده بوده و حالا برداشته شد*/
        {
            let permissions = this.state.SelectedPermission?.filter(permission => permission.id != event.target.id);

            //console.log(permissions);

            this.setState({
                SelectedPermission : permissions
            });
        }
        else if(event.target.checked == true) /*یعنی تیک نداشته و الان تیک خورده*/
        {
            let permissionsCopy = this.state.SelectedPermission?.slice();
            permissionsCopy.push(this.state.Permissions?.find(permission => permission.id == event.target.id));

            //console.log(permissionsCopy);

            this.setState({
                SelectedPermission : permissionsCopy
            });
        }
    }

    getAllCurrentUserPermissionsCanBeAssigned = async (event) =>
    {
        let Configs = {
            headers : {
                "Authorization" : `${"Bearer " + localStorage.getItem("Token")}`
            }
        };

        await Axios.get(`${RouteServer.Root + RouteServer.AllPermissionForUser + event.target.id}`, Configs).then(response => {

            let currentUserPermissions = this.state.Users?.find(user => user.id == event.target.id)?.permissions

            this.setState({
                TargetUser         : event.target.id,
                Permissions        : response?.data?.body?.permissions, /*تمام Permission هایی که می تواند به کاربر فعلی ( انتخاب شده ) منسوب شود*/
                SelectedPermission : currentUserPermissions,            /*لیست Permission هایی که به کاربر فعلی ( انتخاب شده ) انتساب داده شده است*/
                IsOpenModal        : true
            });

        }).catch(response => {

            if(response?.response?.data?.code == 403)
            {
                window.location.href = `${Route.LoginPage}`;
                localStorage.setItem("Expired", "403");
            }
            else
            {
                Toast.error(response.response?.data?.msg);
                if(typeof response?.response?.data?.body?.errors != "undefined")
                {
                    response.response.data.body.errors.map(error => {

                        Toast.error(error);

                    });
                }
            }

        });
    }

    onCloseModal = () =>
    {
        this.setState({ IsOpenModal : false });
    }
}

export default IndexPage;