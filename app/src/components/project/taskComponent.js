//REACT
import React from "react";
//BUSINESS
import { removeTask, completeTask, updateTask } from "./projectBusiness";
//COMPONENTS
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
//LIBS
import moment from "moment";
import Swal from "sweetalert2";

export default function TaskComponent(props) {
  const deleteTask = async (task) => {
    await removeTask({ id: props.projectId, task: task });
    props.update();
  };

  const renewTask = async (taskName) => {
    Swal.fire({
      title: "Update task name",
      input: "text",
      showCancelButton: true,
      confirmButtonText: "Update",
      showLoaderOnConfirm: true,
      preConfirm: async (name) => {
        if (name.length > 1 && name !== taskName) {
          await updateTask({ newTaskName: name, taskName: taskName });
          props.update();
        } else {
          Swal.fire("Ops!", "something went wrong.", "error");
        }
      },
      allowOutsideClick: () => !Swal.isLoading()
    });
  };

  const doneTask = async (task) => {
    await completeTask({ task: task });
    props.update();
  };

  return (
    <>
      {props.tasks.map((e) => (
        <OverlayTrigger
          key={e._id}
          placement={"top"}
          overlay={
            e.doneTime ? (
              <Tooltip>
                Finished in{" "}
                {moment(new Date(e.doneTime)).format("YYYY-MM-DD HH:mm:ss")}
              </Tooltip>
            ) : (
              <p></p>
            )
          }
        >
          <div className="task_item">
            <input
              type="checkbox"
              disabled={e.completed === true}
              checked={e.completed}
              onChange={() => doneTask(e.taskName)}
            />
            <span className={e.doneTime ? "task_done" : "task_todo"}>
              {e.taskName}
            </span>
            {e.completed === false && (
              <>
                <FontAwesomeIcon
                  className="project_icon"
                  icon={faPencilAlt}
                  onClick={() => renewTask(e.taskName)}
                />
                <FontAwesomeIcon
                  className="project_icon"
                  icon={faTrashAlt}
                  onClick={() => deleteTask(e.taskName)}
                />
              </>
            )}
          </div>
        </OverlayTrigger>
      ))}
    </>
  );
}
