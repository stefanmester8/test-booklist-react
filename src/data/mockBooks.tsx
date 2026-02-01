export type Book = {
  id: string;
  title: string;
  description?: string;
  imageUrl?: string;
};

export const initialBooks: Book[] = [
  {
    id: "1",
    title: "Book 1",
    description: "Description Book 1",
    imageUrl: "https://example.invalid/not-found.jpg"
  },
  {
    id: "2",
    title: "Book 2",
    description: "Description Book 2 Description Book 2 Description Book 2 Description Book 2 Description Book 2 Description Book 2 Description Book 2 Description Book 2",
    imageUrl: "https://media.istockphoto.com/id/173015527/photo/a-single-red-book-on-a-white-surface.jpg?s=612x612&w=0&k=20&c=AeKmdZvg2_bRY2Yct7odWhZXav8CgDtLMc_5_pjSItY=" ,
  },
  {
    id: "3",
    title: "No Description Book",
  },
];