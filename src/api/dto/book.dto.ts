export class GetBookDTO {
  id: number | undefined;
  isbn: string | undefined;
  title: string | undefined;
  author: string | undefined;
  publisher: string | undefined;
  publicationYear: number | undefined;
  isAvailable: boolean | undefined;
}

export class CreateBookDTO {
  isbn: string | undefined;
  title: string | undefined;
  author: string | undefined;
  publisher: string | undefined;
  publicationYear: number | undefined;
  availableCopies: number | undefined;
}

export class CreateBookResponseDTO {
  isbn: string | undefined;
  title: string | undefined;
  author: string | undefined;
  publisher: string | undefined;
  publicationYear: number | undefined;
  availableCopies: number | undefined;
}

export class EditBookDTO {
  id: number | undefined;
  isbn: string | null | undefined;
  title: string | null | undefined;
  author: string | null | undefined;
  publisher: string | null | undefined;
  publicationYear: number | null | undefined;
  availableCopies: number | null | undefined;
}
