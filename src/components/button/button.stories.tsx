import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { THCButton } from "./button";

storiesOf("THCButton", module)
    .add("With text", () => <THCButton onClick={action("clicked")}>Hello button</THCButton>)
    .add("Icon", () => (
        <THCButton onClick={action("clicked")} icon="person">
            Hello button
        </THCButton>
    ))
    .add("Icon (after)", () => (
        <THCButton onClick={action("clicked")} icon="person" iconPosition="after">
            Hello button
        </THCButton>
    ))
    .add("Raised", () => (
        <THCButton onClick={action("clicked")} raised>
            Hello button
        </THCButton>
    ))
    .add("Unelevated", () => (
        <THCButton onClick={action("clicked")} unelevated>
            Hello button
        </THCButton>
    ))
    .add("Oulined", () => (
        <THCButton onClick={action("clicked")} outlined>
            Hello button
        </THCButton>
    ))
    .add("Dense", () => (
        <THCButton onClick={action("clicked")} dense>
            Hello button
        </THCButton>
    ))
    .add("Disabled", () => (
        <THCButton onClick={action("clicked")} disabled>
            Hello button
        </THCButton>
    ));
