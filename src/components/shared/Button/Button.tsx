const Button = ({ type, onBtnClick = () => {}, children }) => {
  return (
    <button type={type} onClick={onBtnClick}>
      {children}
    </button>
  );
};

export default Button;
