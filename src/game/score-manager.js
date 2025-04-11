export default {
  earnedPoints(level, lines) {
    const pointsPerLine = {
      1: 40,
      2: 100,
      3: 300,
      4: 1200
    }

    return pointsPerLine[lines] * level
  },
  levelByCompletedLines(completedLines) {
    if (completedLines > 100) {
      return 10 + Math.floor(completedLines / 100)
    }

    return 1 + Math.floor(completedLines / 10)
  }
}
