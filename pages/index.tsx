import Head from "next/head";
import { Input, Textarea, Button } from "@nextui-org/react";
import { useState } from "react";
import { Loading } from "@nextui-org/react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import { format } from "sql-formatter";
import copy from "copy-to-clipboard";
import { useUser } from "@auth0/nextjs-auth0/client";
import { BsClipboard } from "react-icons/bs";
import Link from "next/link";

export default function Home() {
  const [data, setData] = useState<string>();
  const [loading, setLoading] = useState(false);
  const { user, isLoading } = useUser();

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = new FormData(e.target);
    const dataObj = Object.fromEntries(form);
    const response = await fetch("/api/generate", {
      method: "POST",
      body: JSON.stringify({
        database: dataObj.database,
        tablename: dataObj.tablename,
        fields: dataObj.fields,
        query: dataObj.query,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    const formatted = format(data);
    setData(formatted);
    setLoading(false);
  };
  return (
    <>
      <Head>
        <title>SQLscape</title>
        <meta name="description" content="Your SQL query writer" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=chillax@400&display=swap"
          rel="stylesheet"
        />
      </Head>

      <main className="mx-10">
        {!user && (
          <div>
            <div className="grid h-screen place-items-center">
              <Link
                href={"/api/auth/login"}
                className="bg-blue-500  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shadow-lg focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Sign In with Auth0
              </Link>
            </div>
          </div>
        )}
        {user && (
          <div>
            <h1 className="text-3xl font-bold mt-[3rem]  ">
              Describe your <span className="text-secondary ">table</span> and{" "}
              <span className="text-secondary">fields</span>{" "}
            </h1>
            <div className="float-right w-[50rem]">
              <SyntaxHighlighter
                language="sql"
                customStyle={{
                  borderRadius: "10px",
                  padding: "1rem",
                  height: "50rem",
                }}
                style={atomOneDark}
              >
                {data || "Your Query Will Appear here."}
              </SyntaxHighlighter>
              <button
                type="button"
                value="copy text"
                className=" text-base md:text-xl cursor-pointer z-10 text-secondary mt-8 md:mt-2 rounded px-6 md:px-10 py-2 my-4 hover:bg-secondary hover:text-white border-2 border-secondary"
                onClick={() => {
                  copy(`${data || " "}`);
                  alert("Copied to clipboard");
                }}
              >
                {" "}
                <BsClipboard className="inline" />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mt-5">Database</div>
              <select
                name="database"
                className="md:text-lg text-base resize rounded-md mt-5 mb-2 py-3 md:py-3 px-3 md:px-5 text-black bg-[#FBF1D3] border-2 hover:border-black border-[#D9D9D9]"
              >
                <option value="Postgres">Postgres</option>
                <option value="MySQL">MySQL</option>
                <option value="MongoDB">MongoDB</option>
              </select>
              <div className="w-[45rem] mt-[2rem]">
                <Input
                  label="Tables Name"
                  fullWidth
                  bordered
                  name="tablename"
                  size="xl"
                  className="my-5  font-custom"
                  placeholder="Eg :- Comma separated fields: Employee , Department,Salary_Payments"
                />
                <Input
                  label="Fields "
                  fullWidth
                  bordered
                  name="fields"
                  size="xl"
                  className="my-5 font-custom"
                  placeholder="Comma separated fields: (id, name, department_id),(id, name, address)"
                />
              </div>
              <h1 className="text-3xl font-bold mt-[4rem]  ">
                What action do you want your{" "}
                <span className="text-secondary ">query</span> to perform?
              </h1>
              <div className="w-[45rem] mt-[2rem]">
                <Textarea
                  label="Query instructions"
                  bordered
                  className="my-5"
                  size="xl"
                  fullWidth
                  name="query"
                  placeholder="Eg- Select all users from the table ."
                  rows={8}
                />
                <Button
                  shadow
                  size={"lg"}
                  className="my-5"
                  type="submit"
                  color="secondary"
                  auto
                >
                  {loading ? (
                    <Loading color="currentColor" size="sm" />
                  ) : (
                    <div>Give me the query</div>
                  )}
                </Button>
              </div>
            </form>
          </div>
        )}
      </main>
    </>
  );
}
