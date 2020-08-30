import api from "../services/api";
import Swal from "sweetalert2";

export const getProjectList = () => {
  return new Promise((resolve, reject) => {
    api
      .get("project/getProject")
      .then((resp) => {
        resolve(resp);
      })
      .catch((err) => reject(err));
  });
};

export const createProject = (projectName) => {
  return new Promise((resolve, reject) => {
    api
      .post("project/createProject", projectName)
      .then((resp) => {
        Swal.fire("Success!", "Project created", "success");
        resolve(resp);
      })
      .catch((err) => {
        Swal.fire("Ops!", "Something went wrong.", "error");
        reject(err);
      });
  });
};

export const removeProject = (id) => {
  return new Promise((resolve, reject) => {
    api
      .delete(`project/deleteProject/${id}`)
      .then((resp) => {
        Swal.fire("Success!", "Project deleted", "success");
        resolve(resp);
      })
      .catch((err) => {
        Swal.fire("Ops!", "Something went wrong.", "error");
        reject(err);
      });
  });
};

export const updateProject = (values) => {
  return new Promise((resolve, reject) => {
    api
      .patch("project/updateProject", values)
      .then((resp) => {
        Swal.fire("Success!", "Project updated", "success");
        resolve(resp);
      })
      .catch((err) => {
        Swal.fire("Ops!", "Something went wrong.", "error");
        reject(err);
      });
  });
};

export const createTask = (values) => {
  return new Promise((resolve, reject) => {
    api
      .post("project/createTask", values)
      .then((resp) => {
        Swal.fire("Success!", "Task created", "success");
        resolve(resp);
      })
      .catch((err) => {
        Swal.fire("Ops!", "Something went wrong.", "error");
        reject(err);
      });
  });
};

export const removeTask = (task) => {
  return new Promise((resolve, reject) => {
    api
      .patch("project/deleteTask", task)
      .then((resp) => {
        Swal.fire("Success!", "Task deleted", "success");
        resolve(resp);
      })
      .catch((err) => {
        Swal.fire("Ops!", "Something went wrong.", "error");
        reject(err);
      });
  });
};

export const completeTask = (task) => {
  return new Promise((resolve, reject) => {
    api
      .patch("project/completeTask", task)
      .then((resp) => {
        Swal.fire("Success!", "Task Completed", "success");
        resolve(resp);
      })
      .catch((err) => {
        Swal.fire("Ops!", "Something went wrong.", "error");
        reject(err);
      });
  });
};

export const updateTask = (task) => {
  return new Promise((resolve, reject) => {
    api
      .patch("project/updateTask", task)
      .then((resp) => {
        Swal.fire("Success!", "Task updated", "success");
        resolve(resp);
      })
      .catch((err) => {
        Swal.fire("Ops!", "Something went wrong.", "error");
        reject(err);
      });
  });
};
