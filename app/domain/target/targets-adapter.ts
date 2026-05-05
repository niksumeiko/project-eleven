export async function fetchTarget() {
  const response = await fetch('http://localhost:3210/targets');
  return response.json();
}
