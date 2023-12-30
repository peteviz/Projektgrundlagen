import "./SucessPage.css";
import colab from '../../../src/Assets/img/Collaboration.png'



const SuccessPage = () => {
  return (
    <div className="success-container">
    <img src={colab} alt="success" className="success" />

    <p className="message-1">Thank You!</p>
    <p className="message-2">A representative of Urbanistic would contact you.</p>


    </div>

  );
};

export default SuccessPage;
