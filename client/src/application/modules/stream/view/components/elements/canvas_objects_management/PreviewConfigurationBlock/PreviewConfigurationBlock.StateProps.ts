import {WithStyles} from "@material-ui/core";
import {previewConfigurationBlockStyle} from "./PreviewConfigurationBlock.Style";

export interface IPreviewConfigurationBlockExternalProps extends WithStyles<typeof previewConfigurationBlockStyle> {
}

export interface IPreviewConfigurationBlockOwnProps {
  showGrid: boolean;
  showPreview: boolean;
  onPreviewToggle: (show: boolean) => void;
  onGridToggle: (show: boolean) => void;
}

export interface IPreviewConfigurationBlockProps extends IPreviewConfigurationBlockOwnProps, IPreviewConfigurationBlockExternalProps {
}
