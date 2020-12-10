import React from "react";
import { Link } from "react-router-dom";

/*-------------------------------------------------------------------*/

//Components

//Configs
import Route       from "./../../Configs/Route";
import RouteServer from "./../../Configs/RouteServer";

//Plugins
import Axios from "axios";
import { toast as Toast, ToastContainer } from "react-toastify";

/**
 * @class HomePage
 */
class CreatePage extends React.Component
{
    /**
     * @property state
     */
    state =
    {
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

        this.statusFieldRef = React.createRef();
    }

    /**
     * @function componentDidMount
     */
    componentDidMount()
    {
        this.setState({
            Status: this.statusFieldRef.current.value
        });
    }

    /**
     * @function render
     */
    render()
    {
        return (
            <div className="main-content">
                <section className="section">
                    <div className="section-header">
                        <div className="row">
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                                <div className="section-header-breadcrumb-content">
                                    <h1>ایجاد دسته بندی ( شاخه ) جدید</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="section-body">
                        <div className="row">
                            <div className="col-12">
                                <div className="card" style={{borderRadius: "0"}}>
                                    <div className="card-header">
                                        <h4>دسته بندی خود را ایجاد نمایید</h4>
                                    </div>
                                    <div className="card-body">
                                        <div className="form-group row mb-4">
                                            <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">نام دسته بندی</label>
                                            <div className="col-sm-12 col-md-7" style={{borderRadius: "0"}}>
                                                <input name="Name" type="text" className="form-control" style={{borderRadius: "0"}} onChange={this.onChangeTextInInputName}/>
                                            </div>
                                        </div>

                                        <div className="form-group row mb-4">
                                            <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">نام یکتای دسته بندی</label>
                                            <div className="col-sm-12 col-md-7" style={{borderRadius: "0"}}>
                                                <input name="Slug" type="text" className="form-control" style={{borderRadius: "0"}} onChange={this.onChangeTextInInputSlug}/>
                                            </div>
                                        </div>

                                        <div className="form-group row mb-4">
                                            <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">وضعیت</label>
                                            <div className="col-sm-12 col-md-7" style={{borderRadius: "0"}}>
                                                <select ref={this.statusFieldRef} name="Status" className="form-control selectric" style={{borderRadius: "0"}} onChange={this.onSelectedOptionInSelectBox}>
                                                    <option selected value={1}>فعال</option>
                                                    <option value={0}>غیر فعال</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="form-group row mb-4">
                                            <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3"/>
                                            <div className="col-sm-12 col-md-7">
                                                <button type="button" onClick={this.CreateCategory} className="btn btn-success action_button">ایجاد دسته بندی</button>
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
        )
    }

    /*---------------------------------------------------------------CUSTOM---------------------------------------------------------------*/

    /**
     * @function onSelectedOptionInSelectBox
     */
    onSelectedOptionInSelectBox = (event) =>
    {
        //console.log(event.target.value);

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
     * @function CreateCategory
     */
    CreateCategory = async () =>
    {
        let Data = {
            Name   : this.state.Name,
            Slug   : this.state.Slug,
            Status : this.state.Status
        };

        let Configs = {
            headers : {
                "Content-Type"  : "application/json",
                "Authorization" : `${"Bearer " + localStorage.getItem("Token")}`
            }
        };

        await Axios.put(`${RouteServer.Root + RouteServer.CreateRootCategory}`, JSON.stringify(Data), Configs).then(response => {

            Toast.success(response?.data?.msg);

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
}

export default CreatePage;