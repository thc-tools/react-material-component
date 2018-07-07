import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { THCIconButton } from "../icon-button";
import { withInfo } from "@storybook/addon-info";

storiesOf("Buttons/THCIconButton", module)
    .add(
        "Base",
        withInfo({ inline: true, header: false })(() => (
            <THCIconButton onClick={action("clicked")}>person</THCIconButton>
        ))
    )
    .add("Examples", () => (
        <div className="o-2c-grid">
            <div>
                <h1 className="mdc-typography--headline5">Base</h1>
                <THCIconButton onClick={action("clicked")}>person</THCIconButton>
            </div>
        </div>
    ));
