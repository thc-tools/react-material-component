// Libs
import React, { Component } from "react";
import classNames from "classnames";
import { MDCIconToggle, MDCIconToggleFoundation } from "@material/icon-toggle";

// Utils
import { toggleCssClasses } from "./constants";

/** Props for THCIconToggle component. */
export interface THCIconToggleProps {
    /** Icon to display for on state */
    iconOn: string;
    /** Icon to display for off state */
    iconOff: string;
    /** Icon library, default to : "material-icons" */
    iconLib?: string;
    /** Label for on state */
    labelOn: string;
    /** Label for off state */
    labelOff: string;
    /** Onclick handler */
    onClick: (value: boolean) => void;
    /** Value of IconToggle */
    value: boolean;
    /** If is disabled, default to "false" */
    disabled?: boolean;
    /** Theme options */
    theme?: { toggle?: string; on?: string; off?: string };
}

/** Simple implementation for MDCIconToggle. */
export class THCIconToggle extends Component<THCIconToggleProps> {
    private iconToggleRef: React.RefObject<HTMLElement>;
    private iconToggle: MDCIconToggle;

    constructor(props) {
        super(props);

        this.iconToggleRef = React.createRef();
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.iconToggle = new MDCIconToggle(this.iconToggleRef.current);

        this.iconToggle.initialSyncWithDOM();
        this.iconToggle.listen(MDCIconToggleFoundation.strings.CHANGE_EVENT, this.handleChange as any);
    }

    componentDidUpdate(prevProps: THCIconToggleProps) {
        const { props } = this;

        if (
            prevProps.iconOn !== props.iconOn ||
            prevProps.iconOff !== props.iconOff ||
            prevProps.labelOn !== props.labelOn ||
            prevProps.labelOff !== props.labelOff ||
            prevProps.theme.on !== props.theme.on ||
            prevProps.theme.off !== props.theme.off
        ) {
            this.iconToggle.refreshToggleData();
        }

        if (prevProps.value !== props.value) {
            this.iconToggle.on = props.value;
        }

        if (prevProps.disabled !== props.disabled) {
            this.iconToggle.disabled = props.disabled;
        }
    }

    componentWillUnmount() {
        this.iconToggle.unlisten(MDCIconToggleFoundation.strings.CHANGE_EVENT, this.handleChange as any);
        this.iconToggle.destroy();
    }

    handleChange({ detail: { isOn } }: { detail: { isOn: string } }) {
        const { onClick } = this.props;

        onClick(isOn === "on");
    }

    render() {
        const {
            iconOn,
            iconOff,
            iconLib = "material-icons",
            labelOn,
            labelOff,
            value,
            disabled = false,
            theme = {}
        } = this.props;

        const className = classNames({
            [toggleCssClasses.TOGGLE_BASE]: true,
            [toggleCssClasses.TOGGLE_DISABLED]: disabled,
            [iconLib]: true,
            [theme.toggle]: theme.toggle !== undefined,
            [value ? theme.on : theme.off]: value ? theme.on !== undefined : theme.off !== undefined
        });

        const defaultLabel = value ? labelOn : labelOff;
        const defaultIcon = value ? iconOn : iconOff;
        const defaultTabIndex = value ? -1 : 0;

        return (
            <i
                ref={this.iconToggleRef}
                className={className}
                role="button"
                aria-pressed={value}
                aria-disabled={disabled}
                aria-label={defaultLabel}
                tabIndex={defaultTabIndex}
                data-toggle-on={{ label: labelOn, content: iconOn, cssClass: theme.on }}
                data-toggle-off={{ label: labelOff, content: iconOff, cssClass: theme.off }}
            >
                {defaultIcon}
            </i>
        );
    }
}
