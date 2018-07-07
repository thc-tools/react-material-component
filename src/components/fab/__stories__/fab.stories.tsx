// Libs
import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { withInfo } from "@storybook/addon-info";

// Components
import { THCFab } from "../fab";

storiesOf("Buttons/THCFab", module)
    .add("Base", withInfo({ inline: true, header: false })(() => <THCFab onClick={action("clicked")}>person</THCFab>))
    .add("Examples", () => (
        <div className="o-2c-grid">
            <div>
                <h1 className="mdc-typography--headline5">Base</h1>
                <THCFab onClick={action("clicked")}>person</THCFab>
            </div>

            <div>
                <h1 className="mdc-typography--headline5">Mini</h1>
                <THCFab onClick={action("clicked")} mini>
                    person
                </THCFab>
            </div>

            <div>
                <h1 className="mdc-typography--headline5">Exited</h1>
                <THCFab onClick={action("clicked")} exited>
                    person
                </THCFab>
            </div>
        </div>
    ));
