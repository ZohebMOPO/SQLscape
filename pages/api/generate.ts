import type { NextApiRequest,NextApiResponse } from "next";
import openai from "../../util/openai";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

const { database , tablename , fields , query } : {database:string,tablename:string,fields:string,query:string} = req.body;

const response = await openai.createCompletion({
  model: "code-davinci-002",
  prompt: `### ${database} SQL tables, with their properties:\n#\n# ${tablename} (${fields})\n  \n#\n### ${query} \n SELECT `,
  frequency_penalty: 0,
  presence_penalty: 0,
  stop: ["#", ";"],
});
const result = `SELECT ${response.data.choices[0].text}`;
res.status(200).json(result);
}