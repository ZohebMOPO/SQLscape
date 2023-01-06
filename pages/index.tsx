import Head from "next/head";
import { Input, Textarea,Button } from "@nextui-org/react";
import { useState } from "react";

export default function Home() {

  const [data , setData] = useState();
  const [loading , setLoading] = useState(false);

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
  }
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
        <h1 className="text-3xl font-bold mt-[3rem]  ">
          Describe your <span className="text-secondary ">table</span> and{" "}
          <span className="text-secondary">fields</span>{" "}
        </h1>
        <div className="float-right w-[50rem]">
        <Textarea
        readOnly
        fullWidth
        size="xl"
        rows={27}   
        bordered     
        initialValue="Your query will appear here"
        className="text-center"
      />
        </div>
        <div className="w-[45rem] mt-[4rem]">
          
          <Input
            label="Table Name"
            fullWidth
            bordered
            size="xl"
            className="my-5  font-custom"
            placeholder="Eg :- Student"
          />
          <Input
            label="Fields "
            fullWidth
            bordered
            size="xl"
            className="my-5 font-custom"
            placeholder="Comma separated fields: id, name, email, etc"
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
            placeholder="Eg- Select all users from the table ."
            rows={8}
          />
          <Button shadow size={"lg"} className="my-5" color="secondary" auto>
          Give me the query
        </Button>
        </div>
       
      </main>
    </>
  );
}
