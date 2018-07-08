// Libs
import * as React from "react";

/**
 * HOW to expose forwardRef behavior to classes component
 * Note: Component must have a forwardRef prop
 * @param Component Component to extend.
 */
export function withForwardRef<T, P = {}>(Component: React.ComponentClass<P & { forwardRef?: React.Ref<T> }>) {
    const forwardRef = React.forwardRef<T, P>((props: P, ref?: React.Ref<T>) => {
        return <Component forwardRef={ref} {...props} />;
    });
    (forwardRef as any).displayName = (Component as any).displayName || (Component as any).name;

    return forwardRef;
}
