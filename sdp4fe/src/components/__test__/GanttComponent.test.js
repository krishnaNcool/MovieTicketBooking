import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { gql } from "@apollo/client";

import Gantt from "../GanttComponent";
import TestRenderer from "react-test-renderer";
import { MockedProvider } from "@apollo/client/testing";
import * as data from "./data.json";

const SWIMLANES_QUERY = gql`
  query GetSwimlanes {
    swimlanes {
      id
      sdpName
      name
      title
      description
      label
      tasks(where: { activities: { id_NOT: null } }) {
        type: __typename
        id
        name
        longName
        start
        end
        progress
        activities {
          id
          type: __typename
          name
          longName
          task
          start: startDay
          end: endDay
          isCritical
          swimlaneName
          isMilestone
          progress: percentageComplete
        }
      }
    }
  }
`;

const mocks = [
  {
    request: {
      query: SWIMLANES_QUERY
    },
    result: {
      data: {
        swimlanes: data
      }
    }
  }
];

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

it("should render `Gantt` component", () => {
  const component = TestRenderer.create(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Gantt />
    </MockedProvider>
  );

  const message = component.toJSON();
  expect(message).toContain("Loading...");
});
