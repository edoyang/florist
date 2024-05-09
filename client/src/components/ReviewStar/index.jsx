import ReviewStarSvg from '../../assets/review.svg';
import ReviewStar0Svg from '../../assets/review_0.svg';

const ReviewStar = ({ review }) => {
  const fullStars = Math.floor(review);
  const halfStar = review % 1 >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStar;

  return (
    <>
      {Array(fullStars).fill().map((_, idx) => (
        <img key={idx} src={ReviewStarSvg} alt="full star"/>
      ))}
      {halfStar === 1 && <img src={ReviewStar0Svg} alt="half star"/>}
      {Array(emptyStars).fill().map((_, idx) => (
        <img key={`empty-${idx}`} src={ReviewStar0Svg} alt="empty star"/>
      ))}
    </>
  );
};

export default ReviewStar;