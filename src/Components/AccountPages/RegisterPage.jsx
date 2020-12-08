import React    from "react";
import { Link } from "react-router-dom";

//Configs
import Route       from "./../../Configs/Route.json";
import RouteServer from "./../../Configs/RouteServer.json";

class RegisterPage extends React.Component
{
    state = {}

    constructor(props)
    {
        super(props);
    }

    render()
    {
        return (
            <body>
                <div id="app">
                    <section className="section">
                    <div className="container mt-5">
                        <div className="row">
                            <div className="col-12 col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-8 offset-lg-2 col-xl-8 offset-xl-2">
                                <div className="card card-auth" style={{borderRadius: "0"}}>
                                    <div className="card-header card-header-auth" style={{borderRadius: "0"}}>
                                        <h4 style={{fontWeight: "normal"}}>ثبت نام</h4>
                                    </div>
                                    <div className="card-body">
                                        <form method="POST">
                                            <div className="row">
                                                <div className="form-group col-6">
                                                    <label htmlFor="frist_name">نام کاربری</label>
                                                    <input placeholder="نام کاربری خود را وارد نمایید" style={{borderRadius: "0"}} id="frist_name" type="text" className="form-control" name="frist_name" autoFocus=""/>
                                                </div>
                                                <div className="form-group col-6">
                                                    <label htmlFor="last_name">نام خانوادگی</label>
                                                    <input placeholder="نام خانوادگی خود را وارد نمایید" style={{borderRadius: "0"}} id="last_name" type="text" className="form-control" name="last_name"/>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="email">پست الکترونیک</label>
                                                <input placeholder="پست الکترونیکی خود را وارد نمایید" style={{borderRadius: "0"}} id="email" type="email" className="form-control" name="email"/>
                                            </div>
                                            <div className="row">
                                                <div className="form-group col-6">
                                                    <label htmlFor="password" className="d-block">کلمه عبور</label>
                                                    <input placeholder="رمز عبور خود را وارد نمایید" style={{borderRadius: "0"}} id="password" type="password" className="form-control pwstrength"/>
                                                </div>
                                                <div className="form-group col-6">
                                                    <label htmlFor="password2" className="d-block">تایید رمز عبور</label>
                                                    <input placeholder="رمز عبور خود را مجدد وارد نمایید" style={{borderRadius: "0"}} id="password2" type="password" className="form-control" name="password-confirm"/>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <button style={{borderRadius: "0"}} type="submit" className="btn btn-auth-color btn-lg btn-block">
                                                    ثبت نام
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="mb-4 text-muted text-center">
                                        قبلاً ثبت نام کرده اید؟ <Link to={`${Route.LoginPage}`}>ورود</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                </div>
            </body>
        );
    }
}

export default RegisterPage;