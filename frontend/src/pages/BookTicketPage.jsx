import { useLocation, useNavigate } from "react-router-dom";

import BookTickets from "../components/BookTickets";

export default function BookTicketPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const handleContinue = (payload) => {
    navigate("/booking", { state: payload });
  };

  return (
    <>
      <main>
        <BookTickets event={state?.event} onContinue={handleContinue} />
      </main>
    </>
  );
}
