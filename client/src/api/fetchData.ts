export default async function fetchData<T>(
  url: string,
  init: RequestInit,
  onResponseError: () => void,
  on404: () => void,
): Promise<T> {
  const res = await fetch(url, init);

  if (!res.ok) {
    if (res.status === 404) {
      on404();
    } else {
      onResponseError();
    }
  }

  const data = await res.json();

  return data;
}
