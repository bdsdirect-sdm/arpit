// import { Field, Form, Formik } from "formik";
// import React, { useState } from "react";
// import axios from "axios";
// import * as Yup from "yup";
// import { useNavigate } from "react-router-dom";

// // Validation schema for the signup form
// const validationSchema = Yup.object().shape({
//   name: Yup.string().required("Name is required"),
//   phone: Yup.string()
//     .required("Phone is required")
//     .matches(/^\d{10}$/, "Phone number must be exactly 10 digits"),
//   address: Yup.string().required("Address is required"),
//   email: Yup.string().email("Invalid email").required("Email is required"),
//   password: Yup.string().required("Password is required"),
//   confirmPassword: Yup.string() .required("Confirm Password is required"),
//   usertype: Yup.string().required("User type is required"),
//   image: Yup.mixed()
//     .required("Profile image is required")
//     .test("fileSize", "File too large", (value: any) => {
//       return !value || value.size <= 5 * 1024 * 1024; // 5MB
//     })
//     .test("fileType", "Only .png and .jpeg files are allowed", (value: any) => {
//       return value && ["image/png", "image/jpeg"].includes(value.type);
//     }),
//     // companyname: Yup.string().when("usertype", {
//     //     is: "retailer",
//     //     then: Yup.string().required("Company Name is required"),
//     //     otherwise: Yup.string().notRequired()
//     // }),
//     companyname: Yup.string().required("Company Name is required"),
// });

// const Signup = () => {
//   const navigate = useNavigate();

// //   const handleSignup = async (formdata: any) => {
// //     try {
// //       const response = await axios.post("http://localhost:4000/users", formdata, {
// //         headers: {
// //           "Content-Type": "multipart/form-data",
// //         },
// //       });
// //       alert("User created successfully");
// //       navigate("/login");
// //     } catch (error) {
// //       console.error("Error submitting form:", error);
// //     }
// //   };

//   return (
//     <div className="container mt-5">
//       <h2 className="text-center">Signup</h2>
//       <Formik
//         initialValues={{
//           name: "",
//           phone: "",
//           address: "",
//           email: "",
//           password: "",
//           confirmPassword: "",
//           usertype: "",
//           image: null,
//           companyname: "",
//         }}
//         validationSchema={validationSchema}
//         onSubmit={(values: any) => {
//           const formdata: any = new FormData();
//           formdata.append("name", values.name);
//           formdata.append("phone", values.phone);
//           formdata.append("address", values.address);
//           formdata.append("email", values.email);
//           formdata.append("password", values.password);
//           formdata.append("usertype", values.usertype);
//           if (values.image) {
//             formdata.append("image", values.image);
//           }
//           if (values.usertype === "retailer" && values.companyname) {
//             formdata.append("companyname", values.companyname);
//           }

//         //   handleSignup(formdata);
//         }}
//       >
//         {({ setFieldValue, values }) => (
//           <Form>
//             <div className="mb-3">
//               <label className="form-label">Name:</label>
//               <Field className="form-control" name="name" />
//             </div>

//             <div className="mb-3">
//               <label className="form-label">Phone:</label>
//               <Field className="form-control" name="phone" />
//             </div>

//             <div className="mb-3">
//               <label className="form-label">Address:</label>
//               <Field className="form-control" name="address" />
//             </div>

//             <div className="mb-3">
//               <label className="form-label">Email:</label>
//               <Field className="form-control" name="email" />
//             </div>

//             <div className="mb-3">
//               <label className="form-label">Password:</label>
//               <Field type="password" className="form-control" name="password" />
//             </div>

//             <div className="mb-3">
//               <label className="form-label">Confirm Password:</label>
//               <Field type="password" className="form-control" name="confirmPassword" />
//             </div>

//             <div className="mb-3">
//               <label className="form-label">User Type:</label>
//               <Field as="select" name="usertype" className="form-select">
//                 <option value="" label="Select user type" />
//                 <option value="customer">Customer</option>
//                 <option value="retailer">Retailer</option>
//               </Field>
//             </div>

//             {values.usertype === 'retailer' && (
//               <div className="mb-3">
//                 <label className="form-label">Company Name:</label>
//                 <Field className="form-control" name="companyname" />
//               </div>
//             )}

