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
type Review = {
  name: string;
  rating: number;
  date: string;
  image: string;
  comment: string;
};
type Props = {
  // eslint-disable-next-line
  course: {} | any;
};
const StudentFeedback = ({ course }: Props) => {
  return (
    <div className="p-2 sm:p-4 bg-card dark:bg-inherit rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-6">Student Feedback</h2>
      <div className="space-y-2">
        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6 mb-4">
          <div className="bg-gray-50 rounded-sm dark:bg-indigo-950 space-y-2 p-6 border shadow">
            <h2 className="text-5xl font-bold text-center">{course.rating}</h2>
            <div className="flex justify-center">
              {renderStars(Math.floor(course.rating))}
            </div>
            <p className="text-center text-muted-foreground">
              {course.studentReviews.length} Reviews
            </p>
          </div>
          <div className="space-y-2 md:flex-1 w-full xsm:px-2">
            {Object.entries(course.ratingBreakdown)
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
          Reviews ({course.studentReviews.length})
        </h2>
        <div className="space-y-6 xsm:p-2">
          <ReviewItems reviews={course.studentReviews.slice(0, 3)} />
          <div className="flex justify-end">
            <Dialog>
              <DialogTrigger asChild>
                <Button>Show all Reviews</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>All Reviews</DialogTitle>
                  <DialogDescription>
                    See what all students are saying about this course.
                  </DialogDescription>
                </DialogHeader>
                <ReviewItems reviews={course.studentReviews} />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentFeedback;

const ReviewItems = ({ reviews }: { reviews: Review[] }) => {
  return (
    <>
      {reviews.map((review: Review, index: number) => (
        <div
          key={index}
          className="border-b border-input dark:border-b-gray-500 pb-4 last:border-0 relative">
          <div className="flex items-start gap-4">
            <Image
              width={48}
              height={48}
              src={review.image}
              alt={review.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex-1">
              <h4 className="font-semibold">{review.name}</h4>
              <span className="text-muted-foreground text-sm">
                {review.date}
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


