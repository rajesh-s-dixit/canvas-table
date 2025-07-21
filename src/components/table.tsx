import { useEffect, useRef, useState } from "react";
import { createGridLines, getCell, getDimension, highlightCellBorder } from "./tableUtils";

export interface ICanvasTableProps {
  config: any; // Define the type of config based on your requirements
}
export const CanvasTable = (props: ICanvasTableProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [selectedCell, setSelectedCell] = useState<ReturnType<typeof getCell> | null>(null);

  const getCanvasContext = (): CanvasRenderingContext2D | null => {
    const canvas: HTMLCanvasElement | null = canvasRef.current;
    if (!canvas) {
      throw new Error("Canvas element is not available");
    } else
      return canvas.getContext('2d');
  }

  const renderTable = () => {
    const context = getCanvasContext();
    if (!context) return;
    
    createGridLines(props.config, context);
  }
  const handleClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const context = getCanvasContext();
    if (!context) return;
    if (selectedCell) {
      createGridLines(props.config, context);
    }
    const cellData = getCell(props.config, event);
    setSelectedCell(cellData);
    highlightCellBorder(context, cellData, props.config.theme);
  }

  useEffect(() => renderTable(), []);
  useEffect(() => renderTable(), [props.config]);

  const { height, width} = getDimension(props.config);
  return (
    <div className="table-container">
      <canvas ref={canvasRef} height={height} width={width} onClick={handleClick}/>
    </div>
  )
}