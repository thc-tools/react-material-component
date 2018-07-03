import { configure, addDecorator } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";

import "material-components-web/dist/material-components-web.css";
import "material-design-icons/iconfont/material-icons.css";
import "./custom.css";

// automatically import all files ending in *.stories.js
const req = require.context("../src/components", true, /.stories.tsx$/);
function loadStories() {
    req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
