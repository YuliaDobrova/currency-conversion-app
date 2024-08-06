const Select = ({
  allCurrency = [],
  onCurrencyChangeFunc = () => {},
  shortCode = "",
}) => {
  return (
    <select onChange={onCurrencyChangeFunc}>
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
