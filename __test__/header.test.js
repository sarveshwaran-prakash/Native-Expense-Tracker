import React from "react";
import { render } from "react-native-testing-library";
import Header from "../components/Header";

describe("Header component", () => {
  test("renders with correct title", () => {
    const title = "My Todo App";
    const { getByText } = render(<Header title={title} />);
    const titleElement = getByText(title);
    expect(titleElement).toBeDefined();
  });

  //   test("has correct styles", () => {
  //     const title = "My Todo App";
  //     const { getByTestId } = render(<Header title={title} />);
  //     const headerContainer = getByTestId("header-container");
  //     expect(headerContainer).toHaveStyle({
  //       //   marginTop: 40,
  //       //   backgroundColor: "grey",
  //     });
  //   });
});
