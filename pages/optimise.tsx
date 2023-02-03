import Head from "next/head";
import { Input, Textarea, Button } from "@nextui-org/react";
import { useState } from "react";
import { Loading } from "@nextui-org/react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import copy from "copy-to-clipboard";
import { BsClipboard } from "react-icons/bs";

export default function Optimise() {
  const [data, setData] = useState<string>();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = new FormData(e.target);
    const dataObj = Object.fromEntries(form);
    const response = await fetch("/api/optimise", {
      method: "POST",
      body: JSON.stringify({
        query: dataObj.query,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setData(data);
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

      <main className="mx-10 max-[1024px]:flex max-[1024px]:flex-col-reverse">
        <div className="float-right w-[40rem] max-[1024px]:w-auto max-[1024px]:max-w-[40rem]">
          <SyntaxHighlighter
            customStyle={{
              borderRadius: "10px",
              padding: "1rem",
              height: "50rem",
            }}
            wrapLongLines={true}
            style={atomOneDark}
          >
            {data || "The Explanation will appear here."}
          </SyntaxHighlighter>
          <button
            type="button"
            value="copy text"
            className=" text-base md:text-xl cursor-pointer text-secondary mt-8 md:mt-2 rounded px-6 md:px-10 py-2 my-4 hover:bg-secondary hover:text-white border-2 border-secondary"
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
          <h1 className="text-3xl text-secondary font-bold mt-[4rem]  ">
            Optimize my <span className="text-secondary ">query</span> .
          </h1>
          <div className="max-w-[45rem] mt-[2rem] flex flex-col flex-wrap items-start pr-2">
            <a className="text-secondary">Your SQL Query</a>
            <Textarea
              className="my-5"
              size="xl"
              fullWidth
              name="query"
              status="warning"
              rows={8}
            />
            <a className="text-secondary">
              *Eg- SELECT * FROM students WHERE id = 5
            </a>
            <Button
              shadow
              size={"lg"}
              className="my-5"
              type="submit"
              color="warning"
              auto
            >
              {loading ? (
                <Loading color="currentColor" size="sm" />
              ) : (
                <div>Explain</div>
              )}
            </Button>
          </div>
        </form>
      </main>
    </>
  );
}
