import * as React from "react";
import {Component, ReactNode} from "react";

// Lib.
import {Styled} from "@Lib/react_lib/mui";

// Data.

// View.
import {Fade, Grid, WithStyles} from "@material-ui/core";
import {
  IStreamingHeaderBarExternalProps,
  StreamingHeaderBar
} from "@Module/stream/view/components/heading/StreamingHeaderBar";
import {streamCreationPageStyle} from "./StreamCreationPage.Style";

// Props.
export interface IStreamCreationPageState {
  mounted: boolean;
}

export interface IStreamCreationPageExternalProps extends WithStyles<typeof streamCreationPageStyle> {}
export interface IStreamCreationPageOwnProps {}
export interface IStreamCreationPageProps extends IStreamCreationPageOwnProps, IStreamCreationPageExternalProps {}

@Styled(streamCreationPageStyle)
export class StreamCreationPage extends Component<IStreamCreationPageProps, IStreamCreationPageState> {

  public state: IStreamCreationPageState = {
    mounted: true
  };

  public componentDidMount(): void {
    this.setState({ mounted: true });
  }

  public componentWillUnmount(): void {
    this.setState({ mounted: false } );
  }

  public render(): ReactNode {

    const {classes} = this.props;
    const {mounted} = this.state;

    return (
      <Grid className={classes.root} direction={"column"} wrap={"nowrap"} container>

        <StreamingHeaderBar {...{} as IStreamingHeaderBarExternalProps}/>

        <Fade in={mounted}>

          <Grid className={classes.content} direction={"column"} wrap={"nowrap"} container>

            Creation page.

          </Grid>

        </Fade>

      </Grid>
    );
  }

}
