import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../css-js/images/logo.png";
import Spinner from "react-bootstrap/Spinner";
import Modal from "react-bootstrap/Modal";
import { DriverLoginFuntion } from "../api/api";
import { Button } from "react-bootstrap";

const DriverLogin = () => {
  const [emailVal, setemailVal] = useState("");
  const [passval, setpassval] = useState("");
  const [spinner, setSpinner] = useState(false);
  const [emailerror, setemailerror] = useState(false);
  const [showmodel, setShowmodel] = useState(false);
  const navigate = useNavigate();

  const onEmailChange = (e) => {
    setemailVal(e.target.value);
    setemailerror(false);
  };

  const onPasswordChange = (e) => {
    setpassval(e.target.value);
    setemailerror(false);
  };

  const LoginDriver = async (e) => {
    e.preventDefault();
    setSpinner("spinner");

    const response = await DriverLoginFuntion(emailVal, passval);
    const { user_detaile } = response;
    if (response.complete_profile === false) {
      setSpinner(false);
      setemailerror("incomplete");

      localStorage.setItem("driver_token", response.token);
    }
    if (response.response === "please fill all inputs") {
      setSpinner(false);
      setemailerror("fillinput");
    }
    if (response.response === "creadintial not match") {
      setSpinner(false);
      setemailerror("credetialnotmatch");
    }

    if (
      response.response === "successfully login" &&
      user_detaile.status === "pending"
    ) {
      setSpinner(false);
      setShowmodel(true);
    }

    if (
      response.response === "successfully login" &&
      user_detaile.status === "approved"
    ) {
      setSpinner(false);

      localStorage.setItem("driver_token", response.token);
      navigate("/admin/Home");
    }
  };

  const onProfileClick = () => {
    navigate("/DriverRegister");
  };

  const handleClose = () => {
    setShowmodel(false);
    navigate("/");
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
                  <h2>welcome Driver!</h2>
                  <p>Use your credentials to access</p>
                </div>
                <div className="user-form-group">
                  <ul className="user-form-social">
                    <li>
                      <Link to="#" className="facebook">
                        <i className="fab fa-facebook-f"></i>login with facebook
                      </Link>
                    </li>
                    <li>
                      <Link to="#" className="twitter">
                        <i className="fab fa-twitter"></i>login with twitter
                      </Link>
                    </li>
                    <li>
                      <Link to="#" className="google">
                        <i className="fab fa-google"></i>login with google
                      </Link>
                    </li>
                    <li>
                      <Link to="#" className="instagram">
                        <i className="fab fa-instagram"></i>login with instagram
                      </Link>
                    </li>
                  </ul>
                  <div className="user-form-divider">
                    <p>or</p>
                  </div>
                  <form className="user-form" onSubmit={LoginDriver}>
                    <div className="form-group">
                      <input
                        type="email"
                        className="form-control user_input_class"
                        // value={sign_up_mail}
                        placeholder="Enter your email"
                        onChange={(e) => {
                          onEmailChange(e);
                        }}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        className="form-control user_input_class"
                        placeholder="Enter your password"
                        // value={sign_up_password}
                        onChange={(e) => onPasswordChange(e)}
                      />
                      {emailerror === "credetialnotmatch" ? (
                        <smail className="mt-1 ms-2 text-danger" type="invalid">
                          Credentials Not Match
                        </smail>
                      ) : null}

                      {emailerror === "fillinput" ? (
                        <smail className="mt-1 ms-2 text-danger" type="invalid">
                          Please fill all field...
                        </smail>
                      ) : null}

                      {emailerror === "incomplete" ? (
                        <small className="mt-1 ms-2 text-danger" type="invalid">
                          Profile Incomplete ....!!!! please Update your profile
                        </small>
                      ) : null}
                    </div>
                    <div className="form-check mb-3">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="check"
                      />
                      <label className="form-check-label" for="check">
                        Remember Me
                      </label>
                    </div>
                    <div className="form-button">
                      {spinner === "spinner" ? (
                        <button type="submit">
                          {" "}
                          <Spinner animation="border" role="status">
                            <span className="visually-hidden">Login</span>
                          </Spinner>
                        </button>
                      ) : emailerror === "incomplete" ? (
                        <button onClick={onProfileClick}>Update Profile</button>
                      ) : (
                        <button type="submit">Login</button>
                      )}

                      <p>
                        Forgot your password?
                        <Link to={"/Driverforgetpassword"}>reset here</Link>
                      </p>
                    </div>
                  </form>
                </div>
              </div>
              <div className="user-form-remind">
                <p>
                  Don't have any account?
                  <Link to={"/DriverSignup"}>register here</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Modal show={showmodel} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Message for Driver</Modal.Title>
        </Modal.Header>
        <Modal.Body>Your Request is pending wait for approvel</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DriverLogin;
