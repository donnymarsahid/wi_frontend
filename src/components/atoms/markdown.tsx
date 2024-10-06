import ReactMarkdown from "react-markdown";
import "../../app/blockStyle.css";

interface MarkdownComponentProps {
  markdown: string;
}

const MarkdownComponent = ({ markdown }: MarkdownComponentProps) => {
  return (
    <div className="customStyle">
      <ReactMarkdown>{markdown}</ReactMarkdown>
    </div>
  );
};

export default MarkdownComponent;
