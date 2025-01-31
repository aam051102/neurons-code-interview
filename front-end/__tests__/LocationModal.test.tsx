import LocationModal from "@/components/LocationModal";
import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

describe("LocationModal", () => {
    it("updates latitude and longitude", async () => {
        render(<LocationModal isOpen={true} setIsOpen={() => null} />);

        const dLatitudeField = screen.getByLabelText("Latitude");
        const dLongitudeField = screen.getByLabelText("Longitude");

        // Enter valid values
        fireEvent.change(dLatitudeField, { target: { value: "1.000000" } });
        fireEvent.change(dLongitudeField, { target: { value: "180.000000" } });

        // Submit
        fireEvent.click(screen.getByText("Update Location"));

        //await waitFor(() => expect(mockAPI).toHaveBeenCalledTimes(1))

        //expect(heading).toBeInTheDocument();
    });
});

// TODO
