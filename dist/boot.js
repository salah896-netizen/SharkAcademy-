/* Start-up, loaded last. Every screen and helper now exists, so draw the current screen once,
 * then follow the address as Haytham moves around, then show the Tap to dive opening (opening.js).
 * Earlier files used to re-draw the screen while the app was still loading. */
window.addEventListener('hashchange', render);
render();
showTapToDive();
