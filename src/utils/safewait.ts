export async function safewait<E extends Error = Error, T = unknown>(
  promise: Promise<T>,
): Promise<[T | null, E | null]> {
  return promise
    .then((response): [T, null] => {
      return [response, null];
    })
    .catch((error): [null, E] => {
      console.error(error);
      return [null, error];
    });
}
