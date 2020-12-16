import React    from "react";
import { Link } from "react-router-dom";

/*-------------------------------------------------------------------*/

//Components

/*-------------------------------------------------------------------*/

//Configs
import Route            from "./../../Configs/Route";
import RouteServer      from "./../../Configs/RouteServer";
import PaginationConfig from "../../Configs/Pagination.json";

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
        Roles             : [],
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

        await Axios.get(`${RouteServer.Root + RouteServer.AllRole + "?PageNumber=1&CountSizePerPage=" + PaginationConfig.CountItemPerPage}`, Configs).then(response => {

            let paginationionHeader = JSON.parse(response.headers["x-pagination"]);

            this.setState({
                Roles             : response?.data?.body?.roles,
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
                                    <h4 style={{cursor: "default"}}>همه نقش های سیستمی</h4>
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
                                        <Link className="btn btn-success action_button" to={`${Route.CreateRolePage}`}>
                                            <span>ساخت نقش جدید</span>
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
                                                    <th className="cell">نام نقش سیستمی</th>
                                                    <th className="cell">تعداد کاربران</th>
                                                    <th className="cell">سازنده</th>
                                                </tr>
                                                {
                                                    this.state.Roles.map(role => (
                                                        <tr>
                                                            <td className="cell">
                                                                <div className="custom-checkbox custom-control">
                                                                    <input type="checkbox" style={{borderRadius: "0"}}/>
                                                                </div>
                                                            </td>
                                                            <td className="cell">{role.roleName}</td>
                                                            <td className="cell">{role.countUser}</td>
                                                            <td className="cell">{role.creator == null ? "نامشخص" : role.creator}</td>
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

        await Axios.get(`${RouteServer.Root + RouteServer.AllRole + "?PageNumber=" +  ( page.selected + 1 ) + "&CountSizePerPage=" + PaginationConfig.CountItemPerPage}`, Configs).then(response => {

            let paginationionHeader = JSON.parse(response.headers["x-pagination"]);

            this.setState({
                Roles             : response?.data?.body?.roles,
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
}

export default IndexPage;