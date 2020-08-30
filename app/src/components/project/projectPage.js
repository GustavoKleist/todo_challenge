//REACT
import React, { useEffect } from "react";
//REDUX
import { useDispatch, useSelector } from "react-redux";
//BUSINESS
import {
  isAuthenticated,
  getToken
} from "../authorization/authorizationBusiness";
import {
  getProjectList,
  removeProject,
  createProject,
  updateProject,
  createTask
} from "./projectBusiness";
//COMPONENTS
import Header from "../header/header";
import TaskComponent from "./taskComponent";
import { Card, CardColumns } from "react-bootstrap";
import { CustomInput } from "../commons/customInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
//ENUM
import * as types from "../authorization/authorizationEnum";
import * as projectTypes from "./projectEnum";
//LIBS
import Swal from "sweetalert2";

export default function ProjectPage() {
  const dispatch = useDispatch();
  const projectData = useSelector((state) => state.project.projects);

  const getProjects = async () => {
    const result = await getProjectList();
    dispatch({ type: projectTypes.GET_PROJECTS, payload: result.data });
  };

  const deleteProject = async (id) => {
    await removeProject(id);
    getProjects();
  };

  const newProject = async (name) => {
    await createProject(name);
    getProjects();
  };

  const renewProject = (id, prevName) => {
    Swal.fire({
      title: "Update project name",
      input: "text",
      showCancelButton: true,
      confirmButtonText: "Update",
      showLoaderOnConfirm: true,
      preConfirm: async (name) => {
        if (name.length > 1 && name !== prevName) {
          await updateProject({ projectId: id, newProjectName: name });
          getProjects();
        } else {
          Swal.fire("Ops!", "something went wrong.", "error");
        }
      },
      allowOutsideClick: () => !Swal.isLoading()
    });
  };

  const newTask = async (values) => {
    await createTask(values);
    getProjects();
  };

  useEffect(() => {
    function persist() {
      if (isAuthenticated()) {
        dispatch({
          type: types.LOGIN,
          payload: getToken()
        });
      }
    }
    persist();
    getProjects();
  }, []);

  return (
    <>
      <Header />
      <CardColumns className="project_page">
        <Card className="project_submit">
          <Card.Body>
            <CustomInput
              label={"Create a Project"}
              class={"project_form"}
              initialValues={{ projectName: "" }}
              name={"projectName"}
              placeholder={"Project Name"}
              btnLabel={"Create Project"}
              submit={(param) => newProject(param)}
            />
          </Card.Body>
        </Card>
        {projectData.length === 0 ? (
          <div className="project_empty">
            <p>wow so empty, create a project to change it!</p>
          </div>
        ) : (
          <>
            {projectData.map((e) => (
              <Card className="project_card" key={e._id}>
                <Card.Header className="projetc_card_header">
                  <span>{e.projectName}</span>
                  <div>
                    <FontAwesomeIcon
                      className="project_icon"
                      icon={faPencilAlt}
                      onClick={() => renewProject(e._id, e.projectName)}
                    />
                    <FontAwesomeIcon
                      className="project_icon"
                      icon={faTrashAlt}
                      onClick={() => deleteProject(e._id)}
                    />
                  </div>
                </Card.Header>
                <Card.Body className="project_card_body">
                  {e.taskList.length === 0 ? (
                    <p>NO TASK AVAILABLE</p>
                  ) : (
                    <>
                      <span className="project_card_title">TODO</span>
                      <TaskComponent
                        tasks={e.taskList.filter((filter) => !filter.completed)}
                        projectId={e._id}
                        update={() => getProjects()}
                      />
                      <span className="project_card_title">DONE</span>
                      <TaskComponent
                        tasks={e.taskList.filter((filter) => filter.completed)}
                        projectId={e._id}
                        update={() => getProjects()}
                      />
                    </>
                  )}
                </Card.Body>
                <Card.Footer className="projetc_card_header">
                  <CustomInput
                    class={"project_form"}
                    initialValues={{ taskName: "", id: e._id }}
                    name={"taskName"}
                    placeholder={"Insert Task Name"}
                    btnLabel={"ADD"}
                    submit={(param) => newTask(param)}
                  />
                </Card.Footer>
              </Card>
            ))}
          </>
        )}
      </CardColumns>
    </>
  );
}
