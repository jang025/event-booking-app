import { useLocation } from "react-router-dom";
import ConfirmationTicket from "../components/ConfirmationTicket";

export default function ConfirmationPage() {
  const { state } = useLocation();

  return (
    <>
      <main>
        <ConfirmationTicket data={state} />
      </main>
    </>
  );
}
