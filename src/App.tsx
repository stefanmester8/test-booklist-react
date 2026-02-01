import { BookList } from "./components/BookList";
import { initialBooks } from "./data/mockBooks";

export default function App() {
  return <BookList initialBooks={initialBooks} />;
}
