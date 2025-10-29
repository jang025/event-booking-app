export default function Confirmation({ booking }) {
    if (!booking) return <p>Loading confirmation…</p>;
    const totalcost = booking.items?.reduce((sum, item) => sum + item.totalCost, 0) || 0;
    return (
      <section>
        <ul>
          {booking.items?.map((item, idx) => (
            <li key={idx}>
              {item.tierName} : {item.quantity} × {item.unitPrice} = {item.totalCost}
            </li>
          ))}
        </ul>
        <p><b>Total Cost:</b> {totalcost}</p>
      </section>
    );
  }
  