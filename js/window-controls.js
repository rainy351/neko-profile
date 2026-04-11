class WindowControls extends HTMLElement {
  connectedCallback() {
    const container = document.createElement("div");
    container.className = "buttons";

    const createButton = (type, title) => {
      const btn = document.createElement("button");
      btn.className = "clickButton";
      btn.setAttribute("title", title);
      btn.setAttribute("aria-label", title);
      btn.appendChild(this.getIcon(type));
      return btn;
    };

    container.appendChild(createButton("minimize", "Minimize"));
    container.appendChild(createButton("maximize", "Maximize"));
    container.appendChild(createButton("close", "Close"));

    this.appendChild(container);
  }

  getIcon(type) {
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("viewBox", "0 0 12 12");
    svg.setAttribute("shape-rendering", "crispEdges");

    if (type === "minimize") {
      const rect = document.createElementNS(svgNS, "rect");
      rect.setAttribute("x", "2");
      rect.setAttribute("y", "6");
      rect.setAttribute("width", "8");
      rect.setAttribute("height", "1");
      svg.appendChild(rect);
    } else if (type === "maximize") {
      const rect = document.createElementNS(svgNS, "rect");
      rect.setAttribute("x", "2");
      rect.setAttribute("y", "2");
      rect.setAttribute("width", "8");
      rect.setAttribute("height", "8");
      rect.setAttribute("fill", "none");
      rect.setAttribute("stroke", "black");
      rect.setAttribute("stroke-width", "1");
      svg.appendChild(rect);
    } else if (type === "close") {
      const line1 = document.createElementNS(svgNS, "line");
      line1.setAttribute("x1", "3");
      line1.setAttribute("y1", "3");
      line1.setAttribute("x2", "9");
      line1.setAttribute("y2", "9");
      line1.setAttribute("stroke", "black");
      line1.setAttribute("stroke-width", "1");
      const line2 = document.createElementNS(svgNS, "line");
      line2.setAttribute("x1", "9");
      line2.setAttribute("y1", "3");
      line2.setAttribute("x2", "3");
      line2.setAttribute("y2", "9");
      line2.setAttribute("stroke", "black");
      line2.setAttribute("stroke-width", "1");
      svg.appendChild(line1);
      svg.appendChild(line2);
    }
    return svg;
  }
}

customElements.define("window-controls", WindowControls);
