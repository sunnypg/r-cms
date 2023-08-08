import handler from "./index";

const reducer = (state = { ...handler.state }, action: { type: string }) => {
  const newState = JSON.parse(JSON.stringify(state));

  for (const key in handler.actionNames) {
    if (action.type === handler.actionNames[key]) {
      handler.actions[handler.actionNames[key]](newState, action);
      break;
    }
  }

  return newState;
};
export default reducer;
