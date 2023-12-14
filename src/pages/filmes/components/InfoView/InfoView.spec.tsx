import { Airport } from "@/types/airport";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";

import InfoView from ".";

const airport: Airport = [
  {
    id: 1,
    SIGLA_AEROPORTO: "JMN",
    DSC_AEROPORTO: "Jorge Marino Neves",
    ATIVO: true,
  },
];

const onSubmit = jest.fn();
const onCancel = jest.fn();

describe("Airport view component", () => {
  render(
    <InfoView
      airport={airport}
      onCancel={onCancel}
    />
  );

  it("Find path text", async () => {
    screen.getByTestId("airport-view");

    const button = screen.getByTestId("airport-cancel");

    await act(() => {
      userEvent.click(button);
    });
    expect(onSubmit.mock.calls.length).toEqual(0);
  });
});
