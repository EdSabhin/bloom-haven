function limitWords(text: string, wordCount: number) {
  let words = text.split(" ");
  let limitedText = words.slice(0, wordCount).join(" ");
  return limitedText;
}

export default limitWords;
