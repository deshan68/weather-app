import { useTheme } from "@/providers/ThemeProvider";
import { Text } from "./ui/text";
import { cn } from "@/lib/utils";

const Footer = () => {
  const { theme } = useTheme();
  return (
    <footer className="w-full py-2">
      <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row justify-between items-start gap-1.5 text-center md:text-left">
        <Text
          size="xs"
          weight={"light"}
          color="muted"
          className={cn("leading-none", theme === "weather" && "text-white")}
        >
          Designed & Built by Arun Deshan
        </Text>
        <Text
          size="xs"
          color="muted"
          weight={"light"}
          className={cn("leading-none", theme === "weather" && "text-white")}
        >
          © {new Date().getFullYear()} Arun Deshan. All rights reserved.
        </Text>
        <Text
          size="xs"
          color="muted"
          weight={"light"}
          className={cn("leading-none", theme === "weather" && "text-white")}
        >
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
