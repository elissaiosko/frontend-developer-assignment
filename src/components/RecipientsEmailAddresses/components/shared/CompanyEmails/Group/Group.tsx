import React, { useState } from "react";

//@ts-ignore
import classes from "./Group.module.css";
import TreeItem from "../../TreeItem";
import GroupTreeItem from "./GroupTreeItem";
import { EmailAddresses } from "../../../../../../types";

type Props = {
  hostname: string;
  emails: EmailAddresses;
  onToggleSelectGroup: (name: string) => void;
  onToggleSelect: (name: string) => void;
  isForSelectedEmails: boolean;
};

const Group = ({
  hostname,
  emails,
  onToggleSelectGroup,
  onToggleSelect,
  isForSelectedEmails,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={classes.container}>
      <GroupTreeItem
        onOpen={() => setIsOpen(true)}
        onClose={() => setIsOpen(false)}
        label={hostname}
        isOpen={isOpen}
        onToggleSelect={onToggleSelectGroup}
        isForSelectedEmails={isForSelectedEmails}
      />

      {isOpen && (
        <div>
          {emails.map(({ email, isSelected }) => {
            if (!isForSelectedEmails && isSelected) return null;
            if (isForSelectedEmails && !isSelected) return null;

            return (
              <div className={classes.emailItemContainer} key={email}>
                <TreeItem
                  onToggleSelect={onToggleSelect}
                  label={email}
                  isForSelectedEmails={isForSelectedEmails}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Group;
