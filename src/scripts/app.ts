// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).paceOptions = {
    elements: {
        selectors: ["body", "main", ".tcv-content", ".container"],
    },
    document: true,
};
import "pace-js";
import "../vendor/pace-js/minimal.css";
// Import CSS File
import "@fontsource/open-sans";
import "../vendor/soft-ui-dashboard/css/nucleo-icons.css";
import "../vendor/soft-ui-dashboard/css/nucleo-svg.css";
import "../vendor/fontawesome/css/fontawesome.css";
import "../vendor/soft-ui-dashboard/css/soft-ui-dashboard.css";
import "filepond/dist/filepond.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import "../styles/custom.css";

// Import JS File
import { tcv_FirebaseApp } from "./utilities/firebase/app";

window.history.pushState(null, "", window.location.href);
if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker
            .register("/service-worker.js")
            .then((registration) => {
                console.log("SW registered: ", registration);
            })
            .catch((registrationError) => {
                console.log("SW registration failed: ", registrationError);
            });
    });
}

tcv_FirebaseApp.start();
