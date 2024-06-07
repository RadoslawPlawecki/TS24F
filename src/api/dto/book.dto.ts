export class GetBookDTO {
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
