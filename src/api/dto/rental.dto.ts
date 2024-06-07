import { GetBookDTO } from './book.dto';
import { GetUserSimplifiedDTO } from './user.dto';

export class GetRentalDTO {
  book: GetBookDTO | undefined;
  user: GetUserSimplifiedDTO | undefined;
  startDate: string | undefined;
  endDate: string | undefined;
  wasReturned: boolean | undefined;
}

export class UpdateRentalDTO {
  returnDate: string | undefined;
}

export class UpdateRentalResponseDTO {
  book: GetBookDTO | undefined;
  user: GetUserSimplifiedDTO | undefined;
  startDate: string | undefined;
  endDate: string | undefined;
  returnDate: string | undefined;
}
