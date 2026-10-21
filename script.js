"use strict";

const form = document.getElementById("volume-form");
const output = document.getElementById("result");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const radiusInput = document.getElementById("radius");
  const heightInput = document.getElementById("height");
  const radius = Number(radiusInput.value);
  const height = Number(heightInput.value);
  const unit = document.getElementById("unit").value;

  if (!radiusInput.value.trim() || !heightInput.value.trim() ||
      !Number.isFinite(radius) || !Number.isFinite(height) ||
      radius <= 0 || height <= 0) {
    output.classList.add("error");
    output.textContent = "Please enter a positive radius and height.";
    return;
  }

  // Convert both measurements to centimeters before calculating V = pi*r^2*h.
  const factor = unit === "mm" ? 0.1 : 1;
  const radiusInCm = radius * factor;
  const heightInCm = height * factor;
  const volumeInCm3 = Math.PI * radiusInCm ** 2 * heightInCm;

  // Round to the nearest hundredth, without adding trailing zeroes.
  const volumeRounded = Math.round((volumeInCm3 + Number.EPSILON) * 100) / 100;
  output.classList.remove("error");
  output.textContent = `Volume = ${volumeRounded.toLocaleString("en-US", {maximumFractionDigits: 2})} cm³`;
});
