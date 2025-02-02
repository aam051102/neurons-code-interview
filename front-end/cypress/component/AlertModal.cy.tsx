import AlertModal from "@/components/AlertModal";
import useAlertModal from "@/hooks/useAlertModal";
import { mount } from "cypress/react";
import { useEffect } from "react";

const CloseWrapper = () => {
    const [subModal, setSubModal] = useAlertModal();

    useEffect(() => {
        setSubModal({ children: <p>Hey!</p>, isOpen: true });
    }, [setSubModal]);

    return <AlertModal subModal={subModal} setSubModal={setSubModal} />;
};

describe("<AlertModal />", () => {
    it("displays children", () => {
        mount(
            <AlertModal
                subModal={{ children: <p>Hey!</p>, isOpen: true }}
                setSubModal={() => null}
            />
        );

        cy.get("p").contains("Hey!").should("exist");
    });

    it("opens and closes", () => {
        mount(<CloseWrapper />);

        cy.get("dialog").should("have.attr", "open");

        cy.get("button").contains("Okay").click();

        cy.get("dialog").should("not.have.attr", "open");
    });
});
