import React from "react";
import renderer from "react-test-renderer";
import TaskInputModal from "../modals/TaskInputModal";

describe("TaskInputModal", () => {
  it("renders correctly when visible", () => {
    const mockOnClose = jest.fn();
    const mockOnAddTask = jest.fn();

    const tree = renderer
      .create(
        <TaskInputModal
          visible={true}
          onClose={mockOnClose}
          onAddTask={mockOnAddTask}
        />
      )
      .toJSON();

    // Ensure the modal elements are rendered
    expect(tree).toMatchSnapshot();

    // Simulate adding a task
    const instance = renderer.create(
      <TaskInputModal
        visible={true}
        onClose={mockOnClose}
        onAddTask={mockOnAddTask}
      />
    ).root;

    const textInput = instance.findByProps({ placeholder: "Enter task title" });
    textInput.props.onChangeText("Test Task");

    const button = instance.findByProps({ title: "Add Task" });
    button.props.onPress();

    // Ensure the onAddTask callback is called with the correct parameters
    expect(mockOnAddTask).toHaveBeenCalledWith({
      title: "Test Task",
      description: "",
    });

    // Ensure the onClose callback is called when the close button is pressed
    const closeButton = instance.findByProps({ name: "times" });
    closeButton.props.onPress();
    expect(mockOnClose).toHaveBeenCalled();
  });
});
