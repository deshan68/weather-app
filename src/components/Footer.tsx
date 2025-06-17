import { Text } from "./ui/text";

const Footer = () => {
  return (
    <footer className="w-full py-2">
      <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row justify-between items-start gap-1.5 text-center md:text-left">
        <Text size="xs" color="muted" weight={"light"} className="leading-none">
          Designed & Built by Arun Deshan
        </Text>
        <Text size="xs" color="muted" weight={"light"} className="leading-none">
          © {new Date().getFullYear()} Arun Deshan. All rights reserved.
        </Text>
        <Text size="xs" color="muted" weight={"light"} className="leading-none">
          Contact:{" "}
          <a
            href="mailto:arundeshan@gmail.com"
            className="hover:text-foreground"
          >
            arundeshan@gmail.com
          </a>
        </Text>
      </div>
    </footer>
  );
};

export default Footer;
