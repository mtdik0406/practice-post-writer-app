import { useMDXComponent } from "node_modules/next-contentlayer2/dist/hooks/useMDXComponent";
import Image from "next/image";
import Callout from "./callout";

interface MdxProps {
  code: string;
}

const components = {
  Image,
  Callout,
};

export default function Mdx({ code }: MdxProps) {
  const MDXContent = useMDXComponent(code);

  return (
    <div className="prose max-w-full">
      <MDXContent components={components} />
    </div>
  );
}
