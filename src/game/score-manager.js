export default {
  earnedPoints(level, lines) {
    const pointsPerLine = {
      1: 40,
      2: 100,
      3: 300,
      4: 1200
    }

    return pointsPerLine[lines] * level
  }
}
