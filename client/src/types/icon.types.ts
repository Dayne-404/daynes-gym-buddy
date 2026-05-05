import type { ComponentType } from "react";

export type IconlyIcon = ComponentType<{
  set?: "light" | "bold" | "broken" | "two-tone" | "curved";
  primaryColor?: string;
  secondaryColor?: string;
  stroke?: string;
  size?: number | "small" | "medium" | "large" | "xlarge";
  className?: string;
}>;
