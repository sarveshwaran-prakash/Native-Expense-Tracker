import React from "react";
import App from "../App";
import renderer from "react-test-renderer";
import Header from "../components/Header";
import TaskModal from "../modals/TaskModal";
import TaskList from "../components/ExpenseList";

test("State Provider snapshot", () => {
  const snap = renderer.create(<TaskList />).toJSON();
  expect(snap).toMatchSnapshot();
});
