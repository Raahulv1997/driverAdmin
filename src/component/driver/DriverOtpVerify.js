import React, { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { DriverOtpVerifyFuntion } from "../api/api";
import Logo from "../css-js/images/logo1.avif";
import Spinner from "react-bootstrap/Spinner";
const DriverOtpVerify = () => {
  const [otpVal, setOtpVal] = useState("");
  const [otpError, setOtpError] = useState(false);
  const [searchparams] = useSearchParams();
  const [spinner, setSpinner] = useState(false);
  const navigate = useNavigate();
  const email = searchparams.get("email");

  const onOtpChange = (e) => {
    setOtpVal(e.target.value);
    setOtpError(false);
  };

  const OtpSubmit = async (e) => {
    e.preventDefault();
    setSpinner("spinner");
    const response = await DriverOtpVerifyFuntion(email, otpVal);
    console.log("response---" + JSON.stringify(response));
    if (response.response === "successfully created your account") {
      setSpinner(false);
      navigate("/");
    }
    if (response.response === "not matched, credential issue") {
      setSpinner(false);
      setOtpError("otpnotMatche");
    }
    if (response.success === true) {
      setSpinner(false);
      localStorage.setItem("driver_token", response.token);
      navigate(`/updateDriverForgetpassword?email=${email}`);
    }
  };
  return (
    <div>
      <section className="user-form-part">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5">
              <div className="user-form-logo">
                <Link to="">
                  <img src={Logo} alt="logo" />
                </Link>
              </div>
              <div className="user-form-card">
                <div className="user-form-title">
                  <h2> Driver any issue?</h2>
                  <p>Make sure your current password is strong</p>
                </div>
                <form className="user-form" onSubmit={OtpSubmit}>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="One time Password "
                      onChange={(e) => {
                        onOtpChange(e);
                      }}
                      // value={signupmail}
                    />{" "}
                    {otpError === "otpnotMatche" ? (
                      <p className="mt-1 ms-2 text-danger" type="invalid">
                        Otp Not Match..
                      </p>
                    ) : null}
                  </div>

                  <div className="form-button">
                    {spinner === "spinner" ? (
                      <button type="submit">
                        {" "}
                        <Spinner animation="border" role="status">
                          <span className="visually-hidden">Verify Otp</span>
                        </Spinner>
                      </button>
                    ) : (
                      <button type="submit">Verify Otp</button>
                    )}
                  </div>
                </form>
              </div>
              <div className="user-form-remind">
                <p>
                  Go Back To<Link to="/DriverLogin">login here</Link>
                </p>
              </div>
              {/* <div className="user-form-footer">
              <p>
                Greeny | &COPY; Copyright by <Link to="">Mironcoder</Link>
              </p>
            </div> */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DriverOtpVerify;
