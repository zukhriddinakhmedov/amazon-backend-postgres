-- to delete the table: drop

CREATE TABLE IF NOT EXISTS 
products(
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    brand VARCHAR(100) NOT NULL,
    image_url VARCHAR(200),
    price INTEGER NOT NULL,
    category VARCHAR(100),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
)