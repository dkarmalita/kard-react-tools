console.log('test.tsx');
// ref
// * https://levelup.gitconnected.com/usetypescript-a-complete-guide-to-react-hooks-and-typescript-db1858d1fb9c
// * https://www.typescriptlang.org/docs/handbook/react-&-webpack.html
// * https://github.com/typescript-cheatsheets/react-typescript-cheatsheet

import React from 'react';

export interface HelloProps { compiler: string; framework: string; }

// example 1
export const Hello = (props: HelloProps) => <h1>Hello from {props.compiler} and {props.framework}!</h1>;

// example 2
export class Hello2 extends React.Component<HelloProps, {}> {
  public render() {
    return <h1>Hello from {this.props.compiler} and {this.props.framework}!</h1>;
  }
}
