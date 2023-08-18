import React, { useState } from "react";
import {
  Link,
  //  useNavigate
} from "react-router-dom";
import Logo from "../../css-js/images/logo1.avif";
import Spinner from "react-bootstrap/Spinner";
// import { getForgetOtpAdmin } from "../../api/api";

const AdminForgetPassword = () => {
  // const [emailVal, setemailVal] = useState("");
  const [spinner, setSpinner] = useState(false);
  const [emailError, setEmailError] = useState(false);
  // const navigate = useNavigate();

  const onEmailChange = (e) => {
    // setemailVal(e.target.value);
    setEmailError(false);
  };

  const getotp = async (e) => {
    e.preventDefault();
    setSpinner("spinner");
    // const response = await getForgetOtpAdmin(emailVal);
    // console.log("res--" + JSON.stringify(response));
    // if (
    //   response.response ===
    //   "email already exist, check your mail or try after sometime"
    // ) {
    //   setEmailError("please try again");
    //   setSpinner(false);
    // }
    // if (response.response === "send otp on your mail") {
    //   setSpinner(false);
    //   navigate(`/Adminotpverify?email=${emailVal}`);
    // }
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
                  <h2> Admin any issue?</h2>
                  <p>Make sure your current password is strong</p>
                </div>
                <form className="user-form" onSubmit={(e) => getotp(e)}>
                  <div className="form-group">
                    <input
                      type="email"
                      required
                      className="form-control"
                      placeholder="Enter your Email"
                      onChange={(e) => {
                        onEmailChange(e);
                      }}
                      //   value={old_password}
                    />
                    {emailError === "please try again" ? (
                      <small className="mt-1 ms-2 text-danger" type="invalid">
                        Otp send failed please try again later,,,
                      </small>
                    ) : null}
                  </div>

                  <div className="form-button">
                    {spinner === "spinner" ? (
                      <button type="submit">
                        {" "}
                        <Spinner animation="border" role="status">
                          <span className="visually-hidden"> Otp</span>
                        </Spinner>
                      </button>
                    ) : (
                      <button type="submit"> Otp</button>
                    )}
                  </div>
                </form>
              </div>
              <div className="user-form-remind">
                <p>
                  Go Back To<Link to="/">login here</Link>
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

export default AdminForgetPassword;
