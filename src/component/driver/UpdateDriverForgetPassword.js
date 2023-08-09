import React, { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Logo from "../css-js/images/logo.png";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import { ForgetpasswordDriverUpdate } from "../api/api";
const UpdateDriverForgetPassword = () => {
  const navigate = useNavigate();
  const [passval, setpassval] = useState("");
  const [spinner, setSpinner] = useState(false);
  const [searchparams] = useSearchParams();
  const [showmodel, setShowmodel] = useState(false);
  const email = searchparams.get("email");
  const onPasswordChange = (e) => {
    setpassval(e.target.value);
    // setemailerror(false);
  };

  const onchangePassword = async (e) => {
    e.preventDefault();
    setSpinner("spinner");
    const response = await ForgetpasswordDriverUpdate(passval);
    if (response.response === "update your password successfully") {
      setShowmodel(true);
    }
  };

  const handleClose = () => {
    localStorage.removeItem("vendor_token");
    setShowmodel(false);
    navigate("/");
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
                  <h2> Saller any issue?</h2>
                  <p>Make sure your current password is strong</p>
                </div>
                <form
                  className="user-form"
                  onSubmit={(e) => onchangePassword(e)}
                >
                  <div className="form-group">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter your Email"
                      value={email}
                      readOnly
                    />
                  </div>

                  <div className="form-group">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Enter new password"
                      onChange={(e) => onPasswordChange(e)}
                      // value={old_password}
                    />
                  </div>

                  <div className="form-button">
                    {spinner === "spinner" ? (
                      <button type="submit">
                        {" "}
                        <Spinner animation="border" role="status">
                          <span className="visually-hidden">
                            Change Password
                          </span>
                        </Spinner>
                      </button>
                    ) : (
                      <button type="submit"> Change Password</button>
                    )}
                  </div>
                </form>
              </div>
              <div className="user-form-remind">
                <p>
                  Go Back To<Link to="/sellerlogin">login here</Link>
                </p>
              </div>
              <div className="user-form-footer">
                <p>
                  Greeny | &COPY; Copyright by <Link to="">Mironcoder</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Modal show={showmodel} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Message for Seller</Modal.Title>
        </Modal.Header>
        <Modal.Body>Your password successfully changed</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UpdateDriverForgetPassword;
