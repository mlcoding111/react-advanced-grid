import React, { useState, useRef } from "react";
import { useGrid } from "../../hooks/useGrid";

const ITEM_SIZE = 40;
const BORDER_SIZE = 1;

const createInitialData = (rows: number, columns: number): string[][] => {
  return Array.from({ length: rows }, () => Array(columns).fill(""));
};

const Cell: React.FC<{ content: string; onClick: () => void }> = React.memo(({ content, onClick }) => {
  return (
    <div
      className="hover:bg-gray-200"
      style={{
        width: ITEM_SIZE,
        height: ITEM_SIZE,
        borderRight: `${BORDER_SIZE}px solid black`,
        borderBottom: `${BORDER_SIZE}px solid black`,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        boxSizing: "border-box",
      }}
      onClick={onClick}
    >
      {content}
    </div>
  );
});

function Grid({ size = 25, rows = 6, columns = 6 }: { size?: number; rows?: number; columns?: number }) {
  const effectiveRows = size ? size : rows;
  const effectiveColumns = size ? size : columns;

  const gridWidth = effectiveColumns * ITEM_SIZE;
  const gridHeight = effectiveRows * ITEM_SIZE;

  const containerWidth = 500; // Set container width (adjust based on your layout)
  const containerHeight = 500; // Set container height

  const [cellData, setCellData] = useState<string[][]>(createInitialData(effectiveRows, effectiveColumns));
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const startPos = useRef({ x: 0, y: 0 });

  const handleCellUpdate = (row: number, column: number) => {
    setCellData((prevData) => {
      const newData = prevData.map((arr) => [...arr]);
      newData[row][column] = "X";
      return newData;
    });
  };

  const handleMouseDown = (event: React.MouseEvent) => {
    setDragging(true);
    startPos.current = { x: event.clientX - offset.x, y: event.clientY - offset.y };
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    if (!dragging) return;

    // Calculate new potential position
    let newX = event.clientX - startPos.current.x;
    let newY = event.clientY - startPos.current.y;

    // Collision Detection - Restrict movement within boundaries
    const minX = -(gridWidth - containerWidth);
    const minY = -(gridHeight - containerHeight);
    const maxX = 0;
    const maxY = 0;

    newX = Math.max(minX, Math.min(maxX, newX));
    newY = Math.max(minY, Math.min(maxY, newY));

    setOffset({
      x: event.clientX - startPos.current.x,
      y: event.clientY - startPos.current.y,
    });

    // Whitout offset
    // setOffset({ x: newX, y: newY });
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  return (
    <div
      className="relative bg-gray-100 select-none"
      // disable text selection
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      style={{
        width: `${containerWidth}px`,
        height: `${containerHeight}px`,
        position: "relative",
        overflow: "hidden",
        border: "2px solid black",
      }}
    >
      {/* Draggable Grid Container */}
      <div
        onMouseDown={handleMouseDown}
        className="absolute cursor-grab active:cursor-grabbing"
        style={{
          transform: `translate(${offset.x}px, ${offset.y}px)`,
          display: "grid",
          width: `${gridWidth}px`,
          height: `${gridHeight}px`,
          borderTop: `${BORDER_SIZE}px solid black`,
          borderLeft: `${BORDER_SIZE}px solid black`,
          borderCollapse: "collapse",
          gridTemplateColumns: `repeat(${effectiveColumns}, ${ITEM_SIZE}px)`,
        }}
      >
        {Array.from({ length: effectiveRows * effectiveColumns }).map((_, index) => {
          const row = Math.floor(index / effectiveColumns);
          const column = index % effectiveColumns;
          const content = cellData[row][column] || index + 1;

          return <Cell key={index} content={content.toString()} onClick={() => handleCellUpdate(row, column)} />;
        })}
      </div>
    </div>
  );
}

export default Grid;
