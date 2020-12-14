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
import { toast as Toast, ToastContainer } from "react-toastify";

/*-------------------------------------------------------------------*/

/**
 * @class CreatePage
 */
class CreatePage extends React.Component
{
    /**
     * @property state
     */
    state =
    {
        Username  : null,
        Password  : null,
        Email     : null,
        Roles     : [],   /*برای نمایش*/
        RolesId   : []    /*برای ارسال به سمت سرور*/
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
                                    <h1>ایجاد کاربر جدید</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="section-body">
                        <div className="row">
                            <div className="col-12">
                                <div className="card" style={{borderRadius: "0"}}>
                                    <div className="card-header">
                                        <h4>کاربر جدید خود را بسازید</h4>
                                    </div>
                                    <div className="card-body">
                                        <div className="form-group row mb-4">
                                            <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">نام کاربری</label>
                                            <div className="col-sm-12 col-md-7" style={{borderRadius: "0"}}>
                                                <input placeholder="نام کاربری خود را وارد نمایید" type="text" className="form-control" style={{borderRadius: "0"}} onChange={this.onChangeTextInInputUsername}/>
                                            </div>
                                        </div>

                                        <div className="form-group row mb-4">
                                            <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">رمز عبوری</label>
                                            <div className="col-sm-12 col-md-7" style={{borderRadius: "0"}}>
                                                <input placeholder="رمز عبور خود را وارد نمایید" type="text" className="form-control" style={{borderRadius: "0"}} onChange={this.onChangeTextInInputPassword}/>
                                            </div>
                                        </div>

                                        <div className="form-group row mb-4">
                                            <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">پست الکترونیکی</label>
                                            <div className="col-sm-12 col-md-7" style={{borderRadius: "0"}}>
                                                <input placeholder="پست الکترونیکی خود را وارد نمایید" type="text" className="form-control" style={{borderRadius: "0"}} onChange={this.onChangeTextInInputEmail}/>
                                            </div>
                                        </div>

                                        <div className="form-group row mb-4">
                                            <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">نقش های سیستمی</label>
                                            <div className="col-sm-12 col-md-7" style={{borderRadius: "0"}}>
                                                <select multiple className="form-control" style={{borderRadius: "0", minHeight: "10em"}} onChange={this.onSelectedOptionInSelectBox}>
                                                    { this.state.Roles?.map(role => ( <option value={role.roleId}>{role.roleName}</option> )) }
                                                </select>
                                            </div>
                                        </div>

                                        <div className="form-group row mb-4">
                                            <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3"/>
                                            <div className="col-sm-12 col-md-7">
                                                <button type="button" onClick={this.CreateUser} className="btn btn-success action_button">ایجاد کاربر</button>
                                                <span>{" "}</span>
                                                <Link to={`${Route.AllUserPage}`} className="btn btn-primary action_button">برگشت</Link>
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
        let roles   = [];
        let options = event.target.options;

        for (let i = 0; i < options.length; i++)
            if(options[i].selected) roles.push(options[i].value);

        this.setState({
            RolesId : roles
        });
    };

    /**
     * @function onChangeTextInInputUsername
     */
    onChangeTextInInputUsername = (event) =>
    {
        //console.log(event.target.value);

        this.setState({
            Username : event.target.value
        });
    };

    /**
     * @function onChangeTextInInputPassword
     */
    onChangeTextInInputPassword = (event) =>
    {
        //console.log(event.target.value);

        this.setState({
            Password : event.target.value
        });
    };

    /**
     * @function onChangeTextInInputEmail
     */
    onChangeTextInInputEmail = (event) =>
    {
        //console.log(event.target.value);

        this.setState({
            Email : event.target.value
        });
    };

    /**
     * @function CreateCategory
     */
    CreateUser = async () =>
    {
        let Data = {
            Username : this.state.Username,
            Password : this.state.Password,
            Email    : this.state.Email,
            Roles    : this.state.RolesId
        };

        let Configs = {
            headers : {
                "Content-Type"  : "application/json",
                "Authorization" : `${"Bearer " + localStorage.getItem("Token")}`
            }
        };

        await Axios.put(`${RouteServer.Root + RouteServer.CreateUser}`, JSON.stringify(Data), Configs).then(response => {

            if(response?.data?.code == 201 || response?.data?.code == 200)
                Toast.success(response?.data?.msg);
            else
                Toast.error(response?.data?.msg);

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