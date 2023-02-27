import React, { useState } from "react";

import { EmailAddresses } from "../../types";
import UnselectedEmails from "./components/UnselectedEmails";
import SelectedEmails from "./components/SelectedEmails";
import { getHostName } from "./utils/groupEmails";

//@ts-ignore
import classes from "./RecipientsEmailAddresses.module.css";

type Props = {
  emailAddresses: EmailAddresses;
};

const RecipientsEmailAddresses = ({
  emailAddresses: initialEmailAddresses,
}: Props) => {
  const [emailAddresses, setEmailAddresses] = useState(initialEmailAddresses);

  const handleToggleSelect = (email: string, isSelected: boolean) => {
    const nextAvailableEmails = emailAddresses.map((emailAddress) => {
      if (emailAddress.email === email) {
        return { ...emailAddress, isSelected: !isSelected };
      }
      return emailAddress;
    });

    setEmailAddresses(nextAvailableEmails);
  };

  const handleToggleSelectGroup = (hostName: string, isSelected: boolean) => {
    const nextAvailableEmails = emailAddresses.map((emailAddress) => {
      const emailIsAtCurrentHost = getHostName(emailAddress.email) === hostName;

      if (emailIsAtCurrentHost) {
        return { ...emailAddress, isSelected: !isSelected };
      }
      return emailAddress;
    });
    setEmailAddresses(nextAvailableEmails);
  };

  const handleAddEmail = (emailValue: string) => {
    setEmailAddresses([
      ...emailAddresses,
      {
        email: emailValue,
        isSelected: false,
      },
    ]);
  };

  return (
    <div className={classes.container}>
      <UnselectedEmails
        emailAddresses={emailAddresses}
        onToggleSelect={(emailAddress) =>
          handleToggleSelect(emailAddress, false)
        }
        onToggleSelectGroup={(hostname) =>
          handleToggleSelectGroup(hostname, false)
        }
        onAddEmail={handleAddEmail}
      />

      <SelectedEmails
        emailAddresses={emailAddresses}
        onToggleSelect={(emailAddress) =>
          handleToggleSelect(emailAddress, true)
        }
        onToggleSelectGroup={(hostname) =>
          handleToggleSelectGroup(hostname, true)
        }
      />
    </div>
  );
};

export default RecipientsEmailAddresses;
