import { createRoot } from "react-dom/client";
import App from "./App";

const rootElm = document.getElementById("root");

if (rootElm) {
  const root = createRoot(rootElm);
  root.render(<App />);
}
