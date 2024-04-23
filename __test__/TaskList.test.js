import React from "react";
import renderer from "react-test-renderer";
import TaskList from "../components/TaskList";

describe("TaskList component", () => {
  const mockTasks = [
    { id: 1, title: "Task 1", description: "Description 1" },
    { id: 2, title: "Task 2", description: "Description 2" },
  ];

  it("renders tasks correctly", () => {
    const tree = renderer
      .create(<TaskList tasks={mockTasks} handleTaskOptionPress={() => {}} />)
      .toJSON();

    mockTasks.forEach((task) => {
      expect(tree).toMatchSnapshot();
    });
  });
});
