export const THEME_KEY = "ec-theme";

/**
 * Runs in <head> before first paint: apply the saved choice, otherwise the system setting.
 * Kept tiny and dependency-free; it is inlined as a string.
 */
export const themeScript = `(function(){try{var t=localStorage.getItem("${THEME_KEY}");if(t!=="light"&&t!=="dark"){t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`;
