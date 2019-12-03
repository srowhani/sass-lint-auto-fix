declare module 'merge' {
  export function recursive<A, B>(clone: boolean, a: A, b: B): A & B;
}
