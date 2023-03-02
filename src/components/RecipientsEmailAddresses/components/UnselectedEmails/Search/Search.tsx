import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faXmark,
  faAdd,
} from "@fortawesome/free-solid-svg-icons";

// @ts-ignore
import classes from "./Search.module.css";

type Props = {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
  onAdd: () => void;
  onApply: (value: string) => void;
  shouldDisplayAdd: boolean;
};

const Search = ({
  onClear,
  onAdd,
  onApply,
  shouldDisplayAdd,
  value,
  onChange,
}: Props) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onApply(value);
    }
  };

  return (
    <div className={classes.container}>
      <FontAwesomeIcon
        icon={faMagnifyingGlass}
        className={classes.searchIcon}
        onClick={() => onApply(value)}
      />

      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={classes.input}
        autoFocus
        placeholder={"Search"}
        onKeyDown={handleKeyDown}
        data-testid="search-recipient"
      />

      <div className={classes.iconsContainer}>
        {shouldDisplayAdd && (
          <span data-testid="add-recipient" onClick={onAdd}>
            <FontAwesomeIcon icon={faAdd} className={classes.clearIcon} />
          </span>
        )}

        <span data-testid="x-search-recipient" onClick={onClear}>
          <FontAwesomeIcon icon={faXmark} className={classes.clearIcon} />
        </span>
      </div>
    </div>
  );
};

export default Search;
