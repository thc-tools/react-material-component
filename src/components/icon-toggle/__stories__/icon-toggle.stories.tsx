// Libs
import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { withInfo } from "@storybook/addon-info";

// Components
import { THCIconToggle } from "../icon-toggle";

storiesOf("Buttons/THCIconToggle", module)
    .add(
        "Base",
        withInfo({ inline: true, header: false })(() => (
            <THCIconToggle
                onClick={action("clicked")}
                iconOn="play_arrow"
                labelOn="I'm playing"
                iconOff="pause"
                labelOff="I'm paused"
                value={true}
            />
        ))
    )
    .add("Examples", () => (
        <div className="o-2c-grid">
            <div>
                <h1 className="mdc-typography--headline5">Base</h1>
                <THCIconToggle
                    onClick={action("clicked")}
                    iconOn="play_arrow"
                    labelOn="I'm playing"
                    iconOff="pause"
                    labelOff="I'm paused"
                    value={true}
                />
            </div>

            <div>
                <h1 className="mdc-typography--headline5">Disabled</h1>
                <THCIconToggle
                    onClick={action("clicked")}
                    iconOn="play_arrow"
                    labelOn="I'm playing"
                    iconOff="pause"
                    labelOff="I'm paused"
                    value={true}
                    disabled
                />
            </div>
        </div>
    ));
