import React from "react";

/*-------------------------------------------------------------------*/

//Components

//Configs
import RouteServer from "./../../Configs/RouteServer";

//Plugins
import Axios from "axios";
import { toast as Toast } from "react-toastify";
import {Link} from "react-router-dom";
import Route from "../../Configs/Route";

/**
 * @class HomePage
 */
class EditPage extends React.Component
{
    /**
     * @property state
     */
    state =
    {
        Id    : null,
        Name  : null,
        Slug  : null,
        Status: null
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
    componentDidMount()
    {
        if(localStorage.getItem("category") != null)
        {
            let category = JSON.parse(localStorage.getItem("category"));

            this.setState({
                Id     : category.id,
                Name   : category.name,
                Slug   : category.slug,
                Status : category.statusCode
            });

            localStorage.removeItem("category");
        }
    }

    /**
     * @function render
     */
    render()
    {
        const ButtonEditCategoryStyle =
        {
            fontWeight   : "normal",
            borderRadius : "30px",
            fontSize     : "15px",
            padding      : "0.8em",
            width        : "13em"
        };

        return (
            <div className="main-content">
                <section className="section">
                    <div className="section-header">
                        <div className="row">
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                                <div className="section-header-breadcrumb-content">
                                    <h1>ویرایش دسته بندی ( شاخه ) جدید</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="section-body">
                        <div className="row">
                            <div className="col-12">
                                <div className="card" style={{borderRadius: "0"}}>
                                    <div className="card-header">
                                        <h4>دسته بندی خود را ویرایش نمایید</h4>
                                    </div>
                                    <div className="card-body">
                                        <div className="form-group row mb-4">
                                            <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">نام دسته بندی</label>
                                            <div className="col-sm-12 col-md-7" style={{borderRadius: "0"}}>
                                                <input onChange={this.onChangeTextInInputName} value={this.state.Name} type="text" className="form-control" style={{borderRadius: "0"}}/>
                                            </div>
                                        </div>

                                        <div className="form-group row mb-4">
                                            <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">نام یکتای دسته بندی</label>
                                            <div className="col-sm-12 col-md-7" style={{borderRadius: "0"}}>
                                                <input onChange={this.onChangeTextInInputSlug} value={this.state.Slug?.replace("-", " ")} type="text" className="form-control" style={{borderRadius: "0"}}/>
                                            </div>
                                        </div>

                                        <div className="form-group row mb-4">
                                            <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">وضعیت</label>
                                            <div className="col-sm-12 col-md-7" style={{borderRadius: "0"}}>
                                                <select onChange={this.onSelectedOptionInSelectBox} className="form-control selectric" style={{borderRadius: "0"}}>
                                                    {this.state.Status == 1 ? (<option selected value={1}>فعال</option>)     : (<option value={1}>فعال</option>) }
                                                    {this.state.Status == 0 ? (<option selected value={0}>غیر فعال</option>) : (<option value={0}>غیر فعال</option>) }
                                                </select>
                                            </div>
                                        </div>

                                        <div className="form-group row mb-4">
                                            <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3"/>
                                            <div className="col-sm-12 col-md-7">
                                                <button onClick={this.EditCategory} type="button" className="btn btn-success action_button">ویرایش دسته بندی</button>
                                                <span>{" "}</span>
                                                <Link to={`${Route.AllRootCategoryPage}`} className="btn btn-primary action_button">برگشت</Link>
                                            </div>
                                        </div>
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
     * @function onSelectedOptionInSelectBox
     */
    onSelectedOptionInSelectBox = (event) =>
    {
        this.setState({
            Status: parseInt(event.target.value)
        });
    };

    /**
     * @function onSelectedOptionInSelectBox
     */
    onChangeTextInInputName = (event) =>
    {
        //console.log(event.target.value);

        this.setState({
            Name: event.target.value
        });
    };

    /**
     * @function onChangeTextInInputSlug
     */
    onChangeTextInInputSlug = (event) =>
    {
        //console.log(event.target.value);

        this.setState({
            Slug: event.target.value
        });
    };

    /**
     * @function EditCategory
     */
    EditCategory = async () =>
    {
        let Data = {
            Name   : this.state.Name,
            Slug   : this.state.Slug?.replace("-", " "),
            Status : this.state.Status
        };

        let Configs = {
            headers : {
                "Content-Type"  : "application/json",
                "Authorization" : `${"Bearer " + localStorage.getItem("Token")}`
            }
        };

        if(this.state.Id != null)
        {
            await Axios.patch(`${RouteServer.Root + RouteServer.EditRootCategory + this.state.Id}`, JSON.stringify(Data), Configs).then(response => {

                Toast.success(response.data.msg);

            }).catch(response => {

                if(response?.response?.data?.code == 403)
                {
                    window.location.href = `${Route.LoginPage}`;
                    localStorage.setItem("Expired", "403");
                }
                else
                {
                    Toast.error(response.response.data?.msg);
                    if(typeof response.response.data?.body?.errors != "undefined")
                    {
                        response.response.data.body.errors.map(error => {

                            Toast.error(error);

                        });
                    }
                }

            });
        }
    }
}

export default EditPage;