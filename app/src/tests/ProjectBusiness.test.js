import MockAdapter from "axios-mock-adapter";
import {
  getProjectList,
  createProject,
  removeProject,
  updateProject,
  createTask,
  removeTask,
  completeTask,
  updateTask
} from "../components/project/projectBusiness";
import axios from "axios";
import expect from "expect";
import mockProject from "./mockjson/mockProject";
import mockUser from "./mockjson/mockAuthorization";
import AuthorizaztionStorage from "../components/authorization/authorizationStorage";

const mock = new MockAdapter(axios);

beforeEach(() => {
  AuthorizaztionStorage.setUserInfo(mockUser);
});

describe("Project Business test", () => {
  it("Should getProjectList", () => {
    mock.onGet("/api/v1/project/getProject").reply(200, mockProject);
    getProjectList().then((res) => {
      expect(res).toEqual(mockProject);
    });
  });

  it("Should getProjectList error", () => {
    mock.onGet("/api/v1/project/getProject").reply(400, false);
    getProjectList().catch((err) => {
      expect(err).toBeFalsy();
    });
  });

  it("Should createProject", () => {
    mock.onPost("/api/v1/project/createProject").reply(201, true);
    createProject({ projectName: "teste" }).then((res) => {
      expect(res).toBeTruthy();
    });
  });

  it("Should createProject error", () => {
    mock.onPost("/api/v1/project/createProject").reply(400, false);
    createProject({ projectName: "teste" }).catch((err) => {
      expect(err).toBeFalsy();
    });
  });

  it("Should removeProject", () => {
    mock.onDelete(`/api/v1/project/deleteProject/1`).reply(200, true);
    removeProject(1).then((res) => {
      expect(res).toBeTruthy();
    });
  });

  it("Should removeProject error", () => {
    mock.onDelete(`/api/v1/project/deleteProject/1`).reply(400, false);
    removeProject(1).catch((err) => {
      expect(err).toBeFalsy();
    });
  });

  it("Should updateProject", () => {
    mock.onPatch("/api/v1/project/updateProject").reply(200, true);
    updateProject({ projectName: "teste" }).then((res) => {
      expect(res).toBeTruthy();
    });
  });

  it("Should updateProject error", () => {
    mock.onPatch("/api/v1/project/updateProject").reply(400, false);
    updateProject({ projectName: "teste" }).catch((err) => {
      expect(err).toBeFalsy();
    });
  });

  it("Should createTask", () => {
    mock.onPost("/api/v1/project/createTask").reply(200, true);
    createTask({ taskName: "task", id: 1 }).then((res) => {
      expect(res).toBeTruthy();
    });
  });

  it("Should createTask error", () => {
    mock.onPost("/api/v1/project/createTask").reply(400, false);
    createTask({ taskName: "task", id: 1 }).catch((err) => {
      expect(err).toBeFalsy();
    });
  });

  it("Should removeTask", () => {
    mock.onPatch("/api/v1/project/deleteTask").reply(200, true);
    removeTask({ taskName: "task" }).then((res) => {
      expect(res).toBeTruthy();
    });
  });

  it("Should removeTask error", () => {
    mock.onPatch("/api/v1/project/deleteTask").reply(400, false);
    removeTask({ taskName: "task" }).catch((err) => {
      expect(err).toBeFalsy();
    });
  });

  it("Should completeTask", () => {
    mock.onPatch("/api/v1/project/completeTask").reply(200, true);
    completeTask({ taskName: "task" }).then((res) => {
      expect(res).toBeTruthy();
    });
  });

  it("Should completeTask error", () => {
    mock.onPatch("/api/v1/project/completeTask").reply(400, false);
    completeTask({ taskName: "task" }).catch((err) => {
      expect(err).toBeFalsy();
    });
  });

  it("Should updateTask", () => {
    mock.onPatch("/api/v1/project/updateTask").reply(200, true);
    updateTask({ taskName: "task" }).then((res) => {
      expect(res).toBeTruthy();
    });
  });

  it("Should updateTask error", () => {
    mock.onPatch("/api/v1/project/updateTask").reply(400, false);
    updateTask({ taskName: "task" }).catch((err) => {
      expect(err).toBeFalsy();
    });
  });
});
