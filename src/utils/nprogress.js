import NProgress from "nprogress";
import "nprogress/nprogress.css";

NProgress.configure({
  showSpinner: false,
  trickleSpeed: 200,
  minimum: 0.085,
});

export function startProgress() {
  NProgress.start();
}

export function setProgress(percent) {
  NProgress.set(percent);
}

export function doneProgress() {
  NProgress.done();
}
