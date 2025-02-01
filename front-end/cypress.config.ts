import { defineConfig } from "cypress";

export default defineConfig({
    component: {
        devServer: {
            framework: "next",
            bundler: "webpack",
        },
    },
    // Unsafe, but it's to solve a localhost access issue. There's probably a better way to solve this, such as with whitelisting of some form, but I don't really have time to figure it out in detail.
    chromeWebSecurity: false,
});
