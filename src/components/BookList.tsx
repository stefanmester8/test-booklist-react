import { useMemo, useState } from "react";
import type { Book } from "../data/mockBooks";
import { BookItem } from "./BookItem";

type BookListProps = {
  initialBooks: Book[];
};

function makeId() {
  return crypto.randomUUID?.() ?? String(Date.now() + Math.random());
}

export function BookList({ initialBooks }: BookListProps) {
  const [books, setBooks] = useState<Book[]>(initialBooks);

  const nextIndex = useMemo(() => books.length + 1, [books.length]);

  function addNewBook() {
    const newBook: Book = {
      id: makeId(),
      title: `New Book ${nextIndex}`,
      description: `Auto-generated description for New Book ${nextIndex}.`,
    };

    setBooks((prev) => [...prev, newBook]);
  }

  return (
    <section aria-label="Book list" style={wrapStyles.section}>
      <header style={wrapStyles.header}>
        <h2 style={{ margin: 0 }}>Books</h2>
        <button type="button" onClick={addNewBook} style={wrapStyles.addBtn}>
          Add new book
        </button>
      </header>

      <ul role="list" style={wrapStyles.list}>
        {books.map((b) => (
          <li key={b.id} style={wrapStyles.listItem}>
            <BookItem title={b.title} description={b.description} imageUrl={b.imageUrl} />
          </li>
        ))}
      </ul>
    </section>
  );
}

const wrapStyles: Record<string, React.CSSProperties> = {
  section: { maxWidth: 900, margin: "24px auto", padding: "0 16px", fontFamily: "Arial" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 },
  addBtn: {
    border: "1px solid #cbd5e1",
    background: "#fff",
    color: "#000",
    padding: "8px 12px",
    borderRadius: 8,
    cursor: "pointer",
  },
  list: { listStyle: "none", padding: 0, margin: "12px 0 0 0", display: "grid", gap: 12 },
  listItem: { margin: 0 },
};
