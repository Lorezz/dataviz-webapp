import { createMachine } from "xstate";

const stateMachine = createMachine({
  id: "app",
  initial: "upload",
  context: {
    data: "",
  },
  states: {
    idle: {},
    upload: {},
    choose: {},
    transform: {},
    generate: {},
    settings: {},
  },
  on: {
    UPLOAD: "upload",
    GEN: "generate",
    TRANSFORM: "transform",
    CHOOSE: "choose",
    SETTINGS: "settings",
  },
});

export default stateMachine;
