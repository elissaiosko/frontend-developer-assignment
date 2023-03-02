import React, { useState, useMemo } from "react";
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
  const [appliedSearchText, setAppliedSearchText] = useState("");
  const [searchText, setSearchText] = useState("");

  const filteredEmailAddresses = emailAddresses.filter((emailAddress) => {
    const isInSearchResults =
      emailAddress.email.search(appliedSearchText) !== -1;

    return isInSearchResults ? true : false;
  });

  const clearSearch = () => {
    setAppliedSearchText("");
    setSearchText("");
  };

  const getEmailIsValid = () => {
    const emailAlreadyExists = emailAddresses.some(
      ({ email }) => email === searchText
    );
    const emailIsValid = !emailAlreadyExists && validate(searchText);
    return emailIsValid;
  };

  const handleAddEmail = () => {
    onAddEmail(searchText);
    clearSearch();
  };

  const handleApplySearch = () => {
    setAppliedSearchText(searchText);
  };

  const handleSearchChange = (value: string) => {
    setSearchText(value);
  };

  const emailIsValid = useMemo(
    () => getEmailIsValid(),
    [emailAddresses, searchText]
  );

  return (
    <div className={classes.container}>
      <div className={classes.title}>Available Recipients</div>

      <Search
        value={searchText}
        onApply={handleApplySearch}
        onChange={handleSearchChange}
        onClear={clearSearch}
        shouldDisplayAdd={emailIsValid}
        onAdd={handleAddEmail}
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
