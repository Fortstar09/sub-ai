import { useCopyToClipboard } from "@/lib/hooks";

const ExampleComponent = ({ textToCopy }: { textToCopy: string }) => {
  const { copied, copyToClipboard } = useCopyToClipboard();

  return (
    <button
      onClick={() => copyToClipboard(textToCopy)}
      className="p-2 bg-gray-200 text-black rounded"
    >
      {copied ? 'Copied!' : 'Copy'}
    </button>
  );
};


export default ExampleComponent;
