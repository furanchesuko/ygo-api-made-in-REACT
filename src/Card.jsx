//Card Component

export function Card({ card }) {
  return (
    <div>
      <div className="new-card-container" id="new-card-container">
        {card.map((item, index) => (
          <div className="new-card" id="new-card" key={index.id}>
            <a key={index} href={item.ygoprodeck_url}>
              <img
                className="new-card-image"
                id="new-card-image"
                src={item.card_images[0].image_url}
                alt={item.name.toLowerCase().replace(/\s|"/g, " ")}
                title={item.name.toLowerCase().replace(/\s|"/g, " ")}
              />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
