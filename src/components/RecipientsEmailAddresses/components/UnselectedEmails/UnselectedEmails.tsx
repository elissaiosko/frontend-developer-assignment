import React, { useState } from "react";
import { validate } from "email-validator";

import Search from "./Search";
import EmailList from "./EmailList";

//@ts-ignore
import classes from "./Unselected.module.css";
import { EmailAddresses } from "../../../../types";

type Props = {
  emailAddresses: EmailAddresses;
  onToggleSelect: (name: string) => void;
  onToggleSelectGroup: (hostname: string) => void;
  onAddEmail: (emailName: string) => void;
};

const UnselectedEmails = ({
  emailAddresses,
  onToggleSelect,
  onToggleSelectGroup,
  onAddEmail,
}: Props) => {
  const [searchText, setSearchText] = useState("");
  const clearEmailAddress = () => setSearchText("");

  const filteredEmailAddresses = emailAddresses.filter((emailAddress) => {
    const isInSearchResults = emailAddress.email.search(searchText) !== -1;

    return isInSearchResults ? true : false;
  });

  const emailAlreadyExists = emailAddresses.some(
    ({ email }) => email === searchText
  );
  const emailIsValid = !emailAlreadyExists && validate(searchText);

  return (
    <div className={classes.container}>
      <div className={classes.title}>Available Recipients</div>

      <Search
        onChange={(value) => setSearchText(value)}
        onClear={clearEmailAddress}
        value={searchText}
        onAdd={() => {
          onAddEmail(searchText);
          clearEmailAddress();
        }}
        shouldDisplayAdd={emailIsValid}
      />

      <EmailList
        emailAddresses={filteredEmailAddresses}
        onToggleSelectGroup={onToggleSelectGroup}
        onToggleSelect={onToggleSelect}
      />
    </div>
  );
};

export default UnselectedEmails;
