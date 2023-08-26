import axios from "axios";
import moment from "moment";
// import React from "react";

let admin_token = localStorage.getItem("admin_token");

let driver_token = localStorage.getItem("driver_token");
console.log("jjjj");
export const allOrder = async (id) => {
  const response = await axios.post(
    `${process.env.REACT_APP_BASEURL_0}/get_delivery_detaile_list`,
    {
      order_id: id,
      date_from: "",
      date_to: "",
    },
    { headers: { admin_token: `${admin_token}` } }
  );
  return response.data;
};

export const OrderStatusChange = async (stautsValue, orderID, userId) => {
  const response = await axios.put(
    `${process.env.REACT_APP_BASEURL_0}/order_status_update`,
    {
      order_id: orderID,
      status_order: stautsValue,
      user_id: userId,
    },
    { headers: { admin_token: `${admin_token}` } }
  );
  return response.data;
};

export const AdminLoginData = async (email, password) => {
  const response = await axios.post(
    `${process.env.REACT_APP_BASEURL_0}/delivery_admin_login`,
    {
      admin_email: email,
      admin_password: password,
    }
  );
  return response.data;
};

export const AddDriverByAdmin = async (
  props,
  imagefile,
  imagefilename,
  adharfile,
  adharfilename,
  licencefile,
  licencefilename
) => {
  const formData = new FormData();
  formData.append("driver_name", props.driver_name);
  formData.append("driver_last_name", props.driver_last_name);
  formData.append("date_of_birth", props.date_of_birth);
  formData.append("current_address", props.current_address);
  formData.append("gender", props.gender);
  formData.append("age", props.age);
  formData.append("email", props.email);
  formData.append("password", props.password);
  formData.append("image", imagefile);
  formData.append("imagefilename", imagefilename);
  formData.append("aadhar_card", adharfile);
  formData.append("aadharfilename", adharfilename);
  formData.append("licence", licencefile);
  formData.append("licencefilename", licencefilename);
  formData.append("contect_no", props.contect_no);
  formData.append("aadhar_no", props.aadhar_no);
  formData.append("licence_no", props.licence_no);
  formData.append("licence_issue_date", props.licence_issue_date);
  formData.append("licence_validity_date", props.licence_validity_date);

  const response = await axios.post(
    `${process.env.REACT_APP_BASEURL_0}/driver_add_by_admin`,
    formData,
    { headers: { admin_token: `${admin_token}` } }
  );
  return response.data;
};

export const DriverSignUpFuntion = async (email, password) => {
  const response = await axios.post(
    `${process.env.REACT_APP_BASEURL_0}/sign_by_driver`,
    {
      email: email,
      password: password,
    }
  );
  return response.data;
};

export const DriverOtpVerifyFuntion = async (email, otp) => {
  const response = await axios.post(
    `${process.env.REACT_APP_BASEURL_0}/driver_otp_verify`,
    {
      email: email,
      otp: otp,
    }
  );
  return response.data;
};

export const DriverLoginFuntion = async (email, password) => {
  const response = await axios.post(
    `${process.env.REACT_APP_BASEURL_0}/driver_login`,
    {
      email: email,
      password: password,
    }
  );
  return response.data;
};

export const getForgetOtpDriver = async (email) => {
  const response = await axios.post(
    `${process.env.REACT_APP_BASEURL_0}/driver_forgate_password`,
    {
      email: email,
    }
  );
  return response.data;
};

export const ForgetpasswordDriverUpdate = async (password) => {
  const response = await axios.put(
    `${process.env.REACT_APP_BASEURL_0}/driver_forgate_password_update`,
    {
      password: password,
    },
    {
      headers: {
        driver_token: driver_token,
      },
    }
  );
  return response.data;
};

export const getDriverDetails = async () => {
  const response = await axios.get(
    `${process.env.REACT_APP_BASEURL_0}/driver_details`,

    {
      headers: {
        driver_token: driver_token,
      },
    }
  );
  return response.data;
};

