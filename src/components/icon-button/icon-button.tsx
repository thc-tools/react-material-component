// Libs
import * as React from "react";
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
    icon?: string;
    /**
     * Icon library
     * @default material-icons
     */
    iconLib?: string;
    /**
     * Label
     */
    label?: string;
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
     * Class name to add to component
     */
    className?: string;
    /**
     * Theme options
     */
    theme?: { button?: string };
}

/**
 * Simple implementation for MDCIconButton.
 */
export class THCIconButton extends React.Component<THCIconButtonProps> {
    render() {
        const {
            icon,
            iconLib = "material-icons",
            label,
            children,
            onClick,
            className,
            theme = {},
            ...otherProps
        } = this.props;

        const iconButtonClassName = classNames(
            {
                [iconCssClasses.ICON_BUTTON_BASE]: true,
                [iconLib]: true
            },
            className,
            theme.button
        );

        if (label) {
            (otherProps as any)["aria-label"] = label;
        }

        return (
            <button className={iconButtonClassName} onClick={onClick} {...otherProps}>
                {!!children ? children : icon}
            </button>
        );
    }
}
