import LocationModal from "@/components/LocationModal";
import { CurrentUserContext } from "@/context";
import { mount } from "cypress/react";

describe("<LocationModal />", () => {
    it("should accept valid latitude and longitude", () => {
        mount(
            <CurrentUserContext.Provider
                value={{
                    currentUser: {
                        id: 12,
                        inventory: [],
                    },
                    refetchUser: async () => {},
                    setCurrentUser: () => null,
                }}
            >
                <LocationModal isOpen={true} setIsOpen={() => null} />
            </CurrentUserContext.Provider>
        );

        cy.get("input[name='latitude']").type("1.000000");
        cy.get("input[name='longitude']").type("180.000000");

        cy.intercept("PATCH", "**/survivors/update**").as("updateSurvivor");

        cy.get("button").contains("Update Location").click();

        cy.wait("@updateSurvivor").its("response.statusCode").should("eq", 200);
    });

    it("should not accept invalid latitude", () => {
        mount(
            <CurrentUserContext.Provider
                value={{
                    currentUser: {
                        id: 12,
                        inventory: [],
                    },
                    refetchUser: async () => {},
                    setCurrentUser: () => null,
                }}
            >
                <LocationModal isOpen={true} setIsOpen={() => null} />
            </CurrentUserContext.Provider>
        );

        cy.get("input[name='latitude']").type("-+456246.");
        cy.get("input[name='longitude']").type("180.000000");

        cy.get("button").contains("Update Location").click();

        cy.get("input[name='latitude']")
            .invoke("prop", "validationMessage")
            .should("equal", "Please match the format requested.");
    });
});
