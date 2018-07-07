// Libs
import * as React from "react";
import classNames from "classnames";

// Utils
import { buttonCssClasses } from "./constants";

/**
 * Props for THCButton component.
 */
export interface THCButtonProps {
    /**
     * Icon to display
     */
    icon?: string;
    /**
     * Icon library
     * @default material-icons
     */
    iconLib?: string;
    /**
     * Icon position
     * @default before
     */
    iconPosition?: "before" | "after";
    /**
     * Label to display
     */
    label?: string;
    /**
     * Onclick handler
     */
    onClick: () => void;
    /**
     * Type
     * @default button
     */
    type?: string;
    /**
     * If is raised
     * @default false
     */
    raised?: boolean;
    /**
     * If is unelevated
     * @default false
     */
    unelevated?: boolean;
    /**
     * If is outlined
     * @default false
     */
    outlined?: boolean;
    /**
     * If is dense
     * @default false
     */
    dense?: boolean;
    /**
     * If is disabled
     * @default false
     */
    disabled?: boolean;
    /**
     * Class name to add to component
     */
    className?: string;
    /**
     * Theme options
     */
    theme?: {
        button?: string;
        icon?: string;
    };
}

/**
 * Simple implementation for MDCButton.
 */
export class THCButton extends React.Component<THCButtonProps> {
    render() {
        const {
            icon,
            iconLib = "material-icons",
            iconPosition = "before",
            label,
            onClick,
            type = "button",
            raised = false,
            unelevated = false,
            outlined = false,
            dense = false,
            theme = {},
            children,
            className,
            ...otherProps
        } = this.props;

        const buttonClassName = classNames(
            {
                [buttonCssClasses.BUTTON_BASE]: true,
                [buttonCssClasses.BUTTON_RAISED]: raised,
                [buttonCssClasses.BUTTON_UNELEVATED]: unelevated,
                [buttonCssClasses.BUTTON_OUTLINED]: outlined,
                [buttonCssClasses.BUTTON_DENSE]: dense
            },
            theme.button,
            className
        );

        const iconClassName = classNames(
            {
                [iconLib]: true,
                [buttonCssClasses.BUTTON_ICON]: true
            },
            theme.icon
        );

        const iconComp = icon && (
            <i className={iconClassName} aria-hidden="true">
                {icon}
            </i>
        );

        return (
            <button className={buttonClassName} type={type} onClick={onClick} {...otherProps}>
                {iconPosition === "before" && iconComp}
                {!!children ? children : label}
                {iconPosition === "after" && iconComp}
            </button>
        );
    }
}
