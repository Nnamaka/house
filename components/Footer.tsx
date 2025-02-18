import { Footerdemo } from "@/components/ui/footer-section";

interface FooterProps {
  className?: string; // Make className an optional prop of type string
}

export default function Footer({ className }: FooterProps) {
  const combinedClassName = `block ${className || ""}`;
  return (
    <div id="footer" className={combinedClassName}>
      <Footerdemo />
    </div>
  );
}

// export { Footer };
