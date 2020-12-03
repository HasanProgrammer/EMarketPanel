import React    from "react";
import { Link } from "react-router-dom";

/*-------------------------------------------------------------------*/

//Components

//Configs
import Route       from "./../../Configs/Route";
import RouteServer from "./../../Configs/RouteServer";

//Plugins
import swal  from "sweetalert";
import Axios from "axios";
import { toast as Toast } from "react-toastify";

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
        Categories: []
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
        await Axios.get(`${RouteServer.Root + RouteServer.AllCategory}`).then(response => {

            this.setState({
                Categories: response.data.body.categories
            });

        }).catch(response => {

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
                                    <h4 style={{cursor: "default"}}>همه دسته بندی ها</h4>


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
                                        <Link className="btn btn-success action_button" to={`${Route.CreateCategoryPage}`}>
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
                                                    <th className="cell">نام دسته بندی سرشاخه</th>
                                                    <th className="cell">نام دسته بندی والد</th>
                                                    <th className="cell">نام دسته بندی</th>
                                                    <th className="cell">نام یکتای دسته بندی</th>
                                                    <th className="cell">وضعیت</th>
                                                    <th className="cell">عملیات</th>
                                                </tr>
                                                {
                                                    this.state.Categories.map(category => (
                                                        <tr key={category.categoryId}>
                                                            <td className="cell">
                                                                <div className="custom-checkbox custom-control">
                                                                    <input type="checkbox" style={{borderRadius: "0"}}/>
                                                                </div>
                                                            </td>
                                                            <td className="cell">
                                                                {category.rootCategoryName}
                                                            </td>
                                                            <td className="cell">
                                                                {category.parentCategoryName == null ? "ندارد" : category.parentCategoryName}
                                                            </td>
                                                            <td className="cell">
                                                                {category.categoryName}
                                                            </td>
                                                            <td className="cell">
                                                                {category.categorySlug}
                                                            </td>
                                                            <td className="cell">
                                                                <div className="badge badge-success" style={BadgeStyle}>{category.statusName}</div>
                                                            </td>
                                                            <td className="cell">
                                                                <Link id={category.categoryId} onClick={this.onClickEditButton} to={`${Route.EditCategoryPage.replace(":id", category.categoryId)}`} className="btn btn-warning action_button" style={{borderRadius: "0", }}>ویرایش</Link>
                                                                <span>{" "}</span>
                                                                {
                                                                    category.statusCode == 0
                                                                    ? (<button onClick={this.onClickActiveButton}   id={category.categoryId} className="btn btn-success action_button" style={{borderRadius: "0", }}>فعال</button>)
                                                                    : (<button onClick={this.onClickInActiveButton} id={category.categoryId} className="btn btn-danger action_button"  style={{borderRadius: "0", }}>غیر فعال</button>)
                                                                }
                                                                <span>{" "}</span>
                                                                <button onClick={this.onClickDeleteButton} id={category.categoryId} className="btn btn-danger action_button" style={{borderRadius: "0", }}>حذف</button>
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
            </div>
        );
    }

    /*---------------------------------------------------------------CUSTOM---------------------------------------------------------------*/

    /**
     * @function onClickEditButton
     */
    onClickEditButton = (event) =>
    {
        localStorage.setItem("category", JSON.stringify(this.state.Categories.find(category => category.categoryId == event.target.id)));
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
            let categories = this.state.Categories.filter(category => category.categoryId != event.target.id);

            await Axios.post(`${RouteServer.Root + RouteServer.DeleteCategory + event.target.id}`).then(response => {

                this.setState({
                    Categories: categories
                });

                Toast.success(response.data.msg);

            }).catch(response => {

                Toast.error(response.response.data.msg);

            });
        }
    };

    /**
     * @function onClickActiveButton
     */
    onClickActiveButton = async (event) =>
    {
        let categories = this.state.Categories.slice();
        let category   = categories.find(category => category.categoryId == event.target.id);

        console.log(category);
        console.log(`${RouteServer.Root + RouteServer.InActiveCategory + event.target.id}`);

        await Axios.patch(`${RouteServer.Root + RouteServer.ActiveCategory + event.target.id}`).then(response => {

            category.statusCode = 1;
            category.statusName = "فعال";

            this.setState({
                Categories: categories
            });

            Toast.success(response.data.msg);

        }).catch(response => {

            Toast.error(response.response.data.msg);

        });
    };

    /**
     * @function onClickInActiveButton
     */
    onClickInActiveButton = async (event) =>
    {
        let categories = this.state.Categories.slice();
        let category   = categories.find(category => category.categoryId == event.target.id);

        console.log(category);
        console.log(`${RouteServer.Root + RouteServer.InActiveCategory + event.target.id}`);

        await Axios.patch(`${RouteServer.Root + RouteServer.InActiveCategory + event.target.id}`).then(response => {

            category.statusCode = 0;
            category.statusName = "غیر فعال";

            this.setState({
                Categories: categories
            });

            Toast.success(response.data.msg);

        }).catch(response => {

            Toast.error(response.response.data.msg);

        });
    }
}

export default IndexPage;