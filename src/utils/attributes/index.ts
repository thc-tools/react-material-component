// Libs
import { entries } from "lodash";

import * as reactEvents from "./events";
import { htmlAttributes } from "./html";

const allReactEvents: string[] = Object.keys(reactEvents).reduce(
    (acc, groupName) => [...acc, ...(reactEvents as any)[groupName]],
    [] as string[]
);

/**
 * Conver an event to the correct event name case.
 *
 * @param event the event to correct case.
 * @returns corrected event name.
 */
export function mapEventName(event: string) {
    if (!event.startsWith("on")) {
        event = "on" + event;
    }

    const eventName = allReactEvents.find(evt => evt.toLowerCase() === event.toLowerCase());

    return eventName || event;
}

/**
 * Filter the initial props, so only valid props are passed through.
 *
 * @param props The initial props.
 * @returns The filtered props.
 */
export function filterProps<T extends object>(props: T): T {
    return entries(props).reduce(
        (acc, [key, value]) => {
            if (
                key.startsWith("data-") ||
                key.startsWith("aria-") ||
                allReactEvents.indexOf(key) !== -1 ||
                htmlAttributes.indexOf(key) !== -1
            ) {
                (acc as any)[key] = value;
            }
            return acc;
        },
        {} as T
    );
}
