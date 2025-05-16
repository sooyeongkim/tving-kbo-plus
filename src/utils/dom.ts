import { createRoot, Root } from "react-dom/client";

export function injectAfter(node: React.ReactNode, target: HTMLElement): Root {
  const container = document.createElement("div");
  target.insertAdjacentElement("afterend", container);
  const root = createRoot(container);
  root.render(node);
  return root;
}

export function injectBefore(node: React.ReactNode, target: HTMLElement): Root {
  const container = document.createElement("div");
  target.insertAdjacentElement("beforebegin", container);
  const root = createRoot(container);
  root.render(node);
  return root;
}

export const waitForElement = async (
  querySelector: string
): Promise<Element> => {
  return await new Promise((resolve) => {
    const interval = setInterval(() => {
      const element = document.querySelector(querySelector);
      if (element !== null) {
        clearInterval(interval);
        resolve(element);
      }
    }, 100);
  });
};
