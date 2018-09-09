import * as React from "react";
import {ClassType, Component, ComponentState, PureComponent, ReactNode} from "react";

export function withWrappers
<P1, T1 extends Component<P1, ComponentState>,
  P2, T2 extends Component<P2, ComponentState>>(
  wrapComponents: Array<ClassType<P1, T1, any>>) {

  return (Target: React.ComponentType<any>): any => class extends PureComponent {

    public render(): ReactNode {

      let Composition: React.ReactNode = <Target {...this.props}/>;

      for (const WrapComponent of wrapComponents) {
        Composition = <WrapComponent>{Composition}></WrapComponent>;
      }

      return Composition;
    }

  };

}
