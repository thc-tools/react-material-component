// Libs
import React, { Component } from "react";
import classNames from "classnames";

// Utils
import { buttonCssClasses } from "./constants";

/** Props for THCButton component. */
export interface THCButtonProps {
    /** Icon to display */
    icon?: string;
    /** Icon library, default to : "material-icons" */
    iconLib?: string;
    /** Icon position, default to : "before" */
    iconPosition?: "before" | "after";
    /** Label */
    label: string;
    /** Onclick handler */
    onClick: () => void;
    /** If is raised, default to "false" */
    raised?: boolean;
    /** If is unelevated, default to "false" */
    unelevated?: boolean;
    /** If is outlined, default to "false" */
    outlined?: boolean;
    /** If is dense, default to "false" */
    dense?: boolean;
    /** If is disabled, default to "false" */
    disabled?: boolean;
    /** Theme options */
    theme?: {
        button?: string;
        icon?: string;
    };
}

/** Simple implementation for MDCButton. */
export class THCButton extends Component<THCButtonProps> {
    render() {
        const {
            icon,
            iconLib = "material-icons",
            iconPosition = "before",
            label,
            onClick,
            raised = false,
            unelevated = false,
            outlined = false,
            dense = false,
            theme = {},
            ...otherProps
        } = this.props;

        const buttonClassName = classNames({
            [buttonCssClasses.BUTTON_BASE]: true,
            [buttonCssClasses.BUTTON_RAISED]: raised,
            [buttonCssClasses.BUTTON_UNELEVATED]: unelevated,
            [buttonCssClasses.BUTTON_OUTLINED]: outlined,
            [buttonCssClasses.BUTTON_DENSE]: dense,
            [theme.button]: theme.button !== undefined
        });

        const iconClassName = classNames({
            [iconLib]: true,
            [buttonCssClasses.BUTTON_ICON]: true,
            [theme.icon]: theme.icon !== undefined
        });

        const iconComp = (
            <i className={iconClassName} aria-hidden="true">
                {icon}
            </i>
        );

        return (
            <button className={buttonClassName} {...otherProps} onClick={onClick}>
                {icon && iconPosition === "before" && iconComp}
                {label}
                {icon && iconPosition === "after" && iconComp}
            </button>
        );
    }
}
