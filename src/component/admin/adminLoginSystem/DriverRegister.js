import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import Logo from "../css-js/images/logo.png";
import { Button } from "react-bootstrap";
import useValidation from "../common/useValidation";
import Modal from "react-bootstrap/Modal";
import { getDriverDetails, UpdateDriverByToken } from "../api/api";

import { useNavigate } from "react-router-dom";

// import { areavalue, area_lat_long } from "./locationJSON";
const DriverRegister = () => {
  const initialFormState = {
    driver_name: "",
    driver_last_name: "",
    date_of_birth: "",
    current_address: "",
    gender: "",
    age: "",
    image: "",
    contect_no: "",
    // email: "",
    // password: "",
    // status: "",
    aadhar_no: "",
    licence_no: "",
    licence_issue_date: "",
    licence_validity_date: "",
    // current_latitude: "",
    // current_longitude: "",
  };
  const navigate = useNavigate();

  const [file, setFile] = useState();
  const [filename, setFilename] = useState("");
  const [showmodel, setShowmodel] = useState(false);

  const validators = {
    driver_name: [
      (value) =>
        value === null || value === ""
          ? "Driver first name is required"
          : /[^A-Za-z 0-9]/g.test(value)
          ? "Cannot use special character "
          : null,
    ],
    driver_last_name: [
      (value) =>
        value === null || value === ""
          ? "Driver last name is required"
          : /[^A-Za-z 0-9]/g.test(value)
          ? "Cannot use special character "
          : null,
    ],

    date_of_birth: [
      (value) =>
        value === null || value === ""
          ? "Date of Birth is required"
          : // : /[^A-Za-z 0-9]/g.test(value)
            // ? "Cannot use special character "
            null,
    ],
    current_address: [
      (value) =>
        value === null || value === ""
          ? "Current address is required"
          : /[^A-Za-z 0-9]/g.test(value)
          ? "Cannot use special character "
          : null,
    ],
    gender: [
      (value) =>
        value === null || value === ""
          ? "gender is required"
          : /[^A-Za-z 0-9]/g.test(value)
          ? "Cannot use special character "
          : null,
    ],
    age: [
      (value) =>
        value === null || value === ""
          ? "Age is required"
          : /[^A-Za-z 0-9]/g.test(value)
          ? "Cannot use special character "
          : null,
    ],
    contect_no: [
      (value) =>
        value === null || value === ""
          ? "Contect number is required"
          : // : /^(\+\d{1,3}[- ]?)?\d{10}$/g.test(value)
          // ? "Invalid Mobile number "
          value.length > 10 || value.length < 10
          ? "Contect number should be 10 digit"
          : null,
    ],
    // email: [
    //   (value) =>
    //     value === null || value === ""
    //       ? "Email address is required"
    //       : !/^\S+@\S+\.\S+$/.test(value)
    //       ? "Invalid email address"
    //       : null,
    // ],
    // password: [
    //   (value) =>
    //     value === null || value === ""
    //       ? "Password is required"
    //       : /[^A-Za-z 0-9]/g.test(value)
    //       ? "Cannot use special character "
    //       : null,
    // ],
    // status: [
    //   (value) =>
    //     value === null || value === ""
    //       ? "Status is required"
    //       : /[^A-Za-z 0-9]/g.test(value)
    //       ? "Cannot use special character "
    //       : null,
    // ],
    aadhar_no: [
      (value) =>
        value === null || value === ""
          ? "Aadhar no. is required"
          : /[^A-Za-z 0-9]/g.test(value)
          ? "Cannot use special character "
          : null,
    ],
    licence_no: [
      (value) =>
        value === null || value === ""
          ? "Licence no. is required"
          : /[^A-Za-z 0-9]/g.test(value)
          ? "Cannot use special character "
          : null,
    ],
    licence_issue_date: [
      (value) =>
        value === null || value === ""
          ? "Licence issue date is required"
          : // : /[^A-Za-z 0-9]/g.test(value)
            // ? "Cannot use special character "
            null,
    ],
    licence_validity_date: [
      (value) =>
        value === null || value === ""
          ? "Licence validity date is required"
          : // : /[^A-Za-z 0-9]/g.test(value)
            // ? "Cannot use special character "
            null,
    ],
  };

  const { state, setState, onInputChange, errors, validate } = useValidation(
    initialFormState,
    validators
  );

  const OnFileUpload = (e) => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  // const OnCurrentLocation = (e) => {
  //   // setCurrentLocation(e.target.value);
  //   var nnn = area_lat_long[e.target.value];
  //   console.log(e.target.value);
  //   console.log(nnn);
  //   setState({
  //     current_latitude: nnn.lat,
  //     current_longitude: nnn.long,
  //   });
  // };

  useEffect(() => {
    DriverDetails();
  }, []);

  const DriverDetails = async () => {
    const response = await getDriverDetails();
    // console.log("response---" + JSON.stringify(response));
    setState(response[0]);
  };

  const handleUpdatedriver = async (e) => {
    e.preventDefault();
    // console.log(JSON.stringify(state));
    if (validate()) {
      const response = await UpdateDriverByToken(state, file, filename);
      // const { message, vendor_detaile } = response;
      console.log("driver update" + JSON.stringify(response));
      if (response.message === "updated user successfully") {
        localStorage.removeItem("driver_token");
        setShowmodel(true);
      }
    }
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
                <a href="index.html">
                  <img src={Logo} alt="logo" />
                </a>
              </div>
              <div className="user-form-card">
                <div className="user-form-title">
                  <h2>welcome driver!!! </h2>
                  <p>Use your credentials to access</p>
                </div>
                <div className="user-form-group">
                  <Form
                    className="p-2 addproduct_form"
                    onSubmit={(e) => handleUpdatedriver(e)}
                  >
                    <div className="row">
                      <div className="col-md-6">
                        <Form.Group className="mb-3">
                          <Form.Label className="" column sm="12">
                            Driver Last Name{" "}
                            <small className="text-danger">*</small>
                          </Form.Label>
                          <Form.Control
                            className={
                              errors.driver_name
                                ? "form-control border border-danger"
                                : "form-control"
                            }
                            type="text"
                            value={state.driver_name}
                            name="driver_name"
                            onChange={onInputChange}
                            id="driver_name"
                          />
                          {errors.driver_name
                            ? (errors.driver_name || []).map((error) => {
                                return (
                                  <small className="text-danger">{error}</small>
                                );
                              })
                            : null}
                        </Form.Group>
                      </div>

                      <div className="col-md-6">
                        <Form.Group className="mb-3">
                          <Form.Label className="" column sm="12">
                            Driver last Name
                            <small className="text-danger">*</small>
                          </Form.Label>
                          <Form.Control
                            type="text"
                            className={
                              errors.driver_last_name
                                ? "form-control border border-danger"
                                : "form-control"
                            }
                            value={state.driver_last_name}
                            name="driver_last_name"
                            onChange={onInputChange}
                            id="driver_last_name"
                          />
                          {errors.driver_last_name
                            ? (errors.driver_last_name || []).map((error) => {
                                return (
                                  <small className="text-danger">{error}</small>
                                );
                              })
                            : null}
                        </Form.Group>
                      </div>

                      <div className="col-md-6">
                        <Form.Group className="mb-3">
                          <Form.Label className="" column sm="12">
                            Date Of Birth
                            <small className="text-danger">*</small>
                          </Form.Label>
                          <Form.Control
                            type="date"
                            className={
                              errors.date_of_birth
                                ? "form-control border border-danger"
                                : "form-control"
                            }
                            value={state.date_of_birth}
                            name="date_of_birth"
                            onChange={onInputChange}
                            id="date_of_birth"
                          />
                          {errors.date_of_birth
                            ? (errors.date_of_birth || []).map((error) => {
                                return (
                                  <small className="text-danger">{error}</small>
                                );
                              })
                            : null}
                        </Form.Group>
                      </div>

                      <div className="col-md-6">
                        <Form.Group className="mb-3">
                          <Form.Label className="" column sm="12">
                            Current Address
                            <small className="text-danger">*</small>
                          </Form.Label>
                          <Form.Control
                            type="text"
                            className={
                              errors.current_address
                                ? "form-control border border-danger"
                                : "form-control"
                            }
                            value={state.current_address}
                            name="current_address"
                            onChange={onInputChange}
                            id="current_address"
                          />
                          {errors.current_address
                            ? (errors.current_address || []).map((error) => {
                                return (
                                  <small className="text-danger">{error}</small>
                                );
                              })
                            : null}
                        </Form.Group>
                      </div>
                      <div className="col-md-6">
                        <Form.Group className="mb-3">
                          <Form.Label className="" column sm="12">
                            Image
                          </Form.Label>
                          <Form.Control
                            type="file"
                            // value={state.gstn}
                            name="image"
                            onChange={(e) => OnFileUpload(e)}
                            id="image"
                          />
                        </Form.Group>
                      </div>
                      {/* <div className="col-md-6">
                        <Form.Group className="mb-3">
                          <Form.Label className="" column sm="12">
                            Location <small className="text-danger">*</small>
                          </Form.Label>
                          <Col sm="12">
                            <InputGroup className="">
                              <Form.Select
                                aria-label="Default select example"
                                // className="nice-select w-100"
                                // className={
                                //   errors.status
                                //     ? "form-control border border-danger"
                                //     : "form-control"
                                // }
                                sm="9"
                                onChange={(e) => OnCurrentLocation(e)}
                              >
                                {" "}
                                <option value="">select you Location</option>
                                {Object.keys(areavalue).map((result, key) => {
                                  return (
                                    <>
                                      <optgroup label={result}>
                                        {areavalue[result].map((area) => {
                                          return (
                                            <>
                                              <option value={area}>
                                                {area}
                                              </option>
                                            </>
                                          );
                                        })}
                                      </optgroup>
                                    </>
                                  );
                                })}
                              </Form.Select>
                            </InputGroup>
                          </Col>
                        </Form.Group>
                      </div> */}

                      <div className="col-md-6">
                        <Form.Label className="" column sm="12">
                          Gender<small className="text-danger">*</small>
                        </Form.Label>
                        <div className="d-flex ">
                          <Form.Check
                            type="radio"
                            value="male"
                            name="gender"
                            className="pe-3"
                            checked={state.gender === "male"}
                            label="Male"
                            onChange={onInputChange}
                            id="male"
                          />
                          <Form.Check
                            type="radio"
                            className="pe-3"
                            value="female"
                            checked={state.gender === "female"}
                            name="gender"
                            label="Female"
                            onChange={onInputChange}
                            id="female"
                          />
                          <Form.Check
                            type="radio"
                            className="pe-3"
                            value="other"
                            checked={state.gender === "other"}
                            name="gender"
                            label="Other"
                            onChange={onInputChange}
                            id="other"
                          />
                        </div>
                        {errors.gender
                          ? (errors.gender || []).map((error) => {
                              return (
                                <small className="text-danger">{error}</small>
                              );
                            })
                          : null}
                      </div>

                      <div className="col-md-6">
                        <Form.Group className="mb-3">
                          <Form.Label className="" column sm="12">
                            Age <small className="text-danger">*</small>
                          </Form.Label>
                          <Form.Control
                            type="text"
                            className={
                              errors.age
                                ? "form-control border border-danger"
                                : "form-control"
                            }
                            value={state.age}
                            name="age"
                            onChange={onInputChange}
                            id="age"
                          />
                          {errors.age
                            ? (errors.age || []).map((error) => {
                                return (
                                  <small className="text-danger">{error}</small>
                                );
                              })
                            : null}
                        </Form.Group>
                      </div>

                      <div className="col-md-6">
                        <Form.Group className="mb-3">
                          <Form.Label className="" column sm="12">
                            Contact No. <small className="text-danger">*</small>
                          </Form.Label>
                          <Form.Control
                            className={
                              errors.contect_no
                                ? "form-control border border-danger"
                                : "form-control"
                            }
                            type="number"
                            value={state.contect_no}
                            name="contect_no"
                            onChange={onInputChange}
                            id="contect_no"
                          />
                          {errors.contect_no
                            ? (errors.contect_no || []).map((error) => {
                                return (
                                  <small className="text-danger">{error}</small>
                                );
                              })
                            : null}
                        </Form.Group>
                      </div>
                      {/* <div className="col-md-6">
                        <Form.Group className="mb-3">
                          <Form.Label className="" column sm="12">
                            Email <small className="text-danger">*</small>
                          </Form.Label>
                          <Form.Control
                            className={
                              errors.email
                                ? "form-control border border-danger"
                                : "form-control"
                            }
                            type="email"
                            value={state.email}
                            name="email"
                            onChange={onInputChange}
                            id="email"
                          />
                          {errors.email
                            ? (errors.email || []).map((error) => {
                                return (
                                  <small className="text-danger">{error}</small>
                                );
                              })
                            : null}
                        </Form.Group>
                      </div> */}

                      {/* <div className="col-md-6">
                        <Form.Group className="mb-3">
                          <Form.Label className="" column sm="12">
                            Password <small className="text-danger">*</small>
                          </Form.Label>
                          <Form.Control
                            className={
                              errors.password
                                ? "form-control border border-danger"
                                : "form-control"
                            }
                            type="password"
                            value={state.password}
                            name="password"
                            onChange={onInputChange}
                            id="password"
                          />
                          {errors.password
                            ? (errors.password || []).map((error) => {
                                return (
                                  <small className="text-danger">{error}</small>
                                );
                              })
                            : null}
                        </Form.Group>
                      </div> */}

                      {/* <div className="col-md-6">
                        <Form.Group className="mb-3">
                          <Form.Label className="" column sm="12">
                            Status <small className="text-danger">*</small>
                          </Form.Label>
                          <Col sm="12">
                            <InputGroup className="">
                              <Form.Select
                                aria-label="Default select example"
                                // className="nice-select w-100"
                                className={
                                  errors.status
                                    ? "form-control border border-danger"
                                    : "form-control"
                                }
                                sm="9"
                                name="status"
                                onChange={onInputChange}
                                value={state.status}
                              >
                                <option value={""}>Select Availabilty</option>
                                <option value={"open"}>Open</option>
                                <option value={"close"}>Close</option>
                              </Form.Select>
                            </InputGroup>
                          </Col>
                        </Form.Group>
                      </div> */}

                      <div className="col-md-6">
                        <Form.Group className="mb-3">
                          <Form.Label className="" column sm="12">
                            Aadhar Number{" "}
                            <small className="text-danger">*</small>
                          </Form.Label>
                          <Form.Control
                            className={
                              errors.aadhar_no
                                ? "form-control border border-danger"
                                : "form-control"
                            }
                            type="text"
                            value={state.aadhar_no}
                            name="aadhar_no"
                            onChange={onInputChange}
                            id="aadhar_no"
                          />
                          {errors.aadhar_no
                            ? (errors.aadhar_no || []).map((error) => {
                                return (
                                  <small className="text-danger">{error}</small>
                                );
                              })
                            : null}
                        </Form.Group>
                      </div>

                      <div className="col-md-6">
                        <Form.Group className="mb-3">
                          <Form.Label className="" column sm="12">
                            Licence Number{" "}
                            <small className="text-danger">*</small>
                          </Form.Label>
                          <Form.Control
                            className={
                              errors.licence_no
                                ? "form-control border border-danger"
                                : "form-control"
                            }
                            type="text"
                            value={state.licence_no}
                            name="licence_no"
                            onChange={onInputChange}
                            id="licence_no"
                          />
                          {errors.licence_no
                            ? (errors.licence_no || []).map((error) => {
                                return (
                                  <small className="text-danger">{error}</small>
                                );
                              })
                            : null}
                        </Form.Group>
                      </div>

                      <div className="col-md-6">
                        <Form.Group className="mb-3">
                          <Form.Label className="" column sm="12">
                            Licence Issue data{" "}
                            <small className="text-danger">*</small>
                          </Form.Label>
                          <Form.Control
                            className={
                              errors.licence_issue_date
                                ? "form-control border border-danger"
                                : "form-control"
                            }
                            type="date"
                            value={state.licence_issue_date}
                            name="licence_issue_date"
                            onChange={onInputChange}
                            id="licence_issue_date"
                          />
                          {errors.licence_issue_date
                            ? (errors.licence_issue_date || []).map((error) => {
                                return (
                                  <small className="text-danger">{error}</small>
                                );
                              })
                            : null}
                        </Form.Group>
                      </div>

                      <div className="col-md-6">
                        <Form.Group className="mb-3">
                          <Form.Label className="" column sm="12">
                            Licence validity data{" "}
                            <small className="text-danger">*</small>
                          </Form.Label>
                          <Form.Control
                            className={
                              errors.licence_validity_date
                                ? "form-control border border-danger"
                                : "form-control"
                            }
                            type="date"
                            value={state.licence_validity_date}
                            name="licence_validity_date"
                            onChange={onInputChange}
                            id="licence_validity_date"
                          />
                          {errors.licence_validity_date
                            ? (errors.licence_validity_date || []).map(
                                (error) => {
                                  return (
                                    <small className="text-danger">
                                      {error}
                                    </small>
                                  );
                                }
                              )
                            : null}
                        </Form.Group>
                      </div>

                      <div className="col-md-3 col-sm-4 p-2 text-center">
                        <div className="manufacture_date addvariety_inputbox">
                          <Button
                            variant="outline-success"
                            className="addcategoryicon w-100"
                            type={"submit"}
                          >
                            {" "}
                            Add
                            {/* {modalshow === "add"
                              ? "Add Vendor"
                              : "Update Vendor"} */}
                          </Button>
                        </div>
                      </div>
                      <div className="col-md-3 col-sm-4 p-2 text-center"></div>
                    </div>
                    {/* </Modal.Body> */}
                  </Form>
                </div>
                <Modal show={showmodel} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Message for Driver</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>Your Profile successfully Updated</Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Close
                    </Button>
                  </Modal.Footer>
                </Modal>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DriverRegister;
