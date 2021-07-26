import Link from "next/link";
import Image from "next/image";
import Text from "../atoms/Text";

// カード
const Card = (props) => {
  return (
    <div className="card" id="card">
      <div className="card-item">
        <img className="thumbnail" src="/DSC_9314.JPG" />
        <div className="card-title">
          <Text content={props.title} />
        </div>
      </div>

      <style jsx>
        {`
          .card {
            position: relative;
            overflow: hidden;
            width: 100%;
          }
          .card::before {
            content: "";
            display: block;
            padding-top: 100%;
          }
          .card-item {
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            border-radius: 1rem;
          }
          .thumbnail {
            filter: brightness(75%) saturate(200%);
            object-fit: cover;
            position: absolute;
            width: 100%;
            height: 100%;
            border-radius: 1rem;
          }
          .card-title {
            color: #fff;
            font-size: 2em;
            font-weight: 700;
            position: absolute;
            top: 50%;
            left: 50%;
            -ms-transform: translate(-50%, -50%);
            -webkit-transform: translate(-50%, -50%);
            transform: translate(-50%, -50%);
            margin: 0;
            padding: 0;
            z-index: 1;
          }
        `}
      </style>
    </div>
  );
};
export default Card;
