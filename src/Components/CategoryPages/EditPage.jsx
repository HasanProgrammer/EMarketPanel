import React from "react";

/*-------------------------------------------------------------------*/

//Components

//Configs
import Route       from "../../Configs/Route";
import RouteServer from "./../../Configs/RouteServer";

//Plugins
import Axios    from "axios";
import { Link } from "react-router-dom";
import { toast as Toast } from "react-toastify";

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
        RootCategories   : [],   /*برای نمایش*/
        ParentCategories : [],   /*برای نمایش*/
        RootCategory     : null, /*برای نمایش*/
        ParentCategory   : null, /*برای نمایش*/
        RootCategoryId   : null, /*برای ارسال به سمت سرور*/
        ParentCategoryId : null, /*برای ارسال به سمت سرور*/
        Id               : null,
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
    }

    /**
     * @function componentDidMount
     */
    async componentDidMount()
    {
        if(localStorage.getItem("category") != null)
        {
            let category = JSON.parse(localStorage.getItem("category"));

            let Configs = {
                headers : {
                    "Authorization" : `${"Bearer " + localStorage.getItem("Token")}`
                }
            };

            await Axios.get(`${RouteServer.Root + RouteServer.AllRootCategory}`, Configs).then(response => {

                this.setState({
                    RootCategories : response.data.body.categories,
                    RootCategory   : { Id: category.rootCategoryId   , Name: category.rootCategoryName   },
                    ParentCategory : { Id: category.parentCategoryId , Name: category.parentCategoryName },
                    Id             : category.categoryId,
                    Name           : category.categoryName,
                    Slug           : category.categorySlug,
                    Status         : category.statusCode
                });

            }).catch(response => {

                if(response?.response?.data?.code == 403)
                {
                    window.location.href = `${Route.LoginPage}`;
                    localStorage.setItem("Expired", "403");
                }

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
                                    <h1>ویرایش دسته بندی</h1>
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
                                            <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3"> دسته بندی سر شاخه{" "} <span className="text-danger">*</span></label>
                                            <div className="col-sm-12 col-md-7" style={{borderRadius: "0"}}>
                                                <select className="form-control selectric" style={{borderRadius: "0"}} onChange={this.onSelectedOptionInSelectBoxRootCategory}>
                                                    <option value={this.state.RootCategory?.Id} selected hidden>{this.state.RootCategory?.Name}</option>
                                                    { this.state.RootCategories?.map(category => ( <option value={category.id}>{category.name}</option> )) }
                                                </select>
                                            </div>
                                        </div>

                                        <div className="form-group row mb-4">
                                            <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">دسته بندی والد</label>
                                            <div className="col-sm-12 col-md-7" style={{borderRadius: "0"}}>
                                                <select className="form-control selectric" style={{borderRadius: "0"}} onChange={this.onSelectedOptionInSelectBoxParentCategory}>
                                                    {
                                                        this.state.ParentCategory != null
                                                        ?
                                                        ( <option value={this.state.ParentCategory.Id} selected hidden>{this.state.ParentCategory.Name}</option> )
                                                        :
                                                        ( <option value="" selected hidden>لطفا یک دسته بندی والد را انتخاب نمایید</option> )
                                                    }

                                                    { this.state.ParentCategories?.map(category => ( <option value={category.categoryId}>{category.categoryName}</option> )) }
                                                </select>
                                            </div>
                                        </div>

                                        <div className="form-group row mb-4">
                                            <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3"> نام دسته بندی{" "} <span className="text-danger">*</span></label>
                                            <div className="col-sm-12 col-md-7" style={{borderRadius: "0"}}>
                                                <input value={this.state.Name} type="text" className="form-control" style={{borderRadius: "0"}} onChange={this.onChangeTextInInputName}/>
                                            </div>
                                        </div>

                                        <div className="form-group row mb-4">
                                            <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3"> نام یکتای دسته بندی{" "} <span className="text-danger">*</span></label>
                                            <div className="col-sm-12 col-md-7" style={{borderRadius: "0"}}>
                                                <input value={this.state.Slug} type="text" className="form-control" style={{borderRadius: "0"}} onChange={this.onChangeTextInInputSlug}/>
                                            </div>
                                        </div>

                                        <div className="form-group row mb-4">
                                            <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3"> وضعیت{" "} <span className="text-danger">*</span></label>
                                            <div className="col-sm-12 col-md-7" style={{borderRadius: "0"}}>
                                                <select className="form-control selectric" style={{borderRadius: "0"}} onChange={this.onSelectedOptionInSelectBox}>
                                                    {this.state.Status == 1 ? (<option selected value={1}>فعال</option>)     : (<option value={1}>فعال</option>) }
                                                    {this.state.Status == 0 ? (<option selected value={0}>غیر فعال</option>) : (<option value={0}>غیر فعال</option>) }
                                                </select>
                                            </div>
                                        </div>

                                        <div className="form-group row mb-4">
                                            <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3"/>
                                            <div className="col-sm-12 col-md-7">
                                                <button type="button" id={this.state.Id} onClick={this.EditCategory} className="btn btn-success action_button">ویرایش دسته بندی</button>
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
        );
    }

    /*---------------------------------------------------------------CUSTOM---------------------------------------------------------------*/

    /**
     * @function onSelectedOptionInSelectBox
     */
    onSelectedOptionInSelectBoxRootCategory = async (event) =>
    {
        let Configs = {
            headers : {
                "Authorization" : `${"Bearer " + localStorage.getItem("Token")}`
            }
        };

        await Axios.get(`${RouteServer.Root + RouteServer.FindChilds + event.target.value}`, Configs).then(response => {

            this.setState({
                RootCategoryId   : parseInt(event.target.value),
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
            ParentCategoryId : parseInt(event.target.value)
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
    EditCategory = async () =>
    {
        let Data =
        {
            RootCategoryId : this.state.RootCategoryId   != null ? this.state.RootCategoryId   : this.state.RootCategory?.Id,
            ParentId       : this.state.ParentCategoryId != null ? this.state.ParentCategoryId : this.state.ParentCategory?.Id,
            Name           : this.state.Name,
            Slug           : this.state.Slug,
            Status         : this.state.Status
        };

        let Configs = {
            headers : {
                "Content-Type"  : "application/json",
                "Authorization" : `${"Bearer " + localStorage.getItem("Token")}`
            }
        };

        if(this.state.Id != null)
        {
            await Axios.patch(`${RouteServer.Root + RouteServer.EditCategory + this.state.Id}`, JSON.stringify(Data), Configs).then(response => {

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
}

export default EditPage;