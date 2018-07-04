// Libs
import * as React from "react";
import { shallow, mount } from "enzyme";

// Components
import { THCFab } from "../fab";
import { fabCssClasses } from "../constants";

describe("THCFab component", () => {
    it("Displays children", () => {
        // Arrange/Act
        const fab = shallow(<THCFab onClick={() => {}}>person</THCFab>);

        // Assert
        const icon = fab.find(`.${fabCssClasses.FAB_ICON}`);
        expect(icon.text()).toEqual("person");
    });

    it("Displays icon", () => {
        // Arrange/Act
        const fab = shallow(<THCFab onClick={() => {}} icon="person" />);

        // Assert
        const icon = fab.find(`.${fabCssClasses.FAB_ICON}`);
        expect(icon.text()).toEqual("person");
    });

    it("Displays label", () => {
        // Arrange/Act
        const fab = mount(
            <THCFab onClick={() => {}} label="person-button">
                person
            </THCFab>
        );

        // Assert
        const attribute = fab.getDOMNode().attributes.getNamedItem("aria-label");
        expect(attribute).not.toBeNull();
        expect(attribute!.value).toEqual("person-button");
    });

    it("Can be mini", () => {
        // Arrange/Act
        const fab = shallow(
            <THCFab onClick={() => {}} mini>
                person
            </THCFab>
        );

        // Assert
        expect(fab.hasClass(fabCssClasses.FAB_MINI)).toBeTruthy();
    });

    it("Can be exited", () => {
        // Arrange/Act
        const fab = shallow(
            <THCFab onClick={() => {}} exited>
                person
            </THCFab>
        );

        // Assert
        expect(fab.hasClass(fabCssClasses.FAB_EXITED)).toBeTruthy();
    });

    it("Can have custom button theme", () => {
        // Arrange/Act
        const fab = shallow(
            <THCFab onClick={() => {}} theme={{ fab: "my-class" }}>
                Mon label
            </THCFab>
        );

        // Assert
        expect(fab.hasClass(fabCssClasses.FAB_BASE)).toBeTruthy();
        expect(fab.hasClass("my-class")).toBeTruthy();
    });

    it("Can have custom icon theme", () => {
        // Arrange/Act
        const fab = shallow(
            <THCFab onClick={() => {}} icon="person" theme={{ icon: "my-class" }}>
                Mon label
            </THCFab>
        );

        // Assert
        const icon = fab.find(`.${fabCssClasses.FAB_ICON}`);
        expect(icon.hasClass(fabCssClasses.FAB_ICON)).toBeTruthy();
        expect(icon.hasClass("my-class")).toBeTruthy();
    });

    it("Can have custom classname", () => {
        // Arrange/Act
        const fab = shallow(
            <THCFab onClick={() => {}} className="my-class">
                Mon label
            </THCFab>
        );

        // Assert
        expect(fab.hasClass(fabCssClasses.FAB_BASE)).toBeTruthy();
        expect(fab.hasClass("my-class")).toBeTruthy();
    });

    it("Can be clicked", () => {
        // Arrange
        const clickHandler = jest.fn();
        const fab = shallow(<THCFab onClick={clickHandler}>person</THCFab>);

        // Act
        fab.simulate("click");

        // Assert
        expect(clickHandler).toHaveBeenCalledTimes(1);
    });

    it("Can be have custom data-* property", () => {
        // Arrange
        const fab = mount(
            <THCFab onClick={() => {}} data-test="toto">
                Mon label
            </THCFab>
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
            <THCFab onClick={() => {}} aria-label="toto">
                Mon label
            </THCFab>
        );

        // Act
        fab.simulate("click");

        // Assert
        const attribute = fab.getDOMNode().attributes.getNamedItem("aria-label");
        expect(attribute).not.toBeNull();
        expect(attribute!.value).toEqual("toto");
    });
});
