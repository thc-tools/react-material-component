// Libs
import React, { Component } from "react";
import classNames from "classnames";

// Utils
import { fabCssClasses } from "./constants";

/** Props for THCFab component. */
export interface THCFabProps {
    /** Icon to display */
    icon: string;
    /** Icon library, default to : "material-icons" */
    iconLib?: string;
    /** Label */
    label: string;
    /** Onclick handler */
    onClick: () => void;
    /** If is mini, default to "false" */
    mini?: boolean;
    /** If is exited, default to "false" */
    exited?: boolean;
    /** Theme options */
    theme?: {
        fab?: string;
        icon?: string;
    };
}

/** Simple implementation for MDCFab. */
export class THCFab extends Component<THCFabProps> {
    render() {
        const {
            icon,
            iconLib = "material-icons",
            label,
            onClick,
            mini = false,
            exited = false,
            theme = {}
        } = this.props;

        const fabClassName = classNames({
            [fabCssClasses.FAB_BASE]: true,
            [fabCssClasses.FAB_MINI]: mini,
            [fabCssClasses.FAB_EXITED]: exited,
            [theme.fab]: theme.fab !== undefined
        });

        const iconClassName = classNames({
            [fabCssClasses.FAB_ICON]: true,
            [iconLib]: true,
            [theme.icon]: theme.icon !== undefined
        });

        return (
            <button className={fabClassName} aria-label={label} onClick={onClick}>
                <span className={iconClassName}>{icon}</span>
            </button>
        );
    }
}
