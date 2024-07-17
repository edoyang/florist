import ReviewStarSvg from '../../assets/review.svg';
import ReviewStar0Svg from '../../assets/review_0.svg';

const ReviewStar = ({ review }) => {
  const fullStars = Math.floor(review);
  const halfStar = review % 1 >= 0.5 ? 1 : 0;

  return (
    <>
      {Array(5).fill().map((_, idx) => (
        idx < fullStars ? (
          <img key={idx} src={ReviewStarSvg} alt="full star"/>
        ) : (idx === fullStars && halfStar === 1) ? (
          <img key={idx} src={ReviewStar0Svg} alt="half star"/>
        ) : (
          <img key={idx} src={ReviewStar0Svg} alt="empty star"/>
        )
      ))}
    </>
  );
};

export default ReviewStar;