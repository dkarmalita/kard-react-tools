import React, { Component, useState, useEffect } from "react";

// = component interface (pros declaration)
export interface HelloProps { compiler: string; framework: string; }

// = function component
export const Hello = (props: HelloProps) => <h1>Hello from {props.compiler} and {props.framework}!</h1>;

// = Class Component
// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
export class HelloX extends Component <HelloProps, {}> {
    render() {
        return <h1>Hello from {this.props.compiler} and {this.props.framework}!</h1>;
    }
}

// = State Hook
function Example(props: HelloProps) {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}

export default Example
