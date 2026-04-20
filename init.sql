CREATE DATABASE job_tracker;
\c job_tracker
-- Schema for Job Tracker
CREATE TABLE IF NOT EXISTS applications (
	id SERIAL PRIMARY KEY,
	company_name VARCHAR(255) NOT NULL,
	job_title VARCHAR(255) NOT NULL,
	job_link VARCHAR(255) NOT NULL,
	status VARCHAR(50) DEFAULT 'Applied',
	notes TEXT,
	created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
	last_updated TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE OR REPLACE FUNCTION update_last_updated_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.last_updated = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';


CREATE DATABASE chat_ai;
\c chat_ai
-- Schema for Chat AI
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE TABLE IF NOT EXISTS chat_history (
    id SERIAL PRIMARY KEY,
    session_id UUID DEFAULT gen_random_uuid(),
    role VARCHAR(20) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);