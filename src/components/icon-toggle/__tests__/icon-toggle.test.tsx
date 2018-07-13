// Libs
import * as React from "react";
import { mount } from "enzyme";

// Components
import { THCIconToggle } from "../icon-toggle";
import { toggleCssClasses } from "../constants";

describe("THCIconToogle component", () => {
    it("Displays correct on values", () => {
        // Arrange/Act
        const toggle = mount(
            <THCIconToggle
                onClick={(_val: boolean) => {}}
                iconOn="play_arrow"
                labelOn="I'm playing"
                iconOff="pause"
                labelOff="I'm paused"
                value={true}
                theme={{ on: "my-class" }}
            />
        );

        // Assert
        expect(toggle.text()).toEqual("play_arrow");
        expect(toggle.getDOMNode().className.includes("my-class")).toBeTruthy();
        const attribute = toggle.getDOMNode().attributes.getNamedItem("aria-label");
        expect(attribute).not.toBeNull();
        expect(attribute!.value).toEqual("I'm playing");
    });

    it("Displays correct off values", () => {
        // Arrange/Act
        const toggle = mount(
            <THCIconToggle
                onClick={(_val: boolean) => {}}
                iconOn="play_arrow"
                labelOn="I'm playing"
                iconOff="pause"
                labelOff="I'm paused"
                value={false}
                theme={{ off: "my-class" }}
            />
        );

        // Assert
        expect(toggle.text()).toEqual("pause");
        expect(toggle.getDOMNode().className.includes("my-class")).toBeTruthy();
        const attribute = toggle.getDOMNode().attributes.getNamedItem("aria-label");
        expect(attribute).not.toBeNull();
        expect(attribute!.value).toEqual("I'm paused");
    });

    it("Can have custom toggle theme", () => {
        // Arrange/Act
        const toggle = mount(
            <THCIconToggle
                onClick={(_val: boolean) => {}}
                iconOn="play_arrow"
                labelOn="I'm playing"
                iconOff="pause"
                labelOff="I'm paused"
                value={true}
                theme={{ toggle: "my-class" }}
            />
        );

        // Assert
        expect(toggle.getDOMNode().className.includes(toggleCssClasses.TOGGLE_BASE)).toBeTruthy();
        expect(toggle.getDOMNode().className.includes("my-class")).toBeTruthy();
    });

    it("Can have custom classname", () => {
        // Arrange/Act
        const toggle = mount(
            <THCIconToggle
                onClick={(_val: boolean) => {}}
                iconOn="play_arrow"
                labelOn="I'm playing"
                iconOff="pause"
                labelOff="I'm paused"
                value={true}
                className="my-class"
            />
        );

        // Assert
        expect(toggle.getDOMNode().className.includes(toggleCssClasses.TOGGLE_BASE)).toBeTruthy();
        expect(toggle.getDOMNode().className.includes("my-class")).toBeTruthy();
    });

    it.skip("Can be clicked", () => {
        // Arrange
        const clickHandler = jest.fn();
        const toggle = mount(
            <THCIconToggle
                onClick={clickHandler}
                iconOn="play_arrow"
                labelOn="I'm playing"
                iconOff="pause"
                labelOff="I'm paused"
                value={true}
            />
        );

        // Act
        toggle.simulate("click");

        // Assert
        expect.assertions(2);
        return new Promise(resolve =>
            setTimeout(() => {
                expect(clickHandler).toHaveBeenCalledTimes(1);
                expect(clickHandler).toBeCalledWith(false);

                resolve();
            }, 100)
        );
    });

    it.skip("Can change value", () => {
        // Arrange
        const toggle = mount(
            <THCIconToggle
                onClick={(_val: boolean) => {}}
                iconOn="play_arrow"
                labelOn="I'm playing"
                iconOff="pause"
                labelOff="I'm paused"
                value={true}
            />
        );

        // Pre assert
        expect(toggle.text()).toEqual("play_arrow");

        // Act
        toggle.simulate("click");

        // Assert
        expect(toggle.text()).toEqual("pause");
    });

    it("Can be have custom data-* property", () => {
        // Arrange/Act
        const toggle = mount(
            <THCIconToggle
                onClick={(_val: boolean) => {}}
                iconOn="play_arrow"
                labelOn="I'm playing"
                iconOff="pause"
                labelOff="I'm paused"
                value={true}
                data-test="toto"
            />
        );

        // Assert
        const attribute = toggle.getDOMNode().attributes.getNamedItem("data-test");
        expect(attribute).not.toBeNull();
        expect(attribute!.value).toEqual("toto");
    });

    it("Can be have custom aria-* property", () => {
        // Arrange/Act
        const toggle = mount(
            <THCIconToggle
                onClick={(_val: boolean) => {}}
                iconOn="play_arrow"
                labelOn="I'm playing"
                iconOff="pause"
                labelOff="I'm paused"
                value={true}
                aria-labelledby="click"
            />
        );

        // Assert
        const attribute = toggle.getDOMNode().attributes.getNamedItem("aria-labelledby");
        expect(attribute).not.toBeNull();
        expect(attribute!.value).toEqual("click");
    });
});
