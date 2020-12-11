import React from "react";
import { Link } from "react-router-dom";

/*-------------------------------------------------------------------*/

//Components

/*-------------------------------------------------------------------*/

//Configs
import Route       from "./../../Configs/Route";
import RouteServer from "./../../Configs/RouteServer";

/*-------------------------------------------------------------------*/

//Plugins
import Axios from "axios";
import swal  from "sweetalert";
import { toast as Toast, ToastContainer } from "react-toastify";

/*-------------------------------------------------------------------*/

/**
 * @class CreatePage
 */
class EditPage extends React.Component
{
    /**
     * @property state
     */
    state =
    {
        Roles        : [],
        Name         : null,
        Description  : null,
        RoleId       : null, /*برای نمایش*/
        Role         : null, /*برای ارسال به سمت سرور و نمایش*/
        PermissionId : null  /*برای ارسال به سمت سرور*/
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
        if(localStorage.getItem("permission") != null)
        {
            let Configs = {
                headers : {
                    "Authorization" : `${"Bearer " + localStorage.getItem("Token")}`
                }
            };

            await Axios.get(`${RouteServer.Root + RouteServer.AllRole}`, Configs).then(response => {

                this.setState({
                    Roles : response?.data?.body?.roles
                });

            }).catch(response => {

                if(response?.response?.data?.code == 403)
                {
                    window.location.href = `${Route.LoginPage}`;
                    localStorage.setItem("Expired", "403");
                }

            });

            let permission = JSON.parse(localStorage.getItem("permission"));

            this.setState({
                Name         : permission.name,
                Description  : permission.description,
                Role         : permission.roleName,
                RoleId       : permission.roleId,
                PermissionId : permission.id
            });

            localStorage.removeItem("permission");
        }
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
                                    <h1>ویرایش دسترسی</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="section-body">
                        <div className="row">
                            <div className="col-12">
                                <div className="card" style={{borderRadius: "0"}}>
                                    <div className="card-header">
                                        <h4>دسترسی سیستمی خود را ویرایش نمایید</h4>
                                    </div>
                                    <div className="card-body">
                                        <div className="form-group row mb-4">
                                            <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3"> نام دسترسی {" "} <span className="text-danger">*</span></label>
                                            <div className="col-sm-12 col-md-7" style={{borderRadius: "0"}}>
                                                <input value={this.state.Name} placeholder="نام دسترسی خود را وارد نمایید" type="text" className="form-control" style={{borderRadius: "0"}} onChange={this.onChangeTextInInputName}/>
                                            </div>
                                        </div>

                                        <div className="form-group row mb-4">
                                            <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3"> توضیحات دسترسی {" "} <span className="text-danger">*</span></label>
                                            <div className="col-sm-12 col-md-7" style={{borderRadius: "0"}}>
                                                <textarea value={this.state.Description} placeholder="توضیحات دسترسی خود را وارد نمایید" className="form-control" style={{borderRadius: "0"}} onChange={this.onChangeTextInTextArea}/>
                                            </div>
                                        </div>

                                        <div className="form-group row mb-4">
                                            <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3"> نقش هدف {" "} <span className="text-danger">*</span></label>
                                            <div className="col-sm-12 col-md-7" style={{borderRadius: "0"}}>
                                                <select className="form-control selectric" style={{borderRadius: "0"}} onChange={this.onSelectedOptionInSelectBox}>
                                                    <option selected hidden value={this.state.RoleId}>{this.state.Role}</option>
                                                    {
                                                        this.state.Roles?.map(role => (
                                                            <option value={role.roleId}>{role.roleName}</option>
                                                        ))
                                                    }
                                                </select>
                                            </div>
                                        </div>

                                        <div className="form-group row mb-4">
                                            <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3"/>
                                            <div className="col-sm-12 col-md-7">
                                                <button type="button" onClick={this.EditPermission} className="btn btn-success action_button">ویرایش دسترسی</button>
                                                <span>{" "}</span>
                                                <Link to={`${Route.AllPermissionPage}`} className="btn btn-primary action_button">برگشت</Link>
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
    onChangeTextInInputName = (event) =>
    {
        //console.log(event.target.value);

        this.setState({
            Name : event.target.value
        });
    };

    /**
     * @function onSelectedOptionInSelectBox
     */
    onChangeTextInTextArea = (event) =>
    {
        //console.log(event.target.value);

        this.setState({
            Description : event.target.value
        });
    };

    /**
     * @function onSelectedOptionInSelectBox
     */
    onSelectedOptionInSelectBox = (event) =>
    {
        //console.log(event.target.value);

        this.setState({
            RoleId : event.target.value
        });
    };

    /**
     * @function CreateCategory
     */
    EditPermission = async () =>
    {
        let Data = {
            Name        : this.state.Name,
            Description : this.state.Description,
            Role        : this.state.RoleId
        };

        let Configs = {
            headers : {
                "Content-Type"  : "application/json",
                "Authorization" : `${"Bearer " + localStorage.getItem("Token")}`
            }
        };

        await Axios.patch(`${RouteServer.Root + RouteServer.EditPermission + this.state.PermissionId}`, JSON.stringify(Data), Configs).then(response => {

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

export default EditPage;