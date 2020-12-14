import React    from "react";
import { Link } from "react-router-dom";

/*-------------------------------------------------------------------*/

//Components

/*-------------------------------------------------------------------*/

//Configs
import Route            from "./../../Configs/Route";
import RouteServer      from "./../../Configs/RouteServer";
import PaginationConfig from "./../../Configs/Pagination";

/*-------------------------------------------------------------------*/

//Plugins
import swal          from "sweetalert";
import Axios         from "axios";
import ReactPaginate from "react-paginate";

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
        Permissions       : [],
        CurrentPageNumber : null,
        CountSizePerPage  : null,
        TotalPages        : null,
        HasNextPage       : false,
        HasPrevPage       : false
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

        await Axios.get(`${RouteServer.Root + RouteServer.AllPermission}`, Configs).then(response => {

            let paginationionHeader = JSON.parse(response.headers["x-pagination"]);

            this.setState({
                Permissions       : response?.data?.body?.permissions,
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

        return (
            <div className="main-content">
                <section className="section">

                    <div className="row mt-4">
                        <div className="col-12">
                            <div className="card" style={{borderRadius: "0"}}>
                                <div className="card-header">
                                    <h4 style={{cursor: "default"}}>همه دسترسی ها</h4>
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
                                        <Link className="btn btn-success action_button" to={`${Route.CreatePermissionPage}`}>
                                            <span>ساخت دسترسی جدید</span>
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
                                                    <th className="cell">نام دسترسی</th>
                                                    <th className="cell">توضیحات</th>
                                                    <th className="cell">منتسب به نقش</th>
                                                    <th className="cell">سازنده</th>
                                                    <th className="cell">عملیات</th>
                                                </tr>
                                                {
                                                    this.state.Permissions.map(permission => (
                                                        <tr key={permission.id}>
                                                            <td className="cell">
                                                                <div className="custom-checkbox custom-control">
                                                                    <input type="checkbox" style={{borderRadius: "0"}}/>
                                                                </div>
                                                            </td>
                                                            <td className="cell">{permission.name}</td>
                                                            <td className="cell">{permission.description}</td>
                                                            <td className="cell">{permission.roleName}</td>
                                                            <td className="cell">{permission.creator == null ? "نامشخص" : permission.creator}</td>
                                                            <td className="cell">
                                                                <br/>
                                                                <Link id={permission.id} onClick={this.onClickEditButton} to={`${Route.EditPermissionPage.replace(":id", permission.id)}`} className="btn btn-warning action_button" style={{borderRadius: "0", }}>ویرایش</Link>
                                                                <br/>
                                                                <br/>
                                                                <button onClick={this.onClickDeleteButton} id={permission.id} className="btn btn-danger action_button" style={{borderRadius: "0", }}>حذف</button>
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

                    <ReactPaginate
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

                </section>
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

        await Axios.get(`${RouteServer.Root + RouteServer.AllPermission + "?PageNumber=" +  ( page.selected + 1 ) + "&CountSizePerPage=" + PaginationConfig.CountItemPerPage}`, Configs).then(response => {

            let paginationionHeader = JSON.parse(response.headers["x-pagination"]);

            this.setState({
                Permissions       : response?.data?.body?.permissions,
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
        localStorage.setItem("permission", JSON.stringify(this.state.Permissions.find(permission => permission.id == event.target.id)));
    };

    /**
     * @function onClickDeleteButton
     */
    onClickDeleteButton = async (event) =>
    {
        const result = await swal
        (
            {
                text    : "آیا شما از حذف این دسترسی اطمینان دارید ؟",
                icon    : "info",
                buttons : ["نه، مایل به حذف نمی باشم" , "بله ، کاملا اطمینان دارم"]
            }
        );

        if(result === true)
        {
            let permission = this.state.Permissions.filter(permission => permission.id != event.target.id);

            let Configs = {
                headers : {
                    "Authorization" : `${"Bearer " + localStorage.getItem("Token")}`
                }
            }

            await Axios.post(`${RouteServer.Root + RouteServer.DeletePermission + event.target.id}`, null, Configs).then(response => {

                this.setState({
                    Permissions : permission
                });

                Toast.success(response?.data?.msg);

            }).catch(response => {

                if(response?.response?.data?.code == 403)
                {
                    window.location.href = `${Route.LoginPage}`;
                    localStorage.setItem("Expired", "403");
                }
                else Toast.error(response?.response?.data?.msg);

            });
        }
    };
}

export default IndexPage;