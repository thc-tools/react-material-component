// Libs
import * as React from "react";
import { shallow, mount } from "enzyme";

// Components
import { THCButton } from "../button";
import { buttonCssClasses } from "../constants";

describe("THCButton component", () => {
    it("Displays text", () => {
        // Arrange/Act
        const button = shallow(<THCButton onClick={() => {}}>Mon label</THCButton>);

        // Assert
        expect(button.text()).toEqual("Mon label");
    });

    it("Can be Raised", () => {
        // Arrange/Act
        const button = shallow(
            <THCButton onClick={() => {}} raised>
                Mon label
            </THCButton>
        );

        // Assert
        expect(button.hasClass(buttonCssClasses.BUTTON_RAISED)).toBeTruthy();
    });

    it("Can be Unelevated", () => {
        // Arrange/Act
        const button = shallow(
            <THCButton onClick={() => {}} unelevated>
                Mon label
            </THCButton>
        );

        // Assert
        expect(button.hasClass(buttonCssClasses.BUTTON_UNELEVATED)).toBeTruthy();
    });

    it("Can be Outlined", () => {
        // Arrange/Act
        const button = shallow(
            <THCButton onClick={() => {}} outlined>
                Mon label
            </THCButton>
        );

        // Assert
        expect(button.hasClass(buttonCssClasses.BUTTON_OUTLINED)).toBeTruthy();
    });

    it("Can be Dense", () => {
        // Arrange/Act
        const button = shallow(
            <THCButton onClick={() => {}} dense>
                Mon label
            </THCButton>
        );

        // Assert
        expect(button.hasClass(buttonCssClasses.BUTTON_DENSE)).toBeTruthy();
    });

    it("Can be Disbaled", () => {
        // Arrange/Act
        const button = mount(
            <THCButton onClick={() => {}} disabled>
                Mon label
            </THCButton>
        );

        // Assert
        expect(button.getDOMNode().attributes.getNamedItem("disabled")).not.toBeNull();
    });

    it("Can have icon", () => {
        // Arrange/Act
        const button = shallow(
            <THCButton onClick={() => {}} icon="person">
                Mon label
            </THCButton>
        );

        // Assert
        const icon = button.find(`.${buttonCssClasses.BUTTON_ICON}`);
        expect(icon).not.toBeNull();
        expect(icon.text()).toEqual("person");
    });

    it("Can have custom button classname", () => {
        // Arrange/Act
        const button = shallow(
            <THCButton onClick={() => {}} theme={{ button: "my-class" }}>
                Mon label
            </THCButton>
        );

        // Assert
        expect(button.hasClass("my-class")).toBeTruthy();
    });

    it("Can have custom icon classname", () => {
        // Arrange/Act
        const button = shallow(
            <THCButton onClick={() => {}} icon="person" theme={{ icon: "my-class" }}>
                Mon label
            </THCButton>
        );

        // Assert
        const icon = button.find(`.${buttonCssClasses.BUTTON_ICON}`);
        expect(icon.hasClass("my-class")).toBeTruthy();
    });

    it("Can be clicked", () => {
        // Arrange
        const clickHandler = jest.fn();
        const button = shallow(<THCButton onClick={clickHandler}>Mon label</THCButton>);

        // Act
        button.simulate("click");

        // Assert
        expect(clickHandler).toHaveBeenCalledTimes(1);
    });
});
