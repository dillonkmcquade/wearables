export async function Fetch(url, opts) {
  const refreshToken = window.localStorage.getItem("refreshToken");
  const req = await fetch(url, opts);

  if (req.status === 403) {
    const newReq = await fetch("/auth/refreshToken", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken: refreshToken }),
    });
    const data = await newReq.json();
    window.localStorage.setItem("accessToken", data.accessToken);
    window.localStorage.setItem("refreshToken", data.refreshToken);
    const retry = await fetch(url, {
      ...opts,
      headers: { ...opts.headers, Authorization: `Bearer ${data.accessToken}` },
    });
    return retry;
  }
  return req;
}
