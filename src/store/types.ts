export type AsyncEntity<T, R> = {
  data: T | null;
  status: "idle" | "loading" | "success" | "fail";
  error: R | null;
};
