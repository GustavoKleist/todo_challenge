//REACT
import React from "react";
//LIBS
import { Formik, Field, Form } from "formik";

export const CustomInput = (props) => {
  return (
    <Formik
      initialValues={props.initialValues}
      onSubmit={async (values, {resetForm}) => {
        props.submit(values);
        resetForm({values: ''})
      }}
    >
      <Form className={props.class}>
        <label htmlFor={props.name}>{props.label}</label>
        <Field name={props.name} type="text" placeholder={props.placeholder} />
        <button type="submit">{props.btnLabel}</button>
      </Form>
    </Formik>
  );
};
