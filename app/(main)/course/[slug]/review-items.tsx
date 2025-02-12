import Image from "next/image";
import { ReviewActions } from "./review-actions";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { renderStars } from "@/lib/render-stars";
import { User } from "@prisma/client";
import { formatDate } from "@/lib/utils";
type CourseReviews = {
  id: string;
  rating: number;
  comment: string;
  createdAt: Date;
  user: Pick<User, "id" | "firstName" | "lastName" | "profileImage">;
}[];
type Props = {
  reviews: CourseReviews;
  averageRating: number;
};
const StudentFeedback = ({ reviews, averageRating }: Props) => {
  const ratingBreakdown = () => {
    const totalReviews = reviews.length;
    if (totalReviews === 0) return { 5: 100, 4: 0, 3: 0, 2: 0, 1: 0 };
    const ratingCounts = [5, 4, 3, 2, 1].map((star) => ({
      star,
      percentage: Math.round(
        (reviews.filter((r) => r.rating === star).length / totalReviews) * 100
      ),
    }));
    const totalPercentage = ratingCounts.reduce(
      (sum, { percentage }) => sum + percentage,
      0
    );
    const maxRating = ratingCounts.reduce((prev, curr) =>
      prev.percentage >= curr.percentage ? prev : curr
    );

    maxRating.percentage += 100 - totalPercentage;

    return Object.fromEntries(
      ratingCounts.map(({ star, percentage }) => [star, percentage])
    );
  };

  return (
    <div className="p-2 sm:p-4 bg-card dark:bg-inherit rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-6">Student Feedback</h2>
      <div className="space-y-2">
        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6 mb-4">
          <div className="bg-gray-50 rounded-sm dark:bg-gray-950 space-y-2 p-6 border shadow">
            <h2 className="text-5xl font-bold text-center">{averageRating}</h2>
            <div className="flex justify-center">
              {renderStars(Math.floor(averageRating))}
            </div>
            <p className="text-center text-muted-foreground">
              {reviews.length} Reviews
            </p>
          </div>
          <div className="space-y-2 md:flex-1 w-full xsm:px-2">
            {Object.entries(ratingBreakdown())
              .reverse()
              .map(([rating, percentage]) => (
                <div key={rating} className="flex items-center gap-2">
                  <div className="flex items-center w-[20%]">
                    {renderStars(parseInt(rating))}
                  </div>
                  <div className="w-[70%] h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 rounded-full"
                      style={{ width: `${percentage}%` }}></div>
                  </div>
                  <div className="w-[10%] text-right text-muted-foreground">
                    {percentage as number}%
                  </div>
                </div>
              ))}
          </div>
        </div>
        <h2 className="text-lg font-semibold my-6">
          Reviews ({reviews.length})
        </h2>
        <div className="space-y-6 xsm:p-2">
          {reviews && reviews.length > 0 ? (
            <ReviewItems reviews={reviews.slice(0, 3)} />
          ) : (
            <p className="text-muted-foreground">
              No reviews yet. Be the first to review this course and help other
              learners.
            </p>
          )}
          {reviews && reviews.length > 3 && (
            <div className="flex justify-end">
              <Dialog modal>
                <DialogTrigger asChild>
                  <Button disabled={!reviews}>Show all Reviews</Button>
                </DialogTrigger>
                <DialogContent className="max-h-[90vh] lg:min-w-[75%] xsm:max-h-[80vh] overflow-hidden">
                  <DialogHeader>
                    <DialogTitle className="text-lg sm:text-xl md:text-2xl font-semibold inline-flex items-center text-gray-800 dark:text-gray-200 gap-2 flex-wrap">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="1.5em"
                        height="1.5em"
                        className="w-6 h-6 text-orange-400 fill-orange-400">
                        <path
                          fill="currentColor"
                          d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2L9.19 8.63L2 9.24l5.46 4.73L5.82 21z"></path>
                      </svg>
                      {averageRating} course rating • {reviews.length} Reviews
                    </DialogTitle>
                    <DialogDescription>
                      See what all students are saying about this course.
                    </DialogDescription>
                  </DialogHeader>
                  {/* i need to scroll in this dialog */}
                  <div className="overflow-y-auto max-h-[70vh] p-2 border rounded-md">
                    <ReviewItems reviews={reviews} />
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentFeedback;

const ReviewItems = ({ reviews }: { reviews: CourseReviews }) => {
  return (
    <>
      {reviews.map((review) => (
        <div
          key={review.id}
          className="border-b border-input dark:border-b-gray-500 mb-4 last:border-0 relative pb-2">
          <div className="flex items-start gap-4">
            <Image
              width={48}
              height={48}
              src={review.user.profileImage || ""}
              alt={review.user.firstName}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex-1">
              <h4 className="font-semibold capitalize">{`${review.user.firstName} ${review.user.lastName}`}</h4>
              <span className="text-muted-foreground text-sm">
                {formatDate(review.createdAt)}
              </span>
              <div className="flex my-2">{renderStars(review.rating)}</div>
              <p className="text-muted-foreground">{review.comment}</p>
            </div>
          </div>
          <ReviewActions />
        </div>
      ))}
    </>
  );
};
