// api/cmd.js
export async function cmdEntrance(command) {
  try {
    const res = await fetch("https://api.ycity.top/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: command }),
    });

    if (!res.ok) {
      throw new Error(`Server returned ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (err) {
    return { ok: false, error: err.message, output: "" };
  }
}
