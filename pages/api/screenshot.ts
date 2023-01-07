import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { data }: { data: string } = req.body;

  const response = await fetch(
    `https://api.apyhub.com/generate/screenshot/webpage/image-url?url=${data}`,
    {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        "apy-token": `${process.env.APYHUB_SEC}`,
      },
      // data raw
      // Access-Control-Allow-Origin
    }
  );
  const result = await response.json();
  console.log(result);
  res.status(200).json(result);
}
