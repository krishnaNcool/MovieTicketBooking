import App from "./App";
import TestRenderer from "react-test-renderer";
import { MockedProvider } from "@apollo/client/testing";

const mocks = [];
it("should render `App` component", () => {
  const component = TestRenderer.create(
    <MockedProvider mocks={mocks} addTypename={false}>
      <App />
    </MockedProvider>
  );

  const container = component.toJSON();
  expect(container.children.length).toEqual(1);
});
