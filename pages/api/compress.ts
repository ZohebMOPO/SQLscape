import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { data } = req.body;

  const response = await fetch(
    `https://api.apyhub.com/processor/image/compress/file-urls?output=test-sample.png&quality=90`,
    {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        "apy-token": `${process.env.APYHUB_SEC}`,
      },
      // data raw
      body: JSON.stringify({
        url: `${data}`,
      }),
      // Access-Control-Allow-Origin
    }
  );
  const result = await response.json();
  console.log(result);
    res.status(200).json(result);
}
