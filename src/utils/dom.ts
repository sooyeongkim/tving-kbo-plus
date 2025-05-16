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

export async function waitForElement(
  selector: string,
  timeout: number = 5000
): Promise<HTMLElement | null> {
  const startTime = Date.now();
  while (document.querySelector(selector) === null) {
    // 타임아웃
    if (Date.now() - startTime >= timeout) {
      return null;
    }
    await new Promise((resolve) => requestAnimationFrame(resolve));
  }

  return document.querySelector(selector) as HTMLElement;
}
