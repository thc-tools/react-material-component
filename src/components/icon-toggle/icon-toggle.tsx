// Libs
import * as React from "react";
import classNames from "classnames";
import { MDCIconToggleFoundation } from "@material/icon-toggle";

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
    classNames: { [className: string]: boolean };
    attributes: { [attribute: string]: string };
    events: { [name: string]: EventListener[] };
    text?: string;
    tabIndex: number;
    value?: any;
}

/**
 * Simple implementation for MDCIconToggle.
 */
export class THCIconToggle extends React.Component<THCIconToggleProps, THCIconToggleState> {
    private iconToggleFoundation?: MDCIconToggleFoundation = undefined;

    state = {
        classNames: {},
        attributes: {},
        events: {},
        text: undefined,
        tabIndex: 0
    };

    constructor(props: THCIconToggleProps) {
        super(props);

        this.handleChange = this.handleChange.bind(this);

        this.iconToggleFoundation = new MDCIconToggleFoundation({
            addClass: className => this.addClass(className),
            removeClass: className => this.removeClass(className),
            registerInteractionHandler: (type, handler) => this.registerEventListener(type, handler),
            deregisterInteractionHandler: (type, handler) => this.removeEventListener(type, handler),
            setText: text => this.setText(text),
            getTabIndex: () => this.getTabIndex(),
            setTabIndex: tabIndex => this.setTabIndex(tabIndex),
            getAttr: name => this.getAttribute(name),
            setAttr: (name, value) => this.setAttribute(name, value),
            rmAttr: name => this.removeAttribute(name),
            notifyChange: evtData => this.emit(MDCIconToggleFoundation.strings.CHANGE_EVENT, evtData as any)
        });
    }

    protected emit(type: string, event: Event) {
        if (!this.state.events.hasOwnProperty(type)) {
            return;
        }

        ((this.state.events as any)[type] as EventListener[]).forEach(fn => {
            fn(event);
        });
    }

    protected registerEventListener(type: string, handler: EventListener) {
        this.setState(state => {
            if (state.events.hasOwnProperty(type)) {
                return {
                    events: {
                        ...state.events,
                        [type]: [...state.events[type], handler]
                    }
                };
            }

            return {
                events: {
                    ...state.events,
                    [type]: [handler]
                }
            };
        });
    }

    protected removeEventListener(type: string, handler: EventListener) {
        this.setState(state => {
            if (!state.events.hasOwnProperty(type)) {
                return {} as any;
            }

            return {
                events: {
                    ...state.events,
                    [type]: state.events[type].filter(fn => fn !== handler)
                }
            };
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

    protected getAttribute(name: string) {
        const { iconOn, iconOff, labelOn, labelOff, theme = {} } = this.props;

        if (name === "data-toggle-on") {
            const dataToggleOn = JSON.stringify({ label: labelOn, content: iconOn, cssClass: theme.on });

            return dataToggleOn;
        }

        if (name === "data-toggle-off") {
            const dataToggleOff = JSON.stringify({ label: labelOff, content: iconOff, cssClass: theme.off });

            return dataToggleOff;
        }

        return (this.state.attributes as any)[name] as string;
    }

    protected setAttribute(name: string, value: string) {
        this.setState(state => {
            return { attributes: { ...state.attributes, [name]: value } };
        });
    }

    protected removeAttribute(name: string) {
        this.setState(state => {
            if (!state.attributes.hasOwnProperty(name)) {
                return {} as any;
            }

            return {
                attributes: Object.keys(state.attributes).reduce((acc, key) => {
                    if (key === name) {
                        return { ...acc };
                    }

                    return { ...acc, [key]: state.attributes[key] };
                }, {})
            };
        });
    }

    protected addClass(className: string) {
        this.setState(state => {
            return { classNames: { ...state.classNames, [className]: true } };
        });
    }

    protected removeClass(className: string) {
        this.setState(state => {
            return { classNames: { ...state.classNames, [className]: false } };
        });
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
        console.log("handleChange");

        onClick(isOn);
    }

    buildEvents() {
        return Object.keys(this.state.events).reduce((acc: any, type: string) => {
            if (type.startsWith("MDC")) {
                return acc;
            }

            const eventName = `on${type.slice(0, 1).toUpperCase()}${type.slice(1)}`;
            const eventFn = (e: Event) => (this.state.events as any)[type].forEach((fn: EventListener) => fn(e));

            return { ...acc, [eventName]: eventFn };
        }, {});
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
        const { text, tabIndex, classNames: foundationClassnames, attributes } = this.state;

        const iconToggleClassName = classNames(
            {
                [toggleCssClasses.TOGGLE_BASE]: true,
                [iconLib]: true
            },
            className,
            foundationClassnames,
            theme.toggle
        );

        return (
            <i
                className={iconToggleClassName}
                role="button"
                tabIndex={tabIndex}
                {...this.buildEvents()}
                {...attributes}
                {...otherProps as any}
            >
                {text}
            </i>
        );
    }
}
