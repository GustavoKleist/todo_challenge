//REACT
import React from "react";
import { useHistory } from "react-router-dom";
//BUSINESS
import { revokeToken } from "../authorization/authorizationBusiness";
//REDUX
import { useSelector } from "react-redux";
//COMPONENTS
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  const history = useHistory();
  const userData = useSelector((state) => state.authorization);

  const logOut = () => {
    revokeToken();
    history.push("/");
  };

  return (
    <div className="header_page">
      <h4>Projeto Todo</h4>
      <h4>
        {userData.email}{" "}
        <FontAwesomeIcon className="header_logout" icon={faSignOutAlt} onClick={() => logOut()} />
      </h4>
    </div>
  );
}
