import React    from "react";
import { Link } from "react-router-dom";

/*-------------------------------------------------------------------*/

//Components

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
        Categories: [],
        CurrentPageNumber : null,
        CountSizePerPage  : null,
        TotalPages        : null,
        HasNextPage       : false,
        HasPrevPage       : false
    };

    /**
     * @function componentDidMount
     */
    async componentDidMount()
    {
        let Configs = {
            headers : {
                "Authorization" : `${"Bearer " + localStorage.getItem("Token")}`
            }
        }

        Axios.get(`${RouteServer.Root + RouteServer.AllRootCategory + "?PageNumber=1&CountSizePerPage=" + PaginationConfig.CountItemPerPage}`, Configs).then(response => {

            let paginationionHeader = JSON.parse(response.headers["x-pagination"]);

            this.setState({
                Categories        : response.data?.body?.categories,
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
     * @function constructor
     * @param    props
     */
    constructor(props)
    {
        super(props);
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
                                    <h4 style={{cursor: "default"}}>همه دسته بندی های اصلی</h4>


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
                                        <Link className="btn btn-success action_button" to={`${Route.CreateRootCategoryPage}`}>
                                            <span>ساخت دسته بندی جدید</span>
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
                                                    <th className="cell">نام دسته بندی</th>
                                                    <th className="cell">نام یکتای دسته بندی</th>
                                                    <th className="cell">وضعیت</th>
                                                    <th className="cell">عملیات</th>
                                                </tr>
                                                {
                                                    this.state.Categories.map(category => (
                                                        <tr key={category.id}>
                                                            <td className="cell">
                                                                <div className="custom-checkbox custom-control">
                                                                    <input type="checkbox" style={{borderRadius: "0"}}/>
                                                                </div>
                                                            </td>
                                                            <td className="cell">
                                                                {category.name}
                                                            </td>
                                                            <td className="cell">
                                                                {category.slug}
                                                            </td>
                                                            <td className="cell">
                                                                <div className="badge badge-success" style={BadgeStyle}>{category.statusName}</div>
                                                            </td>
                                                            <td className="cell">
                                                                <Link id={category.id} onClick={this.onClickEditButton} to={`${Route.EditRootCategoryPage.replace(":id", category.id)}`} className="btn btn-warning action_button" style={{borderRadius: "0", }}>ویرایش</Link>
                                                                <span>{" "}</span>
                                                                {
                                                                    category.statusCode == 0
                                                                    ? (<button onClick={this.onClickActiveButton}   id={category.id} className="btn btn-success action_button" style={{borderRadius: "0", }}>فعال</button>)
                                                                    : (<button onClick={this.onClickInActiveButton} id={category.id} className="btn btn-danger action_button"  style={{borderRadius: "0", }}>غیر فعال</button>)
                                                                }
                                                                <span>{" "}</span>
                                                                <button onClick={this.onClickDeleteButton} id={category.id} className="btn btn-danger action_button" style={{borderRadius: "0", }}>حذف</button>
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

        await Axios.get(`${RouteServer.Root + RouteServer.AllRootCategory + "?PageNumber=" +  ( page.selected + 1 ) + "&CountSizePerPage=" + PaginationConfig.CountItemPerPage}`, Configs).then(response => {

            let paginationionHeader = JSON.parse(response.headers["x-pagination"]);

            this.setState({
                Categories        : response?.data?.body?.categories,
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
        localStorage.setItem("category", JSON.stringify(this.state.Categories.find(category => category.id == event.target.id)));
    };

    /**
     * @function onClickDeleteButton
     */
    onClickDeleteButton = async (event) =>
    {
        const result = await swal
        (
            {
                text    : "آیا شما از حذف این دسته بندی اطمینان دارید ؟",
                icon    : "info",
                buttons : ["نه، مایل به حذف نمی باشم" , "بله ، کاملا اطمینان دارم"]
            }
        ); 

        if(result === true)
        {
            let categories = this.state.Categories.filter(category => category.id != event.target.id);

            let Configs = {
                headers : {
                    "Authorization" : `${"Bearer " + localStorage.getItem("Token")}`
                }
            }

            await Axios.post(`${RouteServer.Root + RouteServer.DeleteRootCategory + event.target.id}`, null, Configs).then(response => {

                //console.log(response.data);

                this.setState({
                    Categories: categories
                });

                Toast.success(response.data.msg);

            }).catch(response => {

                if(response?.response?.data?.code == 403)
                {
                    window.location.href = `${Route.LoginPage}`;
                    localStorage.setItem("Expired", "403");
                }
                else Toast.error(response.response.data.msg);

            });
        }
    };

    /**
     * @function onClickActiveButton
     */
    onClickActiveButton = async (event) =>
    {
        let categories = this.state.Categories.slice();
        let category   = categories.find(category => category.id == event.target.id);

        let Configs = {
            headers : {
                "Authorization" : `${"Bearer " + localStorage.getItem("Token")}`
            }
        }

        await Axios.patch(`${RouteServer.Root + RouteServer.ActiveRootCategory + event.target.id}`, null, Configs).then(response => {

            //console.log(response.data);

            category.statusCode = 1;
            category.statusName = "فعال";

            this.setState({
                Categories: categories
            });

            Toast.success(response.data.msg);

        }).catch(response => {

            if(response?.response?.data?.code == 403)
            {
                window.location.href = `${Route.LoginPage}`;
                localStorage.setItem("Expired", "403");
            }
            else Toast.error(response.response.data.msg);

        });
    };

    /**
     * @function onClickInActiveButton
     */
    onClickInActiveButton = async (event) =>
    {
        let categories = this.state.Categories.slice();
        let category   = categories.find(category => category.id == event.target.id);

        let Configs = {
            headers : {
                "Authorization" : `${"Bearer " + localStorage.getItem("Token")}`
            }
        }

        await Axios.patch(`${RouteServer.Root + RouteServer.InActiveRootCategory + event.target.id}`, null, Configs).then(response => {

            //console.log(response.data);

            category.statusCode = 0;
            category.statusName = "غیر فعال";

            this.setState({
                Categories: categories
            });

            Toast.success(response.data.msg);

        }).catch(response => {

            if(response?.response?.data?.code == 403)
            {
                window.location.href = `${Route.LoginPage}`;
                localStorage.setItem("Expired", "403");
            }
            else Toast.error(response.response.data.msg);

        });
    }
}

export default IndexPage;