import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { addWorkingAreaFunction } from "../api/api";
import useValidation from "./useValidation";

import SweetAlert from "sweetalert-react";
import "sweetalert/dist/sweetalert.css";

const ModelForm = ({
  driver_id,
  showmodel,

  ModelCloseFunction,
}) => {
  const [adddataAlert, setAddDataAlert] = useState(false);

  const initialFormState = {
    city: "",
    area_name: "",
    pin_code: "",
    driver_lat: "",
    driver_log: "",
  };

  const validators = {
    city: [
      (value) =>
        value === null || value === ""
          ? "City is required"
          : /[^A-Za-z 0-9]/g.test(value)
          ? "Cannot use special character "
          : null,
    ],
    area_name: [
      (value) =>
        value === null || value === ""
          ? "Area name is required"
          : /[^A-Za-z 0-9]/g.test(value)
          ? "Cannot use special character "
          : null,
    ],
    pin_code: [
      (value) =>
        value === null || value === ""
          ? "Pincode is required"
          : /[^A-Za-z 0-9]/g.test(value)
          ? "Cannot use special character "
          : null,
    ],

    driver_log: [
      (value) =>
        value === null || value === ""
          ? "Longitude is required"
          : // : /[^A-Za-z 0-9]/g.test(value)
            // ? "Cannot use special character "
            null,
    ],

    driver_lat: [
      (value) =>
        value === null || value === ""
          ? "Latitude is required"
          : // : /[^A-Za-z 0-9]/g.test(value)
            // ? "Cannot use special character "
            null,
    ],
  };

  const { state, setState, onInputChange, errors, validate } = useValidation(
    initialFormState,
    validators
  );
  const AddmodelData = async (e) => {
    console.log("id din--" + driver_id);
    e.preventDefault();
    if (validate()) {
      const response = await addWorkingAreaFunction(state, driver_id);

      if (response.message === "added yuor working area successfully") {
        setAddDataAlert(true);
      }
    }
  };

  const closeAddDataAlert = () => {
    setAddDataAlert(false);
    setState(initialFormState);
    ModelCloseFunction();
  };

  return (
    <div>
      <Modal
        size="lg"
        show={showmodel}
        onHide={ModelCloseFunction}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Form className="p-2 addproduct_form" onSubmit={(e) => AddmodelData(e)}>
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-lg">
              Add working Area
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label className="" column sm="12">
                    City <small className="text-danger">*</small>
                  </Form.Label>
                  <Form.Control
                    className={
                      errors.city
                        ? "form-control border border-danger"
                        : "form-control"
                    }
                    type="text"
                    value={state.city}
                    name="city"
                    onChange={(v) => {
                      if (v.target.value.length <= 30) {
                        onInputChange(v);
                      }
                    }}
                    id="city"
                  />
                  {errors.city
                    ? (errors.city || []).map((error) => {
                        return <small className="text-danger">{error}</small>;
                      })
                    : null}
                </Form.Group>
              </div>

              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label className="" column sm="12">
                    Area name
                    <small className="text-danger">*</small>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    className={
                      errors.area_name
                        ? "form-control border border-danger"
                        : "form-control"
                    }
                    value={state.area_name}
                    name="area_name"
                    onChange={(v) => {
                      if (v.target.value.length <= 30) {
                        onInputChange(v);
                      }
                    }}
                    id="area_name"
                  />
                  {errors.area_name
                    ? (errors.area_name || []).map((error) => {
                        return <small className="text-danger">{error}</small>;
                      })
                    : null}
                </Form.Group>
              </div>

              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label className="" column sm="12">
                    Pincode
                    <small className="text-danger">*</small>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    className={
                      errors.pin_code
                        ? "form-control border border-danger"
                        : "form-control"
                    }
                    value={state.pin_code}
                    name="pin_code"
                    onChange={(v) => {
                      if (v.target.value.length <= 30) {
                        onInputChange(v);
                      }
                    }}
                    id="pin_code"
                  />
                  {errors.pin_code
                    ? (errors.pin_code || []).map((error) => {
                        return <small className="text-danger">{error}</small>;
                      })
                    : null}
                </Form.Group>
              </div>

              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label className="" column sm="12">
                    Area Latitude
                    <small className="text-danger">*</small>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    className={
                      errors.driver_lat
                        ? "form-control border border-danger"
                        : "form-control"
                    }
                    value={state.driver_lat}
                    name="driver_lat"
                    onChange={(v) => {
                      if (v.target.value.length <= 30) {
                        onInputChange(v);
                      }
                    }}
                    id="driver_lat"
                  />
                  {errors.driver_lat
                    ? (errors.driver_lat || []).map((error) => {
                        return <small className="text-danger">{error}</small>;
                      })
                    : null}
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label className="" column sm="12">
                    Area Longitude
                    <small className="text-danger">*</small>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    className={
                      errors.driver_log
                        ? "form-control border border-danger"
                        : "form-control"
                    }
                    value={state.driver_log}
                    name="driver_log"
                    onChange={(v) => {
                      if (v.target.value.length <= 30) {
                        onInputChange(v);
                      }
                    }}
                    id="driver_log"
                  />
                  {errors.driver_log
                    ? (errors.driver_log || []).map((error) => {
                        return <small className="text-danger">{error}</small>;
                      })
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
                  </Button>
                </div>
              </div>
              <div className="col-md-3 col-sm-4 p-2 text-center"></div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            {/* <Button onClick={setLgShow(false)}>Close</Button> */}
          </Modal.Footer>
        </Form>
      </Modal>

      <SweetAlert
        show={adddataAlert}
        title="Added Successfully"
        text={"Area Added"}
        onConfirm={closeAddDataAlert}
        // showCancelButton={}
        // onCancel={}
      />
    </div>
  );
};

export default ModelForm;
