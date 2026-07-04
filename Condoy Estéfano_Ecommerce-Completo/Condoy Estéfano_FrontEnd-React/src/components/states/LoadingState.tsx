export default function LoadingState({ label = "Cargando..." }: { label?: string }) {
  return (
    <div className="state-card loading-state">
      <div className="spinner" />
      <p>{label}</p>
    </div>
  );
}
