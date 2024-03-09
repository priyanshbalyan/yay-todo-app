import "@/App.css";
import Home from "@/pages/Home";
import TodoProvider from "@/providers/TodoProvider";
import { Toaster } from "@/components/ui/toaster";

function App() {
  return (
    <>
      <TodoProvider>
        <Home />
        <Toaster />
      </TodoProvider>
    </>
  );
}

export default App;
