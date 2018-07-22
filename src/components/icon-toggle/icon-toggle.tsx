// Libs
import * as React from "react";
import classnames from "classnames";
import { MDCIconToggleFoundation } from "@material/icon-toggle";

// Components
import { THCBaseAdapter, THCBaseAdapterState } from "../base/base.adapter";

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

interface THCIconToggleState {
    text?: string;
    tabIndex: number;
    value?: any;
}

/**
 * Simple implementation for MDCIconToggle.
 */
export class THCIconToggle extends THCBaseAdapter<THCIconToggleProps, THCIconToggleState> {
    private iconToggleFoundation?: MDCIconToggleFoundation = undefined;

    state = {
        ...THCBaseAdapter.getDefaultState(),
        text: undefined,
        tabIndex: 0
    } as THCIconToggleState & THCBaseAdapterState;

    constructor(props: THCIconToggleProps) {
        super(props);

        this.handleChange = this.handleChange.bind(this);

        this.iconToggleFoundation = new MDCIconToggleFoundation({
            ...this.getDefaultAdapter(),
            setText: text => this.setText(text),
            getTabIndex: () => this.getTabIndex(),
            setTabIndex: tabIndex => this.setTabIndex(tabIndex),
            notifyChange: evtData => this.emit(MDCIconToggleFoundation.strings.CHANGE_EVENT, evtData as any)
        });
    }

    protected setText(text: string) {
        this.setState({ text });
    }

    protected getTabIndex() {
        return this.state.tabIndex;
    }

    protected setTabIndex(tabIndex: number) {
        this.setState({ tabIndex });
    }

    protected customGetAttribute(name: string) {
        const { iconOn, iconOff, labelOn, labelOff, theme = {} } = this.props;

        if (name === "data-toggle-on") {
            const dataToggleOn = JSON.stringify({ label: labelOn, content: iconOn, cssClass: theme.on });

            return dataToggleOn;
        }

        if (name === "data-toggle-off") {
            const dataToggleOff = JSON.stringify({ label: labelOff, content: iconOff, cssClass: theme.off });

            return dataToggleOff;
        }

        return "";
    }

    componentDidMount() {
        if (this.iconToggleFoundation) {
            this.iconToggleFoundation.init();
            this.iconToggleFoundation.toggle(this.props.value);
            this.iconToggleFoundation.setDisabled(this.props.disabled || false);
            this.registerEventListener(MDCIconToggleFoundation.strings.CHANGE_EVENT, this.handleChange as any);
        }
    }

    componentDidUpdate(prevProps: THCIconToggleProps) {
        const { props } = this;

        if (this.iconToggleFoundation === undefined) {
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
            this.iconToggleFoundation.refreshToggleData();
        }

        if (prevProps.value !== props.value) {
            this.iconToggleFoundation.toggle(props.value);
        }

        if (prevProps.disabled !== props.disabled) {
            this.iconToggleFoundation.setDisabled(props.disabled || false);
        }
    }

    componentWillUnmount() {
        if (this.iconToggleFoundation === undefined) {
            return;
        }

        this.removeEventListener(MDCIconToggleFoundation.strings.CHANGE_EVENT, this.handleChange as any);
        this.iconToggleFoundation.destroy();
    }

    handleChange({ isOn }: { isOn: boolean }) {
        const { onClick } = this.props;

        onClick(isOn);
    }

    render() {
        const {
            iconOn,
            iconOff,
            iconLib = "material-icons",
            labelOn,
            labelOff,
            onClick,
            className,
            theme = {},
            ...otherProps
        } = this.props;
        const { text, tabIndex } = this.state;

        const iconToggleClassName = classnames(
            {
                [toggleCssClasses.TOGGLE_BASE]: true,
                [iconLib]: true
            },
            className,
            theme.toggle,
            this.buildClassnames()
        );

        return (
            <i
                className={iconToggleClassName}
                role="button"
                tabIndex={tabIndex}
                {...this.buildEvents()}
                {...this.buildAttributes()}
                {...otherProps as any}
            >
                {text}
            </i>
        );
    }
}
