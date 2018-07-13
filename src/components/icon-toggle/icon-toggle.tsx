// Libs
import * as React from "react";
import classNames from "classnames";
import { MDCIconToggle, MDCIconToggleFoundation } from "@material/icon-toggle";

// Utils
import { toggleCssClasses } from "./constants";

/**
 * Props for THCIconToggle component.
 */
export interface THCIconToggleProps {
    /**
     * Icon to display for on state
     */
    iconOn: string;
    /**
     * Icon to display for off state
     */
    iconOff: string;
    /**
     * Icon library
     * @default material-icons"
     */
    iconLib?: string;
    /**
     * Label for on state
     */
    labelOn: string;
    /**
     * Label for off state
     */
    labelOff: string;
    /**
     * Onclick handler
     */
    onClick: (value: boolean) => void;
    /**
     * Value of IconToggle
     */
    value: boolean;
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
    theme?: { toggle?: string; on?: string; off?: string };
}

/**
 * Simple implementation for MDCIconToggle.
 */
export class THCIconToggle extends React.Component<THCIconToggleProps> {
    private iconToggleRef: React.RefObject<HTMLElement>;
    private iconToggle?: MDCIconToggle = undefined;

    constructor(props: THCIconToggleProps) {
        super(props);

        this.iconToggleRef = React.createRef();
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.iconToggle = new MDCIconToggle(this.iconToggleRef.current!);

        this.iconToggle.on = this.props.value;
        this.iconToggle.disabled = this.props.disabled || false;
        this.iconToggle.listen(MDCIconToggleFoundation.strings.CHANGE_EVENT, this.handleChange as any);
    }

    componentDidUpdate(prevProps: THCIconToggleProps) {
        const { props } = this;

        if (this.iconToggle === undefined) {
            return;
        }

        if (
            prevProps.iconOn !== props.iconOn ||
            prevProps.iconOff !== props.iconOff ||
            prevProps.labelOn !== props.labelOn ||
            prevProps.labelOff !== props.labelOff ||
            (prevProps.theme || {}).on !== (props.theme || {}).on ||
            (prevProps.theme || {}).off !== (props.theme || {}).off
        ) {
            this.iconToggle.refreshToggleData();
        }

        if (prevProps.value !== props.value) {
            this.iconToggle.on = props.value;
        }

        if (prevProps.disabled !== props.disabled) {
            this.iconToggle.disabled = props.disabled || false;
        }
    }

    componentWillUnmount() {
        if (this.iconToggle === undefined) {
            return;
        }

        this.iconToggle.unlisten(MDCIconToggleFoundation.strings.CHANGE_EVENT, this.handleChange as any);
        this.iconToggle.destroy();
    }

    handleChange({ detail: { isOn } }: { detail: { isOn: boolean } }) {
        const { onClick } = this.props;
        console.log("handleChange");

        onClick(isOn);
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
            className,
            theme = {},
            onClick,
            ...otherProps
        } = this.props;

        const iconToggleClassName = classNames(
            {
                [toggleCssClasses.TOGGLE_BASE]: true,
                [toggleCssClasses.TOGGLE_DISABLED]: disabled,
                [iconLib]: true,
                [theme.on as any]: value && !!theme.on,
                [theme.off as any]: !value && !!theme.off
            },
            className,
            theme.toggle
        );

        const dataToggleOn = JSON.stringify({ label: labelOn, content: iconOn, cssClass: theme.on });
        const dataToggleOff = JSON.stringify({ label: labelOff, content: iconOff, cssClass: theme.off });

        return (
            <i
                ref={this.iconToggleRef}
                className={iconToggleClassName}
                role="button"
                data-toggle-on={dataToggleOn}
                data-toggle-off={dataToggleOff}
                {...otherProps as any}
            />
        );
    }
}
