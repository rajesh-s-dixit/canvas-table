export const drawLine = (
  context: CanvasRenderingContext2D,
  xOffset: number,
  yOffset: number,
  strokeStyle: string,
  directtion: "horizontal" | "vertical" = "horizontal",
): void => {
  context.beginPath();
  if (directtion === "horizontal") {
    context.moveTo(0, yOffset);
  } else {
    context.moveTo(xOffset, 0);
  }
  context.lineTo(xOffset, yOffset);
  context.strokeStyle = strokeStyle;
  context.stroke();
  context.closePath();
};

export const drawText = (
  context: CanvasRenderingContext2D,
  text: string,
  params: Partial<CanvasRenderingContext2D>,
  xOffset: number,
  yOffset: number,
): void => {
  context.fillStyle = text;
  for (let key in params) {
    if (params.hasOwnProperty(key)) {
      // @ts-ignore
      context[key] = params[key];
    }
  }
  context.beginPath();
  context.fillText(text, xOffset + 5, yOffset + 20);
  context.closePath();
};

export const drawRect = (
  context: CanvasRenderingContext2D,
  color: string,
  xOffset: number,
  yOffset: number,
  columnWidth: number,
  rowHeight: number,
) => {
  context.beginPath();
  context.strokeStyle = color;
  context.strokeRect(xOffset, yOffset, columnWidth, rowHeight);
  context.closePath();
};
