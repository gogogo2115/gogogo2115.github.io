import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Page from "../app/page";

describe("Page", () => {
  it("renders multiple images", () => {
    render(<Page />);

    const images = screen.getAllByRole("img");

    // 이미지가 1개 이상 있는지 확인
    expect(images.length).toBeGreaterThan(0);

    images.forEach((img) => {
      expect(img).toBeInTheDocument();
    });
  });
});
