// Template registry — import everything, export in one list so app.js
// can register them in a single loop.

import { flightSimTemplate }      from "./flight-sim.js";
import { physicsSim2dTemplate }   from "./physics-sim-2d.js";
import { snakeTemplate }          from "./snake.js";
import { tetrisTemplate }         from "./tetris.js";
import { pongTemplate }           from "./pong.js";
import { breakoutTemplate }       from "./breakout.js";
import { platformer2dTemplate }   from "./platformer-2d.js";
import { todoAppTemplate }        from "./todo-app.js";
import { calculatorTemplate }     from "./calculator.js";
import { stopwatchTemplate }      from "./stopwatch.js";
import { landingPageTemplate }    from "./landing-page.js";
import { dashboardTemplate }      from "./dashboard.js";
import { paintCanvasTemplate }    from "./paint-canvas.js";
import { musicVisualizerTemplate } from "./music-visualizer.js";
import { chatAppTemplate }        from "./chat-app.js";

export const allTemplates = [
  flightSimTemplate,
  physicsSim2dTemplate,
  snakeTemplate,
  tetrisTemplate,
  pongTemplate,
  breakoutTemplate,
  platformer2dTemplate,
  todoAppTemplate,
  calculatorTemplate,
  stopwatchTemplate,
  landingPageTemplate,
  dashboardTemplate,
  paintCanvasTemplate,
  musicVisualizerTemplate,
  chatAppTemplate,
];
