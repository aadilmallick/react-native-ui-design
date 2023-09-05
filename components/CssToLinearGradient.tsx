import React from "react";
import { LinearGradient, LinearGradientProps } from "expo-linear-gradient";
import { Dimensions } from "react-native";

const pattern2 =
  /^linear-gradient\(\s*(?:(\d+deg)(?:\s*,\s*))?((?:(#[a-fA-F0-9]{6,8}(?:\s*\d+%)?)(?:\s*,?\s*))+)\);?$/;

function parseLinearGradient(gradientString: string) {
  const matches = gradientString.match(pattern2);

  if (matches) {
    const angle = matches[1];
    const colorStops = matches[2].trim().split(/\s*,\s*/);

    return { angle, colorStops };
  }
  throw new Error("Invalid gradient string");
}

export interface CSSLinearGradientProps extends Partial<LinearGradientProps> {
  children?: React.ReactNode;
  cssString: string;
}

export function CSSLinearGradient({
  children,
  cssString,
  ...props
}: CSSLinearGradientProps) {
  const { angle, colorStops } = parseLinearGradient(cssString);

  const colors: string[] = [];
  const locations: number[] = [];

  colorStops.forEach((colorStop) => {
    const colorMatch = colorStop.match(/#[a-fA-F0-9]{6}/g);
    colors.push(colorMatch![0]);
    const locationMatch = colorStop.match(/\d+%$/g);
    if (locationMatch) {
      locations.push(parseFloat(locationMatch[0]) / 100);
    }
  });

  interface StartAndEnd {
    start?: { x: number; y: number };
    end?: { x: number; y: number };
  }

  //   left to right by default
  const angleObj: StartAndEnd = {
    start: { x: 0, y: 0.5 },
    end: { x: 1, y: 0.5 },
  };

  if (angle) {
    const gradientAngle = parseFloat(angle);
    const windowWidth = Dimensions.get("window").width;
    const windowHeight = Dimensions.get("window").height;
    const diagonal = Math.sqrt(
      windowWidth * windowWidth + windowHeight * windowHeight
    );
    const radian = ((gradientAngle + 90) * Math.PI) / 180;
    const endX = Math.round(diagonal * Math.cos(radian));
    const endY = Math.round(diagonal * Math.sin(radian));

    const startX = 0.5 + endX / diagonal / 2;
    const startY = 0.5 + endY / diagonal / 2;
    const endXRatio = -endX / diagonal;
    const endYRatio = -endY / diagonal;
    // get crazy start and end calculations
    const start = { x: startX, y: startY };
    const end = { x: startX + endXRatio, y: startY + endYRatio };
    angleObj.start = start;
    angleObj.end = end;
  }

  // only add locations if colors.length === locations.length
  const locationsObj: { locations?: number[] } = {};
  if (colors.length === locations.length) locationsObj.locations = locations;

  return (
    <LinearGradient colors={colors} {...props} {...locationsObj} {...angleObj}>
      {children}
    </LinearGradient>
  );
}
