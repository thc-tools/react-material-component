// Libs
import React, { Component } from "react";
import classNames from "classnames";

// Utils
import { iconCssClasses } from "./constants";

/**
 * Props for THCIconButton component.
 */
export interface THCIconButtonProps {
    /**
     * Icon to display
     */
    icon: string;
    /**
     * Icon library
     * @default material-icons
     */
    iconLib?: string;
    /**
     * Label
     */
    label: string;
    /**
     * Onclick handler
     */
    onClick: () => void;
    /**
     * If is disabled
     * @default false
     */
    disabled?: boolean;
    /**
     * Theme options
     */
    theme?: { button?: string };
}

/**
 * Simple implementation for MDCIconButton.
 */
export class THCIconButton extends Component<THCIconButtonProps> {
    render() {
        const { icon, iconLib = "material-icons", label, onClick, theme = {}, ...otherProps } = this.props;

        const className = classNames({
            [iconCssClasses.ICON_BASE]: true,
            [iconLib]: true,
            [theme.button as any]: theme.button != undefined
        });

        return (
            <button className={className} onClick={onClick} aria-label={label} {...otherProps}>
                {icon}
            </button>
        );
    }
}
