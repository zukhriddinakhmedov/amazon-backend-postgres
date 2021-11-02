-- to delete the table: drop

CREATE TABLE IF NOT EXISTS 
products(
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(40) NOT NULL,
    description TEXT NOT NULL,
    brand VARCHAR(50) NOT NULL,
    image_url VARCHAR(50),
    price INTEGER NOT NULL,
    category VARCHAR(30),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
)