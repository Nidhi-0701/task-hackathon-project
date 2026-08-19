CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    
    title VARCHAR(150) NOT NULL,
    
    description TEXT,
    
    status VARCHAR(20) NOT NULL DEFAULT 'pending'
        CHECK (status IN ('pending', 'completed')),
    
    priority VARCHAR(20) NOT NULL DEFAULT 'medium'
        CHECK (priority IN ('low', 'medium', 'high')),
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);