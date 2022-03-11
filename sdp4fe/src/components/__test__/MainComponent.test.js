import React from "react";
import { unmountComponentAtNode } from "react-dom";

import Main from "../MainComponent";
import TestRenderer from "react-test-renderer";
import { MockedProvider } from "@apollo/client/testing";
const mocks = [];

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("should render `Main` component", () => {
  const component = TestRenderer.create(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Main />
    </MockedProvider>
  );
  const message = component.toJSON();
  expect(message.children[0]).toContain("Loading...");
});
