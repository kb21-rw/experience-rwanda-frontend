"use client";
import { useState, useCallback } from "react";

export function useToggle(initialValue = false) {
  const [isOpen, setIsOpen] = useState(initialValue);

  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);
  const close = useCallback(() => setIsOpen(false), []);

  return { isOpen, toggle, close };
}
