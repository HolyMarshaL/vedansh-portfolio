"use client";
import { useState, useEffect } from "react";

interface DeviceOrientationState {
  normalizedX: number; // -1 to 1 (left/right tilt)
  normalizedY: number; // -1 to 1 (forward/back tilt)
  isActive: boolean;   // true if gyroscope data is actually arriving
}

/**
 * Returns device orientation data (gyroscope) normalized to -1..1.
 * Only activates on touch devices with a real gyroscope.
 * Falls back to { 0, 0, false } on desktop or unsupported devices.
 */
export function useDeviceOrientation(): DeviceOrientationState {
  const [state, setState] = useState<DeviceOrientationState>({
    normalizedX: 0,
    normalizedY: 0,
    isActive: false,
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Only activate on touch devices
    if (!("ontouchstart" in window) && navigator.maxTouchPoints === 0) return;
    if (typeof DeviceOrientationEvent === "undefined") return;

    let hasReceivedData = false;

    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma === null || e.beta === null) return;
      hasReceivedData = true;

      // gamma: left/right tilt, −90° to 90°. Normalize with ±30° as full range.
      const x = Math.max(-1, Math.min(1, (e.gamma ?? 0) / 30));

      // beta: front/back tilt. Phone held upright ≈ 75°. Offset then normalize.
      const y = Math.max(-1, Math.min(1, ((e.beta ?? 75) - 75) / 30));

      setState({ normalizedX: x, normalizedY: y, isActive: true });
    };

    window.addEventListener("deviceorientation", handleOrientation, true);

    // If no data after 1.5s, gyroscope is not available on this device
    const fallbackTimer = setTimeout(() => {
      if (!hasReceivedData) {
        setState({ normalizedX: 0, normalizedY: 0, isActive: false });
      }
    }, 1500);

    return () => {
      window.removeEventListener("deviceorientation", handleOrientation, true);
      clearTimeout(fallbackTimer);
    };
  }, []);

  return state;
}
