function cosineSimilarity(a: number[] | undefined, b: number[] | undefined): number {
  if (a !== undefined && b !== undefined) {
    let dot = 0;
    let normA = 0;
    let normB = 0;
    for (let i = 0; i < a.length; i++) {
      dot += a[i]! * b[i]!;
      normA += a[i]! * a[i]!;
      normB += b[i]! * b[i]!;
    }
    const normProduct = Math.sqrt(normA) * Math.sqrt(normB);
    if (normProduct === 0) {
      return 0;
    }
    return dot / normProduct;
  } else {
    return 0;
  }
}

export default cosineSimilarity