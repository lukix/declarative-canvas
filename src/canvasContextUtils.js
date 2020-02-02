export const setContextProps = (context, contextProps = {}) => {
  Object.entries(contextProps).forEach(([key, value]) => {
    context[key] = value;
  });
};

export const fillAndStroke = (context, fill, stroke) => {
  if (fill) {
    context.fill();
  }
  if (stroke) {
    context.stroke();
  }
};
