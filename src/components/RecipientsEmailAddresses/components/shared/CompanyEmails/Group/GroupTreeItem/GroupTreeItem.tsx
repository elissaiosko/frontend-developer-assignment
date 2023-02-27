import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import cx from "classnames";
import TreeItem from "../../../TreeItem";

//@ts-ignore
import classes from "./GroupTreeItem.module.css";

type Props = {
  isOpen: boolean;
  label: string;
  onOpen: () => void;
  onClose: () => void;
  onToggleSelect: (name: string) => void;
  shouldDisplayActionIcon?: boolean;
  className?: string;
  isForSelectedEmails?: boolean;
};

const GroupTreeItem = ({
  isOpen,
  label,
  onOpen,
  onClose,
  onToggleSelect,
  shouldDisplayActionIcon = true,
  className,
  isForSelectedEmails = false,
}: Props) => {
  return (
    <div className={cx(classes.titleContainer, className)}>
      <span data-testId="group-icon" onClick={isOpen ? onClose : onOpen}>
        <FontAwesomeIcon
          icon={isOpen ? faCaretDown : faCaretRight}
          className={classes.caretIcon}
        />
      </span>

      <div className={classes.treeItemContainer}>
        <TreeItem
          label={label}
          onToggleSelect={onToggleSelect}
          shouldDisplayActionIcon={shouldDisplayActionIcon}
          isForSelectedEmails={isForSelectedEmails}
        />
      </div>
    </div>
  );
};

export default GroupTreeItem;
