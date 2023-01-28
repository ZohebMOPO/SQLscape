export default function Footer() {
  return (
    <>
      <div className="flex justify-center items-center h-16 text-secondary">
        <p className="text-center">
          Made with ❤️ by{" "}
          <a
            className="hover:underline text-secondary font-bold"
            href="https://twitter.com/theanuragdev"
          >
            Anurag{" "}
          </a>{" "}
          and{" "}
          <a
            className="hover:underline text-secondary font-bold"
            href="https://twitter.com/zokhcat"
          >
            Zoheb
          </a>
        </p>
      </div>
    </>
  );
}
