import RecipientsEmailAddresses from "./";

import {
  render,
  screen,
  fireEvent,
  waitForElementToBeRemoved
} from "@testing-library/react";

//@ts-ignore
import recipientsData from "../../assets/recipientsData.json";

describe("RecipientsEmailAddresses", () => {
  it("should render with correct title", () => {
    render(<RecipientsEmailAddresses emailAddresses={recipientsData} />);

    expect(screen.getByText("Available Recipients")).toBeTruthy();
    expect(screen.getByText("Selected Recipients")).toBeTruthy();
  });

  it("should display the unselected recipients", () => {
    render(<RecipientsEmailAddresses emailAddresses={recipientsData} />);

    expect(screen.getByText("jane@awesome.com")).toBeTruthy();
  });

  it("should not display emails of grouped recipients", () => {
    render(<RecipientsEmailAddresses emailAddresses={recipientsData} />);

    expect(screen.queryByText("ann@timescale.com")).toBeFalsy();
    expect(screen.queryByText("bob@timescale.com")).toBeFalsy();
  });

  it("should display hostnames as groups", () => {
    render(<RecipientsEmailAddresses emailAddresses={recipientsData} />);

    expect(screen.queryByText("timescale.com")).toBeTruthy();
    expect(screen.queryByText("qwerty.com")).toBeTruthy();

    expect(screen.queryByText("@timescale.com")).toBeFalsy();
    expect(screen.queryByText("@qwerty.com")).toBeFalsy();
  });

  it("should display filtered results when on search for 'qwerty.com", () => {
    render(<RecipientsEmailAddresses emailAddresses={recipientsData} />);
    const searchElement = screen.getByTestId("search-recipient");

    fireEvent.change(searchElement, { target: { value: "qwerty.com" } });
    fireEvent.keyDown(searchElement, {
      key: "Enter",
      code: "Enter",
      charCode: 13,
    });

    expect(screen.queryByText("qwerty.com")).toBeTruthy();
    expect(screen.queryByText("timescale.com")).toBeFalsy();
    expect(screen.queryByText("mike@hello.com")).toBeFalsy();
  });

  it("should add a user and clear the input", () => {
    render(<RecipientsEmailAddresses emailAddresses={recipientsData} />);
    const searchInput = screen.getByTestId("search-recipient");

    fireEvent.change(searchInput, {
      target: { value: "elissaios@gmail.com" },
    });
    fireEvent.keyDown(searchInput, {
      key: "Enter",
      code: "Enter",
      charCode: 13,
    });

    fireEvent.click(searchInput);

    expect(screen.queryByText("elissaios@gmail.com")).toBeTruthy();
    expect(searchInput.textContent).toEqual("");
  });

  it("should not add icon for adding a user when email is not valid", () => {
    render(<RecipientsEmailAddresses emailAddresses={recipientsData} />);
    const searchElement = screen.getByTestId("search-recipient");

    fireEvent.change(searchElement, {
      target: { value: "elissaiosgmail.com" },
    });
    fireEvent.keyDown(searchElement, {
      key: "Enter",
      code: "Enter",
      charCode: 13,
    });

    expect(screen.queryByTestId("add-recipient")).toBeFalsy();
  });

  it("should open/close an unselected group", async () => {
    render(<RecipientsEmailAddresses emailAddresses={recipientsData} />);
    const timescaleGroup = screen.queryAllByTestId("group-icon")[0];

    timescaleGroup?.click();

    const annEmail = await screen.findByText("ann@timescale.com");
    const bobEmail = await screen.findByText("bob@timescale.com");
    expect(annEmail).toBeTruthy();
    expect(bobEmail).toBeTruthy();

    timescaleGroup?.click();

    await waitForElementToBeRemoved(screen.queryByText("ann@timescale.com"));
    expect(screen.queryByText("ann@timescale.com")).toBeFalsy();
    expect(screen.queryByText("bob@timescale.com")).toBeFalsy();
  });

  /* More scenarios can be
 // It should clear the input when user clicks on X
 // It should display no text when there are no results
 // should open an unselected group, select it and move it to selected area
 // etc...
  */
});
