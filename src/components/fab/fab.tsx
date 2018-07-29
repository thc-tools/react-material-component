// Libs
import * as React from "react";
import classNames from "classnames";

// Utils
import { fabCssClasses } from "./constants";
import { filterProps } from "../../utils/attributes";

/**
 * Props for THCFab component.
 */
export interface THCFabProps {
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
     * If is mini
     * @default false
     */
    mini?: boolean;
    /**
     * If is exited
     * @default false
     */
    exited?: boolean;
    /**
     * Class name to add to component
     */
    className?: string;
    /**
     * Theme options
     */
    theme?: {
        fab?: string;
        icon?: string;
    };
}

/**
 * Simple implementation for MDCFab.
 */
export class THCFab extends React.Component<THCFabProps> {
    render() {
        const {
            icon,
            iconLib = "material-icons",
            label,
            children,
            onClick,
            mini = false,
            exited = false,
            className,
            theme = {},
            ...otherProps
        } = this.props;

        const fabClassName = classNames(
            {
                [fabCssClasses.FAB_BASE]: true,
                [fabCssClasses.FAB_MINI]: mini,
                [fabCssClasses.FAB_EXITED]: exited
            },
            theme.fab,
            className
        );

        const iconClassName = classNames(
            {
                [fabCssClasses.FAB_ICON]: true,
                [iconLib]: true,
                [theme.icon as any]: theme.icon !== undefined
            },
            theme.icon
        );

        if (label) {
            (otherProps as any)["aria-label"] = label;
        }

        return (
            <button className={fabClassName} onClick={onClick} {...filterProps(otherProps)}>
                <span className={iconClassName}>{!!children ? children : icon}</span>
            </button>
        );
    }
}
