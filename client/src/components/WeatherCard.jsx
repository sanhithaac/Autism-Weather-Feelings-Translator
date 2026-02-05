export default function WeatherCard({ name, emoji }) {
  return (
    <div className="card">
      <h1>{emoji}</h1>
      <p>{name}</p>
    </div>
  );
}
