import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AdminLoginData } from "../../api/api";
import useValidation from "../../common/useValidation";
import Logo from "../../css-js/images/logo1.avif";
import Loader from "../../common/loader";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
const AdminLogin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  let [facebook, setFacebook] = useState(false);
  const initialFormState = {
    email: "",
    password: "",
  };

  // validation fucntion------
  const validators = {
    email: [
      (value) =>
        value === "" || value.trim() === ""
          ? "Email address is required"
          : !/^\S+@\S+\.\S+$/.test(value)
          ? "Invalid email address"
          : null,
    ],
    password: [
      (value) =>
        value === "" || value.trim() === ""
          ? "Password is required"
          : /[^A-Za-z 0-9]/g.test(value)
          ? "Cannot use special character "
          : null,
    ],
  };
  const {
    state,

    onInputChange,

    errors,
    validate,
    setErrors,
  } = useValidation(initialFormState, validators);

  const OnLoginClick = async (e) => {
    e.preventDefault();

    if (validate()) {
      setLoading(true);
      const response = await AdminLoginData(state.email, state.password);
      console.log("resultt--" + JSON.stringify(response));

      if (response === "password not matched") {
        setLoading(false);
        setErrors("staus is false");
      } else if (response === "email not found") {
        setLoading(false);
        setErrors("email not found");
      } else if (response[1].true === true) {
        setLoading(false);
        localStorage.setItem("admin_token", response[1].token);
        navigate("/admin");
      }

      // localStorage.setItem("admin_token", response[1].token);
      // if (response.status === false) {
      //   setErrMsg("staus is false");
      // } else {
      //   navigate("/");
      // }
    }
  };

  const responseFacebook = async (response) => {
    setFacebook(false);
    // if(response.graphDomain === "facebook"){
    //   let data = await SocialLogin(response.userID,response.email,response.name,response.picture.data.url,"Facebook");
    //     localStorage.setItem("token", data.token);
    //     localStorage.setItem("userType", "user");
    //     localStorage.setItem("employee_id", data.employee_id);
    //     localStorage.setItem("profile_photo", data.profile_photo);
    //     toast.success("Logged In Successfully", {
    //       position: toast.POSITION.TOP_RIGHT,
    //       autoClose: 1000,
    //     });
    //     props.close();
    //     navigate("/");
    //     window.location.reload();
    //   }
  };
  const GoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        let data = await axios(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          }
        );
        //  if(data.data.email_verified === true){
        //   let res = await SocialLogin(data.data.sub,data.data.email,data.data.name,data.data.picture,"Google");
        //   console.log(res,);
        //   localStorage.setItem("token", res.token);
        //   localStorage.setItem("userType", "user");
        //   localStorage.setItem("employee_id", res.employee_id);
        //   localStorage.setItem("profile_photo", res.profile_photo);
        //   toast.success("Logged In Successfully", {
        //     position: toast.POSITION.TOP_RIGHT,
        //     autoClose: 1000,
        //   });
        //   props.close();
        //   navigate("/");
        //   window.location.reload();
        // }
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    },
  });
  return (
    <div>
      {loading === true ? <Loader /> : null}
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
                  <h2>welcome Admin !</h2>
                  <p>Use your credentials to access</p>
                </div>
                <div className="user-form-group">
                  <ul className="user-form-social">
                    <li>
                      <Link
                        className="facebook"
                        onClick={() => setFacebook(true)}
                      >
                        <i className="fab fa-facebook-f"></i>login with Facebook
                      </Link>
                      {facebook ? (
                        <FacebookLogin
                          appId="276709614913655"
                          autoLoad
                          callback={responseFacebook}
                          fields="name,email,picture"
                          scope="public_profile,user_friends,email,user_actions.books"
                          className="font-size-4 font-weight-semibold position-relative text-white bg-marino h-px-48 flex-all-center w-100 px-6 rounded-5 mb-4"
                          render={(renderProps) => (
                            <button
                              onClick={renderProps.onClick}
                              className="d-none"
                            ></button>
                          )}
                        />
                      ) : null}
                    </li>
                    {/* <li>
                      <Link to="#" className="twitter">
                        <i className="fab fa-twitter"></i>login with twitter
                      </Link>
                    </li> */}
                    <li>
                      <Link to="#" className="google" onClick={GoogleLogin}>
                        <i className="fab fa-google"></i>login with google
                      </Link>
                    </li>
                    {/* <li>
                      <Link to="#" className="instagram">
                        <i className="fab fa-instagram"></i>login with instagram
                      </Link>
                    </li> */}
                  </ul>
                  <div className="user-form-divider">
                    <p>or</p>
                  </div>
                  <form className="user-form">
                    <div className="form-group">
                      <input
                        type="email"
                        className="form-control user_input_class"
                        value={state.email}
                        name="email"
                        placeholder="Enter your email"
                        onChange={onInputChange}
                      />
                      {errors.email
                        ? (errors.email || []).map((error) => {
                            return (
                              <small className="text-danger">{error}</small>
                            );
                          })
                        : null}
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        className="form-control user_input_class"
                        placeholder="Enter your password"
                        name="password"
                        value={state.password}
                        onChange={onInputChange}
                      />
                      {errors.password
                        ? (errors.password || []).map((error) => {
                            return (
                              <small className="text-danger">{error}</small>
                            );
                          })
                        : null}
                    </div>
                    {/* <div className="form-check mb-3">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="check"
                      />
                      <label className="form-check-label" for="check">
                        Remember Me
                      </label>
                    </div> */}
                    {errors === "staus is false" ? (
                      <small className="text-danger">
                        credentials Not Matches
                      </small>
                    ) : null}

                    {errors === "email not found" ? (
                      <small className="text-danger">Email not found</small>
                    ) : null}

                    <div className="form-button">
                      <button onClick={OnLoginClick}>login</button>
                      <p>
                        Forgot your password?
                        <Link to={"/Driverforgetpassword"}>reset here</Link>
                      </p>
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

export default AdminLogin;
