import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BookList } from "../components/BookList";
import type { Book } from "../data/mockBooks";

const seedBooks: Book[] = [
  { id: "1", title: "A", description: "Desc A" },
  { id: "2", title: "B", description: "Desc B" },
];

describe("BookList", () => {
  it("adds a new book when clicking the button", async () => {
    const user = userEvent.setup();

    render(<BookList initialBooks={seedBooks} />);

    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(screen.getAllByRole("article").length).toBe(2);

    await user.click(screen.getByRole("button", { name: /add new book/i }));

    expect(screen.getAllByRole("article").length).toBe(3);

    expect(
    screen.getByRole("heading", { level: 3, name: /new book 3/i })
    ).toBeInTheDocument();  
  });
});