//             <div className="mb-3">
//               <label className="form-label">Profile Image:</label>
//               <input
//                 type="file"
//                 name="image"
//                 className="form-control"
//                 onChange={(event) => {
//                   setFieldValue('image', event.currentTarget.files ? event.currentTarget.files[0] : null);
//                 }}
//               />
//             </div>

//             <button type="submit" className="btn btn-primary">
//               Register
//             </button>
//           </Form>
//         )}
//       </Formik>
//     </div>
//   );
// };

// export default Signup;


















import { Field, Form, Formik, ErrorMessage } from "formik";
import React from "react";
import axios from "axios";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

// Validation schema for the signup form
const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  phone: Yup.string()
    .required("Phone is required")
    .matches(/^\d{10}$/, "Phone number must be exactly 10 digits"),
  address: Yup.string().required("Address is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
  confirmPassword: Yup.string().required("Confirm Password is required"),
  usertype: Yup.string().required("User type is required"),
  image: Yup.mixed()
    .required("Profile image is required")
    .test("fileSize", "File too large", (value: any) => {
      return !value || value.size <= 5 * 1024 * 1024; // 5MB
    })
    .test("fileType", "Only .png and .jpeg files are allowed", (value: any) => {
      return value && ["image/png", "image/jpeg"].includes(value.type);
    }),
  companyname: Yup.string().required("Company Name is required"),
});

const Signup = () => {
  const navigate = useNavigate();

  const handleSignup = async (formdata: any) => {
    try {
      await axios.post("http://localhost:4000/users", formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("User created successfully");
      navigate("/login");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h2 className="text-center text-primary">Create an Account</h2>
              <p className="text-center">Join us and start your journey!</p>
              <Formik
                initialValues={{
                  name: "",
                  phone: "",
                  address: "",
                  email: "",
                  password: "",
                  confirmPassword: "",
                  usertype: "",
                  image: null,
                  companyname: "",
                }}
                validationSchema={validationSchema}
                onSubmit={(values: any) => {
                  const formdata: any = new FormData();
                  formdata.append("name", values.name);
                  formdata.append("phone", values.phone);
                  formdata.append("address", values.address);
                  formdata.append("email", values.email);
                  formdata.append("password", values.password);
                  formdata.append("usertype", values.usertype);
                  if (values.image) {
                    formdata.append("image", values.image);
                  }
                  if (values.usertype === "retailer" && values.companyname) {
                    formdata.append("companyname", values.companyname);
                  }

                  handleSignup(formdata);
                }}
              >
                {({ setFieldValue, values }) => (
                  <Form>
                    <div className="mb-3">
                      <label className="form-label">Name:</label>
                      <Field className="form-control" name="name" />
                      <ErrorMessage name="name" component="div" className="text-danger" />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Phone:</label>
                      <Field className="form-control" name="phone" />
                      <ErrorMessage name="phone" component="div" className="text-danger" />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Address:</label>
                      <Field className="form-control" name="address" />
                      <ErrorMessage name="address" component="div" className="text-danger" />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Email:</label>
                      <Field className="form-control" name="email" />
                      <ErrorMessage name="email" component="div" className="text-danger" />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Password:</label>
                      <Field type="password" className="form-control" name="password" />
                      <ErrorMessage name="password" component="div" className="text-danger" />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Confirm Password:</label>
                      <Field type="password" className="form-control" name="confirmPassword" />
                      <ErrorMessage name="confirmPassword" component="div" className="text-danger" />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">User Type:</label>
                      <Field as="select" name="usertype" className="form-select">
                        <option value="" label="Select user type" />
                        <option value="customer">Customer</option>
                        <option value="retailer">Retailer</option>
                      </Field>
                      <ErrorMessage name="usertype" component="div" className="text-danger" />
                    </div>

                    {values.usertype === 'retailer' && (
                      <div className="mb-3">
                        <label className="form-label">Company Name:</label>
                        <Field className="form-control" name="companyname" />
                        <ErrorMessage name="companyname" component="div" className="text-danger" />
                      </div>
                    )}

                    <div className="mb-3">
                      <label className="form-label">Profile Image:</label>
                      <input
                        type="file"
                        name="image"
                        className="form-control"
                        onChange={(event) => {
                          setFieldValue('image', event.currentTarget.files ? event.currentTarget.files[0] : null);
                        }}
                      />
                      <ErrorMessage name="image" component="div" className="text-danger" />
                    </div>

                    <button type="submit" className="btn btn-primary w-100">
                      Register
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;

