import React from "react";
import "./App.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import StatusModal from "./components/StatusModal";
import logo from "./images/RunLOGO.png";

function App() {
  const initialValues = {
    matricNo: "",
    yearOfGraduation: "",
    reasonForRequest: "",
    phoneNumber: "",
    email: "",
  };
  const onSubmit = (values, tools) => {
    axios
      .post("http://localhost:5000/forms", values)
      .then((res) => {
        if (res.data.message === "Form created successfully") {
          StatusModal(
            "Your request for transcript has been received",
            "We will get back to you",
            "success"
          );
          tools.resetForm();
        } else {
          StatusModal("Error submitting form", "Please,try again", "error");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const validationSchema = Yup.object().shape({
    matricNo: Yup.string().required("Please enter matric number"),
    yearOfGraduation: Yup.date().required("When did you graduate?"),
    reasonForRequest: Yup.string().required("Why do you need the transcript?"),
    phoneNumber: Yup.number().required("Phone number is required"),
    email: Yup.string().email().required("Please enter a valid email"),
  });

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });
  return (
    <div>
      <div className="login-box">
        <img
          src={logo}
          alt="logo"
          style={{ marginLeft: "120px", height: "80px", marginTop:"20px" }}
        />
        <h2>Transcript Request Form</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="user-box">
            <input
              placeholder="Matric number"
              type="text"
              name="matricNo"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.matricNo}
            />
            {formik.touched.matricNo && formik.errors.matricNo ? (
              <span className="error-message">{formik.errors.matricNo}</span>
            ) : null}
            <label htmlFor="matricNo">Matric Number</label>
          </div>
          <div className="user-box">
            <input
              placeholder="When did you Graduate?"
              type="date"
              name="yearOfGraduation"
              required=""
              id="yearOfGraduation"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.yearOfGraduation}
            />
            <label htmlFor="yearOfGraduation">When did you graduate?</label>
            {formik.touched.yearOfGraduation &&
            formik.errors.yearOfGraduation ? (
              <span className="error-message">
                {formik.errors.yearOfGraduation}
              </span>
            ) : null}
          </div>

          <div className="user-box">
            <input
              placeholder="Why do you need the transcript?"
              type="text"
              name="reasonForRequest"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.reasonForRequest}
            />
            <label htmlFor="reasonForRequest">Reason for request</label>
            {formik.touched.reasonForRequest &&
            formik.errors.reasonForRequest ? (
              <span className="error-message">
                {formik.errors.reasonForRequest}
              </span>
            ) : null}
          </div>
          <div className="user-box">
            <input
              placeholder="Phone number"
              type="text"
              name="phoneNumber"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phoneNumber}
            />
            <label htmlFor="phoneNumber">Phone Number</label>
            {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
              <span className="error-message">{formik.errors.phoneNumber}</span>
            ) : null}
          </div>
          <div className="user-box">
            <input
              placeholder="Your email"
              type="email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            <label htmlFor="email">Email</label>
            {formik.touched.email && formik.errors.email ? (
              <span className="error-message">{formik.errors.email}</span>
            ) : null}
          </div>
          <button type="submit" onClick={formik.handleSubmit}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
