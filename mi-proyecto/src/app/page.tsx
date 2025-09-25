type Props = {
  nombre: string;
};

function Saludo({ nombre }: Props) {
  return (
    <h1>Hola, {nombre}</h1>
  );
}

export default function Home() {
  return (
    <main>
      <Saludo nombre="Usuario" />
    </main>
  );
}