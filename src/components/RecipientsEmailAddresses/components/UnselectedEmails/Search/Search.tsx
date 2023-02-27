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
  shouldDisplayAdd: boolean;
};

const Search = ({
  value,
  onClear,
  onChange,
  onAdd,
  shouldDisplayAdd,
}: Props) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && shouldDisplayAdd) {
      onAdd();
    }
  };

  return (
    <div className={classes.container}>
      <FontAwesomeIcon
        icon={faMagnifyingGlass}
        className={classes.searchIcon}
        onClick={() => onChange(value)}
      />

      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={classes.input}
        autoFocus
        placeholder={"Search"}
        onKeyDown={handleKeyDown}
        data-testId="search-recipient"
      />

      <div className={classes.iconsContainer}>
        {shouldDisplayAdd && (
          <span data-testId="add-recipient" onClick={onAdd}>
            <FontAwesomeIcon icon={faAdd} className={classes.clearIcon} />
          </span>
        )}

        <span data-testId="x-search-recipient" onClick={onClear}>
          <FontAwesomeIcon icon={faXmark} className={classes.clearIcon} />
        </span>
      </div>
    </div>
  );
};

export default Search;
