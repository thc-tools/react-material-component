// Libs
import * as React from "react";
import classnames from "classnames";

export interface Attribute {
    attribute: string;
    value: string;
}

/**
 * State of base Adapter Component.
 */
export interface THCBaseAdapterState {
    classNames: { [className: string]: boolean };
    attributes: Attribute[];
    events: { [name: string]: EventListener[] };
}

export class THCBaseAdapter<P extends object, S extends object> extends React.Component<P, S & THCBaseAdapterState> {
    /**
     * Default state.
     */
    static getDefaultState() {
        return {
            classNames: {},
            attributes: [],
            events: {}
        } as THCBaseAdapterState;
    }

    /**
     * Default constructor.
     * @param props Props.
     */
    constructor(props: P) {
        super(props);
    }

    /**
     * Build DefaultAdapter.
     */
    protected getDefaultAdapter() {
        return {
            addClass: (className: string) => this.addClass(className),
            removeClass: (className: string) => this.removeClass(className),
            registerInteractionHandler: (type: string, handler: EventListener) =>
                this.registerEventListener(type, handler),
            deregisterInteractionHandler: (type: string, handler: EventListener) =>
                this.removeEventListener(type, handler),
            getAttr: (attrName: string) => this.getAttribute(attrName),
            setAttr: (attrName: string, value: string) => this.setAttribute(attrName, value),
            rmAttr: (attrName: string) => this.removeAttribute(attrName)
        };
    }

    /**
     * Emit an event.
     * @param type Event type.
     * @param event Event.
     */
    protected emit(type: string, event: Event) {
        if (!this.state.events.hasOwnProperty(type)) {
            return;
        }

        this.state.events[type].forEach(fn => {
            fn(event);
        });
    }

    /**
     * Register a new EventListener.
     * @param type Event type.
     * @param handler Eventlistener.
     */
    protected registerEventListener(type: string, handler: EventListener) {
        this.setState(state => {
            if (state.events.hasOwnProperty(type)) {
                return {
                    events: {
                        ...(state as THCBaseAdapterState).events,
                        [type]: [...state.events[type], handler]
                    }
                };
            }

            return {
                events: {
                    ...(state as THCBaseAdapterState).events,
                    [type]: [handler]
                }
            };
        });
    }

    /**
     * Remove an EventListener.
     * @param type Event type.
     * @param handler EventListener.
     */
    protected removeEventListener(type: string, handler: EventListener) {
        this.setState(state => {
            if (!state.events.hasOwnProperty(type)) {
                return {} as S & THCBaseAdapterState;
            }

            return {
                events: {
                    ...(state as THCBaseAdapterState).events,
                    [type]: state.events[type].filter(fn => fn !== handler)
                }
            };
        });
    }

    /**
     * Build events for child.
     */
    protected buildEvents() {
        return (
            Object.keys(this.state.events)
                // MDC events are not to be given to child component
                .filter(type => !type.startsWith("MDC"))
                .reduce((acc: any, type: string) => {
                    const eventName = `on${type.slice(0, 1).toUpperCase()}${type.slice(1)}`;
                    const eventFn = (e: Event) =>
                        (this.state.events as any)[type].forEach((fn: EventListener) => fn(e));

                    return { ...acc, [eventName]: eventFn };
                }, {})
        );
    }

    /**
     * Get an attribute value.
     * @param name Attribtue name.
     */
    protected customGetAttribute?(name: string): string;

    /**
     * Get an attribute value.
     * @param name Attribute name.
     */
    protected getAttribute(name: string) {
        const attribute = this.state.attributes.find(attr => attr.attribute === name);

        if (attribute) {
            return attribute.value;
        }

        if (this.customGetAttribute) {
            return this.customGetAttribute(name);
        }

        return "";
    }

    /**
     * Set an attribute value.
     * @param name Attribute name.
     * @param value Attribute value.
     */
    protected setAttribute(name: string, value: string) {
        this.setState(state => {
            const attribute = state.attributes.find(attr => attr.attribute === name);

            if (attribute) {
                return {
                    attributes: state.attributes.map(attr => {
                        if (attr.attribute === name) {
                            return { attribute: name, value };
                        }

                        return attr;
                    })
                };
            }

            return { attributes: [...state.attributes, { attribute: name, value }] };
        });
    }

    /**
     * Remove an attribute.
     * @param name Attribute name.
     */
    protected removeAttribute(name: string) {
        this.setState(state => {
            return {
                attributes: state.attributes.filter(attr => attr.attribute !== name)
            };
        });
    }

    /**
     * Build attributes for child.
     */
    protected buildAttributes() {
        return this.state.attributes.reduce((acc, attr) => ({ ...acc, [attr.attribute]: attr.value }), {});
    }

    /**
     * Add a new class.
     * @param className Class name.
     */
    protected addClass(className: string) {
        this.setState(state => {
            return { classNames: { ...(state as THCBaseAdapterState).classNames, [className]: true } };
        });
    }

    /**
     * Remove a class.
     * @param className Class name.
     */
    protected removeClass(className: string) {
        this.setState(state => {
            return { classNames: { ...(state as THCBaseAdapterState).classNames, [className]: false } };
        });
    }

    /**
     * Build classnames for child.
     */
    protected buildClassnames() {
        return classnames(this.state.classNames);
    }
}
