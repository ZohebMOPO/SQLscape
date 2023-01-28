import type { NextApiRequest,NextApiResponse } from "next";
import openai from "../../util/openai";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

const { query } : {query:string} = req.body;

const response = await openai.createCompletion({
  model: "code-davinci-002",
  prompt: `###  \n#\n### ${query} optimise this query to make it more fast and short. \nSELECT `,
  temperature: 0,
  max_tokens: 150,  
  top_p: 1,
  frequency_penalty: 0, 
  presence_penalty: 0,
  stop: ["#", ";"],
});
const result = `SELECT ${response.data.choices[0].text}`;
res.status(200).json(result);
}