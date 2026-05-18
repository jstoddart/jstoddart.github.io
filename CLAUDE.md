# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is a GitHub Pages static site (`jstoddart.github.io`) with no build system, no package manager, and no transpilation — vanilla HTML/CSS/JS served directly. `.nojekyll` disables Jekyll processing.

## Deployment

Push to `master` deploys automatically via GitHub Pages. To preview locally, open HTML files directly in a browser or use any static file server (e.g. `python3 -m http.server`).

## Architecture

There are two parallel genetic algorithm (GA) systems:

### Text GA (`_js/DNA.js` + `_js/Population.js`)
Used by `index.html`. Evolves a random-character population toward a target string (`"JSTODDART"`). Fitness is scored by exact and case-insensitive character matches (exact = 1pt, case-insensitive = 0.5pt). Mating pool size is proportional to fitness. Mutation rate increases when the population converges (>20% of members share the top genome). Runs with `setTimeout` at 50ms intervals.

### Image GA (`_js/DNA.img.js` + `_js/Population.img.js` + `_js/girl*.js`)
Used by `girl20.html`, `girl50.html`, `girl100.html`. Evolves pixel arrays toward a target image. Fitness is mean absolute RGB channel difference (lower = better, so sort order is reversed vs. text GA). Mating pool selection uses fitness range normalization. Runs at 10ms intervals with a 5-second startup delay. The `girl*.js` files are pre-encoded RGB pixel arrays for the target images at 20×20, 50×50, and 100×100 resolutions.

### Key differences between the two systems
- Text fitness: higher is better → sorted descending; image fitness: lower is better → sorted ascending
- Image `DNA.mate()` uses a three-way blend (take from parent A, parent B, or average), vs. text which picks one parent per character
- Image population uses fitness range normalization for mating pool weighting; text uses raw fitness scores