export const UpdateDriverByToken = async (
  props,
  imagefile,
  imagefilename,
  adharfile,
  adharfilename,
  licencefile,
  licencefilename
) => {
  const formData = new FormData();

  formData.append("driver_name", props.driver_name);
  formData.append("driver_last_name", props.driver_last_name);
  formData.append("date_of_birth", props.date_of_birth);
  formData.append("current_address", props.current_address);
  formData.append("gender", props.gender);
  formData.append("age", props.age);
  formData.append("email", props.email);
  formData.append("password", props.password);
  formData.append("image", imagefile);
  formData.append("imagefilename", imagefilename);
  formData.append("aadhar_card", adharfile);
  formData.append("aadharfilename", adharfilename);
  formData.append("licence", licencefile);
  formData.append("licencefilename", licencefilename);
  formData.append("contect_no", props.contect_no);
  formData.append("aadhar_no", props.aadhar_no);
  formData.append("licence_no", props.licence_no);
  formData.append("licence_issue_date", props.licence_issue_date);
  formData.append("licence_validity_date", props.licence_validity_date);
  const response = await axios.put(
    `${process.env.REACT_APP_BASEURL_0}/update_driver`,
    formData,
    {
      headers: {
        driver_token: driver_token,
      },
    }
  );
  return response.data;
};

export const getDriverListById = async (id) => {
  const response = await axios.post(
    `${process.env.REACT_APP_BASEURL_0}/only_driver_list`,
    {
      driver_id: id,
    }
  );
  return response.data;
};

export const UpdateDriverByAdmin = async (
  props,
  imagefile,
  imagefilename,
  adharfile,
  adharfilename,
  licencefile,
  licencefilename,
  headerObj
) => {
  const formData = new FormData();
  formData.append("driver_name", props.driver_name);
  formData.append("driver_last_name", props.driver_last_name);
  formData.append("date_of_birth", props.date_of_birth);
  formData.append("current_address", props.current_address);
  formData.append("gender", props.gender);
  formData.append("age", props.age);
  formData.append("email", props.email);
  formData.append("password", props.password);
  formData.append("image", imagefile);
  formData.append("imagefilename", imagefilename);
  formData.append("aadhar_card", adharfile);
  formData.append("aadharfilename", adharfilename);
  formData.append("licence", licencefile);
  formData.append("licencefilename", licencefilename);
  formData.append("contect_no", props.contect_no);
  formData.append("aadhar_no", props.aadhar_no);
  formData.append("licence_no", props.licence_no);
  formData.append(
    "licence_issue_date",
    moment(props.licence_issue_date).format("YYYY-MM-DD")
  );
  formData.append(
    "licence_validity_date",
    moment(props.licence_validity_date).format("YYYY-MM-DD")
  );
  formData.append("driver_id", props.driver_id);

  const response = await axios.put(
    `${process.env.REACT_APP_BASEURL_0}/update_driver`,
    formData,
    headerObj
  );
  return response.data;
};

export const getDriverFilter = async (name) => {
  const response = await axios.post(
    `${process.env.REACT_APP_BASEURL_0}/only_driver_list`,
    {
      search: name,
    }
  );
  return response.data;
};

export const DriverUpdateStatus = async (id, statusValue) => {
  const response = await axios.put(
    `${process.env.REACT_APP_BASEURL_0}/delete_restore_driver`,
    {
      driver_id: id,
      is_active: "",
      status: statusValue,
    },
    { headers: { admin_token: `${admin_token}` } }
  );
  return response.data;
};

export const DriverDeleteStatusChange = async (id) => {
  const response = await axios.put(
    `${process.env.REACT_APP_BASEURL_0}/delete_restore_driver`,
    {
      driver_id: id,
      is_active: "0",
    },
    { headers: { admin_token: `${admin_token}` } }
  );
  return response.data;
};

export const AddVehicleByAdmin = async (
  props,
  pucCertificateFile,
  pucCertificatefilename,
  insuranceFile,
  insurancefilename,
  registrationFile,
  registrationfilename
) => {
  console.log("data---" + JSON.stringify(props));
  const formData = new FormData();
  formData.append("company_name", props.company_name);
  formData.append("model", props.model);
  formData.append("color", props.color);
  formData.append(
    "registration_no_of_vehicle",
    props.registration_no_of_vehicle
  );
  formData.append("chassis_number", props.chassis_number);

  formData.append("vehicle_owner_name", props.vehicle_owner_name);
  formData.append("puc_expiration_date", props.puc_expiration_date);
  formData.append("insurance_expiration_date", props.insurance_expiration_date);
  formData.append(
    "registration_expiration_date",
    props.registration_expiration_date
  );
  formData.append("puc_certificate", pucCertificateFile);
  formData.append("pucCertificatefilename", pucCertificatefilename);
  formData.append("insurance", insuranceFile);
  formData.append("insurancefilename", insurancefilename);
  formData.append("registration", registrationFile);
  formData.append("registrationfilename", registrationfilename);

  const response = await axios.post(
    `${process.env.REACT_APP_BASEURL_0}/register_your_vehicle`,
    formData,
    { headers: { admin_token: `${admin_token}` } }
  );
  return response.data;
};

