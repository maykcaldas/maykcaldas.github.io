import { ToolIcon } from './ToolIcon';

export interface ToolGroup {
  title: string;
  tools: string[];
}

export function Toolkit({ groups }: { groups: ToolGroup[] }) {
  return (
    <div className="toolkit">
      {groups.map(({ title, tools }) => (
        <div key={title}>
          <h3>{title}</h3>
          <ul className="tags tool-tags">
            {tools.map((tool) => (
              <li key={tool}>
                <ToolIcon name={tool} />
                <span>{tool}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
