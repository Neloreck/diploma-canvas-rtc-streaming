import * as React from "react";
import {Component, ComponentType} from "react";

import {CircularProgress, Grid} from "@material-ui/core";

interface ILazyComponentState {
  component: ComponentType;
}

export class LazyLoadComponentFactory {

  public getComponent(importFunc: () => Promise<any>, componentNamedExport?: string) {

    // tslint:disable-next-line
    class LazyComponent extends Component<any, ILazyComponentState, any> {

      private static COMPONENT_INSTANCE: ComponentType;

      public state: ILazyComponentState = {component: LazyComponent.COMPONENT_INSTANCE};
      private mounted: boolean = false;

      public async componentWillMount(): Promise<void> {

        const RenderComponent: ComponentType = this.state.component;

        if (!RenderComponent) {
          const module: any = await importFunc();
          const ImportedRenderComponent: ComponentType = module[componentNamedExport || Object.keys(module)[0]];

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
          : <Grid id={"lazy-load-spinner"} alignContent={"center"} justify={"center"} container>
            <CircularProgress size={250} />
          </Grid>;
      }

    }

    return LazyComponent;
  }

}
