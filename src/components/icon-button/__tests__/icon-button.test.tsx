// Libs
import * as React from "react";
import { shallow, mount } from "enzyme";

// Components
import { THCIconButton } from "../icon-button";
import { iconCssClasses } from "../constants";

describe("THCIconButton component", () => {
    it("Displays children", () => {
        // Arrange/Act
        const fab = shallow(<THCIconButton onClick={() => {}}>person</THCIconButton>);

        // Assert
        const icon = fab.find(`.${iconCssClasses.ICON_BUTTON_BASE}`);
        expect(icon.text()).toEqual("person");
    });

    it("Displays icon", () => {
        // Arrange/Act
        const fab = shallow(<THCIconButton onClick={() => {}} icon="person" />);

        // Assert
        const icon = fab.find(`.${iconCssClasses.ICON_BUTTON_BASE}`);
        expect(icon.text()).toEqual("person");
    });

    it("Displays label", () => {
        // Arrange/Act
        const fab = mount(
            <THCIconButton onClick={() => {}} label="person-button">
                person
            </THCIconButton>
        );

        // Assert
        const attribute = fab.getDOMNode().attributes.getNamedItem("aria-label");
        expect(attribute).not.toBeNull();
        expect(attribute!.value).toEqual("person-button");
    });

    it("Can have custom button theme", () => {
        // Arrange/Act
        const fab = shallow(
            <THCIconButton onClick={() => {}} theme={{ button: "my-class" }}>
                Mon label
            </THCIconButton>
        );

        // Assert
        expect(fab.hasClass(iconCssClasses.ICON_BUTTON_BASE)).toBeTruthy();
        expect(fab.hasClass("my-class")).toBeTruthy();
    });

    it("Can have custom classname", () => {
        // Arrange/Act
        const fab = shallow(
            <THCIconButton onClick={() => {}} className="my-class">
                Mon label
            </THCIconButton>
        );

        // Assert
        expect(fab.hasClass(iconCssClasses.ICON_BUTTON_BASE)).toBeTruthy();
        expect(fab.hasClass("my-class")).toBeTruthy();
    });

    it("Can be clicked", () => {
        // Arrange
        const clickHandler = jest.fn();
        const fab = shallow(<THCIconButton onClick={clickHandler}>person</THCIconButton>);

        // Act
        fab.simulate("click");

        // Assert
        expect(clickHandler).toHaveBeenCalledTimes(1);
    });

    it("Can be have custom data-* property", () => {
        // Arrange
        const fab = mount(
            <THCIconButton onClick={() => {}} data-test="toto">
                Mon label
            </THCIconButton>
        );

        // Act
        fab.simulate("click");

        // Assert
        const attribute = fab.getDOMNode().attributes.getNamedItem("data-test");
        expect(attribute).not.toBeNull();
        expect(attribute!.value).toEqual("toto");
    });

    it("Can be have custom aria-* property", () => {
        // Arrange
        const fab = mount(
            <THCIconButton onClick={() => {}} aria-label="toto">
                Mon label
            </THCIconButton>
        );

        // Act
        fab.simulate("click");

        // Assert
        const attribute = fab.getDOMNode().attributes.getNamedItem("aria-label");
        expect(attribute).not.toBeNull();
        expect(attribute!.value).toEqual("toto");
    });
});
