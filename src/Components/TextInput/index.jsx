import './styles.css';

export const TextInput = ({ searchValue, handleChange }) => (
    <input
        className="textInput"
        onChange={handleChange}
        value={searchValue}
        type="search"
        placeholder="search something..."
    />
);