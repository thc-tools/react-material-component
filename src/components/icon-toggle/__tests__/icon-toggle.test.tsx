// Libs
import * as React from "react";
import { shallow, mount } from "enzyme";

// Components
import { THCIconToggle } from "../icon-toggle";
import { toggleCssClasses } from "../constants";

describe("THCIconButton component", () => {
    it("Displays children", () => {
        // Arrange/Act
        const fab = shallow(
            <THCIconToggle
                onClick={(_val: boolean) => {}}
                iconOn="play_arrow"
                labelOn="I'm playing"
                iconOff="pause"
                labelOff="I'm paused"
                value={true}
            />
        );

        // Assert
        const icon = fab.find(`.${toggleCssClasses.TOGGLE_BASE}`);
        expect(icon.text()).toEqual("person");
    });

    it("Displays icon", () => {
        // Arrange/Act
        const fab = shallow(
            <THCIconToggle
                onClick={(_val: boolean) => {}}
                iconOn="play_arrow"
                labelOn="I'm playing"
                iconOff="pause"
                labelOff="I'm paused"
                value={true}
            />
        );

        // Assert
        const icon = fab.find(`.${toggleCssClasses.TOGGLE_BASE}`);
        expect(icon.text()).toEqual("person");
    });

    it("Displays label", () => {
        // Arrange/Act
        const fab = mount(
            <THCIconToggle
                onClick={(_val: boolean) => {}}
                iconOn="play_arrow"
                labelOn="I'm playing"
                iconOff="pause"
                labelOff="I'm paused"
                value={true}
            />
        );

        // Assert
        const attribute = fab.getDOMNode().attributes.getNamedItem("aria-label");
        expect(attribute).not.toBeNull();
        expect(attribute!.value).toEqual("person-button");
    });

    it("Can have custom button theme", () => {
        // Arrange/Act
        const fab = shallow(
            <THCIconToggle
                onClick={(_val: boolean) => {}}
                iconOn="play_arrow"
                labelOn="I'm playing"
                iconOff="pause"
                labelOff="I'm paused"
                value={true}
            />
        );

        // Assert
        expect(fab.hasClass(toggleCssClasses.TOGGLE_BASE)).toBeTruthy();
        expect(fab.hasClass("my-class")).toBeTruthy();
    });

    it("Can have custom classname", () => {
        // Arrange/Act
        const fab = shallow(
            <THCIconToggle
                onClick={(_val: boolean) => {}}
                iconOn="play_arrow"
                labelOn="I'm playing"
                iconOff="pause"
                labelOff="I'm paused"
                value={true}
            />
        );

        // Assert
        expect(fab.hasClass(toggleCssClasses.TOGGLE_BASE)).toBeTruthy();
        expect(fab.hasClass("my-class")).toBeTruthy();
    });

    it("Can be clicked", () => {
        // Arrange
        const clickHandler = jest.fn();
        const fab = shallow(
            <THCIconToggle
                onClick={(_val: boolean) => {}}
                iconOn="play_arrow"
                labelOn="I'm playing"
                iconOff="pause"
                labelOff="I'm paused"
                value={true}
            />
        );

        // Act
        fab.simulate("click");

        // Assert
        expect(clickHandler).toHaveBeenCalledTimes(1);
    });

    it("Can be have custom data-* property", () => {
        // Arrange
        const fab = mount(
            <THCIconToggle
                onClick={(_val: boolean) => {}}
                iconOn="play_arrow"
                labelOn="I'm playing"
                iconOff="pause"
                labelOff="I'm paused"
                value={true}
            />
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
            <THCIconToggle
                onClick={(_val: boolean) => {}}
                iconOn="play_arrow"
                labelOn="I'm playing"
                iconOff="pause"
                labelOff="I'm paused"
                value={true}
            />
        );

        // Act
        fab.simulate("click");

        // Assert
        const attribute = fab.getDOMNode().attributes.getNamedItem("aria-label");
        expect(attribute).not.toBeNull();
        expect(attribute!.value).toEqual("toto");
    });
});
