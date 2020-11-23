import React from "react";

/*-------------------------------------------------------------------*/

//Components

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

    };

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
                                    <h1>ایجاد پست جدید</h1>
                                    <div className="section-header-breadcrumb">
                                        <div className="breadcrumb-item active">
                                            <a href="#">
                                                <i className="fas fa-home"/>
                                            </a>
                                        </div>
                                        <div className="breadcrumb-item"><a href="#">صفحات مورد نیاز</a></div>
                                        <div className="breadcrumb-item"><a href="#">ایجاد پست جدید</a></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="section-body">
                        <div className="row">
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-header">
                                        <h4>پست خود را بنویسید</h4>
                                    </div>
                                    <div className="card-body">
                                        <div className="form-group row mb-4">
                                            <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">عنوان</label>
                                            <div className="col-sm-12 col-md-7" style={{borderRadius: "0 !important"}}>
                                                <input type="text" className="form-control" style={{borderRadius: "0 !important"}}/>
                                            </div>
                                        </div>
                                        <div className="form-group row mb-4">
                                            <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">دسته بندی</label>
                                            <div className="col-sm-12 col-md-7" style={{borderRadius: "0 !important"}}>
                                                <select className="form-control selectric" style={{borderRadius: "0 !important"}}>
                                                    <option>فنی</option>
                                                    <option>اخبار</option>
                                                    <option>سیاسی</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="form-group row mb-4">
                                            <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">محتوا</label>
                                            <div className="col-sm-12 col-md-7" style={{borderRadius: "0 !important"}}>
                                                <textarea className="summernote-simple" style={{borderRadius: "0 !important"}}/>
                                            </div>
                                        </div>
                                        <div className="form-group row mb-4">
                                            <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">بند انگشتی</label>
                                            <div className="col-sm-12 col-md-7">
                                                <div id="image-preview" className="image-preview" style={{borderRadius: "0 !important"}}>
                                                    <label htmlFor="image-upload" id="image-label">انتخاب فایل</label>
                                                    <input type="file" name="image" id="image-upload" style={{borderRadius: "0 !important"}}/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group row mb-4">
                                            <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">برچسب
                                                ها</label>
                                            <div className="col-sm-12 col-md-7">
                                                <input type="text" className="form-control inputtags" style={{borderRadius: "0 !important"}}/>
                                            </div>
                                        </div>
                                        <div className="form-group row mb-4">
                                            <label
                                                className="col-form-label text-md-right col-12 col-md-3 col-lg-3">وضعیت</label>
                                            <div className="col-sm-12 col-md-7" style={{borderRadius: "0 !important"}}>
                                                <select className="form-control selectric" style={{borderRadius: "0 !important"}}>
                                                    <option>انتشار</option>
                                                    <option>پیش نویس</option>
                                                    <option>در انتظار</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="form-group row mb-4">
                                            <label
                                                className="col-form-label text-md-right col-12 col-md-3 col-lg-3"/>
                                            <div className="col-sm-12 col-md-7">
                                                <button className="btn btn-primary" style={{borderRadius: "0 !important"}}>ایجاد پست
                                                </button>
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
}

export default CreatePage;