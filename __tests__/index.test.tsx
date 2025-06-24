/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

describe("Home", () => {
  it("renders a heading", () => {
    render(<Home />);

    const imgs = screen.getAllByRole("img");
    expect(imgs.length).toBeGreaterThan(0);
  });
});
