export const createInput = (value: string, {xOffset, yOffset, width, height}) => {
  const input = document.createElement("input");
  input.type = "text";
  input.value = value;
  input.classList.add("edit-cell-input");

  input.style.position = "fixed";
  input.style.zIndex = "10"; // Ensure it appears above the canvas
  input.style.left = `${xOffset}px`;
  input.style.top = `${yOffset+1}px`;
  input.style.width = `${width || 100}px`; // Set a default 
  input.style.height = `${height-2}px`; // Set a default height
  input.style.border = "1px solid #ccc";
  input.style.padding = "4px";
  
  document.body.appendChild(input);
}