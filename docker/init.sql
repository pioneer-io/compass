CREATE TABLE IF NOT EXISTS Flags (
  id serial,
  title varchar(100) NOT NULL,
  description text DEFAULT 'No description provided.',
  is_active boolean DEFAULT false NOT NULL,
  version int DEFAULT 1,
  updated_at timestamp DEFAULT NOW(),
  created_at timestamp DEFAULT NOW(),
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
  PRIMARY KEY (id),
  FOREIGN KEY (flag_id) REFERENCES Flags(id) ON DELETE CASCADE
);

INSERT INTO Flags(title, description, is_active) VALUES ('LOGIN_MICROSERVICE', 'Redirects users to the login microservice', FALSE);
INSERT INTO Strategies(flag_id, percentage) VALUES (1, 0.1);
INSERT INTO Logs(flag_id, title, description) VALUES (1, 'Dummy Log!', 'Created new flag: LOGIN_MICROSERVICE');