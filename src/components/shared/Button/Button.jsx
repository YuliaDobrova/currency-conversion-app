const Button = ({ onBtnClick = () => {}, text = "" }) => {
  return (
    <button type="button" onClick={onBtnClick}>
      {text}
    </button>
  );
};

export default Button;
