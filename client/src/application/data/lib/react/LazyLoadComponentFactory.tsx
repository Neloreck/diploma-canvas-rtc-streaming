import * as React from "react";
import {Component, ComponentType} from "react";

import {log} from "@App/data/utils";
import CircularProgress from "@material-ui/core/es/CircularProgress/CircularProgress";

interface ILazyComponentState {
  component: ComponentType;
}

export class LazyLoadComponentFactory {

  public getComponent(importFunc: () => Promise<any>, componentNamedExport?: string): ComponentType {

    // tslint:disable-next-line
    class LazyComponent extends Component<any, ILazyComponentState> {

      private static COMPONENT_INSTANCE: ComponentType;

      public state: ILazyComponentState = {component: LazyComponent.COMPONENT_INSTANCE};
      private mounted: boolean = false;

      public async componentWillMount(): Promise<void> {

        const RenderComponent: ComponentType = this.state.component;

        if (!RenderComponent) {
          const module: any = await importFunc();
          const ImportedRenderComponent: ComponentType = module[componentNamedExport || Object.keys(module)[0]];

          log.info(`[INITIAL] Loading component and caching: '${componentNamedExport ||
            Object.keys(module)[0]}'.`);

          LazyComponent.COMPONENT_INSTANCE = ImportedRenderComponent;

          if (this.mounted) {
            this.setState({component: ImportedRenderComponent});
          }
        }
      }

      public componentDidMount(): void {
        this.mounted = true;

        if (!this.state.component) {
          this.setState({component: LazyComponent.COMPONENT_INSTANCE});
        }
      }

      public componentWillUnmount(): void {
        this.mounted = false;
      }

      public render(): JSX.Element {
        const RenderItem: ComponentType = this.state.component;
        return RenderItem
          ? <RenderItem {...this.props}/>
          : <div id={"lazy-load-spinner"}> <CircularProgress size={250} /> </div>;
      }

    }

    return LazyComponent;
  }

}
