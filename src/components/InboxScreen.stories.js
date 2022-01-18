import React from "react";
import { Provider } from "react-redux";
import { configureStore, createSlice } from "@reduxjs/toolkit";

import { PureInboxScreen } from "./InboxScreen";
import * as TaskListStories from "./TaskList.stories";

/**
 * InboxScreen은 PureInboxScreen을 가져오는 것으로 회피 가능하지만,
 * 그 밑에 있는 TaskList.js는 Redux Store에서 값 가져오므로 Redux Store가 없으면 에러 발생한다.
 * 따라서 Redux Store을 Mocking 해 준다.
 */
// Super Simple mock of Redux store!
const Mockstore = configureStore({
  reducer: {
    tasks: createSlice({
      name: "tasks",
      initialState: TaskListStories.Default.args.tasks,
      reducers: {
        updateTaskState: (state, action) => {
          const { id, newTaskState } = action.payload;
          const task = state.findIndex((task) => task.id === id);
          if (task >= 0) {
            state[task].state = newTaskState;
          }
        },
      },
    }).reducer,
  },
});

export default {
  component: PureInboxScreen,
  decorators: [(story) => <Provider store={Mockstore}>{story()}</Provider>],
  title: "PureInboxScreen",
};

const Template = (args) => <PureInboxScreen {...args} />;

export const Default = Template.bind({});

export const Error = Template.bind({});
Error.args = {
  error: "Something",
};