export const getDriverList = async () => {
  const response = await axios.post(
    `${process.env.REACT_APP_BASEURL_0}/only_driver_list`,
    { search: "", is_active: 1 }
  );
  return response.data;
};

export const getAllDriverList = async () => {
  const response = await axios.post(
    `${process.env.REACT_APP_BASEURL_0}/driver_list`
  );
  return response.data;
};

export const chooseDriverforDelivery = async () => {
  const response = await axios.post(
    `${process.env.REACT_APP_BASEURL_0}/chouse_driver_for_delivery`,
    {
      order_id: "",
      delivery_lat: "",
      delivery_log: "",
      nearest_of_delivery_pin: "",
    },
    { headers: { admin_token: `${admin_token}` } }
  );
  return response.data;
};

export const orderAssignByAdmin = async (orderID, driverId) => {
  const response = await axios.post(
    `${process.env.REACT_APP_BASEURL_0}/order_asign_by_delivery_admin`,
    {
      order_id: orderID,
      driver_id: driverId,
    },
    { headers: { admin_token: `${admin_token}` } }
  );
  return response.data;
};

export const getOrderWithDriver = async (fromDate, toDate, obj) => {
  const response = await axios.post(
    `${process.env.REACT_APP_BASEURL_0}/get_delivery_detaile_list`,
    {
      date_from: fromDate,
      date_to: toDate,
    },
    obj
  );
  return response.data;
};

export const VehicleList = async () => {
  const response = await axios.post(
    `${process.env.REACT_APP_BASEURL_0}/vehicle_list`,
    {
      is_active: 1,
    },
    { headers: { admin_token: admin_token } }
  );
  return response.data;
};

export const VehicleListById = async (id) => {
  const response = await axios.post(
    `${process.env.REACT_APP_BASEURL_0}/vehicle_list`,
    {
      vehicle_id: id,
    },
    { headers: { admin_token: admin_token } }
  );
  return response.data;
};

export const VehicleListFilter = async (companyName) => {
  const response = await axios.post(
    `${process.env.REACT_APP_BASEURL_0}/vehicle_list`,
    {
      search: companyName,
      // model: modelname,
    },
    { headers: { admin_token: admin_token } }
  );
  return response.data;
};

export const UpdateVehicleByAdmin = async (
  props,
  pucCertificateFile,
  pucCertificatefilename,
  insuranceFile,
  insurancefilename,
  registrationFile,
  registrationfilename
) => {
  const formData = new FormData();
  formData.append("vehicle_id", props.vehicle_id);
  // formData.append("driver_id", props.driver_id);
  formData.append("company_name", props.company_name);
  formData.append("model", props.model);
  formData.append("color", props.color);
  formData.append(
    "registration_no_of_vehicle",
    props.registration_no_of_vehicle
  );
  formData.append("chassis_number", props.chassis_number);

  formData.append("vehicle_owner_name", props.vehicle_owner_name);
  formData.append(
    "puc_expiration_date",
    moment(props.puc_expiration_date).format("YYYY-MM-DD")
  );
  formData.append(
    "insurance_expiration_date",
    moment(props.insurance_expiration_date).format("YYYY-MM-DD")
  );
  formData.append(
    "registration_expiration_date",
    moment(props.registration_expiration_date).format("YYYY-MM-DD")
  );
  formData.append("puc_certificate", pucCertificateFile);
  formData.append("pucCertificatefilename", pucCertificatefilename);
  formData.append("insurance", insuranceFile);
  formData.append("insurancefilename", insurancefilename);
  formData.append("registration", registrationFile);
  formData.append("registrationfilename", registrationfilename);

  const response = await axios.post(
    `${process.env.REACT_APP_BASEURL_0}/update_your_vehicle

    `,
    formData,
    { headers: { admin_token: `${admin_token}` } }
  );
  return response.data;
};

export const VehicleDeleteStatusChange = async (id) => {
  const response = await axios.put(
    `${process.env.REACT_APP_BASEURL_0}/change_vehicle_feild`,
    {
      vehicle_id: id,
      is_active: 0,
    },
    { headers: { admin_token: `${admin_token}` } }
  );
  return response.data;
};

