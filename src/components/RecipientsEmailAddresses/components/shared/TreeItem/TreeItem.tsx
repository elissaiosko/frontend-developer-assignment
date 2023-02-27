import React, { useState } from "react";
import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//@ts-ignore
import classes from "./TreeItem.module.css";

type Props = {
  onToggleSelect: (name: string) => void;
  label: string;
  isForSelectedEmails: boolean;
  shouldDisplayActionIcon?: boolean;
};

const TreeItem = ({
  onToggleSelect,
  label,
  isForSelectedEmails,
  shouldDisplayActionIcon = true,
}: Props) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={classes.container}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={classes.item}>{label}</div>

      {shouldDisplayActionIcon && isHovered && (
        <FontAwesomeIcon
          icon={isForSelectedEmails ? faXmark : faPlus}
          className={classes.addRemoveIcon}
          onClick={() => onToggleSelect(label)}
        />
      )}
    </div>
  );
};

export default TreeItem;
