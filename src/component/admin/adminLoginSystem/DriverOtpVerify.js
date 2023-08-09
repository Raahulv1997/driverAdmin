import React, { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { DriverOtpVerifyFuntion } from "../api/api";
import Logo from "../css-js/images/logo.png";
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
      navigate("/DriverLogin");
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
            <div className="col-12 col-sm-10 col-md-12 col-lg-12 col-xl-10">
              <div className="user-form-logo">
                <Link to="index.html">
                  <img src={Logo} alt="logo" />
                </Link>
              </div>
              <div className="user-form-card">
                <div className="user-form-title">
                  <h2> Driver Join Now!</h2>
                  <p>Setup A New Account In A Minute</p>
                </div>
                <div className="user-form-group">
                  <ul className="user-form-social">
                    <li>
                      <Link to="#" className="facebook">
                        <i className="fab fa-facebook-f"></i>Join with facebook
                      </Link>
                    </li>
                    <li>
                      <Link to="#" className="twitter">
                        <i className="fab fa-twitter"></i>Join with twitter
                      </Link>
                    </li>
                    <li>
                      <Link to="#" className="google">
                        <i className="fab fa-google"></i>Join with google
                      </Link>
                    </li>
                    <li>
                      <Link to="#" className="instagram">
                        <i className="fab fa-instagram"></i>Join with instagram
                      </Link>
                    </li>
                  </ul>
                  <div className="user-form-divider">
                    <p>or</p>
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
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DriverOtpVerify;
