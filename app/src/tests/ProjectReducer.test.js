import { Reducer } from "redux-testkit";
import * as types from "../components/project/projectEnum";
import projectReducer from "../components/project/projectReducer";
import initialState from "./initialState";
import expect from "expect";
import mockProject from "./mockjson/mockProject";

describe("Project Reducer Test", () => {
  it("Shoud have initial state", () => {
    expect(projectReducer(initialState.project, [])).toEqual(
      initialState.project
    );
  });

  it("Should have project data filed in state", () => {
    const valueFromAction = {
      projects: [
        {
          _id: "5f4c113183ff651f2c8f4f50",
          ownerId: "5f49cdac49f98c04f4d8fa23",
          projectName: "PROJ",
          taskList: [
            {
              _id: "5f4c178e83ff651f2c8f4f64",
              completed: false,
              creationDate: "2020-08-30T21:18:06.631Z",
              taskName: "New task"
            },
            {
              _id: "5f4c179383ff651f2c8f4f65",
              completed: true,
              creationDate: "2020-08-30T21:18:11.504Z",
              doneTime: "2020-08-30T21:18:13.911Z",
              taskName: "Done Task"
            }
          ]
        }
      ]
    };

    const action = { type: types.GET_PROJECTS, payload: mockProject };
    Reducer(projectReducer)
      .withState(initialState.project)
      .expect(action)
      .toReturnState(valueFromAction);
  });
});
