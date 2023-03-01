import React, { useState } from "react";
import GroupTreeItem from "../../shared/CompanyEmails/Group/GroupTreeItem";
import IndividualEmails from "../../shared/IndividualEmails";
import CompanyEmails from "../../shared/CompanyEmails/CompanyEmails";
import { EmailAddressesGrouped } from "../../../../../types";

//@ts-ignore
import classes from "./EmailSection.module.css";

type Props = {
  emails: EmailAddressesGrouped;
  label: string;
  onToggleSelect: (name: string) => void;
  onToggleSelectGroup: (name: string) => void;
  type?: "company" | "individual";
};

const EmailSection = ({
  emails,
  label,
  type = "individual",
  onToggleSelect,
  onToggleSelectGroup,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const Component = type === "company" ? CompanyEmails : IndividualEmails;

  return (
    <div>
      <GroupTreeItem
        label={label}
        onOpen={() => setIsOpen(true)}
        onClose={() => setIsOpen(false)}
        isOpen={isOpen}
        onToggleSelect={onToggleSelectGroup}
        shouldDisplayActionIcon={false}
        className={classes.groupContainer}
      />

      {isOpen && (
        <div className={classes.container}>
          <Component
            emails={emails}
            isForSelectedEmails
            onToggleSelect={onToggleSelect }
            onToggleSelectGroup={onToggleSelectGroup}
          />
        </div>
      )}
    </div>
  );
};

export default EmailSection;
