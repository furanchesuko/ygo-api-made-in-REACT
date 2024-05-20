//Card Component

export function Card({ cards }) {
  return (
    <div>
      <div className="new-card-container" id="new-card-container">
        {cards.map((item, index) => (
          <div className="new-card" id="new-card" key={index}>
            <a key={item.id} href={item.ygoprodeck_url}>
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
