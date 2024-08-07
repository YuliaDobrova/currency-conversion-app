import { useId } from "react";

const Input = (props) => {
    const id = useId();

    return (
        <label htmlFor={id}>
            <input
                id={id}
                {...props}
            />
        </label>
    )
}

export default Input;