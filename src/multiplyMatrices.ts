const multiplyTwoMatrices = (A: number[][], B: number[][]) => {
  const resultMatrix: number[][] = [];
  for (let i = 0; i < A.length; i++) {
    resultMatrix[i] = [];
    for (let j = 0; j < B.length; j++) {
      resultMatrix[i][j] = 0;
      for (let k = 0; k < A[i].length; k++) {
        resultMatrix[i][j] += A[i][k] * B[k][j];
      }
    }
  }
  return resultMatrix;
};

const multiplyMatrices = (...matrices: number[][][]) => {
  return matrices.reduce((prev, curr) => multiplyTwoMatrices(prev, curr));
};

export default multiplyMatrices;
