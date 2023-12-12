import Container from "@/components/Container";
import QueryProvider from "@/providers/QueryProvider";
import { MapProvider } from "./providers/MapProvider";

function App() {
  return (
    <QueryProvider>
      <MapProvider>
        <Container />
      </MapProvider>
    </QueryProvider>
  );
}

export default App;
