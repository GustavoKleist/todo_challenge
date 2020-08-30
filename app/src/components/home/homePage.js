//REACT
import React, { useState, useEffect } from "react";
//REDUX
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
//BUSINESS
import {
  createUser,
  loginUser,
  isAuthenticated,
  getToken
} from "../authorization/authorizationBusiness";
//COMPONENTS
import { Container, Button, Row } from "react-bootstrap";
//ENUM
import * as types from "../authorization/authorizationEnum";
//LIBS
import { Formik, Field, Form } from "formik";

export default function HomePage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isNewUser, setNewUser] = useState(false);

  useEffect(() => {
    function shouldRedirect() {
      if (isAuthenticated()) {
        dispatch({
          type: types.LOGIN,
          payload: getToken()
        });
        history.push("/project");
      }
    }
    shouldRedirect();
  }, [history, dispatch]);

  return (
    <Container className="login_page">
      <Row>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={async (values) => {
            if (isNewUser) {
              createUser(values).then(() => {
                setNewUser(false);
              });
            } else {
              loginUser(values).then((resp) => {
                dispatch({ type: types.LOGIN, payload: resp.data });
                history.push("/project");
              });
            }
          }}
        >
          <Form className="login_form">
            <label htmlFor="email">E-MAIL </label>
            <Field name="email" type="email" placeholder="Enter E-mail" />
            <label htmlFor="password">PASSWORD </label>
            <Field
              name="password"
              type="password"
              placeholder="Enter Password"
            />
            <div className="login_form_submit">
              <Button variant="outline-primary" type="submit">
                {isNewUser ? "CREATE USER" : "LOGIN"}
              </Button>
              <Button
                variant="outline-secondary"
                type="button"
                onClick={() => setNewUser(!isNewUser)}
              >
                {isNewUser ? "BACK" : "NEW USER"}
              </Button>
            </div>
          </Form>
        </Formik>
      </Row>
    </Container>
  );
}
