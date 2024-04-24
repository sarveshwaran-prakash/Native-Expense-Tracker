// import React from "react";
// import renderer from "react-test-renderer";
// import TaskList from "../components/TaskList";

// describe("TaskList component", () => {
//   const mockTasks = [
//     { id: 1, title: "Task 1", description: "Description 1" },
//     { id: 2, title: "Task 2", description: "Description 2" },
//   ];

//   it("renders tasks correctly", () => {
//     const tree = renderer
//       .create(<TaskList tasks={mockTasks} handleTaskOptionPress={() => {}} />)
//       .toJSON();

//     mockTasks.forEach((task) => {
//       expect(tree).toMatchSnapshot();
//     });
//   });
// });

import React from "react";
import { render } from "@testing-library/react-native";
import TaskList from "../components/TaskList";

// Mock data
const mockTasks = [
  { id: 1, title: "Task 1", description: "Description 1" },
  { id: 2, title: "Task 2", description: "Description 2" },
  { id: 3, title: "Task 3", description: "Description 3" },
  { id: 4, title: "Task 4", description: "Description 4" },
  { id: 5, title: "Task 5", description: "Description 5" },
];

// Mock the Dimensions and StyleSheet modules
jest.mock("react-native/Libraries/Utilities/Dimensions", () => {
  const mockDimensions = { width: 500 }; // Adjust width as needed
  console.log("Mocked Dimensions:", mockDimensions); // Log the mocked dimensions
  return {
    get: jest.fn().mockReturnValue({ width: mockDimensions.width }),
  };
});

jest.mock("react-native/Libraries/StyleSheet/StyleSheet", () => ({
  create: jest.fn(),
}));

describe("TaskList component", () => {
  it("renders correctly with ScrollView", () => {
    const { getByText } = render(
      <TaskList tasks={mockTasks} handleTaskOptionPress={() => {}} />
    );

    mockTasks.forEach((task) => {
      expect(getByText(task.title)).toBeTruthy();
      if (task.description) {
        expect(getByText(task.description)).toBeTruthy();
      }
    });
  });
});
