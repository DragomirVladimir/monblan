import "flatpickr/dist/flatpickr.min.css";
import { initHeaderHeight } from "./src/js/utils/getHeaderHeight";
import { initViewToggle } from "./src/js/modules/viewToggle";
import { initRenderPosts } from "./src/js/modules/renderPosts";
import { initDatepicker } from "./src/js/modules/datepicker";

initHeaderHeight("#header");
initViewToggle();
initRenderPosts();
initDatepicker();
