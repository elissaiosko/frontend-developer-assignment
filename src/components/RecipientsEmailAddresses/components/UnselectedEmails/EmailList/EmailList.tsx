import React from "react";
import size from "lodash/size";

import groupEmails from "../../../utils/groupEmails";
import CompanyEmails from "../../shared/CompanyEmails/CompanyEmails";
import IndividualEmails from "../../shared/IndividualEmails";

//@ts-ignore
import classes from "./EmailList.module.css";
import { EmailAddresses } from "../../../../../types";

type Props = {
  emailAddresses: EmailAddresses;
  onToggleSelectGroup: (hostname: string) => void;
  onToggleSelect: (name: string) => void;
};

const EmailList = ({
  emailAddresses,
  onToggleSelect,
  onToggleSelectGroup,
}: Props) => {
  const groupedEmailAddresses = groupEmails(emailAddresses);
  const hasData = size(groupedEmailAddresses) > 0;

  return (
    <div className={classes.container}>
      <CompanyEmails
        emails={groupedEmailAddresses}
        onToggleSelect={onToggleSelect}
        onToggleSelectGroup={onToggleSelectGroup}
        isForSelectedEmails={false}
      />

      <IndividualEmails
        emails={groupedEmailAddresses}
        onToggleSelect={onToggleSelect}
        isForSelectedEmails={false}
      />
      {!hasData && (
        <div className={classes.noData}>No Available Recipients</div>
      )}
    </div>
  );
};

export default EmailList;
