import { useState, useCallback, useEffect } from 'react';

export function useDimensions() {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [node, setNode] = useState<HTMLDivElement | null>(null);

  const ref = useCallback((element: HTMLDivElement | null) => {
    setNode(element);
  }, []);

  useEffect(() => {
    if (!node) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setDimensions({ width, height });
      }
    });

    observer.observe(node);

    return () => observer.disconnect();
  }, [node]);

  return { ref, dimensions, node };
}
