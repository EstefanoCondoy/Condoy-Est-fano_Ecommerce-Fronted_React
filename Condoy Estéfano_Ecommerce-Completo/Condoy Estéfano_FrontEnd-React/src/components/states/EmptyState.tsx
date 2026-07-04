import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";

export default function EmptyState({
  title,
  description,
  action
}: {
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="state-card empty-state">
      <span className="state-icon"><Inventory2OutlinedIcon /></span>
      <h2>{title}</h2>
      <p>{description}</p>
      {action}
    </div>
  );
}
