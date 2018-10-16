import {WithStyles} from "@material-ui/core";
import {streamingHelpManagerStyle} from "./StreamingHelpManager.Style";

export interface IStreamingHelpManagerExternalProps extends WithStyles<typeof streamingHelpManagerStyle> {
}

export interface IStreamingHelpManagerOwnProps {
}

export interface IStreamingHelpManagerProps extends IStreamingHelpManagerOwnProps, IStreamingHelpManagerExternalProps {
}
