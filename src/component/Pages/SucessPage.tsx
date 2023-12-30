import { FC } from "react";
import "./SucessPage.css";

interface SuccessPageProps {
  message: string;
    emailResponseStatus: string | null;
}




const SuccessPage: FC<SuccessPageProps> = ({ message, emailResponseStatus }) => {
  return (
    <div>
        {emailResponseStatus === 'error' || emailResponseStatus === null? (

            <div className="lds-ripple">
          <div></div>
          <div></div>
        </div>
): (
    "FetchData"
)
}

      <p>{message}</p>
    </div>
  );
};

export default SuccessPage;
