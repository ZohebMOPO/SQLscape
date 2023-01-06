import { NextApiRequest,NextApiResponse } from "next";
import openai from "../../util/openai";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

const response = await openai.createCompletion({
  model: "code-davinci-002",
  prompt: "### Postgres SQL tables, with their properties:\n#\n# Employee(id, name, department_id)\n# Department(id, name, address)\n# Salary_Payments(id, employee_id, amount, date)\n#\n### A query to list the names of the departments which employed more than 10 employees in the last 3 months\nSELECT",
  temperature: 0,
  max_tokens: 150,
  top_p: 1,
  frequency_penalty: 0,
  presence_penalty: 0,
  stop: ["#", ";"],
});
res.status(200).json({ message: response.data.choices[0].text });
}