import * as React from "react";
import {ClassType, Component, ComponentState, PureComponent, ReactNode} from "react";

export function withWrapper
    <P1, T1 extends Component<P1, ComponentState>,
      P2, T2 extends Component<P2, ComponentState>>(
        WrapComponent: ClassType<P1, T1, any>) {

  return (Target: ClassType<P2, T2, any>): any => class extends PureComponent {

    public render(): ReactNode {
      return (
        <WrapComponent>
          <Target {...this.props}/>
        </WrapComponent>
      );
    }

  };

}
