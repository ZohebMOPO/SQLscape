import { NextApiRequest,NextApiResponse } from "next";
import openai from "../../util/openai";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

const { database , tablename , fields , query } : {database:string,tablename:string,fields:string,query:string} = req.body;

const response = await openai.createCompletion({
  model: "code-davinci-002",
  prompt: `### ${database} SQL tables, with their properties:\n#\n# ${tablename} (${fields})\n# Department(id, name, address)\n# Salary_Payments(id, employee_id, amount, date)\n#\n### ${query} \nSELECT`,
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