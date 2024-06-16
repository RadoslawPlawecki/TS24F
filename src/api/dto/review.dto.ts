import { GetBookDTO } from './book.dto';
import { GetUserSimplifiedDTO } from './user.dto';

export class CreateReviewDTO {
  bookId: number | undefined;
  userId: number | undefined;
  rating: number | null | undefined;
  comment: string | null | undefined;
}

export class CreateReviewResponseDTO {
  book: GetBookDTO | undefined;
  user: GetUserSimplifiedDTO | undefined;
  rating: number | null | undefined;
  comment: string | null | undefined;
  reviewDate: string | undefined;
}

export class GetReviewDTO {
  id: number | undefined;
  book: GetBookDTO | undefined;
  user: GetUserSimplifiedDTO | undefined;
  rating: number | undefined;
  comment: string | undefined;
  reviewDate: string | undefined;
}

export class EditReviewDTO {
  id: number | undefined;
  rating: number | null | undefined;
  comment: string | null | undefined;
}

export class EditReviewResponseDTO {
  book: GetBookDTO | undefined;
  user: GetUserSimplifiedDTO | undefined;
  rating: number | null | undefined;
  comment: string | null | undefined;
  reviewDate: string | undefined;
}
