import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { THCButton } from "../button";
import { withInfo } from "@storybook/addon-info";

storiesOf("Buttons/THCButton", module)
    .add(
        "Base",
        withInfo({ inline: true, header: false })(() => <THCButton onClick={action("clicked")}>Hello button</THCButton>)
    )
    .add("Examples", () => (
        <div className="o-2c-grid">
            <div>
                <h1 className="mdc-typography--headline5">Base</h1>
                <THCButton onClick={action("clicked")}>Hello button</THCButton>
            </div>

            <div>
                <h1 className="mdc-typography--headline5">Raised</h1>
                <THCButton onClick={action("clicked")} raised>
                    Hello button
                </THCButton>
            </div>

            <div>
                <h1 className="mdc-typography--headline5">Unelevated</h1>
                <THCButton onClick={action("clicked")} unelevated>
                    Hello button
                </THCButton>
            </div>

            <div>
                <h1 className="mdc-typography--headline5">Outlined</h1>
                <THCButton onClick={action("clicked")} outlined>
                    Hello button
                </THCButton>
            </div>

            <div>
                <h1 className="mdc-typography--headline5">Icon</h1>
                <THCButton onClick={action("clicked")} icon="person">
                    Hello button
                </THCButton>
            </div>

            <div>
                <h1 className="mdc-typography--headline5">Icon (afer)</h1>
                <THCButton onClick={action("clicked")} icon="person" iconPosition="after">
                    Hello button
                </THCButton>
            </div>

            <div>
                <h1 className="mdc-typography--headline5">Dense</h1>
                <THCButton onClick={action("clicked")} dense>
                    Hello button
                </THCButton>
            </div>

            <div>
                <h1 className="mdc-typography--headline5">Disabled</h1>
                <THCButton onClick={action("clicked")} disabled>
                    Hello button
                </THCButton>
            </div>
        </div>
    ));
