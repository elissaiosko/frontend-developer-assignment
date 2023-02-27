import React from "react";
import groupEmails from "../../utils/groupEmails";

import EmailSection from "./EmailSection/EmailSection";

import { EmailAddresses } from "../../../../types";

//@ts-ignore
import classes from "./SelectedEmails.module.css";

type Props = {
  emailAddresses: EmailAddresses;
  onToggleSelect: (name: string) => void;
  onToggleSelectGroup: (hostname: string) => void;
};

const SelectedEmails = ({
  emailAddresses,
  onToggleSelect,
  onToggleSelectGroup,
}: Props) => {
  const groupedEmailAddresses = groupEmails(emailAddresses);

  return (
    <div className={classes.container}>
      <div className={classes.title}>Selected Recipients</div>

      <EmailSection
        emails={groupedEmailAddresses}
        label="Company recipients"
        type="company"
        onToggleSelect={onToggleSelect}
        onToggleSelectGroup={onToggleSelectGroup}
      />

      <EmailSection
        emails={groupedEmailAddresses}
        label="Individual recipients"
        onToggleSelect={onToggleSelect}
        onToggleSelectGroup={onToggleSelectGroup}
      />
    </div>
  );
};

export default SelectedEmails;
