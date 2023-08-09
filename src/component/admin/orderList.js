import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

import Form from "react-bootstrap/Form";
import DataTable from "react-data-table-component";

import SweetAlert from "sweetalert-react";
import "sweetalert/dist/sweetalert.css";

import useValidation from "../common/useValidation";
import {
  allOrder,
  chooseDriverforDelivery,
  orderAssignByAdmin,
} from "../api/api";
import Sidebar from "../common/sidebar";

const OrderList = () => {
  const [driverListView, setDriverListView] = useState(false);
  const [ordertable, setorderTable] = useState([]);
  // const [orderAssignVehicleAlert, setorderAssignVehicleAlert] = useState(false);
  const [orderAssignAlert, setorderAssignAlert] = useState(false);
  const [apicall, setApicall] = useState(false);
  const [driverList, setDriverList] = useState([]);

  //search order id filter intial state.............
  const initialFormState = {
    order_id: "",
  };

  //order data table column----
  const columns = [
    {
      name: "Order No",
      selector: (row) => <p>{row.order_id}</p>,
      sortable: true,
      width: "150px",
      center: true,
      style: {
        paddingRight: "32px",
        paddingLeft: "0px",
      },
    },
    {
      name: "Order Quantity",
      selector: (row) => row.total_order_product_quantity,
      sortable: true,
      width: "150px",
      center: true,
      style: {
        paddingRight: "32px",
        paddingLeft: "0px",
      },
    },

    {
      name: "Total amount",
      selector: (row) => row.payment,
      sortable: true,
      width: "140px",
      center: true,
      style: {
        paddingLeft: "0px",
      },
    },

    {
      name: "Payment Method",
      selector: (row) => row.payment_method,
      sortable: true,
      width: "140px",
      center: true,
    },
    {
      name: "Order status",
      selector: (row) => row.order_status,
      sortable: true,
      width: "140px",
      center: true,
    },
    {
      name: "Shipping Charges",
      selector: (row) => row.shipping_charges,
      sortable: true,
      width: "140px",
      center: true,
    },
    {
      name: "Order date",
      selector: (row) => row.order_date,
      sortable: true,
      width: "140px",
      center: true,
    },
    {
      name: "Delivery date",
      selector: (row) => row.delivery_date,
      sortable: true,
      width: "140px",
      center: true,
    },

    {
      name: "Order Assign ",
      width: "140px",
      selector: (row) => (
        <Form.Select
          aria-label="Search by delivery"
          size="sm"
          className="w-100"
          onChange={(e) =>
            onStatusChange(
              e,
              row.order_id,
              row.total_amount,
              row.payment_mode,
              row.delivery_verify_code
            )
          }
          name="status_order"
          // value={row.status_order}
        >
          <option value="">drivers</option>
          {driverList.map((item) => {
            return (
              <>
                <option value={item.driver_id}>
                  {item.driver_name}&nbsp;
                  {item.driver_last_name}({item.company_name}
                  {item.model})
                </option>
              </>
            );
          })}
        </Form.Select>
      ),
    },
  ];

  //fuction for close assign order alert and driver list view alert
  const closeAssignAlert = () => {
    setorderAssignAlert(false);
    setDriverListView(false);
  };

  //onclick funtion for choose driver for delivery ---------------
  const onGetDriverList = async (id) => {
    const response = await chooseDriverforDelivery();

    setDriverList(response);
    // setDriverListView(true);
  };

  //search filter validation object
  const validators = {
    order_id: [
      (value) =>
        value === null || value === ""
          ? "Please Fill...."
          : /[^A-Za-z 0-9]/g.test(value)
          ? "Cannot use special character "
          : null,
    ],
  };

  //import custom validation ------
  const { state, setState, onInputChange, errors, validate } = useValidation(
    initialFormState,
    validators
  );

  //order list show  useEffect................
  useEffect(() => {
    OrderData();
    onGetDriverList();
  }, [apicall]);

  //function for get all order list................
  const OrderData = async () => {
    const response = await allOrder();

    setorderTable(response);
  };

  //search submit button
  const submitHandler = async () => {
    if (validate()) {
      const response = await allOrder(state.order_id);
      setorderTable(response);
    }
  };

  //search submit reset button
  const OnReset = () => {
    setState({ order_id: "" });
    OrderData();
    setApicall(true);
  };

  const onStatusChange = async (e, order_id) => {
    console.log("driver id" + e.target.value);
    console.log("order id" + order_id);
    let response = await orderAssignByAdmin(order_id, e.target.value);
    setorderAssignAlert(true);
  };

  return (
    <div>
      <div className="row admin_row">
        <div className="col-lg-3 col-md-3 admin_sidebar">
          <Sidebar />
        </div>
        <div className="col-lg-9 col-md-9 admin_content_bar mt-5">
          <div className="main_content_div">
            <div
              className="dashboard-main-container mt-df25 mt-lg-31"
              id="dashboard-body"
            >
              <div className="">
                <div className="page_main_contant">
                  <h4>Order List</h4>
                  <div className=" mt-3 p-3">
                    <div className="row pb-3">
                      <div className="col-md-3 col-sm-6 aos_input mb-2">
                        <Form.Group className="mb-3">
                          <Form.Control
                            type="text"
                            className={
                              errors.order_id
                                ? "form-control border border-danger"
                                : "form-control"
                            }
                            placeholder="Search by order no."
                            name="order_id"
                            onChange={onInputChange}
                            value={state.order_id}
                          />
                        </Form.Group>
                        {errors.order_id
                          ? (errors.order_id || []).map((error) => {
                              return (
                                <small className="text-danger">{error}</small>
                              );
                            })
                          : null}
                      </div>

                      <div className="col-md-2 col-sm-6 aos_input mb-2">
                        <div>
                          <Button
                            type=""
                            name=""
                            value=""
                            className="button  btn-success main_button w-100"
                            onClick={submitHandler}
                          >
                            Search
                          </Button>
                        </div>
                      </div>
                      <div className="col-md-2 col-sm-6 aos_input mb-2">
                        <div>
                          <Button
                            type="reset"
                            name=""
                            value=""
                            className="button btn-success  main_button w-100"
                            onClick={OnReset}
                          >
                            Reset
                          </Button>
                        </div>
                      </div>
                    </div>
                    <SweetAlert
                      show={orderAssignAlert}
                      title="Assigned Successfully"
                      text={"Assign"}
                      onConfirm={closeAssignAlert}
                      // showCancelButton={}
                      // onCancel={}
                    />

                    <SweetAlert
                      show={driverListView}
                      title="Choose Driver Successfully"
                      text={"You may see Driver"}
                      onConfirm={closeAssignAlert}
                      // showCancelButton={}
                      // onCancel={}
                    />

                    <DataTable
                      columns={columns}
                      data={ordertable}
                      pagination
                      highlightOnHover
                      pointerOnHover
                      className={"table_body product_table"}
                      subHeader
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderList;
