import React from "react";
import size from "lodash/size";
import pickBy from "lodash/pickBy";

// @ts-ignore
import classes from "./IndividualEmails.module.css";
import TreeItem from "../TreeItem";
import { EmailAddressesGrouped } from "../../../../../types";

type Props = {
  emails: EmailAddressesGrouped;
  onToggleSelect: (name: string) => void;
  isForSelectedEmails: boolean;
};

const IndividualEmails = ({
  emails,
  onToggleSelect,
  isForSelectedEmails,
}: Props) => {
  const individualEmailsGrouped = pickBy(
    emails,
    (value) =>
      value.length === 1 && value[0]?.isSelected === isForSelectedEmails
  );

  const hasIndividualEmails = size(individualEmailsGrouped) > 0;
  if (!hasIndividualEmails) return null;

  return (
    <div className={classes.container}>
      {Object.keys(individualEmailsGrouped).map((key) => (
        <TreeItem
          onToggleSelect={onToggleSelect}
          label={key}
          key={key}
          isForSelectedEmails={isForSelectedEmails}
        />
      ))}
    </div>
  );
};

export default IndividualEmails;
