const Select = ({
  allCurrency = [],
  onChangeFunc = () => {},
  shortCode = "",
}) => {
  return (
    <select onChange={onChangeFunc}>
      {allCurrency?.map((el) =>
        el.short_code === shortCode ? (
          <option value={el.name} key={el.id} selected>
            {el.name} {el.symbol}
          </option>
        ) : (
          <option value={el.name} key={el.id}>
            {el.name} {el.symbol}
          </option>
        )
      )}
    </select>
  );
};

export default Select;
