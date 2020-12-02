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
            </div>
        );
    }

    /**
     * @function componentDidMount
     */
    async componentDidMount()
    {
        await Axios.get(`${RouteServer.Root + RouteServer.AllRootCategory}`).then(response => {

            //console.log(response.data.body.categories);

            this.setState({
                Categories: response.data.body.categories
            });

        }).catch(response => {

            //console.log(response);

        });
    }

    /*---------------------------------------------------------------CUSTOM---------------------------------------------------------------*/

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
                text    : "آیا شما از حذف این برند اطمینان دارید ؟",
                icon    : "info",
                buttons : ["نه، مایل به حذف نمی باشم" , "بله ، کاملا اطمینان دارم"]
            }
        ); 

        if(result === true)
        {
            let categories = this.state.Categories.filter(category => category.id != event.target.id);

            await Axios.post(`${RouteServer.Root + RouteServer.DeleteRootCategory + event.target.id}`).then(response => {

                //console.log(response.data);

                this.setState({
                    Categories: categories
                });

                Toast.success(response.data.msg);

            }).catch(response => {

                //console.log(response);

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
        let category   = categories.find(category => category.id == event.target.id);

        await Axios.patch(`${RouteServer.Root + RouteServer.ActiveRootCategory + event.target.id}`).then(response => {

            //console.log(response.data);

            category.statusCode = 1;
            category.statusName = "فعال";

            this.setState({
                Categories: categories
            });

            Toast.success(response.data.msg);

        }).catch(response => {

            //console.log(response);

            Toast.error(response.response.data.msg);

        });
    };

    /**
     * @function onClickInActiveButton
     */
    onClickInActiveButton = async (event) =>
    {
        let categories = this.state.Categories.slice();
        let category   = categories.find(category => category.id == event.target.id);

        await Axios.patch(`${RouteServer.Root + RouteServer.InActiveRootCategory + event.target.id}`).then(response => {

            //console.log(response.data);

            category.statusCode = 0;
            category.statusName = "غیر فعال";

            this.setState({
                Categories: categories
            });

            Toast.success(response.data.msg);

        }).catch(response => {

            //console.log(response);

            Toast.error(response.response.data.msg);

        });
    }
}

export default IndexPage;