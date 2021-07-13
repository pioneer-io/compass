CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';


CREATE TABLE IF NOT EXISTS Flags (
  id serial,
  title varchar(100) NOT NULL,
  description text DEFAULT 'No description provided.' NOT NULL,
  is_active boolean DEFAULT false NOT NULL,
  version int DEFAULT 1,
  updated_at timestamp with time zone NOT NULL DEFAULT current_timestamp,
  created_at timestamp with time zone NOT NULL DEFAULT current_timestamp,
  PRIMARY KEY (id)
);
CREATE TABLE IF NOT EXISTS Strategies (
  id serial,
  flag_id int NOT NULL,
  percentage float NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (flag_id) REFERENCES Flags(id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS Logs (
  id serial,
  flag_id int NOT NULL,
  title varchar(100) NOT NULL,
  description varchar(100) NOT NULL,
  created_at timestamp DEFAULT NOW(),
  PRIMARY KEY (id)
);

CREATE TRIGGER tg_flags_updated_at
  BEFORE UPDATE
  ON flags
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();

INSERT INTO Flags(title, description, is_active) VALUES ('LOGIN_MICROSERVICE', 'Redirects users to the login microservice', FALSE);
INSERT INTO Strategies(flag_id, percentage) VALUES (1, 0.1);
INSERT INTO Logs(flag_id, title, description) VALUES (1, 'LOGIN_MICROSERVICE', 'Created new flag: LOGIN_MICROSERVICE');
