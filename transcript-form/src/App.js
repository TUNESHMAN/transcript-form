import React from "react";
import "./App.css";
import TopHeader from "./components/TopHeader";
import { Field, Form, Formik } from "formik";
import { Card, CardContent, Box, Button } from "@material-ui/core";
import { TextField } from "formik-material-ui";
import { string, object, date } from "yup";
import axios from "axios";
import StatusModal from "./components/StatusModal";

function App() {
  return (
    <div className="main-container">
      <div className="header-container">
        <TopHeader />
        <p className="application-header">TRANSCRIPT REQUEST FORM</p>
      </div>
      <Card
        style={{
          width: "65%",
          margin: "0 auto",
          marginTop: "20px",
          marginBottom: "50px",
        }}
      >
        <CardContent>
          <Formik
            validationSchema={object({
              matricNo: string().required("Matric Number is compulsory"),
              yearOfGraduation: date().required("When did you graduate?"),
              reasonForRequest: string(),
            })}
            initialValues={{
              matricNo: "",
              yearOfGraduation: "",
              reasonForRequest: "",
            }}
            onSubmit={async (values, tools) => {
              const res = await axios.post(
                "https://redeemers-transcript.herokuapp.com/forms",
                values
              );
              console.log("values", res.data);
              if (res.data.message === "Form created successfully") {
                StatusModal(
                  "Your request for transcript has been received",
                  "We will get back to you",
                  "success"
                );
                tools.resetForm();
              } else {
                StatusModal(
                  "Error submitting form",
                  "Please,try again",
                  "error"
                );
              }
            }}
          >
            <Form autoComplete="off">
              <Box paddingBottom={2}>
                <Field
                  fullWidth
                  name="matricNo"
                  component={TextField}
                  label="Matriculation Number"
                />
              </Box>
              <Box paddingBottom={2}>
                <Field
                  fullWidth
                  name="yearOfGraduation"
                  component={TextField}
                  type="date"
                  // label="Graduation Year"
                />
              </Box>
              <Box paddingBottom={2}>
                <Field
                  fullWidth
                  name="reasonForRequest"
                  component={TextField}
                  label="Why are you requesting for the transcript?"
                />
              </Box>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                // onClick={onsubmit}
              >
                SEND
              </Button>
            </Form>
          </Formik>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