export const AssignVehicleFunction = async (id, driverVal) => {
  const response = await axios.put(
    `${process.env.REACT_APP_BASEURL_0}/change_vehicle_feild`,
    {
      vehicle_id: id,
      driver_id: driverVal,
      is_active: "1",
    },
    { headers: { admin_token: admin_token } }
  );
  return response.data;
};

export const addWorkingAreaFunction = async (props, id) => {
  console.log(id);
  const response = await axios.post(
    `${process.env.REACT_APP_BASEURL_0}/add_working_area`,
    {
      city: props.city,
      area_name: props.area_name,
      pin_code: props.pin_code,
      driver_lat: props.driver_lat,
      driver_log: props.driver_log,

      driver_id: id,
    },
    { headers: { admin_token: `${admin_token}` } }
  );
  return response.data;
};

export const getAllworkingArea = async () => {
  const response = await axios.get(
    `${process.env.REACT_APP_BASEURL_0}/delivery_area_list?is_active=1`,

    { headers: { admin_token: `${admin_token}` } }
  );
  return response.data;
};

export const changeUserActivityStatus = async (statusVal, id) => {
  const response = await axios.put(
    `${process.env.REACT_APP_BASEURL_0}/active_deactive_area`,
    {
      id: id,
      user_active_this_area: statusVal,
    },
    { headers: { admin_token: `${admin_token}` } }
  );
  return response.data;
};

export const changeAreaStatus = async (statusVal, id) => {
  const response = await axios.put(
    `${process.env.REACT_APP_BASEURL_0}/active_deactive_area`,
    {
      id: id,
      driver_id: statusVal,
    },
    { headers: { admin_token: `${admin_token}` } }
  );
  return response.data;
};

export const changeWorkingAreaStatus = async (id) => {
  const response = await axios.put(
    `${process.env.REACT_APP_BASEURL_0}/active_deactive_area`,
    {
      id: id,
      is_active: "0",
    },
    { headers: { admin_token: `${admin_token}` } }
  );
  return response.data;
};

export const getAllworkingAreafilter = async (city, area_name, pin_code) => {
  const response = await axios.get(
    `${process.env.REACT_APP_BASEURL_0}/delivery_area_list?is_active=1&city=${city}&area_name=${area_name}&pin_code=${pin_code}`,

    { headers: { admin_token: `${admin_token}` } }
  );
  return response.data;
};

export const devliveryOrderStatus = async (id, statusValue) => {
  const response = await axios.put(
    `${process.env.REACT_APP_BASEURL_0}/change_order_detaile_status`,
    {
      order_id: id,
      order_status: statusValue,
    },
    { headers: { admin_token: `${admin_token}` } }
  );
  return response.data;
};

export const addAdminFunction = async (props) => {
  const response = await axios.post(
    `${process.env.REACT_APP_BASEURL_0}/delivery_add_admin`,
    {
      admin_email: props.admin_email,
      admin_name: props.admin_name,
      admin_phone: props.admin_phone,
      admin_type: props.admin_type,
      admin_password: props.admin_password,
    },
    { headers: { admin_token: `${admin_token}` } }
  );
  return response.data;
};

export const getAdminList = async () => {
  const response = await axios.post(
    `${process.env.REACT_APP_BASEURL_0}/delivery_admin_search`,
    {
      admin_name: "",
      admin_type: "",
    },
    { headers: { admin_token: `${admin_token}` } }
  );
  return response.data;
};

export const UpdateAdminFunction = async (props) => {
  console.log("props data--" + JSON.stringify(props));
  const response = await axios.put(
    `${process.env.REACT_APP_BASEURL_0}/delivery_update_admin`,
    {
      id: props.id,
      admin_email: props.admin_email,
      admin_name: props.admin_name,
      admin_phone: props.admin_phone,
      admin_type: props.admin_type,
      admin_password: props.admin_password,
    },
    { headers: { admin_token: `${admin_token}` } }
  );
  return response.data;
};

export const getAdminfilter = async (name, type) => {
  const response = await axios.post(
    `${process.env.REACT_APP_BASEURL_0}/delivery_admin_search`,
    {
      admin_name: name,
      admin_type: type,
    },
    { headers: { admin_token: `${admin_token}` } }
  );
  return response.data;
};
