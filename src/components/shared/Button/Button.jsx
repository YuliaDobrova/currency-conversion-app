const Button = ({ type= "submit", onBtnClick = () => {}, children }) => {
  return (
    <button type={type} onClick={onBtnClick}>
      {children}
    </button>
  );
};

export default Button;
