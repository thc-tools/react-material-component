import { configure } from "@storybook/react";

import "material-components-web/dist/material-components-web.css";

// automatically import all files ending in *.stories.js
const req = require.context("../src/components", true, /.stories.tsx$/);
function loadStories() {
    req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
