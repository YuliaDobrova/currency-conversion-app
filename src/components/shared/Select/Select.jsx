const Select = ({ options = [], onChange = () => {}, shortCode = "" }) => {
  return (
    <select onChange={onChange} value={shortCode}>
      {options?.map((el) => (
        <option value={el.short_code} key={el.id}>
          {el.name} {el.symbol}
        </option>
      ))}
    </select>
  );
};

export default Select;
