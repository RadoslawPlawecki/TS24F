import { GetBookDTO } from './book.dto';
import { GetUserSimplifiedDTO } from './user.dto';

export class GetRentalDTO {
  id: number | undefined;
  book: GetBookDTO | undefined;
  user: GetUserSimplifiedDTO | undefined;
  startDate: string | undefined;
  endDate: string | undefined;
  wasReturned: boolean | undefined;
}

export class UpdateRentalDTO {
  id: number | undefined;
  returnDate: string | null | undefined;
}

export class UpdateRentalResponseDTO {
  book: GetBookDTO | undefined;
  user: GetUserSimplifiedDTO | undefined;
  startDate: string | undefined;
  endDate: string | undefined;
  returnDate: string | undefined;
}

export class CreateRentalDTO {
  bookId: number | undefined;
  userId: number | undefined;
  endDate: string | undefined;
}

export class CreateRentalResponseDTO {
  book: GetBookDTO | undefined;
  userId: GetUserSimplifiedDTO | undefined;
  startDate: string | undefined;
  endDate: string | undefined;
}
