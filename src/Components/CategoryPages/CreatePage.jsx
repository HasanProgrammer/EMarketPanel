import React from "react";

/*-------------------------------------------------------------------*/

//Components

//Configs
import Route       from "./../../Configs/Route";
import RouteServer from "./../../Configs/RouteServer";

//Plugins
import Axios    from "axios";
import { Link } from "react-router-dom";
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
        RootCategories   : [],
        ParentCategories : [],
        RootCategory     : null,
        ParentCategory   : null,
        Name             : null,
        Slug             : null,
        Status           : null
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
    async componentDidMount()
    {
        await Axios.get(`${RouteServer.Root + RouteServer.AllRootCategory}`).then(response => {

            this.setState({
                Status         : parseInt(this.statusFieldRef.current.value),
                RootCategories : response.data.body.categories
            });

        }).catch(response => {



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
                                    <h1>ایجاد دسته بندی جدید</h1>
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
                                            <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3"> دسته بندی سر شاخه{" "} <span className="text-danger">*</span></label>
                                            <div className="col-sm-12 col-md-7" style={{borderRadius: "0"}}>
                                                <select className="form-control selectric" style={{borderRadius: "0"}} onChange={this.onSelectedOptionInSelectBoxRootCategory}>
                                                    <option value="" selected hidden>لطفا یک دسته بندی سر شاخه را انتخاب نمایید</option>
                                                    { this.state.RootCategories?.map(category => ( <option value={category.id}>{category.name}</option> )) }
                                                </select>
                                            </div>
                                        </div>

                                        <div className="form-group row mb-4">
                                            <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">دسته بندی والد</label>
                                            <div className="col-sm-12 col-md-7" style={{borderRadius: "0"}}>
                                                <select className="form-control selectric" style={{borderRadius: "0"}} onChange={this.onSelectedOptionInSelectBoxParentCategory}>
                                                    <option value="" selected hidden>لطفا یک دسته بندی والد را انتخاب نمایید</option>
                                                    { this.state.ParentCategories?.map(category => ( <option value={category.categoryId}>{category.categoryName}</option> )) }
                                                </select>
                                            </div>
                                        </div>

                                        <div className="form-group row mb-4">
                                            <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3"> نام دسته بندی{" "} <span className="text-danger">*</span></label>
                                            <div className="col-sm-12 col-md-7" style={{borderRadius: "0"}}>
                                                <input name="Name" type="text" className="form-control" style={{borderRadius: "0"}} onChange={this.onChangeTextInInputName}/>
                                            </div>
                                        </div>

                                        <div className="form-group row mb-4">
                                            <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3"> نام یکتای دسته بندی{" "} <span className="text-danger">*</span></label>
                                            <div className="col-sm-12 col-md-7" style={{borderRadius: "0"}}>
                                                <input name="Slug" type="text" className="form-control" style={{borderRadius: "0"}} onChange={this.onChangeTextInInputSlug}/>
                                            </div>
                                        </div>

                                        <div className="form-group row mb-4">
                                            <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3"> وضعیت{" "} <span className="text-danger">*</span></label>
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
                                                <Link to={`${Route.AllCategoryPage}`} className="btn btn-primary action_button">برگشت</Link>
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
    onSelectedOptionInSelectBoxRootCategory = async (event) =>
    {
        await Axios.get(`${RouteServer.Root + RouteServer.FindChilds + event.target.value}`).then(response => {

            this.setState({
                RootCategory     : parseInt(event.target.value),
                ParentCategories : response.data.body.categories
            });

        }).catch(response => {

        });
    };

    /**
     * @function onSelectedOptionInSelectBox
     */
    onSelectedOptionInSelectBoxParentCategory = (event) =>
    {
        this.setState({
            ParentCategory: parseInt(event.target.value)
        });
    };

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
        this.setState({
            Name: event.target.value
        });
    };

    /**
     * @function onChangeTextInInputSlug
     */
    onChangeTextInInputSlug = (event) =>
    {
        this.setState({
            Slug: event.target.value
        });
    };

    /**
     * @function CreateCategory
     */
    CreateCategory = async () =>
    {
        let Data =
        {
            RootCategoryId : this.state.RootCategory,
            ParentId       : this.state.ParentCategory,
            Name           : this.state.Name,
            Slug           : this.state.Slug,
            Status         : this.state.Status
        };

        console.log(JSON.stringify(Data));

        let Config = {
            headers: {
                "Content-Type" : "application/json"
            }
        };

        await Axios.put(`${RouteServer.Root + RouteServer.CreateCategory}`, JSON.stringify(Data), Config).then(response => {

            Toast.success(response?.data?.msg);

        }).catch(response => {

            Toast.error(response.response?.data?.msg);
            if(typeof response?.response?.data?.body?.errors != "undefined")
            {
                response.response.data.body.errors.map(error => {

                    Toast.error(error);

                });
            }

        });
    }
}

export default CreatePage;