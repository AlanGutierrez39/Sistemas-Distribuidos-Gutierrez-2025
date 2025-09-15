async function obtenerUsuarios() {
  const respuesta = await fetch(`https://jsonplaceholder.typicode.com/users`);
  const usuarios = await respuesta.json();
  return usuarios;
}
async function obtenerPublicaciones(ID) {
  const respuesta = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${ID}`);
  const publicaciones = await respuesta.json();
  return publicaciones;
}
async function ejecucionSecuencial() {
  const usuarios = await obtenerUsuarios();
  console.log("Ejecución Secuencial\n");
  for (let i = 0; i < 3; i++) {
    const publicaciones = await obtenerPublicaciones(i+1)
    console.log(`${usuarios[i].name} tiene ${publicaciones.length} publicaciones`);
  }
}
async function ejecucionParalela() {
  const usuarios = await obtenerUsuarios();
  console.log("\nEjecución Paralela\n");
  const promesas = usuarios.map(usuario => obtenerPublicaciones(usuario.id));
  const resultados = await Promise.all(promesas);
  for (let i = 0; i < 3; i++) {
    console.log(`${usuarios[i].name} tiene ${resultados[i].length} publicaciones`);
  }
}
(async function main() {
  await ejecucionSecuencial();
  await ejecucionParalela();
})();