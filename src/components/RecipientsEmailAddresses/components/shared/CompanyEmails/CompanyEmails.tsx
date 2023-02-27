import React from "react";
import pickBy from "lodash/pickBy";
import Group from "./Group";
import size from "lodash/size";

import { EmailAddressesGrouped } from "../../../../../types";
type Props = {
  emails: EmailAddressesGrouped;
  onToggleSelect: (name: string) => void;
  onToggleSelectGroup: (name: string) => void;
  isForSelectedEmails: boolean;
};

const CompanyEmails = ({
  emails,
  onToggleSelect,
  onToggleSelectGroup,
  isForSelectedEmails,
}: Props) => {
  const emailGroups = pickBy(emails, (emailsInGroup) => {
    const isGroup = size(emailsInGroup) > 1;
    const groupHasItems = emailsInGroup.some(
      ({ isSelected }) => isSelected === isForSelectedEmails
    );

    return isGroup && groupHasItems;
  });

  return (
    <div>
      {Object.entries(emailGroups).map(([key, value]) => (
        <Group
          key={key}
          hostname={key}
          emails={value}
          onToggleSelect={onToggleSelect}
          onToggleSelectGroup={onToggleSelectGroup}
          isForSelectedEmails={isForSelectedEmails}
        />
      ))}
    </div>
  );
};

export default CompanyEmails;
