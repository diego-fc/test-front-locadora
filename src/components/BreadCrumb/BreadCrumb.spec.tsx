import { render } from "@testing-library/react";
import BreadCrumb from ".";

describe("BreadCrumb component", () => {
  it("Find path text", () => {
    const { getByText } = render(<BreadCrumb path="/countries" />);

    expect(getByText("COUNTRIES")).toBeInTheDocument();
  });
});
